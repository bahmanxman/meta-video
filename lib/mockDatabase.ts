import { VideoAsset } from './types';

// Seed data to make sure the catalog isn't empty when you first open it
export const initialVideos: VideoAsset[] = [
  {
    id: 'bvb-sge-2026',
    title: 'Borussia Dortmund vs. Eintracht Frankfurt - Match Highlights',
    matchName: 'Dortmund vs Frankfurt',
    date: '2026-05-24',
    price: 450.00,
    thumbnailUrl: '/thumbnails/match-1.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Reliable public stream asset
    events: [
      {
        id: 'e1',
        timestampSeconds: 42,
        formattedTimecode: '00:00:42',
        type: 'GOAL',
        description: 'Stunning opening volley into the top right corner',
        team: 'Borussia Dortmund'
      }
    ]
  }
];

// Globally accessible memory store simulating our database read/write cycles locally
export let mockDatabase: VideoAsset[] = [...initialVideos];

export const databaseActions = {
  getAll: () => mockDatabase,
  getById: (id: string) => mockDatabase.find(v => v.id === id),
  insert: (video: VideoAsset) => {
    mockDatabase.push(video);
    return video;
  },
  reset: () => {
    mockDatabase = [...initialVideos];
  }
};