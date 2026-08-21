import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole(["customer"])();
    const body = await req.json();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!subject || !message) return fail("Subject and message are required.");

    const result = await execute(
      "INSERT INTO SupportTickets (userId, subject, message) VALUES (?, ?, ?)",
      [user.id, subject, message]
    );
    return ok({ ticket: { id: result.insertId, subject, message, status: "open" } }, 201);
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}

export async function GET() {
  try {
    const user = await requireRole(["customer"])();
    const tickets = await query("SELECT * FROM SupportTickets WHERE userId = ? ORDER BY createdAt DESC", [user.id]);
    return ok({ tickets });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}
