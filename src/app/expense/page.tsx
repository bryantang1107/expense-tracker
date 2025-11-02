import { format } from 'date-fns';
import prisma from '@/lib/prisma';
import ExpenseTable from '@/components/expense/ExpenseTable';
import ExpenseHeader from '@/components/expense/ExpenseHeader';
import ExpenseFilters from '@/components/expense/ExpenseFilters';
import type { ExpenseData, PrismaExpense } from '@/types/expense';

export default async function ExpensePage() {
  const expenses: PrismaExpense[] = await prisma.expense.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedExpense: ExpenseData[] = expenses.map((expense) => ({
    id: expense.id,
    title: expense.title,
    category: expense.category || '-',
    amount: Number(expense.amount),
    date: format(new Date(expense.date), 'MMM d, yyyy'),
  }));

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 dark:bg-black">
      <ExpenseHeader />
      <ExpenseFilters />
      <ExpenseTable expenses={formattedExpense} />
    </div>
  );
}
