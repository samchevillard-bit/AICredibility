import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { logoutAction } from '@/lib/actions/auth';
import { prisma } from '@/lib/prisma';
import { getContent } from '@/lib/content';
import AdminNav, { type NavItem } from '@/components/admin/AdminNav';
import Logo from '@/components/site/Logo';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [session, unread, c] = await Promise.all([
    getSession(),
    prisma.lead.count({ where: { read: false } }),
    getContent(),
  ]);

  const items: NavItem[] = [
    { href: '/admin', label: 'Tableau de bord', exact: true },
    { href: '/admin/messages', label: 'Demandes reçues', badge: unread },
    { href: '/admin/textes', label: 'Textes du site', section: 'Contenus' },
    { href: '/admin/avis', label: 'Avis clients' },
    { href: '/admin/expertises', label: 'Expertises' },
    { href: '/admin/methode', label: 'Méthode' },
    { href: '/admin/offres', label: 'Offres' },
    { href: '/admin/faq', label: 'FAQ' },
    { href: '/admin/compte', label: 'Mon compte', section: 'Réglages' },
  ];

  return (
    <div className="lg:flex">
      <aside className="on-dark sticky top-0 z-30 bg-ink text-paper lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col">
        <div className="flex items-center justify-between px-4 py-4 lg:px-5 lg:py-6">
          <Link href="/admin">
            <Logo name={c.brand_name} dark />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40 lg:hidden">Admin</span>
        </div>
        <div className="px-3 pb-3 lg:flex-1 lg:overflow-y-auto lg:pb-6">
          <AdminNav items={items} />
        </div>
        <div className="hidden border-t border-paper/10 p-4 lg:block">
          <p className="truncate px-1 text-xs text-paper/50">{session?.email}</p>
          <div className="mt-3 flex gap-2">
            <Link href="/" target="_blank" className="adm-btn flex-1 border border-paper/15 !py-2 text-paper/80 hover:border-paper/40">
              Voir le site ↗
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="adm-btn border border-paper/15 !py-2 text-paper/80 hover:border-paper/40" title="Déconnexion">
                Quitter
              </button>
            </form>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-5xl">{children}</div>
        <div className="mx-auto mt-12 flex max-w-5xl gap-2 border-t border-ink/10 pt-6 lg:hidden">
          <Link href="/" target="_blank" className="adm-btn-ghost">Voir le site ↗</Link>
          <form action={logoutAction}>
            <button type="submit" className="adm-btn-ghost">Déconnexion</button>
          </form>
        </div>
      </main>
    </div>
  );
}
