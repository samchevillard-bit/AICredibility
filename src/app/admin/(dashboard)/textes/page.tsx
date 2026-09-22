import Link from 'next/link';
import { CONTENT_FIELDS, CONTENT_GROUPS, defaultValue, getContent } from '@/lib/content';
import ContentForm from '@/components/admin/ContentForm';
import PageHeader from '@/components/admin/PageHeader';

export default async function TextsPage({ searchParams }: { searchParams: { section?: string } }) {
  const [fr, en] = await Promise.all([getContent('fr'), getContent('en')]);
  const defaults = {
    fr: Object.fromEntries(CONTENT_FIELDS.map((f) => [f.key, defaultValue(f, 'fr')])),
    en: Object.fromEntries(CONTENT_FIELDS.map((f) => [f.key, defaultValue(f, 'en')])),
  };
  const group = CONTENT_GROUPS.find((g) => g.id === searchParams.section) ?? CONTENT_GROUPS[0];

  return (
    <>
      <PageHeader
        title="Textes du site"
        description="Modifiez chaque texte de la page d’accueil, en français (FR) et en anglais (EN). Les changements sont visibles immédiatement après l’enregistrement."
      />
      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Sections">
          {CONTENT_GROUPS.map((g) => (
            <Link
              key={g.id}
              href={`/admin/textes?section=${g.id}`}
              className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
                g.id === group.id ? 'bg-ink text-paper' : 'text-ink-600 hover:bg-ink/5 hover:text-ink'
              }`}
            >
              {g.title}
            </Link>
          ))}
        </nav>
        <section className="adm-card overflow-hidden bg-paper-50 px-6 pt-6">
          <h2 className="text-xl font-semibold">{group.title}</h2>
          <p className="mb-6 mt-1 text-sm text-ink-500">{group.description}</p>
          <ContentForm groupId={group.id} fields={group.fields} values={{ fr, en }} defaults={defaults} />
        </section>
      </div>
    </>
  );
}
