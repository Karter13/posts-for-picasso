import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState
} from "react";

import { useLatest } from "../useLatest/useLatest";

type Key = string|number;

interface UseDynamicSizeListProps {
    itemsCount: number;
    itemHeight?: (number: number) => number;
    estimateItemHeight?: (index: number) => number;
    getItemKey: (index: number) => Key;
    overScan?: number;
    scrollingDelay?: number;
    getScrollElement: () => HTMLElement|null;
}

interface DynamicSizeListItem {
    key: Key;
    index: number;
    offsetTop: number;
    height: number;
}

const DEFAULT_OVERSCAN = 3;
const DEFAULT_SCROLLING_DELAY = 150;

function validateProps(props: UseDynamicSizeListProps) {
    const { itemHeight, estimateItemHeight } = props;

    if (!itemHeight && !estimateItemHeight) {
        throw new Error(
            `you must pass either "itemHeight" or "estimateItemHeight" prop`
        );
    }
}

export function useDynamicSizeList(props: UseDynamicSizeListProps) {
    validateProps(props);
    const {
        itemHeight,
        itemsCount,
        estimateItemHeight,
        getItemKey,
        scrollingDelay = DEFAULT_SCROLLING_DELAY,
        overScan = DEFAULT_OVERSCAN,
        getScrollElement,
    } = props;

    const [measurementCache, setMeasurementCache] = useState<Record<Key, number>>({});
    const [listHeight, setListHeight] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    useLayoutEffect(() => {
        const scrollElement = getScrollElement();

        if (!scrollElement) {
            return;
        }

        const resizeObserver = new ResizeObserver(([entry]) => {
            if (!entry) {
                return;
            }
            const height =
                entry.borderBoxSize[0]?.blockSize ??
                entry.target.getBoundingClientRect().height;

            setListHeight(height);
        });

        resizeObserver.observe(scrollElement);

        return () => {
            resizeObserver.disconnect();
        };
    }, [getScrollElement]);

    useLayoutEffect(() => {
        const scrollElement = getScrollElement();

        if (!scrollElement) {
            return;
        }

        const handleScroll = () => {
            const scrollTop = scrollElement.scrollTop;

            setScrollTop(scrollTop);
        };

        handleScroll();

        scrollElement.addEventListener("scroll", handleScroll);

        return () => scrollElement.removeEventListener("scroll", handleScroll);
    }, [getScrollElement]);

    useEffect(() => {
        const scrollElement = getScrollElement();
        if (!scrollElement) {
            return;
        }

        let timeoutId: number|null = null;

        const handleScroll = () => {
            setIsScrolling(true);

            if (typeof timeoutId === "number") {
                clearTimeout(timeoutId);
            }

            // @ts-ignore
            timeoutId = setTimeout(() => {
                setIsScrolling(false);
            }, scrollingDelay);
        };

        scrollElement.addEventListener("scroll", handleScroll);

        return () => {
            if (typeof timeoutId === "number") {
                clearTimeout(timeoutId);
            }
            scrollElement.removeEventListener("scroll", handleScroll);
        };
    }, [getScrollElement, scrollingDelay]);

    const { virtualItems, startIndex, endIndex, totalHeight, allItems } = useMemo(() => {
        const getItemHeight = (index: number) => {
            if (itemHeight) {
                return itemHeight(index);
            }

            const key = getItemKey(index);
            if (typeof measurementCache[key] === "number") {
                return measurementCache[key]!;
            }

            return estimateItemHeight!(index);
        };

        const rangeStart = scrollTop;
        const rangeEnd = scrollTop + listHeight;


        let totalHeight = 0;
        let startIndex = -1;
        let endIndex = -1;
        const allItems: DynamicSizeListItem[] = Array(itemsCount);

        for (let index = 0; index < itemsCount; index++) {
            const key = getItemKey(index);
            const row = {
                key,
                index: index,
                height: getItemHeight(index),
                offsetTop: totalHeight,
            };

            totalHeight += row.height;
            allItems[index] = row;

            if (startIndex === -1 && row.offsetTop + row.height > rangeStart) {
                startIndex = Math.max(0, index - overScan);
            }

            if (endIndex === -1 && row.offsetTop + row.height >= rangeEnd) {
                endIndex = Math.min(itemsCount - 1, index + overScan);
            }
        }

        const virtualItems = allItems.slice(startIndex, endIndex + 1);

        return {
            virtualItems,
            startIndex,
            endIndex,
            allItems,
            totalHeight,
        }
    }, [
        scrollTop,
        overScan,
        listHeight,
        itemHeight,
        getItemKey,
        estimateItemHeight,
        measurementCache,
        itemsCount,
    ]);

    const latestData = useLatest({
        measurementCache,
        getItemKey,
        allItems,
        getScrollElement,
        scrollTop,
    });

    const measureElementInner = useCallback(
        (
            element: Element|null,
            resizeObserver: ResizeObserver,
            entry?: ResizeObserverEntry
        ) => {
            if (!element) {
                return;
            }

            if (!element.isConnected) {
                resizeObserver.unobserve(element);
                return;
            }

            const indexAttribute = element.getAttribute("data-index") || "";
            const index = parseInt(indexAttribute, 10);

            if (Number.isNaN(index)) {
                console.error(
                    "dynamic elements must have a valid `data-index` attribute"
                );
                return;
            }
            const { measurementCache, getItemKey, allItems, scrollTop } =
                latestData.current;

            const key = getItemKey(index);
            const isResize = Boolean(entry);

            resizeObserver.observe(element);

            if (!isResize && typeof measurementCache[key] === "number") {
                return;
            }

            const height =
                entry?.borderBoxSize[0]?.blockSize ??
                element.getBoundingClientRect().height;

            if (measurementCache[key] === height) {
                return;
            }

            const item = allItems[index]!;
            const delta = height - item.height;

            if (delta !== 0 && scrollTop > item.offsetTop) {
                const element = getScrollElement();
                if (element) {
                    element.scrollBy(0, delta);
                }
            }

            setMeasurementCache((cache) => ({ ...cache, [key]: height }));
        },
        []
    );

    const itemsResizeObserver = useMemo(() => {
        const ro = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                measureElementInner(entry.target, ro, entry);
            });
        });
        return ro;
    }, [latestData]);

    const measureElement = useCallback(
        (element: Element|null) => {
            measureElementInner(element, itemsResizeObserver);
        },
        [itemsResizeObserver]
    );

    return {
        virtualItems,
        totalHeight,
        startIndex,
        endIndex,
        isScrolling,
        allItems,
        measureElement,
    };
}
