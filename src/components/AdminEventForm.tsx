'use client';

import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from 'react';

import { createAdminEventFormFieldIds } from './admin-event-form/form-field-ids';
import { EventTypeSelector } from './admin-event-form/EventTypeSelector';
import { NumberField, TextField } from './admin-event-form/FormField';
import { LoggedEventsList } from './admin-event-form/LoggedEventsList';
import {
  cardClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
} from './admin-event-form/styles';
import { useAdminEventForm } from './admin-event-form/useAdminEventForm';
import { VideoFileUpload } from './admin-event-form/VideoFileUpload';

export function AdminEventForm() {
  const formId = useId();
  const ids = createAdminEventFormFieldIds(formId);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const {
    asset,
    eventDraft,
    events,
    updateAsset,
    updateEventDraft,
    addTimecodeEvent,
  } = useAdminEventForm();

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  function applyVideoFile(file: File) {
    setVideoUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return URL.createObjectURL(file);
    });
  }

  function handleVideoInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      applyVideoFile(file);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Catalog persistence will wire here via a server action.
  }

  return (
    <form
      aria-labelledby={ids.headingId}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <h2 id={ids.headingId} className="sr-only">
        Admin Logging Workspace
      </h2>

      <div
        className={`grid gap-6 ${videoUrl ? 'lg:grid-cols-2 lg:items-start' : ''}`}
      >
        {/* Left: upload + live preview */}
        <div className={`${cardClassName} space-y-4`}>
          <VideoFileUpload
            id={ids.videoFileId}
            onChange={handleVideoInputChange}
            onFileSelect={applyVideoFile}
          />

          {videoUrl ? (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Preview
              </p>
              <video
                controls
                className="w-full rounded-lg bg-black"
                src={videoUrl}
              />
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950/50 px-4 py-10 text-center text-sm text-zinc-500">
              Select match footage to preview the stream here.
            </p>
          )}
        </div>

        {/* Right: asset + timecode workspace */}
        <div className="space-y-6">
          <fieldset className={`${cardClassName} space-y-4`}>
            <legend className="mb-1 px-1 text-sm font-semibold uppercase tracking-wider text-blue-400">
              Asset metadata
            </legend>

            <TextField
              id={ids.titleId}
              label="Asset title"
              placeholder="e.g. Der Klassiker — Extended Highlights"
              value={asset.assetTitle}
              onChange={(value) => updateAsset('assetTitle', value)}
            />

            <TextField
              id={ids.matchId}
              label="Match name"
              placeholder="e.g. Bayern München vs Borussia Dortmund"
              value={asset.matchName}
              onChange={(value) => updateAsset('matchName', value)}
            />

            <NumberField
              id={ids.priceId}
              label="Price"
              step={0.01}
              placeholder="0.00"
              value={asset.price}
              onChange={(value) => updateAsset('price', value)}
            />
          </fieldset>

          <fieldset className={`${cardClassName} space-y-4`}>
            <legend className="mb-1 px-1 text-sm font-semibold uppercase tracking-wider text-blue-400">
              Timecode event
            </legend>

            <EventTypeSelector
              id={ids.eventTypeId}
              value={eventDraft.type}
              onChange={(type) => updateEventDraft('type', type)}
            />

            <TextField
              id={ids.descriptionId}
              label="Description"
              placeholder="Describe the match moment for broadcast partners"
              value={eventDraft.description}
              onChange={(value) => updateEventDraft('description', value)}
            />

            <NumberField
              id={ids.timestampId}
              label="Timestamp (seconds)"
              placeholder="0"
              value={eventDraft.timestampSeconds}
              onChange={(value) => updateEventDraft('timestampSeconds', value)}
            />

            <button
              type="button"
              onClick={addTimecodeEvent}
              className={secondaryButtonClassName}
            >
              Add timecode event
            </button>
          </fieldset>

          <button type="submit" className={primaryButtonClassName}>
            Submit asset to catalog
          </button>
        </div>
      </div>

      <LoggedEventsList ids={ids} events={events} />
    </form>
  );
}
