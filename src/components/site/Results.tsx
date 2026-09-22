import type { SiteContent } from '@/lib/content';
import { initials } from '@/lib/site';
import Emph from './Emph';
import Reveal from './Reveal';

export default function Results({ c }: { c: SiteContent }) {
  const stats = [1, 2, 3, 4]
    .map((n) => ({ value: c[`stat${n}_value`], label: c[`stat${n}_label`] }))
    .filter((s) => s.value);

  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{c.results_eyebrow}</p>
          <h2 className="h-display mt-5 text-[clamp(2.5rem,5.4vw,4.6rem)]">
            <Emph text={c.results_title} />
          </h2>
        </Reveal>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/10 pt-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(3.2rem,6vw,5.2rem)] leading-none tracking-tight">
                  {s.value}
                </span>
                <span className="mt-3 block max-w-[24ch] text-[15px] leading-snug text-ink-600">{s.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        {c.case_quote && (
          <Reveal className="mt-20 grid gap-8 rounded-[28px] bg-citron p-8 sm:p-12 lg:grid-cols-[auto_1fr] lg:gap-14">
            <span className="block h-10 font-display text-[96px] leading-[0.8] text-ink/90 lg:h-auto lg:text-[120px] lg:leading-[0.6]" aria-hidden>
              “
            </span>
            <figure>
              <blockquote className="font-display text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.15]">
                {c.case_quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink font-mono text-sm text-citron">
                  {initials(c.case_author)}
                </span>
                <span>
                  <span className="block font-semibold">{c.case_author}</span>
                  <span className="block text-sm text-ink-700">{c.case_company}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>
    </section>
  );
}
