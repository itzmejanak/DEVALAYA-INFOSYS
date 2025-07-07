'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, CheckCircle, XCircle, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Switch } from '@/components/ui/switch';

interface Career {
  _id: string;
  title: string;
  location: string;
  experience: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/careers');
      const data = await response.json();
      setCareers(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch career opportunities',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this career opportunity?')) return;

    try {
      const response = await fetch(`/api/careers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Career opportunity deleted successfully',
        });
        fetchCareers();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete career opportunity');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete career opportunity',
        variant: 'destructive',
      });
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      // First get the full career data
      const getResponse = await fetch(`/api/careers/${id}`);
      if (!getResponse.ok) {
        throw new Error('Failed to fetch career details');
      }
      const careerData = await getResponse.json();
      
      // Update the status
      const updatedData = { ...careerData, isActive: !currentStatus };
      
      const response = await fetch(`/api/careers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Career opportunity ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
        });
        fetchCareers();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update career status');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update career status',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold-hsl))] bg-clip-text text-transparent">Careers</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-0.5 sm:mt-1">Manage job opportunities and listings</p>
        </div>
        <Button 
          onClick={() => router.push('/admin/careers/new')}
          className="w-full sm:w-auto bg-[hsl(var(--gold-hsl))] hover:bg-[hsl(var(--gold-hsl))]/90 text-white transition-all duration-300 shadow-md hover:shadow-lg text-sm"
        >
          <Plus className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> New Career
        </Button>
      </div>

      <Card className="border border-[hsl(var(--border))] shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-[hsl(var(--card))]/50 border-b border-[hsl(var(--border))] px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-[hsl(var(--primary))] flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl">
            <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(var(--gold-hsl))]" /> All Career Opportunities
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Manage your job listings from here.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-muted-foreground">Loading career opportunities...</div>
          ) : careers.length === 0 ? (
            <div className="text-center py-6 sm:py-8 flex flex-col items-center justify-center gap-2">
              <Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
              <p className="text-sm sm:text-base text-muted-foreground">No career opportunities found. Create your first job listing!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Title</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Location</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden md:table-cell">Experience</TableHead>
                    <TableHead className="text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden md:table-cell">Created</TableHead>
                    <TableHead className="text-xs sm:text-sm text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {careers.map((career) => (
                    <TableRow key={career._id}>
                      <TableCell className="font-medium text-xs sm:text-sm py-2 sm:py-4">{career.title}</TableCell>
                      <TableCell className="text-xs sm:text-sm py-2 sm:py-4 hidden sm:table-cell">{career.location}</TableCell>
                      <TableCell className="text-xs sm:text-sm py-2 sm:py-4 hidden md:table-cell">{career.experience}</TableCell>
                      <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <Switch
                            checked={career.isActive}
                            onCheckedChange={() => toggleStatus(career._id, career.isActive)}
                            className="scale-75 sm:scale-100"
                          />
                          <span className={`text-xs sm:text-sm ${career.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {career.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm py-2 sm:py-4 hidden md:table-cell">{format(new Date(career.createdAt), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="text-xs sm:text-sm py-2 sm:py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/admin/careers/edit/${career._id}`)}
                          className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                        >
                          <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(career._id)}
                          className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
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