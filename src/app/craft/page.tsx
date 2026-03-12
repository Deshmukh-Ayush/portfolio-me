"use client";

import Container from "@/components/container";
import { BlocksInteractionShowcase } from "@/components/craft/showcase/blocks-illustration";
import { MiniToolbarShowcase } from "@/components/craft/showcase/mini-toolbar";
import { BackBtn } from "@/components/ui/back-btn";
import { Heading } from "@/components/ui/heading";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function CraftPage() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <MusicToggleButton className="fixed right-4 bottom-2 hidden md:block" />
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      <BackBtn href="/" />
      <Container>
        <Heading className="text-sm md:text-xl">Craft</Heading>
        <MiniToolbarShowcase />
        {/* 2nd */}
        <BlocksInteractionShowcase />
      </Container>
    </div>
  );
}
