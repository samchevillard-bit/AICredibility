import type { Review } from '@prisma/client';
import type { SiteContent } from '@/lib/content';
import { formatDate, initials } from '@/lib/site';
import Emph from './Emph';
import Reveal from './Reveal';
import Stars from './Stars';
import TrustBox from './TrustBox';
import { Arrow } from './Icons';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function Reviews({ c, reviews, locale }: { c: SiteContent; reviews: Review[]; locale: Locale }) {
  const t = getDictionary(locale);
  const score = parseFloat(c.trustpilot_score.replace(',', '.')) || 5;

  return (
    <section id="avis" className="scroll-mt-16 border-t border-ink/10 bg-paper-50 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">{c.reviews_eyebrow}</p>
            <h2 className="h-display mt-5 text-[clamp(2.5rem,5.4vw,4.6rem)]">
              <Emph text={c.reviews_title} />
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <a
              href={c.trustpilot_url || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 rounded-2xl border border-ink/10 bg-paper p-6 transition-colors hover:border-ink/30"
            >
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <span className="text-tp">★</span> Trustpilot
                </p>
                <p className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-5xl leading-none">{c.trustpilot_score}</span>
                  <span className="text-ink-500">/ 5</span>
                </p>
                <p className="mt-2 text-sm text-ink-500">{t.basedOn(c.trustpilot_count)}</p>
              </div>
              <div className="flex flex-col items-end gap-4">
                <Stars rating={score} size={22} />
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 group-hover:text-ink">
                  {t.seeReviews} <Arrow className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal
              as="article"
              key={r.id}
              delay={(i % 3) * 70}
              className={`flex flex-col rounded-2xl border p-6 sm:p-7 ${
                r.featured ? 'border-ink bg-ink text-paper' : 'border-ink/10 bg-paper'
              }`}
            >
              <div className="flex items-center justify-between">
                {r.source === 'trustpilot' ? (
                  <Stars rating={r.rating} size={16} />
                ) : (
                  <span className={r.featured ? '[&_svg]:!fill-citron' : ''}>
                    <Stars rating={r.rating} size={15} variant="plain" />
                  </span>
                )}
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                    r.featured ? 'text-paper/50' : 'text-ink-400'
                  }`}
                >
                  {t.sourceLabels[r.source] ?? r.source}
                </span>
              </div>
              {r.title && <h3 className="mt-5 text-lg font-semibold">{r.title}</h3>}
              <p className={`mt-2 flex-1 leading-relaxed ${r.featured ? 'text-paper/80' : 'text-ink-600'}`}>{r.content}</p>
              <div className="mt-6 flex items-center gap-3">
                {r.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full font-mono text-xs ${
                      r.featured ? 'bg-citron text-ink' : 'bg-ink/[0.07] text-ink-700'
                    }`}
                  >
                    {initials(r.author)}
                  </span>
                )}
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-semibold">{r.author}</p>
                  <p className={r.featured ? 'text-paper/55' : 'text-ink-500'}>
                    {[r.role, r.company].filter(Boolean).join(', ') || formatDate(r.date, locale)}
                  </p>
                </div>
                {r.url && (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs underline underline-offset-4 ${r.featured ? 'text-paper/60' : 'text-ink-500'}`}
                  >
                    {t.seeReview}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {c.trustpilot_business_unit_id && (
          <div className="mt-14">
            <TrustBox businessUnitId={c.trustpilot_business_unit_id} url={c.trustpilot_url} />
          </div>
        )}
      </div>
    </section>
  );
}
