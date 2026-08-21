import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsroomArticlePage from "@/components/pages/NewsroomArticlePage";
import { NEWSROOM } from "@/lib/corporate";

export const dynamicParams = false;

export function generateStaticParams() {
  return NEWSROOM.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = NEWSROOM.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/newsroom/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://brancho.in/newsroom/${post.slug}`,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = NEWSROOM.find((p) => p.slug === slug);
  if (!post) notFound();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [month, year] = post.date.split(" ");
  const datePublished = `${year}-${String(months.indexOf(month) + 1).padStart(2, "0")}-01`;
  return (
    <>
      <NewsroomArticlePage post={post} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: post.title,
            description: post.excerpt,
            datePublished,
            dateModified: datePublished,
            author: { "@type": "Organization", name: "Brancho" },
            publisher: { "@id": "https://brancho.in/#organization" },
          }),
        }}
      />
    </>
  );
}
