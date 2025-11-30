import { Skeleton } from '@/components/ui/skeleton';

export default function RecentExpensesSkeleton() {
  return (
    <div className="w-full xl:w-1/4 gap-4 rounded-lg border border-border bg-card">
      <div className="p-6 pb-4">
        <Skeleton className="h-6 w-36" />
      </div>
      <div className="px-6 pb-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
