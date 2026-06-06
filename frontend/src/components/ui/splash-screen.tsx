"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DURATION = 2000;
const FADE = 700;
const STORAGE_KEY = "zenith_splash_seen";

export function SplashScreen() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clock, setClock] = useState("");
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(STORAGE_KEY)) {
      setHiding(true);
      setGone(true);
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, "1");

    const start = performance.now();
    startRef.current = start;

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(p);
      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    const updateClock = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      const ss = d.getSeconds().toString().padStart(2, "0");
      setClock(`${hh}:${mm}:${ss}`);
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    const hideTimer = window.setTimeout(() => setHiding(true), DURATION);
    const goneTimer = window.setTimeout(() => setGone(true), DURATION + FADE);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        setHiding(true);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      clearTimeout(goneTimer);
      clearInterval(clockInterval);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (gone) return null;

  const skip = () => setHiding(true);

  return (
    <div
      role="dialog"
      aria-label="Loading Zenith"
      aria-hidden={hiding}
      className={cn(
        "fixed inset-0 z-[200] flex flex-col bg-paper text-ink",
        "transition-opacity ease-out select-none",
        hiding ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
      style={{ transitionDuration: `${FADE}ms` }}
    >
      <div className="flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-14 py-5 md:py-6 text-[10px] uppercase tracking-[0.3em] text-mute">
        <span className="font-mono-zn">01 / Edition</span>
        <span className="font-mono-zn tabular-nums">{clock}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8">
        <h1
          className="splash-title font-display text-[clamp(3.75rem,17vw,15rem)] leading-[0.85] text-center"
          aria-label="Zenith"
        >
          Zenith<span className="text-[var(--accent)]">.</span>
        </h1>

        <p className="splash-line font-display italic text-base sm:text-xl md:text-2xl lg:text-3xl text-mute mt-6 md:mt-10 text-center max-w-2xl">
          Universal Logic Language
          <span className="splash-cursor">▍</span>
        </p>
      </div>

      <div className="splash-meta flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 px-5 sm:px-8 md:px-12 lg:px-14 py-5 md:py-6 text-[10px] uppercase tracking-[0.3em] text-mute">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="font-mono-zn tabular-nums shrink-0 w-12 text-right">
            {Math.floor(progress).toString().padStart(3, "0")}%
          </span>
          <div
            className="h-px flex-1 bg-[var(--rule)] overflow-hidden"
            aria-hidden
          >
            <div
              className="h-full bg-[var(--fg)]"
              style={{
                width: `${progress}%`,
                transition: "width 100ms linear",
              }}
            />
          </div>
          <span className="font-mono-zn shrink-0 hidden sm:inline">
            loading engine
          </span>
        </div>

        <button
          type="button"
          onClick={skip}
          className="group inline-flex items-center justify-center sm:justify-end gap-2 min-h-[44px] px-2 hover:text-ink transition-colors"
          aria-label="Skip splash"
        >
          <span>Skip</span>
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
}
