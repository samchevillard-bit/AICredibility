import type { SiteContent } from '@/lib/content';
import { getDictionary, type Locale } from '@/lib/i18n';
import AiAnswer from './AiAnswer';
import Emph from './Emph';
import Stars from './Stars';
import { Arrow } from './Icons';

export default function Hero({ c, ctaHref, locale }: { c: SiteContent; ctaHref: string; locale: Locale }) {
  const t = getDictionary(locale);
  const score = parseFloat(c.trustpilot_score.replace(',', '.')) || 5;

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-[128px] sm:pb-28 sm:pt-[150px]">
      {/* Trame de fond : lignes de « résultats » qui s'effacent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:linear-gradient(rgba(17,20,18,0.07)_1px,transparent_1px)] [background-size:100%_44px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow animate-rise">{c.hero_eyebrow}</p>
          <h1 className="h-display mt-6 animate-rise text-[clamp(3rem,7.2vw,6.4rem)] [animation-delay:80ms]">
            <Emph text={c.hero_title} />
          </h1>
          <p className="mt-7 max-w-[540px] animate-rise text-lg leading-relaxed text-ink-600 [animation-delay:160ms] sm:text-xl">
            {c.hero_subtitle}
          </p>
          <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:240ms]">
            <a href={ctaHref} className="btn-primary">
              {c.cta_label}
              <Arrow />
            </a>
            <a href="#methode" className="btn-ghost">
              {c.hero_cta_secondary}
            </a>
          </div>
          <a
            href={c.trustpilot_url || '#avis'}
            target={c.trustpilot_url ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="mt-10 inline-flex animate-rise items-center gap-3 text-sm text-ink-600 [animation-delay:320ms] hover:text-ink"
          >
            <Stars rating={score} size={18} />
            <span>
              <strong className="font-semibold text-ink">{c.trustpilot_score}/5</strong> {t.onTrustpilot} ·{' '}
              {t.reviewsCount(c.trustpilot_count)}
            </span>
          </a>
        </div>
        <div className="animate-rise [animation-delay:200ms]">
          <AiAnswer prompt={c.hero_prompt} answer={c.hero_answer} locale={locale} />
        </div>
      </div>
    </section>
  );
}
