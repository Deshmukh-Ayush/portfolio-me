import React from "react";
import { Para } from "./ui/para";
import { Underline } from "./ui/special-effects/hover-underline";

export const Now = () => {
  return (
    <div className="py-10 dark:text-neutral-100">
      <Para className="flex w-full justify-between">What is Ayush doing?</Para>
      <Para className="mt-8">
        Apart from building and working I like to study a lot of design from top
        designers across the globe.
      </Para>
      <Para className="mt-4">
        Trying to breakthrough on social media probably X and instagram. I'll
        might post frontend tutorials on instagram as well in the future.
      </Para>
      <Para className="mt-4">
        Currently reading{" "}
        <Underline href="https://www.amazon.in/Design-Everyday-Things-Don-Norman/dp/0465050654">
          The Design of Everyday Things by Don Norman.
        </Underline>
      </Para>
    </div>
  );
};
