"use client";

import { SoundProvider } from "@web-kits/audio/react";
import { useState } from "react";

export function UseSoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const [volume, setVolume] = useState(0.8);

  return (
    <SoundProvider
      enabled={enabled}
      volume={volume}
      onEnabledChange={setEnabled}
      onVolumeChange={setVolume}
    >
      {children}
    </SoundProvider>
  );
}
