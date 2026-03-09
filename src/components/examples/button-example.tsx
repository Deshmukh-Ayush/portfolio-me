"use client";

import React, { useState } from "react";
import { TextMorph } from "torph/react";
import { useWebHaptics } from "web-haptics/react";

export const ButtonExample = () => {
  const [button1State, setButton1State] = useState(0);
  const [button2State, setButton2State] = useState(0);

  const button1States = ["Click Me", "Hello", "What's up?"];
  const button2States = ["Click Me", "Hello", "What's up?"];
  const { trigger } = useWebHaptics();

  const handleButton1Click = () => {
    setButton1State((prev) => (prev + 1) % button1States.length);
    () =>
      trigger([
        { duration: 80, intensity: 0.8 },
        { delay: 80, duration: 50, intensity: 0.3 },
      ]);
  };

  const handleButton2Click = () => {
    setButton2State((prev) => (prev + 1) % button2States.length);
    () =>
      trigger([
        { duration: 80, intensity: 0.8 },
        { delay: 80, duration: 50, intensity: 0.3 },
      ]);
  };

  return (
    <div className="relative mb-6 h-60 w-[calc(100vw-4rem)] max-w-full overflow-hidden rounded-2xl border border-neutral-400 md:w-2xl">
      <button
        onClick={handleButton1Click}
        className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 rounded-md border px-3 py-1 text-sm whitespace-nowrap md:left-2/5 md:px-4 md:py-1 md:text-base"
      >
        {button1States[button1State]}
      </button>
      <button
        onClick={handleButton2Click}
        className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 rounded-md border px-3 py-1 text-sm whitespace-nowrap md:left-3/5 md:px-4 md:py-1 md:text-base"
      >
        <TextMorph>{button2States[button2State]}</TextMorph>
      </button>
    </div>
  );
};
