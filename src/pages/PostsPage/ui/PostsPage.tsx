import { memo } from 'react';

import { PostList } from 'entities/Post';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text';

import cls from './PostsPage.module.scss';

export const PostsPage = memo(() => {
    return (
        <div
            className={classNames(cls.PostsPage, {}, [])}
        >
            <Text className={cls.title} title="Список постов" size={TextSize.L} />
            <PostList />
        </div>
    );
});



