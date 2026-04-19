"use client";

import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlaygroundPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />

      <div className="flex h-100 w-200 items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-950">
        {/* component */}
        <div>
          <Card />
        </div>
      </div>
    </div>
  );
}

const Card = () => {
  return (
    <div className="relative h-50 w-100 rounded-xl border border-gray-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};
