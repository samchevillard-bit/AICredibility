'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { loginAction, type LoginState } from '@/lib/actions/auth';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="adm-btn-primary w-full !py-3">
      {pending ? 'Connexion…' : 'Se connecter'}
    </button>
  );
}

export default function LoginForm({ from }: { from: string }) {
  const [state, formAction] = useFormState<LoginState, FormData>(loginAction, {});

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="from" value={from} />
      <div>
        <label htmlFor="email" className="adm-label">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="adm-input" />
      </div>
      <div>
        <label htmlFor="password" className="adm-label">Mot de passe</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="adm-input" />
      </div>
      {state.error && <p className="text-sm text-red-700" role="alert">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
