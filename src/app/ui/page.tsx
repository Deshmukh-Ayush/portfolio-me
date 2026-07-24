import Container from "@/components/container";
import { Footer } from "@/components/footer";
import LongEnlarger from "@/components/long-img-enlarger";
import { Heading } from "@/components/ui/heading";
import { Para } from "@/components/ui/para";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/ui/theme-toggle";
import Image from "next/image";

// Single Source of Truth
// When you add filtering later, you just filter this array based on the 'category' key.
const PROJECT_ASSETS = [
  {
    id: "bento-1",
    category: "UI Concepts",
    src: "/ui/Bento-1.svg",
    alt: "Bento UI project preview",
    label: "Bento-1",
    aspectRatio: "16 / 9",
    isLongImage: true,
    gridSpan: "col-span-1 md:col-span-2", // Full width
    popupClass: "w-[1000px] max-w-[92vw]",
    width: 1920,
    height: 1080,
  },
  {
    id: "scrunity-initial",
    category: "UI Concepts",
    src: "/ui/Waitlist_page.png",
    alt: "Scrunity waitlist page preview",
    label: "Scrunity Initial Concept",
    aspectRatio: "16 / 9",
    isLongImage: false,
    gridSpan: "col-span-1 md:col-span-2",
    popupClass: "w-[1000px] max-w-[400vw]",
    width: 1920,
    height: 1080,
    blurDataURL:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  },
  {
    id: "scrunity-crossover",
    category: "UI Concepts",
    src: "/ui/Scrunity-crossover.svg",
    alt: "Scrunity crossover preview",
    aspectRatio: "4 / 3",
    isLongImage: false,
    gridSpan: "col-span-1", // Half width on desktop, full width on mobile
    popupClass: "w-[1000px] max-w-[400vw]",
    width: 1600,
    height: 1200,
  },
  {
    id: "drive-tile",
    category: "UI Concepts",
    src: "/ui/drive-tile.svg",
    alt: "Drive tile preview",
    aspectRatio: "4 / 3",
    isLongImage: false,
    gridSpan: "col-span-1",
    popupClass: "w-[1000px] max-w-[400vw]",
    width: 1600,
    height: 1200,
  },
  {
    id: "landing",
    category: "Landing Page Idea",
    src: "/ui/Landing_page.svg",
    alt: "Landing page preview",
    aspectRatio: "16 / 9",
    isLongImage: true,
    gridSpan: "col-span-1 md:col-span-2",
    popupClass: "w-[1000px] max-w-[92vw]",
    width: 1920,
    height: 1080,
  },
  {
    id: "pricing",
    category: "Landing Page Idea",
    src: "/ui/pricing_section.svg",
    alt: "Pricing section preview",
    label: "Pricing Page",
    aspectRatio: "16 / 9",
    isLongImage: true,
    gridSpan: "col-span-1 md:col-span-2",
    popupClass: "w-[1000px] max-w-[92vw]",
    width: 1920,
    height: 1080,
  },
  {
    id: "contact",
    category: "Landing Page Idea",
    src: "/ui/contact_section.svg",
    alt: "Contact section preview",
    label: "Contact Page",
    aspectRatio: "16 / 9",
    isLongImage: true,
    gridSpan: "col-span-1 md:col-span-2",
    popupClass: "w-[1000px] max-w-[92vw]",
    width: 1920,
    height: 1080,
  },
  {
    id: "projects",
    category: "Landing Page Idea",
    src: "/ui/projects_page.svg",
    alt: "Projects page preview",
    label: "Projects Page",
    aspectRatio: "16 / 9",
    isLongImage: true,
    gridSpan: "col-span-1 md:col-span-2",
    popupClass: "w-[1000px] max-w-[92vw]",
    width: 1920,
    height: 1080,
  },
  {
    id: "ai",
    category: "Landing Page Idea",
    src: "/ui/AI_Consumption.png",
    alt: "AI Consumption page preview",
    label: "AI Consumption Page",
    aspectRatio: "16 / 9",
    isLongImage: true,
    gridSpan: "col-span-1 md:col-span-2",
    popupClass: "w-[1000px] max-w-[92vw]",
    width: 1920,
    height: 1080,
  },
  {
    id: "settings",
    category: "Landing Page Idea",
    src: "/ui/Settings_Page.svg",
    alt: "Settings page preview",
    label: "Settings Page",
    aspectRatio: "16 / 9",
    isLongImage: true,
    gridSpan: "col-span-1 md:col-span-2",
    popupClass: "w-[1000px] max-w-[92vw]",
    width: 1920,
    height: 1080,
  },
];

export default function Page() {
  // Dynamically extract unique categories from your data
  // When you build the filter UI, you can use these exact categories for your filter buttons
  const categories = Array.from(new Set(PROJECT_ASSETS.map((a) => a.category)));

  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <div className="relative z-50">
        <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      </div>

      <Container className="pointer-events-none relative z-10 bg-transparent">
        <div className="pointer-events-auto py-10">
          {categories.map((category, index) => {
            // In the future, you'd add: `&& activeFilter === category`
            const categoryAssets = PROJECT_ASSETS.filter(
              (a) => a.category === category,
            );

            return (
              <div key={category} className="mb-10">
                <Heading className="mb-8 text-sm md:text-xl">
                  {category}
                </Heading>

                {/* CSS Grid replaces flex-row/hardcoded widths. It naturally reflows if items are filtered. */}
                <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2">
                  {categoryAssets.map((asset) => (
                    <div key={asset.id} className={asset.gridSpan}>
                      <LongEnlarger
                        isLongImage={asset.isLongImage}
                        aspectRatio={asset.aspectRatio}
                        className="w-full"
                        popupClassName={asset.popupClass}
                      >
                        <Image
                          src={asset.src}
                          alt={asset.alt}
                          width={asset.width}
                          height={asset.height}
                          className="h-auto w-full"
                          draggable={false}
                          {...(asset.blurDataURL && {
                            placeholder: "blur",
                            blurDataURL: asset.blurDataURL,
                          })}
                        />
                      </LongEnlarger>
                      {asset.label && (
                        <Para className="mt-4">{asset.label}</Para>
                      )}
                    </div>
                  ))}
                </div>

                {/* Automatically injects a separator between categories, skipping the last one */}
                {index < categories.length - 1 && (
                  <Separator className="my-14" />
                )}
              </div>
            );
          })}
        </div>
      </Container>

      <div className="pointer-events-auto relative z-10">
        <Footer />
      </div>
    </div>
  );
}
