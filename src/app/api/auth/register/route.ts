import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { execute, query } from "@/lib/db";
import { toAuthCookie, authCookieName, roleCookieName, type AuthUser } from "@/lib/auth";
import { ok, fail } from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const password = String(body.password || "");
    const role = body.role === "provider" ? "provider" : "customer";

    if (!name || !email || !phone || !password) {
      return fail("Name, email, phone and password are required.");
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("Please enter a valid email address.");
    if (password.length < 6) return fail("Password must be at least 6 characters long.");

    const existing = await query<{ id: number }>("SELECT id FROM Users WHERE email = ? LIMIT 1", [email]);
    if (existing.length) return fail("An account with this email already exists.", 409);

    const hashed = await bcrypt.hash(password, 10);
    const result = await execute(
      "INSERT INTO Users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, hashed, role]
    );

    if (role === "provider") {
      await execute(
        "INSERT INTO Professionals (userId, name, phone, city, isApproved) VALUES (?, ?, ?, ?, 0)",
        [result.insertId, name, phone, "Ahmedabad"]
      );
    } else {
      await execute("INSERT INTO Wallets (userId, balance) VALUES (?, 0)", [result.insertId]);
    }

    const user = await query<{ id: number; name: string; email: string; phone: string | null; role: string; avatar: string | null }>(
      "SELECT id, name, email, phone, role, avatar FROM Users WHERE id = ? LIMIT 1",
      [result.insertId]
    );
    const u: AuthUser = { ...user[0], role: user[0].role as AuthUser["role"] };
    const { token, base } = toAuthCookie(u);

    const res = ok({ user: u, message: "Account created successfully." }, 201);
    res.cookies.set(authCookieName, token, base);
    res.cookies.set(roleCookieName, u.role, { ...base, httpOnly: false });
    res.cookies.set("brancho_user", encodeURIComponent(JSON.stringify({ name: u.name, email: u.email })), {
      ...base,
      httpOnly: false,
    });
    return res;
  } catch (err) {
    return fail((err as Error).message, 500);
  }
}
