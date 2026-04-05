"use client";

import ThemeToggle from "@/components/ui/theme-toggle";

export default function PlaygroundPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      <div className="h-100 w-200 border border-neutral-300 bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-950">
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2">
          <div className="rounded-md border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900" />
          <div className="rounded-md border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900" />
          <div className="rounded-md border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900" />
          <div className="rounded-md border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900" />
        </div>
      </div>
    </div>
  );
}
