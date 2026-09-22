import { prisma } from '@/lib/prisma';

export type FieldType = 'text' | 'textarea' | 'url' | 'email';

export type ContentField = {
  key: string;
  label: string;
  type?: FieldType;
  help?: string;
  default: string;
};

export type ContentGroup = {
  id: string;
  title: string;
  description: string;
  fields: ContentField[];
};

const EMPHASIS_HELP = 'Entourez un mot d’astérisques (*comme ceci*) pour le surligner.';

// Tous les textes modifiables depuis l'admin, avec leur valeur par défaut.
// Ajouter un champ ici le fait apparaître automatiquement dans « Textes du site ».
export const CONTENT_GROUPS: ContentGroup[] = [
  {
    id: 'general',
    title: 'Général',
    description: 'Identité, coordonnées et appel à l’action principal.',
    fields: [
      { key: 'brand_name', label: 'Nom de la marque', default: 'AICredibility' },
      {
        key: 'brand_baseline',
        label: 'Signature',
        default: 'Agence de référencement GEO',
      },
      { key: 'contact_email', label: 'Email de contact', type: 'email', default: 'contact@aicredibility.fr' },
      { key: 'contact_phone', label: 'Téléphone', default: '+33 6 00 00 00 00' },
      { key: 'contact_city', label: 'Ville / zone', default: 'France · 100 % à distance' },
      { key: 'cta_label', label: 'Bouton principal', default: 'Audit GEO offert' },
      {
        key: 'booking_url',
        label: 'Lien de prise de rendez-vous (Calendly…)',
        type: 'url',
        help: 'Laissez vide pour renvoyer vers le formulaire de contact.',
        default: '',
      },
      {
        key: 'engines',
        label: 'Moteurs d’IA affichés dans le bandeau',
        help: 'Séparés par des virgules.',
        default: 'ChatGPT, Perplexity, Gemini, Claude, Copilot, Google AI Overviews, Le Chat, Meta AI',
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
      },
      {
        key: 'meta_description',
        label: 'Meta description',
        type: 'textarea',
        default:
          'Le GEO (Generative Engine Optimization) rend votre marque visible et recommandée dans les réponses des IA génératives. Audit, contenus, citations, suivi : on s’occupe de tout.',
      },
    ],
  },
  {
    id: 'hero',
    title: 'Bandeau d’accueil',
    description: 'Le premier écran du site.',
    fields: [
      { key: 'hero_eyebrow', label: 'Sur-titre', default: 'Generative Engine Optimization' },
      {
        key: 'hero_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Quand vos clients interrogent l’IA, c’est *vous* qu’elle recommande.',
      },
      {
        key: 'hero_subtitle',
        label: 'Sous-titre',
        type: 'textarea',
        default:
          'ChatGPT, Perplexity et Gemini répondent désormais à la place de Google. Nous travaillons votre présence dans ces réponses pour que votre marque soit citée, sourcée et choisie.',
      },
      { key: 'hero_cta_secondary', label: 'Bouton secondaire', default: 'Voir la méthode' },
      {
        key: 'hero_prompt',
        label: 'Question affichée dans la simulation',
        default: 'Quelle agence peut rendre ma marque visible dans les réponses des IA ?',
      },
      {
        key: 'hero_answer',
        label: 'Réponse affichée dans la simulation',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default:
          'Plusieurs spécialistes du GEO existent en France. *AICredibility* revient souvent : l’agence mesure la façon dont les IA perçoivent une marque, puis renforce ses contenus, ses citations et ses données structurées pour qu’elle soit recommandée.',
      },
    ],
  },
  {
    id: 'shift',
    title: 'Le constat',
    description: 'Pourquoi le GEO devient indispensable.',
    fields: [
      { key: 'shift_eyebrow', label: 'Sur-titre', default: 'Le constat' },
      {
        key: 'shift_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Vos clients ne cherchent plus. Ils *demandent*.',
      },
      {
        key: 'shift_text',
        label: 'Texte',
        type: 'textarea',
        default:
          'Hier, dix liens bleus et un clic. Aujourd’hui, une réponse rédigée qui cite deux ou trois marques, et rarement plus. Si la vôtre n’y figure pas, elle n’existe tout simplement pas pour ce client.',
      },
      { key: 'shift_before_title', label: 'Colonne « avant » : titre', default: 'Recherche classique' },
      {
        key: 'shift_before_text',
        label: 'Colonne « avant » : texte',
        type: 'textarea',
        default: 'Dix résultats, des annonces, un internaute qui compare et clique. Être en page 1 suffisait.',
      },
      { key: 'shift_after_title', label: 'Colonne « après » : titre', default: 'Réponse générée par une IA' },
      {
        key: 'shift_after_text',
        label: 'Colonne « après » : texte',
        type: 'textarea',
        default: 'Une seule synthèse, quelques marques citées, des sources en lien. Seules les marques jugées fiables sont retenues.',
      },
    ],
  },
  {
    id: 'services',
    title: 'Expertises',
    description: 'En-tête de la section des services (les services se gèrent dans « Expertises »).',
    fields: [
      { key: 'services_eyebrow', label: 'Sur-titre', default: 'Ce que nous faisons' },
      {
        key: 'services_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Un travail de fond pour devenir la *source* que les IA citent.',
      },
      {
        key: 'services_intro',
        label: 'Introduction',
        type: 'textarea',
        default:
          'Les modèles de langage s’appuient sur ce que le web dit de vous : votre site, la presse, les annuaires, les avis, les données structurées. Nous travaillons chacun de ces signaux.',
      },
    ],
  },
  {
    id: 'method',
    title: 'Méthode',
    description: 'En-tête de la section méthode (les étapes se gèrent dans « Méthode »).',
    fields: [
      { key: 'method_eyebrow', label: 'Sur-titre', default: 'La méthode' },
      {
        key: 'method_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Mesurer, corriger, *amplifier*. Puis recommencer.',
      },
      {
        key: 'method_intro',
        label: 'Introduction',
        type: 'textarea',
        default: 'Une démarche en quatre temps, pilotée par la donnée : on sait à chaque étape où vous êtes cité, et par qui.',
      },
    ],
  },
  {
    id: 'results',
    title: 'Résultats',
    description: 'Chiffres clés et témoignage mis en avant.',
    fields: [
      { key: 'results_eyebrow', label: 'Sur-titre', default: 'Résultats' },
      {
        key: 'results_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Des marques qui sont passées d’*invisibles* à recommandées.',
      },
      { key: 'stat1_value', label: 'Chiffre 1', default: '×3,4' },
      { key: 'stat1_label', label: 'Libellé 1', default: 'citations moyennes dans les réponses IA après 6 mois' },
      { key: 'stat2_value', label: 'Chiffre 2', default: '87 %' },
      { key: 'stat2_label', label: 'Libellé 2', default: 'des requêtes suivies avec une mention de la marque' },
      { key: 'stat3_value', label: 'Chiffre 3', default: '40+' },
      { key: 'stat3_label', label: 'Libellé 3', default: 'marques accompagnées en France et en Europe' },
      { key: 'stat4_value', label: 'Chiffre 4', default: '5 IA' },
      { key: 'stat4_label', label: 'Libellé 4', default: 'suivies chaque mois dans votre tableau de bord' },
      {
        key: 'case_quote',
        label: 'Citation mise en avant',
        type: 'textarea',
        default:
          'En trois mois, Perplexity et ChatGPT ont commencé à nous citer comme référence de notre marché. Nos demandes entrantes mentionnent maintenant « je vous ai trouvés via l’IA ».',
      },
      { key: 'case_author', label: 'Auteur de la citation', default: 'Antoine Roux' },
      { key: 'case_company', label: 'Fonction / entreprise', default: 'Fondateur, Studio Hélio' },
    ],
  },
  {
    id: 'reviews',
    title: 'Avis & Trustpilot',
    description: 'En-tête de la section avis et note Trustpilot (les avis se gèrent dans « Avis clients »).',
    fields: [
      { key: 'reviews_eyebrow', label: 'Sur-titre', default: 'Avis clients' },
      {
        key: 'reviews_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Ils en parlent *mieux* que nous.',
      },
      { key: 'trustpilot_score', label: 'Note Trustpilot', help: 'Ex. 4,9', default: '4,9' },
      { key: 'trustpilot_count', label: 'Nombre d’avis Trustpilot', default: '48' },
      {
        key: 'trustpilot_url',
        label: 'Lien vers votre page Trustpilot',
        type: 'url',
        default: 'https://fr.trustpilot.com/',
      },
      {
        key: 'trustpilot_business_unit_id',
        label: 'Identifiant Trustpilot (Business Unit ID)',
        help: 'Optionnel. Si renseigné, le widget officiel TrustBox s’affiche sous les avis.',
        default: '',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Offres',
    description: 'En-tête de la section tarifs (les formules se gèrent dans « Offres »).',
    fields: [
      { key: 'pricing_eyebrow', label: 'Sur-titre', default: 'Offres' },
      {
        key: 'pricing_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Des formules *claires*, sans engagement caché.',
      },
      {
        key: 'pricing_intro',
        label: 'Introduction',
        type: 'textarea',
        default: 'Commencez par un audit, puis choisissez le rythme d’accompagnement qui correspond à votre marché.',
      },
      {
        key: 'pricing_note',
        label: 'Note sous les offres',
        default: 'Tarifs HT. Devis sur mesure pour les groupes et les marques multi-pays.',
      },
    ],
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'En-tête de la FAQ (les questions se gèrent dans « FAQ »).',
    fields: [
      { key: 'faq_eyebrow', label: 'Sur-titre', default: 'Questions fréquentes' },
      {
        key: 'faq_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Tout ce qu’on nous demande *avant* de commencer.',
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Section finale et formulaire.',
    fields: [
      { key: 'contact_eyebrow', label: 'Sur-titre', default: 'Audit offert' },
      {
        key: 'contact_title',
        label: 'Titre',
        type: 'textarea',
        help: EMPHASIS_HELP,
        default: 'Découvrez ce que les IA disent *vraiment* de vous.',
      },
      {
        key: 'contact_text',
        label: 'Texte',
        type: 'textarea',
        default:
          'Nous interrogeons les principales IA sur vos requêtes stratégiques et vous envoyons un état des lieux : où vous êtes cité, où vos concurrents le sont, et ce qu’il faut corriger en priorité.',
      },
      {
        key: 'contact_success',
        label: 'Message après envoi',
        type: 'textarea',
        default: 'Merci ! Votre demande est bien arrivée. Nous revenons vers vous sous 48 h ouvrées avec votre audit.',
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
        default: 'Agence spécialisée en Generative Engine Optimization : visibilité de marque dans les moteurs de réponse IA.',
      },
      {
        key: 'legal_text',
        label: 'Mentions légales',
        type: 'textarea',
        help: 'Un paragraphe par ligne vide.',
        default:
          'Éditeur du site : AICredibility, [forme juridique], [adresse], SIRET [numéro].\n\nDirecteur de la publication : [nom].\n\nHébergement : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.\n\nDonnées personnelles : les informations transmises via le formulaire de contact servent uniquement à répondre à votre demande. Vous pouvez demander leur suppression à tout moment par email.',
      },
    ],
  },
];

export const CONTENT_FIELDS = CONTENT_GROUPS.flatMap((g) => g.fields);
const DEFAULTS = Object.fromEntries(CONTENT_FIELDS.map((f) => [f.key, f.default]));

export type SiteContent = Record<string, string>;

export async function getContent(): Promise<SiteContent> {
  const rows = await prisma.setting.findMany();
  const overrides = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return { ...DEFAULTS, ...overrides };
}

// Typographie française : espace insécable avant « : ; ? ! » et dans les guillemets,
// pour éviter qu'un signe se retrouve seul en début de ligne.
export function frTypo(text: string) {
  return text.replace(/ ([:;?!»])/g, '\u202f$1').replace(/« /g, '«\u202f');
}

export async function getPublicContent(): Promise<SiteContent> {
  const content = await getContent();
  return Object.fromEntries(
    Object.entries(content).map(([k, v]) => [k, /url|email/.test(k) ? v : frTypo(v)]),
  );
}
