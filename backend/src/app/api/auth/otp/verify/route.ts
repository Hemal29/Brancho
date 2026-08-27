import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { query, execute } from "@/lib/db";
import { toAuthCookie, authCookieName, roleCookieName, type AuthUser } from "@/lib/auth";
import { ok, fail } from "@/lib/api";

const MAX_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const otp = String(body.otp || "").trim();
    const newPassword = String(body.newPassword || "").trim();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return fail("Please enter a valid email address.");
    if (!/^\d{6}$/.test(otp)) return fail("Please enter the 6-digit code.");
    if (newPassword && newPassword.length < 6)
      return fail("Password must be at least 6 characters long.");

    const user = await query<{
      id: number; name: string; phone: string | null; role: string; avatar: string | null;
      isActive: number; otpCode: string | null; otpExpire: string | null; otpAttempts: number;
    }>(
      "SELECT id, name, phone, role, avatar, isActive, otpCode, otpExpire, otpAttempts FROM Users WHERE email = ? LIMIT 1",
      [email]
    );
    if (!user.length) return fail("Invalid email or OTP.", 401);

    const u = user[0];
    if (u.isActive !== 1) return fail("This account has been deactivated. Contact support.", 403);

    if (!u.otpCode || !u.otpExpire) return fail("No OTP was requested for this email. Request a new code.");

    if (u.otpAttempts >= MAX_ATTEMPTS) {
      return fail("Too many failed attempts. Request a new OTP.", 429);
    }

    const expired = new Date(u.otpExpire.replace(" ", "T")).getTime() < Date.now();
    if (expired) {
      await execute("UPDATE Users SET otpCode = NULL, otpExpire = NULL WHERE id = ?", [u.id]);
      return fail("This OTP has expired. Request a new code.", 410);
    }

    if (u.otpCode !== otp) {
      await execute("UPDATE Users SET otpAttempts = otpAttempts + 1 WHERE id = ?", [u.id]);
      return fail("Incorrect OTP. Please try again.", 401);
    }

    // Intermediate verification (no new password yet): confirm the OTP is
    // valid but DO NOT clear it — the client still needs to submit a password.
    if (!newPassword) {
      return ok({ verified: true, message: "OTP verified." });
    }

    // Final step: set the new password, clear the OTP, and log the user in.
    const hashed = await bcrypt.hash(newPassword, 10);
    await execute(
      "UPDATE Users SET otpCode = NULL, otpExpire = NULL, otpAttempts = 0, password = ? WHERE id = ?",
      [hashed, u.id]
    );

    const safe: AuthUser = { id: u.id, name: u.name, email, phone: u.phone, role: u.role as AuthUser["role"], avatar: u.avatar };
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
