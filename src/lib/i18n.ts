export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_NAMES: Record<Locale, string> = { fr: 'Français', en: 'English' };

/** Préfixe d'URL d'une langue : '' pour le français, '/en' pour l'anglais. */
export function localePrefix(locale: Locale) {
  return locale === 'fr' ? '' : `/${locale}`;
}

export function legalPath(locale: Locale) {
  return locale === 'fr' ? '/mentions-legales' : '/en/legal-notice';
}

/** Chemin équivalent d'une page dans l'autre langue. */
export function alternatePath(pathname: string, target: Locale) {
  if (pathname === '/mentions-legales' || pathname === '/en/legal-notice') return legalPath(target);
  return localePrefix(target) || '/';
}

// Libellés d'interface fixes (les textes éditoriaux se modifient dans l'admin).
const dictionaries = {
  fr: {
    nav: { services: 'Expertises', method: 'Méthode', reviews: 'Avis', pricing: 'Offres', faq: 'FAQ' },
    skip: 'Aller au contenu',
    home: 'accueil',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    mainNav: 'Navigation principale',
    switchTo: 'Version française',
    simulation: 'Simulation',
    engineTabs: 'Moteur d’IA simulé',
    thinking: 'Réflexion en cours',
    sources: ['Votre site', 'Article de presse', 'Avis clients'],
    onTrustpilot: 'sur Trustpilot',
    reviewsCount: (n: string) => `${n} avis`,
    basedOn: (n: string) => `Basé sur ${n} avis`,
    seeReviews: 'Voir les avis',
    seeReview: 'Voir l’avis',
    before: 'Avant',
    now: 'Maintenant',
    shiftAnswer: (brand: string) => [
      'Pour votre besoin, trois options se démarquent. ',
      brand,
      ' est la plus souvent recommandée pour son expertise, suivie de deux concurrents',
    ],
    recommended: 'Recommandée',
    sourceLabels: { trustpilot: 'Trustpilot', google: 'Google', direct: 'Témoignage' } as Record<string, string>,
    form: {
      name: 'Nom',
      namePh: 'Camille Durand',
      email: 'Email professionnel',
      emailPh: 'camille@entreprise.fr',
      company: 'Entreprise',
      companyPh: 'Nom de l’entreprise',
      website: 'Site web',
      message: 'Votre projet',
      messagePh: 'Votre marché, vos concurrents, les requêtes sur lesquelles vous aimeriez être cité…',
      note: 'Réponse sous 48 h ouvrées. Aucune donnée revendue.',
      submit: 'Recevoir mon audit',
      sending: 'Envoi…',
      errors: {
        name: 'Merci d’indiquer votre nom.',
        email: 'Adresse email invalide.',
        message: 'Dites-nous en un peu plus sur votre projet.',
        generic: 'Formulaire invalide.',
      },
    },
    contactLabels: { email: 'Email', phone: 'Tél.', zone: 'Zone' },
    footerNav: 'Pied de page',
    legal: 'Mentions légales',
    legalEyebrow: 'Informations',
    notFound: { eyebrow: 'Erreur 404', before: 'Même l’IA ne trouve pas ', mark: 'cette page', after: '.', back: 'Revenir à l’accueil' },
  },
  en: {
    nav: { services: 'Services', method: 'Method', reviews: 'Reviews', pricing: 'Pricing', faq: 'FAQ' },
    skip: 'Skip to content',
    home: 'home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    switchTo: 'English version',
    simulation: 'Simulation',
    engineTabs: 'Simulated AI engine',
    thinking: 'Thinking',
    sources: ['Your website', 'Press article', 'Customer reviews'],
    onTrustpilot: 'on Trustpilot',
    reviewsCount: (n: string) => `${n} reviews`,
    basedOn: (n: string) => `Based on ${n} reviews`,
    seeReviews: 'See reviews',
    seeReview: 'See review',
    before: 'Before',
    now: 'Now',
    shiftAnswer: (brand: string) => [
      'For your needs, three options stand out. ',
      brand,
      ' is the most often recommended for its expertise, followed by two competitors',
    ],
    recommended: 'Recommended',
    sourceLabels: { trustpilot: 'Trustpilot', google: 'Google', direct: 'Testimonial' } as Record<string, string>,
    form: {
      name: 'Name',
      namePh: 'Alex Morgan',
      email: 'Work email',
      emailPh: 'alex@company.com',
      company: 'Company',
      companyPh: 'Company name',
      website: 'Website',
      message: 'Your project',
      messagePh: 'Your market, your competitors, the queries you would like to be cited for…',
      note: 'Reply within 2 business days. We never sell your data.',
      submit: 'Get my audit',
      sending: 'Sending…',
      errors: {
        name: 'Please enter your name.',
        email: 'Invalid email address.',
        message: 'Tell us a little more about your project.',
        generic: 'Invalid form.',
      },
    },
    contactLabels: { email: 'Email', phone: 'Phone', zone: 'Area' },
    footerNav: 'Footer',
    legal: 'Legal notice',
    legalEyebrow: 'Information',
    notFound: { eyebrow: 'Error 404', before: 'Even AI can’t find ', mark: 'this page', after: '.', back: 'Back to home' },
  },
};

export type Dictionary = (typeof dictionaries)['fr'];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}
