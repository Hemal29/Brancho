import { requireRole } from "@/lib/auth";
import { query, getRow } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET() {
  try {
    const user = await requireRole(["provider"])();
    const professional = await getRow<{ id: number; jobsCompleted: number; totalEarnings: string }>(
      "SELECT id, jobsCompleted, totalEarnings FROM Professionals WHERE userId = ?",
      [user.id]
    );
    if (!professional) return fail("Professional profile not found.", 404);

    const jobs = await query(
      `SELECT b.*, s.name AS serviceName, s.image AS serviceImage,
              u.name AS customerName, u.phone AS customerPhone,
              a.addressLine, a.city, a.zipCode
       FROM Bookings b
       JOIN Services s ON s.id = b.serviceId
       JOIN Users u ON u.id = b.userId
       LEFT JOIN Addresses a ON a.id = b.addressId
       WHERE b.professionalId = ?
       ORDER BY b.scheduledAt DESC LIMIT 100`,
      [professional.id]
    );

    const stats = await getRow<{ total: number; completed: number; pending: number; earnings: string }>(
      `SELECT COUNT(*) AS total,
              SUM(bookingStatus = 'completed') AS completed,
              SUM(bookingStatus IN ('pending','confirmed','assigned','in_progress')) AS pending,
              COALESCE(SUM(CASE WHEN bookingStatus = 'completed' THEN payableAmount ELSE 0 END), 0) AS earnings
       FROM Bookings WHERE professionalId = ?`,
      [professional.id]
    );

    return ok({ professional, jobs, stats });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as a provider.", 401);
    return fail(errorMessage(err), 500);
  }
}
