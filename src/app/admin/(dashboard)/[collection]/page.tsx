import Link from 'next/link';
import { notFound } from 'next/navigation';
import { enName, getCollection, REVIEW_SOURCES } from '@/lib/collections';
import { listItems } from '@/lib/collection-data';
import { deleteItem, moveItem, togglePublished } from '@/lib/actions/collections';
import PageHeader from '@/components/admin/PageHeader';
import ConfirmSubmit from '@/components/admin/ConfirmSubmit';

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams: { saved?: string };
}) {
  const collection = getCollection(params.collection);
  if (!collection) notFound();
  const items = await listItems(collection);
  const slug = collection.slug;

  return (
    <>
      <PageHeader title={collection.label} description={collection.description}>
        <Link href={`/admin/${slug}/nouveau`} className="adm-btn-primary">
          + Ajouter {collection.singular}
        </Link>
      </PageHeader>

      {searchParams.saved && (
        <p className="mb-5 animate-rise rounded-lg bg-citron px-4 py-3 text-sm font-medium" role="status">
          ✓ Enregistré, le site est à jour.
        </p>
      )}

      {items.length === 0 ? (
        <div className="adm-card p-10 text-center text-ink-500">
          Rien pour l’instant.{' '}
          <Link href={`/admin/${slug}/nouveau`} className="underline underline-offset-4">
            Ajouter {collection.singular}
          </Link>
          .
        </div>
      ) : (
        <ul className="adm-card divide-y divide-ink/10">
          {items.map((item, i) => {
            const title = String(item[collection.titleField] ?? '');
            const subtitle = collection.subtitleField ? String(item[collection.subtitleField] ?? '') : '';
            const isReview = collection.model === 'review';
            // Traduction complète si chaque champ obligatoire traduisible a sa version anglaise.
            const translated = collection.fields
              .filter((f) => f.translatable && f.required)
              .every((f) => String(item[enName(f.name)] ?? '').trim());
            return (
              <li key={item.id} className={`flex items-center gap-3 px-3 py-3 sm:px-4 ${item.published ? '' : 'bg-ink/[0.025]'}`}>
                <div className="flex flex-col">
                  <form action={moveItem.bind(null, slug, item.id, 'up')}>
                    <button className="adm-icon-btn !h-6" disabled={i === 0} aria-label="Monter" title="Monter">
                      ▲
                    </button>
                  </form>
                  <form action={moveItem.bind(null, slug, item.id, 'down')}>
                    <button className="adm-icon-btn !h-6" disabled={i === items.length - 1} aria-label="Descendre" title="Descendre">
                      ▼
                    </button>
                  </form>
                </div>
                <Link href={`/admin/${slug}/${item.id}`} className="group min-w-0 flex-1 py-1">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold group-hover:underline group-hover:underline-offset-4">
                    <span className={item.published ? '' : 'text-ink-400'}>{title}</span>
                    {isReview && (
                      <span className="font-normal text-tp" aria-label={`${item.rating} étoiles`}>
                        {'★'.repeat(Number(item.rating))}
                        <span className="text-ink/15">{'★'.repeat(5 - Number(item.rating))}</span>
                      </span>
                    )}
                    {isReview && (
                      <span className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-[10px] font-normal uppercase tracking-wider text-ink-500">
                        {REVIEW_SOURCES.find((s) => s.value === item.source)?.label ?? String(item.source)}
                      </span>
                    )}
                    {!isReview && (
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-normal uppercase tracking-wider ${
                        translated ? 'bg-ink/5 text-ink-500' : 'border border-dashed border-ink/25 text-ink-400'
                      }`}
                      title={translated ? 'Version anglaise renseignée' : 'Pas encore traduit : le site anglais affiche le français'}
                    >
                      {translated ? 'EN ✓' : 'EN à traduire'}
                    </span>
                    )}
                    {Boolean(item.featured) && (
                      <span className="rounded bg-citron px-1.5 py-0.5 font-mono text-[10px] font-normal uppercase tracking-wider">
                        En avant
                      </span>
                    )}
                    {Boolean(item.highlighted) && (
                      <span className="rounded bg-citron px-1.5 py-0.5 font-mono text-[10px] font-normal uppercase tracking-wider">
                        Recommandée
                      </span>
                    )}
                  </p>
                  {subtitle && <p className="mt-0.5 truncate text-sm text-ink-500">{subtitle}</p>}
                </Link>
                <form action={togglePublished.bind(null, slug, item.id)}>
                  <button
                    className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                      item.published ? 'bg-ink text-paper hover:bg-ink-600' : 'border border-ink/20 text-ink-500 hover:border-ink'
                    }`}
                    title={item.published ? 'Masquer du site' : 'Afficher sur le site'}
                  >
                    {item.published ? 'Visible' : 'Masqué'}
                  </button>
                </form>
                <form action={deleteItem.bind(null, slug, item.id)}>
                  <ConfirmSubmit
                    message={`Supprimer définitivement « ${title} » ?`}
                    className="adm-icon-btn hover:!bg-red-50 hover:!text-red-700"
                    title="Supprimer"
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="sr-only">Supprimer</span>
                  </ConfirmSubmit>
                </form>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
