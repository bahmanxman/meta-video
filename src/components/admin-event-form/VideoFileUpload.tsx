import type { ChangeEvent, DragEvent } from 'react';
import { useRef, useState } from 'react';

import { labelClassName } from './styles';

type VideoFileUploadProps = {
  id: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileSelect: (file: File) => void;
};

export function VideoFileUpload({ id, onChange, onFileSelect }: VideoFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }

  return (
    <div>
      <label htmlFor={id} className={labelClassName}>
        Video file
      </label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative mt-1.5 flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-zinc-600 bg-zinc-900/40 hover:border-zinc-500 hover:bg-zinc-900/70'
        }`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="presentation"
        tabIndex={-1}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="video/mp4,video/x-matroska"
          className="sr-only"
          onChange={onChange}
        />

        <p className="text-sm font-medium text-zinc-200">
          Drag and drop match footage here
        </p>
        <p className="mt-1 text-xs text-zinc-500">MP4 or MKV · click to browse</p>
      </div>
    </div>
  );
}
