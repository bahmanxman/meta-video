import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { VideoPackageDetail } from '@/components/VideoPackageDetail';
import { databaseActions } from '@/lib/mockDatabase';

describe('VideoPackageDetail', () => {
  beforeEach(() => {
    databaseActions.reset();
  });

  it('renders package metadata and highlight markers from the database', () => {
    const video = databaseActions.getById('bvb-sge-2026');

    if (!video) {
      throw new Error('Expected seed video to exist');
    }

    render(<VideoPackageDetail video={video} />);

    expect(
      screen.getByRole('heading', {
        name: /Borussia Dortmund vs. Eintracht Frankfurt/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Dortmund vs Frankfurt/i)).toBeInTheDocument();
    expect(screen.getByText(/€450/i)).toBeInTheDocument();
    expect(screen.getByText(/GOAL/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /back to catalog/i }),
    ).toHaveAttribute('href', '/');
  });
});
