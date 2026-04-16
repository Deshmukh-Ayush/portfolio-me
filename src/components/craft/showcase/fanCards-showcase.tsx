import React from "react";
import { Heading } from "@/components/ui/heading";
import { Drawer } from "vaul";
import { FanCards } from "../fan-cards";

export const FanCardsShowcase = () => {
  return (
    <div className="w-full max-w-2xl px-4 sm:px-0">
      <div className="relative mt-10 mb-4 flex h-48 w-full items-center justify-center rounded-2xl shadow-[0px_0px_1px_1px_#e2e8f0] sm:h-64 md:h-100 dark:shadow-[0px_0px_1px_1px_#404040]">
        <FanCards />
      </div>
      <div className="flex items-center justify-between">
        <Heading className="text-base sm:text-lg dark:text-neutral-200">
          Fan Cards
        </Heading>

        <Drawer.Root>
          <Drawer.Trigger className="relative shrink-0 cursor-pointer font-medium text-neutral-700 dark:text-neutral-300 dark:underline">
            Journey
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="fixed right-0 bottom-0 left-0 mt-24 flex h-fit flex-col rounded-t-[10px] bg-gray-100 outline-none">
              <div className="flex-1 rounded-t-[10px] bg-white p-4">
                <div
                  aria-hidden
                  className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-gray-300"
                />
                <div className="mx-auto max-w-md">
                  <Drawer.Title className="mb-4 font-medium text-gray-900">
                    Fan Cards Journey
                  </Drawer.Title>
                  <p className="mb-2 text-gray-600">
                    I took inspiration of this component from{" "}
                    <a href="https://x.com/leouiux/status/2043413280987689074">
                      Léo
                    </a>
                    .
                  </p>
                  <p className="mb-2 text-gray-600">
                    I tweaked the design a bit to you know not feel entirely
                    copied. And shoutout to{" "}
                    <a href="https://bestdesignsonx.com/leouiux/status/2043413280987689074">
                      Best Design from X
                    </a>{" "}
                    for this amazing design collections.
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
