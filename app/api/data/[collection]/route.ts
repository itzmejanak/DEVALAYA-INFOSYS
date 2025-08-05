import { NextRequest, NextResponse } from 'next/server';
import devaData from '@/lib/data/deva.json';

const API_BASE_URL = 'https://rev-database-v2.vercel.app/api/collections';
const DATABASE = 'deva';
const API_KEY = 'bWRjMzgzbHA3cXZnMGZ4YmdqczoxNzUzMDQwNzkxMzU4';

// Helper function to get fallback data from static JSON
function getFallbackData(collection: string) {
  const staticData = devaData.collections[collection as keyof typeof devaData.collections];
  return staticData || [];
}

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
      'websitetemplates',
      'adsdata'
    ];

    if (!allowedCollections.includes(collection)) {
      console.log(`❌ ${collection} - invalid collection name`);
      return NextResponse.json(
        { error: 'Invalid collection name' },
        { status: 400 }
      );
    }

    // Try to fetch from external API first
    try {
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

      // Check if we got valid data
      if (data.length === 0 || !data) {
        throw new Error('No data returned from API');
      }

      console.log(`✅ ${collection} - fetched from API`);
      return NextResponse.json({
        success: true,
        data: data,
        collection: collection,
        source: 'api'
      });

    } catch (apiError) {
      console.log(`⚠️ ${collection} - API failed, using fallback data`);
      
      // Fallback to static data
      const fallbackData = getFallbackData(collection);
      
      return NextResponse.json({
        success: true,
        data: fallbackData,
        collection: collection,
        source: 'fallback'
      });
    }

  } catch (error) {
    const { collection } = await params;
    console.log(`❌ ${collection} - complete failure, using fallback`);
    
    // Last resort: return fallback data even on complete failure
    const fallbackData = getFallbackData(collection);
    
    return NextResponse.json({
      success: true,
      data: fallbackData,
      collection: collection,
      source: 'fallback'
    });
  }
}