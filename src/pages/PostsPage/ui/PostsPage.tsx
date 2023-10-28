import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from './PostsPage.module.scss'
import { PostList } from "entities/Post";
import { Page } from "widgets/Page";

const PostsPage = () => {
    return (
        <div className={classNames(cls.PostsPage, {}, [])}>
            <PostList />
        </div>
    );
};
export default memo(PostsPage);

