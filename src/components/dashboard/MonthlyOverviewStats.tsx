import { Suspense } from 'react';
import {
  format as formatDate,
  getDaysInMonth,
  parse,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import { formatCurrency } from '@/lib/formatter';
import { getCategoryLabel } from '@/types/expense';
import { getCurrentYearExpenses } from '@/lib/api/dashboard';
import MonthSelector from './MonthSelector';

interface MonthlyOverviewStatsProps {
  selectedMonth?: string;
}

async function getMonthlyExpenseData(selectedMonth?: string) {
  const expenses = await getCurrentYearExpenses();
  const now = new Date();

  let targetDate: Date;
  if (selectedMonth) {
    try {
      targetDate = parse(selectedMonth, 'yyyy-MM', new Date());
    } catch {
      targetDate = now;
    }
  } else {
    targetDate = now;
  }

  const targetMonthKey = formatDate(targetDate, 'MMMM yyyy');
  const targetMonthStart = startOfMonth(targetDate);
  const targetMonthEnd = endOfMonth(targetDate);

  const selectedMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= targetMonthStart && expenseDate <= targetMonthEnd;
  });

  const currentAmount = selectedMonthExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const daysInMonth = getDaysInMonth(targetDate);
  const averageDailyAmount = currentAmount / daysInMonth;

  const totalTransactions = selectedMonthExpenses.length;

  const monthCategories = selectedMonthExpenses.reduce(
    (acc: Record<string, { amount: number; count: number }>, expense) => {
      const category = expense.category;
      const amount = Number(expense.amount);

      if (acc[category]) {
        acc[category].amount += amount;
        acc[category].count += 1;
      } else {
        acc[category] = { amount, count: 1 };
      }
      return acc;
    },
    {}
  );

  const largestCategory = Object.entries(monthCategories).reduce(
    (acc, [category, { amount }]) => {
      if (amount > acc.amount) {
        return { category, amount };
      }
      return acc;
    },
    { category: '', amount: 0 }
  );

  return {
    currentAmount,
    averageDailyAmount,
    largestCategory,
    totalTransactions,
    monthLabel: targetMonthKey,
  };
}

export default async function MonthlyOverviewStats({
  selectedMonth,
}: MonthlyOverviewStatsProps) {
  const {
    currentAmount,
    averageDailyAmount,
    largestCategory,
    totalTransactions,
  } = await getMonthlyExpenseData(selectedMonth);

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          Monthly Overview
        </h2>
        <Suspense
          fallback={
            <div className="h-7 w-[140px] rounded-md border bg-muted animate-pulse" />
          }
        >
          <MonthSelector />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {formatCurrency(currentAmount)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Average daily</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {formatCurrency(averageDailyAmount)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Largest category</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {getCategoryLabel(largestCategory.category)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(largestCategory.amount)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Transactions</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {totalTransactions}
          </p>
        </div>
      </div>
    </section>
  );
}
