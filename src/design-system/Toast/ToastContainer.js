import Toast, { ToastProvider, ToastTitle, ToastDescription, ToastAction, ToastViewport } from './Toast';
import { useToastStateContext, useToastDispatchContext } from './ToastContext';

export function ToastContainer() {
    const { toasts, visibleToasts } = useToastStateContext();
    const dispatch = useToastDispatchContext();

    function deleteToast(id, open) {
        if (!open) {
            // Hides the toast but does not remove it from the DOM to allow the fade out animation to play
            dispatch({ type: 'HIDE_TOAST', id: id });
            setTimeout(() => {
                // After the animation is finished, remove the toast from memory
                dispatch({ type: 'DELETE_TOAST', id: id });
            }, 500);
        }
    }

    return (
        <ToastProvider swipeDirection="up" swipeThreshold={1}>
            {toasts &&
                toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        open={visibleToasts.includes(toast.id)}
                        onOpenChange={(isOpen) => deleteToast(toast.id, isOpen)}
                        duration={toast.options.duration}
                        variant={toast.options.variant}
                        css={{ display: toast.options.customContent !== null ? 'block' : 'grid' }}
                    >
                        {toast.options.customContent && toast.options.customContent}
                        {!toast.options.customContent && (
                            <>
                                <ToastTitle>{toast.options.title}</ToastTitle>
                                {toast.options.description && <ToastDescription asChild={toast.options?.asChild?.description || false}>{toast.options.description}</ToastDescription>}
                                {toast.options.action && (
                                    <ToastAction asChild={toast.options?.asChild?.action || false} altText={toast.options?.actionAltText || 'Take action on this toast'}>
                                        {toast.options.action}
                                    </ToastAction>
                                )}
                            </>
                        )}
                    </Toast>
                ))}
            <ToastViewport />
        </ToastProvider>
    );
}
