import { styled, keyframes } from '../theme/stitches.config';
import * as ToastPrimitive from '@radix-ui/react-toast';

const VIEWPORT_PADDING = 25;

const hide = keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
});

const slideIn = keyframes({
    from: { transform: `translateY(calc(-100% + ${VIEWPORT_PADDING}px))`, opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
});

const swipeOut = keyframes({
    from: { transform: 'translateY(var(--radix-toast-swipe-end-y))' },
    to: { transform: `translateY(calc(-100% - ${VIEWPORT_PADDING}px))` },
});

const StyledViewport = styled(ToastPrimitive.Viewport, {
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    padding: VIEWPORT_PADDING,
    gap: 10,
    width: 500,
    maxWidth: '100vw',
    margin: 0,
    listStyle: 'none',
    zIndex: '$4',
});

const StyledToast = styled(ToastPrimitive.Root, {
    borderRadius: 6,
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    padding: 15,
    display: 'grid',
    gridTemplateAreas: '"title action" "description action"',
    gridTemplateColumns: 'auto max-content',
    columnGap: 15,
    alignItems: 'center',
    margin: 0,
    transition: 'box-shadow 300ms ease',

    '&:hover, &:focus, &:focus-visible': {
        outline: 'none',
    },

    '@media (prefers-reduced-motion: no-preference)': {
        '&[data-state="open"]': {
            animation: `${slideIn} 500ms cubic-bezier(0.16, 1, 0.3, 1)`,
        },
        '&[data-state="closed"]': {
            animation: `${hide} 300ms ease-in forwards`,
        },
        '&[data-swipe="move"]': {
            transform: 'translate(var(--radix-toast-swipe-move-x), var(--radix-toast-swipe-move-y))',
        },
        '&[data-swipe="cancel"]': {
            transform: 'translateX(0)',
            transition: 'transform 200ms ease-out',
        },
        '&[data-swipe="end"]': {
            animation: `${swipeOut} 100ms ease-out forwards`,
        },
    },

    variants: {
        variant: {
            neutral: {
                backgroundColor: '$card2',
                '&:hover, &:focus, &:focus-visible': {
                    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px $colors$accent7',
                },
            },
            danger: {
                backgroundColor: '$danger2',
                '&:hover, &:focus, &:focus-visible': {
                    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px $colors$danger7',
                },
            },
        },
    },

    defaultVariants: {
        variant: 'neutral',
    },
});

const StyledTitle = styled(ToastPrimitive.Title, {
    gridArea: 'title',
    marginBottom: 5,
    fontWeight: 500,
    color: '$neutral12',
    fontSize: '$5',
});

const StyledDescription = styled(ToastPrimitive.Description, {
    gridArea: 'description',
    margin: 0,
    color: '$neutral11',
    fontSize: '$4',
    lineHeight: 1.3,
});

const StyledAction = styled(ToastPrimitive.Action, {
    gridArea: 'action',
});

// Exports
export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = StyledViewport;
const Toast = StyledToast;
export const ToastTitle = StyledTitle;
export const ToastDescription = StyledDescription;
export const ToastAction = StyledAction;
export const ToastClose = ToastPrimitive.Close;

export default Toast;
