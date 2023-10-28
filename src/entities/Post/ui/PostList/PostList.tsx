import { memo, useMemo } from "react";
import { postAPI } from "../../api/postApi";
import cls from './PostList.module.scss';
import { classNames } from "shared/lib/classNames/classNames";
import { PostListItem } from "../PostListItem/PostListItem";
import { Skeleton } from "shared/ui/Skeleton";
import { ErrorPage } from "widgets/ErrorPage";

const NUMBER_OF_SKELETONS = 7;

interface PostListProps {
    className?: string;
}

export const PostList = memo(({ className }: PostListProps) => {
    const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery( 1, {
        pollingInterval: 10000,
    })

    const skeletons = useMemo(() => {
        return new Array(NUMBER_OF_SKELETONS).fill(NUMBER_OF_SKELETONS).map((el, index) => (
            <Skeleton key={index} className={cls.skeleton} width="100%" border="8px" height="140px" />
        ))
    }, [])


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
        return (<ErrorPage />)
    }

    return (
        <div className={classNames(cls.PostList, {}, [className])}>
            {
                posts?.map(post => <PostListItem key={post.id} post={post} />)
            }
        </div>
    );
});
