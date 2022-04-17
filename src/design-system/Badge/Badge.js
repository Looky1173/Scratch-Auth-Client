import { styled } from '../theme/stitches.config';

const Badge = styled('span', {
    // Reset
    alignItems: 'center',
    appearance: 'none',
    borderWidth: '0',
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexShrink: 0,
    fontFamily: 'inherit',
    justifyContent: 'center',
    lineHeight: '1',
    verticalAlign: 'middle',
    outline: 'none',
    padding: '0',
    textDecoration: 'none',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    '&:disabled': {
        backgroundColor: '$neutral3',
        pointerEvents: 'none',
        color: '$neutral8',
    },
    '&::before': {
        boxSizing: 'border-box',
        content: '""',
    },
    '&::after': {
        boxSizing: 'border-box',
        content: '""',
    },

    // Custom
    backgroundColor: '$neutral3',
    borderRadius: '$pill',
    color: '$neutral11',
    whiteSpace: 'nowrap',
    fontVariantNumeric: 'tabular-nums',

    variants: {
        size: {
            1: {
                height: '$5',
                px: '$2',
                fontSize: '$2',
            },
            2: {
                height: '$6',
                px: '$3',
                fontSize: '$3',
            },
        },
        variant: {
            neutral: {
                backgroundColor: '$neutral4',
                color: '$neutral11',
                '&:focus': {
                    boxShadow: 'inset 0 0 0 1px $colors$neutral8, 0 0 0 1px $colors$neutral8',
                },
            },
            accent: {
                backgroundColor: '$accent4',
                color: '$accent11',
                '&:focus': {
                    boxShadow: 'inset 0 0 0 1px $colors$accent8, 0 0 0 1px $colors$accent8',
                },
            },
        },
        interactive: {
            true: {},
        },
    },

    compoundVariants: [
        {
            interactive: true,
            variant: 'neutral',
            css: {
                '@hover': {
                    '&:hover': {
                        backgroundColor: '$neutral4',
                    },
                },
                '&:active': {
                    backgroundColor: '$neutral5',
                },
                '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]': {
                    backgroundColor: '$neutral5',
                },
            },
        },
        {
            interactive: true,
            variant: 'accent',
            css: {
                '@hover': {
                    '&:hover': {
                        backgroundColor: '$accent4',
                    },
                },
                '&:active': {
                    backgroundColor: '$accent5',
                },
                '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]': {
                    backgroundColor: '$accent5',
                },
            },
        },
    ],
    defaultVariants: {
        size: '1',
        variant: 'neutral',
    },
});

export default Badge;
