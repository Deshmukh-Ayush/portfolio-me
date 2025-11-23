"use client";

import Container from "@/components/container";
import { Footer } from "@/components/footer";
import { Heading } from "@/components/ui/heading";
import { MusicToggleButton } from "@/components/ui/special-effects/music";
import { Clock } from "@/components/ui/special-effects/sliding-numbers";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BackBtn } from "@/components/ui/back-btn";
import { cn } from "@/lib/utils";
import { Newsreader } from "next/font/google";
import Link from "next/link";

const newsReader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
});

export default function BlogsPage() {
  const blogs = [
    {
      href: "/writing/everything-you-know-about-next-image-is-wrong",
      date: "Nov 13, 2025",
      title: "Everything You Think You Know About next/image Is Wrong!",
    },
    {
      href: "/writing/micro-interactions",
      date: "Nov 8, 2025",
      title: "Micro-Interactions",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-neutral-950">
      <Clock className="fixed top-4 right-4 hidden md:block" />
      <MusicToggleButton className="fixed right-4 bottom-2 hidden md:block" />
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />
      <BackBtn href="/" />
      <Container className="bg-neutral-100 dark:bg-neutral-950">
        <Heading className="text-sm md:text-xl">All Blogs</Heading>
        <div className="py-10">
          {blogs.map((blog, idx) => (
            <SingleBlog
              key={blog.href}
              href={blog.href}
              date={blog.date}
              index={idx + 1}
            >
              {blog.title}
            </SingleBlog>
          ))}
        </div>
      </Container>
      <Footer className="fixed bottom-0 z-9" />
    </div>
  );
}

export const SingleBlog = ({
  children,
  className,
  href,
  date,
  index, // 3. Accept the index as a prop
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  date: string | Date;
  index: number; // Add type definition
}) => {
  const formattedDate =
    date instanceof Date
      ? date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : date;

  return (
    <Link
      href={href}
      className={cn(
        `${newsReader.className} flex w-full items-center justify-between rounded-2xl bg-neutral-100 py-1 transition-all duration-200 ease-in-out hover:bg-neutral-300 md:px-4 dark:bg-neutral-950 dark:hover:bg-neutral-900`,
        className,
      )}
    >
      <div>
        {/* 4. Use the prop directly */}
        <span className="text-sm text-neutral-500">#{index}</span> {children}
      </div>
      <div>
        <span className="text-sm text-neutral-500">{formattedDate}</span>
      </div>
    </Link>
  );
};
