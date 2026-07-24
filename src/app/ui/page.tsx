import Container from "@/components/container";
import LongEnlarger from "@/components/long-img-enlarger";
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
              <LongEnlarger
                aspectRatio="16 / 9"
                className="w-full"
                popupClassName="w-[1000px] max-w-[400vw]"
              >
                <img
                  src="/ui/Waitlist_page.png"
                  alt="Project preview"
                  draggable={true}
                />
              </LongEnlarger>
              <Para>Scrunity Initial Concept</Para>
            </div>

            <div className="flex gap-3 py-10">
              <LongEnlarger
                aspectRatio="4 / 3"
                className="w-[50%]"
                popupClassName="w-[1000px] max-w-[400vw]"
              >
                <img
                  src="/ui/Scrunity-crossover.svg"
                  alt="Project preview"
                  draggable={true}
                />
              </LongEnlarger>
              <LongEnlarger
                aspectRatio="4 / 3"
                className="w-[50%]"
                popupClassName="w-[1000px] max-w-[400vw]"
              >
                <img
                  src="/ui/drive-tile.svg"
                  alt="Project preview"
                  draggable={true}
                />
              </LongEnlarger>
            </div>
            <Separator />
            <div className="py-10">
              <Heading className="text-sm md:text-xl">
                Landing Page Idea
              </Heading>
              <div className="py-10">
                <LongEnlarger
                  isLongImage={true}
                  aspectRatio="16 / 9"
                  className="w-full"
                  popupClassName="w-[1000px] max-w-[92vw]"
                  // dismissible={{ threshold: 80, velocity: 400 }}
                >
                  <img
                    src="/ui/Landing_page.svg"
                    alt="Project preview"
                    draggable={false}
                  />
                </LongEnlarger>
                <LongEnlarger
                  isLongImage={true}
                  aspectRatio="16 / 9"
                  className="mt-8 w-full"
                  popupClassName="w-[1000px] max-w-[92vw]"
                  // dismissible={{ threshold: 80, velocity: 400 }}
                >
                  <img
                    src="/ui/pricing_section.svg"
                    alt="Project preview"
                    draggable={false}
                  />
                </LongEnlarger>
                <Para>Pricing Page</Para>

                <LongEnlarger
                  isLongImage={true}
                  aspectRatio="16 / 9"
                  className="mt-8 w-full"
                  popupClassName="w-[1000px] max-w-[92vw]"
                  // dismissible={{ threshold: 80, velocity: 400 }}
                >
                  <img
                    src="/ui/contact_section.svg"
                    alt="Project preview"
                    draggable={false}
                  />
                </LongEnlarger>
                <Para>Contact Page</Para>

                <LongEnlarger
                  isLongImage={true}
                  aspectRatio="16 / 9"
                  className="mt-8 w-full"
                  popupClassName="w-[1000px] max-w-[92vw]"
                  // dismissible={{ threshold: 80, velocity: 400 }}
                >
                  <img
                    src="/ui/projects_page.svg"
                    alt="Project preview"
                    draggable={false}
                  />
                </LongEnlarger>
                <Para>Projects Page</Para>

                <LongEnlarger
                  isLongImage={true}
                  aspectRatio="16 / 9"
                  className="mt-8 w-full"
                  popupClassName="w-[1000px] max-w-[92vw]"
                  // dismissible={{ threshold: 80, velocity: 400 }}
                >
                  <img
                    src="/ui/AI_Consumption.svg"
                    alt="Project preview"
                    draggable={false}
                  />
                </LongEnlarger>
                <Para>AI Consumption Page</Para>

                <LongEnlarger
                  isLongImage={true}
                  aspectRatio="16 / 9"
                  className="mt-8 w-full"
                  popupClassName="w-[1000px] max-w-[92vw]"
                  // dismissible={{ threshold: 80, velocity: 400 }}
                >
                  <img
                    src="/ui/Settings_Page.svg"
                    alt="Project preview"
                    draggable={false}
                  />
                </LongEnlarger>
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
