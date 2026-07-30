import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Craft",
  description: "Handcrafted UI components and micro-interactions — toolbars, expandable pills, calendar widgets, and more.",
  alternates: {
    canonical: "/craft",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
