import fs from 'node:fs';
import path from 'node:path';

import type { VideoAsset } from './types';
import { initialVideos } from './seed-videos';

function getDbPath(): string {
  return (
    process.env.MOCK_DB_PATH ??
    path.join(/* turbopackIgnore: true */ process.cwd(), '.data', 'videos.json')
  );
}

function ensureDbDirectory(): void {
  const directory = path.dirname(getDbPath());

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

export function readDatabase(): VideoAsset[] {
  ensureDbDirectory();
  const dbPath = getDbPath();

  if (!fs.existsSync(dbPath)) {
    writeDatabase([...initialVideos]);
    return [...initialVideos];
  }

  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    const parsed = JSON.parse(raw) as VideoAsset[];

    if (!Array.isArray(parsed)) {
      throw new Error('Invalid database file shape');
    }

    return parsed;
  } catch {
    writeDatabase([...initialVideos]);
    return [...initialVideos];
  }
}

export function writeDatabase(videos: VideoAsset[]): void {
  ensureDbDirectory();
  fs.writeFileSync(getDbPath(), JSON.stringify(videos, null, 2), 'utf-8');
}
