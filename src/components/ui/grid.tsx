"use client";

import React from "react";
import { Underline01 } from "./special-effects/hover-underline";
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

const itemVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)", y: 6 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export const Grid = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid w-full grid-cols-3 py-14 text-neutral-400"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col justify-start"
      >
        <div>
          <h2 className="md:text-md text-sm text-neutral-700 dark:text-neutral-400">
            Building
          </h2>
          <GridItem
            link="Scrunity AI"
            href="https://scrunity.com"
            p="AI Canvas to brainstorm, and clarify your ideas."
            target="_blank"
          />
          <GridItem
            link="Craft"
            href="/craft"
            p="I like to craft things and steal designs."
            target="_blank"
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col justify-start"
      >
        <div>
          <h2 className="md:text-md text-sm text-neutral-700 dark:text-neutral-400">
            Work
          </h2>
          <GridItem
            link="Cloff Studio"
            href="https://www.cloffstudio.com"
            p="Co-Founder and CTO."
            target="_blank"
          />
          <GridItem
            link="Satverse AI"
            href="https://satverse.in/"
            p="AI B2B SaaS for luxury brands."
            target="_blank"
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col justify-start"
      >
        <div>
          <h2 className="md:text-md text-sm text-neutral-700 dark:text-neutral-400">
            I write too!!!
          </h2>
          <GridItem
            link="Design Engineering"
            href="/writing/the-rise-of-design-engineering"
            p="The rise of design engineering"
          />
          <GridItem
            link="Demystifying next/image"
            href="/writing/everything-you-know-about-next-image-is-wrong"
            p="Disecting next/image"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const GridItem = ({
  link,
  p,
  href,
  target,
}: {
  link: string;
  p: string;
  href: string;
  target?: string;
}) => {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <span className="inline-flex">
        <Underline01
          href={href}
          className="md:text-md flex text-sm text-black dark:text-neutral-100"
          target={target}
        >
          {link}{" "}
        </Underline01>
      </span>
      <p className="md:text-md text-sm text-neutral-600 dark:text-neutral-400">
        {p}
      </p>
    </div>
  );
};
