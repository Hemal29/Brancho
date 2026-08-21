import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import { toAuthCookie, authCookieName, roleCookieName, type AuthUser } from "@/lib/auth";
import { ok, fail } from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) return fail("Email and password are required.");

    const user = await query<{ id: number; name: string; email: string; phone: string | null; role: string; avatar: string | null; password: string; isActive: number }>(
      "SELECT id, name, email, phone, role, avatar, password, isActive FROM Users WHERE email = ? LIMIT 1",
      [email]
    );
    if (!user.length) return fail("Invalid email or password.", 401);
    const u = user[0];
    if (u.isActive !== 1) return fail("This account has been deactivated. Contact support.", 403);

    const match = await bcrypt.compare(password, u.password);
    if (!match) return fail("Invalid email or password.", 401);

    const safe: AuthUser = { id: u.id, name: u.name, email: u.email, phone: u.phone, role: u.role as AuthUser["role"], avatar: u.avatar };
    const { token, base } = toAuthCookie(safe);

    const res = ok({ user: safe, token, message: "Login successful." });
    res.cookies.set(authCookieName, token, base);
    res.cookies.set(roleCookieName, safe.role, { ...base, httpOnly: false });
    res.cookies.set("brancho_user", encodeURIComponent(JSON.stringify({ name: safe.name, email: safe.email })), {
      ...base,
      httpOnly: false,
    });
    return res;
  } catch (err) {
    return fail((err as Error).message, 500);
  }
}
