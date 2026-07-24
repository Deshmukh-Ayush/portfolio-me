"use client";

import React from "react";
import { Cambio } from "cambio";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// If you already have shadcn's `cn` in lib/utils.ts, delete this and import that instead.
function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

type EnlargerProps = {
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  popupClassName?: string;
  backdropClassName?: string;
  aspectRatio?: string;
  dismissible?: boolean | { threshold?: number; velocity?: number };
};

export default function Enlarger({
  children,
  className,
  triggerClassName,
  popupClassName,
  backdropClassName,
  aspectRatio,
  dismissible = true,
}: EnlargerProps) {
  if (process.env.NODE_ENV !== "production" && !aspectRatio) {
    // Trigger and Popup morphing between different shapes is what causes the
    // "image lags behind the container" glitch during open/close.
    console.warn(
      '[Enlarger] no `aspectRatio` passed — keep it consistent across trigger and popup or the shared-element transition will distort mid-animation. e.g. aspectRatio="4 / 3"',
    );
  }

  const sharedStyle = aspectRatio ? { aspectRatio } : undefined;

  // Neutralizes native <img> drag + pointer capture so Cambio's own drag
  // handler on Popup actually receives the gesture. See Cambio's own
  // examples — they set pointerEvents: "none" on the image for this exact reason.
  const mediaReset =
    "[&_img]:pointer-events-none [&_img]:select-none [&_img]:h-full [&_img]:w-full [&_img]:object-cover";

  return (
    <div className={className}>
      <Cambio.Root dismissible={dismissible}>
        <Cambio.Trigger
          className={cn(
            "relative w-full cursor-zoom-in overflow-hidden rounded-xl",
            mediaReset,
            triggerClassName,
          )}
          style={sharedStyle}
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
              mediaReset,
              popupClassName,
            )}
            style={sharedStyle}
          >
            {children}
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </div>
  );
}
