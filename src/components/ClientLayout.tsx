'use client';

import SessionProvider from './SessionProvider';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <main className="overflow-hidden">{children}</main>
    </SessionProvider>
  );
}