import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";

function playClickSound() {
  const AudioContext =
    window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();

  // Unblock any browser-suspended context (common even on user gesture)
  ctx.resume();

  const now = ctx.currentTime;
  const duration = 0.03;

  // --- Compressor at the output so it actually cuts through speakers ---
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -6;
  compressor.knee.value = 0;
  compressor.ratio.value = 4;
  compressor.attack.value = 0.001;
  compressor.release.value = 0.05;
  compressor.connect(ctx.destination);

  // --- 1) Noise burst (the body of the "tik") ---
  const bufferSize = Math.ceil(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 3200; // moved down a touch — easier to hear on laptop speakers
  filter.Q.value = 1.2;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(1.5, now + 0.001); // loud snap
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(compressor);

  noise.start(now);
  noise.stop(now + duration);

  // --- 2) Short sine transient (gives it a tonal "tik" click on top) ---
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 1200;

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0, now);
  oscGain.gain.linearRampToValueAtTime(0.8, now + 0.001);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

  osc.connect(oscGain);
  oscGain.connect(compressor);

  osc.start(now);
  osc.stop(now + 0.015);

  noise.onended = () => ctx.close();
}

export const BackBtn = ({
  className,
  href,
}: {
  className?: string;
  href: string;
}) => {
  const { trigger } = useWebHaptics();
  return (
    <Link
      href={href}
      onClick={() => {
        playClickSound();
        trigger([
          { duration: 80, intensity: 0.8 },
          { delay: 80, duration: 50, intensity: 0.3 },
        ]);
      }}
      className={cn(
        "fixed z-50 flex items-center justify-center rounded-full bg-white/40 p-2 shadow-[1px_-1px_1px_1px_#e2e8f0] backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/60 dark:bg-neutral-900/40 dark:shadow-[1px_-1px_1px_1px_#404040]",
        "top-4 left-4 sm:top-8 sm:left-8 md:top-16 md:left-16 lg:top-20 lg:left-30",
        "h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12",
        "active:scale-98",

        className,
      )}
    >
      <Arrow className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
    </Link>
  );
};

const Arrow = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "icon icon-tabler icons-tabler-outline icon-tabler-corner-up-left",
        className,
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 18v-6a3 3 0 0 0 -3 -3h-10l4 -4m0 8l-4 -4" />
    </svg>
  );
};
