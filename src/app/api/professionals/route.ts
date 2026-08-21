import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { ok, fail } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 50);

    let sql = `SELECT p.*, u.avatar, u.phone AS email FROM Professionals p JOIN Users u ON u.id = p.userId WHERE p.isApproved = 1 AND p.isActive = 1`;
    const params: unknown[] = [];
    if (city) {
      sql += " AND p.city = ?";
      params.push(city);
    }
    sql += " ORDER BY p.rating DESC LIMIT ?";
    params.push(limit);

    const professionals = await query(sql, params);
    return ok({ professionals });
  } catch (err) {
    return fail((err as Error).message, 500);
  }
}
