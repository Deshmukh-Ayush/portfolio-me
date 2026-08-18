import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ScreenGate from "@/components/screen-gate";
import { DialRoot } from "dialkit";

const openSans = Open_Sans({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s — Ayush Deshmukh",
    default: "Ayush Deshmukh — Design Engineer",
  },
  description:
    "Design Engineer crafting polished interfaces, micro-interactions, and digital experiences. Co-Founder & CTO of Cloff Studio. Building Scrunity AI.",
  metadataBase: new URL("https://everywhereayush.in"),
  openGraph: {
    title: "Ayush Deshmukh — Design Engineer",
    description:
      "Design Engineer crafting polished interfaces, micro-interactions, and digital experiences.",
    url: "https://everywhereayush.in",
    siteName: "Ayush Deshmukh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Deshmukh — Design Engineer",
    description:
      "Design Engineer crafting polished interfaces, micro-interactions, and digital experiences.",
  },
};

import { JsonLd } from "@/components/json-ld";
import { PostHogProvider } from "./providers";
import { UseSoundProvider } from "@/hooks/use-sound";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${openSans.className} antialiased`}>
        <JsonLd />
        {/* <ScreenGate> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            <div className="root">
              <UseSoundProvider>{children}</UseSoundProvider>
              <DialRoot />
            </div>
          </PostHogProvider>
        </ThemeProvider>
        {/* </ScreenGate> */}
      </body>
    </html>
  );
}
