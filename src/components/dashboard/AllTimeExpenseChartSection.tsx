import { startOfYear, endOfYear, eachDayOfInterval, format } from 'date-fns';
import AllTimeExpenseChart from '@/components/charts/AllTimeExpenseChart';
import { getCurrentYearExpenses } from '@/lib/api/dashboard';

async function getAllTimeExpenseData() {
  const expenses = await getCurrentYearExpenses();
  const now = new Date();
  const yearStart = startOfYear(now);
  const yearEnd = endOfYear(now);

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

export default async function AllTimeExpenseChartSection() {
  const allTimeExpenseData = await getAllTimeExpenseData();

  return (
    <div className="w-full md:w-1/2 gap-4 h-full">
      <AllTimeExpenseChart data={allTimeExpenseData} />
    </div>
  );
}
