import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Design",
  description:
    "Figma design concepts and visual explorations — bento grids, landing pages, pricing sections, and UI concepts.",
  alternates: {
    canonical: "/ui",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
