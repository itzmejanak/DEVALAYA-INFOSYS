'use client';

import LoadingIndicator from '@/components/loading-indicator';

export default function RootPage() {
  // This page will not be displayed as middleware will redirect to /home
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <LoadingIndicator />
    </div>
  );
}