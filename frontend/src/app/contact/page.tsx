"use client";

import { ArrowUpRight } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiInstagram,
  SiX,
  SiTelegram,
  SiGmail,
  SiGithub,
} from "react-icons/si";
import { PageHeader, PageFooter } from "@/components/ui/page-chrome";
import { useT } from "@/lib/i18n";

const ICON_SIZE = 20;

function iconFor(label: string): IconType | null {
  if (label === "Instagram") return SiInstagram;
  if (label.startsWith("Twitter")) return SiX;
  if (label === "Telegram") return SiTelegram;
  if (label === "Mail" || label === "E-posta") return SiGmail;
  if (label === "GitHub") return SiGithub;
  return null;
}

export default function ContactPage() {
  const { t } = useT();
  const c = t.contact;

  return (
    <div className="min-h-screen w-full bg-paper text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14">
        <PageHeader section={t.nav.contact} variant="sub" />

        <main className="py-12 md:py-20 space-y-16">
          <section className="space-y-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
              {c.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-[-0.04em]">
              {c.title}
              <span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="font-display italic text-2xl md:text-3xl max-w-3xl text-mute">
              {c.lede}
            </p>
            <p className="text-sm md:text-base text-mute max-w-2xl leading-relaxed">
              {c.intro}
            </p>
          </section>

          <ul className="border-t hairline">
            {c.list.map((item) => {
              const Icon = iconFor(item.label);
              const isMail = item.href.startsWith("mailto:");
              return (
                <li
                  key={item.label}
                  className="border-b hairline group transition-colors"
                >
                  <a
                    href={item.href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    aria-label={`${item.label}: ${item.handle}`}
                    className="grid grid-cols-12 items-center gap-4 py-6 md:py-8 transition-colors hover:bg-[var(--fg)]/[0.02]"
                  >
                    <span className="col-span-2 md:col-span-1 text-[10px] tracking-[0.3em] text-mute pl-2 md:pl-4">
                      {item.n}
                    </span>

                    <span className="col-span-10 md:col-span-5 flex items-center gap-3">
                      {Icon && (
                        <Icon
                          size={ICON_SIZE}
                          className="shrink-0 text-ink/80 group-hover:text-[var(--accent)] transition-colors"
                          aria-hidden
                        />
                      )}
                      <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-mute group-hover:text-ink transition-colors">
                        {item.label}
                      </span>
                    </span>

                    <span className="col-span-12 md:col-span-5 font-mono-zn text-lg md:text-2xl tracking-tight break-all pl-2 md:pl-0 -mt-2 md:mt-0">
                      {item.handle}
                    </span>

                    <span className="hidden md:flex col-span-1 justify-end pr-4">
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        className="text-mute group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </main>

        <PageFooter />
      </div>
    </div>
  );
}
