import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";

export const BackBtn = ({
  className,
  href,
}: {
  className?: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "fixed z-50 flex items-center justify-center rounded-full border-t border-r border-neutral-500 bg-white/40 p-2 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/60 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:bg-neutral-900/60",
        "top-4 left-4 sm:top-8 sm:left-8 md:top-16 md:left-16 lg:top-20 lg:left-30",
        "h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12",
        "active:scale-98",

        className,
      )}
    >
      <Arrow className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
    </Link>
  );
};

const Arrow = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "icon icon-tabler icons-tabler-outline icon-tabler-corner-up-left",
        className,
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 18v-6a3 3 0 0 0 -3 -3h-10l4 -4m0 8l-4 -4" />
    </svg>
  );
};
