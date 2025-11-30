import { subMonths, format as formatDate } from 'date-fns';
import MonthlyExpenseChart from '@/components/charts/MonthlyExpenseChart';
import { getLastSixMonthsExpenses } from '@/lib/api/dashboard';

async function getMonthlyExpenseData() {
  const expenses = await getLastSixMonthsExpenses();
  const now = new Date();

  const monthlyTotals = new Map<string, number>();

  for (let i = 5; i >= 0; i--) {
    const monthDate = subMonths(now, i);
    const monthKey = formatDate(monthDate, 'MMMM');
    monthlyTotals.set(monthKey, 0);
  }

  expenses.forEach((expense) => {
    const monthKey = formatDate(expense.date, 'MMMM');
    const currentTotal = monthlyTotals.get(monthKey)!;
    monthlyTotals.set(monthKey, currentTotal + Number(expense.amount));
  });

  const chartData = Array.from(monthlyTotals.entries()).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  const currentMonth = formatDate(now, 'MMMM');
  const previousMonth = formatDate(subMonths(now, 1), 'MMMM');
  const currentAmount = monthlyTotals.get(currentMonth) || 0;
  const previousAmount = monthlyTotals.get(previousMonth) || 0;

  let trendPercentage: number | undefined;
  if (previousAmount === 0) {
    trendPercentage = currentAmount === 0 ? 0 : 100;
  } else {
    trendPercentage = ((currentAmount - previousAmount) / previousAmount) * 100;
  }

  return {
    chartData,
    trendPercentage,
  };
}

export default async function MonthlyExpenseChartSection() {
  const { chartData, trendPercentage } = await getMonthlyExpenseData();

  return (
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
  );
}
