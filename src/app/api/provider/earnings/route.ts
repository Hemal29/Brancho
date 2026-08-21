import { requireRole } from "@/lib/auth";
import { getRow, query } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET() {
  try {
    const user = await requireRole(["provider"])();
    const professional = await getRow<{ id: number; jobsCompleted: number; totalEarnings: string; rating: string }>(
      "SELECT id, jobsCompleted, totalEarnings, rating FROM Professionals WHERE userId = ?",
      [user.id]
    );
    if (!professional) return fail("Professional profile not found.", 404);

    const byDay = await query<{ day: string; total: string; count: string }>(
      `SELECT DATE(completedAt) AS day, SUM(payableAmount) AS total, COUNT(*) AS count
       FROM Bookings
       WHERE professionalId = ? AND bookingStatus = 'completed' AND completedAt IS NOT NULL
       GROUP BY DATE(completedAt)
       ORDER BY day DESC LIMIT 30`,
      [professional.id]
    );

    const transactions = await query(
      `SELECT DATE(completedAt) AS date, b.bookingId, b.payableAmount, b.scheduledAt
       FROM Bookings b
       WHERE b.professionalId = ? AND b.bookingStatus = 'completed'
       ORDER BY b.completedAt DESC LIMIT 50`,
      [professional.id]
    );

    return ok({ professional, byDay, transactions });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as a provider.", 401);
    return fail(errorMessage(err), 500);
  }
}
