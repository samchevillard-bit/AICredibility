import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/site';
import { deleteLead, setLeadRead } from '@/lib/actions/leads';
import PageHeader from '@/components/admin/PageHeader';
import ConfirmSubmit from '@/components/admin/ConfirmSubmit';

export default async function MessagesPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <>
      <PageHeader
        title="Demandes reçues"
        description="Les messages envoyés depuis le formulaire « Audit offert » du site."
      />
      {leads.length === 0 ? (
        <div className="adm-card p-10 text-center text-ink-500">Aucune demande pour l’instant.</div>
      ) : (
        <ul className="space-y-3">
          {leads.map((l) => (
            <li key={l.id} className={`adm-card p-5 ${l.read ? '' : '!border-ink shadow-[4px_4px_0_#D9F26B]'}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 font-semibold">
                    {!l.read && (
                      <span className="rounded bg-citron px-1.5 py-0.5 font-mono text-[10px] font-normal uppercase tracking-wider">
                        Nouveau
                      </span>
                    )}
                    {l.name}
                    {l.company && <span className="font-normal text-ink-500">· {l.company}</span>}
                    <span className="rounded border border-ink/15 px-1.5 py-0.5 font-mono text-[10px] font-normal uppercase text-ink-500">
                      {l.locale}
                    </span>
                  </p>
                  <p className="mt-1 flex flex-wrap gap-x-4 text-sm text-ink-500">
                    <a href={`mailto:${l.email}`} className="underline underline-offset-4 hover:text-ink">
                      {l.email}
                    </a>
                    {l.website && (
                      <a
                        href={/^https?:\/\//.test(l.website) ? l.website : `https://${l.website}`}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="underline underline-offset-4 hover:text-ink"
                      >
                        {l.website}
                      </a>
                    )}
                    <span>{formatDate(l.createdAt)}</span>
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <a href={`mailto:${l.email}?subject=${encodeURIComponent('Votre audit GEO')}`} className="adm-btn-primary !py-2">
                    Répondre
                  </a>
                  <form action={setLeadRead.bind(null, l.id, !l.read)}>
                    <button className="adm-btn-ghost !py-2">{l.read ? 'Marquer non lu' : 'Marquer lu'}</button>
                  </form>
                  <form action={deleteLead.bind(null, l.id)}>
                    <ConfirmSubmit message="Supprimer cette demande ?" className="adm-btn-danger !py-2">
                      Supprimer
                    </ConfirmSubmit>
                  </form>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-ink-700">{l.message}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
