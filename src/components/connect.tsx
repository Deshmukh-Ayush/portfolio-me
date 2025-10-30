import React from "react";
import { Para } from "./ui/para";
import { Underline } from "./ui/special-effects/hover-underline";

export const Connect = () => {
  return (
    <div className="py-10 dark:text-neutral-100">
      <Para className="flex w-full justify-between">Connect</Para>
      <Para className="mt-8 dark:text-neutral-400">
        Reach me at{" "}
        <span className="flex gap-4">
          <Underline
            href="https://x.com/everywhereayush"
            className="dark:text-neutral-100"
          >
            @everywhereayush
          </Underline>
          <Underline
            className="dark:text-neutral-100"
            href="mailto:ayushdeshmukh301@gmail.com"
          >
            ayushdeshmukh301@gmail.com
          </Underline>
        </span>
      </Para>
    </div>
  );
};
