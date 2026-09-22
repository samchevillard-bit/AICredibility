import type { Metadata } from 'next';
import { getPublicContent } from '@/lib/content';

export const metadata: Metadata = { title: 'Mentions légales', robots: { index: false } };

export default async function LegalPage() {
  const c = await getPublicContent();
  return (
    <section className="container-x max-w-3xl pb-24 pt-40">
      <p className="eyebrow">Informations</p>
      <h1 className="h-display mt-5 text-6xl">Mentions légales</h1>
      <div className="mt-12 space-y-5 text-lg leading-relaxed text-ink-600">
        {c.legal_text.split(/\n\s*\n/).map((p, i) => (
          <p key={i} className="whitespace-pre-line">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
