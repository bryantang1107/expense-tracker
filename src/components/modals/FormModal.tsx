'use client';

import { useModal } from '@/contexts/ModalContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MeshGradient } from '@mesh-gradient/react';
import { type MeshGradientOptions } from '@mesh-gradient/core';
import { cn } from '@/lib/utils';

const options: MeshGradientOptions = {
  colors: ['#0F2027', '#203A43', '#2C5364', '#4f818d'],
  animationSpeed: 1.5,
};

const sizeClasses = {
  sm: 'sm:max-w-[300px]',
  md: 'sm:max-w-[425px]',
  lg: 'sm:max-w-[600px]',
  xl: 'sm:max-w-[800px]',
};

export default function FormModal() {
  const { isOpen, closeModal, modalContent, modalOptions } = useModal();
  const { title, description, size = 'md' } = modalOptions;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className={cn(sizeClasses[size], 'p-0 border-none')}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="relative p-6 w-full h-full">
          <MeshGradient
            options={options}
            className="absolute inset-0 -z-10 rounded-lg w-full h-full"
          />
          <div className="relative z-20">
            {(title || description) && (
              <DialogHeader>
                {title && (
                  <DialogTitle className="text-white">{title}</DialogTitle>
                )}
                {description && (
                  <DialogDescription className="text-white">
                    {description}
                  </DialogDescription>
                )}
              </DialogHeader>
            )}
            {modalContent}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
