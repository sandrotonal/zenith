"use client";

import { PageHeader, PageFooter } from "@/components/ui/page-chrome";
import { useT } from "@/lib/i18n";

export default function PrivacyPage() {
  const { t } = useT();
  const p = t.privacy;
  return (
    <div className="min-h-screen w-full bg-paper text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14">
        <PageHeader section="Privacy" variant="sub" />

        <main className="py-12 md:py-20 max-w-3xl space-y-12">
          <section className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
              {p.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.04em]">
              {p.title}
              <span className="text-[var(--accent)]">.</span>
            </h1>
          </section>

          <div className="space-y-10 border-t hairline pt-10">
            {p.sections.map((s) => (
              <section key={s.n} className="space-y-3">
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-mute">
                  {s.n}
                </h2>
                <p className="text-lg leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </main>

        <PageFooter />
      </div>
    </div>
  );
}
