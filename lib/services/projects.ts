/**
 * Project service for handling project data fetching and manipulation
 */

import { config } from '../config';
import { projects as staticProjects } from '../data';

// Define the Project interface
export interface Project {
  _id?: string;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  icon: string;
  client: string;
  duration: string;
  year: string;
  featured: boolean;
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Fetch all projects from the API
 * Falls back to static data if the API request fails
 */
export async function fetchProjects(): Promise<Project[]> {
  try {
    console.log(`Fetching projects from: ${config.urls.api.projects}`);
    
    const res = await fetch(config.urls.api.projects, {
      next: { revalidate: config.cache.revalidationTime }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
    }
    
    const projects = await res.json();
    
    // If the API returns an empty array, use the static fallback data
    if (!projects || !Array.isArray(projects) || projects.length === 0) {
      console.log('API returned empty projects array, using static fallback data');
      return getStaticProjects();
    }
    
    return projects;
  } catch (error) {
    console.error('Error loading projects:', error);
    // Return static project data as fallback when API fetch fails
    return getStaticProjects();
  }
}

/**
 * Get a project by ID
 */
export async function fetchProjectById(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`${config.urls.api.projects}/${id}`, {
      next: { revalidate: config.cache.revalidationTime }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch project: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error(`Error loading project with ID ${id}:`, error);
    // Try to find the project in static data
    const staticProject = getStaticProjects().find(p => p._id === id);
    return staticProject || null;
  }
}

/**
 * Get static project data as fallback
 */
export function getStaticProjects(): Project[] {
  return staticProjects.map(project => ({
    ...project,
    _id: `static-${project.title.toLowerCase().replace(/\s+/g, '-')}`,
    icon: project.icon.name // Convert icon component to string name
  }));
}