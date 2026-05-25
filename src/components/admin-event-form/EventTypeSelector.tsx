import { MATCH_EVENT_TYPES } from '@/lib/constants';
import type { MatchEventType } from '@/lib/types';

import { FormField } from './FormField';
import { inputClassName } from './styles';

const QUICK_EVENT_TYPES: readonly {
  type: MatchEventType;
  label: string;
  activeClassName: string;
}[] = [
  {
    type: 'GOAL',
    label: 'Goal',
    activeClassName:
      'border-emerald-500/60 bg-emerald-600/20 text-emerald-300 ring-2 ring-emerald-500/50',
  },
  {
    type: 'YELLOW_CARD',
    label: 'Yellow Card',
    activeClassName:
      'border-yellow-500/60 bg-yellow-500/15 text-yellow-200 ring-2 ring-yellow-500/50',
  },
  {
    type: 'RED_CARD',
    label: 'Red Card',
    activeClassName:
      'border-red-500/60 bg-red-600/20 text-red-300 ring-2 ring-red-500/50',
  },
] as const;

type EventTypeSelectorProps = {
  id: string;
  value: MatchEventType;
  onChange: (type: MatchEventType) => void;
};

export function EventTypeSelector({ id, value, onChange }: EventTypeSelectorProps) {
  return (
    <FormField id={id} label="Event type">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as MatchEventType)}
        className={`${inputClassName} sr-only`}
        tabIndex={-1}
        aria-hidden={false}
      >
        {MATCH_EVENT_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
        role="group"
        aria-label="Match event selection"
      >
        {QUICK_EVENT_TYPES.map((option) => {
          const isActive = value === option.type;

          return (
            <button
              key={option.type}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.type)}
              className={`rounded-lg border px-3 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-950 ${
                isActive
                  ? option.activeClassName
                  : 'border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </FormField>
  );
}
