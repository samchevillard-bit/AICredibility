# AICredibility — site vitrine GEO

Site de présentation de l'offre de référencement GEO (Generative Engine
Optimization) d'AICredibility, avec un espace administrateur pour modifier
tous les textes, les avis clients (Trustpilot, Google…), les expertises, la
méthode, les offres et la FAQ, et consulter les demandes reçues.

## Stack technique

- [Next.js 14](https://nextjs.org/) (App Router, Server Actions), TypeScript, Tailwind CSS
- [Prisma](https://www.prisma.io/) + SQLite en local
- Authentification admin par cookie de session signé (JWT via `jose`), mots de passe hashés avec `bcryptjs`

## Démarrage

```bash
cp .env.example .env        # puis remplacez SESSION_SECRET par une longue chaîne aléatoire
npm install
npx prisma db push          # crée la base
npm run seed                # contenus de démonstration + compte admin
npm run dev
```

Le site est sur http://localhost:3000, l'admin sur http://localhost:3000/admin.

Compte par défaut (défini dans `.env`) : `admin@aicredibility.fr` / `ChangeMoi123!`.
Changez-le depuis **Admin → Mon compte**. Le seed ne réécrit jamais un mot de
passe existant, sauf avec `RESET_ADMIN_PASSWORD=1 npm run seed`.

## Espace administrateur

| Rubrique          | Contenu                                                                    |
| ----------------- | -------------------------------------------------------------------------- |
| Tableau de bord   | Chiffres clés, dernières demandes, liste de vérification avant mise en ligne |
| Demandes reçues   | Messages du formulaire « Audit offert » (lu / non lu, répondre, supprimer) |
| Textes du site    | Tous les titres et paragraphes, section par section                        |
| Avis clients      | Avis Trustpilot / Google / directs : note, lien vers l'avis, mise en avant |
| Expertises, Méthode, Offres, FAQ | Listes éditables, réordonnables, masquables              |
| Mon compte        | Changement du mot de passe                                                 |

Dans les titres, entourez un mot d'astérisques (`*comme ceci*`) pour le surligner.

**Trustpilot** : la note et le nombre d'avis se règlent dans *Textes du site →
Avis & Trustpilot*. Renseignez votre *Business Unit ID* pour afficher en plus le
widget officiel TrustBox.

## GEO intégré au site

- Données structurées Schema.org (`ProfessionalService`, `AggregateRating`, `FAQPage`)
- `/llms.txt` généré automatiquement à partir du contenu
- `robots.txt` ouvert aux robots des IA, `sitemap.xml`

## Mise en production (Vercel)

SQLite n'est pas persistant sur Vercel : pour que les modifications faites dans
l'admin soient conservées, utilisez une base Postgres (Neon, Supabase, Vercel
Postgres…) :

1. Dans `prisma/schema.prisma`, remplacez `provider = "sqlite"` par `provider = "postgresql"`.
2. Sur Vercel, définissez `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD` et `NEXT_PUBLIC_SITE_URL`.
3. La commande `npm run build` crée les tables, ajoute les contenus de démo si
   la base est vide, puis construit le site.

## Structure

```
prisma/                    schéma + contenus de démonstration
src/app/(site)/            page d'accueil et mentions légales
src/app/admin/             espace administrateur
src/app/llms.txt/          résumé du site pour les IA
src/components/site/       sections de la page d'accueil
src/components/admin/      formulaires et navigation admin
src/lib/content.ts         liste des textes éditables et valeurs par défaut
src/lib/collections.ts     description des listes éditables (avis, offres…)
```
