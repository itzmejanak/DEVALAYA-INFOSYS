'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Project {
  _id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch projects',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Project deleted successfully',
        });
        fetchProjects();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete project');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete project',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold-hsl))] bg-clip-text text-transparent">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
        </div>
        <Button 
          onClick={() => router.push('/admin/projects/new')}
          className="bg-[hsl(var(--gold-hsl))] hover:bg-[hsl(var(--gold-hsl))]/90 text-white transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <Card className="border border-[hsl(var(--border))] shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-[hsl(var(--card))]/50 border-b border-[hsl(var(--border))]">
          <CardTitle className="text-[hsl(var(--primary))] flex items-center gap-2">
            <Code className="h-5 w-5 text-[hsl(var(--gold-hsl))]" /> All Projects
          </CardTitle>
          <CardDescription>Manage your projects from here.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="text-center py-8 flex flex-col items-center justify-center gap-3">
              <div className="rounded-full bg-[hsl(var(--accent))] h-12 w-12 flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 text-[hsl(var(--gold-hsl))]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-muted-foreground animate-pulse">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center gap-3">
              <div className="rounded-full bg-[hsl(var(--accent))]/10 h-20 w-20 flex items-center justify-center">
                <Code className="h-10 w-10 text-[hsl(var(--gold-hsl))]/70" />
              </div>
              <p className="text-muted-foreground text-lg">No projects found</p>
              <Button 
                onClick={() => router.push('/admin/projects/new')}
                variant="outline"
                className="mt-2 border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors duration-200"
              >
                <Plus className="mr-2 h-4 w-4" /> Create your first project
              </Button>
            </div>
          ) : (
            <Table className="border-collapse">
              <TableHeader className="bg-[hsl(var(--accent))]/5">
                <TableRow className="hover:bg-[hsl(var(--accent))]/10 transition-colors duration-200">
                  <TableHead className="font-semibold text-[hsl(var(--foreground))]">
                    Title
                  </TableHead>
                  <TableHead className="font-semibold text-[hsl(var(--foreground))]">
                    Category
                  </TableHead>
                  <TableHead className="font-semibold text-[hsl(var(--foreground))]">
                    Client
                  </TableHead>
                  <TableHead className="font-semibold text-[hsl(var(--foreground))]">
                    Year
                  </TableHead>
                  <TableHead className="font-semibold text-[hsl(var(--foreground))]">
                    Featured
                  </TableHead>
                  <TableHead className="text-right font-semibold text-[hsl(var(--foreground))]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project._id} className="hover:bg-[hsl(var(--accent))]/5 transition-colors duration-200">
                    <TableCell className="font-medium text-[hsl(var(--primary))]">{project.title}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>{project.year}</TableCell>
                    <TableCell>
                      {project.featured ? (
                        <Badge className="bg-[hsl(var(--gold-hsl))]/20 text-[hsl(var(--gold-hsl))] hover:bg-[hsl(var(--gold-hsl))]/30 border-0 shadow-sm">
                          Featured
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-[hsl(var(--accent))]/10 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]/20 border-0">
                          Standard
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/projects/edit/${project._id}`)}
                        className="hover:bg-[hsl(var(--accent))]/10 hover:text-[hsl(var(--primary))] transition-colors duration-200"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50/80 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}