'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCollection, type Collection } from '@/lib/collections';
import { requireAdmin } from '@/lib/actions/guard';

export type ItemFormState = { error?: string };

// Accès générique aux modèles Prisma décrits dans COLLECTIONS.
type Delegate = {
  findMany: (args?: unknown) => Promise<Record<string, unknown>[]>;
  findUnique: (args: unknown) => Promise<Record<string, unknown> | null>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
  aggregate: (args: unknown) => Promise<{ _max: { position: number | null } }>;
};

function delegate(collection: Collection) {
  return (prisma as unknown as Record<string, Delegate>)[collection.model];
}

function parseForm(collection: Collection, formData: FormData) {
  const data: Record<string, unknown> = {};
  for (const field of collection.fields) {
    const raw = formData.get(field.name);
    const str = typeof raw === 'string' ? raw.replace(/\r\n/g, '\n').trim() : '';

    if (field.type === 'checkbox') {
      data[field.name] = raw === 'on';
      continue;
    }
    if (field.required && !str) {
      throw new Error(`Le champ « ${field.label} » est requis.`);
    }
    switch (field.type) {
      case 'number':
      case 'rating': {
        const n = Number(str || 5);
        if (!Number.isFinite(n)) throw new Error(`« ${field.label} » doit être un nombre.`);
        data[field.name] = field.type === 'rating' ? Math.min(5, Math.max(1, Math.round(n))) : n;
        break;
      }
      case 'date':
        data[field.name] = str ? new Date(str) : new Date();
        break;
      case 'url':
        if (str && !/^https?:\/\//i.test(str)) {
          throw new Error(`« ${field.label} » doit commencer par http:// ou https://`);
        }
        data[field.name] = str || null;
        break;
      case 'lines':
        data[field.name] = str
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
          .join('\n');
        break;
      default:
        data[field.name] = str || (field.required ? str : null);
    }
  }
  return data;
}

function revalidateAll(slug: string) {
  revalidatePath('/', 'layout');
  revalidatePath(`/admin/${slug}`);
}

export async function saveItem(
  slug: string,
  id: string | null,
  _prev: ItemFormState,
  formData: FormData,
): Promise<ItemFormState> {
  await requireAdmin();
  const collection = getCollection(slug);
  if (!collection) return { error: 'Collection inconnue.' };

  let data: Record<string, unknown>;
  try {
    data = parseForm(collection, formData);
  } catch (e) {
    return { error: (e as Error).message };
  }

  const model = delegate(collection);
  if (id) {
    await model.update({ where: { id }, data });
  } else {
    const { _max } = await model.aggregate({ _max: { position: true } });
    await model.create({ data: { ...data, position: (_max.position ?? 0) + 1 } });
  }
  revalidateAll(slug);
  redirect(`/admin/${slug}?saved=1`);
}

export async function deleteItem(slug: string, id: string) {
  await requireAdmin();
  const collection = getCollection(slug);
  if (!collection) return;
  await delegate(collection).delete({ where: { id } });
  revalidateAll(slug);
  redirect(`/admin/${slug}`);
}

export async function togglePublished(slug: string, id: string) {
  await requireAdmin();
  const collection = getCollection(slug);
  if (!collection) return;
  const model = delegate(collection);
  const item = await model.findUnique({ where: { id } });
  if (!item) return;
  await model.update({ where: { id }, data: { published: !item.published } });
  revalidateAll(slug);
}

export async function moveItem(slug: string, id: string, direction: 'up' | 'down') {
  await requireAdmin();
  const collection = getCollection(slug);
  if (!collection) return;
  const model = delegate(collection);
  const items = await model.findMany({ orderBy: [{ position: 'asc' }, { createdAt: 'asc' }] });
  const index = items.findIndex((i) => i.id === id);
  const target = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= items.length) return;

  const reordered = [...items];
  [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
  await prisma.$transaction(
    reordered.map((item, position) =>
      model.update({ where: { id: item.id }, data: { position } }) as never,
    ),
  );
  revalidateAll(slug);
}
