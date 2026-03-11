import React from "react";
import { MiniToolbar } from "../mini-toolbar";
import { Heading } from "@/components/ui/heading";
import { Drawer } from "vaul";

export const MiniToolbarShowcase = () => {
  return (
    <div className="w-full max-w-2xl px-4 sm:px-0">
      <div className="relative mt-10 mb-4 flex h-48 w-full items-center justify-center rounded-2xl border border-neutral-400 sm:h-64 md:h-100">
        <MiniToolbar />
      </div>
      <div className="flex items-center justify-between">
        <Heading className="text-base sm:text-lg dark:text-neutral-200">
          Mini Toolbar
        </Heading>

        <Drawer.Root>
          <Drawer.Trigger className="relative shrink-0 cursor-pointer font-medium text-neutral-700 underline">
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
                    Mini Toolbar Journey
                  </Drawer.Title>
                  <p className="mb-2 text-gray-600">
                    Let me share this journey of creating this mini toolbar
                    component, this component is made with the intention of
                    completing the 30 day challenge from{" "}
                    <a
                      href="https://x.com/mannupaaji"
                      className="font-semibold text-neutral-700 underline"
                    >
                      Manu Paaji
                    </a>{" "}
                    and this was for the day 1.
                  </p>
                  <p className="mb-2 text-gray-600">
                    I saw a similar kind of component on X few days ago and that
                    component really stood out for me. But I didn't want to just
                    copy someone else's creation but I was reading this book
                    called{" "}
                    <span className="font-semibold text-neutral-700">
                      "Steal like an artist"
                    </span>{" "}
                    and it taught me that what is the difference between copying
                    and stealing is. So yes I kinda stole the idea and added my
                    own taste of animated icons to it and made it my own.
                  </p>
                  <p className="mb-2 text-gray-600">
                    I hope you guys liked it and I've always been a believer of
                    <span className="font-semibold text-neutral-700">
                      {" "}
                      giving back to the community,
                    </span>{" "}
                    so sooner I will be sharing the components as whole with the
                    cli link so that everyone can use it in their projects and
                    also learn from it. I might just launch it under the name of
                    <span className="font-semibold text-neutral-700">
                      {" "}
                      Cloff UI
                    </span>{" "}
                    because that project I announced but never launched.
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
