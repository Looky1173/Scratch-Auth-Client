import { styled } from '../theme/stitches.config';
import * as TabsPrimitive from '@radix-ui/react-tabs';

const StyledTabs = styled(TabsPrimitive.Root, {
    display: 'flex',
    '&[data-orientation="horizontal"]': {
        flexDirection: 'column',
    },
});

const StyledList = styled(TabsPrimitive.List, {
    flexShrink: 0,
    display: 'flex',
    '&[data-orientation="vertical"]': {
        flexDirection: 'column',
    },
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
    all: 'unset',
    fontFamily: 'inherit',
    backgroundColor: '$neutral4',
    padding: '0 20px',
    height: 45,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '$4',
    color: '$neutral11',
    userSelect: 'none',
    '&:hover': { color: '$accent11' },
    '&[data-orientation="horizontal"]': {
        borderBottom: '2px solid currentColor',
        '&:first-child': { borderTopLeftRadius: '$4' },
        '&:last-child': { borderTopRightRadius: '$4' },
    },

    '&[data-orientation="vertical"]': {
        borderRight: '2px solid currentColor',
        padding: '0.6em 3rem',
        '&:first-child': { borderTopLeftRadius: '$4' },
        '&:last-child': { borderBottomLeftRadius: '$4' },
    },
    '&[data-disabled]': { color: '$neutral8', backgroundColor: '$neutral2' },
    '&[data-state="active"]': {
        backgroundColor: '$accent4',
        color: '$accent11',
        fontWeight: '$bold',
    },
});

const StyledContent = styled(TabsPrimitive.Content, {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'transparent',
    '&[data-orientation="horizontal"]': {
        borderBottomLeftRadius: '$4',
        borderBottomRightRadius: '$4',
    },
    '&[data-orientation="vertical"]': {
        borderTopRightRadius: '$4',
        borderBottomRightRadius: '$4',
    },
    outline: 'none',
    '&:focus': { boxShadow: `0 0 0 2px $colors$accent11` },
});

// Exports
const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;

export default Tabs;
