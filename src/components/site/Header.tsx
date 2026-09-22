'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import { Arrow } from './Icons';

const NAV = [
  { href: '#expertises', label: 'Expertises' },
  { href: '#methode', label: 'Méthode' },
  { href: '#avis', label: 'Avis' },
  { href: '#offres', label: 'Offres' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header({ brand, cta, ctaHref }: { brand: string; cta: string; ctaHref: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-ink/10 bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-[68px] items-center justify-between gap-6">
        <a href="#top" aria-label={`${brand}, accueil`} onClick={() => setOpen(false)}>
          <Logo name={brand} />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] text-ink-600 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={ctaHref} className="btn-primary hidden !py-2.5 !text-[14px] sm:inline-flex">
            {cta}
            <Arrow />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
              />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="container-x flex flex-col pb-6 lg:hidden" aria-label="Navigation mobile">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/10 py-4 font-display text-3xl"
            >
              {item.label}
            </a>
          ))}
          <a href={ctaHref} onClick={() => setOpen(false)} className="btn-primary mt-6">
            {cta}
          </a>
        </nav>
      )}
    </header>
  );
}
