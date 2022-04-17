import { createStitches } from '@stitches/react';
import commonTheme from './common';
import lightTheme from './light-theme';
import darkTheme from './dark-theme';
import deepMerge from '@utils/deep-merge';

export const getStitchesTheme = (targetTheme) => {
    return deepMerge(targetTheme, commonTheme.theme);
};

const stitches = createStitches({
    ...commonTheme,
    theme: {
        ...commonTheme.theme,
        shadows: {
            ...lightTheme.shadows,
        },
        colors: {
            ...commonTheme.theme.colors,
            ...lightTheme.colors,
        },
    },
});

export const createThemeBase = stitches.createTheme;
export const styled = stitches.styled;
export const css = stitches.css;
export const globalCss = stitches.globalCss;
export const keyframes = stitches.keyframes;
export const getCssText = stitches.getCssText;
export const theme = stitches.theme;
export const config = stitches.config;

export const sharedFocus = css({
    WebkitTapHighlightColor: 'transparent',
    '&:focus:not(&:focus-visible)': {
        boxShadow: 'none',
    },
    '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 2px $colors$background, 0 0 0 4px $colors$primary',
    },
    '@safari': {
        WebkitTapHighlightColor: 'transparent',
        outline: 'none',
    },
});

export const cssFocusVisible = css({
    variants: {
        isFocusVisible: {
            true: {
                outline: 'none',
                boxShadow: '0 0 0 2px $colors$background, 0 0 0 4px $colors$primary !important',
            },
        },
    },
});

export const sharedVisuallyHidden = css({
    border: '0px',
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    width: '1px',
    margin: '-1px',
    padding: '0px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'absolute',
});

export const createTheme = ({ type, theme, className }) => {
    if (!type) {
        throw new Error('Theme type is required');
    }
    return createThemeBase(className || `${type}-theme`, deepMerge(type === 'dark' ? darkTheme : lightTheme, theme));
};
