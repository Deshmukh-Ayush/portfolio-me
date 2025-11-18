"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeBoxes, setActiveBoxes] = useState<
    { id: string; x: number; y: number; color: string }[]
  >([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // 8px grid size (h-2 w-2)
  const gridSize = 8;

  let colors = ["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a"];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Snap coordinates to the 8px grid
    const snappedX = Math.floor(x / gridSize) * gridSize;
    const snappedY = Math.floor(y / gridSize) * gridSize;

    // Only trigger update if we moved to a new cell
    if (snappedX !== mousePos.x || snappedY !== mousePos.y) {
      setMousePos({ x: snappedX, y: snappedY });

      const id = `${snappedX}-${snappedY}-${Date.now()}`;

      setActiveBoxes((prev) => {
        // Limit to last 20 to keep performance perfect
        const newBoxes = [
          ...prev,
          { id, x: snappedX, y: snappedY, color: getRandomColor() },
        ];
        if (newBoxes.length > 20) return newBoxes.slice(1);
        return newBoxes;
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        // Clean background, no grid lines
        "absolute inset-0 h-full w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950",
        className,
      )}
      {...rest}
    >
      <AnimatePresence>
        {activeBoxes.map((box) => (
          <motion.div
            key={box.id}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
            style={{
              left: box.x,
              top: box.y,
              width: gridSize,
              height: gridSize,
              backgroundColor: box.color,
            }}
            // Removed all border classes for a solid color look
            className="pointer-events-none absolute"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
