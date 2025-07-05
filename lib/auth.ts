import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectToDatabase from './mongodb';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // First check if it's the superadmin from env variables
          const superadminUsername = process.env.SUPERADMIN_USERNAME;
          const superadminPassword = process.env.SUPERADMIN_PASSWORD;

          if (credentials.username === superadminUsername && credentials.password === superadminPassword) {
            return {
              id: 'superadmin',
              name: 'Super Admin',
              email: `${superadminUsername}@devalayainfosys.com.np`,
              role: 'superadmin'
            };
          }

          // If not superadmin, check the database
          await connectToDatabase();
          const user = await User.findOne({ username: credentials.username, isActive: true });
          
          if (!user) {
            return null;
          }

          const isPasswordValid = await user.comparePassword(credentials.password);
          
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'devalaya-infosys-secret-key',
};