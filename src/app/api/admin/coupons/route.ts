import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET() {
  try {
    await requireRole(["admin"])();
    const coupons = await query("SELECT * FROM Coupons ORDER BY createdAt DESC");
    return ok({ coupons });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireRole(["admin"])();
    const body = await req.json();
    const code = String(body.code || "").trim().toUpperCase();
    const discountType = body.discountType === "fixed" ? "fixed" : "percentage";
    const discountValue = parseFloat(body.discountValue);
    const minBookingAmount = parseFloat(body.minBookingAmount || "0");
    const maxDiscount = body.maxDiscount !== undefined && body.maxDiscount !== "" ? parseFloat(body.maxDiscount) : null;
    const usageLimit = body.usageLimit !== undefined && body.usageLimit !== "" ? Number(body.usageLimit) : null;
    const expiresAt = body.expiresAt ? new Date(body.expiresAt) : null;
    const description = String(body.description || "").trim();

    if (!code || isNaN(discountValue)) return fail("Code and discount value are required.");
    if (discountType === "percentage" && (discountValue <= 0 || discountValue > 90)) return fail("Percentage discount must be between 1 and 90.");

    await execute(
      "INSERT INTO Coupons (code, description, discountType, discountValue, minBookingAmount, maxDiscount, usageLimit, expiresAt, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)",
      [code, description || null, discountType, discountValue, minBookingAmount, maxDiscount, usageLimit, expiresAt]
    );
    return ok({ message: "Coupon created." }, 201);
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}
