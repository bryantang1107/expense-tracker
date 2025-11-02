import { PrismaClient, Prisma } from '../generated/prisma/client';

const prisma = new PrismaClient();

const PrismaExpense: Prisma.ExpenseCreateInput[] = [
  {
    title: 'Grocery Shopping',
    description: 'Weekly groceries at Walmart',
    amount: 125.5,
    category: 'Food & Dining',
    paymentMethod: 'Credit Card',
  },
  {
    title: 'Gas Station',
    description: 'Fuel for car',
    amount: 45.0,
    category: 'Transportation',
    paymentMethod: 'Debit Card',
  },
  {
    title: 'Netflix Subscription',
    description: 'Monthly subscription',
    amount: 15.99,
    category: 'Entertainment',
    paymentMethod: 'Credit Card',
  },
  {
    title: 'Coffee Shop',
    description: 'Morning coffee',
    amount: 5.75,
    category: 'Food & Dining',
    paymentMethod: 'Cash',
  },
  {
    title: 'Amazon Purchase',
    description: 'Office supplies',
    amount: 89.99,
    category: 'Shopping',
    paymentMethod: 'Credit Card',
  },
  {
    title: 'Restaurant Dinner',
    description: 'Date night dinner',
    amount: 85.0,
    category: 'Food & Dining',
    paymentMethod: 'Credit Card',
  },
  {
    title: 'Uber Ride',
    description: 'Airport trip',
    amount: 32.5,
    category: 'Transportation',
    paymentMethod: 'Credit Card',
  },
  {
    title: 'Gym Membership',
    description: 'Monthly gym fee',
    amount: 49.99,
    category: 'Health & Fitness',
    paymentMethod: 'Bank Transfer',
  },
  {
    title: 'Movie Tickets',
    description: 'Weekend movie',
    amount: 24.0,
    category: 'Entertainment',
    paymentMethod: 'Credit Card',
  },
  {
    title: 'Pharmacy',
    description: 'Prescription medication',
    amount: 35.5,
    category: 'Health & Fitness',
    paymentMethod: 'Insurance',
  },
];

export async function main() {
  console.log('🌱 Seeding expense data...');

  // Clear existing data (optional - comment out if you want to keep existing data)
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
