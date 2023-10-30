import { memo } from "react";

import { PostList } from "entities/Post";
import { classNames } from "shared/lib/classNames/classNames";
import cls from './PostsPage.module.scss'

export const PostsPage = memo(() => {
    return (
        <div
            className={classNames(cls.PostsPage, {}, [])}
        >
            <PostList />
        </div>
    );
});

