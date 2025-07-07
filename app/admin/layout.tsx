'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { LogOut, FileText, Briefcase, Home, Users, Code } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip authentication check on login page
    if (pathname === '/admin/login') {
      setIsLoading(false);
      return;
    }

    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [status, router, pathname]);

  // If on login page or loading, just render children
  if (pathname === '/admin/login' || isLoading) {
    return <>{children}</>;
  }

  // If not authenticated and not on login page, don't render anything (will redirect)
  if (status !== 'authenticated' && pathname !== '/admin/login') {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background dark:bg-background">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[hsl(var(--sidebar-background))] border-b border-[hsl(var(--sidebar-border))] sticky top-0 z-10">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-[hsl(var(--accent))] font-bold text-lg">D</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] bg-clip-text text-transparent">Admin</span>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-1" 
          aria-label="Toggle sidebar"
          onClick={() => {
            const sidebar = document.getElementById('mobile-sidebar');
            const backdrop = document.getElementById('sidebar-backdrop');
            if (sidebar) {
              sidebar.classList.toggle('translate-x-0');
              sidebar.classList.toggle('-translate-x-full');
            }
            if (backdrop) {
              backdrop.classList.toggle('hidden');
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </Button>
      </div>
      
      {/* Sidebar */}
      <div id="mobile-sidebar" className="fixed md:static inset-y-0 left-0 -translate-x-full md:translate-x-0 z-20 w-64 md:w-72 bg-[hsl(var(--sidebar-background))] dark:bg-[hsl(var(--sidebar-background))] shadow-lg border-r border-[hsl(var(--sidebar-border))] dark:border-[hsl(var(--sidebar-border))] transition-all duration-300 overflow-y-auto">
        <div className="p-4 md:p-6 hidden md:block">
          <Link href="/admin/dashboard" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-[hsl(var(--primary))] dark:bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="text-[hsl(var(--accent))] dark:text-[hsl(var(--accent))] font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] bg-clip-text text-transparent">Admin Panel</span>
          </Link>
        </div>
        <Separator className="opacity-50" />
        <nav className="p-4 md:p-5 space-y-2">
          <Link href="/admin/dashboard" className="block">
            <Button
              variant={pathname === '/admin/dashboard' ? 'default' : 'ghost'}
              className={`w-full justify-start font-medium transition-all duration-200 ${pathname === '/admin/dashboard' ? 'bg-[hsl(var(--primary))] dark:bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]' : 'hover:bg-[hsl(var(--gold-hsl))] hover:text-white dark:hover:bg-[hsl(var(--gold-hsl))] dark:hover:text-white'}`}
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/blogs" className="block">
            <Button
              variant={pathname.includes('/admin/blogs') ? 'default' : 'ghost'}
              className={`w-full justify-start font-medium transition-all duration-200 ${pathname.includes('/admin/blogs') ? 'bg-[hsl(var(--primary))] dark:bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]' : 'hover:bg-[hsl(var(--gold-hsl))] hover:text-white dark:hover:bg-[hsl(var(--gold-hsl))] dark:hover:text-white'}`}
            >
              <FileText className="mr-3 h-5 w-5" />
              Blogs
            </Button>
          </Link>
          <Link href="/admin/careers" className="block">
            <Button
              variant={pathname.includes('/admin/careers') ? 'default' : 'ghost'}
              className={`w-full justify-start font-medium transition-all duration-200 ${pathname.includes('/admin/careers') ? 'bg-[hsl(var(--primary))] dark:bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]' : 'hover:bg-[hsl(var(--gold-hsl))] hover:text-white dark:hover:bg-[hsl(var(--gold-hsl))] dark:hover:text-white'}`}
            >
              <Briefcase className="mr-3 h-5 w-5" />
              Careers
            </Button>
          </Link>
          <Link href="/admin/projects" className="block">
            <Button
              variant={pathname.includes('/admin/projects') ? 'default' : 'ghost'}
              className={`w-full justify-start font-medium transition-all duration-200 ${pathname.includes('/admin/projects') ? 'bg-[hsl(var(--primary))] dark:bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]' : 'hover:bg-[hsl(var(--gold-hsl))] hover:text-white dark:hover:bg-[hsl(var(--gold-hsl))] dark:hover:text-white'}`}
            >
              <Code className="mr-3 h-5 w-5" />
              Projects
            </Button>
          </Link>
          {/* Show Users tab for both admin and superadmin */}
          {((session?.user as any)?.role === 'superadmin' || (session?.user as any)?.role === 'admin') && (
            <Link href="/admin/users" className="block">
              <Button
                variant={pathname.includes('/admin/users') ? 'default' : 'ghost'}
                className={`w-full justify-start font-medium transition-all duration-200 ${pathname.includes('/admin/users') ? 'bg-[hsl(var(--primary))] dark:bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]' : 'hover:bg-[hsl(var(--gold-hsl))] hover:text-white dark:hover:bg-[hsl(var(--gold-hsl))] dark:hover:text-white'}`}
              >
                <Users className="mr-3 h-5 w-5" />
                Users
              </Button>
            </Link>
          )}
        </nav>
        <div className="p-5 mt-auto border-t border-[hsl(var(--sidebar-border))] dark:border-[hsl(var(--sidebar-border))]">
          <Button
            variant="outline"
            className="w-full justify-start font-medium text-destructive hover:text-destructive-foreground hover:bg-destructive border border-destructive/20 hover:border-destructive transition-colors duration-300"
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
      
      {/* Floating button to go back to website */}
      <Link href="/" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button 
          className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-[hsl(var(--background))] dark:border-[hsl(var(--background))]"
          aria-label="Back to Website"
        >
          <Home className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </Button>
      </Link>
      
      {/* Mobile sidebar backdrop */}
      <div 
        id="sidebar-backdrop" 
        className="fixed inset-0 bg-black/50 z-10 hidden md:hidden"
        onClick={() => {
          const sidebar = document.getElementById('mobile-sidebar');
          if (sidebar) {
            sidebar.classList.remove('translate-x-0');
            sidebar.classList.add('-translate-x-full');
          }
          document.getElementById('sidebar-backdrop')?.classList.add('hidden');
        }}
      ></div>
      
      {/* Script to handle mobile sidebar */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          const toggleButton = document.querySelector('button[aria-label="Toggle sidebar"]');
          if (toggleButton) {
            toggleButton.addEventListener('click', function() {
              const backdrop = document.getElementById('sidebar-backdrop');
              if (backdrop) {
                backdrop.classList.toggle('hidden');
              }
            });
          }
        });
      `}} />
    </div>
  );
}