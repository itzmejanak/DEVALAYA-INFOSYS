import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

// GET /api/users - Get all users (superadmin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user || ((session.user as any).role !== 'superadmin' && (session.user as any).role !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Get all users except the current user
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/users - Create a new user (superadmin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session || !session.user || ((session.user as any).role !== 'superadmin' && (session.user as any).role !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.json();
    
    // Validate required fields
    if (!data.username || !data.password || !data.email || !data.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Create new user with admin role
    const newUser = new User({
      username: data.username,
      password: data.password, // Will be hashed by the pre-save hook
      email: data.email,
      name: data.name,
      role: 'admin', // Only admins can be created through this API
      isActive: true,
    });

    await newUser.save();
    
    // Return the user without the password
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    return NextResponse.json(userResponse, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}