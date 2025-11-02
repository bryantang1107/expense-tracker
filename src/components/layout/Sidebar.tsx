'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Squares2X2Icon,
  CurrencyDollarIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside
        className={`h-screen overflow-hidden border-r border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900 flex flex-col ${
          collapsed ? 'w-16 min-w-16 items-center' : 'w-64 min-w-[200px]'
        }`}
      >
        <div className="flex items-center justify-between px-3 mt-8">
          {!collapsed && (
            <div className="text-sm font-semibold whitespace-nowrap transition-[opacity,width] duration-200">
              Expense Tracker
            </div>
          )}
          <button
            aria-label="Toggle sidebar"
            className="h-8 w-8 flex items-center justify-center rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800"
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? (
              <Bars3Icon className="h-4 w-4" />
            ) : (
              <XMarkIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="mt-2 flex flex-col gap-1 px-2">
          <SidebarItem
            href="/dashboard"
            label="Overview"
            icon={Squares2X2Icon}
            collapsed={collapsed}
          />
          <SidebarItem
            href="/expense"
            label="Expenses"
            icon={CurrencyDollarIcon}
            collapsed={collapsed}
          />
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({
  href,
  label,
  icon: Icon,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className={collapsed ? 'sr-only' : ''}>{label}</span>
    </Link>
  );
}
