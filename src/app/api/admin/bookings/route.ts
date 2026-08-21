import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    await requireRole(["admin"])();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let sql = `SELECT b.*, s.name AS serviceName, p.name AS professionalName, u.name AS customerName,
              a.addressLine, a.city, a.zipCode
       FROM Bookings b
       JOIN Services s ON s.id = b.serviceId
       JOIN Users u ON u.id = b.userId
       LEFT JOIN Professionals p ON p.id = b.professionalId
       LEFT JOIN Addresses a ON a.id = b.addressId`;
    const params: unknown[] = [];
    if (status) {
      sql += " WHERE b.bookingStatus = ?";
      params.push(status);
    }
    sql += " ORDER BY b.createdAt DESC LIMIT 200";
    const bookings = await query(sql, params);
    return ok({ bookings });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}
