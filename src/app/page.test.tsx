// src/app/page.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CatalogPage from './page';
import { databaseActions } from '@/lib/mockDatabase';

describe('Public Video Catalog Home Page', () => {
  beforeEach(() => {
    databaseActions.reset(); // Restores initial seed data (Dortmund vs Frankfurt)
  });

  it('should render the list of available video packages from the database', () => {
    render(<CatalogPage />);
    
    // Check that our seed video titles and matches display cleanly
    expect(screen.getByText(/Borussia Dortmund vs. Eintracht Frankfurt/i)).toBeInTheDocument();
    expect(screen.getByText(/€450/i)).toBeInTheDocument();
  });

  it('should filter video packages dynamically based on search input keywords', () => {
    render(<CatalogPage />);
    
    const searchInput = screen.getByPlaceholderText(/search matches/i);
    
    // Type a mismatching keyword
    fireEvent.change(searchInput, { target: { value: 'Bayern' } });
    expect(screen.queryByText(/Borussia Dortmund/i)).not.toBeInTheDocument();

    // Type a correct keyword matching our seed data
    fireEvent.change(searchInput, { target: { value: 'Dortmund' } });
    expect(screen.getByText(/Borussia Dortmund/i)).toBeInTheDocument();
  });
});