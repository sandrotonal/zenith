"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "zenith_cookie_consent";
const FADE = 500;

type Consent = "accepted" | "declined" | null;

export function CookieBanner() {
  const { t } = useT();
  const [consent, setConsent] = useState<Consent>("accepted");
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "accepted" || saved === "declined") {
        setConsent(saved);
        setLeaving(true);
      } else {
        setConsent(null);
      }
    } catch {
      setConsent(null);
    }
  }, []);

  const decide = (value: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setLeaving(true);
    window.setTimeout(() => setConsent(value), FADE);
  };

  if (!mounted || consent !== null) return null;
  const c = t.cookies;

  return (
    <div
      role="dialog"
      aria-label={c.title}
      className={cn(
        "fixed inset-x-0 bottom-0 z-[150] bg-paper border-t hairline",
        "transition-all ease-out",
        leaving
          ? "translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100",
      )}
      style={{ transitionDuration: `${FADE}ms` }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 md:px-10 lg:px-14 py-5 md:py-6">
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Cookie
              size={18}
              strokeWidth={1.5}
              className="shrink-0 text-[var(--accent)] mt-0.5"
              aria-hidden
            />
            <div className="space-y-1.5 min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                {c.label} · {c.title}
              </p>
              <p className="text-sm leading-relaxed text-ink/90">
                {c.body}{" "}
                <Link
                  href="/privacy"
                  className="underline decoration-[var(--rule)] underline-offset-4 hover:decoration-[var(--fg)] hover:text-ink transition-colors"
                >
                  {c.policyLink}
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:shrink-0 self-stretch md:self-auto">
            <button
              type="button"
              onClick={() => decide("declined")}
              className={cn(
                "flex-1 md:flex-none px-5 py-3 border hairline",
                "text-[11px] uppercase tracking-[0.3em]",
                "text-ink hover:bg-[var(--fg)]/[0.04] transition-colors",
              )}
            >
              {c.decline}
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className={cn(
                "flex-1 md:flex-none px-5 py-3",
                "bg-[var(--fg)] text-[var(--bg)]",
                "text-[11px] uppercase tracking-[0.3em]",
                "hover:bg-transparent hover:text-[var(--fg)] hover:border-[var(--fg)]",
                "border border-[var(--fg)]",
                "transition-colors",
              )}
            >
              {c.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
