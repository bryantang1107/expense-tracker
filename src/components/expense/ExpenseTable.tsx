import {
  CalendarIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import type { ExpenseData } from '@/types/expense';

interface ExpenseTableProps {
  expenses: ExpenseData[];
}

export default function ExpenseTable({ expenses }: ExpenseTableProps) {
  const formatAmount = (amount: number) => {
    return `-RM${amount.toFixed(2)}`;
  };

  return (
    <section className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead className="text-xs uppercase text-zinc-500">
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  Date
                </div>
              </th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <CreditCardIcon className="h-3.5 w-3.5" />
                  Payment
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <BanknotesIcon className="h-3.5 w-3.5" />
                  Amount
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-zinc-900 dark:text-zinc-100">
            {expenses.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-zinc-500 dark:text-zinc-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <DocumentTextIcon className="h-8 w-8 text-zinc-400" />
                    <p>
                      No expenses found. Add your first expense to get started!
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                >
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {expense.date}
                  </td>
                  <td className="px-4 py-3">{expense.title}</td>
                  <td className="px-4 py-3">{expense.category}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {expense.paymentMethod}
                  </td>
                  <td className="px-4 py-3">{formatAmount(expense.amount)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
