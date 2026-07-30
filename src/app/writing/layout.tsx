import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical articles on design engineering, Next.js, micro-interactions, and building polished digital experiences.",
  alternates: {
    canonical: "/writing",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
