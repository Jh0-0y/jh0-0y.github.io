import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'> & { id?: number }) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: Date.now() + Math.random(),
          type: toast.type || 'info',
          message: toast.message,
          duration: toast.duration || 3000,
        },
      ],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);

  return {
    success: (message: string, duration?: number) => {
      addToast({ type: 'success', message, duration: duration || 3000 });
    },
    error: (message: string, duration?: number) => {
      addToast({ type: 'error', message, duration: duration || 3000 });
    },
    warning: (message: string, duration?: number) => {
      addToast({ type: 'warning', message, duration: duration || 3000 });
    },
    info: (message: string, duration?: number) => {
      addToast({ type: 'info', message, duration: duration || 3000 });
    },
  };
};