import cls from './NotFoundPage.module.scss';
import { Text, TextSize } from "shared/ui/Text";

export const NotFoundPage = () => {
    return (
        <Text
            className={cls.NotFoundPage}
            title="Страница не найдена"
            size={TextSize.L}
        />
    );
};
