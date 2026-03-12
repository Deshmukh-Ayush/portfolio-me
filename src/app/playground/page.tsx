"use client"

import ThemeToggle from "@/components/ui/theme-toggle";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

type CaptchaState = "idle" | "loading" | "challenge" | "verifying" | "success" | "error";

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

  const svgRef = useRef<SVGSVGElement>(null);
  const total = dots.length;

  const handleCheckboxClick = () => {
    if (captchaState !== "idle" && captchaState !== "error") return;
    setCaptchaState("loading");
    const count = Math.floor(Math.random() * 3) + 6;
    setDots(generateDots(count, W, H));
    setConnected([]);
    setCompleted(false);
    setDragging(false);
    setFromDot(null);
    setCursor(null);
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

  const getDotAt = (x: number, y: number): Dot | null =>
    dots.find((d) => Math.hypot(d.x - x, d.y - y) < DOT_RADIUS) ?? null;

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
    } else {
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 400);
    }
  }, [connected, completed, dots]);

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    setCursor(getSVGPoint(e));
  }, [dragging]);

  const handleMouseUp = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !fromDot) return;
    setDragging(false);
    setCursor(null);
    const pt = getSVGPoint(e);
    const target = getDotAt(pt.x, pt.y);
    const lastConnected = connected[connected.length - 1];
    const nextExpected = connected.length + 1;
    const expectedTarget = fromDot.id === lastConnected ? nextExpected : nextExpected + 1;
    if (target && target.id === expectedTarget) {
      const newIds = fromDot.id === lastConnected
        ? [...connected, target.id]
        : [...connected, fromDot.id, target.id];
      const deduped = newIds.filter((v, i, a) => a.indexOf(v) === i);
      setConnected(deduped);
      if (deduped.length === total) setCompleted(true);
    } else {
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 400);
    }
    setFromDot(null);
  }, [dragging, fromDot, connected, dots, total]);

  const handleRetry = () => {
    const count = Math.floor(Math.random() * 3) + 6;
    setDots(generateDots(count, W, H));
    setConnected([]);
    setCompleted(false);
    setDragging(false);
    setFromDot(null);
    setCursor(null);
    setCaptchaState("challenge");
  };

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

  const lines: Line[] = [];
  for (let i = 1; i < connected.length; i++) {
    const a = dots.find((d) => d.id === connected[i - 1]);
    const b = dots.find((d) => d.id === connected[i]);
    if (a && b) lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
  }

  const isExpanded = captchaState === "challenge" || captchaState === "verifying" || captchaState === "error";

  // pencil cursor: offset so tip of pencil aligns with pointer
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
      `}</style>

      <div className="flex flex-col items-center gap-4">

        {/* Outer wrapper — layout animated so width transitions smoothly */}
        <motion.div layout className="bg-gray-100 shadow-[0px_1px_1px_1px_#e5e5e5] rounded-xl overflow-hidden w-fit">

          {/* Top row — fixed compact size */}
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

          {/* Collapsible challenge */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="challenge"
                initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                transition={{
                  type: "spring",
                  stiffness: 800,
                  damping: 80,
                  mass: 4,
                }}
                style={{ overflow: "hidden" }}
              >
                <div className="border-t border-gray-200">
                  <div className="px-3 pt-2 pb-1">
                    <p className="text-xs text-gray-400 font-mono">
                      Connect dots 1 → {total} in order to verify
                    </p>
                  </div>

                  {/* Canvas */}
                  <div
                    className="relative mx-3 rounded-lg overflow-hidden"
                    style={{
                      width: W,
                      height: H,
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
                      style={{ touchAction: "none", cursor: "inherit" }}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={(e) => { setIsOnCanvas(false); handleMouseUp(e); }}
                      onTouchStart={handleMouseDown}
                      onTouchMove={handleMouseMove}
                      onTouchEnd={handleMouseUp}
                    >
                      <defs>
                        {/* Pencil texture — roughens edges like graphite */}
                        <filter id="pencil-texture" x="-5%" y="-5%" width="110%" height="110%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                          <feComposite in="displaced" in2="SourceGraphic" operator="in" />
                        </filter>
                        {/* Softer filter for dots so they stay readable */}
                        <filter id="dot-texture" x="-10%" y="-10%" width="120%" height="120%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                      </defs>

                      {/* Committed lines */}
                      {lines.map((l, i) => (
                        <line key={i}
                          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                          stroke={completed ? "#15803d" : "#1d4ed8"}
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          className="pencil-stroke"
                          opacity={0.8}
                        />
                      ))}

                      {/* Live drag line */}
                      {dragging && fromDot && cursor && (
                        <line
                          x1={fromDot.x} y1={fromDot.y}
                          x2={cursor.x} y2={cursor.y}
                          stroke={wrongFlash ? "#dc2626" : "#9ca3af"}
                          strokeWidth={1.5} strokeLinecap="round"
                          strokeDasharray="5 3" opacity={0.55}
                          className="pencil-stroke"
                        />
                      )}

                      {/* Dots */}
                      {dots.map((dot) => {
                        const isDone = connected.includes(dot.id);
                        const isNext = dot.id === connected.length + 1 && !completed;
                        const isLast = dot.id === connected[connected.length - 1];
                        return (
                          <g key={dot.id}>
                            <circle
                              cx={dot.x} cy={dot.y} r={11}
                              fill={isDone ? (completed ? "#dcfce7" : "#dbeafe") : "#fff"}
                              stroke={isDone ? (completed ? "#15803d" : "#1d4ed8") : wrongFlash && isNext ? "#dc2626" : isNext ? "#6b7280" : "#d1d5db"}
                              strokeWidth={isNext || isLast ? 1.5 : 1}
                              filter="url(#dot-texture)"
                              style={{ cursor: "inherit" }}
                            />
                            <text
                              x={dot.x} y={dot.y + 4}
                              textAnchor="middle" fontSize={9}
                              fontFamily="monospace" fontWeight="600"
                              fill={isDone ? (completed ? "#15803d" : "#1d4ed8") : "#6b7280"}
                              style={{ userSelect: "none", pointerEvents: "none" }}
                            >
                              {dot.id}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-2 px-3 py-2">
                    <span className="text-xs text-gray-400 flex-1 font-mono">
                      {completed ? "✓ all connected" : `${connected.length} / ${total}`}
                    </span>
                    <button onClick={handleRetry}
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
        </motion.div>
      </div>
    </div>
  );
}