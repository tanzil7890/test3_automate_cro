'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DottedBackground } from "@/components/DottedBackground";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If authenticated, redirect to dashboard
    if (status === 'authenticated') {
      router.push('/dashboard');
    } 
    // If definitely not authenticated (not in loading state), redirect to login
    else if (status === 'unauthenticated') {
      router.push('/login');
    }
    // If status is 'loading', we'll wait for it to resolve
  }, [status, router]);

  // Show loading state while checking authentication or redirecting
  if (status === 'loading' || status !== 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
          <div className="mt-4 text-center text-white">Loading...</div>
        </div>
      </div>
    );
  }

  // This will briefly show before the redirect happens
  return (
    <div className="relative min-h-screen overflow-hidden">
      <DottedBackground />
      {/* Content will not be visible as we're redirecting */}
    </div>
  );
}

