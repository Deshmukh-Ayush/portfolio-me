"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export const HoverUnderline = ({
  children,
  className,
  href,
  imageSrc,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  imageSrc: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-[150px] w-[200px] overflow-hidden rounded-xl">
        <AnimatePresence>
          {hovered && (
            <motion.img
              key="hover-image"
              src={imageSrc}
              alt="Company Image"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.455, 0.03, 0.515, 0.955] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </AnimatePresence>
      </div>

      <a
        href={href}
        target="_blank"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "group text-md relative flex cursor-pointer items-center text-neutral-700",
          "before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
          "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
          "hover:before:origin-left hover:before:scale-x-100",
          className,
        )}
      >
        {children}
      </a>
    </div>
  );
};

export const Underline = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-block",
        className,
        "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[0.1em] before:w-full before:content-['']",
        "before:bg-gradient-to-r before:from-[#112649] before:via-[#2477eb] before:to-[#0eb2f5]",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:origin-left hover:before:scale-x-100",
        "before:shadow-[0_0_8px_rgba(50,197,255,0.6),0_0_12px_rgba(0,212,255,0.4)]",
        "hover:before:shadow-[0_0_12px_rgba(50,197,255,0.8),0_0_20px_rgba(0,212,255,0.6),0_0_24px_rgba(0,255,255,0.4)]",
      )}
    >
      {children}
    </Link>
  );
};

export const Underline01 = ({
  children,
  href,
  className,
  target,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
}) => {
  return (
    <Link
      href={href}
      target={target}
      className={cn(
        "group relative flex items-center",
        "before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:origin-left hover:before:scale-x-100",
        className,
      )}
    >
      {children}
      <svg
        className="mt-[0em] ml-[0.3em] size-[0.65em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </Link>
  );
};
