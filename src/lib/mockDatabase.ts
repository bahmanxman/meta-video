import { readDatabase, writeDatabase } from './database-storage';
import { initialVideos } from './seed-videos';
import type { VideoAsset } from './types';

export { initialVideos } from './seed-videos';

export const databaseActions = {
  getAll: (): VideoAsset[] => readDatabase(),

  getById: (id: string): VideoAsset | undefined =>
    readDatabase().find((video) => video.id === id),

  insert: (video: VideoAsset): VideoAsset => {
    const database = readDatabase();
    database.push(video);
    writeDatabase(database);
    return video;
  },

  reset: (): void => {
    writeDatabase([...initialVideos]);
  },
};
