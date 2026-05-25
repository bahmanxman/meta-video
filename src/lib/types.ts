export type MatchEventType =
  | 'GOAL'
  | 'YELLOW_CARD'
  | 'RED_CARD'
  | 'SUBSTITUTION'
  | 'HIGHLIGHT';

export interface TimecodeEvent {
  id: string;
  timestampSeconds: number;
  formattedTimecode: string; // Format: HH:MM:SS
  type: MatchEventType;
  description: string;
  team?: string;
}

export interface VideoAsset {
  id: string;
  title: string;
  matchName: string;
  date: string;
  price: number;
  thumbnailUrl: string;
  videoUrl: string; // Will store the local object URL or a public placeholder
  events: TimecodeEvent[];
}
