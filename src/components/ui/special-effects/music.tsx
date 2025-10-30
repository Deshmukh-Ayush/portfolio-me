"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";

export const MusicToggleButton = ({ className }: { className: string }) => {
  const bars = 5;

  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
  };

  const [heights, setHeights] = useState(getRandomHeights());

  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { pause, stop, sound }] = useSound("/audio/music.mp3", {
    loop: true,
    volume: 0.5,
  });

  useEffect(() => {
    if (isPlaying) {
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
      }, 100);

      return () => {
        clearInterval(waveformIntervalId);
      };
    }
    setHeights(Array(bars).fill(0.1));
  }, [isPlaying]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (sound) {
        stop();
      }
    };
  }, [sound, stop]);

  const handleClick = () => {
    try {
      if (isPlaying) {
        pause();
        setIsPlaying(false);
      } else {
        play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };
  return (
    <>
      <motion.div
        onClick={handleClick}
        key="audio"
        initial={{ padding: "10px 10px " }}
        whileHover={{ padding: "12px 12px " }}
        whileTap={{ padding: "18px 22px " }}
        transition={{ duration: 1, bounce: 0.6, type: "spring" }}
        className={cn(
          "cursor-pointer rounded-full border border-neutral-800 dark:bg-neutral-950",
          className,
        )}
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", bounce: 0.35 }}
          className="flex h-[18px] w-full items-center gap-1 rounded-full"
        >
          {/* Waveform visualization */}
          {heights.map((height, index) => (
            <motion.div
              key={index}
              className="w-[1px] rounded-full bg-neutral-900 dark:bg-neutral-100"
              initial={{ height: 1 }}
              animate={{
                height: Math.max(4, height * 14),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};
