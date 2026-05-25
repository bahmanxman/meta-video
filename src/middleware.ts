import { type NextRequest, NextResponse } from 'next/server';

import {
  ADMIN_SESSION_COOKIE,
  isAdminSessionValid,
} from '@/lib/admin-session';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!(await isAdminSessionValid(session))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
