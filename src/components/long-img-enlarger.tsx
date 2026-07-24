"use client";

import React, { useState, useId, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type EnlargerProps = {
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  popupClassName?: string;
  backdropClassName?: string;
  aspectRatio?: string;
  isLongImage?: boolean;
};

export default function LongEnlarger({
  children,
  className,
  triggerClassName,
  popupClassName,
  backdropClassName,
  aspectRatio,
  isLongImage = false,
}: EnlargerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId(); // Ensures multiple instances don't share the same layoutId

  // Lock body scroll when the enlarger is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const triggerStyle = aspectRatio ? { aspectRatio } : undefined;

  const popupStyle = isLongImage
    ? { height: "85vh" }
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

  // Keyboard accessibility for closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className={className}>
      {/* 1. Trigger (Thumbnail View) */}
      <motion.div
        layoutId={`enlarger-image-${uniqueId}`}
        className={cn(
          "relative w-full cursor-zoom-in overflow-hidden rounded-xl outline -outline-offset-1 outline-black/10 dark:outline-white/10",
          triggerMediaReset,
          triggerClassName,
        )}
        style={triggerStyle}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </motion.div>

      {/* 2. Popup (Enlarged View) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "absolute inset-0 cursor-zoom-out bg-black/60 backdrop-blur-sm",
                backdropClassName,
              )}
              onClick={() => setIsOpen(false)}
            />

            {/* Shared Layout Expansion */}
            <motion.div
              layoutId={`enlarger-image-${uniqueId}`}
              className={cn(
                "relative z-10 w-[92vw] max-w-6xl cursor-zoom-out overflow-hidden rounded-2xl",
                popupMediaReset,
                popupClassName,
              )}
              style={popupStyle}
              onClick={() => setIsOpen(false)}
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
