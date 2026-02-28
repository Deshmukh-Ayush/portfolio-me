"use client";

import Container from "@/components/container";
import { Footer } from "@/components/footer";
import { BackBtn } from "@/components/ui/back-btn";
import { Heading } from "@/components/ui/heading";
import { Para } from "@/components/ui/para";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { Clock } from "@/components/ui/special-effects/sliding-numbers";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Newsreader } from "next/font/google";

const newsReader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
});

export default function MicroInteractionBlog() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <Clock className="fixed top-4 right-4 hidden md:block" />
      <MusicToggleButton className="fixed right-4 bottom-2 hidden md:block" />
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      <BackBtn href="/writing" />

      <Container className="bg-neutral-100 dark:bg-neutral-950">
        <Heading className="mb-8 text-xl md:text-3xl">
          The Rise of Design Engineering.
        </Heading>
        <Para className="mb-6">
          In this blog we'll discover what design engineering is and why it is
          suddenly becoming so popular. We'll also explore the benefits of
          design engineering and how it can help teams create better products.
        </Para>

        <Para className="mb-6">Okay so let's start....</Para>

        <Para>
          Everyone cares about there prodcut so much and day by day attempts to
          improve it and thus we've got two types of people in a company.
        </Para>
        <Para className="ml-2">1. Who cares about how things look.</Para>
        <Para className="mb-6 ml-2">2. Who cares about how things work.</Para>
        <Para className="mb-8">
          And clearly we've got a GAP and there is a space for improvement.
        </Para>

        <Heading>GAP</Heading>
        <Para className="mb-6">
          Believe me or not this gap is big. Let me try to explain it in simpler
          words.
        </Para>
        <Para className="mb-6">
          When working in a company, there are multiple teams working on
          different aspects of a product. And thus for the sake of this blog
          we'll primarily divide into 3 teams.
        </Para>
        <Para className="ml-2">1. Design Team</Para>
        <Para className="ml-2">1. Frontend Team</Para>
        <Para className="mb-6 ml-2">1. Backend Team</Para>

        <Para className="mb-6">
          So the above terms are self explanatory. But where does the problem
          arise. The problem is how things works, people in design team design
          apps and they primarily focus on the UI/UX and you know figma related
          stuff.
        </Para>

        <Para className="mb-6">
          The people in frontend team are more concerned about how to replicate
          the exact design given by the design team. And also they have this
          constant thing in mind that we also need to lookover for the api's and
          stuff because this is how any app on the internet functions.
        </Para>

        <Para className="mb-6">
          And this is where the problem lies. Both people communicate in
          different languages and contexts. Often times people in frontend
          cannot understand the intent behind the UI Design and thus cannot
          convey the message which design teams intended.
        </Para>
        <Para className="mb-6">
          Same goes for the designers they cannot understand the technical
          constraints and limitations of frontend development. Plus adding
          animations and interations on top of it feels overwhelming for the
          frontend teams.
        </Para>
        <Para>
          And this is where Design Engineering comes in. Design Engineering is a
          new discipline that bridges the gap between design and development
          teams.
        </Para>
      </Container>

      <Footer className="fixed bottom-0 z-9" />
    </div>
  );
}
