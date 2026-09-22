import { Spark } from './Icons';

export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="border-y border-ink/10 bg-paper-50 py-5" aria-label={`Moteurs suivis : ${items.join(', ')}`}>
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex shrink-0 animate-marquee items-center gap-10 pr-10" aria-hidden>
          {row.map((name, i) => (
            <li key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-[28px] italic text-ink-600">
              {name}
              <Spark className="h-3 w-3 text-citron-600" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
