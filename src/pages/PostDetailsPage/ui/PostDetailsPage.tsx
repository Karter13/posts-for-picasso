import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import { PostDetails } from 'entities/Post';
import cls from './PostDetailsPage.module.scss';

interface PostDetailsPageProps {
    className?: string;
}

const PostDetailsPage = ({ className }: PostDetailsPageProps) => {
    const { id } = useParams();

    if (!id) {
        return null;
    }

    return (
        <div className={classNames(cls.PostDetailsPage, {}, [className])}>
            <PostDetails id={id} />
        </div>
    );
};

export default memo(PostDetailsPage);
