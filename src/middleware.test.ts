// src/middleware.test.ts
import { describe, it, expect, vi } from 'vitest';
import { middleware } from './middleware';
import { NextRequest, NextResponse } from 'next/server';

describe('Admin Route Guard Middleware', () => {
  it('should redirect an unauthenticated request from /admin to /login', async () => {
    // 1. Mock a standard incoming request to the admin portal
    const request = new NextRequest(new URL('http://localhost:3000/admin'));
    
    // 2. Clear out any existing authentication cookies
    request.cookies.delete('admin_session');

    // 3. Execute our middleware handler
    const response = await middleware(request);

    // 4. Assert that the middleware blocks entry and issues a redirect status (307)
    expect(response).toBeDefined();
    expect(response?.status).toBe(307);
    expect(response?.headers.get('location')).toContain('/login');
  });
});