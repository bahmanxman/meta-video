'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { databaseActions } from '@/lib/mockDatabase';
import type { VideoAsset } from '@/lib/types';

function formatPrice(price: number): string {
  return `€${price.toLocaleString('en-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function filterVideos(videos: VideoAsset[], searchQuery: string): VideoAsset[] {
  const query = searchQuery.trim().toLowerCase();

  if (!query) {
    return videos;
  }

  return videos.filter(
    (video) =>
      video.title.toLowerCase().includes(query) ||
      video.matchName.toLowerCase().includes(query),
  );
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const videos = databaseActions.getAll();

  const filteredVideos = useMemo(
    () => filterVideos(videos, searchQuery),
    [videos, searchQuery],
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Content Hub · Catalog
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Bundesliga media packages
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Browse licensed match highlights and broadcast-ready assets for
              global partners.
            </p>
          </div>

          <div className="w-full max-w-xl">
            <label htmlFor="catalog-search" className="sr-only">
              Search matches
            </label>
            <input
              id="catalog-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search matches..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        {filteredVideos.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-16 text-center text-sm text-zinc-500">
            No packages match your search. Try another club or fixture name.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <li
                key={video.id}
                className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-lg shadow-black/20"
              >
                <div className="relative aspect-video w-full bg-zinc-800">
                  {video.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={video.thumbnailUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-xs font-medium uppercase tracking-wide text-zinc-500">
                      Match thumbnail
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="space-y-1">
                    <h2 className="text-base font-semibold leading-snug text-white">
                      {video.title}
                    </h2>
                    <p className="text-sm text-zinc-400">{video.matchName}</p>
                  </div>

                  <p className="text-lg font-bold text-emerald-400">
                    {formatPrice(video.price)}
                  </p>

                  <Link
                    href={`/video/${video.id}`}
                    className="mt-auto inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
                  >
                    View Package
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
