"use client";

import * as React from "react";
import { Drawer } from "vaul";
import { Heading } from "@/components/ui/heading";
import { WeekdaysFilter } from "../weekdays-filter";

export const WeekDaysFilterShowcase = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full max-w-2xl px-4 sm:px-0">
      <div className="relative mt-10 mb-4 flex h-72 w-full items-center justify-center rounded-2xl shadow-[0px_0px_1px_1px_#e2e8f0] sm:h-80 md:h-100 dark:shadow-[0px_0px_1px_1px_#404040]">
        <WeekdaysFilter />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <Heading className="text-base sm:text-lg dark:text-neutral-200">
          WeekDays Filter Bento Part-1
        </Heading>

        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger asChild>
            <button
              type="button"
              className="relative z-10 shrink-0 cursor-pointer font-medium text-neutral-700 dark:text-neutral-300 dark:underline"
            >
              Journey
            </button>
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
            <Drawer.Content className="fixed right-0 bottom-0 left-0 z-60 mt-24 flex h-fit flex-col rounded-t-[10px] bg-gray-100 outline-none">
              <div className="flex-1 rounded-t-[10px] bg-white p-4">
                <div
                  aria-hidden
                  className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-gray-300"
                />
                <div className="mx-auto max-w-md">
                  <Drawer.Title className="mb-4 font-semibold text-gray-900">
                    WeekDays Filter
                  </Drawer.Title>

                  <p className="mb-2 text-gray-600">Found it on X</p>

                  <p className="mb-2 text-gray-600">Part of a bento grid.</p>

                  <p className="mb-2 font-semibold text-gray-700">
                    Posting 3 more in upcoming days
                  </p>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
};
