'use client';

import { ClockIcon } from '@heroicons/react/24/outline';
import type { ExpenseData } from '@/types/expense';
import { getHeroIcon } from '@/lib/icons';
import Image from 'next/image';
import { formatCurrency } from '@/lib/formatter';

interface ExpenseRecentProps {
  expenses: ExpenseData[];
}

export default function ExpenseRecent({ expenses }: ExpenseRecentProps) {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <ClockIcon className="h-12 w-12 text-muted-foreground" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            No recent expenses
          </p>
          <p className="text-xs text-muted-foreground">
            Your recent transactions will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => {
        const CategoryIcon = getHeroIcon(expense.category.iconString);
        const paymentMethodImage = expense.paymentMethod.iconString;

        return (
          <div
            key={expense.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 hover:bg-accent transition-colors"
          >
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-1 gap-1 items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    {CategoryIcon && (
                      <CategoryIcon className="h-5 w-5 text-foreground" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">
                    {expense.title}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ClockIcon className="h-3 w-3" />
                  {expense.date}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>•</span>
                  <span>{expense.category.label}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {paymentMethodImage && (
                    <div className="relative h-6 w-6 overflow-hidden">
                      <Image
                        src={paymentMethodImage}
                        alt={expense.paymentMethod.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
