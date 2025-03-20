import type { AlertColor, SnackbarOrigin } from "@mui/material";
import type { ReactNode } from "react";

import type { StateCreator } from "zustand";
import { create } from "zustand";

interface ModalData {
  id?: string;
  content: ReactNode;
  onClose?: () => void;
}

interface ToastParams {
  variant?: "standard" | "filled" | "outlined";
  color?: AlertColor;
  withCloseIcon?: boolean;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
}

interface ToastData {
  message: string;
  id?: string;
  params?: ToastParams;
}

interface GeneralState {
  modals: ModalData[];
  loading: boolean;
  toasts: ToastData[];
  openModal: (content: ReactNode, id?: string, onClose?: () => void) => void;
  closeModal: (id?: string) => void;
  setLoading: (loading: boolean) => void;
  openToast: (message: string, id?: string, params?: ToastParams) => void;
  closeToast: (id?: string) => void;
}

const generalStore: StateCreator<GeneralState> = (set, get) => ({
  modals: [],
  openModal: (content, id, onClose) =>
    set((state) => {
      const { modals } = state;
      if (id) {
        const existingIndex = modals.findIndex((modal) => modal.id === id);
        if (existingIndex !== -1) {
          const updatedModals = [...modals];
          updatedModals[existingIndex] = { id, content, onClose };
          return { modals: updatedModals };
        }
      }
      return { modals: [...modals, { id, content, onClose }] };
    }),
  closeModal: (id) => {
    const { modals } = get();
    if (id) {
      const modalToClose = modals.find((modal) => modal.id === id);
      modalToClose?.onClose?.();
      set({ modals: modals.filter((modal) => modal.id !== id) });
    } else {
      if (modals.length === 0) return;
      const lastModal = modals[modals.length - 1];
      lastModal.onClose?.();
      set({ modals: modals.slice(0, -1) });
    }
  },
  loading: false,
  setLoading: (loading) => {
    set({ loading });
  },
  toasts: [],
  openToast: (message, id, params) =>
    set((state) => {
      const { toasts } = state;
      if (id) {
        const existingIndex = toasts.findIndex((toast) => toast.id === id);
        if (existingIndex !== -1) {
          const updatedToasts = [...toasts];
          updatedToasts[existingIndex] = { message, id, params };
          return { toasts: updatedToasts };
        }
      }
      return { toasts: [...toasts, { message, id, params }] };
    }),
  closeToast: (id) => {
    const { toasts } = get();
    if (id) {
      set({ toasts: toasts.filter((toast) => toast.id !== id) });
    } else {
      if (toasts.length === 0) return;
      set({ toasts: toasts.slice(0, -1) });
    }
  },
});

export const useGeneralStore = create<GeneralState>(generalStore);
