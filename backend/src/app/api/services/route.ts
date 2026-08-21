import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { ok, fail } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = Math.min(parseInt(searchParams.get("limit") || "100", 10), 100);

    let sql = "SELECT * FROM Services WHERE isActive = 1";
    const params: unknown[] = [];
    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }
    if (search) {
      sql += " AND (name LIKE ? OR description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }
    sql += " ORDER BY name ASC LIMIT ?";
    params.push(limit);

    const services = await query(sql, params);
    const categories = await query<{ category: string }>(
      "SELECT DISTINCT category FROM Services WHERE isActive = 1 ORDER BY category"
    );
    return ok({ services, categories: categories.map((c) => c.category) });
  } catch (err) {
    return fail((err as Error).message, 500);
  }
}
