"use client";

import React, { useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { AnimatePresence, easeInOut, motion, Variants } from "motion/react";
import { cn } from "@/lib/utils";
import useClickOutside from "@/hooks/useOutsideClick";
import {
  IconUser,
  IconMail,
  IconFolder,
  IconWallet,
} from "@tabler/icons-react";

const ITEMS = [
  {
    id: 1,
    label: "User",
    title: <IconUser className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-3">
          <div className="relative h-8 w-8 shrink-0 rounded-lg bg-linear-to-br from-blue-500 to-cyan-700 ring-1 ring-black/10 dark:ring-white/10"></div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-balance text-neutral-900 antialiased dark:text-neutral-100">
              everywhereayush
            </span>
            <span className="text-[10px] font-medium text-neutral-500 antialiased dark:text-neutral-400">
              Building Scrunity AI
            </span>
          </div>
        </div>
        <button
          className="relative flex h-8 w-full scale-100 appearance-none items-center justify-center rounded-lg px-2 text-xs font-medium text-neutral-600 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-all duration-150 select-none hover:text-neutral-900 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] focus-visible:ring-2 active:scale-[0.98] dark:text-neutral-400 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.07),0px_1px_2px_-1px_rgba(0,0,0,0.3),0px_2px_4px_0px_rgba(0,0,0,0.25)] dark:hover:text-neutral-100 dark:hover:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.10),0px_1px_2px_-1px_rgba(0,0,0,0.35),0px_2px_4px_0px_rgba(0,0,0,0.3)]"
          type="button"
        >
          Account Settings
        </button>
      </div>
    ),
  },
  {
    id: 2,
    label: "Messages",
    title: <IconMail className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-500 antialiased dark:text-neutral-400">
            Inbox
          </span>
          <span className="rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            2 New
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex cursor-default items-center space-x-2 text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[9px] font-bold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
              S
            </div>
            {/* tabular-nums applied globally; text-balance for short strings */}
            <span className="truncate text-xs antialiased">
              API keys rotated for production
            </span>
          </div>
          <div className="flex cursor-default items-center space-x-2 text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[9px] font-bold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
              M
            </div>
            <span className="truncate text-xs antialiased">
              New feedback on user interfade
            </span>
          </div>
        </div>
        <button
          className="relative mt-1 flex h-8 w-full scale-100 appearance-none items-center justify-center rounded-lg px-2 text-xs font-medium text-neutral-600 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-all duration-150 select-none hover:text-neutral-900 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] focus-visible:ring-2 active:scale-[0.98] dark:text-neutral-400 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.07),0px_1px_2px_-1px_rgba(0,0,0,0.3),0px_2px_4px_0px_rgba(0,0,0,0.25)] dark:hover:text-neutral-100 dark:hover:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.10),0px_1px_2px_-1px_rgba(0,0,0,0.35),0px_2px_4px_0px_rgba(0,0,0,0.3)]"
          type="button"
        >
          Open Inbox
        </button>
      </div>
    ),
  },
  {
    id: 3,
    label: "Documents",
    title: <IconFolder className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-3">
        <div className="text-xs font-medium text-neutral-500 antialiased dark:text-neutral-400">
          Recent Boards
        </div>
        <div className="flex flex-col space-y-2">
          <div className="group flex cursor-pointer items-center justify-between">
            <span className="truncate text-xs text-neutral-600 antialiased transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100">
              Scrunity_Architecture.draw
            </span>
            <span className="scale-95 text-[10px] font-medium text-blue-600 opacity-0 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 dark:text-blue-400">
              Edit
            </span>
          </div>
          <div className="group flex cursor-pointer items-center justify-between">
            <span className="truncate text-xs text-neutral-600 antialiased transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100">
              CRM_Schema_v2.canvas
            </span>
            <span className="scale-95 text-[10px] font-medium text-blue-600 opacity-0 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 dark:text-blue-400">
              Edit
            </span>
          </div>
        </div>
        <button
          className="relative mt-1 flex h-8 w-full scale-100 appearance-none items-center justify-center rounded-lg px-2 text-xs font-medium text-neutral-600 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-all duration-150 select-none hover:text-neutral-900 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] focus-visible:ring-2 active:scale-[0.98] dark:text-neutral-400 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.07),0px_1px_2px_-1px_rgba(0,0,0,0.3),0px_2px_4px_0px_rgba(0,0,0,0.25)] dark:hover:text-neutral-100 dark:hover:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.10),0px_1px_2px_-1px_rgba(0,0,0,0.35),0px_2px_4px_0px_rgba(0,0,0,0.3)]"
          type="button"
        >
          + New Board
        </button>
      </div>
    ),
  },
  {
    id: 4,
    label: "Wallet",
    title: <IconWallet className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-3">
        <div className="flex items-end justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-medium text-neutral-500 antialiased dark:text-neutral-400">
              API Credits
            </span>
            <div className="mt-0.5">
              {/* tabular-nums so digits don't shift as values animate */}
              <span className="text-sm font-semibold text-neutral-900 tabular-nums antialiased dark:text-neutral-100">
                $45.00{" "}
              </span>
              <span className="text-[10px] font-medium text-neutral-400 tabular-nums dark:text-neutral-500">
                / $100
              </span>
            </div>
          </div>
          <span className="text-[10px] font-medium text-emerald-600 tabular-nums dark:text-emerald-400">
            45%
          </span>
        </div>
        {/* Progress bar — concentric radius: outer bar is rounded-full, inner fill matches */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700">
          <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400" />
        </div>
        <button
          className="relative mt-1 flex h-8 w-full scale-100 appearance-none items-center justify-center rounded-lg px-2 text-xs font-medium text-neutral-600 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-all duration-150 select-none hover:text-neutral-900 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] focus-visible:ring-2 active:scale-[0.98] dark:text-neutral-400 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.07),0px_1px_2px_-1px_rgba(0,0,0,0.3),0px_2px_4px_0px_rgba(0,0,0,0.25)] dark:hover:text-neutral-100 dark:hover:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.10),0px_1px_2px_-1px_rgba(0,0,0,0.35),0px_2px_4px_0px_rgba(0,0,0,0.3)]"
          type="button"
        >
          Add Funds
        </button>
      </div>
    ),
  },
];

const TRANSITION = { duration: 0.2, ease: easeInOut } as const;

const contentVariants: Variants = {
  initial: (d: number) => ({
    x: d * 16,
    skewX: d * 5,
    opacity: 0,
    filter: "blur(3px)",
  }),
  animate: {
    x: 0,
    skewX: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (d: number) => ({
    x: d * -16,
    skewX: d * -5,
    opacity: 0,
    filter: "blur(3px)",
  }),
};

export const Toolbar = () => {
  const [active, setActive] = useState<number | null>(null);
  const prevActiveRef = useRef<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [contentRef, { height: heightContent }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(ref as React.RefObject<HTMLElement>, () => {
    setIsOpen(false);
    setActive(null);
    prevActiveRef.current = null;
  });

  const handleSelect = (id: number) => {
    if (prevActiveRef.current !== null) {
      const prevIndex = ITEMS.findIndex((i) => i.id === prevActiveRef.current);
      const nextIndex = ITEMS.findIndex((i) => i.id === id);
      setDirection(nextIndex > prevIndex ? 1 : -1);
    } else {
      setDirection(1);
    }

    if (!isOpen) setIsOpen(true);

    if (active === id) {
      setIsOpen(false);
      setActive(null);
      prevActiveRef.current = null;
      return;
    }

    prevActiveRef.current = id;
    setActive(id);
  };

  return (
    <div ref={ref}>
      {/*
        Outer container uses shadow instead of a solid border.
        Concentric radius: outer rounded-xl (12px), inner content panel
        and buttons use rounded-lg (8px) = 12px - 4px padding ✓
      */}
      <div
        className="rounded-xl bg-white antialiased shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04),0px_4px_12px_0px_rgba(0,0,0,0.05)] dark:bg-neutral-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.4),0px_2px_4px_0px_rgba(0,0,0,0.35),0px_4px_12px_0px_rgba(0,0,0,0.5)]"
        style={{ width: "max-content" }}
      >
        {/* Content panel */}
        <div className="overflow-hidden">
          <AnimatePresence initial={false} mode="sync">
            {isOpen && (
              <motion.div
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: heightContent || 0, opacity: 1 }}
                // Subtle exit — less travel than enter, doesn't demand attention
                exit={{ height: 0, opacity: 0 }}
                transition={TRANSITION}
              >
                <div ref={contentRef} className="overflow-hidden">
                  <AnimatePresence
                    mode="popLayout"
                    initial={false}
                    custom={direction}
                  >
                    {active !== null &&
                      ITEMS.filter((item) => item.id === active).map((item) => (
                        <motion.div
                          key={item.id}
                          custom={direction}
                          variants={contentVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={TRANSITION}
                        >
                          <div className="p-2">
                            <div className="px-2 pt-2 text-sm text-neutral-900 dark:text-neutral-100">
                              {item.content}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isOpen && (
          <div className="mx-2 h-px bg-neutral-950/[0.06] dark:bg-white/[0.06]" />
        )}

        {/* Toolbar */}
        <div className="flex space-x-1 p-2">
          {ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                aria-label={item.label}
                className={cn(
                  // Concentric radius: buttons are rounded-lg (8px) inside the rounded-xl (12px) shell
                  "relative flex h-9 shrink-0 appearance-none items-center justify-center gap-1.5 rounded-lg px-2 text-neutral-500 transition-all duration-150 select-none focus-visible:ring-2 active:scale-[0.98] dark:text-neutral-400",
                  // Hover: shadow-based highlight instead of solid bg
                  "hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-200",
                  isActive
                    ? "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                    : "",
                )}
                type="button"
                onClick={() => handleSelect(item.id)}
              >
                {/* Icon animates contextually: scale + opacity on active */}
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center transition-all duration-150",
                    isActive ? "scale-100 opacity-100" : "scale-95 opacity-70",
                  )}
                >
                  {item.title}
                </span>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      key="label"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={TRANSITION}
                      className="overflow-hidden text-xs font-medium whitespace-nowrap antialiased"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
