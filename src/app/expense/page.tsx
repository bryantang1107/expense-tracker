'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ExpensePage() {
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
        <Dialog>
          <DialogTrigger asChild>
            <button className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800">
              Add expense
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Expense</DialogTitle>
              <DialogDescription>
                Enter the details for your new expense.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g. Coffee, Groceries" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-700"
                >
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Entertainment</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" variant="outline">
                Add Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input
          placeholder="Search title…"
          className="h-9 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:ring-zinc-700"
        />
        <select className="h-9 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-700">
          <option>All categories</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
        </select>
        <select className="h-9 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-700">
          <option>This month</option>
          <option>Last month</option>
          <option>Last 3 months</option>
        </select>
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
              {[
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
              ].map((t, i) => (
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
