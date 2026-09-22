export default function Logo({ name, dark = false }: { name: string; dark?: boolean }) {
  // « AICredibility » → pastille « AI » + reste du nom en serif.
  const hasAi = /^ai/i.test(name);
  const rest = hasAi ? name.slice(2) : name;
  return (
    <span className={`inline-flex items-center gap-1.5 ${dark ? 'text-paper' : 'text-ink'}`}>
      {hasAi && (
        <span className="rounded-md bg-citron px-1.5 py-0.5 font-mono text-[13px] font-medium leading-none text-ink">
          AI
        </span>
      )}
      <span className="font-display text-[26px] italic leading-none tracking-tight">{rest}</span>
    </span>
  );
}
