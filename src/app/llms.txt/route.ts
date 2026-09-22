import { getSiteData } from '@/lib/data';
import { lines, siteUrl } from '@/lib/site';
import { plain } from '@/components/site/Emph';

export const dynamic = 'force-dynamic';

// Résumé du site au format llms.txt, pensé pour les agents et moteurs d'IA.
export async function GET() {
  const { content: c, services, plans, faqs } = await getSiteData();
  const out = [
    `# ${c.brand_name}`,
    '',
    `> ${c.meta_description}`,
    '',
    plain(c.hero_subtitle),
    '',
    '## Expertises',
    ...services.map((s) => `- **${s.title}** : ${s.description}${lines(s.bullets).length ? ` (${lines(s.bullets).join(' ; ')})` : ''}`),
    '',
    '## Offres',
    ...plans.map((p) => `- **${p.name}** : ${p.price}${p.period ? ` ${p.period}` : ''}. ${lines(p.features).join(' ; ')}`),
    '',
    '## Questions fréquentes',
    ...faqs.flatMap((f) => [`### ${f.question}`, f.answer, '']),
    '## Contact',
    `- Email : ${c.contact_email}`,
    c.contact_phone ? `- Téléphone : ${c.contact_phone}` : '',
    `- Site : ${siteUrl}`,
    c.trustpilot_url ? `- Avis Trustpilot : ${c.trustpilot_url} (${c.trustpilot_score}/5, ${c.trustpilot_count} avis)` : '',
  ]
    .filter((l) => l !== undefined)
    .join('\n');

  return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
