import { headers } from 'next/headers';
import { isLocale, type Locale } from '@/lib/i18n';

/** Langue de la requête en cours (déterminée par le middleware à partir de l'URL). */
export function requestLocale(): Locale {
  const value = headers().get('x-locale');
  return isLocale(value) ? value : 'fr';
}

export function requestPathname(): string {
  return headers().get('x-pathname') ?? '/';
}
