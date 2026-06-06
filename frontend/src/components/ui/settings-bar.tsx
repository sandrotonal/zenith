"use client";

import { Moon, Sun } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function SettingsBar() {
  const { lang, setLang, t } = useT();
  const { theme, toggle } = useTheme();

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <div
        className="inline-flex items-center border hairline text-[10px] uppercase tracking-[0.25em]"
        role="group"
        aria-label="language"
      >
        <LangButton
          active={lang === "en"}
          onClick={() => setLang("en")}
          label="EN"
        />
        <span className="w-px h-3 bg-[var(--rule)]" />
        <LangButton
          active={lang === "tr"}
          onClick={() => setLang("tr")}
          label="TR"
        />
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={t.settings.theme}
        title={`${t.settings.theme}: ${theme === "dark" ? t.settings.dark : t.settings.light}`}
        className="inline-flex items-center justify-center w-8 h-8 border hairline text-mute hover:text-ink hover:border-[var(--fg)] transition-colors"
      >
        {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      </button>
    </div>
  );
}

function LangButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "px-2.5 py-1.5 transition-colors",
        active ? "text-ink" : "text-mute hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
