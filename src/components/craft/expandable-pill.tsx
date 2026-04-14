"use client";

import React from "react";
import ThemeToggle from "@/components/ui/theme-toggle";
import { motion, cubicBezier, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, ArrowLeft, FileText, Linkedin } from "lucide-react";
import Link from "next/link";

type ViewState = "closed" | "open" | "menu" | "waveform";

function HoverIcon({
  label,
  Icon,
  onClick,
  href,
}: {
  label: string;
  Icon: React.ElementType;
  onClick?: () => void;
  href?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      layout
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full p-1.5 transition-colors outline-none hover:bg-neutral-800 focus-visible:bg-neutral-800"
    >
      <motion.div layout>
        <Icon className="size-5 text-neutral-400 transition-colors" />
      </motion.div>

      <AnimatePresence initial={false}>
        {isHovered && (
          <motion.div
            initial={{ width: 0, opacity: 0, filter: "blur(4px)" }}
            animate={{ width: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ width: 0, opacity: 0, filter: "blur(4px)" }}
            transition={{
              width: { type: "spring", bounce: 0, duration: 0.4 },
              opacity: { duration: 0.15, ease: "easeOut" },
              filter: { duration: 0.15, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <div className="pr-1 pl-2 text-sm whitespace-nowrap text-neutral-200">
              {href ? (
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                </Link>
              ) : (
                label
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export const ExpandablePill = () => {
  const [view, setView] = useState<ViewState>("closed");

  const iconVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: 1080,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.895, 0.03, 0.685, 0.22),
      },
    },
  };
  return (
    <AnimatePresence mode="popLayout">
      {(() => {
        switch (view) {
          case "closed":
            return (
              <motion.div
                layoutId="container"
                key="closed"
                className="flex cursor-pointer items-center justify-between gap-0.5 rounded-full bg-neutral-950 p-1"
              >
                <motion.div
                  layoutId="avatar"
                  className="flex items-center justify-center rounded-full bg-neutral-50 p-1"
                >
                  <UserIcon className="text-neutral-400" />
                </motion.div>

                <motion.button
                  layoutId="actionButton"
                  initial="initial"
                  whileHover="hover"
                  onClick={() => setView("open")}
                  className="flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-1"
                >
                  <motion.div variants={iconVariants} layoutId="actionIcon">
                    <Plus className="text-white" />
                  </motion.div>
                </motion.button>
              </motion.div>
            );

          case "open":
            return (
              <motion.div
                layoutId="container"
                key="open"
                className="flex items-center justify-between gap-0.5 rounded-full bg-neutral-950 p-2"
              >
                <motion.div
                  layoutId="avatar"
                  onClick={() => setView("closed")}
                  className="flex cursor-pointer items-center justify-center rounded-full bg-neutral-50 p-1"
                >
                  <UserIcon className="size-10 text-neutral-400" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, filter: "blur(12px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(12px)" }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="mr-8 flex flex-col items-center justify-center px-4"
                >
                  <p className="leading-none text-neutral-700">Hi I'm</p>
                  <p className="text-neutral-100">Ayush</p>
                </motion.div>

                <div className="flex items-center justify-center gap-3">
                  <motion.button
                    layoutId="waveformButton"
                    initial={{ opacity: 0, filter: "blur(12px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(12px)" }}
                    transition={{ duration: 0.35, delay: 0.25 }}
                    onClick={() => setView("waveform")}
                    className="flex cursor-pointer items-center justify-center rounded-full bg-orange-400 p-1"
                  >
                    <motion.div layoutId="waveformIcon">
                      <Waveforms className="text-white" />
                    </motion.div>
                  </motion.button>

                  <motion.button
                    layoutId="actionButton"
                    onClick={() => setView("menu")}
                    className="flex cursor-pointer items-center justify-center rounded-full bg-cyan-400 p-1"
                  >
                    <motion.div layoutId="actionIcon">
                      <Menu className="text-white" />
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            );

          case "menu":
            return (
              <motion.div
                layoutId="container"
                key="menu"
                className="flex items-center justify-between gap-4 rounded-full bg-neutral-950 p-2 px-4 shadow-lg"
              >
                <motion.div
                  initial={{ opacity: 0, filter: "blur(8px)", x: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                  exit={{ opacity: 0, filter: "blur(8px)", x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-1"
                >
                  <HoverIcon
                    onClick={() => setView("open")}
                    label="Back"
                    Icon={ArrowLeft}
                  />
                  <HoverIcon
                    href="www.everywhereayush.in"
                    label="Portfolio"
                    Icon={FileText}
                  />
                  <HoverIcon
                    href="x.com/everywhereayush"
                    label="Twitter"
                    Icon={X}
                  />
                  <HoverIcon
                    href="www.linkedin.com/in/everywhereayush"
                    label="LinkedIn"
                    Icon={Linkedin}
                  />
                </motion.div>
              </motion.div>
            );
          case "waveform":
            return (
              <motion.div
                layoutId="container"
                key="waveform"
                className="flex w-64 flex-col gap-4 rounded-3xl bg-neutral-950 p-5 shadow-xl"
              >
                <div className="flex w-full items-center justify-between">
                  <motion.div
                    layoutId="avatar"
                    className="flex items-center justify-center rounded-full bg-neutral-50 p-1"
                  >
                    <UserIcon className="size-6 text-neutral-400" />
                  </motion.div>

                  <motion.button
                    layoutId="waveformButton"
                    onClick={() => setView("open")}
                    className="flex cursor-pointer items-center justify-center rounded-full bg-neutral-700 p-1"
                  >
                    <motion.div layoutId="waveformIcon">
                      <X className="text-white" />
                    </motion.div>
                  </motion.button>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="text-sm text-neutral-300"
                >
                  Hi I'm Ayush, A Design Engineer and a founder, based in India.
                  I have a passion for creating intuitive and delightful user
                  experiences. I have a background in product design and
                  engineering, and I love to explore the intersection of design
                  and technology.
                </motion.p>
              </motion.div>
            );

          default:
            return null;
        }
      })()}
    </AnimatePresence>
  );
};

const UserIcon = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`icon icon-tabler icons-tabler-outline icon-tabler-user ${className}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
      <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
    </svg>
  );
};

const Plus = ({ className }: { className: string }) => {
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
      className={`icon icon-tabler icons-tabler-plus ${className}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
    </svg>
  );
};

const Waveforms = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M56,96v64a8,8,0,0,1-16,0V96a8,8,0,0,1,16,0ZM88,24a8,8,0,0,0-8,8V224a8,8,0,0,0,16,0V32A8,8,0,0,0,88,24Zm40,32a8,8,0,0,0-8,8V192a8,8,0,0,0,16,0V64A8,8,0,0,0,128,56Zm40,32a8,8,0,0,0-8,8v64a8,8,0,0,0,16,0V96A8,8,0,0,0,168,88Zm40-16a8,8,0,0,0-8,8v96a8,8,0,0,0,16,0V80A8,8,0,0,0,208,72Z"></path>
    </svg>
  );
};

const Menu = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z"></path>
    </svg>
  );
};
