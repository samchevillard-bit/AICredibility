'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import { Arrow } from './Icons';
import { getDictionary, localePrefix, type Locale } from '@/lib/i18n';

export default function Header({
  brand,
  cta,
  ctaHref,
  locale,
  alternateHref,
}: {
  brand: string;
  cta: string;
  ctaHref: string;
  locale: Locale;
  alternateHref: string;
}) {
  const t = getDictionary(locale);
  const home = localePrefix(locale) || '/';
  const NAV = [
    { href: `${home}#expertises`, label: t.nav.services },
    { href: `${home}#methode`, label: t.nav.method },
    { href: `${home}#avis`, label: t.nav.reviews },
    { href: `${home}#offres`, label: t.nav.pricing },
    { href: `${home}#faq`, label: t.nav.faq },
  ];
  const other = locale === 'fr' ? 'en' : 'fr';
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
        <a href={home} aria-label={`${brand}, ${t.home}`} onClick={() => setOpen(false)}>
          <Logo name={brand} />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label={t.mainNav}>
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
          <LangSwitch locale={locale} other={other} href={alternateHref} />
          <a href={ctaHref} className="btn-primary hidden !py-2.5 !text-[14px] sm:inline-flex">
            {cta}
            <Arrow />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 lg:hidden"
            aria-expanded={open}
            aria-label={open ? t.closeMenu : t.openMenu}
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
        <nav className="container-x flex flex-col pb-6 lg:hidden" aria-label={t.mainNav}>
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

function LangSwitch({ locale, other, href }: { locale: Locale; other: Locale; href: string }) {
  return (
    <div className="flex items-center rounded-full border border-ink/15 p-1 font-mono text-[11px] uppercase">
      <span className="rounded-full bg-ink px-2.5 py-1.5 text-paper" aria-current="true">
        {locale}
      </span>
      <a
        href={href}
        hrefLang={other}
        lang={other}
        className="rounded-full px-2.5 py-1.5 text-ink-500 transition-colors hover:text-ink"
        title={getDictionary(other).switchTo}
      >
        {other}
      </a>
    </div>
  );
}
