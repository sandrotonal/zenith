"use client";

import Link from "next/link";
import { SettingsBar } from "@/components/ui/settings-bar";
import { useT } from "@/lib/i18n";

interface PageHeaderProps {
  section: string;
  href?: string;
  variant?: "main" | "sub";
}

export function PageHeader({ section, href = "/", variant = "main" }: PageHeaderProps) {
  const { t } = useT();
  return (
    <header className="flex items-center justify-between py-6 border-b hairline">
      <Link href="/" className="flex items-baseline gap-2">
        <span className="font-display text-2xl tracking-tight">Zenith</span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-mute">
          / {section}
        </span>
      </Link>

      {variant === "sub" && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-mute hover:text-ink transition-colors"
        >
          ← {t.nav.back}
        </Link>
      )}

      {variant === "main" && (
        <div className="flex items-center gap-3 md:gap-4">
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
          <SettingsBar />
        </div>
      )}
    </header>
  );
}

export function PageFooter() {
  const { t } = useT();
  return (
    <footer className="py-10 border-t hairline text-[10px] uppercase tracking-[0.3em] text-mute">
      {t.footer.rights} · 2026
    </footer>
  );
}
