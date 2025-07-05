// This script seeds the initial projects data from lib/data.tsx into the database

require('dotenv').config();
const mongoose = require('mongoose');
const { projects } = require('../lib/data');

// Import the Project model
const Project = require('../models/Project');

async function seedProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if there are already projects in the database
    const existingProjects = await Project.countDocuments();
    
    if (existingProjects > 0) {
      console.log(`Database already has ${existingProjects} projects. Skipping seed.`);
      console.log('If you want to reseed, please clear the projects collection first.');
      process.exit(0);
    }

    // Transform the projects data to match the schema
    const projectsData = projects.map(project => ({
      title: project.title,
      category: project.category,
      image: project.image,
      description: project.description,
      technologies: project.technologies,
      icon: project.icon.name, // Store the icon name as a string
      client: project.client,
      duration: project.duration,
      year: project.year,
      featured: project.featured,
      link: project.link,
    }));

    // Insert the projects into the database
    const result = await Project.insertMany(projectsData);
    console.log(`Successfully seeded ${result.length} projects`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();