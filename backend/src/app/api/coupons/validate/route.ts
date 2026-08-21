import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { ok, fail } from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = String(body.code || "").trim().toUpperCase();
    const amount = parseFloat(String(body.amount || "0"));

    if (!code || !amount) return fail("Coupon code and booking amount are required.");

    const coupon = await query<{
      id: number; code: string; discountType: string; discountValue: string; minBookingAmount: string;
      maxDiscount: string | null; usageLimit: number | null; usedCount: number; expiresAt: string | null; isActive: number;
    }>("SELECT * FROM Coupons WHERE code = ?", [code]);

    if (!coupon.length || coupon[0].isActive !== 1) return fail("Invalid coupon code.");
    const c = coupon[0];
    if (c.expiresAt && new Date(c.expiresAt).getTime() < Date.now()) return fail("This coupon has expired.");
    if (amount < parseFloat(c.minBookingAmount)) return fail(`This coupon requires a minimum order of ₹${parseFloat(c.minBookingAmount).toFixed(0)}.`);
    if (c.usageLimit !== null && c.usedCount >= c.usageLimit) return fail("This coupon has reached its usage limit.");

    const value = parseFloat(c.discountValue);
    let discount: number;
    if (c.discountType === "percentage") {
      discount = Math.min((amount * value) / 100, c.maxDiscount ? parseFloat(c.maxDiscount) : Infinity);
    } else {
      discount = Math.min(value, amount);
    }
    discount = Math.round(discount * 100) / 100;

    return ok({ code: c.code, discountType: c.discountType, discountValue: value, discount, payableAmount: Math.max(amount - discount, 0) });
  } catch (err) {
    return fail((err as Error).message, 500);
  }
}
