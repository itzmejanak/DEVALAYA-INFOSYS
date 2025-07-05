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
    <div className="flex min-h-screen bg-background dark:bg-background">
      {/* Sidebar */}
      <div className="w-72 bg-[hsl(var(--sidebar-background))] dark:bg-[hsl(var(--sidebar-background))] shadow-lg border-r border-[hsl(var(--sidebar-border))] dark:border-[hsl(var(--sidebar-border))] transition-all duration-300">
        <div className="p-6">
          <Link href="/admin/dashboard" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-[hsl(var(--primary))] dark:bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="text-[hsl(var(--accent))] dark:text-[hsl(var(--accent))] font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] bg-clip-text text-transparent">Admin Panel</span>
          </Link>
        </div>
        <Separator className="opacity-50" />
        <nav className="p-5 space-y-2.5">
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
      <div className="flex-1 p-8 overflow-auto bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
      
      {/* Floating button to go back to website */}
      <Link href="/" className="fixed bottom-6 right-6 z-50">
        <Button 
          className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-[hsl(var(--background))] dark:border-[hsl(var(--background))]"
          aria-label="Back to Website"
        >
          <Home className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}