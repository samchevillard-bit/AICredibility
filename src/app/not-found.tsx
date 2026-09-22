import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-6 text-center">
      <div>
        <p className="eyebrow justify-center">Erreur 404</p>
        <h1 className="h-display mt-5 text-6xl">
          Même l’IA ne trouve pas <em className="mark">cette page</em>.
        </h1>
        <Link href="/" className="btn-primary mt-10">
          Revenir à l’accueil
        </Link>
      </div>
    </main>
  );
}
