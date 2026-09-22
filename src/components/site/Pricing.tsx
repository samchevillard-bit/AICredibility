import type { Plan } from '@prisma/client';
import type { SiteContent } from '@/lib/content';
import { lines } from '@/lib/site';
import Emph from './Emph';
import Reveal from './Reveal';
import { Arrow, Check } from './Icons';

export default function Pricing({ c, plans, ctaHref }: { c: SiteContent; plans: Plan[]; ctaHref: string }) {
  return (
    <section id="offres" className="scroll-mt-16 py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{c.pricing_eyebrow}</p>
          <h2 className="h-display mt-5 text-[clamp(2.5rem,5.4vw,4.6rem)]">
            <Emph text={c.pricing_title} />
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-600">{c.pricing_intro}</p>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {plans.map((p, i) => (
            <Reveal
              key={p.id}
              delay={i * 90}
              className={`relative flex flex-col rounded-[26px] p-7 sm:p-9 ${
                p.highlighted
                  ? 'on-dark bg-ink text-paper shadow-[0_40px_80px_-40px_rgba(17,20,18,0.7)] lg:-my-4 lg:py-12'
                  : 'border border-ink/10 bg-paper-50'
              }`}
            >
              {p.highlighted && (
                <span className="absolute right-6 top-6 rounded-full bg-citron px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                  Recommandée
                </span>
              )}
              <h3 className="font-display text-[34px] leading-none">{p.name}</h3>
              {p.tagline && <p className={`mt-2 ${p.highlighted ? 'text-paper/60' : 'text-ink-500'}`}>{p.tagline}</p>}
              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-[44px] font-semibold leading-none tracking-tight">{p.price}</span>
                {p.period && <span className={p.highlighted ? 'text-paper/60' : 'text-ink-500'}>{p.period}</span>}
              </p>
              <ul className={`mt-8 flex-1 space-y-3 border-t pt-8 ${p.highlighted ? 'border-paper/15' : 'border-ink/10'}`}>
                {lines(p.features).map((f) => (
                  <li key={f} className="flex gap-3 text-[15px]">
                    <Check className={`mt-0.5 shrink-0 ${p.highlighted ? 'text-citron' : 'text-ink'}`} />
                    <span className={p.highlighted ? 'text-paper/85' : 'text-ink-700'}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={ctaHref} className={`mt-10 w-full ${p.highlighted ? 'btn-citron' : 'btn-primary'}`}>
                {p.ctaLabel}
                <Arrow />
              </a>
            </Reveal>
          ))}
        </div>
        {c.pricing_note && <p className="mt-10 text-center text-sm text-ink-500">{c.pricing_note}</p>}
      </div>
    </section>
  );
}
