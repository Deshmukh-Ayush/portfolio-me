"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { useSound } from "@web-kits/audio/react";
import { minimal } from "../../../.web-kits";

export const WeekdaysFilter = () => {
  const [isRepeating, setIsRepeating] = useState(false);
  const [markedDays, setMarkedDays] = useState<string[]>([]);
  const [notRepeatingDays, setNotRepeatingDays] = useState<string[]>([]);

  const playToggleOn = useSound(minimal.toggleOn);
  const playToggleOff = useSound(minimal.toggleOff);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getRandomDays = () => {
    const count = Math.floor(Math.random() * 4) + 1;

    return [...days].sort(() => Math.random() - 0.5).slice(0, count);
  };

  const toggleRepeating = (checked: boolean) => {
    setIsRepeating(checked);

    if (checked) {
      playToggleOn();
      setMarkedDays(getRandomDays());
    } else {
      playToggleOff();
      setNotRepeatingDays(getRandomDays());
    }
  };

  return (
    <div className="shadow-border w-74 rounded-xl bg-neutral-50 p-2 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="shadow-border-sm flex w-full flex-col gap-4 rounded-lg bg-white p-3 dark:bg-[oklch(0.205_0_0)]">
        <div className="flex min-h-10 items-center justify-between">
          <span className="text-sm">Is Repeating</span>

          <label className="relative inline-flex cursor-pointer items-center select-none before:absolute before:top-1/2 before:left-1/2 before:h-11 before:w-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']">
            <input
              type="checkbox"
              aria-label="Repeat"
              className="peer sr-only"
              checked={isRepeating}
              onChange={(e) => toggleRepeating(e.target.checked)}
            />

            {/* Track */}
            <div className="shadow-border-sm h-4.5 w-8 rounded-full bg-neutral-200/80 transition-colors duration-300 ease-in-out peer-checked:bg-green-500 peer-focus-visible:ring-1 peer-focus-visible:ring-neutral-400/50 peer-focus-visible:ring-offset-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-40 dark:bg-neutral-800 dark:peer-checked:bg-green-500 dark:peer-focus-visible:ring-neutral-500/50 dark:peer-focus-visible:ring-offset-neutral-950" />

            {/* Thumb */}
            <div className="shadow-border-sm absolute top-[3px] left-[3px] h-3 w-3 rounded-full bg-white transition-transform duration-150 ease-in-out peer-checked:translate-x-3.5 dark:bg-neutral-100" />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button className="shrink-0 cursor-pointer rounded-2xl border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:text-neutral-200">
            Repeat
          </button>

          <button className="flex min-w-0 flex-1 cursor-pointer items-center justify-between rounded-lg border border-neutral-200 px-3 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
            <span>Weekly</span>
            <HugeiconsIcon icon={ArrowDown01Icon} />
          </button>
        </div>

        <WeekFIlter
          isRepeating={isRepeating}
          markedDays={markedDays}
          notRepeatingDays={notRepeatingDays}
        />
      </div>
    </div>
  );
};

interface WeekFilterProps {
  isRepeating: boolean;
  markedDays: string[];
  notRepeatingDays: string[];
}

const WeekFIlter = ({
  isRepeating,
  markedDays,
  notRepeatingDays,
}: WeekFilterProps) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex w-full items-center justify-center gap-1 rounded-md">
      {days.map((day) => {
        const isMarked = isRepeating
          ? markedDays.includes(day)
          : notRepeatingDays.includes(day);

        return (
          <div
            key={day}
            className="h-8 w-8 shrink-0 overflow-hidden rounded-md"
          >
            <motion.div
              className="flex w-full flex-col"
              animate={{
                y: isMarked ? -32 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.69, -0.02, 0.41, 1],
              }}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[10px] text-neutral-700 dark:text-neutral-400">
                {day}
              </div>

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-[10px] text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
                {day}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
