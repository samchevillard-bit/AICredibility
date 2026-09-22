# AICredibility — site vitrine GEO

Site de présentation de l'offre de référencement GEO (Generative Engine
Optimization) d'AICredibility, en français (`/`) et en anglais (`/en`), avec un
espace administrateur pour modifier tous les textes, les avis clients
(Trustpilot, Google…), les expertises, la méthode, les offres et la FAQ, et
consulter les demandes reçues.

## Stack technique

- [Next.js 14](https://nextjs.org/) (App Router, Server Actions), TypeScript, Tailwind CSS
- [Prisma](https://www.prisma.io/) + PostgreSQL (Neon conseillé)
- Authentification admin par cookie de session signé (JWT via `jose`), mots de passe hashés avec `bcryptjs`

## Démarrage

Il faut une base PostgreSQL : une base locale, ou une branche « dev » gratuite
sur [Neon](https://neon.tech).

```bash
cp .env.example .env        # renseignez DATABASE_URL, DATABASE_URL_UNPOOLED et SESSION_SECRET
npm install
npx prisma migrate deploy   # crée les tables
npm run seed                # contenus de démonstration (FR + EN) + compte admin
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

## Version anglaise

- Le site anglais est sous `/en` (mentions légales : `/en/legal-notice`), avec un
  sélecteur FR/EN dans l'en-tête et les balises `hreflang` pour Google.
- Dans l'admin, chaque texte a une case **FR** et une case **EN** côte à côte.
  Les champs communs (email, liens, note Trustpilot…) n'ont qu'une case.
- Pour les expertises, étapes, offres et FAQ, la liste indique « EN à traduire »
  tant que la version anglaise n'est pas remplie ; le site anglais affiche alors
  le texte français.
- Les avis peuvent être traduits, mais ce n'est pas obligatoire : sans
  traduction, l'avis original est affiché.

**Trustpilot** : la note et le nombre d'avis se règlent dans *Textes du site →
Avis & Trustpilot*. Renseignez votre *Business Unit ID* pour afficher en plus le
widget officiel TrustBox.

## GEO intégré au site

- Données structurées Schema.org (`ProfessionalService`, `AggregateRating`, `FAQPage`)
- `/llms.txt` généré automatiquement à partir du contenu
- `robots.txt` ouvert aux robots des IA, `sitemap.xml`

## Mise en ligne sur Vercel

1. Sur [vercel.com/new](https://vercel.com/new), importez ce dépôt GitHub.
2. Avant de déployer, onglet **Storage** du projet : **Create Database → Neon**
   (offre gratuite) et reliez-la au projet. Vercel ajoute automatiquement
   `DATABASE_URL` et `DATABASE_URL_UNPOOLED`.
3. Dans **Settings → Environment Variables**, ajoutez :
   - `SESSION_SECRET` : une longue chaîne aléatoire (ex. `openssl rand -hex 32`)
   - `ADMIN_EMAIL` et `ADMIN_PASSWORD` : vos identifiants d'administration
   - `NEXT_PUBLIC_SITE_URL` : l'adresse finale du site, ex. `https://aicredibility.fr`
4. Déployez. À chaque déploiement, `npm run build` applique les migrations,
   ajoute les contenus de démo seulement si la base est vide, puis construit le site.
   Les modifications faites dans l'admin sont conservées d'un déploiement à l'autre.

Pour faire évoluer le schéma : modifiez `prisma/schema.prisma` puis
`npx prisma migrate dev --name description-du-changement`.

## Structure

```
prisma/                    schéma + contenus de démonstration
src/app/(site)/            pages françaises ; src/app/(site)/en/ pages anglaises
src/app/admin/             espace administrateur
src/app/llms.txt/          résumé du site pour les IA
src/components/site/       sections de la page d'accueil
src/components/admin/      formulaires et navigation admin
src/lib/content.ts         liste des textes éditables et valeurs par défaut (FR + EN)
src/lib/i18n.ts            libellés fixes de l'interface en FR et EN
src/lib/collections.ts     description des listes éditables (avis, offres…)
```
