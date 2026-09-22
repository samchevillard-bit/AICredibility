import type { Service } from '@prisma/client';
import type { SiteContent } from '@/lib/content';
import { lines } from '@/lib/site';
import Emph from './Emph';
import Reveal from './Reveal';

export default function Services({ c, services }: { c: SiteContent; services: Service[] }) {
  return (
    <section id="expertises" className="scroll-mt-16 border-t border-ink/10 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">{c.services_eyebrow}</p>
            <h2 className="h-display mt-5 max-w-[14ch] text-[clamp(2.5rem,5.4vw,4.6rem)]">
              <Emph text={c.services_title} />
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[46ch] text-lg leading-relaxed text-ink-600">{c.services_intro}</p>
          </Reveal>
        </div>

        <ul className="mt-16 grid border-l border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.id}
              delay={(i % 3) * 80}
              className="group relative border-b border-r border-ink/10 p-7 transition-colors duration-300 hover:bg-paper-50 sm:p-9"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-citron-500 transition-transform duration-500 group-hover:scale-x-100" />
              <span className="font-mono text-xs text-ink-400">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-8 font-display text-[32px] leading-[1.05]">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-600">{s.description}</p>
              {lines(s.bullets).length > 0 && (
                <ul className="mt-6 space-y-2 text-[15px] text-ink-700">
                  {lines(s.bullets).map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className="mt-[9px] h-1 w-3 shrink-0 bg-ink/30 transition-colors group-hover:bg-citron-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
