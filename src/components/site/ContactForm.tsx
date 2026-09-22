'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitLead, type LeadState } from '@/lib/actions/leads';
import { Arrow, Check } from './Icons';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-citron w-full disabled:opacity-60 sm:w-auto">
      {pending ? 'Envoi…' : 'Recevoir mon audit'}
      {!pending && <Arrow />}
    </button>
  );
}

export default function ContactForm({ success }: { success: string }) {
  const [state, action] = useFormState<LeadState, FormData>(submitLead, {});

  if (state.ok) {
    return (
      <div className="flex min-h-[340px] flex-col items-start justify-center rounded-3xl border border-paper/15 p-8" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-citron text-ink">
          <Check />
        </span>
        <p className="mt-6 font-display text-3xl leading-tight">{success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2" noValidate>
      <label className="sm:col-span-1">
        <span className="mb-2 block text-sm text-paper/60">Nom *</span>
        <input name="name" required autoComplete="name" className="field" placeholder="Camille Durand" />
      </label>
      <label className="sm:col-span-1">
        <span className="mb-2 block text-sm text-paper/60">Email professionnel *</span>
        <input name="email" type="email" required autoComplete="email" className="field" placeholder="camille@entreprise.fr" />
      </label>
      <label>
        <span className="mb-2 block text-sm text-paper/60">Entreprise</span>
        <input name="company" autoComplete="organization" className="field" placeholder="Nom de l’entreprise" />
      </label>
      <label>
        <span className="mb-2 block text-sm text-paper/60">Site web</span>
        <input name="website" autoComplete="url" className="field" placeholder="https://" />
      </label>
      <label className="sm:col-span-2">
        <span className="mb-2 block text-sm text-paper/60">Votre projet *</span>
        <textarea
          name="message"
          required
          rows={4}
          className="field resize-none"
          placeholder="Votre marché, vos concurrents, les requêtes sur lesquelles vous aimeriez être cité…"
        />
      </label>
      <input type="text" name="nickname" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-paper/45">Réponse sous 48 h ouvrées. Aucune donnée revendue.</p>
        <Submit />
      </div>
      {state.error && (
        <p className="text-sm text-[#ffb4a3] sm:col-span-2" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
