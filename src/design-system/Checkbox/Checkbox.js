import { styled } from '../theme/stitches.config';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
    color: '$accent11',
});

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
    all: 'unset',
    backgroundColor: '$accent4',
    width: 25,
    height: 25,
    borderRadius: '$2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': { backgroundColor: '$accent5' },
    '&:focus': { boxShadow: `0 0 0 2px $colors$accent10` },

    '&:disabled': {
        pointerEvents: 'none !important',
        color: '$neutral8 !important',
        backgroundColor: '$neutral3 !important',

        [`& ${StyledIndicator}`]: {
            color: '$neutral8 !important',
        },
    },
});

// Exports
const Checkbox = StyledCheckbox;
export const CheckboxIndicator = StyledIndicator;

export default Checkbox;
