import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute, getRow } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const professionalId = searchParams.get("professionalId");
    const serviceId = searchParams.get("serviceId");

    let sql = `SELECT r.*, u.name AS customerName FROM Reviews r JOIN Users u ON u.id = r.userId WHERE r.isApproved = 1`;
    const params: unknown[] = [];
    if (professionalId) {
      sql += " AND r.professionalId = ?";
      params.push(professionalId);
    }
    if (serviceId) {
      sql += " AND r.serviceId = ?";
      params.push(serviceId);
    }
    sql += " ORDER BY r.createdAt DESC LIMIT 50";
    const reviews = await query(sql, params);
    return ok({ reviews });
  } catch (err) {
    return fail((err as Error).message, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole(["customer"])();
    const body = await req.json();
    const bookingId = Number(body.bookingId);
    const rating = Number(body.rating);
    const comment = String(body.comment || "").trim();

    if (!bookingId || !rating || rating < 1 || rating > 5) return fail("A valid booking and rating (1-5) are required.");

    const booking = await getRow<{ id: number; userId: number; professionalId: number | null; serviceId: number; bookingStatus: string }>(
      "SELECT id, userId, professionalId, serviceId, bookingStatus FROM Bookings WHERE id = ?",
      [bookingId]
    );
    if (!booking || booking.userId !== user.id) return fail("Booking not found.", 404);
    if (booking.bookingStatus !== "completed") return fail("You can review a booking after it is completed.");

    const existing = await getRow<{ id: number }>("SELECT id FROM Reviews WHERE bookingId = ?", [bookingId]);
    if (existing) return fail("You have already reviewed this booking.", 409);

    await execute(
      "INSERT INTO Reviews (userId, bookingId, professionalId, serviceId, rating, comment, isApproved) VALUES (?, ?, ?, ?, ?, ?, 1)",
      [user.id, bookingId, booking.professionalId, booking.serviceId, rating, comment || null]
    );

    if (booking.professionalId) {
      const prof = await getRow<{ rating: string; numReviews: number }>(
        "SELECT rating, numReviews FROM Professionals WHERE id = ?",
        [booking.professionalId]
      );
      if (prof) {
        const newCount = prof.numReviews + 1;
        const newRating = (parseFloat(prof.rating) * prof.numReviews + rating) / newCount;
        await execute("UPDATE Professionals SET rating = ?, numReviews = ? WHERE id = ?", [
          Math.round(newRating * 100) / 100,
          newCount,
          booking.professionalId,
        ]);
      }
    }

    await execute("UPDATE Bookings SET rating = ?, feedback = ? WHERE id = ?", [rating, comment || null, bookingId]);
    return ok({ message: "Thank you! Your review has been submitted." }, 201);
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}
