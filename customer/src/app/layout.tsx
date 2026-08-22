import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { jsonLd } from "@/lib/schema";
import { AuthProvider } from "@/lib/auth-context";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Brancho | India's Trusted Home Services Platform",
    template: "%s | Brancho",
  },
  description:
    "Connecting millions of homeowners with background-verified professionals for reliable, transparent and hassle-free home services across India. AC cleaning, deep home cleaning, electrician, plumbing and more.",
  keywords: [
    "home services India",
    "AC cleaning",
    "deep home cleaning",
    "electrician",
    "plumber",
    "Brancho",
    "home services Junagadh",
    "verified professionals",
  ],
  authors: [{ name: "Brancho", url: "https://brancho.in" }],
  creator: "Brancho",
  publisher: "Brancho",
  metadataBase: new URL("https://brancho.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://brancho.in",
    siteName: "Brancho",
    title: "Brancho | India's Trusted Home Services Platform",
    description:
      "Connecting millions of homeowners with background-verified professionals for reliable, transparent and hassle-free home services.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brancho — India's Trusted Home Services Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brancho | India's Trusted Home Services Platform",
    description:
      "Connecting millions of homeowners with background-verified professionals for reliable, transparent and hassle-free home services.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Brancho",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: ["/favicon-16.png", "/favicon-32.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#181A1F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
