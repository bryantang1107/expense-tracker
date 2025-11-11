import { Suspense } from 'react';
import { format, startOfDay, endOfDay } from 'date-fns';
import prisma from '@/lib/prisma';
import ExpenseTable from '@/components/expense/ExpenseTable';
import ExpenseTableSkeleton from '@/components/expense/ExpenseTableSkeleton';
import ExpenseHeader from '@/components/expense/ExpenseHeader';
import ExpenseFilters from '@/components/expense/ExpenseFilters';
import type { ExpenseData, PrismaExpense } from '@/types/expense';
import {
  getCategoryLabel,
  getCategoryIcon,
  getPaymentMethodLabel,
  getPaymentMethodIcon,
} from '@/types/expense';
import type { Prisma } from '../../../generated/prisma/client';

interface ExpensePageProps {
  searchParams: Promise<{
    title?: string;
    category?: string;
    date?: string;
  }>;
}

async function ExpenseTableContent({ searchParams }: ExpensePageProps) {
  const params = await searchParams;
  const { title, category, date } = params;

  const where: Prisma.ExpenseWhereInput = {};

  if (title) {
    where.title = {
      contains: title,
      mode: 'insensitive',
    };
  }

  if (category) {
    where.category = category;
  }

  if (date) {
    const dateObj = new Date(date);
    where.date = {
      gte: startOfDay(dateObj),
      lte: endOfDay(dateObj),
    };
  }

  const expenses: PrismaExpense[] = await prisma.expense.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedExpense: ExpenseData[] = expenses.map((expense) => ({
    id: expense.id,
    title: expense.title,
    description: expense.description || undefined,
    category: {
      label: getCategoryLabel(expense.category),
      iconString: getCategoryIcon(expense.category),
      value: expense.category || 'other',
    },
    paymentMethod: {
      label: getPaymentMethodLabel(expense.paymentMethod),
      iconString: getPaymentMethodIcon(expense.paymentMethod),
      value: expense.paymentMethod || 'cash',
    },
    amount: Number(expense.amount),
    date: format(new Date(expense.date), 'MMM d, yyyy'),
    rawDate: new Date(expense.date),
  }));

  return <ExpenseTable expenses={formattedExpense} />;
}

export default async function ExpensePage({ searchParams }: ExpensePageProps) {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 dark:bg-black">
      <ExpenseHeader />
      <ExpenseFilters />
      <Suspense fallback={<ExpenseTableSkeleton />}>
        <ExpenseTableContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
