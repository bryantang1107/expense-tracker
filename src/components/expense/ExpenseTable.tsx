'use client';

import {
  CalendarIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CreditCardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import type { ExpenseData } from '@/types/expense';
import { getHeroIcon } from '@/lib/icons';
import ExpenseForm from './ExpenseForm';
import { useModal } from '@/contexts/ModalContext';
import { useCallback } from 'react';
import type { ExpenseFormData } from '@/types/expense';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { submitExpense, deleteExpense } from '@/lib/api/expense';
import { Button } from '@/components/ui/button';

interface ExpenseTableProps {
  expenses: ExpenseData[];
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  itemsPerPage?: number;
}

export default function ExpenseTable({
  expenses,
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  itemsPerPage = 10,
}: ExpenseTableProps) {
  const pathname = usePathname();
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChangeInternal = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [router]
  );

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
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}{' '}
            expenses
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChangeInternal(currentPage - 1)}
              disabled={currentPage === 1}
              className="cursor-pointer"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  return (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  );
                })
                .map((page, index, array) => {
                  const showEllipsisBefore =
                    index > 0 && page - array[index - 1] > 1;
                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsisBefore && (
                        <span className="px-2 text-zinc-500">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChangeInternal(page)}
                        className="cursor-pointer min-w-10"
                      >
                        {page}
                      </Button>
                    </div>
                  );
                })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChangeInternal(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="cursor-pointer"
            >
              Next
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
