import Container from "@/components/container";
import Enlarger from "@/components/img-enlarger";
import { Heading } from "@/components/ui/heading";
import { Para } from "@/components/ui/para";
import { Separator } from "@/components/ui/separator";
import { Boxes } from "@/components/ui/special-effects/background-boxes";
import ThemeToggle from "@/components/ui/theme-toggle";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <div className="relative z-50">
        {/* <Clock className="fixed top-4 right-4 hidden md:block" /> */}
        {/* <MusicToggleButton className="fixed right-4 bottom-2 hidden md:block" /> */}
        <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      </div>

      <Container className="pointer-events-none relative z-10 bg-transparent">
        <div className="pointer-events-auto">
          <Heading className="text-sm md:text-xl">UI</Heading>
          <div className="py-10">
            <div>
              <Enlarger
                aspectRatio="16 / 9"
                className="w-full"
                popupClassName="w-[1000px] max-w-[400vw]"
                dismissible={{ threshold: 80, velocity: 400 }}
              >
                <img
                  src="/ui/Waitlist_page.png"
                  alt="Project preview"
                  draggable={true}
                />
              </Enlarger>
              <Para>Scrunity Initial Concept</Para>
            </div>

            <div className="flex gap-3 py-10">
              <Enlarger
                aspectRatio="4 / 3"
                className="w-[50%]"
                popupClassName="w-[1000px] max-w-[400vw]"
                dismissible={{ threshold: 80, velocity: 400 }}
              >
                <img
                  src="/ui/Scrunity-crossover.svg"
                  alt="Project preview"
                  draggable={true}
                />
              </Enlarger>
              <Enlarger
                aspectRatio="4 / 3"
                className="w-[50%]"
                popupClassName="w-[1000px] max-w-[400vw]"
                dismissible={{ threshold: 80, velocity: 400 }}
              >
                <img
                  src="/ui/drive-tile.svg"
                  alt="Project preview"
                  draggable={true}
                />
              </Enlarger>
            </div>
            <Separator />
            <div className="py-10">
              <Heading className="text-sm md:text-xl">
                Landing Page Idea
              </Heading>
              <div className="py-10">
                <Enlarger
                  isLongImage={true}
                  aspectRatio="16 / 9"
                  className="w-full"
                  popupClassName="w-[1000px] max-w-[92vw]"
                  dismissible={{ threshold: 80, velocity: 400 }}
                >
                  <img
                    src="/ui/Landing_page.svg"
                    alt="Project preview"
                    draggable={false}
                  />
                </Enlarger>
                <Enlarger
                  isLongImage={true}
                  aspectRatio="16 / 9"
                  className="mt-8 w-full"
                  popupClassName="w-[1000px] max-w-[92vw]"
                  dismissible={{ threshold: 80, velocity: 400 }}
                >
                  <img
                    src="/ui/pricing_section.svg"
                    alt="Project preview"
                    draggable={false}
                  />
                </Enlarger>
                <Para>Pricing Page</Para>

                <Enlarger
                  isLongImage={true}
                  aspectRatio="16 / 9"
                  className="mt-8 w-full"
                  popupClassName="w-[1000px] max-w-[92vw]"
                  dismissible={{ threshold: 80, velocity: 400 }}
                >
                  <img
                    src="/ui/contact_section.svg"
                    alt="Project preview"
                    draggable={false}
                  />
                </Enlarger>
                <Para>Contact Page</Para>

                <Enlarger
                  isLongImage={true}
                  aspectRatio="16 / 9"
                  className="mt-8 w-full"
                  popupClassName="w-[1000px] max-w-[92vw]"
                  dismissible={{ threshold: 80, velocity: 400 }}
                >
                  <img
                    src="/ui/projects_page.svg"
                    alt="Project preview"
                    draggable={false}
                    className=""
                  />
                </Enlarger>
                <Para>Projects Page</Para>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Footer */}
      {/* <div className="pointer-events-auto relative z-10">
          <Footer />
        </div> */}
    </div>
  );
}
