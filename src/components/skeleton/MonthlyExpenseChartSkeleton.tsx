import { Skeleton } from '@/components/ui/skeleton';

export default function MonthlyExpenseChartSkeleton() {
  return (
    <div className="w-full xl:w-3/4 gap-4 rounded-lg border border-border bg-card">
      <div className="p-6">
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="px-10 pb-6">
        <Skeleton className="h-[300px] w-full" />
      </div>
    </div>
  );
}
