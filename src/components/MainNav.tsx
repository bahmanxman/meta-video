import Link from 'next/link';

type MainNavProps = {
  isAuthenticated: boolean;
};

const navLinkClassName =
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-950';

export function MainNav({ isAuthenticated }: MainNavProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-zinc-800 bg-zinc-900/80"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-end gap-3 px-6 py-4">
        <Link
          href="/"
          className={`${navLinkClassName} border border-zinc-700 bg-zinc-800 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-700`}
        >
          Home
        </Link>

        {isAuthenticated ? (
          <Link
            href="/admin"
            className={`${navLinkClassName} bg-blue-600 text-white hover:bg-blue-500`}
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className={`${navLinkClassName} bg-blue-600 text-white hover:bg-blue-500`}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
