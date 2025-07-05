'use client';

import React from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { NavigationProvider } from "@/components/navigation-provider";
import HeroLoading from "@/components/hero-loading";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <HeroLoading />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    </NavigationProvider>
  );
}