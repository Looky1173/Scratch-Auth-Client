import { styled } from "../theme";
import Text from '../Text'

const Link = styled('a', {
    alignItems: 'center',
    gap: '$1',
    flexShrink: 0,
    outline: 'none',
    textDecorationLine: 'none',
    textUnderlineOffset: '2px',
    textDecorationThickness: '2px !important',
    textDecorationColor: '$accent7',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    lineHeight: 'inherit',
    '@hover': {
        '&:hover': {
            textDecorationLine: 'underline',
            textDecorationThickness: '2px',
        },
    },
    '&:focus': {
        outlineWidth: '2px',
        outlineStyle: 'solid',
        outlineOffset: '2px',
        textDecorationLine: 'none',
    },
    [`& ${Text}`]: {
        color: 'inherit',
    },
    variants: {
        variant: {
            blue: {
                color: '$blue11',
                textDecorationColor: '$blue4',
                '&:focus': {
                    outlineColor: '$blue8',
                },
            },
            subtle: {
                color: '$slate11',
                textDecorationColor: '$slate4',
                '&:focus': {
                    outlineColor: '$slate8',
                },
            },
            contrast: {
                color: '$hiContrast',
                textDecoration: 'underline',
                textDecorationColor: '$accent7',
                '@hover': {
                    '&:hover': {
                        textDecorationColor: '$accent9',
                    },
                },
                '&:focus': {
                    outlineColor: '$accent10',
                },
            },
        },
    },
    defaultVariants: {
        variant: 'contrast',
    },
});

export default Link;
