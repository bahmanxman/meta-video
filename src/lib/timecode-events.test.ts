import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createTimecodeEvent,
  isTimecodeEventDraftValid,
  type TimecodeEventDraft,
} from './timecode-events';

describe('isTimecodeEventDraftValid', () => {
  it('returns true for a complete draft', () => {
    const draft: TimecodeEventDraft = {
      type: 'GOAL',
      description: 'Opening goal',
      timestampSeconds: 42,
    };

    expect(isTimecodeEventDraftValid(draft)).toBe(true);
  });

  it('returns false when description is empty or whitespace only', () => {
    expect(
      isTimecodeEventDraftValid({
        type: 'GOAL',
        description: '',
        timestampSeconds: 10,
      }),
    ).toBe(false);

    expect(
      isTimecodeEventDraftValid({
        type: 'GOAL',
        description: '   ',
        timestampSeconds: 10,
      }),
    ).toBe(false);
  });

  it('returns false when timestampSeconds is empty', () => {
    expect(
      isTimecodeEventDraftValid({
        type: 'YELLOW_CARD',
        description: 'Tactical foul',
        timestampSeconds: '',
      }),
    ).toBe(false);
  });
});

describe('createTimecodeEvent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('builds a timecode event with formatted metadata', () => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('event-uuid-123');

    const event = createTimecodeEvent({
      type: 'RED_CARD',
      description: '  Second booking  ',
      timestampSeconds: 3015,
    });

    expect(event).toEqual({
      id: 'event-uuid-123',
      timestampSeconds: 3015,
      formattedTimecode: '00:50:15',
      type: 'RED_CARD',
      description: 'Second booking',
    });
  });
});
