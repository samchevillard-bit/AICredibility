import type { Step } from '@prisma/client';
import type { SiteContent } from '@/lib/content';
import Emph from './Emph';
import Reveal from './Reveal';

export default function Method({ c, steps }: { c: SiteContent; steps: Step[] }) {
  return (
    <section id="methode" className="on-dark scroll-mt-16 bg-ink py-24 text-paper sm:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{c.method_eyebrow}</p>
          <h2 className="h-display mt-5 text-[clamp(2.5rem,5.4vw,4.6rem)]">
            <Emph text={c.method_title} />
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper/65">{c.method_intro}</p>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden className="absolute left-0 right-0 top-[3px] hidden h-px bg-paper/15 lg:block" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 110} className="relative lg:pt-10">
              <span
                className="block font-display text-[88px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(243,240,232,0.45)]"
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="absolute left-0 top-0 hidden h-2 w-2 rounded-full bg-citron ring-4 ring-ink lg:block" />
              {s.duration && (
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-citron">{s.duration}</p>
              )}
              <h3 className="mt-2 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-paper/65">{s.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
