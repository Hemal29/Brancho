import { requireRole } from "@/lib/auth";
import { query, getRow } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET() {
  try {
    await requireRole(["admin"])();

    const [totalBookings, totalRevenue, totalCustomers, totalProviders, pendingProviders, paidBookings] = await Promise.all([
      getRow<{ c: number }>("SELECT COUNT(*) AS c FROM Bookings"),
      getRow<{ t: string }>("SELECT COALESCE(SUM(payableAmount), 0) AS t FROM Bookings WHERE paymentStatus = 'paid'"),
      getRow<{ c: number }>("SELECT COUNT(*) AS c FROM Users WHERE role = 'customer'"),
      getRow<{ c: number }>("SELECT COUNT(*) AS c FROM Professionals"),
      getRow<{ c: number }>("SELECT COUNT(*) AS c FROM Professionals WHERE isApproved = 0"),
      getRow<{ c: number }>("SELECT COUNT(*) AS c FROM Bookings WHERE paymentStatus = 'paid'"),
    ]);

    const bookingsByStatus = await query<{ bookingStatus: string; c: number }>(
      "SELECT bookingStatus, COUNT(*) AS c FROM Bookings GROUP BY bookingStatus"
    );
    const revenueByDay = await query<{ day: string; total: string }>(
      `SELECT DATE(createdAt) AS day, COALESCE(SUM(payableAmount), 0) AS total
       FROM Bookings WHERE paymentStatus = 'paid' AND createdAt >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
       GROUP BY DATE(createdAt) ORDER BY day ASC`
    );
    const topServices = await query<{ serviceName: string; bookings: number; revenue: string }>(
      `SELECT s.name AS serviceName, COUNT(b.id) AS bookings, COALESCE(SUM(b.payableAmount), 0) AS revenue
       FROM Bookings b JOIN Services s ON s.id = b.serviceId
       GROUP BY s.id, s.name ORDER BY bookings DESC LIMIT 5`
    );
    const recentBookings = await query(
      `SELECT b.id, b.bookingId, b.payableAmount, b.bookingStatus, b.createdAt, u.name AS customerName, s.name AS serviceName
       FROM Bookings b JOIN Users u ON u.id = b.userId JOIN Services s ON s.id = b.serviceId
       ORDER BY b.createdAt DESC LIMIT 8`
    );
    const pendingReviews = await getRow<{ c: number }>(
      "SELECT COUNT(*) AS c FROM Reviews WHERE isApproved = 0"
    );
    const openTickets = await getRow<{ c: number }>(
      "SELECT COUNT(*) AS c FROM SupportTickets WHERE status IN ('open', 'assigned')"
    );

    return ok({
      stats: {
        totalBookings: totalBookings?.c ?? 0,
        totalRevenue: parseFloat(totalRevenue?.t ?? "0"),
        totalCustomers: totalCustomers?.c ?? 0,
        totalProviders: totalProviders?.c ?? 0,
        pendingProviders: pendingProviders?.c ?? 0,
        paidBookings: paidBookings?.c ?? 0,
        pendingReviews: pendingReviews?.c ?? 0,
        openTickets: openTickets?.c ?? 0,
      },
      bookingsByStatus,
      revenueByDay,
      topServices,
      recentBookings,
    });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}
