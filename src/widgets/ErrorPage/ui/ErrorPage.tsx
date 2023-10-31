import { Button } from 'shared/ui/Button';
import { Text, TextSize } from 'shared/ui/Text';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './ErrorPage.module.scss';

interface ErrorPageProps {
    className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls.ErrorPage, {}, [className])}>
            <Text
                className={cls.title}
                title="Произошла непредвиденная ошибка"
                size={TextSize.L}
            />
            <Button onClick={reloadPage}>Обновить страницу</Button>
        </div>
    );
};
