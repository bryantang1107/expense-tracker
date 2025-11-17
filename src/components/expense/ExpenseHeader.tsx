'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import ExpenseForm from '@/components/expense/ExpenseForm';
import type { ExpenseFormData } from '@/types/expense';
import { useModal } from '@/contexts/ModalContext';
import { submitExpense } from '@/lib/api/expense';

export default function ExpenseHeader() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const handleSubmit = useCallback(
    async (
      formData: ExpenseFormData,
      mode: 'create' | 'edit',
      expenseId?: number
    ) => {
      try {
        await submitExpense(formData, mode, expenseId);
        closeModal();
        router.refresh();
        toast.success('Expense added successfully');
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `Failed to ${mode} expense. Please try again.`;
        toast.error(errorMessage);
      }
    },
    [closeModal, router]
  );

  const openCreateModal = useCallback(() => {
    const initialFormData: ExpenseFormData = {
      title: '',
      description: '',
      amount: 0,
      category: 'other',
      paymentMethod: 'cash',
      date: undefined,
    };

    openModal(
      <ExpenseForm
        initialData={initialFormData}
        mode="create"
        onSubmit={handleSubmit}
      />,
      {
        title: 'Add Expense',
        description: 'Enter the details for your new expense.',
        size: 'md',
      }
    );
  }, [openModal, handleSubmit]);

  return (
    <header className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Expenses
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track and review your spending
        </p>
      </div>
      <button
        onClick={openCreateModal}
        className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent cursor-pointer"
      >
        <PlusIcon className="h-4 w-4" />
        Add Expense
      </button>
    </header>
  );
}
