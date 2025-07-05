import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET a single project by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    // Await params to access its properties as required by Next.js 15
    const { id } = await params;
    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

// UPDATE a project by ID (protected route)
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
    if (!data.title || !data.category || !data.description || !data.client) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Await params to access its properties as required by Next.js 15
    const { id } = await params;
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE a project by ID (protected route)
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
    const deletedProject = await Project.findByIdAndDelete(id);
    
    if (!deletedProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}