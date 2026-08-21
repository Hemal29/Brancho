import { NextRequest } from "next/server";
import { query, getRow } from "@/lib/db";
import { ok, fail } from "@/lib/api";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const service = await getRow("SELECT * FROM Services WHERE id = ? AND isActive = 1", [id]);
    if (!service) return fail("Service not found.", 404);

    const professionals = await query(
      `SELECT p.*, u.avatar FROM Professionals p
       JOIN Users u ON u.id = p.userId
       WHERE p.isApproved = 1 AND p.isActive = 1
       ORDER BY p.rating DESC LIMIT 20`
    );
    const match: unknown[] = [];
    const others: unknown[] = [];
    for (const p of professionals as Array<Record<string, unknown>>) {
      const skills = JSON.parse(String(p.skills || "[]")) as string[];
      const slug = String(service.slug || "").toLowerCase();
      if (skills.some((s) => s.toLowerCase().includes(slug) || slug.includes(s.toLowerCase()))) {
        match.push(p);
      } else {
        others.push(p);
      }
    }
    return ok({ service, professionals: [...match, ...others] });
  } catch (err) {
    return fail((err as Error).message, 500);
  }
}
