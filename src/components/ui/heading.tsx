import { cn } from "@/lib/utils";
import React from "react";

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "md:text-md text-sm text-neutral-700 text-shadow-sm dark:text-neutral-100",
        className,
      )}
    >
      {children}
    </div>
  );
};
