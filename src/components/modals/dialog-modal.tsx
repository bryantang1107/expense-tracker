import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';

interface DialogModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
  triggerBtnText: string;
  footerBtnText: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isSubmitting?: boolean;
}

export default function DialogModal({
  title,
  description,
  children,
  triggerBtnText,
  footerBtnText,
  open,
  onOpenChange,
  isSubmitting = false,
}: DialogModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800">
          <PlusIcon className="h-4 w-4" />
          {triggerBtnText}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button
            type="submit"
            form="expense-form"
            variant="outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : footerBtnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
