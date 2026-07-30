import type { Metadata } from "next";
import { BlogPostJsonLd } from "@/components/blog-json-ld";

export const metadata: Metadata = {
  title: "Everything You Think You Know About next/image Is Wrong!",
  description:
    "A deep dive into how the Next.js Image component actually works under the hood — debunking common misconceptions about optimization, sizing, and performance.",
  alternates: {
    canonical:
      "/writing/everything-you-know-about-next-image-is-wrong",
  },
  openGraph: {
    type: "article",
    publishedTime: "2025-11-13",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogPostJsonLd
        title="Everything You Think You Know About next/image Is Wrong!"
        description="A deep dive into how the Next.js Image component actually works under the hood — debunking common misconceptions about optimization, sizing, and performance."
        datePublished="2025-11-13"
        slug="everything-you-know-about-next-image-is-wrong"
      />
      {children}
    </>
  );
}
