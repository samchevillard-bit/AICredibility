import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Contenus de démonstration : à remplacer depuis l'admin avant la mise en ligne.
const services = [
  {
    title: 'Audit de visibilité IA',
    description:
      'Nous interrogeons ChatGPT, Perplexity, Gemini, Claude et Google AI Overviews sur vos requêtes clés pour mesurer où vous êtes cité, comment, et face à qui.',
    bullets: 'Cartographie des requêtes stratégiques\nPart de voix face à vos concurrents\nPerception de la marque par chaque IA',
    titleEn: 'AI visibility audit',
    descriptionEn:
      'We query ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews on your key searches to measure where you are cited, how, and against whom.',
    bulletsEn: 'Map of strategic queries\nShare of voice vs. your competitors\nHow each AI perceives your brand',
  },
  {
    title: 'Contenus optimisés GEO',
    description:
      'Des pages pensées pour être comprises, résumées et citées par les modèles : réponses directes, faits vérifiables, structure claire, expertise démontrée.',
    bullets: 'Réécriture des pages clés\nPages réponses et comparatifs\nFAQ et glossaires experts',
    titleEn: 'GEO-optimised content',
    descriptionEn:
      'Pages designed to be understood, summarised and cited by language models: direct answers, verifiable facts, clear structure, proven expertise.',
    bulletsEn: 'Rewriting of key pages\nAnswer pages and comparisons\nExpert FAQs and glossaries',
  },
  {
    title: 'Autorité & citations',
    description:
      'Les IA recommandent les marques dont le web parle. Nous développons vos mentions dans les médias, annuaires, forums et sources que les modèles consultent.',
    bullets: 'Relations presse digitales\nPrésence sur les sources de référence\nGestion des avis clients',
    titleEn: 'Authority & citations',
    descriptionEn:
      'AI recommends the brands the web talks about. We grow your mentions in the media, directories, forums and sources that models consult.',
    bulletsEn: 'Digital PR\nPresence on reference sources\nCustomer review management',
  },
  {
    title: 'Entités & données structurées',
    description:
      'Schema.org, fiches d’entreprise, Wikidata, llms.txt : nous rendons votre marque lisible sans ambiguïté par les machines.',
    bullets: 'Balisage Schema.org complet\nCohérence des informations de marque\nFichier llms.txt et accès des robots IA',
    titleEn: 'Entities & structured data',
    descriptionEn:
      'Schema.org, business listings, Wikidata, llms.txt: we make your brand unambiguously readable by machines.',
    bulletsEn: 'Full Schema.org markup\nConsistent brand information\nllms.txt file and AI crawler access',
  },
  {
    title: 'SEO technique & Google',
    description:
      'Le GEO repose sur un socle SEO solide. Vitesse, indexation, maillage : nous sécurisons aussi vos positions sur Google.',
    bullets: 'Audit technique\nOptimisation Core Web Vitals\nSuivi des positions Google',
    titleEn: 'Technical SEO & Google',
    descriptionEn:
      'GEO rests on solid SEO foundations. Speed, indexing, internal linking: we also secure your Google rankings.',
    bulletsEn: 'Technical audit\nCore Web Vitals optimisation\nGoogle rank tracking',
  },
  {
    title: 'Suivi & reporting mensuel',
    description:
      'Un tableau de bord de vos citations, de votre part de voix et de l’évolution de la perception de votre marque, IA par IA.',
    bullets: 'Rapport mensuel commenté\nAlertes sur les réponses erronées\nPoint stratégique trimestriel',
    titleEn: 'Monthly tracking & reporting',
    descriptionEn:
      'A dashboard of your citations, your share of voice and how perception of your brand evolves, AI by AI.',
    bulletsEn: 'Annotated monthly report\nAlerts on inaccurate answers\nQuarterly strategy review',
  },
];

const steps = [
  {
    title: 'Diagnostic',
    titleEn: 'Diagnosis',
    duration: 'Semaines 1 à 2',
    durationEn: 'Weeks 1–2',
    descriptionEn:
      'We test hundreds of queries on the leading AI models to establish your starting point: citations, sentiment, sources used, competitors cited.',
    description:
      'Nous testons des centaines de requêtes sur les principales IA pour établir votre point de départ : citations, sentiment, sources utilisées, concurrents cités.',
  },
  {
    title: 'Fondations',
    titleEn: 'Foundations',
    duration: 'Semaines 3 à 6',
    durationEn: 'Weeks 3–6',
    descriptionEn:
      'Structured data, brand consistency, key pages rewritten: we fix whatever prevents AI from understanding and trusting you.',
    description:
      'Données structurées, cohérence de marque, pages essentielles réécrites : nous corrigeons ce qui empêche les IA de vous comprendre et de vous faire confiance.',
  },
  {
    title: 'Amplification',
    titleEn: 'Amplification',
    duration: 'Mois 2 à 6',
    durationEn: 'Months 2–6',
    descriptionEn:
      'Expert content, mentions in reference sources, customer reviews: we multiply the signals that lead models to recommend you.',
    description:
      'Contenus experts, mentions dans les sources de référence, avis clients : nous multiplions les signaux qui poussent les modèles à vous recommander.',
  },
  {
    title: 'Pilotage',
    titleEn: 'Steering',
    duration: 'En continu',
    durationEn: 'Ongoing',
    descriptionEn:
      'Every month we measure how your AI visibility evolves and adjust the strategy as new model versions come out.',
    description:
      'Chaque mois, nous mesurons l’évolution de votre visibilité IA et ajustons la stratégie selon les nouvelles versions des modèles.',
  },
];

const plans = [
  {
    name: 'Audit',
    nameEn: 'Audit',
    tagline: 'Savoir où vous en êtes',
    taglineEn: 'Know where you stand',
    price: '690 €',
    priceEn: '€690',
    period: 'une fois',
    periodEn: 'one-off',
    featuresEn: 'Audit across 5 generative AIs\n50 strategic queries tested\nAnalysis of 3 competitors\nPrioritised action plan\nVideo debrief',
    ctaLabelEn: 'Order the audit',
    features:
      'Audit sur 5 IA génératives\n50 requêtes stratégiques testées\nAnalyse de 3 concurrents\nPlan d’action priorisé\nRestitution en visio',
    ctaLabel: 'Commander l’audit',
    highlighted: false,
  },
  {
    name: 'Croissance',
    nameEn: 'Growth',
    tagline: 'Devenir une référence citée',
    taglineEn: 'Become a cited reference',
    price: '1 490 €',
    priceEn: '€1,490',
    period: '/ mois',
    periodEn: '/ month',
    featuresEn: 'Full audit included\n4 GEO-optimised pieces of content per month\nStructured data and llms.txt\nCitation and mention campaign\nMonthly dashboard',
    ctaLabelEn: 'Get started',
    features:
      'Audit complet inclus\n4 contenus optimisés GEO par mois\nDonnées structurées et llms.txt\nCampagne de citations et mentions\nTableau de bord mensuel',
    ctaLabel: 'Démarrer',
    highlighted: true,
  },
  {
    name: 'Leader',
    nameEn: 'Leader',
    tagline: 'Dominer votre marché',
    taglineEn: 'Lead your market',
    price: 'Sur devis',
    priceEn: 'Custom quote',
    featuresEn: 'Everything in Growth\nMulti-market, multilingual strategy\nDigital PR\nDedicated consultant\nWeekly follow-up',
    ctaLabelEn: 'Contact us',
    period: null,
    features:
      'Tout de la formule Croissance\nStratégie multi-marchés et multilingue\nRelations presse digitales\nConsultant dédié\nSuivi hebdomadaire',
    ctaLabel: 'Nous contacter',
    highlighted: false,
  },
];

const faqs = [
  {
    question: 'Qu’est-ce que le GEO ?',
    questionEn: 'What is GEO?',
    answerEn:
      'GEO (Generative Engine Optimization) covers the techniques that make a brand visible in the answers of generative AIs such as ChatGPT, Perplexity, Gemini or Google AI Overviews. Where SEO aims for a good ranking in a list of links, GEO aims to be cited and recommended in the answer itself.',
    answer:
      'Le GEO (Generative Engine Optimization) regroupe les techniques qui rendent une marque visible dans les réponses des IA génératives comme ChatGPT, Perplexity, Gemini ou Google AI Overviews. Là où le SEO vise un bon classement dans une liste de liens, le GEO vise à être cité et recommandé dans la réponse elle-même.',
  },
  {
    question: 'Quelle différence avec le SEO classique ?',
    questionEn: 'How is it different from traditional SEO?',
    answerEn:
      'SEO remains the foundation: a fast, well-structured site that ranks well on Google is more easily picked up by AI. GEO adds work on clear information, external citations, structured data and reputation, because models synthesise several sources instead of ranking pages.',
    answer:
      'Le SEO reste la base : un site rapide, bien structuré et bien positionné sur Google est plus facilement repris par les IA. Le GEO ajoute un travail sur la clarté des informations, les citations externes, les données structurées et la réputation, car les modèles synthétisent plusieurs sources au lieu de classer des pages.',
  },
  {
    question: 'En combien de temps voit-on des résultats ?',
    questionEn: 'How long before we see results?',
    answerEn:
      'The first citations often appear within 6 to 12 weeks, especially on web-connected AIs such as Perplexity or ChatGPT Search. The effect on models trained on older data takes several months.',
    answer:
      'Les premières citations apparaissent souvent entre 6 et 12 semaines, notamment sur les IA connectées au web comme Perplexity ou ChatGPT Search. Les effets sur les modèles entraînés sur des données plus anciennes demandent plusieurs mois.',
  },
  {
    question: 'Pouvez-vous garantir que ChatGPT citera ma marque ?',
    questionEn: 'Can you guarantee ChatGPT will cite my brand?',
    answerEn:
      'Nobody can honestly guarantee it: AI answers vary with wording, user and model version. What we commit to is a method, measurable actions and transparent tracking of your share of voice.',
    answer:
      'Personne ne peut le garantir honnêtement : les réponses des IA varient selon la formulation, l’utilisateur et la version du modèle. Nous nous engageons en revanche sur une méthode, des actions mesurables et un suivi transparent de votre part de voix.',
  },
  {
    question: 'Comment mesurez-vous la visibilité dans les IA ?',
    questionEn: 'How do you measure AI visibility?',
    answerEn:
      'We regularly query each AI on a panel of queries representative of your market, then measure how often your brand is cited, where it appears in the answer, the tone used and the sources cited.',
    answer:
      'Nous interrogeons régulièrement chaque IA sur un panel de requêtes représentatives de votre marché, puis nous mesurons la fréquence de citation de votre marque, sa position dans la réponse, le ton employé et les sources citées.',
  },
  {
    question: 'Travaillez-vous avec tous les types d’entreprises ?',
    questionEn: 'Do you work with all kinds of businesses?',
    answerEn:
      'Yes: freelancers, SMEs, e-commerce, B2B brands and groups. The levers change with your market, but the approach stays the same.',
    answer:
      'Oui : indépendants, PME, e-commerce, marques B2B et groupes. Les leviers changent selon votre marché, mais la démarche reste la même.',
  },
];

const reviews = [
  {
    author: 'Claire Martin',
    company: 'Maison Arlo',
    role: 'Directrice marketing',
    rating: 5,
    title: 'Enfin cités par les IA',
    content:
      'En trois mois, Perplexity et ChatGPT ont commencé à nous citer comme référence de notre marché. L’équipe explique tout clairement et les rapports sont limpides.',
    source: 'trustpilot',
    featured: true,
    daysAgo: 12,
  },
  {
    author: 'Thomas Leroy',
    company: 'Leroy Avocats',
    role: 'Associé',
    rating: 5,
    title: 'Un vrai changement',
    content:
      'Nous étions invisibles dans les réponses de ChatGPT sur notre spécialité. Aujourd’hui, le cabinet est cité sur la plupart de nos requêtes clés.',
    source: 'trustpilot',
    featured: false,
    daysAgo: 27,
  },
  {
    author: 'Sophie Bernard',
    company: 'Atelier Nord',
    role: 'Fondatrice',
    rating: 5,
    title: 'Pédagogie et résultats',
    content:
      'J’avais peur d’un jargon technique, c’est tout le contraire. L’audit initial nous a ouvert les yeux sur ce que les IA disaient de nous.',
    source: 'google',
    featured: false,
    daysAgo: 41,
  },
  {
    author: 'Julien Moreau',
    company: 'Kinetik SaaS',
    role: 'CEO',
    rating: 5,
    title: 'Des leads qualifiés',
    content:
      'Plusieurs prospects nous disent maintenant nous avoir découverts via ChatGPT. Le suivi mensuel permet de voir précisément ce qui progresse.',
    source: 'trustpilot',
    featured: true,
    daysAgo: 56,
  },
  {
    author: 'Nadia Haddad',
    company: 'Clinique Saint-Roch',
    role: 'Responsable communication',
    rating: 4,
    title: 'Sérieux et réactifs',
    content:
      'Un accompagnement sérieux, avec des recommandations concrètes et priorisées. Les premiers effets sont arrivés plus vite que prévu.',
    source: 'trustpilot',
    featured: false,
    daysAgo: 73,
  },
  {
    author: 'Marc Dubois',
    company: 'Dubois Rénovation',
    role: 'Gérant',
    rating: 5,
    title: 'Je recommande',
    content:
      'Notre entreprise ressort désormais quand on demande à l’IA un artisan de confiance dans notre ville. Très bon investissement.',
    source: 'google',
    featured: false,
    daysAgo: 95,
  },
];

async function seedIfEmpty<T>(label: string, count: () => Promise<number>, create: () => Promise<T>) {
  if ((await count()) > 0) {
    console.log(`• ${label} : déjà présents, ignorés`);
    return;
  }
  await create();
  console.log(`• ${label} : créés`);
}

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'admin@aicredibility.fr').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'ChangeMoi123!';
  const existing = await prisma.adminUser.findUnique({ where: { email } });

  if (!existing) {
    await prisma.adminUser.create({
      data: { email, name: 'Administrateur', passwordHash: await bcrypt.hash(password, 12) },
    });
    console.log(`• Compte admin créé : ${email}`);
  } else if (process.env.RESET_ADMIN_PASSWORD === '1') {
    await prisma.adminUser.update({
      where: { email },
      data: { passwordHash: await bcrypt.hash(password, 12) },
    });
    console.log(`• Mot de passe admin réinitialisé : ${email}`);
  }

  await seedIfEmpty('Expertises', () => prisma.service.count(), () =>
    prisma.service.createMany({ data: services.map((s, i) => ({ ...s, position: i })) }),
  );
  await seedIfEmpty('Étapes', () => prisma.step.count(), () =>
    prisma.step.createMany({ data: steps.map((s, i) => ({ ...s, position: i })) }),
  );
  await seedIfEmpty('Offres', () => prisma.plan.count(), () =>
    prisma.plan.createMany({ data: plans.map((p, i) => ({ ...p, position: i })) }),
  );
  await seedIfEmpty('FAQ', () => prisma.faqItem.count(), () =>
    prisma.faqItem.createMany({ data: faqs.map((f, i) => ({ ...f, position: i })) }),
  );
  await seedIfEmpty('Avis', () => prisma.review.count(), () =>
    prisma.review.createMany({
      data: reviews.map(({ daysAgo, ...r }, i) => ({
        ...r,
        position: i,
        date: new Date(Date.now() - daysAgo * 86_400_000),
      })),
    }),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
