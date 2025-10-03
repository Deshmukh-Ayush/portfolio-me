import React from "react";
import { Para } from "./ui/para";

export const Now = () => {
  return (
    <div className="py-10 dark:text-neutral-100">
      <Para className="flex w-full justify-between">What is Ayush doing?</Para>
      <Para className="mt-8">
        Apart from building and working I like to study a lot of design from top
        designers.
      </Para>
      <Para>
        Sometimes I just wonder everything we are seeing right now is someone's
        life worth of work.
      </Para>
    </div>
  );
};
