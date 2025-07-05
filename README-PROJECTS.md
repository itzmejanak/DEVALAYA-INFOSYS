# Projects CRUD Implementation

## Overview

This document provides information about the Projects CRUD (Create, Read, Update, Delete) functionality implemented in the Devalaya Infosys application. The implementation includes:

1. A MongoDB model for Projects
2. API endpoints for managing projects
3. Admin interface for project management
4. Dynamic project display on the main website

## Project Model

The Project model includes the following fields:

- `title`: The name of the project
- `category`: The category the project belongs to
- `image`: URL to the project's image
- `description`: Detailed description of the project
- `technologies`: Array of technologies used in the project
- `icon`: Icon name representing the project
- `client`: Client name
- `duration`: Project duration
- `year`: Year the project was completed
- `featured`: Boolean indicating if the project should be featured
- `link`: Optional link to the live project

## API Endpoints

- `GET /api/projects`: Fetch all projects
- `POST /api/projects`: Create a new project (requires authentication)
- `GET /api/projects/[id]`: Fetch a specific project by ID
- `PUT /api/projects/[id]`: Update a specific project (requires authentication)
- `DELETE /api/projects/[id]`: Delete a specific project (requires authentication)

## Admin Interface

The admin interface includes:

1. Projects listing page with options to create, edit, and delete projects
2. Form for creating new projects
3. Form for editing existing projects
4. Project count on the admin dashboard

## Dynamic Project Display

The main website now dynamically loads projects from the database:

1. The home page displays featured projects
2. The projects page displays all projects, with featured projects highlighted

## Seeding Initial Data

To seed the initial project data from the static data file to the database:

1. Make sure your MongoDB connection is configured in the `.env` file
2. Run the seeding script:

```bash
npm run seed:projects
```

This will import all projects from `lib/data.tsx` into the MongoDB database.

## Usage

### Adding a New Project

1. Log in to the admin panel
2. Navigate to Projects in the sidebar
3. Click "Add New Project"
4. Fill in the project details and submit

### Editing a Project

1. Log in to the admin panel
2. Navigate to Projects in the sidebar
3. Find the project you want to edit and click the "Edit" button
4. Update the project details and save

### Deleting a Project

1. Log in to the admin panel
2. Navigate to Projects in the sidebar
3. Find the project you want to delete and click the "Delete" button
4. Confirm the deletion

## Icon Support

The following icons are supported for projects:

- Code
- Briefcase
- Cpu
- LineChart
- Layers
- PenTool
- Zap
- Smartphone

When creating or editing a project, specify one of these icon names in the Icon field.