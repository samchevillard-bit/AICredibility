'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/actions/guard';
import { getDictionary, isLocale } from '@/lib/i18n';

export type LeadState = { ok?: boolean; error?: string };

function leadSchema(errors: ReturnType<typeof getDictionary>['form']['errors']) {
  return z.object({
    name: z.string().trim().min(2, errors.name),
    email: z.string().trim().email(errors.email),
    company: z.string().trim().max(120).optional(),
    website: z.string().trim().max(200).optional(),
    message: z.string().trim().min(5, errors.message).max(4000),
  });
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Champ piège invisible : les robots le remplissent, pas les humains.
  if (formData.get('nickname')) return { ok: true };

  const rawLocale = formData.get('locale');
  const locale = isLocale(rawLocale) ? rawLocale : 'fr';
  const errors = getDictionary(locale).form.errors;
  const parsed = leadSchema(errors).safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') || undefined,
    website: formData.get('website') || undefined,
    message: formData.get('message'),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? errors.generic };
  }
  await prisma.lead.create({ data: { ...parsed.data, locale } });
  revalidatePath('/admin', 'layout');
  return { ok: true };
}

export async function setLeadRead(id: string, read: boolean) {
  await requireAdmin();
  await prisma.lead.update({ where: { id }, data: { read } });
  revalidatePath('/admin', 'layout');
}

export async function deleteLead(id: string) {
  await requireAdmin();
  await prisma.lead.delete({ where: { id } });
  revalidatePath('/admin', 'layout');
}
