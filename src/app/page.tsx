import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import HeroSection from '@/components/landing/hero-section';
import FeatureSection from '@/components/landing/feature-section';
import FooterSection from '@/components/landing/footer-section';

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <>
      <HeroSection />
      <FeatureSection />
      <FooterSection />
    </>
  );
}
