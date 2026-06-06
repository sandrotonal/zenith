"use client";

import { ArrowRight } from "lucide-react";
import { PageHeader, PageFooter } from "@/components/ui/page-chrome";
import { useT } from "@/lib/i18n";

export default function RulesPage() {
  const { t } = useT();
  const r = t.rules;
  return (
    <div className="min-h-screen w-full bg-paper text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14">
        <PageHeader section={t.nav.grammar} variant="sub" />

        <main className="py-12 md:py-20 space-y-20">
          <section className="space-y-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
              {r.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-[-0.04em]">
              {r.title}
              <span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="font-display italic text-2xl md:text-3xl max-w-3xl text-mute">
              {r.lede}
            </p>
          </section>

          <div className="space-y-16 border-t hairline pt-10">
            {r.rules.map((rule, idx) => (
              <section
                key={rule.title}
                className="grid grid-cols-1 md:grid-cols-12 gap-10"
              >
                <div className="md:col-span-3 space-y-2">
                  <p className="font-display text-6xl md:text-7xl text-mute leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="md:col-span-9 space-y-6">
                  <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                    {rule.title}
                  </h2>
                  <p className="max-w-2xl text-lg leading-relaxed text-mute">
                    {rule.body}
                  </p>

                  {"example" in rule && rule.example && (
                    <div className="border-t hairline pt-6 space-y-2 font-mono-zn">
                      {rule.example.map((e, i) => (
                        <div
                          key={i}
                          className="flex items-baseline gap-6 text-2xl md:text-3xl"
                        >
                          <span className="text-mute text-xs tracking-[0.3em] w-8">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{e.tr}</span>
                          <ArrowRight
                            size={16}
                            className="text-mute self-center"
                          />
                          <span>{e.zn}</span>
                        </div>
                      ))}
                      <p className="text-sm text-mute pt-2 italic font-display">
                        {rule.gloss}
                      </p>
                    </div>
                  )}

                  {"pairs" in rule && rule.pairs && (
                    <div className="border-t hairline pt-6 space-y-3 font-mono-zn">
                      {rule.pairs.map((p) => (
                        <div
                          key={p.src}
                          className="flex items-baseline gap-6 text-2xl"
                        >
                          <span className="text-mute text-sm tracking-[0.2em] w-32">
                            {p.src}
                          </span>
                          <ArrowRight
                            size={14}
                            className="text-mute self-center"
                          />
                          <span>{p.zn}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {"affixes" in rule && rule.affixes && (
                    <div className="border-t hairline pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                      {rule.affixes.map((af) => (
                        <div key={af.label} className="space-y-1">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                            {af.label}
                          </p>
                          <p className="font-mono-zn text-lg">{af.ex}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </main>

        <PageFooter />
      </div>
    </div>
  );
}
