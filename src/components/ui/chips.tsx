"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";

export const Chips = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className={cn(
        "text-md flex cursor-pointer items-center justify-center gap-2 rounded-4xl bg-neutral-600 px-4 py-1 text-neutral-100 transition-all duration-100 ease-in-out hover:bg-neutral-700",
        className,
      )}
    >
      {children}
      <span className="relative ml-1 inline-block overflow-hidden">
        <motion.span
          variants={{
            initial: { x: 0, y: 0, opacity: 1 },
            animate: { x: 10, y: -10, opacity: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="inline-block"
        >
          <Arrow />
        </motion.span>
        <motion.span
          variants={{
            initial: { x: -10, y: 10, opacity: 0 },
            animate: { x: 0, y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 inline-block"
        >
          <Arrow />
        </motion.span>
      </span>
    </motion.div>
  );
};

const Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
};
