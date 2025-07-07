'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function NewCareerPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    qualifications: '',
    experience: '',
    location: '',
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Process requirements and qualifications as arrays
      const processedData = {
        ...formData,
        requirements: formData.requirements.split('\n').filter(item => item.trim() !== ''),
        qualifications: formData.qualifications.split('\n').filter(item => item.trim() !== ''),
      };

      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Career opportunity created successfully',
        });
        router.push('/admin/careers');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create career opportunity');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create career opportunity',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold-hsl))] bg-clip-text text-transparent">Create New Career Opportunity</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Add a new job listing to your website.</p>
      </div>

      <Card className="border border-[hsl(var(--border))] shadow-md hover:shadow-lg transition-shadow duration-200">
        <form onSubmit={handleSubmit}>
          <CardHeader className="bg-gradient-to-r from-[hsl(var(--background))] to-[hsl(var(--accent))]/10 border-[hsl(var(--border))] px-4 sm:px-6 py-4 sm:py-6">
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6 py-4 sm:py-6">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="title" className="text-xs sm:text-sm">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
                className="h-10 sm:h-11 text-sm"
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="description" className="text-xs sm:text-sm">Job Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the job role and responsibilities"
                className="min-h-[80px] sm:min-h-[100px] text-xs sm:text-sm"
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="requirements" className="text-xs sm:text-sm">
                Requirements (One per line)
              </Label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Minimum 3 years of experience in React.js\nStrong knowledge of TypeScript\nExperience with Next.js"
                className="min-h-[80px] sm:min-h-[100px] text-xs sm:text-sm"
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="qualifications" className="text-xs sm:text-sm">
                Qualifications (One per line)
              </Label>
              <Textarea
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="Bachelor's degree in Computer Science\nMaster's degree (preferred)\nRelevant certifications"
                className="min-h-[80px] sm:min-h-[100px] text-xs sm:text-sm"
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="experience" className="text-xs sm:text-sm">Experience Required</Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 3-5 years"
                className="h-10 sm:h-11 text-sm"
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="location" className="text-xs sm:text-sm">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Kathmandu, Nepal"
                className="h-10 sm:h-11 text-sm"
                required
              />
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={handleSwitchChange}
                className="data-[state=checked]:bg-[hsl(var(--gold-hsl))] data-[state=checked]:border-[hsl(var(--gold-hsl))] scale-90 sm:scale-100"
              />
              <Label htmlFor="isActive" className="font-medium text-xs sm:text-sm">
                <span className={formData.isActive ? 'text-green-600' : 'text-red-500'}>
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 border-t border-[hsl(var(--border))] bg-gradient-to-r from-[hsl(var(--background))] to-[hsl(var(--accent))]/10 px-4 sm:px-6 py-4 sm:py-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/careers')}
              className="w-full sm:w-auto border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors duration-200 text-xs sm:text-sm h-9 sm:h-10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[hsl(var(--gold-hsl))] hover:bg-[hsl(var(--gold-hsl))]/90 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm h-9 sm:h-10"
            >
              {isSubmitting ? 'Creating...' : 'Create Career'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}