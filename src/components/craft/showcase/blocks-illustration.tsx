import AnimatedGraphic from "@/components/examples/AnimatedGraphic";
import { Heading } from "@/components/ui/heading";
import { Para } from "@/components/ui/para";
import Link from "next/link";
import { Drawer } from "vaul";

export const BlocksInteractionShowcase = () => {
  return (
    <div>
      <div className="relative mt-10 mb-4 flex h-100 w-2xl items-center justify-center rounded-2xl shadow-[0px_0px_1px_1px_#e2e8f0] dark:shadow-[0px_0px_1px_1px_#404040]">
        <AnimatedGraphic />
      </div>
      <div className="flex items-center justify-between pr-4">
        <Heading className="text-lg">Interactive Blocks Interaction.</Heading>
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
                  <Drawer.Title className="mb-4 font-semibold text-gray-900">
                    Blocks Illustration Journey
                  </Drawer.Title>
                  <p className="mb-2 text-gray-600">
                    This component was actually for my upcoming project{" "}
                    <Link
                      href="https://www.scrunity.com"
                      className="font-semibold text-neutral-700"
                    >
                      Scrunity AI
                    </Link>{" "}
                    . Made this for the landing page.
                  </p>
                  <p className="mb-2 text-gray-600">
                    It was kinda hard to figure out the right illustrations to
                    fit right into your landing page but this one is pure
                    intuition and I the animation part was very tricky for me
                    because at first I didn't exported it properly but then I
                    found a fix and eventually get everything working.
                  </p>

                  <p className="mb-2 text-gray-600">
                    So this is the second component of the 30 days challenge and
                    let's see where this will take me.
                  </p>
                  <p className="mb-2 font-semibold text-gray-700">
                    Hope you like it.
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
