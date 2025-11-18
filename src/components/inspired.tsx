import React from "react";
import { Para } from "./ui/para";
import { Underline } from "./ui/special-effects/hover-underline";
import { Newsreader } from "next/font/google";

const newsReader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
});

export const Now = () => {
  return (
    <div className="py-10 dark:text-neutral-100">
      <Para className="text-black">Who is Ayush?</Para>
      <Para className="mt-8">
        Hi!{" "}
        <span className={`${newsReader.className} text-lg`}>
          {" "}
          I am Ayush Deshmukh
        </span>
        , A Design Engineer by passion and profession. I am 20 right now and
        currently in 3rd year of my engineering, and I&apos;m dropping college
        soon.
      </Para>
      <Para className="mt-4">
        I started my journey as a frontend developer and then full-stack, I
        developed web and cross platform applications as well. And finally got a
        <span className={`${newsReader.className} text-lg`}>
          {" "}
          keen interest in design engineering.
        </span>
      </Para>
      <Para className="mt-20 text-black">What is Ayush doing?</Para>
      <Para className="mt-8">
        Currently{" "}
        <span className={`${newsReader.className} text-lg`}>
          I&apos;m working on Cloff AI
        </span>
        , which is an complete frontend replacement for any company that wants
        to automate their frontend itself.
      </Para>
      <Para className="mt-4">
        Apart from building and working{" "}
        <span className={`${newsReader.className} text-lg`}>
          I like to study a lot of design
        </span>{" "}
        from top designers across the globe.
      </Para>
      <Para className="mt-4">
        <span className={`${newsReader.className} text-lg`}>
          Trying to breakthrough on social media
        </span>{" "}
        probably X and instagram. I&apos;ll might post frontend tutorials on
        instagram as well in the future.
      </Para>
      <Para className="mt-4">
        I like to work a lot, Nowadays I am writing too and creating designs too
        I don&apos;t feel the need of creating behance profiles etc since my
        work will be sooner be live on Cloff UI.
      </Para>
      <Para className="mt-4">
        Currently reading{" "}
        <Underline
          href="https://www.amazon.in/Design-Everyday-Things-Don-Norman/dp/0465050654"
          className={`${newsReader.className} text-lg underline underline-offset-8`}
        >
          The Design of Everyday Things by Don Norman.
        </Underline>
      </Para>
    </div>
  );
};
