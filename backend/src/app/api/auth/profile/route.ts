import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { requireRole } from "@/lib/auth";
import { execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireRole(["customer", "provider", "admin"])();
    const body = await req.json();
    const fields: string[] = [];
    const values: unknown[] = [];

    if (body.name !== undefined) {
      const name = String(body.name).trim();
      if (!name) return fail("Name cannot be empty.");
      fields.push("name = ?");
      values.push(name);
    }
    if (body.phone !== undefined) {
      fields.push("phone = ?");
      values.push(String(body.phone).trim());
    }
    if (body.password !== undefined && body.password) {
      if (String(body.password).length < 6) return fail("Password must be at least 6 characters.");
      fields.push("password = ?");
      values.push(await bcrypt.hash(String(body.password), 10));
    }
    if (fields.length === 0) return fail("Nothing to update.");

    await execute(`UPDATE Users SET ${fields.join(", ")} WHERE id = ?`, [...values, user.id]);
    return ok({ message: "Profile updated." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}
