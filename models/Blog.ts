import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  summary: string;
  author: string;
  coverImage?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String, required: true },
    author: { type: String, required: true },
    coverImage: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);