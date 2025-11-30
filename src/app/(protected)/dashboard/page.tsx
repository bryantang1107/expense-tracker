import {
  startOfMonth,
  endOfMonth,
  subMonths,
  format,
  getDaysInMonth,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
} from 'date-fns';
import prisma from '@/lib/prisma';
import MonthlyExpenseChart from '@/components/charts/MonthlyExpenseChart';
import CategoryExpenseChart from '@/components/charts/CategoryExpenseChart';
import AllTimeExpenseChart from '@/components/charts/AllTimeExpenseChart';
import ExpenseRecent from '@/components/expense/ExpenseRecent';
import {
  getCategoryLabel,
  getCategoryIcon,
  getPaymentMethodLabel,
  getPaymentMethodIcon,
} from '@/types/expense';
import type { ExpenseData } from '@/types/expense';
import { formatCurrency } from '@/lib/formatter';

async function getMonthlyExpenseData() {
  const now = new Date();
  const sixMonthsAgo = subMonths(now, 5);

  const expenses = await prisma.expense.findMany({
    where: {
      date: {
        gte: startOfMonth(sixMonthsAgo),
        lte: endOfMonth(now),
      },
    },
    select: {
      amount: true,
      date: true,
      category: true,
    },
  });

  const monthlyTotals = new Map<string, number>();

  for (let i = 5; i >= 0; i--) {
    const monthDate = subMonths(now, i);
    const monthKey = format(monthDate, 'MMMM');
    monthlyTotals.set(monthKey, 0);
  }

  expenses.forEach((expense) => {
    const monthKey = format(expense.date, 'MMMM');
    const currentTotal = monthlyTotals.get(monthKey)!;
    monthlyTotals.set(monthKey, currentTotal + Number(expense.amount));
  });

  const chartData = Array.from(monthlyTotals.entries()).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  const currentMonth = format(now, 'MMMM');
  const previousMonth = format(subMonths(now, 1), 'MMMM');
  const currentAmount = monthlyTotals.get(currentMonth) || 0;
  const previousAmount = monthlyTotals.get(previousMonth) || 0;

  let trendPercentage: number | undefined;
  if (previousAmount === 0) {
    trendPercentage = currentAmount === 0 ? 0 : 100;
  } else {
    trendPercentage = ((currentAmount - previousAmount) / previousAmount) * 100;
  }

  const daysInCurrentMonth = getDaysInMonth(now);
  const averageDailyAmount = currentAmount / daysInCurrentMonth;

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseMonth = format(expense.date, 'MMMM');
    return expenseMonth === currentMonth;
  });

  const totalTransactions = currentMonthExpenses.length;

  const currentMonthCategories = currentMonthExpenses.reduce(
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

  const largestCategory = Object.entries(currentMonthCategories).reduce(
    (acc, [category, { amount }]) => {
      if (amount > acc.amount) {
        return { category, amount };
      }
      return acc;
    },
    { category: '', amount: 0 }
  );

  return {
    chartData,
    trendPercentage,
    currentAmount,
    averageDailyAmount,
    largestCategory,
    totalTransactions,
  };
}

async function getCategoryExpenseData() {
  const now = new Date();
  const yearStart = startOfYear(now);
  const yearEnd = endOfYear(now);

  const expenses = await prisma.expense.findMany({
    where: {
      date: {
        gte: yearStart,
        lte: yearEnd,
      },
    },
    select: {
      amount: true,
      date: true,
      category: true,
    },
  });

  const monthlyCategoryData: Record<
    string,
    Array<{ category: string; amount: number }>
  > = {};

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  months.forEach((month) => {
    monthlyCategoryData[month] = [];
  });

  expenses.forEach((expense) => {
    const monthKey = format(expense.date, 'MMMM');
    const category = expense.category;
    const amount = Number(expense.amount);

    const existingCategory = monthlyCategoryData[monthKey]?.find(
      (item) => item.category === category
    );

    if (existingCategory) {
      existingCategory.amount += amount;
    } else {
      monthlyCategoryData[monthKey]?.push({ category, amount });
    }
  });

  return monthlyCategoryData;
}

async function getAllTimeExpenseData() {
  const now = new Date();
  const yearStart = startOfYear(now);
  const yearEnd = endOfYear(now);

  const expenses = await prisma.expense.findMany({
    where: {
      date: {
        gte: yearStart,
        lte: yearEnd,
      },
    },
    select: {
      amount: true,
      date: true,
    },
  });

  const dailyTotals = new Map<string, number>();

  const allDays = eachDayOfInterval({ start: yearStart, end: yearEnd });
  allDays.forEach((day) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    dailyTotals.set(dateKey, 0);
  });

  expenses.forEach((expense) => {
    const dateKey = format(expense.date, 'yyyy-MM-dd');
    const currentTotal = dailyTotals.get(dateKey) || 0;
    dailyTotals.set(dateKey, currentTotal + Number(expense.amount));
  });

  const chartData = Array.from(dailyTotals.entries())
    .map(([date, amount]) => ({
      date,
      amount: Math.round(amount * 100) / 100,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return chartData;
}

async function getRecentExpenses(): Promise<ExpenseData[]> {
  const expenses = await prisma.expense.findMany({
    orderBy: {
      date: 'desc',
    },
    take: 10,
  });

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

export default async function DashboardPage() {
  const {
    chartData,
    trendPercentage,
    currentAmount,
    averageDailyAmount,
    largestCategory,
    totalTransactions,
  } = await getMonthlyExpenseData();

  const categoryExpenseData = await getCategoryExpenseData();
  const allTimeExpenseData = await getAllTimeExpenseData();
  const recentExpenses = await getRecentExpenses();
  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto w-full">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Overview of your spending and recent activity
            </p>
          </div>
        </header>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">
              Monthly Overview
            </h2>
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
              {format(new Date(), 'MMMM yyyy')}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">This month</p>
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
              <p className="text-sm text-muted-foreground">
                Transactions this month
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {totalTransactions}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex gap-4 xl:flex-row flex-col">
            <div className="w-full xl:w-3/4 gap-4 rounded-lg border border-border bg-card">
              <div className="p-6">
                <h2 className="text-base font-semibold text-foreground">
                  Monthly Expenses
                </h2>
              </div>
              <div className="px-10">
                <MonthlyExpenseChart
                  data={chartData}
                  trendPercentage={trendPercentage}
                />
              </div>
            </div>
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
          </div>
        </section>

        <section className="mt-8">
          <div className="flex gap-4 h-[500px] flex-col md:flex-row">
            <div className="w-full md:w-1/2 gap-4 h-full">
              <CategoryExpenseChart data={categoryExpenseData} />
            </div>
            <div className="w-full md:w-1/2 gap-4 h-full">
              <AllTimeExpenseChart data={allTimeExpenseData} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
