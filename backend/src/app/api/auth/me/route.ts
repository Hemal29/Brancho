import { getAuthUser } from "@/lib/auth";
import { ok, fail } from "@/lib/api";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) return fail("Not authenticated.", 401);
    return ok({ user });
  } catch (err) {
    return fail((err as Error).message, 500);
  }
}
