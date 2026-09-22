'use client';

import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { changePassword, type AccountState } from '@/lib/actions/account';

function Save() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="adm-btn-primary">
      {pending ? 'Enregistrement…' : 'Changer le mot de passe'}
    </button>
  );
}

export default function PasswordForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState<AccountState, FormData>(async (prev, data) => {
    const result = await changePassword(prev, data);
    if (result.ok) ref.current?.reset();
    return result;
  }, {});

  return (
    <form ref={ref} action={action} className="adm-card max-w-lg space-y-5 bg-paper-50 p-6">
      {[
        ['current', 'Mot de passe actuel', 'current-password'],
        ['next', 'Nouveau mot de passe', 'new-password'],
        ['confirm', 'Confirmer le nouveau mot de passe', 'new-password'],
      ].map(([name, label, autoComplete]) => (
        <div key={name}>
          <label htmlFor={name} className="adm-label">{label}</label>
          <input id={name} name={name} type="password" required autoComplete={autoComplete} className="adm-input" />
        </div>
      ))}
      <p className="adm-help">10 caractères minimum.</p>
      {state.error && <p className="text-sm text-red-700" role="alert">{state.error}</p>}
      {state.ok && <p className="text-sm text-ink-700" role="status">✓ Mot de passe modifié.</p>}
      <Save />
    </form>
  );
}
