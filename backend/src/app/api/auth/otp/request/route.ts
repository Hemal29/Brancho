import { NextRequest } from "next/server";
import { query, execute } from "@/lib/db";
import { generateOtp, sendOtpEmail } from "@/lib/email";
import { ok, fail } from "@/lib/api";

const OTP_TTL_MIN = 10;
const MAX_ATTEMPTS = 5;

const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || "Brancho@123";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Format a Date for a DATETIME column using the server's local time. */
function toLocalDatetime(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("Please enter a valid email address.");

    // Ensure a user (customer) exists so the email is tied to an account.
    const existing = await query<{ id: number; name: string }>(
      "SELECT id, name FROM Users WHERE email = ? LIMIT 1",
      [email]
    );

    let userId: number;
    let name: string;
    if (existing.length) {
      if (existing[0].id === undefined) return fail("Account error.", 500);
      userId = existing[0].id;
      name = existing[0].name || email.split("@")[0];
    } else {
      const suggestion = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ").trim() || "Brancho User";
      const hashed = await (await import("bcryptjs")).hash(DEFAULT_PASSWORD, 10);
      const result = await execute(
        "INSERT INTO Users (name, email, phone, password, role) VALUES (?, ?, NULL, ?, 'customer')",
        [suggestion, email, hashed]
      );
      userId = result.insertId;
      name = suggestion;
      await execute("INSERT INTO Wallets (userId, balance) VALUES (?, 0)", [userId]);
    }

    const otp = generateOtp();
    const expires = toLocalDatetime(new Date(Date.now() + OTP_TTL_MIN * 60 * 1000));

    await execute(
      "UPDATE Users SET otpCode = ?, otpExpire = ?, otpAttempts = 0 WHERE id = ?",
      [otp, expires, userId]
    );

    // Fire the email; in dev with no SMTP it falls back to console logging.
    await sendOtpEmail(email, name, otp);

    return ok({ message: `OTP sent to ${email}.` });
  } catch (err) {
    return fail((err as Error).message, 500);
  }
}
