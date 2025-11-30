import { format } from 'date-fns';
import CategoryExpenseChart from '@/components/charts/CategoryExpenseChart';
import { getCurrentYearExpenses } from '@/lib/api/dashboard';

async function getCategoryExpenseData() {
  const expenses = await getCurrentYearExpenses();

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

export default async function CategoryExpenseChartSection() {
  const categoryExpenseData = await getCategoryExpenseData();

  return (
    <div className="w-full md:w-1/2 gap-4 h-full">
      <CategoryExpenseChart data={categoryExpenseData} />
    </div>
  );
}
