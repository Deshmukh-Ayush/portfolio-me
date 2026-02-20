"use client";

import Container from "@/components/container";
import { Footer } from "@/components/footer";
import { Heading } from "@/components/ui/heading";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { Clock } from "@/components/ui/special-effects/sliding-numbers";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <Clock className="fixed top-4 right-4 hidden md:block" />
      <MusicToggleButton className="fixed right-4 bottom-2 hidden md:block" />
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      <Container className="bg-neutral-100 dark:bg-neutral-950">
        <Heading className="text-sm md:text-xl">Craft</Heading>
      </Container>
      {/* <Footer className="fixed bottom-0 z-9" /> */}
    </div>
  );
}
