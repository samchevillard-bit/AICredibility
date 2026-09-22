import Link from 'next/link';
import { getDictionary, localePrefix } from '@/lib/i18n';
import { requestLocale } from '@/lib/locale';

export default function NotFound() {
  const locale = requestLocale();
  const t = getDictionary(locale).notFound;
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-6 text-center">
      <div>
        <p className="eyebrow justify-center">{t.eyebrow}</p>
        <h1 className="h-display mt-5 text-6xl">
          {t.before}
          <em className="mark">{t.mark}</em>
          {t.after}
        </h1>
        <Link href={localePrefix(locale) || '/'} className="btn-primary mt-10">
          {t.back}
        </Link>
      </div>
    </main>
  );
}
