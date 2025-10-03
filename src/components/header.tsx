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
        <Heading className="text-3xl">Ayush Deshmukh</Heading>
        <Para
          className={`${newsReader.className} mt-2 text-lg dark:text-neutral-400`}
        >
          Design Engineer
        </Para>
      </div>
      <div>
        <Para>
          <span
            className={`${newsReader.className} text-lg text-neutral-800 italic dark:text-neutral-200`}
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
          <Underline href="https://www.satverse.in">Satverse AI.</Underline>
        </Para>
      </div>

      <div className="flex items-center justify-start gap-8 py-6">
        <Chips>X</Chips>
        <Chips>Linkedin</Chips>
        <Chips>Instagram</Chips>
        <Chips>Contact</Chips>
      </div>
    </div>
  );
};
