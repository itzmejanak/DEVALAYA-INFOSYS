'use client';

import { SessionProvider } from 'next-auth/react';
import TawkChat from '@/components/tawk-chat';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      {/* 
        To get your Tawk.to IDs:
        1. Sign up/login at https://www.tawk.to/
        2. Go to Administration > Property Settings
        3. Find your propertyId and widgetId in the widget code
        4. The format is: https://embed.tawk.to/[propertyId]/[widgetId]
      */}
      {/* Always load Tawk.to chat in both development and production */}
      <TawkChat
        propertyId="687b810bb130e11914e89c01"
        widgetId="1j0h7065h"
      />
    </SessionProvider>
  );
}