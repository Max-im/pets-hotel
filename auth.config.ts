import type { NextAuthConfig } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { loginSchema } from './schema/auth.schema';


export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedPath = nextUrl.pathname.startsWith('/app');

      if (nextUrl.pathname === '/' && isLoggedIn) {
        return true;
      }

      if (isProtectedPath && !isLoggedIn) {
        return false; // Redirect unauthenticated users to login page
      }

      if (isLoggedIn && !isProtectedPath) {
        return Response.redirect(new URL('/app/dashboard', nextUrl)); // Redirect authenticated users to app
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);

        if (!result.success) {
          return null;
        }

        const { email, password } = result.data;
        const user = await db.user.findUnique({ where: { email } });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

        return passwordsMatch ? user : null;
      }
    })
  ],
} satisfies NextAuthConfig;
