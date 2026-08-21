import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4 text-white">
      <div className="text-center">
        <p className="font-heading text-7xl font-bold text-gold">404</p>
        <h1 className="mt-3 font-heading text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-white/60">The page you are looking for does not exist.</p>
        <Link
          href="/admin"
          className="mt-6 inline-block rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
        >
          Go to Admin
        </Link>
      </div>
    </section>
  );
}
