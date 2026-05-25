import { describe, expect, it } from 'vitest';

import { formatTimecodeFromSeconds } from './timecode';

describe('formatTimecodeFromSeconds', () => {
  it('formats zero seconds as 00:00:00', () => {
    expect(formatTimecodeFromSeconds(0)).toBe('00:00:00');
  });

  it('formats seconds under one minute', () => {
    expect(formatTimecodeFromSeconds(42)).toBe('00:00:42');
  });

  it('formats minutes and seconds', () => {
    expect(formatTimecodeFromSeconds(127)).toBe('00:02:07');
  });

  it('formats one hour exactly', () => {
    expect(formatTimecodeFromSeconds(3600)).toBe('01:00:00');
  });

  it('formats hours, minutes, and seconds together', () => {
    expect(formatTimecodeFromSeconds(3661)).toBe('01:01:01');
  });

  it('pads single-digit units with leading zeros', () => {
    expect(formatTimecodeFromSeconds(61)).toBe('00:01:01');
  });
});
