import { Code, Database, Shield, Cpu, Globe, Zap, BarChart, Layers, Smartphone, Cloud, Server, Headphones } from "lucide-react";
import devaData from './data/deva.json';

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

// Generic fetch function using internal API route with fallback to static data
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
    
    if (!result.success || !result.data || result.data.length === 0) {
      throw new Error(result.error || 'No data found');
    }
    
    return result.data;
  } catch (error) {
    console.error(`Error fetching ${collectionName}, falling back to static data:`, error);
    // Fallback to static JSON data
    return devaData.collections[collectionName as keyof typeof devaData.collections] || [];
  }
}

// Services Data
export async function getServices() {
  const data = await fetchCollection('services');
  return Array.isArray(data) ? data.map((service: any) => ({
    ...service,
    icon: iconMap[service.iconName || service.icon] || Code
  })) : [];
}

// Service Categories for filtering
export async function getServiceCategories() {
  const data = await fetchCollection('servicecategories');
  return Array.isArray(data) ? data : [];
}

// Testimonials about services
export async function getServiceTestimonials() {
  const data = await fetchCollection('servicetestimonials');
  return Array.isArray(data) ? data : [];
}

// Service Process Steps
export async function getServiceProcess() {
  const data = await fetchCollection('serviceprocess');
  return Array.isArray(data) ? data : [];
}