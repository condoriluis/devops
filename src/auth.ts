import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("🔍 Attempting login with:", credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing email or password");
          return null;
        }

        try {
          console.log("📊 Querying database for user...");
          const user = await db.query.users.findFirst({
            where: eq(users.email, credentials.email as string),
          });

          if (!user) {
            console.log("❌ User not found in database");
            return null;
          }

          console.log("✅ User found:", user.email);

          const passwordMatch = await bcryptjs.compare(
            credentials.password as string,
            user.password
          );

          if (!passwordMatch) {
            console.log("❌ Password doesn't match");
            return null;
          }

          console.log("✅ Login successful!");
          return { id: user.id.toString(), email: user.email, name: user.name };
        } catch (error) {
          console.error("🔥 Error during login:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
