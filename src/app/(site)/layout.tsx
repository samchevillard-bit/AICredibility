import { getPublicContent } from '@/lib/content';
import { alternatePath, getDictionary, localePrefix } from '@/lib/i18n';
import { requestLocale, requestPathname } from '@/lib/locale';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export const dynamic = 'force-dynamic';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const locale = requestLocale();
  const c = await getPublicContent(locale);
  const t = getDictionary(locale);
  const ctaHref = c.booking_url || `${localePrefix(locale) || '/'}#contact`;
  const alternateHref = alternatePath(requestPathname(), locale === 'fr' ? 'en' : 'fr');

  return (
    <div className="grain">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        {t.skip}
      </a>
      <Header brand={c.brand_name} cta={c.cta_label} ctaHref={ctaHref} locale={locale} alternateHref={alternateHref} />
      <main id="main">{children}</main>
      <Footer c={c} locale={locale} />
    </div>
  );
}
