"use client";

import React from "react";
import { Cambio } from "cambio";
import clsx from "clsx";
import { cn } from "@/lib/utils";

type EnlargerProps = {
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  popupClassName?: string;
  backdropClassName?: string;
  aspectRatio?: string;
  dismissible?: boolean | { threshold?: number; velocity?: number };
  isLongImage?: boolean; // <-- Added this prop
};

export default function Enlarger({
  children,
  className,
  triggerClassName,
  popupClassName,
  backdropClassName,
  aspectRatio,
  dismissible = true,
  isLongImage = false, // <-- Default to false
}: EnlargerProps) {
  if (process.env.NODE_ENV !== "production" && !aspectRatio) {
    console.warn(
      '[Enlarger] no `aspectRatio` passed — keep it consistent across trigger and popup or the shared-element transition will distort mid-animation. e.g. aspectRatio="4 / 3"',
    );
  }

  const sharedStyle = aspectRatio ? { aspectRatio } : undefined;

  // Trigger: Always fill the container. If it's a long image, align to the top.
  const triggerMediaReset = cn(
    "[&_img]:pointer-events-none [&_img]:select-none [&_img]:w-full [&_img]:h-full [&_img]:object-cover",
    isLongImage && "[&_img]:object-top",
  );

  // Popup: If it's a long image, let the height be auto so it can scroll.
  // Otherwise, behave normally (object-cover).
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
              "relative w-[92vw] max-w-6xl rounded-2xl",
              // Swap overflow-hidden for scroll when it's a long image
              isLongImage
                ? "custom-scrollbar max-h-[90vh] overflow-y-auto"
                : "overflow-hidden",
              popupMediaReset,
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
