'use client';

import {
  CalendarIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import type { ExpenseData } from '@/types/expense';
import { getHeroIcon } from '@/lib/icons';
import ExpenseForm from './ExpenseForm';
import { useModal } from '@/contexts/ModalContext';
import { useCallback } from 'react';
import type { ExpenseFormData } from '@/types/expense';
import { useRouter } from 'next/navigation';
import { submitExpense, deleteExpense } from '@/lib/api/expense';

interface ExpenseTableProps {
  expenses: ExpenseData[];
}

export default function ExpenseTable({ expenses }: ExpenseTableProps) {
  const { openModal, closeModal } = useModal();
  const router = useRouter();

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

  const handleDelete = useCallback(
    async (expenseId: number) => {
      try {
        await deleteExpense(expenseId);
        closeModal();
        router.refresh();
        toast.success('Expense deleted successfully');
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to delete expense. Please try again.';
        toast.error(errorMessage);
      }
    },
    [closeModal, router]
  );

  const openEditModal = useCallback(
    (expense: ExpenseData) => {
      const formData: ExpenseFormData = {
        title: expense.title,
        description: expense.description || '',
        amount: expense.amount,
        category: expense.category.value as any,
        paymentMethod: expense.paymentMethod.value as any,
        date: expense.rawDate,
      };

      openModal(
        <ExpenseForm
          initialData={formData}
          mode="edit"
          expenseId={expense.id}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />,
        {
          title: 'Edit Expense',
          description: 'Update the details for this expense.',
          size: 'md',
        }
      );
    },
    [openModal, handleSubmit, handleDelete]
  );
  const formatAmount = (amount: number) => {
    return `-RM${amount.toFixed(2)}`;
  };

  return (
    <section className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead className="text-xs uppercase text-zinc-500">
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  Date
                </div>
              </th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <CreditCardIcon className="h-3.5 w-3.5" />
                  Payment
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <BanknotesIcon className="h-3.5 w-3.5" />
                  Amount
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-zinc-900 dark:text-zinc-100">
            {expenses.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-zinc-500 dark:text-zinc-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <DocumentTextIcon className="h-8 w-8 text-zinc-400" />
                    <p>
                      No expenses found. Add your first expense to get started!
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr
                  key={expense.id}
                  onClick={() => openEditModal(expense)}
                  className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {expense.date}
                  </td>
                  <td className="px-4 py-3">{expense.title}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {expense.category.iconString &&
                        (() => {
                          const Icon = getHeroIcon(expense.category.iconString);
                          return Icon ? <Icon className="h-4 w-4" /> : null;
                        })()}
                      <span>{expense.category.label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      {expense.paymentMethod.iconString && (
                        <img
                          src={expense.paymentMethod.iconString}
                          alt={expense.paymentMethod.label}
                          className="h-4 w-4 object-contain"
                        />
                      )}
                      <span>{expense.paymentMethod.label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{formatAmount(expense.amount)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
