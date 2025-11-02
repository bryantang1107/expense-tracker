'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
} from '@/components/ui/input-group';
import DatePicker from '@/components/ui/DatePicker';
import DialogModal from '@/components/modals/dialog-modal';

export default function ExpensePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const expenses = [
    {
      date: 'Oct 24, 2025',
      title: 'Coffee',
      category: 'Food',
      amount: '-$4.50',
    },
    {
      date: 'Oct 23, 2025',
      title: 'Groceries',
      category: 'Food',
      amount: '-$62.19',
    },
    {
      date: 'Oct 22, 2025',
      title: 'Uber',
      category: 'Transport',
      amount: '-$18.40',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 dark:bg-black">
      <header className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Expenses
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Track and review your spending
          </p>
        </div>
        <DialogModal
          title="Add Expense"
          description="Enter the details for your new expense."
          triggerBtnText="Add Expense"
          footerBtnText="Add Expense"
        >
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input id="title" placeholder="e.g. Coffee, Groceries" />
          </Field>
          <Field>
            <FieldLabel>Amount</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>RM</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="amount"
                type="number"
                placeholder="0.00"
                step="0.01"
              />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel>Category</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <DatePicker />
        </DialogModal>
      </header>

      <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input id="title" type="text" placeholder="Coffee, Groceries" />
        </Field>
        <Field>
          <FieldLabel>Category</FieldLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <DatePicker />
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="text-xs uppercase text-zinc-500">
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm text-zinc-900 dark:text-zinc-100">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                    >
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-32" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-20" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-16" />
                      </td>
                    </tr>
                  ))
                : expenses.map((t, i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                    >
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                        {t.date}
                      </td>
                      <td className="px-4 py-3">{t.title}</td>
                      <td className="px-4 py-3">{t.category}</td>
                      <td className="px-4 py-3">{t.amount}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
