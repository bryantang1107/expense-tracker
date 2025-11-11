import type { Expense as PrismaExpense } from '../../generated/prisma/client';

export type { PrismaExpense };

export const CATEGORY_MAP: Record<
  string,
  { label: string; icon: string; value: string }
> = {
  housing: {
    label: 'Housing / Rent / Mortgage',
    icon: 'home',
    value: 'housing',
  },
  utilities: { label: 'Utilities', icon: 'bolt', value: 'utilities' },
  groceries: { label: 'Groceries', icon: 'shopping-bag', value: 'groceries' },
  transportation: {
    label: 'Transportation',
    icon: 'truck',
    value: 'transportation',
  },
  dining: { label: 'Food & Dining', icon: 'utensils', value: 'dining' },
  shopping: { label: 'Shopping', icon: 'shopping-cart', value: 'shopping' },
  entertainment: {
    label: 'Entertainment',
    icon: 'film',
    value: 'entertainment',
  },
  health: { label: 'Health & Fitness', icon: 'heart', value: 'health' },
  insurance: { label: 'Insurance', icon: 'shield-check', value: 'insurance' },
  loans: {
    label: 'Loans / Debt Payments',
    icon: 'credit-card',
    value: 'loans',
  },
  savings: {
    label: 'Savings / Investments',
    icon: 'currency-dollar',
    value: 'savings',
  },
  education: { label: 'Education', icon: 'academic-cap', value: 'education' },
  travel: { label: 'Travel', icon: 'map', value: 'travel' },
  gifts: { label: 'Gifts / Donations', icon: 'gift', value: 'gifts' },
  other: { label: 'Other', icon: 'ellipsis-horizontal', value: 'other' },
};

export type ExpenseCategory = keyof typeof CATEGORY_MAP;

export const PAYMENT_METHOD_MAP: Record<
  string,
  { label: string; image: string; value: string }
> = {
  cash: {
    label: 'Cash',
    image: '/icons/cash.png',
    value: 'cash',
  },
  grabpay: {
    label: 'GrabPay',
    image: '/icons/grab-pay.png',
    value: 'grabpay',
  },
  tng: {
    label: "Touch 'n Go",
    image: '/icons/tng.png',
    value: 'tng',
  },
  card: {
    label: 'Debit/Credit Card',
    image: '/icons/card.png',
    value: 'card',
  },
  other: {
    label: 'Other',
    image: '/icons/other.png',
    value: 'other',
  },
};

export type PaymentMethod = keyof typeof PAYMENT_METHOD_MAP;

export const getCategoryLabel = (value: string | null) => {
  if (!value) return '-';
  return CATEGORY_MAP[value]?.label || value;
};

export const getCategoryIcon = (value: string | null) => {
  if (!value) return 'ellipsis-horizontal';
  return CATEGORY_MAP[value]?.icon || 'ellipsis-horizontal';
};

export const getPaymentMethodLabel = (value: string | null) => {
  if (!value) return '-';
  return PAYMENT_METHOD_MAP[value]?.label || value;
};

export const getPaymentMethodIcon = (value: string | null) => {
  if (!value) return 'ellipsis-horizontal';
  return PAYMENT_METHOD_MAP[value]?.image || 'ellipsis-horizontal';
};

export interface ExpenseData {
  id: number;
  title: string;
  description?: string;
  category: {
    label: string;
    iconString: string;
    value: string;
  };
  paymentMethod: {
    label: string;
    iconString: string;
    value: string;
  };
  amount: number;
  date: string;
  rawDate: Date;
}

export interface ExpenseFormData {
  title: string;
  description?: string;
  amount: number;
  category: ExpenseCategory;
  paymentMethod: PaymentMethod;
  date?: Date;
}
