import type { SiteContent } from '@/lib/content';
import { getDictionary, legalPath, localePrefix, type Locale } from '@/lib/i18n';
import Logo from './Logo';

export default function Footer({ c, locale }: { c: SiteContent; locale: Locale }) {
  const t = getDictionary(locale);
  const home = localePrefix(locale) || '/';
  return (
    <footer className="py-14">
      <div className="container-x flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <Logo name={c.brand_name} />
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500">{c.footer_text}</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-ink-600" aria-label={t.footerNav}>
          <a href={`${home}#expertises`} className="hover:text-ink">{t.nav.services}</a>
          <a href={`${home}#offres`} className="hover:text-ink">{t.nav.pricing}</a>
          <a href={`${home}#faq`} className="hover:text-ink">{t.nav.faq}</a>
          <a href={legalPath(locale)} className="hover:text-ink">{t.legal}</a>
          <a href="/llms.txt" className="hover:text-ink">llms.txt</a>
        </nav>
      </div>
      <div className="container-x mt-12 flex flex-col justify-between gap-2 border-t border-ink/10 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400 sm:flex-row">
        <span>© {new Date().getFullYear()} {c.brand_name}</span>
        <span>{c.brand_baseline}</span>
      </div>
    </footer>
  );
}
