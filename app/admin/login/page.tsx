'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: 'Authentication Error',
          description: 'Invalid username or password',
          variant: 'destructive',
        });
      } else {
        router.push('/admin/dashboard');
        toast({
          title: 'Success',
          description: 'Logged in successfully',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--background))] dark:bg-[hsl(var(--background))] bg-gradient-to-br from-[hsl(var(--background))] via-[hsl(var(--background))] to-[hsl(var(--accent))]/10">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-[hsl(var(--card))] rounded-2xl flex items-center justify-center shadow-lg border border-[hsl(var(--border))] transform hover:scale-105 transition-all duration-300">
              <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold-hsl))] bg-clip-text text-transparent">Admin Portal</h1>
        </div>
        
        <Card className="w-full border border-[hsl(var(--border))] shadow-xl bg-card/95 backdrop-blur-sm dark:bg-card/95 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold-hsl))]"></div>
          <CardHeader className="space-y-2 pb-4 pt-6">
            <CardTitle className="text-2xl font-bold text-center text-card-foreground">Welcome Back</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--gold-hsl))]">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="h-11 px-4 border-[hsl(var(--border))] focus:border-[hsl(var(--gold-hsl))] focus:ring-[hsl(var(--gold-hsl))]/20 transition-all duration-200 rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--gold-hsl))]">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 px-4 border-[hsl(var(--border))] focus:border-[hsl(var(--gold-hsl))] focus:ring-[hsl(var(--gold-hsl))]/20 transition-all duration-200 rounded-md"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 mt-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold-hsl))] hover:from-[hsl(var(--gold-hsl))] hover:to-[hsl(var(--primary))] text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg rounded-md" 
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center pt-0 pb-6">
            <p className="text-sm text-muted-foreground">Devalaya Infosys Admin Panel</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}