import Link from "next/link";

const ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/me",
  "/api/auth/logout",
  "/api/auth/profile",
  "/api/services",
  "/api/services/[id]",
  "/api/professionals",
  "/api/reviews",
  "/api/bookings",
  "/api/bookings/[id]",
  "/api/payments",
  "/api/addresses",
  "/api/addresses/[id]",
  "/api/wallet",
  "/api/notifications",
  "/api/tickets",
  "/api/coupons/validate",
  "/api/provider/jobs",
  "/api/provider/earnings",
  "/api/admin/stats",
  "/api/admin/users",
  "/api/admin/bookings",
  "/api/admin/services",
  "/api/admin/services/[id]",
  "/api/admin/professionals",
  "/api/admin/coupons",
  "/api/admin/coupons/[id]",
  "/api/admin/reviews",
  "/api/admin/tickets",
  "/api/health",
];

export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 40, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Brancho API</h1>
      <p style={{ color: "#555" }}>Backend service. Endpoints:</p>
      <ul style={{ lineHeight: 1.9 }}>
        {ROUTES.map((r) => (
          <li key={r}>
            <Link href={r} style={{ color: "#0a5", textDecoration: "none" }}>
              {r}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
