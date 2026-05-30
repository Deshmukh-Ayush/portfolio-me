"use client";

import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "motion/react";

export default function PlaygroundPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />

      <div className="flex h-100 w-200 items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-950">
        {/* component */}
        <div>
          <Cube />
        </div>
      </div>
    </div>
  );
}

const Cube = () => {
  return (
    <motion.svg
      width="100%"
      viewBox="0 0 680 480"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      initial="initial"
      whileHover="hover"
    >
      <defs>
        <linearGradient id="topG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f3" />
          <stop offset="100%" stopColor="#e8e8e4" />
        </linearGradient>
        <linearGradient id="leftG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c8c8c2" />
          <stop offset="100%" stopColor="#b8b8b0" />
        </linearGradient>
        <linearGradient id="rightG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8a8a82" />
          <stop offset="100%" stopColor="#7a7a72" />
        </linearGradient>
      </defs>

      <g transform="translate(340,240)">
        {/* TOP face */}
        <motion.path
          initial={{ y: 0 }}
          whileHover={{ y: 0 }}
          fill="url(#topG)"
          d="M 0,-130 C 12,-136 52,-112 62,-106 L 108,-79 C 119,-73 122,-70 122,-67 C 122,-64 119,-61 108,-55 L 62,-28 C 52,-22 12,1 0,7 C -12,1 -52,-22 -62,-28 L -108,-55 C -119,-61 -122,-64 -122,-67 C -122,-70 -119,-73 -108,-79 L -62,-106 C -52,-112 -12,-136 0,-130 Z"
        />

        {/* LEFT face */}
        <path
          fill="url(#leftG)"
          d="M -122,-61 L -122,61 C -122,65 -118,71 -108,77 L -62,104 C -52,110 -12,133 0,139 L 0,7 C -12,1 -52,-22 -62,-28 L -108,-55 C -118,-61 -122,-64 -122,-61 Z"
        />
        <path
          fill="none"
          stroke="#9a9a90"
          strokeWidth="0.6"
          strokeLinejoin="round"
          d="M -122,-61 L -122,61 C -122,65 -118,71 -108,77 L -62,104 C -52,110 -12,133 0,139 L 0,7 C -12,1 -52,-22 -62,-28 L -108,-55 C -118,-61 -122,-64 -122,-61 Z"
        />

        {/* RIGHT face */}
        <path
          fill="url(#rightG)"
          d="M 122,-61 L 122,61 C 122,65 118,71 108,77 L 62,104 C 52,110 12,133 0,139 L 0,7 C 12,1 52,-22 62,-28 L 108,-55 C 118,-61 122,-64 122,-61 Z"
        />
        <path
          fill="none"
          stroke="#6a6a62"
          strokeWidth="0.6"
          strokeLinejoin="round"
          d="M 122,-61 L 122,61 C 122,65 118,71 108,77 L 62,104 C 52,110 12,133 0,139 L 0,7 C 12,1 52,-22 62,-28 L 108,-55 C 118,-61 122,-64 122,-61 Z"
        />

        {/* Crease */}
        <line
          stroke="#9a9a90"
          strokeWidth="0.5"
          strokeOpacity="0.4"
          x1="0"
          y1="7"
          x2="0"
          y2="139"
        />

        {/* Specular highlight */}
        <ellipse
          cx="-30"
          cy="-90"
          rx="18"
          ry="9"
          fill="#ffffff"
          fillOpacity="0.25"
          transform="rotate(-30,-30,-90)"
        />
      </g>
    </motion.svg>
  );
};
