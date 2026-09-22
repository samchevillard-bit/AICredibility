import { prisma } from '@/lib/prisma';
import type { Collection } from '@/lib/collections';

type Row = Record<string, unknown> & { id: string; published: boolean };
type Finder = {
  findMany: (args: unknown) => Promise<Row[]>;
  findUnique: (args: unknown) => Promise<Row | null>;
};

function model(collection: Collection) {
  return (prisma as unknown as Record<string, Finder>)[collection.model];
}

export function listItems(collection: Collection) {
  return model(collection).findMany({ orderBy: [{ position: 'asc' }, { createdAt: 'asc' }] });
}

// Valeurs prêtes pour le formulaire (dates au format AAAA-MM-JJ).
export async function getFormValues(collection: Collection, id: string) {
  const item = await model(collection).findUnique({ where: { id } });
  if (!item) return null;
  const values: Record<string, string | number | boolean | null> = {};
  for (const f of collection.fields) {
    const v = item[f.name];
    values[f.name] = v instanceof Date ? v.toISOString().slice(0, 10) : (v as string | number | boolean | null);
  }
  return values;
}

export function defaultValues(collection: Collection) {
  const values: Record<string, string | number | boolean | null> = {};
  for (const f of collection.fields) {
    if (f.name === 'published') values[f.name] = true;
    else if (f.type === 'rating') values[f.name] = 5;
    else if (f.type === 'date') values[f.name] = new Date().toISOString().slice(0, 10);
    else if (f.type === 'select') values[f.name] = f.options?.[0]?.value ?? '';
    else if (f.name === 'ctaLabel') values[f.name] = 'Demander un devis';
    else values[f.name] = f.type === 'checkbox' ? false : '';
  }
  return values;
}
