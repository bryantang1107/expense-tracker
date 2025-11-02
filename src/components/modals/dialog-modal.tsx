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

interface DialogModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
  triggerBtnText: string;
  footerBtnText: string;
}

export default function DialogModal({
  title,
  description,
  children,
  triggerBtnText,
  footerBtnText,
}: DialogModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800">
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
          <Button type="submit" variant="outline">
            {footerBtnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
