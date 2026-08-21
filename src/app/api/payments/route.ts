import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute, getRow } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

const CASHBACK_RATE = 0.05;

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole(["customer"])();
    const body = await req.json();
    const bookingId = Number(body.bookingId);
    const method = String(body.method || "upi");
    const validMethods = ["upi", "card", "netbanking", "cod"];
    if (!validMethods.includes(method)) return fail("Invalid payment method.");

    const booking = await getRow<{ id: number; userId: number; bookingStatus: string; paymentStatus: string; payableAmount: string; bookingId: string }>(
      "SELECT id, userId, bookingStatus, paymentStatus, payableAmount, bookingId FROM Bookings WHERE id = ?",
      [bookingId]
    );
    if (!booking) return fail("Booking not found.", 404);
    if (booking.userId !== user.id) return fail("You don't have permission to pay for this booking.", 403);
    if (booking.paymentStatus === "paid") return fail("This booking is already paid.", 409);

    const amount = parseFloat(booking.payableAmount);
    const txnId = "TXN-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 8).toUpperCase();

    if (method === "cod") {
      await execute("UPDATE Bookings SET paymentStatus = 'pending', bookingStatus = 'confirmed' WHERE id = ?", [bookingId]);
      await execute(
        "INSERT INTO Payments (bookingId, userId, amount, method, transactionId, status) VALUES (?, ?, ?, 'cod', NULL, 'pending')",
        [bookingId, user.id, amount]
      );
      await execute(
        "INSERT INTO Notifications (userId, type, title, message) VALUES (?, 'payment', ?, ?)",
        [user.id, "Booking confirmed", `Booking ${booking.bookingId} confirmed. Please pay ₹${amount.toFixed(2)} on completion.`]
      );
      return ok({ message: "Booking confirmed. Payment will be collected after service.", method: "cod" });
    }

    // Mock online gateway
    await execute("INSERT INTO Payments (bookingId, userId, amount, method, transactionId, gatewayRef, status) VALUES (?, ?, ?, ?, ?, ?, 'success')", [
      bookingId,
      user.id,
      amount,
      method,
      txnId,
      "gw_" + Math.random().toString(36).slice(2, 10),
    ]);
    await execute("UPDATE Bookings SET paymentStatus = 'paid', bookingStatus = 'confirmed' WHERE id = ?", [bookingId]);

    // Wallet cashback (5%)
    const cashback = Math.round(amount * CASHBACK_RATE * 100) / 100;
    if (cashback > 0) {
      const wallet = await getRow<{ balance: string }>("SELECT balance FROM Wallets WHERE userId = ?", [user.id]);
      if (wallet) {
        const newBalance = parseFloat(wallet.balance) + cashback;
        await execute("UPDATE Wallets SET balance = ? WHERE userId = ?", [newBalance, user.id]);
        await execute(
          "INSERT INTO WalletTransactions (userId, type, amount, description, balanceAfter) VALUES (?, 'credit', ?, ?, ?)",
          [user.id, cashback, `5% cashback on booking ${booking.bookingId}`, newBalance]
        );
      }
    }

    await execute(
      "INSERT INTO Notifications (userId, type, title, message) VALUES (?, 'payment', ?, ?)",
      [user.id, "Payment successful", `Payment of ₹${amount.toFixed(2)} received for booking ${booking.bookingId}. Cashback ₹${cashback.toFixed(2)} added to wallet.`]
    );
    await execute("INSERT INTO ActivityLogs (userId, action, description) VALUES (?, 'payment.create', ?)", [
      user.id,
      `Paid ₹${amount.toFixed(2)} for booking ${booking.bookingId} via ${method}`,
    ]);

    return ok({ message: "Payment successful.", transactionId: txnId, cashback });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}

export async function GET() {
  try {
    const user = await requireRole(["customer", "provider", "admin"])();
    let sql = `SELECT p.*, b.bookingId AS bookingRef, s.name AS serviceName
       FROM Payments p
       JOIN Bookings b ON b.id = p.bookingId
       JOIN Services s ON s.id = b.serviceId
       WHERE p.userId = ?
       ORDER BY p.createdAt DESC`;
    const params: unknown[] = [user.id];
    if (user.role === "admin") {
      sql = `SELECT p.*, b.bookingId AS bookingRef, s.name AS serviceName, u.name AS customerName
       FROM Payments p
       JOIN Bookings b ON b.id = p.bookingId
       JOIN Services s ON s.id = b.serviceId
       JOIN Users u ON u.id = p.userId
       ORDER BY p.createdAt DESC`;
      params.length = 0;
    }
    const payments = await query(sql, params);
    return ok({ payments });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}
