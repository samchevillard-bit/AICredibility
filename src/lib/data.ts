import { prisma } from '@/lib/prisma';
import { getPublicContent, typo } from '@/lib/content';
import { COLLECTIONS, enName, type Collection } from '@/lib/collections';
import type { Locale } from '@/lib/i18n';

const ordered = { orderBy: [{ position: 'asc' as const }, { createdAt: 'asc' as const }] };

// Remplace chaque champ traduisible par sa version anglaise quand elle existe,
// puis applique la typographie de la langue.
function localize<T extends object>(rows: T[], model: Collection['model'], locale: Locale): T[] {
  const translatable = COLLECTIONS.find((c) => c.model === model)!.fields.filter((f) => f.translatable);
  return rows.map((row) => {
    const out = { ...row } as Record<string, unknown>;
    for (const f of translatable) {
      const en = out[enName(f.name)];
      if (locale === 'en' && typeof en === 'string' && en.trim()) out[f.name] = en;
      if (typeof out[f.name] === 'string') out[f.name] = typo(out[f.name] as string, locale);
    }
    return out as T;
  });
}

export async function getSiteData(locale: Locale) {
  const [content, services, steps, plans, faqs, reviews] = await Promise.all([
    getPublicContent(locale),
    prisma.service.findMany({ where: { published: true }, ...ordered }),
    prisma.step.findMany({ where: { published: true }, ...ordered }),
    prisma.plan.findMany({ where: { published: true }, ...ordered }),
    prisma.faqItem.findMany({ where: { published: true }, ...ordered }),
    prisma.review.findMany({
      where: { published: true },
      orderBy: [{ featured: 'desc' }, { position: 'asc' }, { date: 'desc' }],
    }),
  ]);
  return {
    content,
    services: localize(services, 'service', locale),
    steps: localize(steps, 'step', locale),
    plans: localize(plans, 'plan', locale),
    faqs: localize(faqs, 'faqItem', locale),
    reviews: localize(reviews, 'review', locale),
  };
}
