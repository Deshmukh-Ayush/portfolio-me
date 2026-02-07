import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ScreenGate from "@/components/screen-gate";

const openSans = Open_Sans({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayush Deshmukh",
  description: "Ayush's Portfolio",
  metadataBase: new URL("https://www.everywhereayush.vercel.app"),
  openGraph: {
    title: "Ayush Deshmukh",
    description: "Ayush's Portfolio",
    url: "https://www.everywhereayush.vercel.app",
    siteName: "Ayush Deshmukh",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ayush Deshmukh",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Deshmukh",
    description: "Ayush's Portfolio",
    images: ["/og-image.png"],
  },
};

import { JsonLd } from "@/components/json-ld";


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
          {children}
        </ThemeProvider>
        {/* </ScreenGate> */}
      </body>
    </html>
  );
}
