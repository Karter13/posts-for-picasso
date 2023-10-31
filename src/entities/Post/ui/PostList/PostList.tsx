import {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';

import { postAPI } from '../../api/postApi';
import { IPost } from '../../model/types/post';
import { PostListItem } from '../PostListItem/PostListItem';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton';
import { ErrorPage } from 'widgets/ErrorPage';
import { useDynamicSizeList } from 'shared/lib/hooks/useDynamicSizeList/useDynamicSizeList';
import cls from './PostList.module.scss';

interface PostListProps {
    className?: string;
}

const NUMBER_OF_SKELETONS = 7;

export const PostList = memo(({ className }: PostListProps) => {
    const [postItems, setPostItems] = useState<IPost[]>([]);
    const scrollElementRef = useRef<HTMLDivElement>(null);

    const { isScrolling, virtualItems, totalHeight, measureElement } = useDynamicSizeList({
        estimateItemHeight: useCallback(() => 16, []),
        itemsCount: postItems.length,
        getScrollElement: useCallback(() => scrollElementRef.current,
            // eslint-disable-next-line
            [scrollElementRef.current]
        ),
        getItemKey: useCallback((index) => postItems[index]!.id, [postItems]),
    });

    const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(null, {
        // pollingInterval: 10000,
    });

    useEffect(() => {
        if (!posts) return;
        setPostItems(posts);
    }, [posts]);

    const skeletons = useMemo(() => {
        return new Array(NUMBER_OF_SKELETONS).fill(NUMBER_OF_SKELETONS).map((el, index) => (
            <Skeleton key={index} className={cls.skeleton} width="100%" border="8px" height="140px" />
        ));
    }, []);

    if (isLoading) {
        return (
            <div
                className={classNames(cls.PostList, {}, [className])}
            >
                {skeletons}
            </div>
        );
    }

    if (error) {
        return (<ErrorPage />);
    }

    return (
        <div
            ref={scrollElementRef}
            className={classNames(cls.PostList, {}, [className])}
        >
            <div
                style={{ height: totalHeight }}
            >
                {
                    virtualItems?.map((virtualItem) => {
                        const item = postItems[virtualItem.index]!;

                        return (
                            <div
                                key={item.id}
                                data-index={virtualItem.index}
                                ref={measureElement}
                                style={{
                                    position: 'absolute',
                                    transform: `translateY(${virtualItem.offsetTop}px)`,
                                    marginLeft: '30%',
                                    width: '40%',
                                }}

                            >
                                <PostListItem isScrolling={isScrolling} post={item} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
});
