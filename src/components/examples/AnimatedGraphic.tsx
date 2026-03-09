"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

// Helper function that dynamically shifts only the "Top" Y-coordinates of an SVG path.
const adjustPathHeight = (d: string, thresholdY: number, dy: number) => {
  const regex = /([MLCVZ])([^MLCVZ]*)/gi;
  return d.replace(regex, (match, cmd, args) => {
    if (cmd.toUpperCase() === "Z") return cmd;

    // Extract all numbers from the arguments string
    const nums = args
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(parseFloat);
    const mCmd = cmd.toUpperCase();
    const adjustedArgs: number[] = [];

    // Apply `dy` only to Y coordinates that are < thresholdY
    if (mCmd === "V") {
      const y = nums[0];
      adjustedArgs.push(y < thresholdY ? y + dy : y);
    } else if (mCmd === "M" || mCmd === "L") {
      const x = nums[0],
        y = nums[1];
      adjustedArgs.push(x, y < thresholdY ? y + dy : y);
    } else if (mCmd === "C") {
      const x1 = nums[0],
        y1 = nums[1],
        x2 = nums[2],
        y2 = nums[3],
        x = nums[4],
        y = nums[5];
      adjustedArgs.push(
        x1,
        y1 < thresholdY ? y1 + dy : y1,
        x2,
        y2 < thresholdY ? y2 + dy : y2,
        x,
        y < thresholdY ? y + dy : y,
      );
    }

    // Always rejoin with spaces so Framer Motion safely interpolates between matching structures!
    return `${cmd}${adjustedArgs.join(" ")}`;
  });
};

export default function AnimatedGraphic() {
  // We represent "height" shifts using dy.
  // dy > 0 means the top face moves *down* (block shrinks visually)
  // dy < 0 means the top face moves *up* (block grows visually)
  const [shifts, setShifts] = useState([0, 0, 0, 0]);

  const shuffle = () => {
    setShifts([
      // Block 1 (tallest, shrink it): dy between +30 and +80
      Math.random() * 50 + 30,
      // Block 2 (shortest, grow it): dy between -20 and -60
      -(Math.random() * 40 + 20),
      // Block 3: randomize
      Math.random() * 60 - 30,
      // Block 4: randomize
      Math.random() * 60 - 30,
    ]);
  };

  const reset = () => {
    // Return to original heights when not interacting (optional, but requested to "leave to something random")
    // We'll just randomly re-shuffle.
    shuffle();
  };

  const b1_dy = shifts[0];
  const b2_dy = shifts[1];
  const b3_dy = shifts[2];
  const b4_dy = shifts[3];

  const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

  return (
    <motion.svg
      viewBox="0 0 291 332"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[250px] md:max-w-[291px] cursor-pointer mx-auto"
      onMouseEnter={shuffle}
      onMouseLeave={reset}
      onTap={shuffle}
    >
      {/* --- BLOCK 1 --- Threshold 150 */}
      <g>
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M138.354 4C142.18 1.79086 148.384 1.79086 152.21 4L207.636 36C211.462 38.2091 211.462 41.7909 207.636 44L152.21 76C148.384 78.2091 142.18 78.2091 138.354 76L82.9282 44C79.1019 41.7909 79.1019 38.2091 82.9282 36L138.354 4Z",
              150,
              b1_dy,
            ),
          }}
        />
        {/* Rects only need y and height shifts. Bottom stays anchored perfectly via matrix math. */}
        <motion.rect
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909]"
          width="64"
          transform="matrix(0.866025 0.5 0 1 82.9282 44)"
          animate={{ height: 160 - b1_dy, y: b1_dy }}
        />
        <motion.rect
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909]"
          width="64"
          transform="matrix(0.866025 -0.5 0 1 152.21 76)"
          animate={{ height: 160 - b1_dy, y: b1_dy }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M80.0585 40C80.0585 41.5621 81.1551 42.9763 82.9282 44V204C81.1551 202.976 80.0585 201.562 80.0585 200V40Z",
              150,
              b1_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M138.354 76C142.18 78.2091 148.384 78.2091 152.21 76V236C148.384 238.209 142.18 238.209 138.354 236V76Z",
              150,
              b1_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M210.506 40C210.506 41.5621 209.409 42.9763 207.636 44V204C209.409 202.976 210.506 201.562 210.506 200V40Z",
              150,
              b1_dy,
            ),
          }}
        />
      </g>

      {/* --- BLOCK 2 --- Threshold 252 */}
      <g>
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M62.3538 176C66.1802 173.791 72.3839 173.791 76.2102 176L131.636 208C135.462 210.209 135.462 213.791 131.636 216L76.2102 248C72.3839 250.209 66.1802 250.209 62.3538 248L6.92822 216C3.10188 213.791 3.10187 210.209 6.92822 208L62.3538 176Z",
              252,
              b2_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909]"
          animate={{
            d: adjustPathHeight(
              "M6.92822 216L62.3538 248V288L6.92822 256V216Z",
              252,
              b2_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-300 dark:fill-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M6.92822 256L6.49521 255.75V256.25L6.92822 256.5V256ZM62.3538 288V287.5L6.92822 255.5V256V256.5L62.3538 288.5V288ZM6.92822 256L7.36124 256.25V216.25L6.92822 216L6.49521 215.75V255.75L6.92822 256Z",
              252,
              b2_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909]"
          animate={{
            d: adjustPathHeight(
              "M76.2102 248L131.636 216V256L76.2102 288V248Z",
              252,
              b2_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-300 dark:fill-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M76.2102 248V247.5L75.7772 247.75V248.25L76.2102 248ZM76.2102 288L75.7772 288.25V288.75L76.2102 288.5V288ZM76.2102 248V248.5L131.636 216.5V216V215.5L76.2102 247.5V248ZM131.636 256V255.5L76.2102 287.5V288V288.5L131.636 256.5V256ZM76.2102 288L76.6432 287.75V247.75L76.2102 248L75.7772 248.25V288.25L76.2102 288Z",
              252,
              b2_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909]"
          animate={{
            d: adjustPathHeight(
              "M4.05847 212C4.05847 213.562 5.15515 214.976 6.92823 216V256C5.15515 254.976 4.05847 253.562 4.05847 252V212Z",
              252,
              b2_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M62.3538 248C66.1802 250.209 72.3839 250.209 76.2102 248V288C72.3839 290.209 66.1802 290.209 62.3538 288V248Z",
              252,
              b2_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-blue-500 dark:fill-[#6580E1]"
          animate={{
            d: adjustPathHeight(
              "M134.506 212C134.506 213.562 133.409 214.976 131.636 216V256C133.409 254.976 134.506 253.562 134.506 252V212Z",
              252,
              b2_dy,
            ),
          }}
        />
      </g>

      {/* --- BLOCK 3 --- Threshold 200 */}
      <g>
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M214.354 96C218.18 93.7909 224.384 93.7909 228.21 96L283.636 128C287.462 130.209 287.462 133.791 283.636 136L228.21 168C224.384 170.209 218.18 170.209 214.354 168L158.928 136C155.102 133.791 155.102 130.209 158.928 128L214.354 96Z",
              200,
              b3_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909]"
          animate={{
            d: adjustPathHeight(
              "M158.928 136L214.354 168V288L158.928 256V136Z",
              200,
              b3_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-300 dark:fill-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M214.354 288V287.5L158.928 255.5V256V256.5L214.354 288.5V288Z",
              200,
              b3_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909]"
          animate={{
            d: adjustPathHeight(
              "M228.21 168L283.636 136V256L228.21 288V168Z",
              200,
              b3_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-300 dark:fill-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M283.636 256V255.5L228.21 287.5V288V288.5L283.636 256.5V256Z",
              200,
              b3_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M156.058 132C156.058 133.562 157.155 134.976 158.928 136V256C157.155 254.976 156.058 253.562 156.058 252V132Z",
              200,
              b3_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M214.354 168C218.18 170.209 224.384 170.209 228.21 168V288C224.384 290.209 218.18 290.209 214.354 288V168Z",
              200,
              b3_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M286.506 132C286.506 133.562 285.409 134.976 283.636 136V256C285.409 254.976 286.506 253.562 286.506 252V132Z",
              200,
              b3_dy,
            ),
          }}
        />
      </g>

      {/* --- BLOCK 4 --- Threshold 270 */}
      <g>
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M138.354 177C142.18 174.791 148.384 174.791 152.21 177L207.636 209C211.462 211.209 211.462 214.791 207.636 217L152.21 249C148.384 251.209 142.18 251.209 138.354 249L82.9282 217C79.1019 214.791 79.1019 211.209 82.9282 209L138.354 177Z",
              270,
              b4_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909]"
          animate={{
            d: adjustPathHeight(
              "M82.9282 217L138.354 249V329L82.9282 297V217Z",
              270,
              b4_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-300 dark:fill-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M138.354 329V328.5L82.9282 296.5V297V297.5L138.354 329.5V329Z",
              270,
              b4_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909]"
          animate={{
            d: adjustPathHeight(
              "M152.21 249L207.636 217V297L152.21 329V249Z",
              270,
              b4_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-300 dark:fill-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M207.636 297V296.5L152.21 328.5V329V329.5L207.636 297.5V297Z",
              270,
              b4_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M80.0585 213C80.0585 214.562 81.1551 215.976 82.9282 217V297C81.1551 295.976 80.0585 294.562 80.0585 293V213Z",
              270,
              b4_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M138.354 249C142.18 251.209 148.384 251.209 152.21 249V329C148.384 331.209 142.18 331.209 138.354 329V249Z",
              270,
              b4_dy,
            ),
          }}
        />
        <motion.path
          transition={spring}
          className="fill-neutral-100 dark:fill-[#090909] stroke-neutral-300 dark:stroke-[#747474]"
          animate={{
            d: adjustPathHeight(
              "M210.506 213C210.506 214.562 209.409 215.976 207.636 217V297C209.409 295.976 210.506 294.562 210.506 293V213Z",
              270,
              b4_dy,
            ),
          }}
        />
      </g>
    </motion.svg>
  );
}
