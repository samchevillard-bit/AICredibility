import { prisma } from '@/lib/prisma';
import type { Locale } from '@/lib/i18n';

export type FieldType = 'text' | 'textarea' | 'url' | 'email';

export type ContentField = {
  key: string;
  label: string;
  type?: FieldType;
  help?: string;
  /** Valeur par défaut en français. */
  default: string;
  /** Valeur par défaut en anglais. */
  en?: string;
  /** Même valeur dans toutes les langues (email, liens, note…). */
  shared?: boolean;
};

export type ContentGroup = {
  id: string;
  title: string;
  description: string;
  fields: ContentField[];
};

const EMPHASIS_HELP = 'Entourez un mot d’astérisques (*comme ceci*) pour le surligner.';

// Tous les textes modifiables depuis l'admin, avec leurs valeurs par défaut en
// français et en anglais. Ajouter un champ ici le fait apparaître
// automatiquement dans « Textes du site ».
export const CONTENT_GROUPS: ContentGroup[] = [
  {
    id: 'general',
    title: 'Général',
    description: 'Identité, coordonnées et appel à l’action principal.',
    fields: [
      { key: 'brand_name', label: 'Nom de la marque', default: 'AICredibility', shared: true },
      {
        key: 'brand_baseline',
        label: 'Signature',
        default: 'Agence de référencement GEO',
        en: 'Generative Engine Optimization agency',
      },
      { key: 'contact_email', label: 'Email de contact', type: 'email', default: 'contact@aicredibility.fr', shared: true },
      { key: 'contact_phone', label: 'Téléphone', default: '+33 6 00 00 00 00', shared: true },
      { key: 'contact_city', label: 'Ville / zone', default: 'France · 100 % à distance', en: 'France · 100% remote' },
      { key: 'cta_label', label: 'Bouton principal', default: 'Audit GEO offert', en: 'Free GEO audit' },
      {
        key: 'booking_url',
        label: 'Lien de prise de rendez-vous (Calendly…)',
        type: 'url',
        help: 'Laissez vide pour renvoyer vers le formulaire de contact.',
        default: '',
        shared: true,
      },
      {
        key: 'engines',
        label: 'Moteurs d’IA affichés dans le bandeau',
        help: 'Séparés par des virgules.',
        default: 'ChatGPT, Perplexity, Gemini, Claude, Copilot, Google AI Overviews, Le Chat, Meta AI',
        shared: true,
      },
    ],
  },
  {
    id: 'seo',
    title: 'Référencement de la page',
    description: 'Titre et description vus par Google et par les IA.',
    fields: [
      {
        key: 'meta_title',
        label: 'Balise title',
        default: 'AICredibility · Agence GEO : soyez cité par ChatGPT, Perplexity et Gemini',
        en: 'AICredibility · GEO agency: get cited by ChatGPT, Perplexity and Gemini',
      },
      {
        key: 'meta_description',
        label: 'Meta description',
        type: 'textarea',
        default:
          'Le GEO (Generative Engine Optimization) rend votre marque visible et recommandée dans les réponses des IA génératives. Audit, contenus, citations, suivi : on s’occupe de tout.',
        en: 'Generative Engine Optimization (GEO) makes your brand visible and recommended in AI-generated answers. Audit, content, citations, tracking: we handle it all.',
      },
    ],
  },
  {
    id: 'hero',
    title: 'Bandeau d’accueil',
    description: 'Le premier écran du site.',
    fields: [
      {
        key: 'hero_eyebrow',
        label: 'Sur-titre',
        default: 'Generative Engine Optimization',
        en: 'Generative Engine Optimization',
      },
      {
        key: 'hero_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Quand vos clients interrogent l’IA, c’est *vous* qu’elle recommande.',
        en: 'When your customers ask AI, *you* are the one it recommends.',
      },
      {
        key: 'hero_subtitle',
        label: 'Sous-titre',
        type: 'textarea',
        default:
          'ChatGPT, Perplexity et Gemini répondent désormais à la place de Google. Nous travaillons votre présence dans ces réponses pour que votre marque soit citée, sourcée et choisie.',
        en: 'ChatGPT, Perplexity and Gemini now answer in place of Google. We build your presence in those answers so your brand gets cited, sourced and chosen.',
      },
      { key: 'hero_cta_secondary', label: 'Bouton secondaire', default: 'Voir la méthode', en: 'See our method' },
      {
        key: 'hero_prompt',
        label: 'Question affichée dans la simulation',
        default: 'Quelle agence peut rendre ma marque visible dans les réponses des IA ?',
        en: 'Which agency can make my brand visible in AI answers?',
      },
      {
        key: 'hero_answer',
        label: 'Réponse affichée dans la simulation',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default:
          'Plusieurs spécialistes du GEO existent en France. *AICredibility* revient souvent : l’agence mesure la façon dont les IA perçoivent une marque, puis renforce ses contenus, ses citations et ses données structurées pour qu’elle soit recommandée.',
        en: 'Several GEO specialists stand out. *AICredibility* comes up often: the agency measures how AI models perceive a brand, then strengthens its content, citations and structured data so it gets recommended.',
      },
    ],
  },
  {
    id: 'shift',
    title: 'Le constat',
    description: 'Pourquoi le GEO devient indispensable.',
    fields: [
      { key: 'shift_eyebrow', label: 'Sur-titre', default: 'Le constat', en: 'The shift' },
      {
        key: 'shift_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Vos clients ne cherchent plus. Ils *demandent*.',
        en: 'Your customers no longer search. They *ask*.',
      },
      {
        key: 'shift_text',
        label: 'Texte',
        type: 'textarea',
        default:
          'Hier, dix liens bleus et un clic. Aujourd’hui, une réponse rédigée qui cite deux ou trois marques, et rarement plus. Si la vôtre n’y figure pas, elle n’existe tout simplement pas pour ce client.',
        en: 'Yesterday, ten blue links and a click. Today, a written answer that cites two or three brands, rarely more. If yours is not among them, it simply does not exist for that customer.',
      },
      {
        key: 'shift_before_title',
        label: 'Colonne « avant » : titre',
        default: 'Recherche classique',
        en: 'Classic search',
      },
      {
        key: 'shift_before_text',
        label: 'Colonne « avant » : texte',
        type: 'textarea',
        default: 'Dix résultats, des annonces, un internaute qui compare et clique. Être en page 1 suffisait.',
        en: 'Ten results, some ads, a user who compares and clicks. Being on page one was enough.',
      },
      {
        key: 'shift_after_title',
        label: 'Colonne « après » : titre',
        default: 'Réponse générée par une IA',
        en: 'AI-generated answer',
      },
      {
        key: 'shift_after_text',
        label: 'Colonne « après » : texte',
        type: 'textarea',
        default:
          'Une seule synthèse, quelques marques citées, des sources en lien. Seules les marques jugées fiables sont retenues.',
        en: 'One synthesis, a handful of brands, linked sources. Only brands deemed trustworthy make the cut.',
      },
    ],
  },
  {
    id: 'services',
    title: 'Expertises',
    description: 'En-tête de la section des services (les services se gèrent dans « Expertises »).',
    fields: [
      { key: 'services_eyebrow', label: 'Sur-titre', default: 'Ce que nous faisons', en: 'What we do' },
      {
        key: 'services_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Un travail de fond pour devenir la *source* que les IA citent.',
        en: 'In-depth work to become the *source* AI models cite.',
      },
      {
        key: 'services_intro',
        label: 'Introduction',
        type: 'textarea',
        default:
          'Les modèles de langage s’appuient sur ce que le web dit de vous : votre site, la presse, les annuaires, les avis, les données structurées. Nous travaillons chacun de ces signaux.',
        en: 'Language models rely on what the web says about you: your website, the press, directories, reviews, structured data. We work on every one of these signals.',
      },
    ],
  },
  {
    id: 'method',
    title: 'Méthode',
    description: 'En-tête de la section méthode (les étapes se gèrent dans « Méthode »).',
    fields: [
      { key: 'method_eyebrow', label: 'Sur-titre', default: 'La méthode', en: 'Our method' },
      {
        key: 'method_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Mesurer, corriger, *amplifier*. Puis recommencer.',
        en: 'Measure, fix, *amplify*. Then repeat.',
      },
      {
        key: 'method_intro',
        label: 'Introduction',
        type: 'textarea',
        default:
          'Une démarche en quatre temps, pilotée par la donnée : on sait à chaque étape où vous êtes cité, et par qui.',
        en: 'A four-step, data-driven approach: at every stage we know where you are cited, and by whom.',
      },
    ],
  },
  {
    id: 'results',
    title: 'Résultats',
    description: 'Chiffres clés et témoignage mis en avant.',
    fields: [
      { key: 'results_eyebrow', label: 'Sur-titre', default: 'Résultats', en: 'Results' },
      {
        key: 'results_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Des marques qui sont passées d’*invisibles* à recommandées.',
        en: 'Brands that went from *invisible* to recommended.',
      },
      { key: 'stat1_value', label: 'Chiffre 1', default: '×3,4', en: '×3.4' },
      {
        key: 'stat1_label',
        label: 'Libellé 1',
        default: 'citations moyennes dans les réponses IA après 6 mois',
        en: 'average increase in AI citations after 6 months',
      },
      { key: 'stat2_value', label: 'Chiffre 2', default: '87 %', en: '87%' },
      {
        key: 'stat2_label',
        label: 'Libellé 2',
        default: 'des requêtes suivies avec une mention de la marque',
        en: 'of tracked queries mention the brand',
      },
      { key: 'stat3_value', label: 'Chiffre 3', default: '40+', en: '40+' },
      {
        key: 'stat3_label',
        label: 'Libellé 3',
        default: 'marques accompagnées en France et en Europe',
        en: 'brands supported across France and Europe',
      },
      { key: 'stat4_value', label: 'Chiffre 4', default: '5 IA', en: '5 AIs' },
      {
        key: 'stat4_label',
        label: 'Libellé 4',
        default: 'suivies chaque mois dans votre tableau de bord',
        en: 'tracked monthly in your dashboard',
      },
      {
        key: 'case_quote',
        label: 'Citation mise en avant',
        type: 'textarea',
        default:
          'En trois mois, Perplexity et ChatGPT ont commencé à nous citer comme référence de notre marché. Nos demandes entrantes mentionnent maintenant « je vous ai trouvés via l’IA ».',
        en: 'Within three months, Perplexity and ChatGPT started citing us as a reference in our market. Inbound leads now tell us “I found you through AI”.',
      },
      { key: 'case_author', label: 'Auteur de la citation', default: 'Antoine Roux', shared: true },
      {
        key: 'case_company',
        label: 'Fonction / entreprise',
        default: 'Fondateur, Studio Hélio',
        en: 'Founder, Studio Hélio',
      },
    ],
  },
  {
    id: 'reviews',
    title: 'Avis & Trustpilot',
    description: 'En-tête de la section avis et note Trustpilot (les avis se gèrent dans « Avis clients »).',
    fields: [
      { key: 'reviews_eyebrow', label: 'Sur-titre', default: 'Avis clients', en: 'Client reviews' },
      {
        key: 'reviews_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Ils en parlent *mieux* que nous.',
        en: 'They say it *better* than we do.',
      },
      { key: 'trustpilot_score', label: 'Note Trustpilot', help: 'Ex. 4,9', default: '4,9', shared: true },
      { key: 'trustpilot_count', label: 'Nombre d’avis Trustpilot', default: '48', shared: true },
      {
        key: 'trustpilot_url',
        label: 'Lien vers votre page Trustpilot',
        type: 'url',
        default: 'https://fr.trustpilot.com/',
        shared: true,
      },
      {
        key: 'trustpilot_business_unit_id',
        label: 'Identifiant Trustpilot (Business Unit ID)',
        help: 'Optionnel. Si renseigné, le widget officiel TrustBox s’affiche sous les avis.',
        default: '',
        shared: true,
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Offres',
    description: 'En-tête de la section tarifs (les formules se gèrent dans « Offres »).',
    fields: [
      { key: 'pricing_eyebrow', label: 'Sur-titre', default: 'Offres', en: 'Pricing' },
      {
        key: 'pricing_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Des formules *claires*, sans engagement caché.',
        en: '*Clear* plans, no hidden commitment.',
      },
      {
        key: 'pricing_intro',
        label: 'Introduction',
        type: 'textarea',
        default: 'Commencez par un audit, puis choisissez le rythme d’accompagnement qui correspond à votre marché.',
        en: 'Start with an audit, then choose the level of support that fits your market.',
      },
      {
        key: 'pricing_note',
        label: 'Note sous les offres',
        default: 'Tarifs HT. Devis sur mesure pour les groupes et les marques multi-pays.',
        en: 'Prices exclude VAT. Custom quotes for groups and multi-country brands.',
      },
    ],
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'En-tête de la FAQ (les questions se gèrent dans « FAQ »).',
    fields: [
      { key: 'faq_eyebrow', label: 'Sur-titre', default: 'Questions fréquentes', en: 'FAQ' },
      {
        key: 'faq_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Tout ce qu’on nous demande *avant* de commencer.',
        en: 'Everything people ask us *before* getting started.',
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Section finale et formulaire.',
    fields: [
      { key: 'contact_eyebrow', label: 'Sur-titre', default: 'Audit offert', en: 'Free audit' },
      {
        key: 'contact_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Découvrez ce que les IA disent *vraiment* de vous.',
        en: 'Find out what AI *really* says about you.',
      },
      {
        key: 'contact_text',
        label: 'Texte',
        type: 'textarea',
        default:
          'Nous interrogeons les principales IA sur vos requêtes stratégiques et vous envoyons un état des lieux : où vous êtes cité, où vos concurrents le sont, et ce qu’il faut corriger en priorité.',
        en: 'We query the leading AI models on your key searches and send you a clear picture: where you are cited, where your competitors are, and what to fix first.',
      },
      {
        key: 'contact_success',
        label: 'Message après envoi',
        type: 'textarea',
        default: 'Merci ! Votre demande est bien arrivée. Nous revenons vers vous sous 48 h ouvrées avec votre audit.',
        en: 'Thank you! Your request has arrived. We will get back to you with your audit within 2 business days.',
      },
    ],
  },
  {
    id: 'footer',
    title: 'Pied de page & mentions',
    description: 'Texte du pied de page et page des mentions légales.',
    fields: [
      {
        key: 'footer_text',
        label: 'Texte du pied de page',
        type: 'textarea',
        default:
          'Agence spécialisée en Generative Engine Optimization : visibilité de marque dans les moteurs de réponse IA.',
        en: 'An agency specialised in Generative Engine Optimization: brand visibility in AI answer engines.',
      },
      {
        key: 'legal_text',
        label: 'Mentions légales',
        type: 'textarea',
        help: 'Un paragraphe par ligne vide.',
        default:
          'Éditeur du site : AICredibility, [forme juridique], [adresse], SIRET [numéro].\n\nDirecteur de la publication : [nom].\n\nHébergement : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.\n\nDonnées personnelles : les informations transmises via le formulaire de contact servent uniquement à répondre à votre demande. Vous pouvez demander leur suppression à tout moment par email.',
        en: 'Publisher: AICredibility, [legal form], [address], SIRET [number].\n\nPublication director: [name].\n\nHosting: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States.\n\nPersonal data: information sent through the contact form is only used to answer your request. You can ask for it to be deleted at any time by email.',
      },
    ],
  },
];

export const CONTENT_FIELDS = CONTENT_GROUPS.flatMap((g) => g.fields);

export type SiteContent = Record<string, string>;

/** Clé de stockage d'un champ pour une langue (le français garde la clé nue). */
export function storageKey(key: string, locale: Locale) {
  return locale === 'fr' ? key : `${locale}:${key}`;
}

export function defaultValue(field: ContentField, locale: Locale) {
  return locale === 'en' && !field.shared ? field.en ?? field.default : field.default;
}

export async function getContent(locale: Locale = 'fr'): Promise<SiteContent> {
  const rows = await prisma.setting.findMany();
  const stored = new Map(rows.map((r) => [r.key, r.value]));
  return Object.fromEntries(
    CONTENT_FIELDS.map((f) => {
      const key = f.shared ? f.key : storageKey(f.key, locale);
      return [f.key, stored.get(key) ?? defaultValue(f, locale)];
    }),
  );
}

// Typographie française : espace insécable avant « : ; ? ! » et dans les guillemets,
// pour éviter qu'un signe se retrouve seul en début de ligne.
export function frTypo(text: string) {
  return text.replace(/ ([:;?!»])/g, ' $1').replace(/« /g, '« ');
}

export function typo(text: string, locale: Locale) {
  return locale === 'fr' ? frTypo(text) : text;
}

export async function getPublicContent(locale: Locale): Promise<SiteContent> {
  const content = await getContent(locale);
  return Object.fromEntries(
    Object.entries(content).map(([k, v]) => [k, /url|email/.test(k) ? v : typo(v, locale)]),
  );
}
