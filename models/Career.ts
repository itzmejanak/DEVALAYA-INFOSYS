import mongoose, { Schema, Document } from 'mongoose';

export interface ICareer extends Document {
  title: string;
  description: string;
  requirements: string[];
  qualifications: string[];
  experience: string;
  location: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String, required: true }],
    qualifications: [{ type: String, required: true }],
    experience: { type: String, required: true },
    location: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Career || mongoose.model<ICareer>('Career', CareerSchema);