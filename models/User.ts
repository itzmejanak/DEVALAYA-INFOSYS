import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function(next) {
  const user = this as unknown as IUser;
  
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  
  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);