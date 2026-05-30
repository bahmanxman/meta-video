import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CatalogClient } from '@/components/CatalogClient';
import { databaseActions } from '@/lib/mockDatabase';

describe('Public Video Catalog Home Page', () => {
  beforeEach(() => {
    databaseActions.reset();
  });

  it('should render the list of available video packages from the database', () => {
    render(<CatalogClient videos={databaseActions.getAll()} />);

    expect(
      screen.getByText(/Borussia Dortmund vs. Eintracht Frankfurt/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/€450/i)).toBeInTheDocument();
  });

  it('should filter video packages dynamically based on search input keywords', () => {
    render(<CatalogClient videos={databaseActions.getAll()} />);

    const searchInput = screen.getByPlaceholderText(/search matches/i);

    fireEvent.change(searchInput, { target: { value: 'Bayern' } });
    expect(screen.queryByText(/Borussia Dortmund/i)).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Dortmund' } });
    expect(screen.getByText(/Borussia Dortmund/i)).toBeInTheDocument();
  });
});
