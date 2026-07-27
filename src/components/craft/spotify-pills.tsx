import { motion, MotionProps, Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

const variants: Variants = {
  alone: {
    borderRadius: "9999px",
    marginLeft: "12px",
    paddingLeft: "8px",
  },
  left: {
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "9999px",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "9999px",
    marginLeft: "-14px",
    paddingLeft: "16px",
  },
  center: {
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    marginLeft: "-14px",
    paddingLeft: "16px",
  },
};

type FilterItemProps = {
  children: React.ReactNode;
  active?: boolean;
  isStyle: "left" | "center" | "alone";
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> &
  MotionProps;

function FilterItem({
  children,
  active,
  isStyle,
  className,
  ...props
}: FilterItemProps) {
  return (
    <motion.button
      className={cn(
        "ml-3 inline-flex h-8 items-center justify-center",
        "rounded-full border border-neutral-300 px-2 text-sm transition-colors",
        "text-neutral-600 dark:border-neutral-800 dark:text-neutral-200",
        active
          ? "bg-neutral-100 dark:bg-[#171717]"
          : "bg-white text-neutral-400! hover:bg-neutral-50 dark:bg-black dark:text-neutral-500! dark:hover:bg-neutral-900",
        active &&
          isStyle === "alone" &&
          "bg-opacity-[.97] bg-neutral-100 text-neutral-600 dark:bg-[#171717] dark:text-neutral-200",
        isStyle === "alone" && "border-neutral-300! dark:border-neutral-800!",
        className,
      )}
      variants={variants}
      initial={false}
      animate={isStyle}
      transition={{ type: "tween", duration: 0.15 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export const DynamicFilters = () => {
  const [filters, setFilters] = useState<Record<string, boolean>>({
    Playlists: false,
    Albums: false,
    Podcasts: false,
    Artists: false,
    Downloaded: false,
  });

  const handleFilter = (filterKey: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  const getStyle = useCallback(
    (filter: string): "alone" | "left" | "center" => {
      const keys = Object.keys(filters);
      const filterIndex = keys.indexOf(filter);

      if (!filters[filter]) return "alone";

      const prevFilter = filters[keys[filterIndex - 1]];
      const nextFilter = filters[keys[filterIndex + 1]];

      if (prevFilter && nextFilter) return "center";
      if (prevFilter) return "left";

      return "alone";
    },
    [filters],
  );

  return (
    <div className="flex">
      {Object.entries(filters).map(([filter, active], index) => (
        <FilterItem
          key={filter}
          active={active}
          onClick={() => handleFilter(filter)}
          className="last:hidden sm:last:flex"
          isStyle={getStyle(filter)}
          style={{ zIndex: Object.keys(filters).length - index }}
        >
          {filter}
        </FilterItem>
      ))}
    </div>
  );
};
