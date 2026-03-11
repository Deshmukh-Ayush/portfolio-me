"use client";

import Container from "@/components/container";
import { MiniToolbar } from "@/components/craft/mini-toolbar";
import { BlocksInteractionShowcase } from "@/components/craft/showcase/blocks-illustration";
import { MiniToolbarShowcase } from "@/components/craft/showcase/mini-toolbar";
import AnimatedGraphic from "@/components/examples/AnimatedGraphic";
import { Footer } from "@/components/footer";
import { BackBtn } from "@/components/ui/back-btn";
import { Heading } from "@/components/ui/heading";
import { Para } from "@/components/ui/para";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { Clock } from "@/components/ui/special-effects/sliding-numbers";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Drawer } from "vaul";

export default function CraftPage() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <Clock className="fixed top-4 right-4 hidden md:block" />
      <MusicToggleButton className="fixed right-4 bottom-2 hidden md:block" />
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      <BackBtn href="/" />
      <Container>
        <Heading className="text-sm md:text-xl">Craft</Heading>
        <MiniToolbarShowcase />
        {/* 2nd */}
        {/* <BlocksInteractionShowcase /> */}
      </Container>
      {/* <Footer className="fixed bottom-0 z-9" /> */}
    </div>
  );
}
