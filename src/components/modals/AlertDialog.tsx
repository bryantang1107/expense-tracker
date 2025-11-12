'use client';

import {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAlertDialog } from '@/contexts/AlertDialogContext';
import { useState } from 'react';

export default function AlertDialog() {
  const { isOpen, closeAlertDialog, dialogOptions } = useAlertDialog();
  const [isLoading, setIsLoading] = useState(false);

  if (!dialogOptions) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await dialogOptions.onConfirm();
      closeAlertDialog();
    } catch (error) {
      // Error handling is done by the caller (e.g., toast notifications)
      // Close dialog even on error to allow user to see the error toast
      closeAlertDialog();
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      closeAlertDialog();
    }
  };

  return (
    <AlertDialogPrimitive open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogOptions.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogOptions.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {dialogOptions.cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className={
              dialogOptions.variant === 'destructive'
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : ''
            }
          >
            {isLoading ? 'Loading...' : dialogOptions.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogPrimitive>
  );
}
