"use client";

import Container from "@/components/container";
import AnimatedGraphic from "@/components/examples/AnimatedGraphic";
import { Footer } from "@/components/footer";
import { Heading } from "@/components/ui/heading";
import { Para } from "@/components/ui/para";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { Clock } from "@/components/ui/special-effects/sliding-numbers";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <Clock className="fixed top-4 right-4 hidden md:block" />
      <MusicToggleButton className="fixed right-4 bottom-2 hidden md:block" />
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      <Container className="bg-neutral-300 dark:bg-neutral-950">
        <Heading className="text-sm md:text-xl">Craft</Heading>
        <div>
          <div className="relative mt-10 mb-4 flex h-100 w-2xl items-center justify-center rounded-2xl border border-neutral-400">
            <AnimatedGraphic />
          </div>
          <div className="flex items-center justify-between pr-4">
            <Heading className="text-lg">
              Interactive Blocks Interaction.
            </Heading>
            <Para>Hover</Para>
          </div>
        </div>

        {/* 2nd */}
        <div>
          <div className="relative mt-10 mb-4 flex h-100 w-2xl items-center justify-center rounded-2xl border border-neutral-400">
            <AnimatedGraphic />
          </div>
          <div className="flex items-center justify-between pr-4">
            <Heading className="text-lg">
              Interactive Blocks Interaction.
            </Heading>
            <Para>Hover</Para>
          </div>
        </div>
      </Container>
      {/* <Footer className="fixed bottom-0 z-9" /> */}
    </div>
  );
}
