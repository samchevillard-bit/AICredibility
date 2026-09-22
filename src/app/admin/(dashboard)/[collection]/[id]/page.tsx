import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/collections';
import { getFormValues } from '@/lib/collection-data';
import ItemForm from '@/components/admin/ItemForm';
import PageHeader from '@/components/admin/PageHeader';

export default async function EditItemPage({ params }: { params: { collection: string; id: string } }) {
  const collection = getCollection(params.collection);
  if (!collection) notFound();
  const values = await getFormValues(collection, params.id);
  if (!values) notFound();

  return (
    <>
      <Link href={`/admin/${collection.slug}`} className="text-sm text-ink-500 hover:text-ink">
        ← {collection.label}
      </Link>
      <div className="mt-3">
        <PageHeader title={String(values[collection.titleField] || 'Modifier')} />
      </div>
      <ItemForm slug={collection.slug} id={params.id} fields={collection.fields} values={values} />
    </>
  );
}
