import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    // Les robots des IA (GPTBot, PerplexityBot, ClaudeBot…) sont les bienvenus : c'est tout l'enjeu du GEO.
    rules: [{ userAgent: '*', allow: '/', disallow: '/admin' }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
