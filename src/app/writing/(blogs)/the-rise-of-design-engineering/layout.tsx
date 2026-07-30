import type { Metadata } from "next";
import { BlogPostJsonLd } from "@/components/blog-json-ld";

export const metadata: Metadata = {
  title: "The Rise of Design Engineering",
  description:
    "What design engineering is, why it is suddenly becoming so popular, and how it helps teams create better products.",
  alternates: {
    canonical: "/writing/the-rise-of-design-engineering",
  },
  openGraph: {
    type: "article",
    publishedTime: "2026-03-09",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogPostJsonLd
        title="The Rise of Design Engineering"
        description="What design engineering is, why it is suddenly becoming so popular, and how it helps teams create better products."
        datePublished="2026-03-09"
        slug="the-rise-of-design-engineering"
      />
      {children}
    </>
  );
}
