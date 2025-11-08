import { PrismaClient, Prisma } from '../generated/prisma/client';

const prisma = new PrismaClient();

const PrismaExpense: Prisma.ExpenseCreateInput[] = [
  {
    title: 'Grocery Shopping',
    description: 'Weekly groceries at Walmart',
    amount: 125.5,
    category: 'groceries',
    paymentMethod: 'card',
    date: new Date('2025-01-01'),
  },
  {
    title: 'Gas Station',
    description: 'Fuel for car',
    amount: 45.0,
    category: 'transportation',
    paymentMethod: 'card',
    date: new Date('2025-01-02'),
  },
  {
    title: 'Netflix Subscription',
    description: 'Monthly subscription',
    amount: 15.99,
    category: 'entertainment',
    paymentMethod: 'card',
    date: new Date('2025-01-03'),
  },
  {
    title: 'Coffee Shop',
    description: 'Morning coffee',
    amount: 5.75,
    category: 'dining',
    paymentMethod: 'cash',
    date: new Date('2025-01-04'),
  },
  {
    title: 'Amazon Purchase',
    description: 'Office supplies',
    amount: 89.99,
    category: 'shopping',
    paymentMethod: 'card',
    date: new Date('2025-01-05'),
  },
  {
    title: 'Restaurant Dinner',
    description: 'Date night dinner',
    amount: 85.0,
    category: 'dining',
    paymentMethod: 'card',
    date: new Date('2025-01-06'),
  },
  {
    title: 'Uber Ride',
    description: 'Airport trip',
    amount: 32.5,
    category: 'transportation',
    paymentMethod: 'grabpay',
    date: new Date('2025-01-07'),
  },
  {
    title: 'Gym Membership',
    description: 'Monthly gym fee',
    amount: 49.99,
    category: 'health',
    paymentMethod: 'card',
    date: new Date('2025-01-08'),
  },
  {
    title: 'Movie Tickets',
    description: 'Weekend movie',
    amount: 24.0,
    category: 'entertainment',
    paymentMethod: 'card',
    date: new Date('2025-01-09'),
  },
  {
    title: 'Pharmacy',
    description: 'Prescription medication',
    amount: 35.5,
    category: 'health',
    paymentMethod: 'card',
    date: new Date('2025-01-08'),
  },
];

export async function main() {
  console.log('🌱 Seeding expense data...');

  //clear existing data
  await prisma.expense.deleteMany();

  for (const expense of PrismaExpense) {
    await prisma.expense.create({ data: expense });
  }

  console.log(`✅ Successfully seeded ${PrismaExpense.length} expenses`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
