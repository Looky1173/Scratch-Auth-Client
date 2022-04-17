import { styled } from '../theme/stitches.config';

const Card = styled('div', {
    appearance: 'none',
    border: 'none',
    boxSizing: 'border-box',
    font: 'inherit',
    outline: 'none',
    padding: 0,
    textAlign: 'inherit',
    verticalAlign: 'middle',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

    backgroundColor: '$card2',
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    flexShrink: 0,
    borderRadius: '$4',
    position: 'relative',

    '&::before': {
        boxSizing: 'border-box',
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.1)',
        borderRadius: '$4',
        pointerEvents: 'none',
    },

    variants: {
        variant: {
            interactive: {
                '@hover': {
                    '&:hover': {
                        '&::before': {
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.2)',
                        },
                    },
                },
                '&:focus': {
                    '&::before': {
                        boxShadow: '0 0 0 2px $colors$accent8',
                    },
                },
            },
            ghost: {
                backgroundColor: 'transparent',
                transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1), background-color 25ms linear',
                willChange: 'transform',
                '&::before': {
                    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
                    opacity: '0',
                    transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                },
                '@hover': {
                    '&:hover': {
                        backgroundColor: '$card2',
                        transform: 'translateY(-2px)',
                        '&::before': {
                            opacity: '1',
                        },
                    },
                },
                '&:active': {
                    transform: 'translateY(0)',
                    transition: 'none',
                    '&::before': {
                        boxShadow: '0px 5px 16px -5px rgba(22, 23, 24, 0.35), 0px 5px 10px -7px rgba(22, 23, 24, 0.2)',
                        opacity: '1',
                    },
                },
                '&:focus': {
                    boxShadow: 'inset 0 0 0 1px $colors$accent8, 0 0 0 1px $colors$accent8',
                },
            },
            active: {
                transform: 'translateY(0)',
                transition: 'none',
                '&::before': {
                    boxShadow: '0px 5px 16px -5px rgba(22, 23, 24, 0.35), 0px 5px 10px -7px rgba(22, 23, 24, 0.2)',
                    opacity: '1',
                },
                '&:focus': {
                    boxShadow: 'inset 0 0 0 1px $colors$accent8, 0 0 0 1px $colors$accent8',
                },
            },
        },
    },
});

export default Card;
