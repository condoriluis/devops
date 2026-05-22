"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import bcryptjs from "bcryptjs";

const SESSION_COOKIE = "devops-session";

export async function login(email: string, password: string) {
  console.log("🔍 Login attempt:", email);

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    console.log("❌ User not found");
    return { success: false, error: "Invalid credentials" };
  }

  const passwordMatch = await bcryptjs.compare(password, user.password);

  if (!passwordMatch) {
    console.log("❌ Password incorrect");
    return { success: false, error: "Invalid credentials" };
  }

  console.log("✅ Login successful");

  const sessionValue = Buffer.from(JSON.stringify({
    userId: user.id,
    email: user.email,
    name: user.name,
  })).toString("base64");

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return { success: true };
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(session.value, "base64").toString());
  } catch {
    return null;
  }
}
