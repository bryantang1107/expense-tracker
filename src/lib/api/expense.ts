import type { ExpenseFormData } from '@/types/';

export async function submitExpense(
  formData: ExpenseFormData,
  mode: 'create' | 'edit',
  expenseId?: number
): Promise<void> {
  const url =
    mode === 'create' ? '/api/expenses' : `/api/expenses/${expenseId}`;
  const method = mode === 'create' ? 'POST' : 'PUT';

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: formData.title,
      description: formData.description || undefined,
      amount: Number(formData.amount),
      category: formData.category || undefined,
      paymentMethod: formData.paymentMethod || undefined,
      date: formData.date?.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to ${mode} expense`);
  }
}
