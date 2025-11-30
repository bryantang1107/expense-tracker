'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from '@/components/ui/DatePicker';
import { CATEGORY_MAP } from '@/types/expense';
import { useDebounce } from '@/hooks/useDebounce';
import { getHeroIcon } from '@/lib/icons';

export default function ExpenseFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [titleValue, setTitleValue] = useState(searchParams.get('title') || '');

  const debouncedTitle = useDebounce(titleValue, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedTitle) {
      params.set('title', debouncedTitle);
    } else {
      params.delete('title');
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedTitle, pathname, router]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    router.push(`${pathname}?category=${value}&page=1`);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const dateStr = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      router.push(`${pathname}?date=${dateStr}&page=1`);
    } else {
    }
  };

  const currentDate = searchParams.get('date')
    ? new Date(searchParams.get('date')!)
    : undefined;

  const hasActiveFilters =
    searchParams.get('title') ||
    searchParams.get('category') ||
    searchParams.get('date');

  const clearFilters = () => {
    router.push(`${pathname}?page=1`);
  };

  return (
    <section className="mb-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              id="title"
              type="text"
              placeholder="Coffee, Groceries"
              className="pl-9"
              value={titleValue}
              onChange={handleTitleChange}
            />
          </div>
        </Field>
        <Field>
          <FieldLabel>Category</FieldLabel>
          <Select
            value={searchParams.get('category') || ''}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(CATEGORY_MAP).map((category) => {
                const Icon = getHeroIcon(category.icon);
                return (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </Field>
        <DatePicker
          value={currentDate}
          onChange={handleDateChange}
          allowFutureDates={true}
        />
      </div>
      <div className="mt-3 flex items-center justify-end">
        {hasActiveFilters && (
          <Button
            size="sm"
            onClick={clearFilters}
            className="h-8 gap-1.5 text-xs bg-red-500 hover:bg-red-800 text-white"
          >
            <XMarkIcon className="h-3.5 w-3.5" />
            Clear Filters
          </Button>
        )}
      </div>
    </section>
  );
}
