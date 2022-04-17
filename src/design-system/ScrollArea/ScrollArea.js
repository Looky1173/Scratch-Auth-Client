import { styled } from '../theme/stitches.config';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

const SCROLLBAR_SIZE = 10;

const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
    width: 200,
    height: 225,
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: `0 2px 10px $colors$neutral7`,
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
});

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
    display: 'flex',
    userSelect: 'none',
    touchAction: 'none',
    padding: 2,
    backgroundColor: '$neutral6',
    transition: 'background 160ms ease-out',
    '&:hover': { backgroundColor: '$neutral8' },
    '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
    '&[data-orientation="horizontal"]': {
        flexDirection: 'column',
        height: SCROLLBAR_SIZE,
    },
});

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
    flex: 1,
    backgroundColor: '$accent10',
    borderRadius: SCROLLBAR_SIZE,
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        minWidth: 44,
        minHeight: 44,
    },
});

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
    backgroundColor: '$neutral8',
});

// Exports
const ScrollArea = StyledScrollArea;
export const ScrollAreaViewport = StyledViewport;
export const ScrollAreaScrollbar = StyledScrollbar;
export const ScrollAreaThumb = StyledThumb;
export const ScrollAreaCorner = StyledCorner;

export default ScrollArea;
