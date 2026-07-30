import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description: "Experimental UI components and interactive prototypes.",
  alternates: {
    canonical: "/playground",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
