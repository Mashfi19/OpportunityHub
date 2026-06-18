"use client";

import * as React from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

type Listener = (toasts: Toast[]) => void;
const listeners = new Set<Listener>();
let toastsList: Toast[] = [];

export function toast({
  title,
  description,
  type = "info",
  duration = 4000,
}: Omit<Toast, "id">) {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast: Toast = { id, title, description, type, duration };
  toastsList = [...toastsList, newToast];
  
  listeners.forEach((listener) => listener(toastsList));

  if (duration > 0) {
    setTimeout(() => {
      dismissToast(id);
    }, duration);
  }

  return id;
}

export function dismissToast(id: string) {
  toastsList = toastsList.filter((t) => t.id !== id);
  listeners.forEach((listener) => listener(toastsList));
}

export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>(toastsList);

  React.useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setToasts(newToasts);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    toasts,
    toast,
    dismiss: dismissToast,
  };
}
