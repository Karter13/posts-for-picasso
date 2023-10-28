import { memo, MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import cls from './Page.module.scss';
import { classNames } from "../../../../shared/lib/classNames/classNames";

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;


    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: () => console.log('Scroll'),
    });


    return (
        <main
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
        >
            {children}
            <div className={cls.trigger} ref={triggerRef} />
        </main>
    );
});
