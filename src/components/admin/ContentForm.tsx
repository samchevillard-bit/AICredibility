'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { saveContentGroup, type SaveState } from '@/lib/actions/content';
import type { ContentField } from '@/lib/content';

function Save() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="adm-btn-primary">
      {pending ? 'Enregistrement…' : 'Enregistrer'}
    </button>
  );
}

type Values = { fr: Record<string, string>; en: Record<string, string> };

function Input({ field, name, value }: { field: ContentField; name: string; value: string }) {
  return field.type === 'textarea' ? (
    <textarea
      id={name}
      name={name}
      defaultValue={value}
      rows={Math.min(12, Math.max(3, Math.ceil(value.length / 45) + 1))}
      className="adm-input resize-y leading-relaxed"
    />
  ) : (
    <input
      id={name}
      name={name}
      type={field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'}
      defaultValue={value}
      className="adm-input"
    />
  );
}

function Badge({ lang }: { lang: 'FR' | 'EN' }) {
  return (
    <span className={`rounded px-1.5 py-px font-mono text-[10px] ${lang === 'FR' ? 'bg-ink text-paper' : 'bg-citron text-ink'}`}>
      {lang}
    </span>
  );
}

export default function ContentForm({
  groupId,
  fields,
  values,
  defaults,
}: {
  groupId: string;
  fields: ContentField[];
  values: Values;
  defaults: Values;
}) {
  const [state, action] = useFormState<SaveState, FormData>(saveContentGroup.bind(null, groupId), {});

  return (
    <form action={action} className="space-y-7" key={groupId}>
      {fields.map((f) => {
        const modified =
          values.fr[f.key] !== defaults.fr[f.key] || (!f.shared && values.en[f.key] !== defaults.en[f.key]);
        return (
          <div key={f.key}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="text-[13px] font-semibold text-ink-700">
                {f.label}
                {f.shared && <span className="ml-2 font-normal text-ink-400">(toutes langues)</span>}
              </span>
              {modified && <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-citron-600">Modifié</span>}
            </div>
            {f.shared ? (
              <Input field={f} name={f.key} value={values.fr[f.key]} />
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 flex"><Badge lang="FR" /></span>
                  <Input field={f} name={f.key} value={values.fr[f.key]} />
                </label>
                <label className="block">
                  <span className="mb-1 flex"><Badge lang="EN" /></span>
                  <Input field={f} name={`en:${f.key}`} value={values.en[f.key]} />
                </label>
              </div>
            )}
            {f.help && <p className="adm-help">{f.help}</p>}
          </div>
        );
      })}
      <div className="sticky bottom-0 -mx-6 flex items-center gap-4 border-t border-ink/10 bg-paper-50/95 px-6 py-4 backdrop-blur">
        <Save />
        {state.ok && (
          <span key={state.savedAt} className="animate-rise text-sm text-ink-600" role="status">
            ✓ Enregistré, le site est à jour.
          </span>
        )}
        {state.error && <span className="text-sm text-red-700">{state.error}</span>}
      </div>
    </form>
  );
}
