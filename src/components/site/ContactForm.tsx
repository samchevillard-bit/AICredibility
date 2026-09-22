'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitLead, type LeadState } from '@/lib/actions/leads';
import { Arrow, Check } from './Icons';
import { getDictionary, type Dictionary, type Locale } from '@/lib/i18n';

function Submit({ t }: { t: Dictionary }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-citron w-full disabled:opacity-60 sm:w-auto">
      {pending ? t.form.sending : t.form.submit}
      {!pending && <Arrow />}
    </button>
  );
}

export default function ContactForm({ success, locale }: { success: string; locale: Locale }) {
  const t = getDictionary(locale);
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
      <input type="hidden" name="locale" value={locale} />
      <label className="sm:col-span-1">
        <span className="mb-2 block text-sm text-paper/60">{t.form.name} *</span>
        <input name="name" required autoComplete="name" className="field" placeholder={t.form.namePh} />
      </label>
      <label className="sm:col-span-1">
        <span className="mb-2 block text-sm text-paper/60">{t.form.email} *</span>
        <input name="email" type="email" required autoComplete="email" className="field" placeholder={t.form.emailPh} />
      </label>
      <label>
        <span className="mb-2 block text-sm text-paper/60">{t.form.company}</span>
        <input name="company" autoComplete="organization" className="field" placeholder={t.form.companyPh} />
      </label>
      <label>
        <span className="mb-2 block text-sm text-paper/60">{t.form.website}</span>
        <input name="website" autoComplete="url" className="field" placeholder="https://" />
      </label>
      <label className="sm:col-span-2">
        <span className="mb-2 block text-sm text-paper/60">{t.form.message} *</span>
        <textarea
          name="message"
          required
          rows={4}
          className="field resize-none"
          placeholder={t.form.messagePh}
        />
      </label>
      <input type="text" name="nickname" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-paper/45">{t.form.note}</p>
        <Submit t={t} />
      </div>
      {state.error && (
        <p className="text-sm text-[#ffb4a3] sm:col-span-2" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
