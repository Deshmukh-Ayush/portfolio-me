"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion, Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 4 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      delay: 0.1,
    },
  },
};

export const Para = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const words = typeof children === "string" ? children.split(" ") : [children];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "md:text-md text-sm text-neutral-700 dark:text-neutral-200",
        className,
      )}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
