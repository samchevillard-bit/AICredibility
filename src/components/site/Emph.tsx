import { Fragment } from 'react';

// Rend « *mot* » en surlignage. Utilisé pour tous les titres éditables.
export default function Emph({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
          <em key={i} className="mark">
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function plain(text: string) {
  return text.replace(/\*([^*]+)\*/g, '$1');
}
