"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { useMeasure } from "@/hooks/useMeasure";
import Image from "next/image";

export const FanCards = () => {
  return (
    <div>
      <MainComp />
    </div>
  );
};

const MainComp = () => {
  const [isFanned, setIsFanned] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stackData = [
    {
      id: 1,
      stacked: { rotate: 8, x: 0, y: 0 },
      fanned: { rotate: -30, x: -160, y: 40 },
    },
    {
      id: 2,
      stacked: { rotate: -4, x: 0, y: 0 },
      fanned: { rotate: -15, x: -80, y: 10 },
    },
    {
      id: 3,
      stacked: { rotate: -8, x: 0, y: 0 },
      fanned: { rotate: 30, x: 160, y: 40 },
    },
    {
      id: 4,
      stacked: { rotate: 6, x: 0, y: 0 },
      fanned: { rotate: 15, x: 80, y: 10 },
    },
    {
      id: 5,
      stacked: { rotate: 0, x: 0, y: 0 },
      fanned: { rotate: 0, x: 0, y: 0 },
    },
  ];

  const cardDetails = [
    {
      id: 1,
      src: "/ai-card-1.png",
      title: "Design Engineer",
      name: "Priyanshu Bhaduri",
      description:
        "Balancing product vision, design systems, and engineering craft to create digital experiences that feel polished and intuitive.",
    },
    {
      id: 2,
      src: "/ai-card-2.png",
      title: "Creative Director",
      name: "Vedant Ghodki",
      description:
        "Designing visual systems and motion language that bring storytelling, brand confidence, and delightful detail to digital products.",
    },
    {
      id: 3,
      src: "/ai-card-3.png",
      title: "Product Strategist",
      name: "Tanish Karvekar",
      description:
        "Translating user research and business goals into interaction patterns, content flow, and launch-ready product roadmaps.",
    },
    {
      id: 4,
      src: "/ai-card-4.png",
      title: "UX Lead",
      name: "Pranav Chaturvedi",
      description:
        "Refining interfaces with accessibility-first thinking, fast feedback loops, and pixel-perfect execution across every screen.",
    },
    {
      id: 5,
      src: "/ai-card-5.png",
      title: "Design Engineer",
      name: "Ayush Deshmukh",
      description:
        "Building elegant interaction systems that feel responsive, effortless, and polished from the first hover to the final tap.",
      variant: "highlight",
    },
  ];

  return (
    <div
      className="relative flex min-h-150 w-full cursor-pointer items-center justify-center"
      onMouseEnter={() => setIsFanned(true)}
      onMouseLeave={() => {
        setIsFanned(false);
        setHoveredCard(null);
      }}
    >
      {stackData.map((card, index) => {
        const isCardHovered = hoveredCard === card.id && isFanned;
        const base = isFanned ? card.fanned : card.stacked;

        return (
          <motion.div
            key={card.id}
            animate={{
              rotate: base.rotate,
              x: base.x,
              y: isCardHovered ? base.y - 28 : base.y,
              scale: isCardHovered ? 1.07 : 1,
              filter: isCardHovered
                ? "blur(0px) drop-shadow(0 20px 40px rgba(0,0,0,0.18))"
                : "blur(0px) drop-shadow(0 2px 8px rgba(0,0,0,0.07))",
            }}
            transition={
              isCardHovered
                ? {
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                    mass: 0.8,
                  }
                : {
                    type: "spring",
                    stiffness: 150,
                    damping: 19,
                    mass: 1.2,
                  }
            }
            onHoverStart={() => isFanned && setHoveredCard(card.id)}
            onHoverEnd={() => setHoveredCard(null)}
            className="absolute origin-bottom rounded-[20px]"
            style={{
              zIndex: isCardHovered ? 999 : index * 10,
            }}
          >
            <Card
              src={cardDetails[index].src}
              title={cardDetails[index].title}
              name={cardDetails[index].name}
              description={cardDetails[index].description}
              variant={cardDetails[index].variant as "highlight" | undefined}
              isHovered={isCardHovered}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

const Card = ({
  src,
  title,
  name,
  description,
  variant,
  isHovered,
}: {
  src: string;
  title: string;
  name: string;
  description: string;
  variant?: "highlight";
  isHovered?: boolean;
}) => {
  const isHighlight = variant === "highlight";

  return (
    <div
      className={`relative flex h-60 w-40 items-center justify-center rounded-[20px] border p-1 ${
        isHighlight
          ? "border-neutral-700 bg-neutral-500 dark:border-neutral-300 dark:bg-neutral-100"
          : "border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
      }`}
    >
      <LinkOpener isHighlight={isHighlight} isHovered={isHovered} />
      <div
        className={`h-full w-full overflow-hidden rounded-2xl border p-1 ${
          isHighlight
            ? "border-neutral-700 bg-neutral-700 dark:border-neutral-300 dark:bg-white"
            : "border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900"
        }`}
      >
        <div className="relative h-20 w-full overflow-hidden rounded-xl ring-1 ring-neutral-200/50 ring-inset">
          <Image src={src} alt={name} fill className="object-cover" />
          <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset" />
        </div>

        <div className="p-2">
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[6px] font-medium tracking-wider uppercase ${
              isHighlight
                ? "bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-white"
                : "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            }`}
          >
            {title}
          </span>

          <h2
            className={`mt-1.5 text-xs font-bold ${
              isHighlight
                ? "text-neutral-50 dark:text-neutral-800"
                : "text-neutral-800 dark:text-neutral-100"
            }`}
          >
            {name}
          </h2>

          <p
            className={`mt-1 text-[8px] leading-3 ${
              isHighlight
                ? "text-neutral-400 dark:text-neutral-500"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const LinkOpener = ({
  isHighlight,
  isHovered,
}: {
  isHighlight?: boolean;
  isHovered?: boolean;
}) => {
  const [measureRef, bounds] = useMeasure();

  return (
    <motion.div
      initial="initial"
      animate={isHovered ? "animate" : "initial"}
      className={`absolute top-2 left-2 z-50 flex w-fit cursor-pointer items-center rounded-full border p-1 backdrop-blur-sm ${
        isHighlight
          ? "border-neutral-400 bg-neutral-300/80 dark:border-neutral-300 dark:bg-white/80"
          : "border-neutral-300 bg-white/80 dark:border-neutral-600 dark:bg-neutral-800/80"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          isHighlight
            ? "bg-neutral-500 text-white dark:bg-neutral-900 dark:text-white"
            : "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
        }`}
      >
        <Arrow />
      </span>

      <motion.div
        variants={{
          initial: { width: 0, opacity: 0 },
          animate: { width: bounds.width || "auto", opacity: 1 },
        }}
        transition={{
          type: "spring",
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2,
        }}
        className="overflow-hidden"
      >
        <div
          ref={measureRef}
          className={`w-max px-2 text-[10px] font-semibold whitespace-nowrap ${
            isHighlight
              ? "text-neutral-900 dark:text-neutral-800"
              : "text-neutral-800 dark:text-neutral-100"
          }`}
        >
          Connect
        </div>
      </motion.div>
    </motion.div>
  );
};

const Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M5 12l4 4" />
      <path d="M5 12l4 -4" />
    </svg>
  );
};
