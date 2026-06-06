"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { SettingsBar } from "@/components/ui/settings-bar";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { ArrowUp, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";

const API_BASE_URL = "http://localhost:8000";

type Mode = "tr-zn" | "zn-tr";
type Tense = "present" | "past" | "future";

interface HistoryItem {
  original: string;
  zenith: string;
  timestamp: number;
}

function useAutoResizeTextarea(minHeight: number, maxHeight?: number) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const adjust = useCallback(
    (reset?: boolean) => {
      const el = ref.current;
      if (!el) return;
      if (reset) {
        el.style.height = `${minHeight}px`;
        return;
      }
      el.style.height = `${minHeight}px`;
      const next = Math.max(
        minHeight,
        Math.min(el.scrollHeight, maxHeight ?? Infinity),
      );
      el.style.height = `${next}px`;
    },
    [minHeight, maxHeight],
  );
  useEffect(() => {
    if (ref.current) ref.current.style.height = `${minHeight}px`;
  }, [minHeight]);
  return { ref, adjust };
}

export default function ZenithChat() {
  const { t } = useT();
  const [message, setMessage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<Mode>("tr-zn");
  const [tense, setTense] = useState<Tense>("present");
  const [status, setStatus] = useState<"checking" | "online" | "offline">(
    "checking",
  );
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [now, setNow] = useState<string>("");

  const { ref: textareaRef, adjust } = useAutoResizeTextarea(56, 220);

  useEffect(() => {
    const saved = localStorage.getItem("zenith_history");
    if (saved) setHistory(JSON.parse(saved));

    const check = async () => {
      try {
        await axios.get(API_BASE_URL, { timeout: 3000 });
        setStatus("online");
      } catch {
        setStatus("offline");
      }
    };
    check();

    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      const ss = d.getSeconds().toString().padStart(2, "0");
      setNow(`${hh}:${mm}:${ss}`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const saveToHistory = (original: string, zenith: string) => {
    const item: HistoryItem = { original, zenith, timestamp: Date.now() };
    const updated = [
      item,
      ...history.filter((h) => h.original !== original),
    ].slice(0, 6);
    setHistory(updated);
    localStorage.setItem("zenith_history", JSON.stringify(updated));
  };

  const handleTranslate = async () => {
    if (!message.trim() || loading) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/translate`, {
        text: message,
      });
      let out: string = data.zenith ?? "";

      if (mode === "tr-zn" && tense !== "present") {
        const words = out.split(" ");
        const verb = words[words.length - 1];
        if (tense === "past" && verb && !verb.startsWith("m")) {
          words[words.length - 1] = "m" + verb;
        } else if (tense === "future" && verb && !verb.startsWith("v")) {
          words[words.length - 1] = "v" + verb;
        }
        out = words.join(" ");
      }
      setTranslatedText(out);
      saveToHistory(message, out);
    } catch {
      setTranslatedText(t.home.errorOffline);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!translatedText) return;
    await navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("zenith_history");
  };

  const statusLabel =
    status === "online"
      ? t.home.engineOnline
      : status === "offline"
        ? t.home.engineOffline
        : t.home.pinging;

  return (
    <div className="relative min-h-screen w-full bg-paper text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14">
        <header className="sticky top-0 z-30 bg-paper border-b hairline flex items-center justify-between py-6">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display text-2xl tracking-tight">Zenith</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-mute">
              / ˈzē-nəth
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[11px] uppercase tracking-[0.25em] text-mute">
            <Link href="/about" className="hover:text-ink transition-colors">
              {t.nav.index}
            </Link>
            <Link href="/rules" className="hover:text-ink transition-colors">
              {t.nav.grammar}
            </Link>
            <Link
              href="/api-docs"
              className="hover:text-ink transition-colors"
            >
              {t.nav.api}
            </Link>
            <Link
              href="/contact"
              className="hover:text-ink transition-colors"
            >
              {t.nav.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <SettingsBar />
            <button
              className="md:hidden p-1 text-mute hover:text-ink"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500 border-b hairline",
            menuOpen ? "max-h-[28rem] py-6" : "max-h-0",
          )}
        >
          <div className="flex flex-col gap-4 text-2xl font-display">
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              {t.nav.index}
            </Link>
            <Link href="/rules" onClick={() => setMenuOpen(false)}>
              {t.nav.grammar}
            </Link>
            <Link href="/api-docs" onClick={() => setMenuOpen(false)}>
              {t.nav.api}
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              {t.nav.contact}
            </Link>
          </div>
        </div>

        <section className="pt-12 md:pt-20 pb-16 md:pb-24 border-b hairline">
          <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.35em] text-mute">
            <span>{t.home.eyebrow}</span>
            <span className="hidden md:inline">
              {now} · {statusLabel}
            </span>
          </div>

          <h1 className="font-display mt-10 md:mt-16 text-[clamp(5rem,18vw,16rem)] leading-[0.82] tracking-[-0.045em]">
            {t.home.heroTitle}
            <span className="text-[var(--accent)]">.</span>
          </h1>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-10">
            <p className="md:col-span-6 font-display italic text-2xl md:text-3xl leading-snug">
              {t.home.heroSubtitle}
            </p>
            <p className="md:col-span-5 md:col-start-8 text-sm md:text-base leading-relaxed text-mute max-w-md">
              {t.home.heroBody}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 border-b hairline">
          <aside className="lg:col-span-3 lg:border-r hairline p-6 md:p-10 space-y-10">
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                {t.home.direction}
              </p>
              <div className="flex flex-col gap-2">
                <ModeRow
                  active={mode === "tr-zn"}
                  onClick={() => setMode("tr-zn")}
                  index="I"
                  label={t.home.trToZn}
                />
                <ModeRow
                  active={mode === "zn-tr"}
                  onClick={() => setMode("zn-tr")}
                  index="II"
                  label={t.home.znToTr}
                />
              </div>
            </div>

            {mode === "tr-zn" && (
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                  {t.home.tense}
                </p>
                <div className="flex flex-col gap-2">
                  {(["present", "past", "future"] as const).map((te) => (
                    <TenseRow
                      key={te}
                      active={tense === te}
                      onClick={() => setTense(te)}
                      label={
                        te === "present"
                          ? t.home.present
                          : te === "past"
                            ? t.home.past
                            : t.home.future
                      }
                      sub={
                        te === "present"
                          ? t.home.presentTr
                          : te === "past"
                            ? t.home.pastTr
                            : t.home.futureTr
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                {t.home.engine}
              </p>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    status === "online" && "bg-emerald-500",
                    status === "offline" && "bg-[var(--accent)]",
                    status === "checking" && "bg-mute animate-pulse",
                  )}
                />
                <span className="text-sm">{statusLabel}</span>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9 p-6 md:p-10 space-y-8">
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="source"
                  className="text-[10px] uppercase tracking-[0.3em] text-mute"
                >
                  {t.home.input}
                </label>
                <span className="text-[10px] uppercase tracking-[0.3em] text-mute">
                  {mode === "tr-zn" ? t.home.inputTr : t.home.inputZn}
                </span>
              </div>
              <div className="border-b hairline focus-within:border-[var(--fg)] transition-colors">
                <Textarea
                  id="source"
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    adjust();
                  }}
                  placeholder={
                    mode === "tr-zn"
                      ? t.home.placeholderTr
                      : t.home.placeholderZn
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      handleTranslate();
                    }
                  }}
                  className={cn(
                    "w-full bg-transparent border-0 px-0 py-4 resize-none",
                    "text-2xl md:text-4xl font-display tracking-tight",
                    "placeholder:text-mute/60 placeholder:italic",
                    "focus:outline-none focus-visible:ring-0",
                    "text-ink",
                  )}
                  style={{ overflow: "hidden" }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-mute">
                <span>{t.home.hint}</span>
                <span>{message.length.toString().padStart(3, "0")} ch</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleTranslate}
                disabled={loading || !message.trim()}
                className={cn(
                  "group inline-flex items-center gap-3 px-6 py-3",
                  "border border-[var(--fg)]",
                  "bg-[var(--fg)] text-[var(--bg)]",
                  "hover:bg-transparent hover:text-[var(--fg)]",
                  "disabled:opacity-30 disabled:cursor-not-allowed",
                  "transition-colors",
                )}
              >
                <span className="text-[11px] uppercase tracking-[0.3em]">
                  {loading ? t.home.working : t.home.translate}
                </span>
                <ArrowUp
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5"
                />
              </button>
              <button
                onClick={() => {
                  setMessage("");
                  setTranslatedText("");
                  adjust(true);
                }}
                className="text-[11px] uppercase tracking-[0.3em] text-mute hover:text-ink transition-colors"
              >
                {t.home.clear}
              </button>
            </div>

            {translatedText && (
              <div className="fade-up pt-6 space-y-4 border-t hairline">
                <div className="flex items-baseline justify-between">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                    {t.home.output}
                  </p>
                  <button
                    onClick={copy}
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-mute hover:text-ink transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-emerald-500" />
                        {t.home.copied}
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> {t.home.copy}
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono-zn text-3xl md:text-5xl lg:text-6xl leading-[1.05] break-words">
                  {translatedText}
                  <span className="cursor-blink" />
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 border-b hairline">
          <div className="lg:col-span-3 lg:border-r hairline p-6 md:p-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
              {t.home.recent}
            </p>
          </div>
          <div className="lg:col-span-9 p-6 md:p-10">
            {history.length === 0 ? (
              <p className="font-display italic text-xl text-mute">
                {t.home.recentEmpty}
              </p>
            ) : (
              <ul className="divide-y hairline">
                {history.map((item, i) => (
                  <li
                    key={`${item.timestamp}-${i}`}
                    className="group py-5 flex items-baseline gap-6 cursor-pointer"
                    onClick={() => {
                      setMessage(item.original);
                      setTranslatedText(item.zenith);
                    }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-mute w-12">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10">
                      <p className="truncate text-sm text-mute group-hover:text-ink transition-colors">
                        {item.original}
                      </p>
                      <p className="truncate font-mono-zn text-base md:text-lg">
                        {item.zenith}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-mute group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </li>
                ))}
              </ul>
            )}
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="mt-6 text-[10px] uppercase tracking-[0.3em] text-mute hover:text-[var(--accent)] transition-colors"
              >
                {t.home.clearHistory}
              </button>
            )}
          </div>
        </section>

        <footer className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10 text-[10px] uppercase tracking-[0.3em] text-mute">
          <div className="space-y-1">
            <p className="text-ink">{t.footer.project}</p>
            <p>{t.footer.description}</p>
          </div>
          <div className="space-y-1">
            <p className="text-ink">{t.footer.version}</p>
            <p>{t.footer.principles}</p>
          </div>
          <div className="space-y-1 md:text-right">
            <p>{t.footer.made}</p>
            <p>{t.footer.rights}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function ModeRow({
  active,
  onClick,
  index,
  label,
}: {
  active: boolean;
  onClick: () => void;
  index: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-baseline gap-3 py-1 text-left transition-colors",
        active ? "text-ink" : "text-mute hover:text-ink",
      )}
    >
      <span
        className={cn(
          "text-[10px] tracking-[0.3em] w-6",
          active ? "text-[var(--accent)]" : "text-mute",
        )}
      >
        {index}
      </span>
      <span
        className={cn(
          "font-display text-xl md:text-2xl tracking-tight",
          active && "italic",
        )}
      >
        {label}
      </span>
    </button>
  );
}

function TenseRow({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-baseline gap-3 py-1 text-left transition-colors",
        active ? "text-ink" : "text-mute hover:text-ink",
      )}
    >
      <span
        className={cn(
          "h-px w-4 self-center transition-colors",
          active ? "bg-[var(--accent)]" : "bg-mute/40",
        )}
      />
      <span className="text-sm">{label}</span>
      <span className="text-[10px] tracking-[0.3em] text-mute ml-auto">
        {sub}
      </span>
    </button>
  );
}
