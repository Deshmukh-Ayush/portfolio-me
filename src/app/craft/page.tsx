"use client";

import Container from "@/components/container";
import { BackBtn } from "@/components/ui/back-btn";
import { Heading } from "@/components/ui/heading";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { BlocksInteractionShowcase } from "@/components/craft/showcase/blocks-illustration";
import { CalendarWidgetShowcase } from "@/components/craft/showcase/calendar-widget-showcase";
import { ExpandablePillShowcase } from "@/components/craft/showcase/expandable-pill";
import { FanCardsShowcase } from "@/components/craft/showcase/fanCards-showcase";
import { HoldToConfirmShowcase } from "@/components/craft/showcase/holdtoconfirm-showcase";
import { HumanVerificationShowcase } from "@/components/craft/showcase/human-verification-showcase";
import { MiniToolbarShowcase } from "@/components/craft/showcase/mini-toolbar";
import { ToolbarShowcase } from "@/components/craft/showcase/toolbar-showcase";
import { SpotifyPillsShowcase } from "@/components/craft/showcase/spotify-pills-showcase";
import { WeekDaysFilterShowcase } from "@/components/craft/showcase/weekdays-filter";

const SHOWCASES = [
  WeekDaysFilterShowcase,
  SpotifyPillsShowcase,
  MiniToolbarShowcase,
  BlocksInteractionShowcase,
  CalendarWidgetShowcase,
  ToolbarShowcase,
  HumanVerificationShowcase,
  HoldToConfirmShowcase,
  ExpandablePillShowcase,
  FanCardsShowcase,
] as const;

export default function CraftPage() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <MusicToggleButton className="fixed right-4 bottom-2 hidden md:block" />
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      <BackBtn href="/" />

      <Container>
        <Heading className="text-sm md:text-xl">Craft</Heading>

        {SHOWCASES.map((Showcase, index) => (
          <Showcase key={index} />
        ))}
      </Container>
    </div>
  );
}
