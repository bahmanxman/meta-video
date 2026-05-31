import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MainNav } from '@/components/MainNav';

vi.mock('@/app/actions/auth', () => ({
  logoutAdmin: vi.fn(),
}));

describe('MainNav', () => {
  it('renders a home link that navigates to the catalog page', () => {
    render(<MainNav isAuthenticated={false} />);

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renders a login link when the user is not authenticated', () => {
    render(<MainNav isAuthenticated={false} />);

    expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute(
      'href',
      '/login',
    );
    expect(
      screen.queryByRole('link', { name: /dashboard/i }),
    ).not.toBeInTheDocument();
  });

  it('renders a dashboard link when the user is authenticated', () => {
    render(<MainNav isAuthenticated={true} />);

    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute(
      'href',
      '/admin',
    );
    expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
  });

  it('renders a logout button when the user is authenticated', () => {
    render(<MainNav isAuthenticated={true} />);

    expect(
      screen.getByRole('button', { name: /logout/i }),
    ).toBeInTheDocument();
  });

  it('does not render a logout button when the user is not authenticated', () => {
    render(<MainNav isAuthenticated={false} />);

    expect(
      screen.queryByRole('button', { name: /logout/i }),
    ).not.toBeInTheDocument();
  });

  it('renders two links when the user is not authenticated', () => {
    render(<MainNav isAuthenticated={false} />);

    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('renders two links and a logout button when the user is authenticated', () => {
    render(<MainNav isAuthenticated={true} />);

    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: /logout/i }),
    ).toBeInTheDocument();
  });
});
