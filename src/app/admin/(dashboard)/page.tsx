import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { formatDate } from '@/lib/site';
import PageHeader from '@/components/admin/PageHeader';

export default async function AdminHome() {
  const [session, reviews, services, plans, faqs, leads, unread, settings] = await Promise.all([
    getSession(),
    prisma.review.count({ where: { published: true } }),
    prisma.service.count({ where: { published: true } }),
    prisma.plan.count({ where: { published: true } }),
    prisma.faqItem.count({ where: { published: true } }),
    prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.lead.count({ where: { read: false } }),
    prisma.setting.count(),
  ]);

  const stats = [
    { label: 'Demandes non lues', value: unread, href: '/admin/messages', accent: unread > 0 },
    { label: 'Avis publiés', value: reviews, href: '/admin/avis' },
    { label: 'Expertises', value: services, href: '/admin/expertises' },
    { label: 'Offres', value: plans, href: '/admin/offres' },
    { label: 'Questions FAQ', value: faqs, href: '/admin/faq' },
    { label: 'Textes personnalisés', value: settings, href: '/admin/textes' },
  ];

  return (
    <>
      <PageHeader title={`Bonjour${session?.name && session.name !== 'Administrateur' ? `, ${session.name}` : ''}.`} description="Voici l’état de votre site." />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`adm-card p-5 transition-colors hover:border-ink/30 ${s.accent ? '!border-ink !bg-citron' : ''}`}
          >
            <p className="font-display text-5xl leading-none">{s.value}</p>
            <p className="mt-2 text-sm text-ink-600">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="adm-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Dernières demandes</h2>
            <Link href="/admin/messages" className="text-sm text-ink-500 underline underline-offset-4 hover:text-ink">
              Tout voir
            </Link>
          </div>
          {leads.length === 0 ? (
            <p className="mt-6 text-sm text-ink-500">Aucune demande pour l’instant. Elles arriveront ici depuis le formulaire du site.</p>
          ) : (
            <ul className="mt-4 divide-y divide-ink/10">
              {leads.map((l) => (
                <li key={l.id} className="flex items-start gap-3 py-3">
                  <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${l.read ? 'bg-ink/15' : 'bg-citron-600'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="flex justify-between gap-3 text-sm">
                      <span className="truncate font-semibold">
                        {l.name}
                        {l.company && <span className="font-normal text-ink-500"> · {l.company}</span>}
                      </span>
                      <span className="shrink-0 text-ink-400">{formatDate(l.createdAt)}</span>
                    </p>
                    <p className="mt-0.5 truncate text-sm text-ink-500">{l.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="adm-card p-6">
          <h2 className="text-lg font-semibold">Avant la mise en ligne</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-600">
            {[
              ['Remplacer les avis de démonstration par vos vrais avis', '/admin/avis'],
              ['Vérifier les chiffres clés et la citation client', '/admin/textes?section=results'],
              ['Renseigner votre note et votre lien Trustpilot', '/admin/textes?section=reviews'],
              ['Ajuster tarifs et formules', '/admin/offres'],
              ['Compléter les mentions légales', '/admin/textes?section=footer'],
              ['Changer le mot de passe administrateur', '/admin/compte'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="group flex items-start gap-2.5 hover:text-ink">
                  <span className="mt-[3px] h-3.5 w-3.5 shrink-0 rounded border border-ink/30 group-hover:border-ink" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
