'use client';
import { useState } from 'react';
import { Cpu, Zap } from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ChartBarIncreasingIcon,
  Database,
  Fingerprint,
  IdCard,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FeatureSection() {
  type ImageKey = 'item-1' | 'item-2' | 'item-3' | 'item-4';
  const [activeItem, setActiveItem] = useState<ImageKey>('item-1');

  const images = {
    'item-1': {
      image: '/charts.png',
      alt: 'Database visualization',
    },
    'item-2': {
      image: '/music.png',
      alt: 'Security authentication',
    },
    'item-3': {
      image: '/mail2.png',
      alt: 'Identity management',
    },
    'item-4': {
      image: '/payments.png',
      alt: 'Analytics dashboard',
    },
  };
  return (
    <section id="features" className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
          Visualize your spending with clear insights.
        </h2>
        <div className="relative">
          <div className="relative z-10 space-y-4 md:w-1/2">
            <p>
              GoExpense helps you understand your financial habits.{' '}
              <span className="font-medium">Track expenses by category</span>,
              see spending trends over time, and make informed decisions about
              your money.
            </p>
            <p>
              Get a complete view of your finances with interactive charts and
              detailed analytics that show exactly where your money goes each
              month.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="size-4" />
                  <h3 className="text-sm font-medium">Quick Entry</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Add expenses in seconds with an intuitive interface designed
                  for speed.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Cpu className="size-4" />
                  <h3 className="text-sm font-medium">Smart Analytics</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Visualize spending patterns with charts and insights that help
                  you save more.
                </p>
              </div>
            </div>
          </div>
          <div className="md:mask-l-from-35% md:mask-l-to-55% mt-12 h-fit md:absolute md:-inset-y-12 md:inset-x-0 md:mt-0">
            <div className="border-border/50 relative rounded-2xl border border-dotted p-2">
              <Image
                src="/charts.png"
                className="hidden rounded-[12px] dark:block"
                alt="expense analytics dashboard dark"
                width={1207}
                height={929}
              />
              <Image
                src="/charts-light.png"
                className="rounded-[12px] shadow dark:hidden"
                alt="expense analytics dashboard light"
                width={1207}
                height={929}
              />
            </div>
          </div>
        </div>
      </div>
      <section className="py-12 md:py-20 lg:py-32">
        <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
          <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-balance text-4xl font-semibold lg:text-6xl">
              The foundation for AI
            </h2>
            <p>
              Lyra is evolving to be more than just the models. It supports an
              entire to the APIs and platforms helping developers and businesses
              innovate.
            </p>
          </div>

          <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
            <Accordion
              type="single"
              value={activeItem}
              onValueChange={(value) => setActiveItem(value as ImageKey)}
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 text-base">
                    <Database className="size-4" />
                    Database Visualization
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Lyra is evolving to be more than just the models. It supports
                  an entire to the APIs and platforms helping developers and
                  businesses innovate.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 text-base">
                    <Fingerprint className="size-4" />
                    Advanced Authentication
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Lyra is evolving to be more than just the models. It supports
                  an entire to the APIs and platforms helping developers and
                  businesses innovate.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 text-base">
                    <IdCard className="size-4" />
                    Identity Management
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Lyra is evolving to be more than just the models. It supports
                  an entire to the APIs and platforms helping developers and
                  businesses innovate.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 text-base">
                    <ChartBarIncreasingIcon className="size-4" />
                    Analytics Dashboard
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Lyra is evolving to be more than just the models. It supports
                  an entire to the APIs and platforms helping developers and
                  businesses innovate.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="bg-background relative flex overflow-hidden rounded-3xl border p-2">
              <div className="w-15 absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]"></div>
              <div className="aspect-76/59 bg-background relative w-[calc(3/4*100%+3rem)] rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeItem}-id`}
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md"
                  >
                    <Image
                      src={images[activeItem].image}
                      className="size-full object-cover object-left-top dark:mix-blend-lighten"
                      alt={images[activeItem].alt}
                      width={1207}
                      height={929}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
