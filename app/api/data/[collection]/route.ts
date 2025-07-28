import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://rev-database-v2.vercel.app/api/collections';
const DATABASE = 'deva';
const API_KEY = 'bWRjM202MXVyZ3J4ZXBnOTdvbDoxNzUzMDQxNDQ3NzE1';

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
      'projects',
      'websitetemplates'
    ];

    if (!allowedCollections.includes(collection)) {
      return NextResponse.json(
        { error: 'Invalid collection name' },
        { status: 400 }
      );
    }

    console.log(`Fetching ${collection} from ${API_BASE_URL}/${collection}?db=${DATABASE}`);

    const response = await fetch(`${API_BASE_URL}/${collection}?db=${DATABASE}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': API_KEY,
      },
      cache: 'no-cache',
    });

    console.log(`Response status for ${collection}: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error for ${collection}! status: ${response.status}, body: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`Response data for ${collection}:`, result);
    
    // Handle different response structures
    let data = [];
    if (Array.isArray(result)) {
      data = result;
    } else if (result.data && Array.isArray(result.data)) {
      data = result.data;
    } else if (result.data) {
      data = [result.data];
    } else if (typeof result === 'object' && result !== null) {
      data = [result];
    }
    
    return NextResponse.json({
      success: true,
      data: data,
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