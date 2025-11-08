import React from "react";
import { cn } from "@/lib/utils";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center border-t border-neutral-300 dark:border-neutral-700 dark:bg-neutral-950",
        className,
      )}
    >
      <div className="mx-auto w-full px-6 md:min-w-3xl">
        <div className="flex w-full items-center justify-between py-1 md:px-8">
          <p className="text-xs dark:text-neutral-600">Design Engineer</p>
          <p className="text-xs dark:text-neutral-600">2025</p>
        </div>
      </div>
    </div>
  );
};
