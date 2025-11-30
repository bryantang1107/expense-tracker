import { unstable_cache } from 'next/cache';
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  startOfYear,
  endOfYear,
} from 'date-fns';
import prisma from '@/lib/prisma';

//Cache data for 1 day
export const getLastSixMonthsExpenses = unstable_cache(
  async () => {
    const now = new Date();
    const sixMonthsAgo = subMonths(now, 5);

    return await prisma.expense.findMany({
      where: {
        date: {
          gte: startOfMonth(sixMonthsAgo),
          lte: endOfMonth(now),
        },
      },
      select: {
        amount: true,
        date: true,
        category: true,
      },
    });
  },
  ['last-six-months-expenses'],
  {
    revalidate: 86400,
    tags: ['expenses'],
  }
);

export const getCurrentYearExpenses = unstable_cache(
  async () => {
    const now = new Date();
    const yearStart = startOfYear(now);
    const yearEnd = endOfYear(now);

    return await prisma.expense.findMany({
      where: {
        date: {
          gte: yearStart,
          lte: yearEnd,
        },
      },
      select: {
        amount: true,
        date: true,
        category: true,
      },
    });
  },
  ['current-year-expenses'],
  {
    revalidate: 86400,
    tags: ['expenses'],
  }
);

export const getRecentExpensesData = unstable_cache(
  async () => {
    return await prisma.expense.findMany({
      orderBy: {
        date: 'desc',
      },
      take: 10,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        paymentMethod: true,
        amount: true,
        date: true,
      },
    });
  },
  ['recent-expenses'],
  {
    revalidate: 86400,
    tags: ['expenses'],
  }
);
