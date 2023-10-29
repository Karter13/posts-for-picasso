import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from './PostsPage.module.scss'
import { PostList } from "entities/Post";

export const PAGE_ID = 'PAGE_ID';

const PostsPage = () => {
    return (
        <div
            id={PAGE_ID}
            className={classNames(cls.PostsPage, {}, [])}
        >
            <PostList />
        </div>
    );
};
export default memo(PostsPage);

