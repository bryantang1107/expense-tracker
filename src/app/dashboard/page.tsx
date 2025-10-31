export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 dark:bg-black">
      <div className="mx-auto w-full">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Overview of your spending and recent activity
            </p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800">
              Export
            </button>
            <button className="h-9 rounded-md bg-zinc-900 px-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Add expense
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500">This month</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              $1,240.32
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500">Average daily</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              $41.34
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500">Largest category</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              Food & Drink
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500">Transactions</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              38
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Recent transactions
            </h2>
          </div>
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
                    date: 'Oct 24',
                    title: 'Coffee',
                    category: 'Food',
                    amount: '-$4.50',
                  },
                  {
                    date: 'Oct 23',
                    title: 'Groceries',
                    category: 'Food',
                    amount: '-$62.19',
                  },
                  {
                    date: 'Oct 22',
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
    </div>
  );
}
