"use client";

import { useState, useRef, useEffect } from "react";
import ThemeToggle from "@/components/ui/theme-toggle";
import { motion, AnimatePresence } from "motion/react";

export default function PlaygroundPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      <div className="flex h-100 w-200 items-end justify-center rounded-md border border-neutral-300 bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-950">
        <ConfirmationDialog />
      </div>
    </div>
  );
}

function ConfirmationDialog() {
  const [state, setState] = useState<"initial" | "confirming" | "done">(
    "initial",
  );
  const [isHolding, setIsHolding] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInitialClick = () => {
    setState("confirming");
  };

  const handleCancel = () => {
    setState("initial");
  };

  const handlePointerDown = () => {
    setIsHolding(true);
    timeoutRef.current = setTimeout(() => {
      setState("done");
      setIsHolding(false);

      resetTimeoutRef.current = setTimeout(() => {
        setState("initial");
      }, 2000);
    }, 2000);
  };

  const handlePointerUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHolding(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-40 w-100 flex-col items-center justify-between rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex flex-1 items-center justify-center">
        <p className="text-center text-[15px] leading-snug text-neutral-700 dark:text-neutral-300">
          Are you sure you want to confirm this action?
        </p>
      </div>

      <motion.div layout className="flex w-full items-center gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {state === "confirming" && (
            <motion.button
              key="cancel"
              onClick={handleCancel}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-9 flex-1 items-center justify-center rounded-full border border-neutral-200 bg-transparent text-[13px] font-medium text-neutral-700 hover:bg-neutral-50 active:scale-[0.98] dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              Cancel
            </motion.button>
          )}
        </AnimatePresence>

        {state === "initial" && (
          <motion.button
            layoutId="main-action"
            onClick={handleInitialClick}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-9 w-full items-center justify-center rounded-full bg-neutral-900 text-[13px] font-medium text-white hover:bg-neutral-800 active:scale-[0.98] dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Confirm
          </motion.button>
        )}

        {state === "confirming" && (
          <motion.button
            layoutId="main-action"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-9 flex-1 items-center justify-center overflow-hidden rounded-full bg-neutral-900 text-[13px] font-medium text-white active:scale-[0.97] dark:bg-white dark:text-neutral-900"
          >
            <span
              className={`absolute inset-0 flex items-center justify-center rounded-full bg-cyan-500 text-white transition-all dark:bg-cyan-400 dark:text-neutral-900 ${
                isHolding ? "clip-path-reveal" : "clip-path-hidden"
              }`}
            >
              Hold to Confirm
            </span>
            <span className="relative z-10">Hold to Confirm</span>
          </motion.button>
        )}

        {state === "done" && (
          <motion.button
            layoutId="main-action"
            disabled
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-9 w-full items-center justify-center rounded-full bg-emerald-500 text-[13px] font-medium text-white dark:bg-emerald-400 dark:text-neutral-900"
          >
            Done
          </motion.button>
        )}
      </motion.div>

      <style jsx>{`
        .clip-path-hidden {
          clip-path: inset(0px 100% 0px 0px);
          transition: clip-path 200ms ease-out;
        }
        .clip-path-reveal {
          clip-path: inset(0px 0px 0px 0px);
          transition: clip-path 2s linear;
        }
      `}</style>
    </div>
  );
}
