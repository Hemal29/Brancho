import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET() {
  try {
    await requireRole(["admin"])();
    const reviews = await query(
      `SELECT r.*, u.name AS customerName, s.name AS serviceName, p.name AS professionalName
       FROM Reviews r
       JOIN Users u ON u.id = r.userId
       LEFT JOIN Services s ON s.id = r.serviceId
       LEFT JOIN Professionals p ON p.id = r.professionalId
       ORDER BY r.createdAt DESC LIMIT 200`
    );
    return ok({ reviews });
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
    if (!id) return fail("Review id is required.");
    if (body.status === "removed") {
      await execute("DELETE FROM Reviews WHERE id = ?", [id]);
      return ok({ message: "Review removed." });
    }
    if (body.status !== undefined) {
      await execute("UPDATE Reviews SET isApproved = ? WHERE id = ?", [body.status === "approved" ? 1 : 0, id]);
    }
    return ok({ message: "Review updated." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}
