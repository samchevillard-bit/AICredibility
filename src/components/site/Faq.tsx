import type { FaqItem } from '@prisma/client';
import type { SiteContent } from '@/lib/content';
import Emph from './Emph';
import Reveal from './Reveal';

export default function Faq({ c, faqs }: { c: SiteContent; faqs: FaqItem[] }) {
  return (
    <section id="faq" className="scroll-mt-16 border-t border-ink/10 py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{c.faq_eyebrow}</p>
          <h2 className="h-display mt-5 text-[clamp(2.5rem,5vw,4.2rem)]">
            <Emph text={c.faq_title} />
          </h2>
        </Reveal>
        <div className="border-t border-ink/15">
          {faqs.map((f, i) => (
            <details key={f.id} className="group border-b border-ink/15" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left text-lg font-semibold sm:text-xl [&::-webkit-details-marker]:hidden">
                {f.question}
                <span className="relative mt-1.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors group-open:border-ink group-open:bg-ink">
                  <span className="absolute h-[1.5px] w-3 bg-ink group-open:bg-citron" />
                  <span className="absolute h-3 w-[1.5px] bg-ink transition-transform group-open:scale-y-0" />
                </span>
              </summary>
              <p className="-mt-1 max-w-[62ch] pb-7 pr-12 leading-relaxed text-ink-600">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
