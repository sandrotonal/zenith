"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { PageHeader, PageFooter } from "@/components/ui/page-chrome";
import { useT } from "@/lib/i18n";

export default function ApiDocsPage() {
  const { t } = useT();
  const a = t.api;
  const [copied, setCopied] = useState<"curl" | "res" | null>(null);

  const curlExample = `curl -X POST http://localhost:8000/translate \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Ben interneti göreceğim"}'`;

  const responseExample = `{
  "zenith": "Zon interneti mvaz"
}`;

  const copy = (key: "curl" | "res", value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div className="min-h-screen w-full bg-paper text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14">
        <PageHeader section={t.nav.api} variant="sub" />

        <main className="py-12 md:py-20 space-y-20">
          <section className="space-y-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
              {a.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-[-0.04em]">
              {a.title}
              <span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="font-display italic text-2xl md:text-3xl max-w-3xl text-mute">
              {a.lede}
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t hairline pt-10">
            <div className="md:col-span-3 space-y-2">
              <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-[0.3em] border hairline">
                {a.translate}
              </span>
              <p className="font-mono-zn text-xl">{a.translatePath}</p>
            </div>

            <div className="md:col-span-9 space-y-8">
              <p className="max-w-2xl text-lg leading-relaxed text-mute">
                {a.translateDesc}
              </p>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.3em] text-mute">
                  <span>{a.reqCurl}</span>
                  <button
                    onClick={() => copy("curl", curlExample)}
                    className="inline-flex items-center gap-2 hover:text-ink transition-colors"
                  >
                    {copied === "curl" ? (
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
                <pre className="border-t hairline pt-4 font-mono-zn text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                  {curlExample}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.3em] text-mute">
                  <span>{a.response}</span>
                  <button
                    onClick={() => copy("res", responseExample)}
                    className="inline-flex items-center gap-2 hover:text-ink transition-colors"
                  >
                    {copied === "res" ? (
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
                <pre className="border-t hairline pt-4 font-mono-zn text-sm md:text-base leading-relaxed">
                  {responseExample}
                </pre>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t hairline pt-10">
            <div className="md:col-span-3 space-y-2">
              <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-[0.3em] border hairline">
                {a.translate}
              </span>
              <p className="font-mono-zn text-xl">{a.generatePath}</p>
            </div>
            <div className="md:col-span-9 space-y-4">
              <p className="max-w-2xl text-lg leading-relaxed text-mute">
                {a.generateDesc}
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                {a.generateStatus}
              </p>
            </div>
          </section>
        </main>

        <PageFooter />
      </div>
    </div>
  );
}
