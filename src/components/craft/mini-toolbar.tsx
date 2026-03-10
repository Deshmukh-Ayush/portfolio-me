"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookmarkIcon } from "@/components/animated-icons/bookmark";
import type { BookmarkIconHandle } from "@/components/animated-icons/bookmark";
import { CalendarDaysIcon } from "@/components/animated-icons/calendar";
import type { CalendarDaysIconHandle } from "@/components/animated-icons/calendar";
import { FoldersIcon } from "@/components/animated-icons/folder";
import type { FoldersIconHandle } from "@/components/animated-icons/folder";
import { KeyIcon } from "@/components/animated-icons/key";
import type { KeyIconHandle } from "@/components/animated-icons/key";
import { LinkIcon } from "@/components/animated-icons/link";
import type { LinkIconHandle } from "@/components/animated-icons/link";
import { GalleryHorizontalEndIcon } from "@/components/animated-icons/notes";
import type { GalleryHorizontalEndIconHandle } from "@/components/animated-icons/notes";

export const MiniToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const foldersRef = useRef<FoldersIconHandle>(null);
  const bookmarkRef = useRef<BookmarkIconHandle>(null);
  const calendarRef = useRef<CalendarDaysIconHandle>(null);
  const notesRef = useRef<GalleryHorizontalEndIconHandle>(null);
  const keyRef = useRef<KeyIconHandle>(null);
  const linkRef = useRef<LinkIconHandle>(null);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <motion.button
        onClick={() => setIsOpen(true)}
        layoutId="btn"
        className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 hover:dark:bg-neutral-800"
      >
        <motion.span layoutId="btn-text" className="dark:text-neutral-100">
          Create New
        </motion.span>{" "}
        <Plus className="dark:text-neutral-100" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            layoutId="btn"
            className="absolute z-10 flex h-50 w-70 flex-col items-center rounded-xl border border-neutral-300 bg-neutral-800 shadow-2xl"
          >
            <div className="flex h-10 w-full items-center justify-between rounded-t-xl bg-neutral-800 px-3">
              <motion.h2 layoutId="btn-text" className="text-white">
                Create New
              </motion.h2>
              <Plus
                className="rotate-45 cursor-pointer text-white transition-colors hover:text-neutral-300"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="flex h-38 w-68 flex-col rounded-t-sm rounded-b-xl bg-white p-1">
              <div className="flex h-19 w-full items-center justify-between rounded-xl">
                <div
                  className="flex h-full w-1/3 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-100 hover:bg-neutral-100"
                  onMouseEnter={() => foldersRef.current?.startAnimation()}
                  onMouseLeave={() => foldersRef.current?.stopAnimation()}
                >
                  <FoldersIcon ref={foldersRef} className="text-neutral-500" />
                  <p className="text-xs dark:text-neutral-800">Folder</p>
                </div>
                <div
                  className="flex h-full w-1/3 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-100 hover:bg-neutral-100"
                  onMouseEnter={() => bookmarkRef.current?.startAnimation()}
                  onMouseLeave={() => bookmarkRef.current?.stopAnimation()}
                >
                  <BookmarkIcon
                    ref={bookmarkRef}
                    className="text-neutral-500"
                  />
                  <p className="text-xs dark:text-neutral-800">Bookmark</p>
                </div>
                <div
                  className="flex h-full w-1/3 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-100 hover:bg-neutral-100"
                  onMouseEnter={() => calendarRef.current?.startAnimation()}
                  onMouseLeave={() => calendarRef.current?.stopAnimation()}
                >
                  <CalendarDaysIcon
                    ref={calendarRef}
                    className="text-neutral-500"
                  />
                  <p className="text-xs dark:text-neutral-800">Calendar</p>
                </div>
              </div>
              <div className="flex h-19 w-full items-center justify-between rounded-xl">
                <div
                  className="flex h-full w-1/3 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-100 hover:bg-neutral-100"
                  onMouseEnter={() => notesRef.current?.startAnimation()}
                  onMouseLeave={() => notesRef.current?.stopAnimation()}
                >
                  <GalleryHorizontalEndIcon
                    ref={notesRef}
                    className="text-neutral-500"
                  />
                  <p className="text-xs dark:text-neutral-800">Notes</p>
                </div>
                <div
                  className="flex h-full w-1/3 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-100 hover:bg-neutral-100"
                  onMouseEnter={() => keyRef.current?.startAnimation()}
                  onMouseLeave={() => keyRef.current?.stopAnimation()}
                >
                  <KeyIcon ref={keyRef} className="text-neutral-500" />
                  <p className="text-xs dark:text-neutral-800">Password</p>
                </div>
                <div
                  className="flex h-full w-1/3 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-100 hover:bg-neutral-100"
                  onMouseEnter={() => linkRef.current?.startAnimation()}
                  onMouseLeave={() => linkRef.current?.stopAnimation()}
                >
                  <LinkIcon ref={linkRef} className="text-neutral-500" />
                  <p className="text-xs dark:text-neutral-800">Link</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Plus = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
    </svg>
  );
};
