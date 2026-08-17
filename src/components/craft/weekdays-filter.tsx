"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

export const WeekdaysFilter = () => {
  const [isRepeating, setIsRepeating] = useState(false);
  const [markedDays, setMarkedDays] = useState<string[]>([]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleRepeating = (checked: boolean) => {
    setIsRepeating(checked);

    if (checked) {
      const count = Math.floor(Math.random() * 4) + 1;

      const randomDays = [...days]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);

      setMarkedDays(randomDays);
    } else {
      setMarkedDays([]);
    }
  };

  return (
    <div className="shadow-border h-44 w-74 rounded-xl bg-neutral-50 p-2 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="shadow-border-sm flex h-full w-full flex-col items-center justify-center rounded-lg bg-white p-3 dark:bg-neutral-950">
        <div className="flex h-10 w-full items-center justify-between">
          <span>Is Repeating</span>

          <label className="relative inline-flex cursor-pointer items-center select-none">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={isRepeating}
              onChange={(e) => toggleRepeating(e.target.checked)}
            />

            {/* Track */}
            <div className="shadow-border-sm h-4.5 w-8 rounded-full bg-neutral-200/80 transition duration-300 ease-in-out peer-checked:bg-green-500 peer-focus-visible:ring-1 peer-focus-visible:ring-neutral-400/50 peer-focus-visible:ring-offset-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-40 dark:bg-neutral-800 dark:peer-checked:bg-green-500 dark:peer-focus-visible:ring-neutral-500/50 dark:peer-focus-visible:ring-offset-neutral-950" />

            {/* Thumb */}
            <div className="shadow-border-sm absolute top-[3px] left-[3px] h-3 w-3 rounded-full bg-white transition-all duration-150 ease-in-out peer-checked:translate-x-3.5 dark:bg-neutral-100" />
          </label>
        </div>

        <div className="mb-2 flex h-17 w-full items-end justify-between gap-2 py-1">
          <button className="mb-0.5 cursor-pointer rounded-2xl border-neutral-300 px-3 py-1 text-sm dark:border-neutral-700 dark:text-neutral-200">
            Repeat
          </button>

          <button className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-200 px-3 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
            <span>Weekly</span>
            <HugeiconsIcon icon={ArrowDown01Icon} />
          </button>
        </div>

        <div className="h-13 w-full">
          <WeekFIlter isRepeating={isRepeating} markedDays={markedDays} />
        </div>
      </div>
    </div>
  );
};

interface WeekFilterProps {
  isRepeating: boolean;
  markedDays: string[];
}

const WeekFIlter = ({ isRepeating, markedDays }: WeekFilterProps) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex h-full w-full items-center justify-center gap-1 rounded-md">
      {days.map((day) => {
        const isMarked = markedDays.includes(day);

        return (
          <div key={day} className="h-8 w-8 overflow-hidden rounded-md">
            <motion.div
              className="flex w-full flex-col"
              animate={{
                y: isRepeating && isMarked ? -32 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.69, -0.02, 0.41, 1],
              }}
            >
              {/* OFF */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[10px] text-neutral-700 dark:text-neutral-400">
                {day}
              </div>

              {/* ON */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-[10px] text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
                {day}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
