import { Code, Database, Shield, Cpu, Globe, Zap, BarChart, Layers, Smartphone, Cloud, Server, Headphones } from "lucide-react";

// Icon mapping for services
const iconMap: { [key: string]: any } = {
  Code,
  Database,
  Shield,
  Cpu,
  Globe,
  Zap,
  BarChart,
  Layers,
  Smartphone,
  Cloud,
  Server,
  Headphones
};

// Generic fetch function using internal API route
async function fetchCollection(collectionName: string) {
  try {
    const response = await fetch(`/api/data/${collectionName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - Failed to fetch ${collectionName}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch data');
    }
    
    return result.data || [];
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    // Return fallback data or empty array
    return [];
  }
}

// Services Data
export async function getServices() {
  const data = await fetchCollection('services');
  return data.map((service: any) => ({
    ...service,
    icon: iconMap[service.iconName || service.icon] || Code
  }));
}

// Service Categories for filtering
export async function getServiceCategories() {
  return await fetchCollection('servicecategories');
}

// Testimonials about services
export async function getServiceTestimonials() {
  return await fetchCollection('servicetestimonials');
}

// Service Process Steps
export async function getServiceProcess() {
  return await fetchCollection('serviceprocess');
}