'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Blog {
  _id: string;
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch blogs',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Blog deleted successfully',
        });
        fetchBlogs();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete blog');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete blog',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold-hsl))] bg-clip-text text-transparent">Blogs</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage and create blog content</p>
        </div>
        <Button 
          onClick={() => router.push('/admin/blogs/new')}
          className="bg-[hsl(var(--gold-hsl))] hover:bg-[hsl(var(--gold-hsl))]/90 text-white transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> New Blog
        </Button>
      </div>

      <Card className="border border-[hsl(var(--border))] shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden overflow-x-auto">
        <CardHeader className="bg-[hsl(var(--card))]/50 border-b border-[hsl(var(--border))] py-3 sm:py-4 px-3 sm:px-6">
          <CardTitle className="text-[hsl(var(--primary))] flex items-center gap-2 text-base sm:text-lg">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(var(--gold-hsl))]" /> All Blogs
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Manage your blog posts from here.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-muted-foreground">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-6 sm:py-8 flex flex-col items-center justify-center gap-2">
              <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
              <p className="text-sm sm:text-base text-muted-foreground">No blogs found. Create your first blog post!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="border-collapse min-w-full">
                <TableHeader>
                  <TableRow className="bg-[hsl(var(--muted))]/30 hover:bg-[hsl(var(--muted))]/50">
                    <TableHead className="font-semibold text-[hsl(var(--primary))] py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">Title</TableHead>
                    <TableHead className="font-semibold text-[hsl(var(--primary))] py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">Author</TableHead>
                    <TableHead className="font-semibold text-[hsl(var(--primary))] py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap hidden md:table-cell">Created</TableHead>
                    <TableHead className="font-semibold text-[hsl(var(--primary))] py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap hidden lg:table-cell">Updated</TableHead>
                    <TableHead className="text-right font-semibold text-[hsl(var(--primary))] py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog._id} className="hover:bg-[hsl(var(--accent))]/10 transition-colors duration-200">
                      <TableCell className="font-medium text-[hsl(var(--foreground))] text-xs sm:text-sm py-2 sm:py-3 max-w-[150px] sm:max-w-[200px] truncate">{blog.title}</TableCell>
                      <TableCell className="text-[hsl(var(--foreground))]/80 text-xs sm:text-sm py-2 sm:py-3 hidden sm:table-cell">{blog.author}</TableCell>
                      <TableCell className="text-[hsl(var(--foreground))]/80 text-xs sm:text-sm py-2 sm:py-3 hidden md:table-cell">{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="text-[hsl(var(--foreground))]/80 text-xs sm:text-sm py-2 sm:py-3 hidden lg:table-cell">{format(new Date(blog.updatedAt), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="text-right py-1 sm:py-2">
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/admin/blogs/edit/${blog._id}`)}
                            className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-[hsl(var(--gold-hsl))]/10 hover:text-[hsl(var(--gold-hsl))] transition-colors duration-200"
                          >
                            <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(blog._id)}
                            className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive))]/90 hover:bg-[hsl(var(--destructive))]/10 transition-colors duration-200"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}