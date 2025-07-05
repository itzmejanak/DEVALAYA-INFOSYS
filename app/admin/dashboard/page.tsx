'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, Users, Code } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [blogCount, setBlogCount] = useState(0);
  const [careerCount, setCareerCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blog count
        const blogsResponse = await fetch('/api/blogs');
        const blogsData = await blogsResponse.json();
        setBlogCount(blogsData.length);

        // Fetch career count
        const careersResponse = await fetch('/api/careers');
        const careersData = await careersResponse.json();
        setCareerCount(careersData.length);

        // Fetch project count
        const projectsResponse = await fetch('/api/projects');
        const projectsData = await projectsResponse.json();
        setProjectCount(projectsData.length);
        
        // Fetch user count if admin or superadmin
        if ((session?.user as any)?.role === 'superadmin' || (session?.user as any)?.role === 'admin') {
          try {
            const usersResponse = await fetch('/api/users');
            if (usersResponse.ok) {
              const usersData = await usersResponse.json();
              setUserCount(usersData.length);
            }
          } catch (err) {
            console.error('Error fetching users:', err);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  return (
    <div className="space-y-8">
      <div className="bg-card dark:bg-card p-6 rounded-xl shadow-sm border border-border dark:border-border">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, <span className="font-medium text-[hsl(var(--primary))] dark:text-[hsl(var(--accent))]">{session?.user?.name || 'Admin'}</span>!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[hsl(var(--chart-1))]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <div className="p-2 rounded-full bg-[hsl(var(--muted))] dark:bg-[hsl(var(--muted))]">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? '...' : blogCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Published blog posts</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[hsl(var(--chart-2))]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Career Opportunities</CardTitle>
            <div className="p-2 rounded-full bg-[hsl(var(--muted))] dark:bg-[hsl(var(--muted))]">
              <Briefcase className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? '...' : careerCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Active job listings</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[hsl(var(--chart-3))]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <div className="p-2 rounded-full bg-[hsl(var(--muted))] dark:bg-[hsl(var(--muted))]">
              <Code className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? '...' : projectCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Portfolio projects</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[hsl(var(--chart-4))]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <div className="p-2 rounded-full bg-[hsl(var(--muted))] dark:bg-[hsl(var(--muted))]">
              <Users className="h-5 w-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {((session?.user as any)?.role === 'superadmin' || (session?.user as any)?.role === 'admin') ? (isLoading ? '...' : userCount) : '1'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Registered admin users</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your website content from here.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <h3 className="mb-4 text-lg font-medium">Recent Updates</h3>
            <div className="text-sm">
              {isLoading ? (
                <p>Loading recent activity...</p>
              ) : (
                <p>No recent activity to display.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}