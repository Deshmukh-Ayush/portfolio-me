"use client";

import { Globe } from "lucide-react";
import React, { useState, createContext, useContext } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface Guest {
  id: number | string;
  name: string;
  image: string;
  timezone?: string;
}

export interface CalendarWidgetProps {
  title: string;
  timeLabel: string;
  timeRange: string;
  guests: Guest[];
  layoutId?: string;
  className?: string;
}

export const CalendarWidget = ({
  title,
  timeLabel,
  timeRange,
  guests,
  layoutId = "container",
  className,
}: CalendarWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!title || !timeLabel || !timeRange) {
    console.warn(
      "CalendarWidget: title, timeLabel, and timeRange are required props",
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <motion.div
        layout
        layoutId={layoutId}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={`${title} event, ${timeLabel}, ${timeRange}. Click to ${isOpen ? "collapse" : "expand"} details.`}
        
        className={cn(
          "flex cursor-pointer flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-100 transition-all dark:border-neutral-900 dark:bg-black",
          isOpen ? "h-56 w-110 py-2" : "h-30 w-60 py-2",
          className,
        )}
      >
        <div className="flex justify-between px-4 py-2">
          <div className="flex flex-1 flex-col gap-4">
            <motion.span
              layoutId={`${layoutId}-time`}
              className="flex w-20 items-center justify-center rounded-2xl bg-red-100/50 px-2 py-1 text-xs font-semibold text-red-500 dark:bg-cyan-500/10 dark:text-cyan-500"
            >
              {timeLabel}
            </motion.span>

            <div className="flex flex-col">
              <motion.span
                layoutId={`${layoutId}-title`}
                className="font-semibold text-neutral-600 dark:text-neutral-200"
              >
                {title}
              </motion.span>

              <motion.span
                layoutId={`${layoutId}-timeNum`}
                className="text-xs font-semibold whitespace-nowrap text-neutral-500 dark:text-neutral-400"
              >
                {timeRange}
              </motion.span>
            </div>
          </div>

          <div
            className={cn(
              "flex items-start justify-end transition-opacity",
              isOpen ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={!isOpen}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-t border-red-300 bg-red-500 dark:border-cyan-100 dark:bg-cyan-600">
              <ClockIcon className="text-white" />
            </div>
          </div>
        </div>

        {isOpen && guests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="border-t-2 border-neutral-200 py-2 dark:border-neutral-800"
          >
            <HoverProvider>
              <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                  <span className="flex items-center gap-2 px-4 font-semibold text-neutral-600 dark:text-neutral-300">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-flex"
                      aria-hidden="true"
                    >
                      <Globe size={16} />
                    </motion.div>{" "}
                    Guests {guests.length}
                  </span>
                  <div className="flex px-4">
                    <Avatar items={guests} />
                  </div>
                </div>

                <div className="flex w-30 flex-col items-center justify-end px-3">
                  <div className="relative mb-3 flex h-4 justify-center">
                    {guests.map((guest, index) => (
                      <LineText
                        key={guest.id}
                        index={index}
                        text={
                          guest.timezone
                            ? `${guest.name} ${guest.timezone}`
                            : guest.name
                        }
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {guests.map((guest, index) => (
                      <Line key={guest.id} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            </HoverProvider>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

const HoverContext = createContext<{
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
} | null>(null);

export const HoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <HoverContext.Provider value={{ hoveredIndex, setHoveredIndex }}>
      {children}
    </HoverContext.Provider>
  );
};

const useHover = () => {
  const ctx = useContext(HoverContext);
  if (!ctx) throw new Error("useHover must be used inside HoverProvider");
  return ctx;
};

const Avatar = ({ items }: { items: Guest[] }) => {
  const [hovered, setHovered] = useState(false);
  const { setHoveredIndex } = useHover();
  const [imageErrors, setImageErrors] = useState<Set<number | string>>(
    new Set(),
  );

  const handleImageError = (id: number | string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className="flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setHoveredIndex(null);
      }}
      role="group"
      aria-label="Event guests"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="-mr-4"
          onMouseEnter={() => setHoveredIndex(index)}
          animate={{
            x: hovered ? index * 20 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          {imageErrors.has(item.id) ? (
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-300 bg-neutral-200 text-xs font-semibold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
              aria-label={`${item.name} avatar`}
            >
              {item.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <img
              src={item.image}
              alt={`${item.name} avatar`}
              className="h-9 w-9 rounded-full border-2 border-neutral-300 object-cover object-top"
              onError={() => handleImageError(item.id)}
              loading="lazy"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
const Line = ({ index }: { index: number }) => {
  const { hoveredIndex } = useHover();
  const hovered = hoveredIndex === index;

  return (
    <motion.div
      animate={{
        scaleY: hovered ? 1.1 : 1,
        background: hovered
          ? "var(--hover-gradient)"
          : "var(--default-gradient)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      }}
      className="h-8 w-2 rounded-2xl [--default-gradient:linear-gradient(to_bottom,#a3a3a3,#737373)] [--hover-gradient:linear-gradient(to_bottom,#f87171,#ef4444,#dc2626)] dark:[--default-gradient:linear-gradient(to_bottom,#525252,#262626)] dark:[--hover-gradient:linear-gradient(to_bottom,#22d3ee,#06b6d4,#0891b2)]"
      style={{
        background: hovered
          ? "var(--hover-gradient)"
          : "var(--default-gradient)",
      }}
      aria-hidden="true"
    />
  );
};

const LineText = ({ index, text }: { index: number; text: string }) => {
  const { hoveredIndex } = useHover();
  const active = hoveredIndex === index;

  return (
    <motion.span
      className="absolute text-xs font-bold whitespace-nowrap text-red-500/90 dark:text-cyan-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      aria-hidden="true"
    >
      {text}
    </motion.span>
  );
};

const ClockIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "icon icon-tabler icons-tabler-outline icon-tabler-alarm",
        className,
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M12 10l0 3l2 0" />
      <path d="M7 4l-2.75 2" />
      <path d="M17 4l2.75 2" />
    </svg>
  );
};
