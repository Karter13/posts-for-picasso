import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import cls from './PostListItem.module.scss';
import { classNames } from "shared/lib/classNames/classNames";
import { IPost } from "../../model/types/post";
import { Text, TextSize } from "shared/ui/Text";
import { Button, ButtonTheme } from "shared/ui/Button";
import { getRoutePostDetails } from "shared/const/router";

interface PostListItemProps {
    className?: string;
    post: IPost;
}

export const PostListItem = ({ className, post }: PostListItemProps) => {
    const navigate = useNavigate();

    const onPostDetailsPage = useCallback(() => {
       navigate(getRoutePostDetails(String(post.id)))
    }, [navigate, post])

    return (
        <div className={classNames(cls.PostListItem, {}, [className])}>
            <Text
                text={post.body}
                size={TextSize.M}
                title={`${post.id}.${post.title}`}
                trimming
            />
            <Button
                className={cls.button}
                theme={ButtonTheme.BACKGROUND}
                onClick={onPostDetailsPage}
            >Просмотр</Button>
        </div>
    );
};
