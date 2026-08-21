import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { ok, fail } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const rows = await query<{ n: number }>("SELECT 1 AS n");
    return ok({ status: "ok", db: "connected", ts: new Date().toISOString(), ping: rows[0]?.n });
  } catch (e) {
    return fail("Database unreachable: " + (e as Error).message, 503);
  }
}
