"use client";

import ThemeToggle from "@/components/ui/theme-toggle";
import { motion, cubicBezier, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function PlaygroundPage() {
  const [open, setOpen] = useState(false);

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

  const clickHandler = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />

      <div className="flex h-100 w-200 items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-950">
        <AnimatePresence mode="popLayout">
          {open ? (
            <motion.div
              layoutId="container"
              key="open"
              onClick={() => setOpen(false)}
              className="flex cursor-pointer items-center justify-between gap-0.5 rounded-full bg-neutral-950 p-2"
            >
              {/* AVATAR - already shared */}
              <motion.div
                layoutId="avatar"
                className="flex items-center justify-center rounded-full bg-neutral-50 p-1"
              >
                <UserIcon className="size-10 text-neutral-400" />
              </motion.div>

              {/* TEXT - reveals with blur */}
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
                {/* WAVEFORMS BUTTON - reveals with blur (new element) */}
                <motion.button
                  initial={{ opacity: 0, filter: "blur(12px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(12px)" }}
                  transition={{ duration: 0.35, delay: 0.25 }}
                  className="flex cursor-pointer items-center justify-center rounded-full bg-orange-400 p-1"
                >
                  <Waveforms className="text-white" />
                </motion.button>

                {/* MENU BUTTON (three dots) - now shares layoutId with the Plus button/icon */}
                <motion.button
                  layoutId="actionButton"
                  className="flex cursor-pointer items-center justify-center rounded-full bg-cyan-400 p-1"
                >
                  <motion.div layoutId="actionIcon">
                    <Menu className="text-white" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              layoutId="container"
              key="closed"
              className="flex cursor-pointer items-center justify-between gap-0.5 rounded-full bg-neutral-950 p-1"
            >
              {/* AVATAR - already shared */}
              <motion.div
                layoutId="avatar"
                className="flex items-center justify-center rounded-full bg-neutral-50 p-1"
              >
                <UserIcon className="text-neutral-400" />
              </motion.div>

              {/* PLUS BUTTON - now shares layoutId with the cyan Menu button */}
              <motion.button
                layoutId="actionButton"
                initial="initial"
                whileHover="hover"
                onClick={clickHandler}
                className="flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-1"
              >
                <motion.div variants={iconVariants} layoutId="actionIcon">
                  <Plus className="text-white" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

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
