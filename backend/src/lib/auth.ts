import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { query } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "brancho_jwt_secret_key_2026";
const TOKEN_COOKIE = "brancho_token";
const ROLE_COOKIE = "brancho_role";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "customer" | "provider" | "admin";
  avatar: string | null;
};

export function signToken(payload: { id: number; role: string }) {
  const expiresIn = (process.env.JWT_EXPIRE || "7d") as jwt.SignOptions["expiresIn"];
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): { id: number; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
    return decoded;
  } catch {
    return null;
  }
}

/** Read the signed-in user from the httpOnly cookie or Bearer header, fresh from DB. */
export async function getAuthUser(): Promise<AuthUser | null> {
  const store = await cookies();
  let token = store.get(TOKEN_COOKIE)?.value;
  if (!token) {
    const h = await headers();
    const auth = h.get("authorization") || "";
    if (auth.startsWith("Bearer ")) token = auth.slice(7);
  }
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  const user = await query<AuthUser & { isActive: number }>(
    "SELECT id, name, email, phone, role, avatar, isActive FROM Users WHERE id = ? LIMIT 1",
    [payload.id]
  );
  if (!user[0] || user[0].isActive !== 1) return null;
  const { isActive: _isActive, ...rest } = user[0];
  return rest;
}

export async function getAuthUserOrThrow(): Promise<AuthUser> {
  const user = await getAuthUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export function requireRole(roles: AuthUser["role"][]) {
  return async function guard(): Promise<AuthUser> {
    const user = await getAuthUser();
    if (!user) throw new Error("UNAUTHORIZED");
    if (!roles.includes(user.role)) throw new Error("FORBIDDEN");
    return user;
  };
}

export const authCookieName = TOKEN_COOKIE;
export const roleCookieName = ROLE_COOKIE;

export function toAuthCookie(user: AuthUser) {
  const token = signToken({ id: user.id, role: user.role });
  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  return { token, base };
}
