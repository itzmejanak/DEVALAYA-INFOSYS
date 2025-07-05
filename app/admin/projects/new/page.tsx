'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewProjectPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '/placeholder.svg?height=600&width=800',
    description: '',
    technologies: '',
    icon: 'Code',
    client: '',
    duration: '',
    year: new Date().getFullYear().toString(),
    featured: false,
    link: '#',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Project created successfully',
        });
        router.push('/admin/projects');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create project');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create project',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold-hsl))] bg-clip-text text-transparent">Create New Project</h1>
        <p className="text-muted-foreground">Add a new project to your portfolio.</p>
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
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}