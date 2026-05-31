import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';

import { MainNav } from '@/components/MainNav';
import {
  ADMIN_SESSION_COOKIE,
  isAdminSessionValid,
} from '@/lib/admin-session';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Meta Video',
  description: 'Meta Video is a platform for tagging and sharing videos.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = await isAdminSessionValid(session);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950">
        <MainNav isAuthenticated={isAuthenticated} />
        {children}
      </body>
    </html>
  );
}
