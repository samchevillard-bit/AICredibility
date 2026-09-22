import type { Metadata } from 'next';
import { getSiteData } from '@/lib/data';
import { getPublicContent } from '@/lib/content';
import { siteUrl } from '@/lib/site';
import { localePrefix, type Locale } from '@/lib/i18n';
import Hero from './Hero';
import Marquee from './Marquee';
import Shift from './Shift';
import Services from './Services';
import Method from './Method';
import Results from './Results';
import Reviews from './Reviews';
import Pricing from './Pricing';
import Faq from './Faq';
import Contact from './Contact';

export async function homeMetadata(locale: Locale): Promise<Metadata> {
  const c = await getPublicContent(locale);
  return {
    title: c.meta_title,
    description: c.meta_description,
    openGraph: {
      title: c.meta_title,
      description: c.meta_description,
      siteName: c.brand_name,
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      type: 'website',
    },
    alternates: {
      canonical: localePrefix(locale) || '/',
      languages: { fr: '/', en: '/en', 'x-default': '/' },
    },
  };
}

export default async function HomePage({ locale }: { locale: Locale }) {
  const { content: c, services, steps, plans, faqs, reviews } = await getSiteData(locale);
  const ctaHref = c.booking_url || '#contact';
  const engines = c.engines.split(',').map((e) => e.trim()).filter(Boolean);

  // Données structurées : un site GEO se doit d'être parfaitement lisible par les machines.
  const ratingValue = parseFloat(c.trustpilot_score.replace(',', '.'));
  const ratingCount = parseInt(c.trustpilot_count.replace(/\D/g, ''), 10);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: c.brand_name,
      description: c.meta_description,
      url: `${siteUrl}${localePrefix(locale)}`,
      inLanguage: locale,
      email: c.contact_email,
      telephone: c.contact_phone || undefined,
      areaServed: locale === 'fr' ? 'FR' : ['FR', 'EU', 'GB', 'US'],
      knowsAbout: ['Generative Engine Optimization', 'GEO', 'SEO', 'ChatGPT', 'Perplexity', 'Google AI Overviews'],
      sameAs: c.trustpilot_url ? [c.trustpilot_url] : undefined,
      aggregateRating:
        ratingValue && ratingCount
          ? { '@type': 'AggregateRating', ratingValue, reviewCount: ratingCount, bestRating: 5 }
          : undefined,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'GEO',
        itemListElement: plans.map((p) => ({
          '@type': 'Offer',
          name: p.name,
          description: p.tagline ?? undefined,
          priceSpecification: p.price,
        })),
      },
    },
    faqs.length > 0 && {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: locale,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ].filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Hero c={c} ctaHref={ctaHref} locale={locale} />
      <Marquee items={engines} />
      <Shift c={c} locale={locale} />
      {services.length > 0 && <Services c={c} services={services} />}
      {steps.length > 0 && <Method c={c} steps={steps} />}
      <Results c={c} />
      {reviews.length > 0 && <Reviews c={c} reviews={reviews} locale={locale} />}
      {plans.length > 0 && <Pricing c={c} plans={plans} ctaHref={ctaHref} locale={locale} />}
      {faqs.length > 0 && <Faq c={c} faqs={faqs} />}
      <Contact c={c} locale={locale} />
    </>
  );
}
