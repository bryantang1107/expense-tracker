import MonthlyExpenseChart from '@/components/charts/MonthlyExpenseChart';
import CategoryExpenseChart from '@/components/charts/CategoryExpenseChart';
import MonthlyExpenseLineChart from '@/components/charts/MonthlyExpenseLineChart';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 dark:bg-black">
      <div className="mx-auto w-full">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Overview of your spending and recent activity
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500">This month</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              $1,240.32
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500">Average daily</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              $41.34
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500">Largest category</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              Food & Drink
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500">Transactions</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              38
            </p>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex gap-4">
            <div className="w-3/4 gap-4 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="p-6">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Monthly Expenses
                </h2>
              </div>
              <div className="px-10">
                <MonthlyExpenseChart />
              </div>
            </div>
            <div className="w-1/4 gap-4 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="p-6">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Recent Expenses
                </h2>
              </div>
              <div className="px-10">
                <MonthlyExpenseChart />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex gap-4">
            <div className="w-1/2 gap-4 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="p-6">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Expenses by Category
                </h2>
              </div>
              <div className="px-10">
                <CategoryExpenseChart />
              </div>
            </div>
            <div className="w-1/2 gap-4 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="p-6">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Expenses by Category
                </h2>
              </div>
              <div className="px-10">
                <MonthlyExpenseLineChart />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
