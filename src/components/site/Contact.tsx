import type { SiteContent } from '@/lib/content';
import ContactForm from './ContactForm';
import Emph from './Emph';
import Reveal from './Reveal';

export default function Contact({ c }: { c: SiteContent }) {
  return (
    <section id="contact" className="scroll-mt-16 px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="on-dark relative overflow-hidden rounded-[32px] bg-ink py-20 text-paper sm:py-28">
        <div
          aria-hidden
          className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(217,242,107,0.22),transparent)]"
        />
        <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{c.contact_eyebrow}</p>
            <h2 className="h-display mt-5 text-[clamp(2.6rem,5.6vw,4.8rem)]">
              <Emph text={c.contact_title} />
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-paper/65">{c.contact_text}</p>
            <dl className="mt-10 space-y-4 text-[15px]">
              <div className="flex gap-4">
                <dt className="w-20 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/40 pt-1">Email</dt>
                <dd>
                  <a href={`mailto:${c.contact_email}`} className="underline decoration-paper/30 underline-offset-4 hover:decoration-citron">
                    {c.contact_email}
                  </a>
                </dd>
              </div>
              {c.contact_phone && (
                <div className="flex gap-4">
                  <dt className="w-20 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/40 pt-1">Tél.</dt>
                  <dd>
                    <a href={`tel:${c.contact_phone.replace(/\s/g, '')}`} className="hover:text-citron">
                      {c.contact_phone}
                    </a>
                  </dd>
                </div>
              )}
              {c.contact_city && (
                <div className="flex gap-4">
                  <dt className="w-20 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/40 pt-1">Zone</dt>
                  <dd>{c.contact_city}</dd>
                </div>
              )}
            </dl>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm success={c.contact_success} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
