import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole(["admin"])();
    const { id } = await params;
    const body = await req.json();

    const existing = await query<{ id: number }>("SELECT id FROM Services WHERE id = ?", [id]);
    if (!existing.length) return fail("Service not found.", 404);

    const fields: string[] = [];
    const values: unknown[] = [];
    const numericKeys = ["basePrice", "durationMins", "isActive", "rating", "numReviews"];
    for (const key of ["name", "category", "description", "image", "unit"]) {
      if (body[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(String(body[key]));
      }
    }
    for (const key of numericKeys) {
      if (body[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(Number(body[key]));
      }
    }
    if (fields.length === 0) return fail("Nothing to update.");

    await execute(`UPDATE Services SET ${fields.join(", ")} WHERE id = ?`, [...values, id]);
    return ok({ message: "Service updated." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole(["admin"])();
    const { id } = await params;
    await execute("DELETE FROM Services WHERE id = ?", [id]);
    return ok({ message: "Service deleted." });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}
