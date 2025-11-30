import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { revalidateTag } from 'next/cache';
import prisma from '@/lib/prisma';
import type { ExpenseFormData } from '@/types/expense';

export async function POST(request: Request) {
  try {
    const body: ExpenseFormData = await request.json();
    const { title, description, amount, category, paymentMethod, date } = body;

    if (!title || !amount || !category || !paymentMethod || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const expense = await prisma.expense.create({
      data: {
        title,
        description: description || null,
        amount: Number(amount),
        category: category,
        paymentMethod: paymentMethod || null,
        date: new Date(date),
      },
    });

    const { userId } = await auth();
    revalidateTag('expenses', userId!);

    return NextResponse.json(
      {
        data: expense,
        message: 'Expense created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json(
      { error: 'Failed to create expense' },
      { status: 500 }
    );
  }
}
