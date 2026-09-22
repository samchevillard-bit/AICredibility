// Listes de contenus gérées depuis l'admin (expertises, étapes, offres, FAQ, avis).
// Chaque collection décrit ses champs : l'admin génère la liste, le formulaire
// et la validation à partir de cette description.

export type CollectionFieldType =
  | 'text'
  | 'textarea'
  | 'lines'
  | 'url'
  | 'number'
  | 'rating'
  | 'checkbox'
  | 'select'
  | 'date';

export type CollectionField = {
  name: string;
  label: string;
  type: CollectionFieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  half?: boolean;
  /** Champ traduisible : l'admin affiche aussi une version anglaise (« nomEn »). */
  translatable?: boolean;
};

export function enName(name: string) {
  return `${name}En`;
}

export type CollectionSlug = 'avis' | 'expertises' | 'methode' | 'offres' | 'faq';

export type Collection = {
  slug: CollectionSlug;
  model: 'review' | 'service' | 'step' | 'plan' | 'faqItem';
  label: string;
  singular: string;
  description: string;
  titleField: string;
  subtitleField?: string;
  fields: CollectionField[];
};

export const REVIEW_SOURCES = [
  { value: 'trustpilot', label: 'Trustpilot' },
  { value: 'google', label: 'Google' },
  { value: 'direct', label: 'Témoignage direct' },
];

const published: CollectionField = {
  name: 'published',
  label: 'Visible sur le site',
  type: 'checkbox',
  half: true,
};

export const COLLECTIONS: Collection[] = [
  {
    slug: 'avis',
    model: 'review',
    label: 'Avis clients',
    singular: 'un avis',
    description: 'Avis Trustpilot, Google ou témoignages directs affichés dans la section « Avis clients ».',
    titleField: 'author',
    subtitleField: 'content',
    fields: [
      { name: 'author', label: 'Nom de l’auteur', type: 'text', required: true, half: true },
      { name: 'company', label: 'Entreprise', type: 'text', half: true },
      { name: 'role', label: 'Fonction', type: 'text', half: true, translatable: true },
      { name: 'source', label: 'Source', type: 'select', options: REVIEW_SOURCES, half: true },
      { name: 'rating', label: 'Note', type: 'rating', half: true },
      { name: 'date', label: 'Date de l’avis', type: 'date', half: true },
      { name: 'title', label: 'Titre de l’avis', type: 'text', translatable: true },
      {
        name: 'content',
        label: 'Texte de l’avis',
        type: 'textarea',
        required: true,
        translatable: true,
        help: 'La traduction anglaise est optionnelle : sans elle, le site anglais affiche l’avis original.',
      },
      {
        name: 'url',
        label: 'Lien vers l’avis original',
        type: 'url',
        help: 'Ex. l’URL de l’avis sur Trustpilot. Affiché comme « Voir l’avis ».',
      },
      { name: 'avatarUrl', label: 'Photo (URL)', type: 'url', help: 'Optionnel. Sinon, les initiales sont affichées.' },
      { name: 'featured', label: 'Mettre en avant', type: 'checkbox', half: true },
      published,
    ],
  },
  {
    slug: 'expertises',
    model: 'service',
    label: 'Expertises',
    singular: 'une expertise',
    description: 'Les services présentés dans la section « Ce que nous faisons ».',
    titleField: 'title',
    subtitleField: 'description',
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true, translatable: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true, translatable: true },
      { name: 'bullets', label: 'Points clés', type: 'lines', help: 'Un point par ligne.', translatable: true },
      published,
    ],
  },
  {
    slug: 'methode',
    model: 'step',
    label: 'Méthode',
    singular: 'une étape',
    description: 'Les étapes de la section « La méthode ».',
    titleField: 'title',
    subtitleField: 'description',
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true, translatable: true },
      { name: 'duration', label: 'Durée', type: 'text', placeholder: 'Ex. Semaines 1 à 2', translatable: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true, translatable: true },
      published,
    ],
  },
  {
    slug: 'offres',
    model: 'plan',
    label: 'Offres',
    singular: 'une offre',
    description: 'Les formules et tarifs de la section « Offres ».',
    titleField: 'name',
    subtitleField: 'price',
    fields: [
      { name: 'name', label: 'Nom de la formule', type: 'text', required: true, translatable: true },
      { name: 'tagline', label: 'Accroche', type: 'text', translatable: true },
      { name: 'price', label: 'Prix', type: 'text', required: true, placeholder: 'Ex. 1 490 €', translatable: true },
      { name: 'period', label: 'Période', type: 'text', placeholder: 'Ex. / mois', translatable: true },
      { name: 'features', label: 'Inclus', type: 'lines', help: 'Un avantage par ligne.', translatable: true },
      { name: 'ctaLabel', label: 'Texte du bouton', type: 'text', translatable: true },
      { name: 'highlighted', label: 'Formule recommandée', type: 'checkbox', half: true },
      published,
    ],
  },
  {
    slug: 'faq',
    model: 'faqItem',
    label: 'FAQ',
    singular: 'une question',
    description: 'Questions fréquentes (également publiées en données structurées pour Google et les IA).',
    titleField: 'question',
    subtitleField: 'answer',
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true, translatable: true },
      { name: 'answer', label: 'Réponse', type: 'textarea', required: true, translatable: true },
      published,
    ],
  },
];

export function getCollection(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug);
}
