'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/actions/guard';

export type AccountState = { ok?: boolean; error?: string };

export async function changePassword(_prev: AccountState, formData: FormData): Promise<AccountState> {
  const session = await requireAdmin();
  const current = String(formData.get('current') || '');
  const next = String(formData.get('next') || '');
  const confirm = String(formData.get('confirm') || '');

  if (next.length < 10) return { error: 'Le nouveau mot de passe doit comporter au moins 10 caractères.' };
  if (next !== confirm) return { error: 'Les deux mots de passe ne correspondent pas.' };

  const user = await prisma.adminUser.findUnique({ where: { id: session.userId } });
  if (!user || !(await bcrypt.compare(current, user.passwordHash))) {
    return { error: 'Mot de passe actuel incorrect.' };
  }
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(next, 12) },
  });
  return { ok: true };
}
