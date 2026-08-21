import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute, getRow } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

const VALID_PAYMENT_METHODS = ["upi", "card", "netbanking", "cod"] as const;
type PaymentMethod = (typeof VALID_PAYMENT_METHODS)[number];

function generateBookingId() {
  return "BR-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole(["customer"])();
    const body = await req.json();

    const serviceId = Number(body.serviceId);
    const addressId = Number(body.addressId);
    const professionalId = body.professionalId ? Number(body.professionalId) : null;
    const scheduledAt = String(body.scheduledAt || "");
    const paymentMethod = String(body.paymentMethod || "cod");
    const notes = String(body.notes || "").trim();
    const couponCode = String(body.couponCode || "").trim().toUpperCase();

    if (!serviceId || !addressId) return fail("Service and address are required.");
    if (!scheduledAt || isNaN(Date.parse(scheduledAt))) return fail("A valid scheduled date is required.");
    if (!VALID_PAYMENT_METHODS.includes(paymentMethod as PaymentMethod)) return fail("Invalid payment method.");

    const service = await getRow<{ id: number; name: string; basePrice: string }>(
      "SELECT id, name, basePrice FROM Services WHERE id = ? AND isActive = 1",
      [serviceId]
    );
    if (!service) return fail("Service not found.", 404);

    const address = await getRow<{ id: number; userId: number }>(
      "SELECT id, userId FROM Addresses WHERE id = ? AND userId = ?",
      [addressId, user.id]
    );
    if (!address) return fail("Address not found.", 404);

    if (professionalId) {
      const prof = await getRow<{ id: number; isApproved: number }>(
        "SELECT id, isApproved FROM Professionals WHERE id = ? AND isApproved = 1 AND isActive = 1",
        [professionalId]
      );
      if (!prof) return fail("Professional not found or not approved.", 404);
    }

    const amount = parseFloat(service.basePrice);
    let discountAmount = 0;
    let couponId: number | null = null;

    if (couponCode) {
      const coupon = await getRow<{
        id: number; code: string; discountType: string; discountValue: string; minBookingAmount: string;
        maxDiscount: string | null; usageLimit: number | null; usedCount: number; expiresAt: string | null; isActive: number;
      }>("SELECT * FROM Coupons WHERE code = ?", [couponCode]);
      if (!coupon || coupon.isActive !== 1) return fail("Invalid coupon code.");
      if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) return fail("This coupon has expired.");
      if (amount < parseFloat(coupon.minBookingAmount)) return fail(`This coupon requires a minimum order of ₹${coupon.minBookingAmount}.`);
      if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) return fail("This coupon has reached its usage limit.");

      const value = parseFloat(coupon.discountValue);
      if (coupon.discountType === "percentage") {
        discountAmount = Math.min((amount * value) / 100, coupon.maxDiscount ? parseFloat(coupon.maxDiscount) : Infinity);
      } else {
        discountAmount = Math.min(value, amount);
      }
      discountAmount = Math.round(discountAmount * 100) / 100;
      couponId = coupon.id;
    }

    const payableAmount = Math.max(amount - discountAmount, 0);
    const bookingId = generateBookingId();

    const result = await execute(
      `INSERT INTO Bookings
        (bookingId, userId, serviceId, professionalId, addressId, couponId, scheduledAt, amount, discountAmount, payableAmount, paymentMethod, bookingStatus, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [bookingId, user.id, serviceId, professionalId, addressId, couponId, new Date(scheduledAt), amount, discountAmount, payableAmount, paymentMethod, "pending", notes || null]
    );

    if (couponId) {
      await execute("UPDATE Coupons SET usedCount = usedCount + 1 WHERE id = ?", [couponId]);
    }

    await execute(
      "INSERT INTO Notifications (userId, type, title, message) VALUES (?, 'booking', ?, ?)",
      [user.id, "Booking received", `Your ${service.name} booking ${bookingId} has been created. Complete payment to confirm.`]
    );

    await execute("INSERT INTO ActivityLogs (userId, action, description) VALUES (?, 'booking.create', ?)", [
      user.id,
      `Created booking ${bookingId}`,
    ]);

    const booking = await getRow(
      `SELECT b.*, s.name AS serviceName, s.basePrice, s.image AS serviceImage,
              p.name AS professionalName, a.addressLine, a.city, a.zipCode
       FROM Bookings b
       JOIN Services s ON s.id = b.serviceId
       LEFT JOIN Professionals p ON p.id = b.professionalId
       LEFT JOIN Addresses a ON a.id = b.addressId
       WHERE b.id = ?`,
      [result.insertId]
    );

    return ok({ booking, payableAmount, message: "Booking created." }, 201);
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    if (errorMessage(err) === "FORBIDDEN") return fail("You don't have permission to do this.", 403);
    return fail(errorMessage(err), 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await requireRole(["customer", "provider", "admin"])();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let sql = `SELECT b.*, s.name AS serviceName, s.image AS serviceImage,
              p.name AS professionalName,
              a.addressLine, a.city, a.zipCode
       FROM Bookings b
       JOIN Services s ON s.id = b.serviceId
       LEFT JOIN Professionals p ON p.id = b.professionalId
       LEFT JOIN Addresses a ON a.id = b.addressId
       WHERE b.userId = ?`;
    const params: unknown[] = [user.id];
    if (status) {
      sql += " AND b.bookingStatus = ?";
      params.push(status);
    }
    sql += " ORDER BY b.createdAt DESC";
    const bookings = await query(sql, params);
    return ok({ bookings });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}
