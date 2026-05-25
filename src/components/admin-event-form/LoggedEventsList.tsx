import type { MatchEventType, TimecodeEvent } from '@/lib/types';

import type { AdminEventFormFieldIds } from './form-field-ids';
import { cardClassName } from './styles';

type LoggedEventsListProps = {
  ids: Pick<AdminEventFormFieldIds, 'eventsListId' | 'eventsHeadingId'>;
  events: TimecodeEvent[];
};

const EVENT_BADGE_STYLES: Record<MatchEventType, string> = {
  GOAL: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/40',
  YELLOW_CARD: 'bg-yellow-500/20 text-yellow-200 ring-yellow-500/40',
  RED_CARD: 'bg-red-500/20 text-red-300 ring-red-500/40',
  SUBSTITUTION: 'bg-blue-500/20 text-blue-200 ring-blue-500/40',
  HIGHLIGHT: 'bg-violet-500/20 text-violet-200 ring-violet-500/40',
};

export function LoggedEventsList({ ids, events }: LoggedEventsListProps) {
  return (
    <section
      aria-labelledby={ids.eventsHeadingId}
      className={`${cardClassName} flex h-full min-h-[320px] flex-col`}
    >
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <h3 id={ids.eventsHeadingId} className="text-lg font-semibold text-zinc-100">
          Logged events
        </h3>
        <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-400">
          {events.length} {events.length === 1 ? 'marker' : 'markers'}
        </span>
      </div>

      <ul
        id={ids.eventsListId}
        aria-label="Logged timecode events"
        className="flex flex-1 flex-col gap-3 overflow-y-auto"
      >
        {events.length === 0 ? (
          <li className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-950/50 px-4 py-10 text-center text-sm text-zinc-500">
            No timecode events logged yet. Add markers from the workspace panel.
          </li>
        ) : (
          events.map((event) => (
            <li
              key={event.id}
              className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span
                  className={`inline-flex rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wide ring-1 ring-inset ${EVENT_BADGE_STYLES[event.type]}`}
                >
                  {event.type}
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  {event.formattedTimecode}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-200">
                {event.description}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Timestamp:{' '}
                <span className="font-mono text-zinc-300">
                  {event.timestampSeconds}
                </span>{' '}
                sec
              </p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
