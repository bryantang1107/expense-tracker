import { format } from 'date-fns';
import ExpenseRecent from '@/components/expense/ExpenseRecent';
import type { ExpenseData } from '@/types/expense';
import {
  getCategoryLabel,
  getCategoryIcon,
  getPaymentMethodLabel,
  getPaymentMethodIcon,
} from '@/types/expense';
import { getRecentExpensesData } from '@/lib/api/dashboard';

async function getRecentExpenses(): Promise<ExpenseData[]> {
  const expenses = await getRecentExpensesData();

  const formattedExpenses: ExpenseData[] = expenses.map((expense) => ({
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

  return formattedExpenses;
}

export default async function RecentExpensesSection() {
  const recentExpenses = await getRecentExpenses();

  return (
    <div className="w-full xl:w-1/4 gap-4 rounded-lg border border-border bg-card">
      <div className="p-6 pb-4">
        <h2 className="text-base font-semibold text-foreground">
          Recent Expenses
        </h2>
      </div>
      <div className="px-6 pb-6 overflow-y-auto h-[400px] md:h-[700px]">
        <ExpenseRecent expenses={recentExpenses} />
      </div>
    </div>
  );
}
