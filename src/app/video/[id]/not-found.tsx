import Link from 'next/link';

export default function VideoPackageNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
      <div className="max-w-md rounded-xl border border-zinc-800 bg-zinc-900/60 p-8 text-center shadow-lg shadow-black/20">
        <h1 className="text-2xl font-bold text-white">Package not found</h1>
        <p className="mt-2 text-sm text-zinc-400">
          This media package is no longer available in the catalog.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Return to catalog
        </Link>
      </div>
    </div>
  );
}
