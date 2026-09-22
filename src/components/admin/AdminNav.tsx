'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type NavItem = { href: string; label: string; badge?: number; exact?: boolean; section?: string };

export default function AdminNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible" aria-label="Administration">
      {items.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <div key={item.href} className="shrink-0">
            {item.section && (
              <p className="mb-2 mt-6 hidden px-3 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/35 lg:block">
                {item.section}
              </p>
            )}
            <Link
              href={item.href}
              className={`flex items-center justify-between gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-[14px] transition-colors ${
                active ? 'bg-paper text-ink' : 'text-paper/70 hover:bg-paper/10 hover:text-paper'
              }`}
            >
              {item.label}
              {!!item.badge && (
                <span className="rounded-full bg-citron px-1.5 py-px font-mono text-[10px] font-medium text-ink">{item.badge}</span>
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
