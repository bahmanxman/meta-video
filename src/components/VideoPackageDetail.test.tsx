import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { VideoPackageDetail } from '@/components/VideoPackageDetail';
import { databaseActions } from '@/lib/mockDatabase';

describe('VideoPackageDetail', () => {
  beforeEach(() => {
    databaseActions.reset();
  });

  function renderSeedVideo() {
    const video = databaseActions.getById('bvb-sge-2026');

    if (!video) {
      throw new Error('Expected seed video to exist');
    }

    render(<VideoPackageDetail video={video} />);

    return video;
  }

  it('renders the package title', () => {
    const video = renderSeedVideo();

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: video.title,
      }),
    ).toBeInTheDocument();
  });

  it('renders the formatted package price', () => {
    renderSeedVideo();

    expect(screen.getByText(/€450/i)).toBeInTheDocument();
  });

  it('renders a thumbnail preview for the package', () => {
    const video = renderSeedVideo();

    const preview = screen.getByLabelText(/package preview/i);
    expect(preview).toHaveAttribute('poster', video.thumbnailUrl);
  });

  it('renders at least one highlight event', () => {
    renderSeedVideo();

    expect(screen.getByText(/GOAL/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Stunning opening volley into the top right corner/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/1 event/i)).toBeInTheDocument();
  });

  it('renders a purchase button', () => {
    renderSeedVideo();

    expect(
      screen.getByRole('button', { name: /purchase package/i }),
    ).toBeInTheDocument();
  });

  it('renders navigation back to the catalog', () => {
    renderSeedVideo();

    expect(
      screen.getByRole('link', { name: /back to catalog/i }),
    ).toHaveAttribute('href', '/');
  });
});
