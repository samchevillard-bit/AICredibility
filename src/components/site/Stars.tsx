export default function Stars({
  rating,
  size = 16,
  variant = 'trustpilot',
}: {
  rating: number;
  size?: number;
  variant?: 'trustpilot' | 'plain';
}) {
  return (
    <span className="inline-flex gap-[3px]" role="img" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(rating);
        return variant === 'trustpilot' ? (
          <span
            key={i}
            className={`grid place-items-center ${filled ? 'bg-tp' : 'bg-ink/15'}`}
            style={{ width: size, height: size }}
          >
            <Star size={size * 0.72} className="fill-white" />
          </span>
        ) : (
          <Star key={i} size={size} className={filled ? 'fill-ink' : 'fill-ink/15'} />
        );
      })}
    </span>
  );
}

function Star({ size, className }: { size: number; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.7l7.1-.6z" />
    </svg>
  );
}
