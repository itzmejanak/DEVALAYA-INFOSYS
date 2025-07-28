'use client';

import dynamic from 'next/dynamic';

// Dynamically import the AdsOverlay component to ensure it only runs on client side
const AdsOverlay = dynamic(() => import('./ads-overlay'), {
  ssr: false,
  loading: () => null
});

export default function AdsOverlayWrapper() {
  return <AdsOverlay />;
}