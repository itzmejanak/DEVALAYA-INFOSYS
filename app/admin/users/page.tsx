'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, Users, UserPlus, User, Mail, AtSign, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
  });

  // Check if user is authenticated
  useEffect(() => {
    if (session && !((session.user as any).role === 'superadmin' || (session.user as any).role === 'admin')) {
      toast({
        title: 'Access Denied',
        description: 'Only admins can access this page',
        variant: 'destructive',
      });
      router.push('/admin/dashboard');
    }
  }, [session, router, toast]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error',
          description: 'Failed to load users',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (session && ((session.user as any).role === 'superadmin' || (session.user as any).role === 'admin')) {
      fetchUsers();
    }
  }, [session, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }

      const createdUser = await response.json();
      setUsers((prev) => [...prev, createdUser]);
      setNewUser({ username: '', password: '', email: '', name: '' });
      setIsDialogOpen(false);
      
      toast({
        title: 'Success',
        description: 'User created successfully',
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create user',
        variant: 'destructive',
      });
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isActive: !currentStatus } : user
        )
      );

      toast({
        title: 'Success',
        description: `User ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user status',
        variant: 'destructive',
      });
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers((prev) => prev.filter((user) => user._id !== userId));
      
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      });
    }
  };

  if (!session || !((session.user as any)?.role === 'superadmin' || (session.user as any)?.role === 'admin')) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold-hsl))] bg-clip-text text-transparent">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage admin users and permissions</p>
        </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[hsl(var(--gold-hsl))] hover:bg-[hsl(var(--gold-hsl))]/90 text-white transition-all duration-300 shadow-md hover:shadow-lg">
                <Plus className="mr-2 h-4 w-4 text-white" /> Add New Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="border border-[hsl(var(--border))] shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-[hsl(var(--primary))] text-xl text-center flex items-center justify-center gap-2">
                  <UserPlus className="h-5 w-5 text-blue-500" />
                  Add Admin
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right font-medium flex items-center justify-end gap-2">
                      <User className="h-4 w-4 text-green-500" />
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      className="col-span-3 border-[hsl(var(--border))] focus:border-[hsl(var(--gold-hsl))] focus:ring-[hsl(var(--gold-hsl))]/20"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right font-medium flex items-center justify-end gap-2">
                      <AtSign className="h-4 w-4 text-purple-500" />
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      value={newUser.username}
                      onChange={handleInputChange}
                      className="col-span-3 border-[hsl(var(--border))] focus:border-[hsl(var(--gold-hsl))] focus:ring-[hsl(var(--gold-hsl))]/20"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right font-medium flex items-center justify-end gap-2">
                      <Mail className="h-4 w-4 text-orange-500" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="col-span-3 border-[hsl(var(--border))] focus:border-[hsl(var(--gold-hsl))] focus:ring-[hsl(var(--gold-hsl))]/20"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right font-medium flex items-center justify-end gap-2">
                      <Lock className="h-4 w-4 text-red-500" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={newUser.password}
                      onChange={handleInputChange}
                      className="col-span-3 border-[hsl(var(--border))] focus:border-[hsl(var(--gold-hsl))] focus:ring-[hsl(var(--gold-hsl))]/20"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-[hsl(var(--gold-hsl))] hover:bg-[hsl(var(--gold-hsl))]/90 text-white transition-all duration-300 flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Create User
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
      </div>

      <Card className="border border-[hsl(var(--border))] shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-[hsl(var(--card))]/50 border-b border-[hsl(var(--border))]">
          <CardTitle className="text-[hsl(var(--primary))] flex items-center gap-2">
            Admin Users
          </CardTitle>
          <CardDescription>
            Manage admin users who can access the admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 flex flex-col items-center justify-center gap-2">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">No users found. Create your first admin user!</p>
            </div>
          ) : (
            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="bg-[hsl(var(--muted))]/30 hover:bg-[hsl(var(--muted))]/50">
                  <TableHead className="font-semibold text-[hsl(var(--primary))] py-4">Name</TableHead>
                  <TableHead className="font-semibold text-[hsl(var(--primary))] py-4">Username</TableHead>
                  <TableHead className="font-semibold text-[hsl(var(--primary))] py-4">Email</TableHead>
                  <TableHead className="font-semibold text-[hsl(var(--primary))] py-4">Role</TableHead>
                  <TableHead className="font-semibold text-[hsl(var(--primary))] py-4">Status</TableHead>
                  <TableHead className="font-semibold text-[hsl(var(--primary))] py-4">Created At</TableHead>
                  <TableHead className="text-right font-semibold text-[hsl(var(--primary))] py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id} className="hover:bg-[hsl(var(--accent))]/10 transition-colors duration-200">
                    <TableCell className="font-medium text-[hsl(var(--foreground))]">{user.name}</TableCell>
                    <TableCell className="text-[hsl(var(--foreground))]/80">{user.username}</TableCell>
                    <TableCell className="text-[hsl(var(--foreground))]/80">{user.email}</TableCell>
                    <TableCell className="capitalize text-[hsl(var(--foreground))]/80">{user.role}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={user.isActive}
                          onCheckedChange={() => toggleUserStatus(user._id, user.isActive)}
                          disabled={(session?.user as any)?.username === user.username}
                          className="data-[state=checked]:bg-[hsl(var(--gold-hsl))] data-[state=checked]:border-[hsl(var(--gold-hsl))]" 
                        />
                        <span className={user.isActive ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[hsl(var(--foreground))]/80">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteUser(user._id)}
                        disabled={(session?.user as any)?.username === user.username}
                        className="text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive))]/90 hover:bg-[hsl(var(--destructive))]/10 transition-colors duration-200"
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