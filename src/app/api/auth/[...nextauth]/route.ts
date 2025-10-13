import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    // Email + Password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isValid) {
            return null;
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),

    // Google OAuth login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("🔐 SignIn callback called:", { 
        provider: account?.provider, 
        userEmail: user?.email,
        accountId: account?.providerAccountId 
      });
      
      if (account?.provider === "google") {
        try {
          console.log("🔍 Checking for existing Google user:", user.email);
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });
          
          if (!existingUser) {
            console.log("👤 Creating new Google user:", user.email);
            await prisma.user.create({
              data: {
                name: user.name,
                email: user.email!,
                image: user.image,
              },
            });
            console.log("✅ New Google user created successfully");
          } else {
            console.log("👤 Existing Google user found:", existingUser.email);
          }
        } catch (error) {
          console.error("❌ Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Add debugging for OAuth callbacks
export async function GET(request: Request) {
  console.log("🔗 NextAuth GET request:", request.url);
  return handler(request);
}

export async function POST(request: Request) {
  console.log("🔗 NextAuth POST request:", request.url);
  return handler(request);
}
