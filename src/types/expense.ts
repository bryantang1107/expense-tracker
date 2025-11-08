import type { Expense as PrismaExpense } from '../../generated/prisma/client';

export type { PrismaExpense };

export const EXPENSE_CATEGORIES = [
  { value: 'housing', label: 'Housing / Rent / Mortgage' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'dining', label: 'Food & Dining' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'health', label: 'Health & Fitness' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'loans', label: 'Loans / Debt Payments' },
  { value: 'savings', label: 'Savings / Investments' },
  { value: 'education', label: 'Education' },
  { value: 'travel', label: 'Travel' },
  { value: 'gifts', label: 'Gifts / Donations' },
  { value: 'other', label: 'Other' },
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]['value'];

export const CATEGORY_LABELS: Record<string, string> = {
  housing: 'Housing / Rent / Mortgage',
  utilities: 'Utilities',
  groceries: 'Groceries',
  transportation: 'Transportation',
  dining: 'Food & Dining',
  shopping: 'Shopping',
  entertainment: 'Entertainment',
  health: 'Health & Fitness',
  insurance: 'Insurance',
  loans: 'Loans / Debt Payments',
  savings: 'Savings / Investments',
  education: 'Education',
  travel: 'Travel',
  gifts: 'Gifts / Donations',
  other: 'Other',
};

export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'grabpay', label: 'GrabPay' },
  { value: 'tng', label: "Touch 'n Go" },
  { value: 'card', label: 'Debit/Credit Card' },
  { value: 'other', label: 'Other' },
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]['value'];

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cash: 'Cash',
  grabpay: 'GrabPay',
  tng: "Touch 'n Go",
  card: 'Debit/Credit Card',
  other: 'Other',
};

export const getCategoryLabel = (value: string | null) => {
  if (!value) return '-';
  return CATEGORY_LABELS[value] || value;
};

export const getPaymentMethodLabel = (value: string | null) => {
  if (!value) return '-';
  return PAYMENT_METHOD_LABELS[value] || value;
};

export interface ExpenseData {
  id: number;
  title: string;
  category: string;
  paymentMethod: string;
  amount: number;
  date: string;
}

export interface ExpenseFormData {
  title: string;
  description?: string;
  amount: number;
  category?: ExpenseCategory;
  paymentMethod?: PaymentMethod;
  date: Date;
}
