'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
  isOpen: boolean;
  modalContent: ReactNode | null;
  modalOptions: ModalOptions;
}

interface ModalOptions {
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClose?: () => void;
}

const defaultOptions: ModalOptions = {
  title: '',
  description: '',
  size: 'md',
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalOptions, setModalOptions] =
    useState<ModalOptions>(defaultOptions);

  const openModal = useCallback(
    (content: ReactNode, options: ModalOptions = {}) => {
      setModalContent(content);
      setModalOptions({ ...defaultOptions, ...options });
      setIsOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    if (modalOptions.onClose) {
      modalOptions.onClose();
    }
    setModalContent(null);
    setModalOptions(defaultOptions);
  }, [modalOptions]);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        isOpen,
        modalContent,
        modalOptions,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
