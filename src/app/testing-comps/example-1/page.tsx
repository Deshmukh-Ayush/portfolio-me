"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { TextMorph } from "torph/react";

export default function TestingCompsPage() {
  const [button1State, setButton1State] = useState(0);
  const [button2State, setButton2State] = useState(0);

  const button1States = ["Click Me", "Hello", "What's up?"];
  const button2States = ["Click Me", "Hello", "What's up?"];

  const handleButton1Click = () => {
    setButton1State((prev) => (prev + 1) % button1States.length);
  };

  const handleButton2Click = () => {
    setButton2State((prev) => (prev + 1) % button2States.length);
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute top-1/2 left-2/5 -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={handleButton1Click}
          className="rounded-md border px-4 py-1"
        >
          {button1States[button1State]}
        </button>
      </div>

      <div className="absolute top-1/2 left-3/5 -translate-x-1/2 -translate-y-1/2">
        <motion.button
          onClick={handleButton2Click}
          className="rounded-md border px-4 py-1"
        >
          <TextMorph>{button2States[button2State]}</TextMorph>
        </motion.button>
      </div>
    </div>
  );
}
