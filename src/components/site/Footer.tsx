import type { SiteContent } from '@/lib/content';
import Logo from './Logo';

export default function Footer({ c }: { c: SiteContent }) {
  return (
    <footer className="py-14">
      <div className="container-x flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <Logo name={c.brand_name} />
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500">{c.footer_text}</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-ink-600" aria-label="Pied de page">
          <a href="/#expertises" className="hover:text-ink">Expertises</a>
          <a href="/#offres" className="hover:text-ink">Offres</a>
          <a href="/#faq" className="hover:text-ink">FAQ</a>
          <a href="/mentions-legales" className="hover:text-ink">Mentions légales</a>
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
