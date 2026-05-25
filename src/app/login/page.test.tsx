// src/app/login/page.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Still handles the custom DOM matchers perfectly
import LoginPage from './page';
import { vi, describe, it, expect } from 'vitest';

// Use Vitest's native mocking engine instead of Jest
vi.mock('react', async (importOriginal) => {
  const original = await importOriginal<typeof import('react')>();
  return {
    ...original,
    useActionState: () => [
      { success: false, errors: { global: ['Invalid credentials'] } }, // Mocked state with an error
      vi.fn(), // Vitest mock function
      false,   // isPending
    ],
  };
});

describe('Admin Login Page UI Layout (Vitest)', () => {
  it('should render the login card with input fields and display errors', () => {
    render(<LoginPage />);
    
    // 1. Verify structural elements exist
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    
    // 2. Verify that our Vitest-mocked validation error renders on the screen
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});