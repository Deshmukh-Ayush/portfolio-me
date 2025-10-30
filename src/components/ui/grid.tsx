import React from "react";
import { Underline01 } from "./special-effects/hover-underline";

export const Grid = () => {
  return (
    <div className="grid w-full grid-cols-3 py-14 text-neutral-400">
      <div className="flex flex-col justify-start">
        <div>
          <h2 className="text-md text-neutral-700 dark:text-neutral-400">
            Building
          </h2>

          <GridItem
            link="Cloff UI"
            href="https://ui.cloffstudio.com"
            p="Free Copy Paste React Components"
            target="_blank"
          />
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <div>
          <h2 className="text-md text-neutral-700 dark:text-neutral-400">
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
            href="https://www.satverse.in"
            p="AI B2B SaaS for luxury brands."
            target="_blank"
          />
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <div>
          <h2 className="text-md text-neutral-700 dark:text-neutral-400">
            I write too!!!
          </h2>

          <GridItem
            link="Micro-Interactions"
            href="/blogs"
            p="Dive into the latest trendy web designs..."
          />
        </div>
      </div>
    </div>
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
          className="flex text-black dark:text-neutral-100"
          target={target}
        >
          {link}{" "}
        </Underline01>
      </span>
      <p className="text-md text-neutral-600 dark:text-neutral-400">{p}</p>
    </div>
  );
};
