import { AdminEventForm } from '@/src/components/AdminEventForm';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="border-b border-zinc-800 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Content Hub · Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Video logging workspace
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Log match metadata and timecode events before publishing premium
            Bundesliga assets to the partner catalog.
          </p>
        </header>

        <AdminEventForm />
      </main>
    </div>
  );
}
