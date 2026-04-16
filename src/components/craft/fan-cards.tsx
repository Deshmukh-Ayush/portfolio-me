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
      fanned: { rotate: 0, x: 0, y: 0 }, // Dead Center
    },
    {
      id: 4,
      stacked: { rotate: 6, x: 0, y: 0 },
      fanned: { rotate: 15, x: 80, y: 10 }, // Mid Right
    },
    {
      id: 5,
      stacked: { rotate: 0, x: 0, y: 0 },
      fanned: { rotate: 30, x: 160, y: 40 }, // Far Right
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
          <Card />
        </motion.div>
      ))}
    </motion.div>
  );
};

const Card = () => {
  return (
    <div className="relative flex h-60 w-40 items-center justify-center rounded-[20px] border border-neutral-300 bg-neutral-100 p-1">
      <LinkOpener />
      <div className="h-full w-full overflow-hidden rounded-2xl border border-neutral-300 bg-white p-1">
        <div className="relative h-20 w-full overflow-hidden rounded-xl ring-1 ring-neutral-200/50 ring-inset">
          <Image
            src="/me.png"
            alt="Ayush Deshmukh"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset" />
        </div>

        <div className="p-2">
          <span className="inline-block rounded-full bg-neutral-900 px-2 py-0.5 text-[6px] font-medium tracking-wider text-white uppercase">
            Founder & CEO
          </span>

          <h2 className="mt-1.5 text-xs font-bold text-neutral-800">
            Ayush Deshmukh
          </h2>

          <p className="mt-1 text-[8px] leading-3 text-neutral-500">
            I'm a very cool founder and CEO. I'm 20 right now and I'm absolutely
            crushing it. I have a lot of experience in the industry and I'm
            always looking for new opportunities to grow and learn.
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
          className="w-max px-2 text-[10px] font-medium whitespace-nowrap text-neutral-800"
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
