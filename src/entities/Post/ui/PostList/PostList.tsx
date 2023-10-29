import { memo, useMemo } from "react";
import cls from './PostList.module.scss';
import { classNames } from "shared/lib/classNames/classNames";
import { PostListItem } from "../PostListItem/PostListItem";
import { Skeleton } from "shared/ui/Skeleton";
import { ErrorPage } from "widgets/ErrorPage";
import useInfiniteScrollPosts from "../../lib/hooks/useInfiniteScrollPosts/useInfiniteScrollPosts";

const NUMBER_OF_SKELETONS = 7;

interface PostListProps {
    className?: string;
}

export const PostList = memo(({ className }: PostListProps) => {

    const {
        combinedData: allPosts,
        itemRef,
        error,
        isLoading: newPostsIsLoading,
    } = useInfiniteScrollPosts()


    const skeletons = useMemo(() => {
        return new Array(NUMBER_OF_SKELETONS).fill(NUMBER_OF_SKELETONS).map((el, index) => (
            <Skeleton key={index} className={cls.skeleton} width="100%" border="8px" height="140px" />
        ))
    }, [])


    if (newPostsIsLoading) {
        return (
            <div
                className={classNames(cls.PostList, {}, [className])}
            >
                {skeletons}
            </div>
        );
    }

    if (error) {
        return (<ErrorPage />)
    }

    return (
        <div className={classNames(cls.PostList, {}, [className])}>
            <ul>
                {
                    allPosts?.map((post, index) => (
                        <li
                            key={post?.id}
                            ref={index === allPosts.length - 1 ? itemRef : null}
                        >
                            <PostListItem  post={post} />
                        </li>
                    ))
                }
            </ul>

        </div>
    );
});
