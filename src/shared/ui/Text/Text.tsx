import { memo } from 'react';
import cls from './Text.module.scss';
import { classNames, Mods } from "../../lib/classNames/classNames";

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    size?: TextSize;
    trimming?: boolean;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        size = TextSize.M,
        trimming
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    const mods: Mods = {};
    const textMods: Mods = {
        [cls.trimming]: trimming
    }

    return (
        <div className={classNames(cls.Text, mods, [className, cls[theme], cls[size]])}>
            {title && (
                <HeaderTag
                    className={cls.title}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={classNames(cls.text, textMods, [])} >
                    {text}
                </p>
            )}
        </div>
    );
});
