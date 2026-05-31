import Link from 'next/link';

import type { MatchEventType, VideoAsset } from '@/lib/types';

const EVENT_BADGE_STYLES: Record<MatchEventType, string> = {
  GOAL: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/40',
  YELLOW_CARD: 'bg-yellow-500/20 text-yellow-200 ring-yellow-500/40',
  RED_CARD: 'bg-red-500/20 text-red-300 ring-red-500/40',
  SUBSTITUTION: 'bg-blue-500/20 text-blue-200 ring-blue-500/40',
  HIGHLIGHT: 'bg-violet-500/20 text-violet-200 ring-violet-500/40',
};

function formatPrice(price: number): string {
  return `€${price.toLocaleString('en-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function isStreamableVideoUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

type VideoPackageDetailProps = {
  video: VideoAsset;
};

export function VideoPackageDetail({ video }: VideoPackageDetailProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-blue-400 transition hover:text-blue-300"
        >
          ← Back to catalog
        </Link>

        <header className="mt-6 border-b border-zinc-800 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Media package
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            {video.title}
          </h1>
          <p className="mt-2 text-lg text-zinc-400">{video.matchName}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <span>Published {video.date}</span>
            <span className="text-2xl font-bold text-emerald-400">
              {formatPrice(video.price)}
            </span>
          </div>

          <button
            type="button"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            Purchase package
          </button>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <section className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-lg shadow-black/20">
            <div className="relative aspect-video w-full bg-zinc-800">
              {isStreamableVideoUrl(video.videoUrl) ? (
                <video
                  aria-label="Package preview"
                  controls
                  className="h-full w-full bg-black object-contain"
                  src={video.videoUrl}
                  poster={video.thumbnailUrl || undefined}
                />
              ) : video.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={video.thumbnailUrl}
                  alt="Package preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
                  Preview unavailable
                </div>
              )}
            </div>
            {!isStreamableVideoUrl(video.videoUrl) ? (
              <p className="border-t border-zinc-800 px-5 py-3 text-xs text-zinc-500">
                Full match footage preview is available after licensing this
                package.
              </p>
            ) : null}
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-lg shadow-black/20">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-semibold text-zinc-100">
                Highlight markers
              </h2>
              <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-400">
                {video.events.length}{' '}
                {video.events.length === 1 ? 'event' : 'events'}
              </span>
            </div>

            {video.events.length === 0 ? (
              <p className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950/50 px-4 py-10 text-center text-sm text-zinc-500">
                No timecode events logged for this package yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {video.events.map((event) => (
                  <li
                    key={event.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <span
                        className={`inline-flex rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wide ring-1 ring-inset ${EVENT_BADGE_STYLES[event.type]}`}
                      >
                        {event.type}
                      </span>
                      <span className="font-mono text-xs text-zinc-400">
                        {event.formattedTimecode}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-200">
                      {event.description}
                    </p>
                    {event.team ? (
                      <p className="mt-2 text-xs text-zinc-500">{event.team}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
