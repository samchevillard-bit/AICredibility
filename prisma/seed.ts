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
  },
  {
    title: 'Contenus optimisés GEO',
    description:
      'Des pages pensées pour être comprises, résumées et citées par les modèles : réponses directes, faits vérifiables, structure claire, expertise démontrée.',
    bullets: 'Réécriture des pages clés\nPages réponses et comparatifs\nFAQ et glossaires experts',
  },
  {
    title: 'Autorité & citations',
    description:
      'Les IA recommandent les marques dont le web parle. Nous développons vos mentions dans les médias, annuaires, forums et sources que les modèles consultent.',
    bullets: 'Relations presse digitales\nPrésence sur les sources de référence\nGestion des avis clients',
  },
  {
    title: 'Entités & données structurées',
    description:
      'Schema.org, fiches d’entreprise, Wikidata, llms.txt : nous rendons votre marque lisible sans ambiguïté par les machines.',
    bullets: 'Balisage Schema.org complet\nCohérence des informations de marque\nFichier llms.txt et accès des robots IA',
  },
  {
    title: 'SEO technique & Google',
    description:
      'Le GEO repose sur un socle SEO solide. Vitesse, indexation, maillage : nous sécurisons aussi vos positions sur Google.',
    bullets: 'Audit technique\nOptimisation Core Web Vitals\nSuivi des positions Google',
  },
  {
    title: 'Suivi & reporting mensuel',
    description:
      'Un tableau de bord de vos citations, de votre part de voix et de l’évolution de la perception de votre marque, IA par IA.',
    bullets: 'Rapport mensuel commenté\nAlertes sur les réponses erronées\nPoint stratégique trimestriel',
  },
];

const steps = [
  {
    title: 'Diagnostic',
    duration: 'Semaines 1 à 2',
    description:
      'Nous testons des centaines de requêtes sur les principales IA pour établir votre point de départ : citations, sentiment, sources utilisées, concurrents cités.',
  },
  {
    title: 'Fondations',
    duration: 'Semaines 3 à 6',
    description:
      'Données structurées, cohérence de marque, pages essentielles réécrites : nous corrigeons ce qui empêche les IA de vous comprendre et de vous faire confiance.',
  },
  {
    title: 'Amplification',
    duration: 'Mois 2 à 6',
    description:
      'Contenus experts, mentions dans les sources de référence, avis clients : nous multiplions les signaux qui poussent les modèles à vous recommander.',
  },
  {
    title: 'Pilotage',
    duration: 'En continu',
    description:
      'Chaque mois, nous mesurons l’évolution de votre visibilité IA et ajustons la stratégie selon les nouvelles versions des modèles.',
  },
];

const plans = [
  {
    name: 'Audit',
    tagline: 'Savoir où vous en êtes',
    price: '690 €',
    period: 'une fois',
    features:
      'Audit sur 5 IA génératives\n50 requêtes stratégiques testées\nAnalyse de 3 concurrents\nPlan d’action priorisé\nRestitution en visio',
    ctaLabel: 'Commander l’audit',
    highlighted: false,
  },
  {
    name: 'Croissance',
    tagline: 'Devenir une référence citée',
    price: '1 490 €',
    period: '/ mois',
    features:
      'Audit complet inclus\n4 contenus optimisés GEO par mois\nDonnées structurées et llms.txt\nCampagne de citations et mentions\nTableau de bord mensuel',
    ctaLabel: 'Démarrer',
    highlighted: true,
  },
  {
    name: 'Leader',
    tagline: 'Dominer votre marché',
    price: 'Sur devis',
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
    answer:
      'Le GEO (Generative Engine Optimization) regroupe les techniques qui rendent une marque visible dans les réponses des IA génératives comme ChatGPT, Perplexity, Gemini ou Google AI Overviews. Là où le SEO vise un bon classement dans une liste de liens, le GEO vise à être cité et recommandé dans la réponse elle-même.',
  },
  {
    question: 'Quelle différence avec le SEO classique ?',
    answer:
      'Le SEO reste la base : un site rapide, bien structuré et bien positionné sur Google est plus facilement repris par les IA. Le GEO ajoute un travail sur la clarté des informations, les citations externes, les données structurées et la réputation, car les modèles synthétisent plusieurs sources au lieu de classer des pages.',
  },
  {
    question: 'En combien de temps voit-on des résultats ?',
    answer:
      'Les premières citations apparaissent souvent entre 6 et 12 semaines, notamment sur les IA connectées au web comme Perplexity ou ChatGPT Search. Les effets sur les modèles entraînés sur des données plus anciennes demandent plusieurs mois.',
  },
  {
    question: 'Pouvez-vous garantir que ChatGPT citera ma marque ?',
    answer:
      'Personne ne peut le garantir honnêtement : les réponses des IA varient selon la formulation, l’utilisateur et la version du modèle. Nous nous engageons en revanche sur une méthode, des actions mesurables et un suivi transparent de votre part de voix.',
  },
  {
    question: 'Comment mesurez-vous la visibilité dans les IA ?',
    answer:
      'Nous interrogeons régulièrement chaque IA sur un panel de requêtes représentatives de votre marché, puis nous mesurons la fréquence de citation de votre marque, sa position dans la réponse, le ton employé et les sources citées.',
  },
  {
    question: 'Travaillez-vous avec tous les types d’entreprises ?',
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
