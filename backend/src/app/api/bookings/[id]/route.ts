import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute, getRow } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireRole(["customer", "provider", "admin"])();
    const { id } = await params;

    const booking = await getRow(
      `SELECT b.*, s.name AS serviceName, s.image AS serviceImage, s.description AS serviceDescription,
              p.name AS professionalName, p.phone AS professionalPhone,
              a.addressLine, a.city, a.state, a.zipCode,
              c.code AS couponCode
       FROM Bookings b
       JOIN Services s ON s.id = b.serviceId
       LEFT JOIN Professionals p ON p.id = b.professionalId
       LEFT JOIN Addresses a ON a.id = b.addressId
       LEFT JOIN Coupons c ON c.id = b.couponId
       WHERE b.id = ?`,
      [id]
    );
    if (!booking) return fail("Booking not found.", 404);
    if (user.role !== "admin" && booking.userId !== user.id) return fail("You don't have permission to view this booking.", 403);

    const payments = await query("SELECT * FROM Payments WHERE bookingId = ? ORDER BY createdAt DESC", [id]);
    return ok({ booking, payments });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireRole(["customer", "provider", "admin"])();
    const { id } = await params;
    const body = await req.json();
    const status = String(body.status || "");
    const validStatuses = ["pending", "confirmed", "assigned", "in_progress", "completed", "cancelled"];
    if (!validStatuses.includes(status)) return fail("Invalid booking status.");

    const booking = await getRow<{ id: number; userId: number; professionalId: number | null; serviceName?: string }>(
      "SELECT * FROM Bookings WHERE id = ?",
      [id]
    );
    if (!booking) return fail("Booking not found.", 404);

    const isOwner = booking.userId === user.id;
    const isAssignedProvider = user.role === "provider" && booking.professionalId !== null;
    if (!isOwner && user.role !== "admin" && !isAssignedProvider) {
      return fail("You don't have permission to update this booking.", 403);
    }
    if (user.role === "customer" && !["cancelled"].includes(status)) {
      return fail("Customers can only cancel bookings.", 403);
    }

    await execute("UPDATE Bookings SET bookingStatus = ? WHERE id = ?", [status, id]);

    if (status === "cancelled") {
      await execute("UPDATE Bookings SET paymentStatus = 'refunded' WHERE id = ? AND paymentStatus = 'paid'", [id]);
    }

    await execute(
      "INSERT INTO Notifications (userId, type, title, message) VALUES (?, 'booking', ?, ?)",
      [booking.userId, "Booking updated", `Your booking ${id} is now ${status.replace("_", " ")}.`]
    );
    await execute("INSERT INTO ActivityLogs (userId, action, description) VALUES (?, 'booking.update', ?)", [
      user.id,
      `Updated booking ${id} to ${status}`,
    ]);

    return ok({ message: `Booking marked as ${status}.` });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}
