'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface AlertDialogContextType {
  openAlertDialog: (options: AlertDialogOptions) => void;
  closeAlertDialog: () => void;
  isOpen: boolean;
  dialogOptions: AlertDialogOptions | null;
}

interface AlertDialogOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

const defaultOptions: AlertDialogOptions = {
  title: '',
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'default',
  onConfirm: () => {},
};

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(
  undefined
);

export function AlertDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<AlertDialogOptions | null>(
    null
  );

  const openAlertDialog = useCallback((options: AlertDialogOptions) => {
    setDialogOptions({
      ...defaultOptions,
      ...options,
    });
    setIsOpen(true);
  }, []);

  const closeAlertDialog = useCallback(() => {
    setIsOpen(false);
    if (dialogOptions?.onCancel) {
      dialogOptions.onCancel();
    }
    setDialogOptions(null);
  }, [dialogOptions]);

  return (
    <AlertDialogContext.Provider
      value={{
        openAlertDialog,
        closeAlertDialog,
        isOpen,
        dialogOptions,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}

export function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (context === undefined) {
    throw new Error(
      'useAlertDialog must be used within an AlertDialogProvider'
    );
  }
  return context;
}
