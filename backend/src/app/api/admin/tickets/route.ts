import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET() {
  try {
    await requireRole(["admin"])();
    const tickets = await query(
      `SELECT t.*, u.name AS customerName, u.email AS customerEmail
       FROM SupportTickets t JOIN Users u ON u.id = t.userId
       ORDER BY (t.status = 'open') DESC, t.createdAt DESC`
    );
    return ok({ tickets });
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
    if (!id) return fail("Ticket id is required.");
    const fields: string[] = [];
    const values: unknown[] = [];
    if (body.status) {
      fields.push("status = ?");
      values.push(body.status);
    }
    if (body.priority) {
      fields.push("priority = ?");
      values.push(body.priority);
    }
    if (body.reply !== undefined) {
      fields.push("resolution = ?");
      values.push(String(body.reply));
    }
    if (body.resolution !== undefined) {
      fields.push("resolution = ?");
      values.push(String(body.resolution));
    }
    if (fields.length === 0) return fail("Nothing to update.");
    await execute(`UPDATE SupportTickets SET ${fields.join(", ")} WHERE id = ?`, [...values, id]);
    return ok({ message: "Ticket updated." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}
