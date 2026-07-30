import type { Metadata } from "next";
import { BlogPostJsonLd } from "@/components/blog-json-ld";

export const metadata: Metadata = {
  title: "Micro-Interactions",
  description:
    "Exploring the art of micro-interactions in UI design — subtle animations and details that make digital products feel alive.",
  alternates: {
    canonical: "/writing/micro-interactions",
  },
  openGraph: {
    type: "article",
    publishedTime: "2025-11-08",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogPostJsonLd
        title="Micro-Interactions"
        description="Exploring the art of micro-interactions in UI design — subtle animations and details that make digital products feel alive."
        datePublished="2025-11-08"
        slug="micro-interactions"
      />
      {children}
    </>
  );
}
