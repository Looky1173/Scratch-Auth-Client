import { useToastDispatchContext } from '@design-system/Toast';

function useToast() {
    const dispatch = useToastDispatchContext();

    function toast(options) {
        // Generate v4 UUID
        const id = crypto.randomUUID();
        // Add toast
        dispatch({ type: 'ADD_TOAST', toast: { options: options, id: id } });
        return id;
    }

    function deleteToast(id) {
        // Hides the toast but does not remove it from the DOM to allow the fade out animation to play
        dispatch({ type: 'HIDE_TOAST', id: id });
        setTimeout(() => {
            // After the animation is finished, remove the toast from memory
            dispatch({ type: 'DELETE_TOAST', id: id });
        }, 500);
    }

    return [toast, deleteToast];
}

export default useToast;
