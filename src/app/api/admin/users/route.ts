import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    await requireRole(["admin"])();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const search = searchParams.get("search");

    let sql = "SELECT id, name, email, phone, role, avatar, isActive, createdAt FROM Users";
    const params: unknown[] = [];
    const where: string[] = [];
    if (role) {
      where.push("role = ?");
      params.push(role);
    }
    if (search) {
      where.push("(name LIKE ? OR email LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }
    if (where.length) sql += " WHERE " + where.join(" AND ");
    sql += " ORDER BY createdAt DESC LIMIT 200";
    const users = await query(sql, params);
    return ok({ users });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireRole(["admin"])();
    const body = await req.json();
    const id = Number(body.id);
    if (!id) return fail("User id is required.");
    const existing = await query<{ id: number }>("SELECT id FROM Users WHERE id = ?", [id]);
    if (!existing.length) return fail("User not found.", 404);

    if (body.isActive !== undefined) {
      await execute("UPDATE Users SET isActive = ? WHERE id = ?", [body.isActive ? 1 : 0, id]);
    }
    if (body.role !== undefined) {
      await execute("UPDATE Users SET role = ? WHERE id = ?", [body.role, id]);
    }
    return ok({ message: "User updated." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}
