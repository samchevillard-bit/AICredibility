// Trouve l'adresse de la base Postgres quel que soit le nom donné par Vercel.
// L'intégration Neon peut préfixer les variables (ex. « BASE_DE_DONNÉES_URL »)
// selon la langue ou le préfixe choisi : on cherche donc plusieurs noms.
//
// Utilisation : node scripts/db-env.mjs <commande…>
// La commande est lancée avec DATABASE_URL et DATABASE_URL_UNPOOLED renseignées.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const POOLED = [/^DATABASE_URL$/, /^POSTGRES_PRISMA_URL$/, /^POSTGRES_URL$/, /_DATABASE_URL$/, /_POSTGRES_PRISMA_URL$/, /_POSTGRES_URL$/, /_URL$/];
const DIRECT = [/^DATABASE_URL_UNPOOLED$/, /^POSTGRES_URL_NON_POOLING$/, /_DATABASE_URL_UNPOOLED$/, /_URL_UNPOOLED$/, /_POSTGRES_URL_NON_POOLING$/];

function find(env, patterns) {
  const keys = Object.keys(env).filter((k) => /^postgres(ql)?:\/\//.test(env[k] ?? ''));
  for (const pattern of patterns) {
    const key = keys.find((k) => pattern.test(k));
    if (key) return env[key];
  }
  return undefined;
}

export function resolveDbEnv(env = process.env) {
  const url = find(env, POOLED);
  const direct = find(env, DIRECT) ?? url;
  if (!url) {
    throw new Error(
      'Aucune adresse de base Postgres trouvée. Reliez une base Neon au projet Vercel ' +
        '(onglet Stockage) ou définissez DATABASE_URL.',
    );
  }
  return { DATABASE_URL: url, DATABASE_URL_UNPOOLED: direct };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const command = process.argv.slice(2).join(' ');
  let extra;
  try {
    extra = resolveDbEnv();
  } catch (e) {
    console.error(`\n✖ ${e.message}\n`);
    process.exit(1);
  }
  const result = spawnSync(command, { stdio: 'inherit', shell: true, env: { ...process.env, ...extra } });
  process.exit(result.status ?? 1);
}
