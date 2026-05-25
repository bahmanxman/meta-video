import { formatTimecodeFromSeconds } from './timecode';
import type { MatchEventType, TimecodeEvent } from './types';

export type TimecodeEventDraft = {
  type: MatchEventType;
  description: string;
  timestampSeconds: number | '';
};

export function isTimecodeEventDraftValid(
  draft: TimecodeEventDraft,
): draft is TimecodeEventDraft & {
  description: string;
  timestampSeconds: number;
} {
  return draft.description.trim() !== '' && draft.timestampSeconds !== '';
}

export function createTimecodeEvent(
  draft: Pick<TimecodeEventDraft, 'type' | 'description' | 'timestampSeconds'> & {
    timestampSeconds: number;
  },
): TimecodeEvent {
  const description = draft.description.trim();

  return {
    id: crypto.randomUUID(),
    timestampSeconds: draft.timestampSeconds,
    formattedTimecode: formatTimecodeFromSeconds(draft.timestampSeconds),
    type: draft.type,
    description,
  };
}
