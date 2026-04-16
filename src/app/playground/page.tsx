"use client";

import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function PlaygroundPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />

      <div className="flex h-100 w-200 items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-950">
        {/* component */}
        <div>Playground</div>
      </div>
    </div>
  );
}
