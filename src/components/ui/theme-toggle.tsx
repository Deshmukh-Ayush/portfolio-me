"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className }: { className: string }) => {
  const { setTheme, theme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(className)}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            className="cursor-pointer rounded-full border border-neutral-800 p-3 transition-all duration-100 ease-in-out hover:bg-neutral-800 hover:shadow-sm"
            key="moon"
            initial={{
              opacity: 0,
              rotate: -45,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: 45,
              scale: 0.8,
            }}
            transition={{
              duration: 0.1,
              ease: "easeInOut",
            }}
          >
            <Moon className="dark:text-neutral-400" />
          </motion.div>
        ) : (
          <motion.div
            className="cursor-pointer rounded-[6px] p-1 transition-all duration-100 ease-in-out hover:bg-neutral-100 hover:shadow-sm"
            key="sun"
            initial={{
              opacity: 0,
              rotate: -45,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: 45,
              scale: 0.8,
            }}
            transition={{
              duration: 0.1,
              ease: "easeInOut",
            }}
          >
            <Sun className="dark:text-neutral-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

const Moon = ({ className }: { className: string }) => {
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
      className={cn(
        "icon icon-tabler icons-tabler-outline icon-tabler-moon",
        className,
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
    </svg>
  );
};

const Sun = ({ className }: { className: string }) => {
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
      className={cn(
        "icon icon-tabler icons-tabler-outline icon-tabler-sun",
        className,
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
    </svg>
  );
};
