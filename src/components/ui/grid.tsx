import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Grid = () => {
  return (
    <div className="grid w-full grid-cols-3 py-14 text-neutral-400">
      <div className="flex flex-col justify-start">
        <div>
          <h2 className="text-md">Building</h2>

          <GridItem
            link="Cloff UI"
            href="https://ui.cloffstudio.com"
            p="Free Copy Paste React Components"
          />
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <div>
          <h2 className="text-md">Work</h2>

          <GridItem
            link="Cloff Studio"
            href="https://www.cloffstudio.com"
            p="Co-Founder and CTO."
          />
          <GridItem
            link="Cloff UI"
            href="https://ui.cloffstudio.com"
            p="Developed animated component library from scratch."
          />
          <GridItem
            link="Satverse AI"
            href="https://www.satverse.in"
            p="AI B2B SaaS for luxury brands."
          />
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <div>
          <h2 className="text-md">I write too!!!</h2>

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
}: {
  link: string;
  p: string;
  href: string;
}) => {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <Link
        href={href}
        target="_blank"
        className="flex text-neutral-100 underline decoration-neutral-400 underline-offset-4"
      >
        {link}{" "}
        <span className="ml-1">
          <ArrowUpRight className="text-neutral-300" />
        </span>
      </Link>
      <p className="text-md text-neutral-400">{p}</p>
    </div>
  );
};
