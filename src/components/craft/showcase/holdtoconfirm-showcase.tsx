import AnimatedGraphic from "@/components/examples/AnimatedGraphic";
import { Heading } from "@/components/ui/heading";
import { Para } from "@/components/ui/para";
import Link from "next/link";
import { Drawer } from "vaul";
import { HoldToConfirm } from "../hold-to-confirm";

export const HoldToConfirmShowcase = () => {
  return (
    <div className="w-full max-w-2xl px-4 sm:px-0">
      <div className="relative mt-10 mb-4 flex h-72 w-full items-center justify-center rounded-2xl shadow-[0px_0px_1px_1px_#e2e8f0] sm:h-80 md:h-100 dark:shadow-[0px_0px_1px_1px_#404040]">
        <HoldToConfirm />
      </div>
      <div className="flex items-center justify-between">
        <Heading className="text-base sm:text-lg dark:text-neutral-200">
          Hold To Confirm Interaction.
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
                  <Drawer.Title className="mb-4 font-semibold text-gray-900">
                    Hold To Confirm Journey
                  </Drawer.Title>
                  <p className="mb-2 text-gray-600">
                    This component was also for my upcoming project{" "}
                    <Link
                      href="https://www.scrunity.com"
                      className="font-semibold text-neutral-700"
                    >
                      Scrunity AI
                    </Link>{" "}
                    . Made this for the landing page.
                  </p>
                  <p className="mb-2 text-gray-600">
                    It was kinda hard to figure out the right interaction to fit
                    right into the usecase but this I saw in someone's
                    portfolio, it was a bit different oh wait yes I saw it
                    someone recreated this similar interaction from family
                    website.
                  </p>

                  <p className="mb-2 text-gray-600">
                    So this is the sixth component of the 30 days challenge and
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
