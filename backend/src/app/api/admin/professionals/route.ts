import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    await requireRole(["admin"])();
    const { searchParams } = new URL(req.url);
    const pendingOnly = searchParams.get("pending") === "1";
    let sql = `SELECT p.*, u.email, u.phone AS userPhone FROM Professionals p JOIN Users u ON u.id = p.userId`;
    if (pendingOnly) sql += " WHERE p.isApproved = 0";
    sql += " ORDER BY p.createdAt DESC";
    const professionals = await query(sql);
    return ok({ professionals });
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
    if (!id) return fail("Professional id is required.");

    const existing = await query<{ id: number }>("SELECT id FROM Professionals WHERE id = ?", [id]);
    if (!existing.length) return fail("Professional not found.", 404);

    const fields: string[] = [];
    const values: unknown[] = [];
    for (const key of ["name", "phone", "city", "bio", "isActive"]) {
      if (body[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(typeof body[key] === "boolean" ? (body[key] ? 1 : 0) : String(body[key]));
      }
    }
    if (body.skills !== undefined) {
      fields.push("skills = ?");
      values.push(JSON.stringify(body.skills));
    }
    if (body.status !== undefined) {
      fields.push("isApproved = ?");
      values.push(body.status === "approved" ? 1 : 0);
    }
    if (fields.length === 0) return fail("Nothing to update.");

    await execute(`UPDATE Professionals SET ${fields.join(", ")} WHERE id = ?`, [...values, id]);

    if (body.status !== undefined) {
      const prof = await query<{ userId: number }>("SELECT userId FROM Professionals WHERE id = ?", [id]);
      await execute(
        "INSERT INTO Notifications (userId, type, title, message) VALUES (?, 'system', ?, ?)",
        [prof[0].userId, body.status === "approved" ? "Profile approved" : "Profile rejected", body.status === "approved" ? "Welcome to Brancho! Your profile has been approved." : "Sorry, your Brancho profile application was not approved. Contact support for details."]
      );
    }
    return ok({ message: "Professional updated." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}
