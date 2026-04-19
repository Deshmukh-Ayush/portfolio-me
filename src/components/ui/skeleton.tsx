import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-2xl bg-neutral-200/90 shadow-sm shadow-black/5 dark:bg-neutral-700/80 dark:shadow-black/20",
        "animate-pulse before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:animate-[shine_1.6s_linear_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent before:opacity-70 before:blur-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
