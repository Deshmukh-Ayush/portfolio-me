"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Rectangle bottom-up + blur view-transition CSS (forced)
 * (Copied/derived from your original animation for variant === "rectangle" + blur === true + start === "bottom-up")
 */
const RECTANGLE_BOTTOM_UP_BLUR_CSS = `
::view-transition-group(root) {
  animation-duration: 0.9s;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);;
}

::view-transition-new(root) {
  animation-name: reveal-light-bottom-up-blur;
  filter: blur(2px);
}

::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
.dark::view-transition-new(root) {
  animation-name: reveal-dark-bottom-up-blur;
  filter: blur(2px);
}

@keyframes reveal-dark-bottom-up-blur {
  from {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
    filter: blur(8px);
  }
  50% { filter: blur(4px); }
  to {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    filter: blur(0px);
  }
}

@keyframes reveal-light-bottom-up-blur {
  from {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
    filter: blur(8px);
  }
  50% { filter: blur(4px); }
  to {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    filter: blur(0px);
  }
}
`;

/**
 * Hook: useRectangleBottomUpBlurToggle
 * - Injects the rectangle bottom-up blur CSS into the document (style tag)
 * - Uses the View Transitions API when available
 * - Falls back to normal theme switch when not available
 */
const STYLE_ID = "view-transition-rectangle-bottom-up-blur";

function useRectangleBottomUpBlurToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState<boolean>(false);

  // Sync state with resolvedTheme after hydration
  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const updateStyles = useCallback((css: string) => {
    if (typeof window === "undefined") return;
    let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
  }, []);

  const toggle = useCallback(() => {
    // Optimistic local flip so icon animates immediately
    setIsDark((v) => !v);

    // ensure css present
    updateStyles(RECTANGLE_BOTTOM_UP_BLUR_CSS);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    // Use View Transitions API if available
    // @ts-ignore - startViewTransition may not be typed in some TS configs
    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    // Start view transition
    // @ts-ignore
    document.startViewTransition(switchTheme);
  }, [theme, setTheme, updateStyles]);

  const setLight = useCallback(() => {
    setIsDark(false);
    updateStyles(RECTANGLE_BOTTOM_UP_BLUR_CSS);
    const apply = () => setTheme("light");
    // @ts-ignore
    if (!document.startViewTransition) {
      apply();
      return;
    }
    // @ts-ignore
    document.startViewTransition(apply);
  }, [setTheme, updateStyles]);

  const setDark = useCallback(() => {
    setIsDark(true);
    updateStyles(RECTANGLE_BOTTOM_UP_BLUR_CSS);
    const apply = () => setTheme("dark");
    // @ts-ignore
    if (!document.startViewTransition) {
      apply();
      return;
    }
    // @ts-ignore
    document.startViewTransition(apply);
  }, [setTheme, updateStyles]);

  return {
    isDark,
    toggle,
    setLight,
    setDark,
  };
}

/**
 * ThemeToggle component — uses the above hook.
 * Keeps your animated sun/moon markup + motion transitions intact.
 */
export const ThemeToggle = ({ className }: { className?: string }) => {
  const { isDark, toggle } = useRectangleBottomUpBlurToggle();

  return (
    <button
      onClick={toggle}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 transition-colors duration-200 hover:bg-neutral-800 hover:shadow-sm",
        className,
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
            layout
          >
            <Moon className="h-5 w-5 text-neutral-300" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
            layout
          >
            <Sun className="h-5 w-5 text-neutral-700 dark:text-neutral-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

const Moon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("icon-tabler icon-tabler-moon", className)}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
  </svg>
);

const Sun = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("icon-tabler icon-tabler-sun", className)}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
  </svg>
);

export default ThemeToggle;
