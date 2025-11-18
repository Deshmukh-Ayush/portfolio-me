import { cn } from "@/lib/utils";
import { Heading } from "./ui/heading";
import { Para } from "./ui/para";
import { Newsreader } from "next/font/google";
import { Underline } from "./ui/special-effects/hover-underline";
import { Chips } from "./ui/chips";

const newsReader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
});

export const Header = ({ className }: { className?: string }) => {
  return (
    <div className={cn("grid grid-cols-1 grid-rows-3", className)}>
      <div>
        <Heading className="text-xl md:text-3xl">Ayush Deshmukh</Heading>
        <Para
          className={`${newsReader.className} mt-2 text-lg dark:text-neutral-400`}
        >
          Design Engineer
        </Para>
      </div>
      <div>
        <Para>
          <span
            className={`${newsReader.className} text-md text-neutral-800 italic md:text-lg dark:text-neutral-200`}
          >
            Designing for the community
          </span>
          , making the digital experience aesthetically pleasing. <br />
          <Underline href="/" className="underline underline-offset-5">
            Building Cloff UI
          </Underline>{" "}
          and Co-Founder and CTO of{" "}
          <Underline href="/" className="underline underline-offset-5">
            Cloff Studio
          </Underline>
          .
        </Para>
        <Para className="mt-10">
          In the past I have developed the complete frontend architecture for{" "}
          <Underline
            href="https://www.satverse.in"
            className="underline underline-offset-5"
          >
            Satverse AI.
          </Underline>
        </Para>
      </div>

      <div className="flex flex-wrap items-center justify-start gap-4 py-4 sm:justify-center sm:gap-6 sm:py-5 md:justify-start md:gap-8 md:py-6">
        <Chips href="https://x.com/everywhereayush">X</Chips>
        <Chips href="https://www.linkedin.com/in/ayush-deshmukh-144a86277/">
          Linkedin
        </Chips>
        <Chips href="https://instagram.com/everywhereayush">Instagram</Chips>
        <Chips href="mailto:ayushdeshmukh301@gmail.com">Contact</Chips>
      </div>
    </div>
  );
};
