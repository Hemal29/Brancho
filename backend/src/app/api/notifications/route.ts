import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET() {
  try {
    const user = await requireRole(["customer", "provider", "admin"])();
    const notifications = await query(
      "SELECT * FROM Notifications WHERE userId = ? OR (sendToAll = 1 AND userId IS NULL) ORDER BY createdAt DESC LIMIT 50",
      [user.id]
    );
    await execute("UPDATE Notifications SET isRead = 1 WHERE userId = ? AND isRead = 0", [user.id]);
    return ok({ notifications });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireRole(["customer", "provider", "admin"])();
    const body = await req.json();
    if (body.markAllRead) {
      await execute("UPDATE Notifications SET isRead = 1 WHERE userId = ?", [user.id]);
    }
    return ok({ message: "Notifications updated." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}
