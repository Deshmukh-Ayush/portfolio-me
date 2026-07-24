"use client";

import React from "react";
import { Cambio } from "cambio";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type EnlargerProps = {
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  popupClassName?: string;
  backdropClassName?: string;
  aspectRatio?: string;
  dismissible?: boolean | { threshold?: number; velocity?: number };
  isLongImage?: boolean;
};

export default function LongEnlarger({
  children,
  className,
  triggerClassName,
  popupClassName,
  backdropClassName,
  aspectRatio,
  dismissible = true,
  isLongImage = false,
}: EnlargerProps) {
  if (process.env.NODE_ENV !== "production" && !aspectRatio) {
    console.warn(
      '[Enlarger] no `aspectRatio` passed — keep it consistent across trigger and popup or the shared-element transition will distort mid-animation. e.g. aspectRatio="4 / 3"',
    );
  }

  const triggerStyle = aspectRatio ? { aspectRatio } : undefined;

  // Every branch here resolves to a concrete, deterministic box — never
  // "auto sized by content" — so Framer's FLIP has a stable target to
  // measure on every frame, open or close.
  const popupStyle = isLongImage
    ? { height: "85vh" } // fixed, not max-height — content scrolls inside this, doesn't grow it
    : aspectRatio
      ? { aspectRatio }
      : undefined;

  const triggerMediaReset = cn(
    "[&_img]:pointer-events-none [&_img]:select-none [&_img]:w-full [&_img]:h-full [&_img]:object-cover",
    isLongImage && "[&_img]:object-top",
  );

  const popupMediaReset = cn(
    "[&_img]:pointer-events-none [&_img]:select-none [&_img]:w-full",
    isLongImage
      ? "[&_img]:h-auto [&_img]:object-top"
      : "[&_img]:h-full [&_img]:object-cover",
  );

  return (
    <div className={className}>
      <Cambio.Root dismissible={dismissible}>
        <Cambio.Trigger
          className={cn(
            "relative w-full cursor-zoom-in overflow-hidden rounded-xl outline -outline-offset-1 outline-black/10 dark:outline-white/10",
            triggerMediaReset,
            triggerClassName,
          )}
          style={triggerStyle}
        >
          {children}
        </Cambio.Trigger>

        <Cambio.Portal>
          <Cambio.Backdrop
            className={cn(
              "fixed inset-0 bg-black/60 backdrop-blur-sm",
              backdropClassName,
            )}
          />

          <Cambio.Popup
            className={cn(
              "relative w-[92vw] max-w-6xl overflow-hidden rounded-2xl",
              popupMediaReset,
              popupClassName,
            )}
            style={popupStyle}
          >
            {isLongImage ? (
              <ScrollArea
                className="h-full w-full"
                viewportClassName="scroll-fade"
              >
                {children}
              </ScrollArea>
            ) : (
              children
            )}
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </div>
  );
}
