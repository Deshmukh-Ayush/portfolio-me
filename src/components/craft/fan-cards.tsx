"use client";

import React from "react";
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
  const stackData = [
    {
      id: 1,
      stacked: { rotate: 8, x: 0, y: 0 },
      fanned: { rotate: -30, x: -160, y: 40 }, // Far Left
    },
    {
      id: 2,
      stacked: { rotate: -4, x: 0, y: 0 },
      fanned: { rotate: -15, x: -80, y: 10 }, // Mid Left
    },
    {
      id: 3,
      stacked: { rotate: -8, x: 0, y: 0 },
      fanned: { rotate: 30, x: 160, y: 40 }, // Far right
    },
    {
      id: 4,
      stacked: { rotate: 6, x: 0, y: 0 },
      fanned: { rotate: 15, x: 80, y: 10 }, // Mid Right
    },
    {
      id: 5,
      stacked: { rotate: 0, x: 0, y: 0 },
      fanned: { rotate: 0, x: 0, y: 0 }, // Far Right
    },
  ];

  const cardDetails = [
    {
      id: 1,
      src: "/cloff-ui-ss.png",
      title: "Motion Designer",
      name: "Harry Kane",
      description:
        "Balancing product vision, design systems, and engineering craft to create digital experiences that feel polished and intuitive.",
    },
    {
      id: 2,
      src: "/rick-rubin.jpg",
      title: "Creative Director",
      name: "Mina Patel",
      description:
        "Designing visual systems and motion language that bring storytelling, brand confidence, and delightful detail to digital products.",
    },
    {
      id: 3,
      src: "/pencil.png",
      title: "Product Strategist",
      name: "Noah Kim",
      description:
        "Translating user research and business goals into interaction patterns, content flow, and launch-ready product roadmaps.",
    },
    {
      id: 4,
      src: "/og-image.png",
      title: "UX Lead",
      name: "Sofia Reyes",
      description:
        "Refining interfaces with accessibility-first thinking, fast feedback loops, and pixel-perfect execution across every screen.",
    },
    {
      id: 5,
      src: "/me.png",
      title: "Design Engineer & CEO",
      name: "Ayush Deshmukh",
      description:
        "Building elegant interaction systems that feel responsive, effortless, and polished from the first hover to the final tap.",
    },
  ];

  return (
    <motion.div
      initial="stacked"
      whileHover="fanned"
      className="relative flex min-h-150 w-full cursor-pointer items-center justify-center"
    >
      {stackData.map((card, index) => (
        <motion.div
          key={card.id}
          variants={{
            stacked: {
              rotate: card.stacked.rotate,
              x: card.stacked.x,
              y: card.stacked.y,
            },
            fanned: {
              rotate: card.fanned.rotate,
              x: card.fanned.x,
              y: card.fanned.y,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 19,
            mass: 1.2,
          }}
          className="absolute origin-bottom rounded-[20px]"
          style={{ zIndex: index * 10 }}
        >
          <Card
            src={cardDetails[index].src}
            title={cardDetails[index].title}
            name={cardDetails[index].name}
            description={cardDetails[index].description}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

const Card = ({
  src,
  title,
  name,
  description,
}: {
  src: string;
  title: string;
  name: string;
  description: string;
}) => {
  return (
    <div className="relative flex h-60 w-40 items-center justify-center rounded-[20px] border border-neutral-300 bg-neutral-100 p-1">
      <LinkOpener />
      <div className="h-full w-full overflow-hidden rounded-2xl border border-neutral-300 bg-white p-1">
        <div className="relative h-20 w-full overflow-hidden rounded-xl ring-1 ring-neutral-200/50 ring-inset">
          <Image src={src} alt={name} fill className="object-cover" />
          <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset" />
        </div>

        <div className="p-2">
          <span className="inline-block rounded-full bg-neutral-900 px-2 py-0.5 text-[6px] font-medium tracking-wider text-white uppercase">
            {title}
          </span>

          <h2 className="mt-1.5 text-xs font-bold text-neutral-800">{name}</h2>

          <p className="mt-1 text-[8px] leading-3 text-neutral-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const LinkOpener = () => {
  const [measureRef, bounds] = useMeasure();

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="absolute top-2 left-2 z-50 flex w-fit cursor-pointer items-center rounded-full border border-neutral-300 bg-white/80 p-1 backdrop-blur-sm"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
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
          className="w-max px-2 text-[10px] font-semibold whitespace-nowrap text-neutral-800"
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M5 12l4 4" />
      <path d="M5 12l4 -4" />
    </svg>
  );
};
