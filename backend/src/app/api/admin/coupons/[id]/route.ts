import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole(["admin"])();
    const { id } = await params;
    const body = await req.json();
    const fields: string[] = [];
    const values: unknown[] = [];
    for (const key of ["code", "description", "discountType", "minBookingAmount", "maxDiscount", "usageLimit", "expiresAt", "isActive"]) {
      if (body[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(body[key] === true ? 1 : body[key] === false ? 0 : body[key]);
      }
    }
    if (body.discountValue !== undefined) {
      fields.push("discountValue = ?");
      values.push(parseFloat(body.discountValue));
    }
    if (fields.length === 0) return fail("Nothing to update.");
    await execute(`UPDATE Coupons SET ${fields.join(", ")} WHERE id = ?`, [...values, id]);
    return ok({ message: "Coupon updated." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole(["admin"])();
    const { id } = await params;
    await execute("DELETE FROM Coupons WHERE id = ?", [id]);
    return ok({ message: "Coupon deleted." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}
