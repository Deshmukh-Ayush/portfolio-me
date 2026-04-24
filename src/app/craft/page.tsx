"use client";

import dynamic from "next/dynamic";
import Container from "@/components/container";
import { BackBtn } from "@/components/ui/back-btn";
import { Heading } from "@/components/ui/heading";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const BlocksInteractionShowcase = dynamic(() => import("@/components/craft/showcase/blocks-illustration").then(mod => mod.BlocksInteractionShowcase));
const CalendarWidgetShowcase = dynamic(() => import("@/components/craft/showcase/calendar-widget-showcase").then(mod => mod.CalendarWidgetShowcase));
const ExpandablePillShowcase = dynamic(() => import("@/components/craft/showcase/expandable-pill").then(mod => mod.ExpandablePillShowcase));
const FanCardsShowcase = dynamic(() => import("@/components/craft/showcase/fanCards-showcase").then(mod => mod.FanCardsShowcase));
const HoldToConfirmShowcase = dynamic(() => import("@/components/craft/showcase/holdtoconfirm-showcase").then(mod => mod.HoldToConfirmShowcase));
const HumanVerificationShowcase = dynamic(() => import("@/components/craft/showcase/human-verification-showcase").then(mod => mod.HumanVerificationShowcase));
const MiniToolbarShowcase = dynamic(() => import("@/components/craft/showcase/mini-toolbar").then(mod => mod.MiniToolbarShowcase));
const ToolbarShowcase = dynamic(() => import("@/components/craft/showcase/toolbar-showcase").then(mod => mod.ToolbarShowcase));

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
        {/* 3rd */}
        <CalendarWidgetShowcase />
        {/* 4th */}
        <ToolbarShowcase />
        {/* 5th */}
        <HumanVerificationShowcase />
        {/* 6th */}
        <HoldToConfirmShowcase />
        {/* 7th */}
        <ExpandablePillShowcase />
        {/* 8th */}
        <FanCardsShowcase />
      </Container>
    </div>
  );
}
