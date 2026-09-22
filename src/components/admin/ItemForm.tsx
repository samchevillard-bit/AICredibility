'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { saveItem, type ItemFormState } from '@/lib/actions/collections';
import { enName, type CollectionField } from '@/lib/collections';

type Values = Record<string, string | number | boolean | null>;

function Save({ isNew }: { isNew: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="adm-btn-primary">
      {pending ? 'Enregistrement…' : isNew ? 'Ajouter' : 'Enregistrer'}
    </button>
  );
}

function RatingInput({ name, initial }: { name: string; initial: number }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="flex items-center gap-1" role="radiogroup">
      <input type="hidden" name={name} value={value} />
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
          onClick={() => setValue(n)}
          className={`grid h-10 w-10 place-items-center rounded-md text-lg transition-colors ${
            n <= value ? 'bg-tp text-white' : 'bg-ink/10 text-white hover:bg-ink/20'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function Field({
  field,
  value,
  lang,
}: {
  field: CollectionField;
  value: Values[string];
  lang?: 'FR' | 'EN';
}) {
  const id = `f-${field.name}`;
  const required = field.required && lang !== 'EN';
  const str = value === null || value === undefined ? '' : String(value);

  if (field.type === 'checkbox') {
    return (
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-ink/15 bg-white px-3.5 py-3">
        <input type="checkbox" name={field.name} defaultChecked={Boolean(value)} className="h-4 w-4 accent-ink" />
        <span className="text-sm font-semibold text-ink-700">{field.label}</span>
      </label>
    );
  }

  let control: React.ReactNode;
  switch (field.type) {
    case 'textarea':
    case 'lines':
      control = (
        <textarea
          id={id}
          name={field.name}
          defaultValue={str}
          required={required}
          rows={field.type === 'lines' ? 5 : 5}
          placeholder={field.placeholder}
          className="adm-input resize-y leading-relaxed"
        />
      );
      break;
    case 'select':
      control = (
        <select id={id} name={field.name} defaultValue={str} className="adm-input">
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
      break;
    case 'rating':
      control = <RatingInput name={field.name} initial={Number(value) || 5} />;
      break;
    default:
      control = (
        <input
          id={id}
          name={field.name}
          type={field.type === 'date' ? 'date' : field.type === 'url' ? 'url' : field.type === 'number' ? 'number' : 'text'}
          defaultValue={str}
          required={required}
          placeholder={field.placeholder}
          className="adm-input"
        />
      );
  }

  return (
    <div>
      <label htmlFor={id} className="adm-label flex items-center gap-2">
        {lang && (
          <span className={`rounded px-1.5 py-px font-mono text-[10px] ${lang === 'FR' ? 'bg-ink text-paper' : 'bg-citron text-ink'}`}>
            {lang}
          </span>
        )}
        {field.label}
        {required && <span className="text-ink-400"> *</span>}
      </label>
      {control}
      {field.help && lang !== 'FR' && <p className="adm-help">{field.help}</p>}
    </div>
  );
}

export default function ItemForm({
  slug,
  id,
  fields,
  values,
}: {
  slug: string;
  id: string | null;
  fields: CollectionField[];
  values: Values;
}) {
  const [state, action] = useFormState<ItemFormState, FormData>(saveItem.bind(null, slug, id), {});

  return (
    <form action={action} className="adm-card bg-paper-50 p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) =>
          f.translatable ? (
            <div key={f.name} className="grid gap-4 rounded-xl border border-ink/10 bg-white/50 p-4 sm:col-span-2 md:grid-cols-2">
              <Field field={f} value={values[f.name]} lang="FR" />
              <Field
                field={{ ...f, name: enName(f.name), placeholder: f.placeholder ? undefined : 'Vide = texte français' }}
                value={values[enName(f.name)]}
                lang="EN"
              />
            </div>
          ) : (
            <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
              <Field field={f} value={values[f.name]} />
            </div>
          ),
        )}
      </div>
      {state.error && (
        <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      )}
      <div className="mt-8 flex gap-2 border-t border-ink/10 pt-5">
        <Save isNew={!id} />
        <Link href={`/admin/${slug}`} className="adm-btn-ghost">
          Annuler
        </Link>
      </div>
    </form>
  );
}
