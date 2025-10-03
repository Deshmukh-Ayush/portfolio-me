"use client";
import { useEffect, useId, useState } from "react";
import {
  MotionValue,
  motion,
  useSpring,
  useTransform,
  motionValue,
} from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

const TRANSITION = {
  type: "spring" as const,
  stiffness: 280,
  damping: 18,
  mass: 0.3,
};

function Digit({ value, place }: { value: number; place: number }) {
  const valueRoundedToPlace = Math.floor(value / place) % 10;
  const initial = motionValue(valueRoundedToPlace);
  const animatedValue = useSpring(initial, TRANSITION);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums">
      <div className="invisible">0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue<number>; number: number }) {
  const uniqueId = useId();
  const [ref, bounds] = useMeasure();

  const y = useTransform(mv, (latest) => {
    if (!bounds.height) return 0;
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * bounds.height;

    if (offset > 5) {
      memo -= 10 * bounds.height;
    }

    return memo;
  });

  // don't render the animated number until we know the height
  if (!bounds.height) {
    return (
      <span ref={ref} className="invisible absolute">
        {number}
      </span>
    );
  }

  return (
    <motion.span
      style={{ y }}
      layoutId={`${uniqueId}-${number}`}
      className="absolute inset-0 flex items-center justify-center"
      transition={TRANSITION}
      ref={ref}
    >
      {number}
    </motion.span>
  );
}

type SlidingNumberProps = {
  value: number;
  padStart?: boolean;
  decimalSeparator?: string;
};

export function SlidingNumber({
  value,
  padStart = false,
  decimalSeparator = ".",
}: SlidingNumberProps) {
  const absValue = Math.abs(value);
  const [integerPart, decimalPart] = absValue.toString().split(".");
  const integerValue = parseInt(integerPart, 10);
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
  const integerDigits = paddedInteger.split("");
  const integerPlaces = integerDigits.map((_, i) =>
    Math.pow(10, integerDigits.length - i - 1),
  );

  return (
    <div className="flex items-center">
      {value < 0 && "-"}
      {integerDigits.map((_, index) => (
        <Digit
          key={`pos-${integerPlaces[index]}`}
          value={integerValue}
          place={integerPlaces[index]}
        />
      ))}
      {decimalPart && (
        <>
          <span>{decimalSeparator}</span>
          {decimalPart.split("").map((_, index) => (
            <Digit
              key={`decimal-${index}`}
              value={parseInt(decimalPart, 10)}
              place={Math.pow(10, decimalPart.length - index - 1)}
            />
          ))}
        </>
      )}
    </div>
  );
}

export const Clock = ({ className }: { className?: string }) => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    ampm: "AM",
    gmt: "+05:30",
  });

  useEffect(() => {
    const updateTime = () => {
      const ist = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      const date = new Date(ist);

      const hrs = date.getHours();
      const ampm = hrs >= 12 ? "PM" : "AM";
      const displayHours = hrs % 12 === 0 ? 12 : hrs % 12;

      setTime({
        hours: displayHours,
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        ampm,
        gmt: "+05:30", // fixed for IST
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center gap-2 font-mono dark:text-neutral-100",
        className,
      )}
    >
      <span className="flex items-center gap-0.5">
        <p className="mr-4">INDIA </p>
        <SlidingNumber value={time.hours} padStart={true} />
        <span className="text-zinc-500">:</span>
        <SlidingNumber value={time.minutes} padStart={true} />
        <span className="ml-1">{time.ampm}</span>
      </span>
    </div>
  );
};
