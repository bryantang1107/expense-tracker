import type { Expense as PrismaExpense } from '../../generated/prisma/client';

export type { PrismaExpense };

export interface ExpenseData {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
}

export interface ExpenseFormData {
  title: string;
  description?: string;
  amount: number;
  category?: string;
  paymentMethod?: string;
  date?: Date;
}
