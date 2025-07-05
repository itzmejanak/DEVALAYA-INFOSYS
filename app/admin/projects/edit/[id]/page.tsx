'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectParams {
  params: {
    id: string;
  };
}

export default function EditProjectPage({ params }: ProjectParams) {
  // Unwrap the params Promise using React.use
  const { id } = params as { id: string };
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    technologies: '',
    icon: '',
    client: '',
    duration: '',
    year: '',
    featured: false,
    link: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        const project = await response.json();
        
        setFormData({
          ...project,
          technologies: project.technologies.join(', '),
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch project details',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, icon: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Process technologies if provided
      const processedData = {
        ...formData,
        technologies: formData.technologies ? formData.technologies.split(',').map(tech => tech.trim()) : [],
      };

      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Project updated successfully',
        });
        router.push('/admin/projects');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update project');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update project',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="rounded-full bg-[hsl(var(--accent))] h-12 w-12 flex items-center justify-center">
            <svg className="animate-spin h-6 w-6 text-[hsl(var(--gold-hsl))]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-[hsl(var(--foreground))] font-medium">Loading project details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold-hsl))] bg-clip-text text-transparent">Edit Project</h1>
        <p className="text-muted-foreground">Update project details.</p>
      </div>

      <Card className="border border-[hsl(var(--border))] shadow-md hover:shadow-lg transition-shadow duration-200">
        <form onSubmit={handleSubmit}>
          <CardHeader className="bg-gradient-to-r from-[hsl(var(--background))] to-[hsl(var(--accent))]/10 border-[hsl(var(--border))]">
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Healthcare, Finance, Education"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the project"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Client name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Year completed"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 6 months"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select onValueChange={handleSelectChange} defaultValue={formData.icon}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Code">Code</SelectItem>
                    <SelectItem value="Globe">Globe</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                    <SelectItem value="Shield">Shield</SelectItem>
                    <SelectItem value="Cpu">Cpu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Project Link</Label>
              <Input
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="featured" 
                checked={formData.featured} 
                onCheckedChange={handleCheckboxChange} 
              />
              <Label htmlFor="featured" className="font-normal cursor-pointer">Featured project (will be highlighted on the homepage)</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-[hsl(var(--border))] bg-gradient-to-r from-[hsl(var(--background))] to-[hsl(var(--accent))]/10">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/projects')}
              className="border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[hsl(var(--gold-hsl))] hover:bg-[hsl(var(--gold-hsl))]/90 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isSubmitting ? 'Updating...' : 'Update Project'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}