import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireRole(["customer"])();
    const { id } = await params;
    const body = await req.json();

    const existing = await query<{ id: number }>("SELECT id FROM Addresses WHERE id = ? AND userId = ?", [id, user.id]);
    if (!existing.length) return fail("Address not found.", 404);

    const fields: string[] = [];
    const values: unknown[] = [];
    for (const key of ["label", "addressLine", "city", "state", "zipCode"]) {
      if (body[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(String(body[key]));
      }
    }
    if (body.isDefault === true) {
      await execute("UPDATE Addresses SET isDefault = 0 WHERE userId = ?", [user.id]);
      fields.push("isDefault = 1");
    }
    if (fields.length === 0) return fail("Nothing to update.");

    await execute(`UPDATE Addresses SET ${fields.join(", ")} WHERE id = ?`, [...values, id]);
    return ok({ message: "Address updated." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireRole(["customer"])();
    const { id } = await params;
    const existing = await query<{ id: number }>("SELECT id FROM Addresses WHERE id = ? AND userId = ?", [id, user.id]);
    if (!existing.length) return fail("Address not found.", 404);
    await execute("DELETE FROM Addresses WHERE id = ?", [id]);
    return ok({ message: "Address deleted." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}
