import { NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { query, execute } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function GET(req: NextRequest) {
  try {
    await requireRole(["admin"])();
    const { searchParams } = new URL(req.url);
    const includeInactive = searchParams.get("all") === "1";
    let sql = "SELECT * FROM Services";
    if (!includeInactive) sql += " WHERE isActive = 1";
    sql += " ORDER BY createdAt DESC";
    const services = await query(sql);
    return ok({ services });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireRole(["admin"])();
    const body = await req.json();
    const name = String(body.name || "").trim();
    const category = String(body.category || "").trim();
    const basePrice = parseFloat(body.basePrice);
    const durationMins = Number(body.durationMins || 60);
    const unit = String(body.unit || "per visit").trim();
    const description = String(body.description || "").trim();
    const image = String(body.image || "").trim();

    if (!name || !category || isNaN(basePrice)) return fail("Name, category and base price are required.");
    const slug = slugify(name);

    const result = await execute(
      "INSERT INTO Services (name, slug, category, description, image, basePrice, durationMins, unit, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)",
      [name, slug, category, description || null, image || null, basePrice, durationMins, unit]
    );
    return ok({ service: { id: result.insertId, name, slug, category, basePrice } }, 201);
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login as admin.", 401);
    return fail(errorMessage(err), 500);
  }
}
