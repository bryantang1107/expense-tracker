import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryChartSkeleton() {
  return (
    <div className="w-full md:w-1/2 gap-4 h-full rounded-lg border border-border bg-card p-6">
      <Skeleton className="h-6 w-40 mb-4" />
      <Skeleton className="h-full w-full" />
    </div>
  );
}
