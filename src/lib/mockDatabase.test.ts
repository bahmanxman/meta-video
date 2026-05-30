import fs from 'node:fs';
import { beforeEach, describe, expect, it } from 'vitest';

import type { VideoAsset } from './types';
import { databaseActions, initialVideos } from './mockDatabase';

describe('mockDatabase', () => {
  beforeEach(() => {
    databaseActions.reset();
  });

  describe('databaseActions.getAll()', () => {
    it('initializes with seed items', () => {
      const all = databaseActions.getAll();

      expect(all).toHaveLength(initialVideos.length);
      expect(all[0]?.id).toBe('bvb-sge-2026');
      expect(all[0]?.title).toContain('Borussia Dortmund');
    });
  });

  describe('databaseActions.getById()', () => {
    it('returns the matching asset when the id exists', () => {
      const asset = databaseActions.getById('bvb-sge-2026');

      expect(asset).toBeDefined();
      expect(asset?.matchName).toBe('Dortmund vs Frankfurt');
    });

    it('returns undefined when the id does not exist', () => {
      expect(databaseActions.getById('missing-id')).toBeUndefined();
    });
  });

  describe('databaseActions.insert()', () => {
    it('appends the asset to the database and returns the inserted object', () => {
      const newAsset: VideoAsset = {
        id: 'bayern-leipzig-2026',
        title: 'Bayern München vs RB Leipzig - Highlights',
        matchName: 'Bayern vs Leipzig',
        date: '2026-06-01',
        price: 520,
        thumbnailUrl: '/thumbnails/match-2.jpg',
        videoUrl: 'https://example.com/video.mp4',
        events: [],
      };

      const inserted = databaseActions.insert(newAsset);

      expect(inserted).toEqual(newAsset);
      expect(databaseActions.getAll()).toHaveLength(initialVideos.length + 1);
      expect(databaseActions.getById('bayern-leipzig-2026')).toEqual(newAsset);
    });

    it('persists inserted assets to disk', () => {
      databaseActions.insert({
        id: 'persisted-asset',
        title: 'Persisted Match Highlights',
        matchName: 'Persisted vs Disk',
        date: '2026-06-03',
        price: 120,
        thumbnailUrl: '/thumbnails/persisted.jpg',
        videoUrl: 'https://example.com/persisted.mp4',
        events: [],
      });

      const raw = fs.readFileSync(process.env.MOCK_DB_PATH!, 'utf-8');
      expect(raw).toContain('persisted-asset');
    });
  });

  describe('databaseActions.reset()', () => {
    it('clears runtime entries and reverts to the default seed arrays', () => {
      databaseActions.insert({
        id: 'temp-runtime-only',
        title: 'Temporary Runtime Asset',
        matchName: 'Temp vs Runtime',
        date: '2026-06-02',
        price: 99,
        thumbnailUrl: '/thumbnails/temp.jpg',
        videoUrl: 'blob:temp',
        events: [],
      });

      expect(databaseActions.getAll()).toHaveLength(initialVideos.length + 1);

      databaseActions.reset();

      const all = databaseActions.getAll();
      expect(all).toHaveLength(initialVideos.length);
      expect(all.every((video) => video.id !== 'temp-runtime-only')).toBe(true);
      expect(all[0]?.id).toBe(initialVideos[0]?.id);
    });
  });
});
