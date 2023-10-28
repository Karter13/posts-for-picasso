import cls from './PostDetails.module.scss';
import { classNames } from "shared/lib/classNames/classNames";
import { postAPI } from "../../api/postApi";
import { Text, TextSize } from "shared/ui/Text";
import { Button, ButtonTheme } from "shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";
import { getRoutePosts } from "shared/const/router";
import { Skeleton } from "shared/ui/Skeleton";
import { ErrorPage } from "widgets/ErrorPage";

interface PostDetailsProps {
    className?: string;
    id: string;
}

export const PostDetails = memo(({ className, id }: PostDetailsProps) => {
    const navigate = useNavigate();
    const { data: post, isLoading, error } = postAPI.useFetchPostQuery(Number(id))

    const onPostsPage = useCallback(() => {
        navigate(getRoutePosts())
    }, [navigate, post])

    if (isLoading) {
        return (
            <div
                className={classNames('', {}, [className])}
            >
                <Skeleton width="100%" border="8px" height="400px" />
            </div>
        );
    }
    if (error) {
        return (<ErrorPage />)
    }

    return (
        <div className={classNames(cls.PostDetails, {}, [className])}>
            <Text
                title={post?.title}
                text={post?.body}
                size={TextSize.L}
            />
            <Button
                className={cls.button}
                theme={ButtonTheme.BACKGROUND}
                onClick={onPostsPage}
            >
                Назад
            </Button>
        </div>
    );
});
