import { getSiteData } from '@/lib/data';
import { siteUrl } from '@/lib/site';
import Hero from '@/components/site/Hero';
import Marquee from '@/components/site/Marquee';
import Shift from '@/components/site/Shift';
import Services from '@/components/site/Services';
import Method from '@/components/site/Method';
import Results from '@/components/site/Results';
import Reviews from '@/components/site/Reviews';
import Pricing from '@/components/site/Pricing';
import Faq from '@/components/site/Faq';
import Contact from '@/components/site/Contact';

export default async function HomePage() {
  const { content: c, services, steps, plans, faqs, reviews } = await getSiteData();
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
      url: siteUrl,
      email: c.contact_email,
      telephone: c.contact_phone || undefined,
      areaServed: 'FR',
      knowsAbout: ['Generative Engine Optimization', 'GEO', 'SEO', 'ChatGPT', 'Perplexity', 'Google AI Overviews'],
      sameAs: c.trustpilot_url ? [c.trustpilot_url] : undefined,
      aggregateRating:
        ratingValue && ratingCount
          ? { '@type': 'AggregateRating', ratingValue, reviewCount: ratingCount, bestRating: 5 }
          : undefined,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Offres GEO',
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
      <Hero c={c} ctaHref={ctaHref} />
      <Marquee items={engines} />
      <Shift c={c} />
      {services.length > 0 && <Services c={c} services={services} />}
      {steps.length > 0 && <Method c={c} steps={steps} />}
      <Results c={c} />
      {reviews.length > 0 && <Reviews c={c} reviews={reviews} />}
      {plans.length > 0 && <Pricing c={c} plans={plans} ctaHref={ctaHref} />}
      {faqs.length > 0 && <Faq c={c} faqs={faqs} />}
      <Contact c={c} />
    </>
  );
}
