import React from "react";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://everywhereayush.in/#person",
        name: "Ayush Deshmukh",
        url: "https://everywhereayush.in",
        jobTitle: "Design Engineer",
        description:
          "Design Engineer crafting polished interfaces, micro-interactions, and digital experiences. Co-Founder & CTO of Cloff Studio. Building Scrunity AI.",
        sameAs: [
          "https://github.com/Deshmukh-Ayush",
          "https://x.com/everywhereayush",
          "https://www.linkedin.com/in/ayush-deshmukh-144a86277/",
          "https://instagram.com/everywhereayush",
        ],
        knowsAbout: [
          "Design Engineering",
          "React",
          "Next.js",
          "TypeScript",
          "UI/UX Design",
          "Micro-Interactions",
          "Framer Motion",
          "Figma",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": "https://everywhereayush.in/#profilepage",
        url: "https://everywhereayush.in",
        name: "Ayush Deshmukh — Design Engineer",
        mainEntity: { "@id": "https://everywhereayush.in/#person" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
