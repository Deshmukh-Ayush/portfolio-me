"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion, Variants } from "motion/react";

const chipVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)", y: 6 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
  initial: {},
  animate: {},
};

export const Chips = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) => {
  return (
    <a href={href} target="_blank" className="active:scale-98">
      <motion.div
        variants={chipVariants}
        initial="hidden"
        animate="visible"
        whileHover="animate"
        className={cn(
          "text-md flex cursor-pointer items-center justify-center gap-2 rounded-4xl bg-neutral-800 px-4 py-1 text-neutral-100 transition-all duration-100 ease-in-out hover:bg-neutral-700 dark:bg-neutral-900",
          "border-t border-r border-neutral-500 dark:border-neutral-800",
          className,
        )}
      >
        {children}

        <span className="relative ml-1 inline-block overflow-hidden">
          <motion.span
            variants={{
              initial: {},
              animate: { x: 10, y: -10, opacity: 0 },
              hidden: {},
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="inline-block"
          >
            <Arrow />
          </motion.span>
          <motion.span
            variants={{
              initial: {},
              animate: { x: 0, y: 0, opacity: 1 },
              hidden: {},
              visible: { x: -10, y: 10, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 inline-block"
          >
            <Arrow />
          </motion.span>
        </span>
      </motion.div>
    </a>
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
