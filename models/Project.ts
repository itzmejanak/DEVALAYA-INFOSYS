import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    icon: { type: String, required: true },
    client: { type: String, required: true },
    duration: { type: String, required: true },
    year: { type: String, required: true },
    featured: { type: Boolean, default: false },
    link: { type: String, default: '#' },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);