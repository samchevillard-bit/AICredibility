import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/collections';
import { defaultValues } from '@/lib/collection-data';
import ItemForm from '@/components/admin/ItemForm';
import PageHeader from '@/components/admin/PageHeader';

export default function NewItemPage({ params }: { params: { collection: string } }) {
  const collection = getCollection(params.collection);
  if (!collection) notFound();

  return (
    <>
      <Link href={`/admin/${collection.slug}`} className="text-sm text-ink-500 hover:text-ink">
        ← {collection.label}
      </Link>
      <div className="mt-3">
        <PageHeader title={`Ajouter ${collection.singular}`} />
      </div>
      <ItemForm slug={collection.slug} id={null} fields={collection.fields} values={defaultValues(collection)} />
    </>
  );
}
