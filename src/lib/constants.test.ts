import { describe, expect, it } from 'vitest';

import { MATCH_EVENT_TYPES } from './constants';
import type { MatchEventType } from './types';

describe('MATCH_EVENT_TYPES', () => {
  it('includes every supported match event type', () => {
    const expected: MatchEventType[] = [
      'GOAL',
      'YELLOW_CARD',
      'RED_CARD',
      'SUBSTITUTION',
      'HIGHLIGHT',
    ];

    expect(MATCH_EVENT_TYPES).toEqual(expected);
  });

  it('exposes a readonly list with five entries', () => {
    expect(MATCH_EVENT_TYPES).toHaveLength(5);
  });
});
