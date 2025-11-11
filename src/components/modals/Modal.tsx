'use client';

import { useModal } from '@/contexts/ModalContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const sizeClasses = {
  sm: 'sm:max-w-[300px]',
  md: 'sm:max-w-[425px]',
  lg: 'sm:max-w-[600px]',
  xl: 'sm:max-w-[800px]',
};

export default function Modal() {
  const { isOpen, closeModal, modalContent, modalOptions } = useModal();
  const { title, description, size = 'md' } = modalOptions;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className={sizeClasses[size]}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {modalContent}
      </DialogContent>
    </Dialog>
  );
}
