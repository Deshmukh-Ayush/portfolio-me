"use client"

import ThemeToggle from "@/components/ui/theme-toggle";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { Calligraph } from "calligraph";

interface Dot { x: number; y: number; id: number; }
interface Line { x1: number; y1: number; x2: number; y2: number; }

function generateDots(count: number, w: number, h: number): Dot[] {
  const pad = 28;
  const dots: Dot[] = [];
  let attempts = 0;
  while (dots.length < count && attempts < 1000) {
    attempts++;
    const x = pad + Math.random() * (w - pad * 2);
    const y = pad + Math.random() * (h - pad * 2);
    if (!dots.some((d) => Math.hypot(d.x - x, d.y - y) < 50))
      dots.push({ x, y, id: dots.length + 1 });
  }
  return dots;
}

const W = 320;
const H = 220;
const DOT_RADIUS = 14;
const MAGNET_RANGE = 60;
const MAGNET_INTENSITY = 0.55;
const SPRING_CONFIG = { stiffness: 26.7, damping: 4.1, mass: 0.2 };

type CaptchaState = "idle" | "loading" | "challenge" | "verifying" | "success" | "error";

// Individual dot with optional spring-based magnetic attraction.
// Uses useMotionValue + useSpring exactly like the reference Magnetic component:
// the DOT moves toward the cursor (not the cursor toward the dot).
function MagneticDot({
  dot,
  isDone,
  isNext,
  isLast,
  isTarget,
  completed,
  wrongFlash,
  dragging,
  cursorRef,
  onOffsetChange,
}: {
  dot: Dot;
  isDone: boolean;
  isNext: boolean;
  isLast: boolean;
  isTarget: boolean;
  completed: boolean;
  wrongFlash: boolean;
  dragging: boolean;
  cursorRef: React.RefObject<{ x: number; y: number } | null>;
  onOffsetChange: (id: number, dx: number, dy: number) => void;
}) {
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const springX = useSpring(dx, SPRING_CONFIG);
  const springY = useSpring(dy, SPRING_CONFIG);

  // Bubble live spring values up so the parent can route the drag line
  // to the visually displaced dot position
  useEffect(() => {
    const unsubX = springX.on("change", (x) => onOffsetChange(dot.id, x, springY.get()));
    const unsubY = springY.on("change", (y) => onOffsetChange(dot.id, springX.get(), y));
    return () => { unsubX(); unsubY(); };
  }, [dot.id, springX, springY, onOffsetChange]);

  // rAF loop: mirrors the reference's mousemove listener but reads from a ref
  // so we don't need to re-register on every cursor change
  useEffect(() => {
    if (!isTarget || !dragging) {
      dx.set(0);
      dy.set(0);
      return;
    }

    let rafId: number;
    const tick = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        const distX = cursor.x - dot.x;
        const distY = cursor.y - dot.y;
        const dist = Math.hypot(distX, distY);
        if (dist <= MAGNET_RANGE) {
          // scale = 1 at center, 0 at edge — same formula as reference
          const scale = 1 - dist / MAGNET_RANGE;
          dx.set(distX * MAGNET_INTENSITY * scale);
          dy.set(distY * MAGNET_INTENSITY * scale);
        } else {
          dx.set(0);
          dy.set(0);
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isTarget, dragging, dot.x, dot.y, dx, dy, cursorRef]);

  const strokeColor =
    isDone ? (completed ? "#15803d" : "#1d4ed8") :
    wrongFlash && isNext ? "#dc2626" :
    isTarget && dragging ? "#1d4ed8" :
    isNext ? "#6b7280" : "#d1d5db";

  const fillColor =
    isDone ? (completed ? "#dcfce7" : "#dbeafe") :
    isTarget && dragging ? "#eff6ff" : "#fff";

  const textFill =
    isDone ? (completed ? "#15803d" : "#1d4ed8") :
    isTarget && dragging ? "#1d4ed8" : "#6b7280";

  const strokeWidth = isTarget && dragging ? 2 : isNext || isLast ? 1.5 : 1;

  return (
    <motion.g style={{ x: springX, y: springY }}>
      {isTarget && dragging && (
        <circle
          cx={dot.x} cy={dot.y} r={11}
          fill="none"
          stroke="#1d4ed8"
          strokeWidth={1.5}
          opacity={0.45}
          className="magnet-ring"
        />
      )}
      <circle
        cx={dot.x} cy={dot.y} r={11}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        filter="url(#dot-texture)"
        style={{ cursor: "inherit" }}
      />
      <text
        x={dot.x} y={dot.y + 4}
        textAnchor="middle" fontSize={9}
        fontFamily="monospace" fontWeight="600"
        fill={textFill}
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {dot.id}
      </text>
    </motion.g>
  );
}

export default function PlaygroundPage() {
  const [captchaState, setCaptchaState] = useState<CaptchaState>("idle");
  const [dots, setDots] = useState<Dot[]>(() =>
    generateDots(Math.floor(Math.random() * 3) + 6, W, H)
  );
  const [connected, setConnected] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fromDot, setFromDot] = useState<Dot | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [isOnCanvas, setIsOnCanvas] = useState(false);
  // Live spring offsets reported back from each MagneticDot
  const [dotOffsets, setDotOffsets] = useState<Record<number, { dx: number; dy: number }>>({});

  const svgRef = useRef<SVGSVGElement>(null);
  // Ref so the rAF loop in MagneticDot always reads the freshest cursor without
  // needing to be re-registered as an effect dependency
  const cursorRef = useRef<{ x: number; y: number } | null>(null);

  const total = dots.length;
  const nextExpectedId = connected.length + 1;

  const handleOffsetChange = useCallback((id: number, dx: number, dy: number) => {
    setDotOffsets(prev => ({ ...prev, [id]: { dx, dy } }));
  }, []);

  const reset = (newDots?: Dot[]) => {
    if (newDots) setDots(newDots);
    setConnected([]);
    setCompleted(false);
    setDragging(false);
    setFromDot(null);
    setCursor(null);
    cursorRef.current = null;
    setDotOffsets({});
  };

  const handleCheckboxClick = () => {
    if (captchaState !== "idle" && captchaState !== "error") return;
    setCaptchaState("loading");
    reset(generateDots(Math.floor(Math.random() * 3) + 6, W, H));
    setTimeout(() => setCaptchaState("challenge"), 700);
  };

  const getSVGPoint = (e: React.MouseEvent | React.TouchEvent) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  // Hit-test against visually displaced positions
  const getDotAt = (x: number, y: number): Dot | null =>
    dots.find((d) => {
      const off = dotOffsets[d.id];
      const cx = d.x + (off?.dx ?? 0);
      const cy = d.y + (off?.dy ?? 0);
      return Math.hypot(cx - x, cy - y) < DOT_RADIUS;
    }) ?? null;

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (completed) return;
    const pt = getSVGPoint(e);
    const dot = getDotAt(pt.x, pt.y);
    if (!dot) return;
    const lastConnected = connected[connected.length - 1];
    const nextExpected = connected.length + 1;
    if (dot.id === lastConnected || dot.id === nextExpected) {
      setFromDot(dot);
      setDragging(true);
      setCursor(pt);
      cursorRef.current = pt;
    } else {
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 400);
    }
  }, [connected, completed, dots, dotOffsets]);

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const pt = getSVGPoint(e);
    setCursor(pt);
    cursorRef.current = pt;  // always fresh for the rAF loop
  }, [dragging]);

  const handleMouseUp = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !fromDot) return;
    setDragging(false);
    setCursor(null);
    cursorRef.current = null;

    const pt = getSVGPoint(e);
    const lastConnected = connected[connected.length - 1];
    const nextExpected = connected.length + 1;
    const expectedTarget = fromDot.id === lastConnected ? nextExpected : nextExpected + 1;

    // Resolve target using displaced positions (generous radius since dot drifted toward us)
    const resolved = dots.find((d) => {
      if (d.id !== expectedTarget) return false;
      const off = dotOffsets[d.id];
      const cx = d.x + (off?.dx ?? 0);
      const cy = d.y + (off?.dy ?? 0);
      return Math.hypot(cx - pt.x, cy - pt.y) < DOT_RADIUS + 8;
    }) ?? null;

    if (resolved) {
      const newIds = fromDot.id === lastConnected
        ? [...connected, resolved.id]
        : [...connected, fromDot.id, resolved.id];
      const deduped = newIds.filter((v, i, a) => a.indexOf(v) === i);
      setConnected(deduped);
      if (deduped.length === total) setCompleted(true);
    } else {
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 400);
    }
    setFromDot(null);
  }, [dragging, fromDot, connected, dots, total, dotOffsets]);

  const handleVerify = () => {
    if (!completed) {
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 400);
      setCaptchaState("error");
      setTimeout(() => setCaptchaState("challenge"), 800);
      return;
    }
    setCaptchaState("verifying");
    setTimeout(() => setCaptchaState("success"), 1000);
  };

  // Build committed lines using displaced positions
  const lines: Line[] = [];
  for (let i = 1; i < connected.length; i++) {
    const a = dots.find((d) => d.id === connected[i - 1]);
    const b = dots.find((d) => d.id === connected[i]);
    if (a && b) {
      const offA = dotOffsets[a.id];
      const offB = dotOffsets[b.id];
      lines.push({
        x1: a.x + (offA?.dx ?? 0), y1: a.y + (offA?.dy ?? 0),
        x2: b.x + (offB?.dx ?? 0), y2: b.y + (offB?.dy ?? 0),
      });
    }
  }

  // Drag line starts from the from-dot's displaced position
  const fromDotDisplaced = fromDot ? {
    x: fromDot.x + (dotOffsets[fromDot.id]?.dx ?? 0),
    y: fromDot.y + (dotOffsets[fromDot.id]?.dy ?? 0),
  } : null;

  const isExpanded = captchaState === "challenge" || captchaState === "verifying" || captchaState === "error";
  const pencilCursor = `url('/pencil.png') 0 48, crosshair`;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-neutral-900">
      <ThemeToggle className="fixed right-18 bottom-2 hidden cursor-pointer md:block" />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 0.35s linear infinite; }
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .pop-in { animation: pop-in 0.4s ease forwards; }
        .pencil-stroke { filter: url(#pencil-texture); }
        @keyframes magnet-pulse {
          0%   { r: 11; opacity: 0.5; }
          60%  { r: 19; opacity: 0.2; }
          100% { r: 23; opacity: 0; }
        }
        .magnet-ring { animation: magnet-pulse 0.6s ease-out infinite; }
      `}</style>

      <div className="flex flex-col items-center gap-4">
        <div className="bg-gray-100 shadow-[0px_0.2px_0.2px_0.2px_#e5e5e5] rounded-xl overflow-hidden w-fit">

          <div className="flex items-center justify-between px-3 py-2 gap-4">
            <div className="flex items-center gap-3">
              <div
                className="h-6 w-6 flex items-center justify-center flex-shrink-0 cursor-pointer"
                onClick={handleCheckboxClick}
              >
                {captchaState === "idle" && (
                  <div className="h-6 w-6 rounded-md border border-neutral-400 bg-white hover:border-neutral-600 transition-colors" />
                )}
                {(captchaState === "loading" || captchaState === "challenge" || captchaState === "verifying" || captchaState === "error") && (
                  <svg className="spinner h-5 w-5 text-neutral-400" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
                  </svg>
                )}
                {captchaState === "success" && (
                  <div className="pop-in h-6 w-6 rounded-md bg-neutral-950 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 select-none whitespace-nowrap">
                {captchaState === "success" ? "You're human!" : "I'm not a robot"}
              </p>
            </div>
            <Image src="/svgs/recaptcha.svg" alt="recaptcha" height={20} width={20} />
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="challenge"
                initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 800, damping: 80, mass: 4 }}
                style={{ overflow: "hidden" }}
              >
                <div className="border-t border-gray-200">
                  <div className="px-3 pt-2 pb-1">
                    <p className="text-xs text-gray-400 font-mono">
                      Connect dots 1 → {total} in order to verify
                    </p>
                  </div>

                  <div
                    className="relative mx-3 rounded-lg overflow-hidden"
                    style={{
                      width: W, height: H,
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      cursor: isOnCanvas ? pencilCursor : "default",
                    }}
                    onMouseEnter={() => setIsOnCanvas(true)}
                    onMouseLeave={() => setIsOnCanvas(false)}
                  >
                    <svg
                      ref={svgRef}
                      width={W} height={H}
                      className="absolute inset-0 select-none"
                      style={{ touchAction: "none", cursor: "inherit", overflow: "visible" }}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={(e) => { setIsOnCanvas(false); handleMouseUp(e); }}
                      onTouchStart={handleMouseDown}
                      onTouchMove={handleMouseMove}
                      onTouchEnd={handleMouseUp}
                    >
                      <defs>
                        <filter id="pencil-texture" x="-5%" y="-5%" width="110%" height="110%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                          <feComposite in="displaced" in2="SourceGraphic" operator="in" />
                        </filter>
                        <filter id="dot-texture" x="-10%" y="-10%" width="120%" height="120%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                      </defs>

                      {lines.map((l, i) => (
                        <line key={i}
                          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                          stroke={completed ? "#15803d" : "#1d4ed8"}
                          strokeWidth={2.5} strokeLinecap="round"
                          className="pencil-stroke" opacity={0.8}
                        />
                      ))}

                      {dragging && fromDotDisplaced && cursor && (
                        <line
                          x1={fromDotDisplaced.x} y1={fromDotDisplaced.y}
                          x2={cursor.x} y2={cursor.y}
                          stroke={wrongFlash ? "#dc2626" : "#9ca3af"}
                          strokeWidth={1.5} strokeLinecap="round"
                          strokeDasharray="5 3" opacity={0.55}
                          className="pencil-stroke"
                        />
                      )}

                      {dots.map((dot) => {
                        const isDone = connected.includes(dot.id);
                        const isNext = dot.id === nextExpectedId && !completed;
                        const isLast = dot.id === connected[connected.length - 1];
                        const isTarget = dragging && dot.id === nextExpectedId && !completed;

                        return (
                          <MagneticDot
                            key={dot.id}
                            dot={dot}
                            isDone={isDone}
                            isNext={isNext}
                            isLast={isLast}
                            isTarget={isTarget}
                            completed={completed}
                            wrongFlash={wrongFlash}
                            dragging={dragging}
                            cursorRef={cursorRef}
                            onOffsetChange={handleOffsetChange}
                          />
                        );
                      })}
                    </svg>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2">
                    <span className="text-xs text-gray-400 flex-1 font-mono">
                      {completed ? "✓ all connected" : `${connected.length} / ${total}`}
                    </span>
                    <button onClick={() => { reset(generateDots(Math.floor(Math.random() * 3) + 6, W, H)); setCaptchaState("challenge"); }}
                      className="text-xs px-3 py-1 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                      Retry
                    </button>
                    <button onClick={handleVerify}
                      disabled={captchaState === "verifying"}
                      className="text-xs px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 transition-colors">
                      <Calligraph>{captchaState === "verifying" ? "Checking…" : "Verify"}</Calligraph>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}