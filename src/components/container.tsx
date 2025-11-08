import { cn } from "@/lib/utils";
import React from "react";

interface props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: props) {
  return (
    <div
      className={cn(
        "mx-auto overflow-hidden px-10 py-30 md:max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
