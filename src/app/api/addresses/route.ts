import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET() {
  try {
    const user = await requireRole(["customer"])();
    const addresses = await query(
      "SELECT * FROM Addresses WHERE userId = ? ORDER BY isDefault DESC, createdAt DESC",
      [user.id]
    );
    return ok({ addresses });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole(["customer"])();
    const body = await req.json();
    const label = String(body.label || "Home").trim();
    const addressLine = String(body.addressLine || "").trim();
    const city = String(body.city || "").trim();
    const state = String(body.state || "Gujarat").trim();
    const zipCode = String(body.zipCode || "").trim();
    const isDefault = body.isDefault ? 1 : 0;

    if (!addressLine || !city || !zipCode) return fail("Address line, city and PIN code are required.");

    if (isDefault) {
      await execute("UPDATE Addresses SET isDefault = 0 WHERE userId = ?", [user.id]);
    }
    const count = await query<{ c: number }>("SELECT COUNT(*) AS c FROM Addresses WHERE userId = ?", [user.id]);
    const defaultFlag = isDefault || count[0].c === 0 ? 1 : 0;

    const result = await execute(
      "INSERT INTO Addresses (userId, label, addressLine, city, state, zipCode, isDefault) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user.id, label, addressLine, city, state, zipCode, defaultFlag]
    );
    return ok({ address: { id: result.insertId, label, addressLine, city, state, zipCode, isDefault: defaultFlag } }, 201);
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}
