// Même logique que scripts/db-env.mjs, pour l'exécution du site.
const POOLED = [/^DATABASE_URL$/, /^POSTGRES_PRISMA_URL$/, /^POSTGRES_URL$/, /_DATABASE_URL$/, /_POSTGRES_PRISMA_URL$/, /_POSTGRES_URL$/, /_URL$/];

export function databaseUrl(env: NodeJS.ProcessEnv = process.env) {
  const keys = Object.keys(env).filter((k) => /^postgres(ql)?:\/\//.test(env[k] ?? ''));
  for (const pattern of POOLED) {
    const key = keys.find((k) => pattern.test(k));
    if (key) return env[key];
  }
  return undefined;
}
