import { cn } from "@/lib/utils";
import React from "react";

export const Para = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "text-md text-neutral-700 dark:text-neutral-200",
        className,
      )}
    >
      {children}
    </div>
  );
};
