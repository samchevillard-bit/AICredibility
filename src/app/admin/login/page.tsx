import LoginForm from '@/components/admin/LoginForm';
import Logo from '@/components/site/Logo';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage({ searchParams }: { searchParams: { from?: string } }) {
  const c = await getContent();
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="on-dark relative hidden flex-col justify-between overflow-hidden bg-ink p-12 text-paper lg:flex">
        <Logo name={c.brand_name} dark />
        <p className="h-display max-w-md text-6xl">
          Votre site, <em className="mark">vos mots</em>.
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/40">Espace administrateur</p>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(217,242,107,0.25),transparent)]" />
      </div>
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Logo name={c.brand_name} />
          </div>
          <h1 className="mt-8 font-display text-4xl lg:mt-0">Connexion</h1>
          <p className="mt-2 text-ink-500">Accédez à la gestion des textes, avis et offres.</p>
          <div className="mt-8">
            <LoginForm from={searchParams.from || '/admin'} />
          </div>
        </div>
      </div>
    </div>
  );
}
