'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { format, startOfYear, eachMonthOfInterval, endOfYear } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MonthSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedMonth =
    searchParams.get('month') || format(new Date(), 'yyyy-MM');

  const now = new Date();
  const yearStart = startOfYear(now);
  const yearEnd = endOfYear(now);
  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd }).map(
    (monthDate) => ({
      value: format(monthDate, 'yyyy-MM'),
      label: format(monthDate, 'MMMM yyyy'),
    })
  );

  const handleMonthChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === format(new Date(), 'yyyy-MM')) {
      params.delete('month');
    } else {
      params.set('month', value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={selectedMonth} onValueChange={handleMonthChange}>
      <SelectTrigger className="h-7">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => (
          <SelectItem key={month.value} value={month.value}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
