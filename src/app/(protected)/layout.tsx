import Sidebar from '@/components/layout/Sidebar';
import { ModalProvider } from '@/contexts/ModalContext';
import { AlertDialogProvider } from '@/contexts/AlertDialogContext';
import FormModal from '@/components/modals/FormModal';
import AlertDialog from '@/components/modals/AlertDialog';
import { Toaster } from '@/components/ui/sonner';
import { UserButton } from '@clerk/nextjs';
import { ThemeButton } from '@/components/ThemeButton';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalProvider>
      <AlertDialogProvider>
        <header className="flex justify-end items-center p-4 gap-4 h-16 fixed top-0 right-0 z-50">
          <ThemeButton />
          <UserButton />
        </header>
        <div className="min-h-screen bg-background text-foreground">
          <div className="mx-auto flex w-full gap-0">
            <Sidebar />
            <main className="flex-1 px-6 py-8 ml-10 transition-all duration-300">
              {children}
            </main>
          </div>
        </div>
        <FormModal />
        <AlertDialog />
        <Toaster />
      </AlertDialogProvider>
    </ModalProvider>
  );
}
