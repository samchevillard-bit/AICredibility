'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { CONTENT_GROUPS, defaultValue, storageKey } from '@/lib/content';
import { LOCALES } from '@/lib/i18n';
import { requireAdmin } from '@/lib/actions/guard';

export type SaveState = { ok?: boolean; error?: string; savedAt?: number };

export async function saveContentGroup(groupId: string, _prev: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdmin();
  const group = CONTENT_GROUPS.find((g) => g.id === groupId);
  if (!group) return { error: 'Section inconnue.' };

  const ops = group.fields.flatMap((field) =>
    (field.shared ? (['fr'] as const) : LOCALES).map((locale) => {
      const key = storageKey(field.key, locale);
      const value = String(formData.get(key) ?? '').replace(/\r\n/g, '\n').trim();
      // Revenir à la valeur par défaut supprime simplement la surcharge.
      if (value === defaultValue(field, locale).trim()) {
        return prisma.setting.deleteMany({ where: { key } });
      }
      return prisma.setting.upsert({ where: { key }, create: { key, value }, update: { value } });
    }),
  );
  await prisma.$transaction(ops);

  revalidatePath('/', 'layout');
  return { ok: true, savedAt: Date.now() };
}
