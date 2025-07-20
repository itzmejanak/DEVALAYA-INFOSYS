import { NextRequest, NextResponse } from 'next/server';
import { Code, Database, Shield, Cpu, Globe, Zap, BarChart, Layers, Smartphone, Cloud, Server, Headphones, Award, Users, Target, Clock } from 'lucide-react';

const API_BASE_URL = 'https://rev-database.vercel.app/api/collections';
const DATABASE = 'deva';
const API_KEY = 'rdp_82b1f4a7c3e54dbea67f8d9b05f91e2a';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    
    // Validate collection name to prevent injection
    const allowedCollections = [
      'services',
      'servicecategories', 
      'servicetestimonials',
      'serviceprocess',
      'teammembers',
      'companyvalues',
      'contactinfo',
      'companystats',
      'contacthero',
      'abouthero',
      'companystory',
      'bloghero',
      'careerhero',
      'projectshero',
      'projects'
    ];

    if (!allowedCollections.includes(collection)) {
      return NextResponse.json(
        { error: 'Invalid collection name' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/${collection}?db=${DATABASE}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': API_KEY,
      },
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    return NextResponse.json({
      success: true,
      data: result.data || [],
      collection: collection
    });

  } catch (error) {
    const { collection } = await params;
    console.error(`Error fetching ${collection}:`, error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch data',
        data: []
      },
      { status: 500 }
    );
  }
}