import { authCookieName, roleCookieName } from "@/lib/auth";
import { ok } from "@/lib/api";

export async function POST() {
  const res = ok({ message: "Logged out." });
  res.cookies.set(authCookieName, "", { httpOnly: true, path: "/", maxAge: 0 });
  res.cookies.set(roleCookieName, "", { path: "/", maxAge: 0 });
  res.cookies.set("brancho_user", "", { path: "/", maxAge: 0 });
  return res;
}
