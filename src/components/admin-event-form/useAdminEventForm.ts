'use client';

import { useState } from 'react';

import { MATCH_EVENT_TYPES } from '@/lib/constants';
import {
  createTimecodeEvent,
  isTimecodeEventDraftValid,
  type TimecodeEventDraft,
} from '@/lib/timecode-events';
import type { MatchEventType, TimecodeEvent } from '@/lib/types';

export type AdminAssetDraft = {
  assetTitle: string;
  matchName: string;
  price: number | '';
};

const INITIAL_EVENT_DRAFT: TimecodeEventDraft = {
  type: MATCH_EVENT_TYPES[0],
  description: '',
  timestampSeconds: '',
};

export function useAdminEventForm() {
  const [asset, setAsset] = useState<AdminAssetDraft>({
    assetTitle: '',
    matchName: '',
    price: '',
  });
  const [eventDraft, setEventDraft] =
    useState<TimecodeEventDraft>(INITIAL_EVENT_DRAFT);
  const [events, setEvents] = useState<TimecodeEvent[]>([]);

  function updateAsset<K extends keyof AdminAssetDraft>(
    field: K,
    value: AdminAssetDraft[K],
  ) {
    setAsset((current) => ({ ...current, [field]: value }));
  }

  function updateEventDraft<K extends keyof TimecodeEventDraft>(
    field: K,
    value: TimecodeEventDraft[K],
  ) {
    setEventDraft((current) => ({ ...current, [field]: value }));
  }

  function addTimecodeEvent() {
    if (!isTimecodeEventDraftValid(eventDraft)) {
      return;
    }

    const newEvent = createTimecodeEvent(eventDraft);
    setEvents((current) => [...current, newEvent]);
    setEventDraft((current) => ({
      ...current,
      description: '',
      timestampSeconds: '',
    }));
  }

  return {
    asset,
    eventDraft,
    events,
    updateAsset,
    updateEventDraft,
    addTimecodeEvent,
  };
}
