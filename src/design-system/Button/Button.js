import { styled } from '../theme';

const Button = styled('button', {
    appearance: 'none',
    border: '0',
    outline: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'transparent',
    fontFamily: '$sans',
    lineHeight: 1,
    fontWeight: 600,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    userSelect: 'none',
    fontSize: '$4',
    transition: 'background-color 300ms ease',

    '&:disabled': {
        pointerEvents: 'none !important',
        color: '$neutral8 !important',
        backgroundColor: '$neutral3 !important',
    },

    variants: {
        variant: {
            neutral: {
                color: '$neutral11',
                '&:hover': {
                    backgroundColor: '$neutral5',
                },
                '&:focus': {
                    boxShadow: '0 0 0 1px $colors$neutral8, inset 0 0 0 1px $colors$neutral8',
                },
            },

            base: {
                backgroundColor: '$neutral4',
                color: '$neutral11',
                '&:hover': {
                    backgroundColor: '$neutral5',
                },
                '&:active': {
                    backgroundColor: '$neutral6',
                },
                '&:focus': {
                    boxShadow: '0 0 0 1px $colors$neutral8, inset 0 0 0 1px $colors$neutral8',
                },
            },

            accent: {
                backgroundColor: '$accent4',
                color: '$accent11',
                '&:hover': {
                    backgroundColor: '$accent5',
                },
                '&:active': {
                    backgroundColor: '$accent6',
                },
                '&:focus': {
                    boxShadow: '0 0 0 1px $colors$accent8, inset 0 0 0 1px $colors$accent8',
                },
            },

            danger: {
                backgroundColor: '$danger4',
                color: '$danger11',
                '&:hover': {
                    backgroundColor: '$danger5',
                },
                '&:active': {
                    backgroundColor: '$danger6',
                },
                '&:focus': {
                    boxShadow: '0 0 0 1px $colors$danger8, inset 0 0 0 1px $colors$danger8',
                },
            },
        },
        size: {
            small: {
                borderRadius: '$2',
                height: '$5',
                px: '$2',
            },
            base: {
                borderRadius: '9999px',
                height: '$7',
                px: '$4',
            },
        },
    },

    defaultVariants: {
        variant: 'base',
        size: 'base',
    },
});

export default Button;
