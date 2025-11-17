'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
        className={`fixed left-0 top-0 h-screen overflow-hidden border-r border-border bg-card transition-all duration-300 flex flex-col z-50 ${
          collapsed ? 'w-16 min-w-16 items-center' : 'w-64 min-w-[200px]'
        }`}
      >
        <div className="flex items-center justify-between px-3 mt-8">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Image
                src="/icons/logo.png"
                alt="GoExpense"
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
              <div className="text-sm font-semibold whitespace-nowrap transition-[opacity,width] duration-200 text-foreground">
                GoExpense
              </div>
            </div>
          )}
          <button
            aria-label="Toggle sidebar"
            className="h-8 w-8 flex items-center justify-center rounded-md border border-border text-foreground hover:bg-accent"
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
            onNavigate={() => setCollapsed(true)}
          />
          <SidebarItem
            href="/expense"
            label="Expenses"
            icon={CurrencyDollarIcon}
            collapsed={collapsed}
            onNavigate={() => setCollapsed(true)}
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
  onNavigate,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        isActive
          ? 'bg-accent text-accent-foreground font-bold'
          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className={collapsed ? 'sr-only' : ''}>{label}</span>
    </Link>
  );
}
