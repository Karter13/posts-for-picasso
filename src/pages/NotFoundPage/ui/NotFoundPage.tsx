import { Text, TextSize } from 'shared/ui/Text';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
    return (
        <Text
            className={cls.NotFoundPage}
            title="Страница не найдена"
            size={TextSize.L}
        />
    );
};
