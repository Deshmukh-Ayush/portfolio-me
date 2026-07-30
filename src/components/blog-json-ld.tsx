import React from "react";

interface BlogPostJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  slug: string;
}

export function BlogPostJsonLd({
  title,
  description,
  datePublished,
  slug,
}: BlogPostJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    url: `https://everywhereayush.in/writing/${slug}`,
    author: {
      "@type": "Person",
      name: "Ayush Deshmukh",
      url: "https://everywhereayush.in",
    },
    publisher: {
      "@type": "Person",
      name: "Ayush Deshmukh",
      url: "https://everywhereayush.in",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
