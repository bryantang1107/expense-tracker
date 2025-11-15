import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';
import Image from 'next/image';

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/icons/logo.png"
            alt="GoExpense"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          GoExpense
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-2">
          Track & Manage Your Expenses
        </p>
        <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
          Take control of your finances with our intuitive expense tracking
          system. Monitor your spending, categorize expenses, and gain insights
          into your financial habits.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <SignInButton mode="modal">
            <button className="px-8 py-3 bg-white text-[#203A43] rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors">
              Get Started
            </button>
          </SignInButton>
          <Link
            href="/dashboard"
            className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80">
          <div className="p-6">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Track Expenses
            </h3>
            <p className="text-white/70">
              Easily record and categorize all your expenses in one place.
            </p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Visual Insights
            </h3>
            <p className="text-white/70">
              View your spending patterns with beautiful charts and analytics.
            </p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-3">💳</div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Multiple Payment Methods
            </h3>
            <p className="text-white/70">
              Support for cash, cards, and digital payment methods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
