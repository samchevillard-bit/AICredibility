'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { clearSessionCookie, setSessionCookie } from '@/lib/auth';

export type LoginState = {
  error?: string;
};

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const from = String(formData.get('from') || '/admin');

  if (!email || !password) {
    return { error: 'Merci de renseigner votre email et votre mot de passe.' };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    return { error: 'Identifiants incorrects.' };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: 'Identifiants incorrects.' };
  }

  await setSessionCookie({ userId: user.id, email: user.email, name: user.name });
  redirect(from.startsWith('/admin') ? from : '/admin');
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect('/admin/login');
}
