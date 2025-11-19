import MonthlyExpenseChart from '@/components/charts/MonthlyExpenseChart';
import CategoryExpenseChart from '@/components/charts/CategoryExpenseChart';
import MonthlyExpenseLineChart from '@/components/charts/MonthlyExpenseLineChart';

export default function DashboardPage() {
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

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">This month</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              $1,240.32
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Average daily</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              $41.34
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Largest category</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              Food & Drink
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">38</p>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex gap-4">
            <div className="w-3/4 gap-4 rounded-lg border border-border bg-card">
              <div className="p-6">
                <h2 className="text-base font-semibold text-foreground">
                  Monthly Expenses
                </h2>
              </div>
              <div className="px-10">
                <MonthlyExpenseChart />
              </div>
            </div>
            <div className="w-1/4 gap-4 rounded-lg border border-border bg-card">
              <div className="p-6">
                <h2 className="text-base font-semibold text-foreground">
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
          <div className="flex gap-4 h-[500px]">
            <div className="w-1/2 gap-4 h-full">
              <CategoryExpenseChart />
            </div>
            <div className="w-1/2 gap-4 h-full">
              <MonthlyExpenseLineChart />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
