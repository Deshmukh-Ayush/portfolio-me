"use client";

import ThemeToggle from "@/components/ui/theme-toggle";

export default function PlaygroundPage() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
    </div>
  );
}
