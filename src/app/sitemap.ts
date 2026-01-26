import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.everywhereayush.vercel.app";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Add other routes here if they exist, e.g., /about, /projects
    // {
    //   url: `${baseUrl}/blogs`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.8,
    // },
  ];
}
