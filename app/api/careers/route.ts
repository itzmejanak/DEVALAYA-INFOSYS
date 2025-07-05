import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Career from '@/models/Career';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET all career opportunities
export async function GET() {
  try {
    await connectToDatabase();
    const careers = await Career.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json(careers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch career opportunities' }, { status: 500 });
  }
}

// POST a new career opportunity (protected route)
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
    if (!data.title || !data.description || !data.requirements || !data.qualifications || !data.experience || !data.location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newCareer = await Career.create(data);
    return NextResponse.json(newCareer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create career opportunity' }, { status: 500 });
  }
}