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
            {expenses.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400"
                >
                  No expenses found. Add your first expense to get started!
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
