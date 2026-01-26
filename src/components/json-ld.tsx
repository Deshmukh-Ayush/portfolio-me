import React from "react";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ayush Deshmukh",
    url: "https://www.everywhereayush.vercel.app",
    jobTitle: "Design Engineer",
    sameAs: [
      "https://github.com/Deshmukh-Ayush", // Assuming github handle
      "https://twitter.com/everywhereayush", // Assuming twitter handle
      "https://www.linkedin.com/in/everywhereayush", // Example, adjust if needed
    ],
    description:
      "Design Engineer and Creative Developer crafting polished user interfaces and digital experiences.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
