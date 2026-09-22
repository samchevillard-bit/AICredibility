import type { SiteContent } from '@/lib/content';
import Emph from './Emph';
import Reveal from './Reveal';

export default function Shift({ c }: { c: SiteContent }) {
  const brand = c.brand_name;
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{c.shift_eyebrow}</p>
            <h2 className="h-display mt-5 text-[clamp(2.5rem,5.4vw,4.6rem)]">
              <Emph text={c.shift_title} />
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:pt-12">
            <p className="text-lg leading-relaxed text-ink-600 sm:text-xl">{c.shift_text}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-ink/10 bg-paper-50 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{c.shift_before_title}</h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">Avant</span>
            </div>
            <p className="mt-2 text-ink-600">{c.shift_before_text}</p>
            <ol className="mt-7 space-y-3" aria-hidden>
              {[92, 76, 84, 64, 70].map((w, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-5 font-mono text-xs text-ink-400">{i + 1}</span>
                  <span className="flex-1 space-y-1.5">
                    <span className="block h-2.5 rounded-full bg-[#4a6fd8]/40" style={{ width: `${w}%` }} />
                    <span className="block h-2 rounded-full bg-ink/10" style={{ width: `${w - 18}%` }} />
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120} className="on-dark relative overflow-hidden rounded-3xl bg-ink p-6 text-paper sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{c.shift_after_title}</h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-citron">Maintenant</span>
            </div>
            <p className="mt-2 text-paper/65">{c.shift_after_text}</p>
            <div className="mt-7 rounded-2xl border border-paper/10 bg-paper/[0.04] p-5 text-[15px] leading-relaxed text-paper/75">
              Pour votre besoin, trois options se démarquent.{' '}
              <span className="rounded bg-citron px-1 font-semibold text-ink">{brand}</span> est la plus souvent
              recommandée pour son expertise, suivie de deux concurrents
              <span className="ml-1 inline-flex gap-1 align-middle">
                {[1, 2, 3].map((n) => (
                  <span key={n} className="grid h-4 w-4 place-items-center rounded-full bg-paper/15 font-mono text-[9px]">
                    {n}
                  </span>
                ))}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
