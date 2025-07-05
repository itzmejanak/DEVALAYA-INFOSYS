import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Career from '@/models/Career';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET a single career opportunity by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    // Await params to access its properties as required by Next.js 15
    const { id } = await params;
    const career = await Career.findById(id);
    
    if (!career) {
      return NextResponse.json({ error: 'Career opportunity not found' }, { status: 404 });
    }
    
    return NextResponse.json(career);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch career opportunity' }, { status: 500 });
  }
}

// UPDATE a career opportunity (protected route)
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
    if (!data.title || !data.description || !data.requirements || !data.qualifications || !data.experience || !data.location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Await params to access its properties as required by Next.js 15
    const { id } = await params;
    const updatedCareer = await Career.findByIdAndUpdate(id, data, { new: true });
    
    if (!updatedCareer) {
      return NextResponse.json({ error: 'Career opportunity not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedCareer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update career opportunity' }, { status: 500 });
  }
}

// DELETE a career opportunity (protected route)
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
    const deletedCareer = await Career.findByIdAndDelete(id);
    
    if (!deletedCareer) {
      return NextResponse.json({ error: 'Career opportunity not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Career opportunity deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete career opportunity' }, { status: 500 });
  }
}