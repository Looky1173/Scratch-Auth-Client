import { createContext, useContext, useReducer } from 'react';

const ToastStateContext = createContext({ toasts: [], visibleToasts: [] });
const ToastDispatchContext = createContext(null);

function ToastReducer(state, action) {
    switch (action.type) {
        case 'ADD_TOAST': {
            return {
                ...state,
                toasts: [...state.toasts, action.toast],
                visibleToasts: [...state.visibleToasts, action.toast.id],
            };
        }
        case 'HIDE_TOAST': {
            const updatedVisibleToasts = state.visibleToasts.filter((e) => e != action.id);
            return {
                ...state,
                visibleToasts: updatedVisibleToasts,
            };
        }
        case 'DELETE_TOAST': {
            const updatedToasts = state.toasts.filter((e) => e.id != action.id);
            const updatedVisibleToasts = state.visibleToasts.filter((e) => e != action.id);
            return {
                ...state,
                toasts: updatedToasts,
                visibleToasts: updatedVisibleToasts,
            };
        }
        default: {
            throw new Error('Unhandled action type!');
        }
    }
}

export function CustomToastProvider({ children }) {
    const [state, dispatch] = useReducer(ToastReducer, {
        toasts: [],
        visibleToasts: [],
    });
    return (
        <ToastStateContext.Provider value={state}>
            <ToastDispatchContext.Provider value={dispatch}>{children}</ToastDispatchContext.Provider>
        </ToastStateContext.Provider>
    );
}

export const useToastDispatchContext = () => useContext(ToastDispatchContext);
export const useToastStateContext = () => useContext(ToastStateContext);
