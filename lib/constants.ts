import type { MatchEventType } from './types';

export const MATCH_EVENT_TYPES: readonly MatchEventType[] = [
  'GOAL',
  'YELLOW_CARD',
  'RED_CARD',
  'SUBSTITUTION',
  'HIGHLIGHT',
] as const;
