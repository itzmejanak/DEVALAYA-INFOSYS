import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET a single blog by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    // Await params to access its properties as required by Next.js 15
    const { id } = await params;
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// UPDATE a blog (protected route)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Await params to access its properties as required by Next.js 15
    const { id } = await params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });
    
    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE a blog (protected route)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (session && !((session.user as any).role === 'superadmin' || (session.user as any).role === 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    // Await params to access its properties as required by Next.js 15
    const { id } = await params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    
    if (!deletedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}