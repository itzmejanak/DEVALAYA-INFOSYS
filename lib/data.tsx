import { Award, Users, Target, Zap, Star, Clock, Code, Globe, Database, Shield, Cpu, ShoppingCart, Layout } from "lucide-react"
import devaData from './data/deva.json';

// Icon mapping
const iconMap: { [key: string]: any } = {
  Award,
  Users,
  Target,
  Zap,
  Star,
  Clock,
  Code,
  Globe,
  Database,
  Shield,
  Cpu,
  ShoppingCart,
  Layout
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

// For single item collections, return the first item with fallback
async function fetchSingleCollection(collectionName: string) {
  const data = await fetchCollection(collectionName);
  return Array.isArray(data) && data.length > 0 ? data[0] : {};
}

// Team Members Data
export async function getTeamMembers() {
  const data = await fetchCollection('teammembers');
  return Array.isArray(data) ? data : [];
}

// Company Values
export async function getCompanyValues() {
  const data = await fetchCollection('companyvalues');
  return Array.isArray(data) ? data.map((value: any) => ({
    ...value,
    icon: iconMap[value.iconName || value.icon] || Target
  })) : [];
}

// Contact Information
export async function getContactInfo() {
  const data = await fetchSingleCollection('contactinfo');
  // Don't modify the icon here - let the components handle icon mapping
  return data;
}

// Company Stats
export async function getCompanyStats() {
  const data = await fetchCollection('companystats');
  return {
    stats: Array.isArray(data) ? data.map((stat: any) => ({
      ...stat,
      icon: iconMap[stat.iconName || stat.icon] || Target
    })) : []
  };
}

// Contact Page Hero Content
export async function getContactHero() {
  return await fetchSingleCollection('contacthero');
}

// About Page Hero Content
export async function getAboutHero() {
  return await fetchSingleCollection('abouthero');
}

// Company Story
export async function getCompanyStory() {
  return await fetchSingleCollection('companystory');
}

// Blog Page Hero Content
export async function getBlogHero() {
  return await fetchSingleCollection('bloghero');
}

// Career Page Hero Content
export async function getCareerHero() {
  return await fetchSingleCollection('careerhero');
}

// Projects Page Hero Content
export async function getProjectsHero() {
  return await fetchSingleCollection('projectshero');
}

// Projects Data
export async function getProjects() {
  const data = await fetchCollection('projects');
  return Array.isArray(data) ? data.map((project: any) => ({
    ...project,
    icon: iconMap[project.iconName || project.icon] || Code
  })) : [];
}

// Website Templates Data
export async function getWebsiteTemplates() {
  const data = await fetchCollection('websitetemplates');
  return Array.isArray(data) ? data.map((template: any) => ({
    ...template,
    icon: iconMap[template.iconName || template.icon] || Layout
  })) : [];
}