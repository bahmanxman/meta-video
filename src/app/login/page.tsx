'use client';

import { useActionState } from 'react';

import {
  loginAdmin,
  type LoginFormState,
} from '@/app/actions/auth';

const initialState: LoginFormState = { success: false };

function resolveLoginErrors(
  errors: LoginFormState['errors'] | { global?: string[] },
): string[] {
  if (!errors) {
    return [];
  }

  if (Array.isArray(errors)) {
    return errors;
  }

  if ('global' in errors && Array.isArray(errors.global)) {
    return errors.global;
  }

  return [];
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAdmin,
    initialState,
  );

  const errorMessages = resolveLoginErrors(
    state.errors as LoginFormState['errors'] | { global?: string[] },
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl shadow-black/40">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Content Hub
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Admin sign in
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Access the protected video logging workspace.
          </p>
        </header>

        <form action={formAction} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-400"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Enter username..."
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-400"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter password..."
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>

          {errorMessages.length > 0 ? (
            <div
              role="alert"
              className="rounded-lg border border-red-500/20 bg-red-50/10 p-3 text-sm text-red-500"
            >
              <ul className="space-y-1">
                {errorMessages.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>

          {state.success ? (
            <p className="text-center text-sm font-medium text-emerald-400">
              Signed in successfully.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
