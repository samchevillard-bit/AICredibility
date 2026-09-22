import { prisma } from '@/lib/prisma';
import { frTypo, getPublicContent } from '@/lib/content';

const ordered = { orderBy: [{ position: 'asc' as const }, { createdAt: 'asc' as const }] };

export async function getSiteData() {
  const [content, services, steps, plans, faqs, reviews] = await Promise.all([
    getPublicContent(),
    prisma.service.findMany({ where: { published: true }, ...ordered }),
    prisma.step.findMany({ where: { published: true }, ...ordered }),
    prisma.plan.findMany({ where: { published: true }, ...ordered }),
    prisma.faqItem.findMany({ where: { published: true }, ...ordered }),
    prisma.review.findMany({
      where: { published: true },
      orderBy: [{ featured: 'desc' }, { position: 'asc' }, { date: 'desc' }],
    }),
  ]);
  // Applique la typographie française aux textes saisis dans l'admin.
  const typo = <T extends object>(rows: T[]) =>
    rows.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([k, v]) => [k, typeof v === 'string' && !/url|Url|source|id/.test(k) ? frTypo(v) : v]),
      ) as T,
    );
  return {
    content,
    services: typo(services),
    steps: typo(steps),
    plans: typo(plans),
    faqs: typo(faqs),
    reviews: typo(reviews),
  };
}
