import { Suspense } from 'react';
import MonthlyOverviewStats from '@/components/dashboard/MonthlyOverviewStats';
import MonthlyOverviewStatsSkeleton from '@/components/skeleton/MonthlyOverviewStatsSkeleton';
import MonthlyExpenseChartSection from '@/components/dashboard/MonthlyExpenseChartSection';
import MonthlyExpenseChartSkeleton from '@/components/skeleton/MonthlyExpenseChartSkeleton';
import RecentExpensesSection from '@/components/dashboard/RecentExpensesSection';
import RecentExpensesSkeleton from '@/components/skeleton/RecentExpensesSkeleton';
import CategoryExpenseChartSection from '@/components/dashboard/CategoryExpenseChartSection';
import CategoryChartSkeleton from '@/components/skeleton/CategoryChartSkeleton';
import AllTimeExpenseChartSection from '@/components/dashboard/AllTimeExpenseChartSection';
import AllTimeChartSkeleton from '@/components/skeleton/AllTimeChartSkeleton';

interface DashboardPageProps {
  searchParams: Promise<{
    month?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;
  const selectedMonth = params.month;

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

        <Suspense fallback={<MonthlyOverviewStatsSkeleton />}>
          <MonthlyOverviewStats selectedMonth={selectedMonth} />
        </Suspense>

        <section className="mt-8">
          <div className="flex gap-4 xl:flex-row flex-col">
            <Suspense fallback={<MonthlyExpenseChartSkeleton />}>
              <MonthlyExpenseChartSection />
            </Suspense>
            <Suspense fallback={<RecentExpensesSkeleton />}>
              <RecentExpensesSection />
            </Suspense>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex gap-4 h-[500px] flex-col md:flex-row">
            <Suspense fallback={<CategoryChartSkeleton />}>
              <CategoryExpenseChartSection />
            </Suspense>
            <Suspense fallback={<AllTimeChartSkeleton />}>
              <AllTimeExpenseChartSection />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}
