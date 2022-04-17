import { styled } from '../theme/stitches.config';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

const StyledSeparator = styled(SeparatorPrimitive.Root, {
    backgroundColor: '$neutral7',
    '&[data-orientation=horizontal]': { height: 1, width: '100%' },
    '&[data-orientation=vertical]': { height: '100%', width: 1 },

    variants: {
        size: {
            1: {
                '&[data-orientation="horizontal"]': { width: 80 },
                '&[data-orientation="vertical"]': { height: 80 },
            },
            2: {
                '&[data-orientation="horizontal"]': { width: 130 },
                '&[data-orientation="vertical"]': { height: 130 },
            },
            full: {
                '&[data-orientation=horizontal]': { height: 1, width: '100%' },
                '&[data-orientation=vertical]': { height: '100%', width: 1 },
            },
        },
    },
    defaultVariants: {
        size: '1',
    },
});

const Separator = StyledSeparator;
export default Separator;
