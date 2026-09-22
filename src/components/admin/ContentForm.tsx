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

export default function ContentForm({
  groupId,
  fields,
  values,
}: {
  groupId: string;
  fields: ContentField[];
  values: Record<string, string>;
}) {
  const [state, action] = useFormState<SaveState, FormData>(saveContentGroup.bind(null, groupId), {});

  return (
    <form action={action} className="space-y-6" key={groupId}>
      {fields.map((f) => {
        const modified = values[f.key] !== f.default;
        return (
          <div key={f.key}>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor={f.key} className="adm-label">
                {f.label}
              </label>
              {modified && <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-citron-600">Modifié</span>}
            </div>
            {f.type === 'textarea' ? (
              <textarea
                id={f.key}
                name={f.key}
                defaultValue={values[f.key]}
                rows={Math.min(10, Math.max(3, Math.ceil(values[f.key].length / 80)))}
                className="adm-input resize-y leading-relaxed"
              />
            ) : (
              <input
                id={f.key}
                name={f.key}
                type={f.type === 'email' ? 'email' : f.type === 'url' ? 'url' : 'text'}
                defaultValue={values[f.key]}
                className="adm-input"
              />
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
