import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET all blogs
export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST a new blog (protected route)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (session && !((session.user as any).role === 'superadmin' || (session.user as any).role === 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.content || !data.summary || !data.author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBlog = await Blog.create(data);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}