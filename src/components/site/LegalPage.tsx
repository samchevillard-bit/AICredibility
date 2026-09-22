import type { Metadata } from 'next';
import { getPublicContent } from '@/lib/content';
import { getDictionary, legalPath, type Locale } from '@/lib/i18n';

export function legalMetadata(locale: Locale): Metadata {
  return {
    title: getDictionary(locale).legal,
    robots: { index: false },
    alternates: { languages: { fr: legalPath('fr'), en: legalPath('en') } },
  };
}

export default async function LegalPage({ locale }: { locale: Locale }) {
  const c = await getPublicContent(locale);
  const t = getDictionary(locale);
  return (
    <section className="container-x max-w-3xl pb-24 pt-40">
      <p className="eyebrow">{t.legalEyebrow}</p>
      <h1 className="h-display mt-5 text-6xl">{t.legal}</h1>
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
