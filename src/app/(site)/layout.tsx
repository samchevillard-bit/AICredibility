import { getPublicContent } from '@/lib/content';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export const dynamic = 'force-dynamic';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const c = await getPublicContent();
  const ctaHref = c.booking_url || '/#contact';
  return (
    <div className="grain">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Aller au contenu
      </a>
      <Header brand={c.brand_name} cta={c.cta_label} ctaHref={ctaHref} />
      <main id="main">{children}</main>
      <Footer c={c} />
    </div>
  );
}
