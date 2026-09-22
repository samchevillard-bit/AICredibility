'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { CONTENT_GROUPS } from '@/lib/content';
import { requireAdmin } from '@/lib/actions/guard';

export type SaveState = { ok?: boolean; error?: string; savedAt?: number };

export async function saveContentGroup(groupId: string, _prev: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdmin();
  const group = CONTENT_GROUPS.find((g) => g.id === groupId);
  if (!group) return { error: 'Section inconnue.' };

  const ops = group.fields.map((field) => {
    const value = String(formData.get(field.key) ?? '').replace(/\r\n/g, '\n').trim();
    // Revenir à la valeur par défaut supprime simplement la surcharge.
    if (value === field.default.trim()) {
      return prisma.setting.deleteMany({ where: { key: field.key } });
    }
    return prisma.setting.upsert({
      where: { key: field.key },
      create: { key: field.key, value },
      update: { value },
    });
  });
  await prisma.$transaction(ops);

  revalidatePath('/', 'layout');
  return { ok: true, savedAt: Date.now() };
}
