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
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.error || `Failed to ${mode} expense. Please try again.`;
    throw new Error(errorMessage);
  }
}

export async function deleteExpense(expenseId: number): Promise<void> {
  const response = await fetch(`/api/expenses/${expenseId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.error || 'Failed to delete expense. Please try again.';
    throw new Error(errorMessage);
  }
}
