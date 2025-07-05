import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

// GET /api/users/[id] - Get a specific user (superadmin only)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user || ((session.user as any).role !== 'superadmin' && (session.user as any).role !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Await params to access its properties as required by Next.js 15
    const { id } = await params;
    const user = await User.findById(id, { password: 0 });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH /api/users/[id] - Update a user (superadmin only)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user || ((session.user as any).role !== 'superadmin' && (session.user as any).role !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.json();
    
    // Await params to access its properties as required by Next.js 15
    const { id } = await params;
    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update allowed fields
    const allowedUpdates = ['name', 'email', 'isActive'];
    for (const field of allowedUpdates) {
      if (data[field] !== undefined) {
        user[field] = data[field];
      }
    }

    // Handle password update separately if provided
    if (data.password) {
      user.password = data.password; // Will be hashed by the pre-save hook
    }

    await user.save();
    
    // Return the updated user without the password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return NextResponse.json(userResponse);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Delete a user (superadmin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user || ((session.user as any).role !== 'superadmin' && (session.user as any).role !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Await params to access its properties as required by Next.js 15
    const { id } = await params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}