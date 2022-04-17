import { styled } from '@design-system';

const HomepageButton = styled('button', {
    appearance: 'none',
    border: '0',
    outline: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'transparent',
    fontFamily: '$sans',
    borderRadius: '9999px',
    lineHeight: 1,
    fontWeight: 600,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    userSelect: 'none',
    fontSize: '$base',
    height: '$6',
    px: '$3',
    transition: 'background-color 300ms ease',

    variants: {
        color: {
            neutral: {
                color: '$neutral11',
                '&:hover': {
                    backgroundColor: '$neutral5',
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
        },
    },

    defaultVariants: {
        color: 'neutral',
    },
});

export default HomepageButton;
