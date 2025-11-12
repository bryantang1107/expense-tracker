import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { ExpenseFormData, PrismaExpense } from '@/types/expense';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const expenseId: number = parseInt(id, 10);

    if (isNaN(expenseId)) {
      return NextResponse.json(
        { error: 'Invalid expense ID' },
        { status: 400 }
      );
    }

    const existingExpense: PrismaExpense | null =
      await prisma.expense.findUnique({
        where: { id: expenseId },
      });

    if (!existingExpense) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    const body: ExpenseFormData = await request.json();
    const { title, description, amount, category, paymentMethod, date } = body;

    if (!title || amount === undefined || !category || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let expenseDate = new Date();
    if (date) {
      const parsedDate = new Date(date);
      expenseDate = new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate()
      );
    }

    const updatedExpense: PrismaExpense = await prisma.expense.update({
      where: { id: expenseId },
      data: {
        title,
        description: description || null,
        amount,
        category,
        paymentMethod,
        date: expenseDate,
      },
    });

    return NextResponse.json(
      {
        data: updatedExpense,
        message: 'Expense updated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating expense:', error);
    return NextResponse.json(
      { error: 'Failed to update expense' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const expenseId: number = parseInt(id, 10);

    if (isNaN(expenseId)) {
      return NextResponse.json(
        { error: 'Invalid expense ID' },
        { status: 400 }
      );
    }

    try {
      const deletedExpense = await prisma.expense.delete({
        where: { id: expenseId },
      });

      return NextResponse.json(
        {
          data: deletedExpense,
          message: 'Expense deleted successfully',
        },
        { status: 200 }
      );
    } catch (error: any) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Expense not found' },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Error deleting expense:', error);
    return NextResponse.json(
      { error: 'Failed to delete expense' },
      { status: 500 }
    );
  }
}
