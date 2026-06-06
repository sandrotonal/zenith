"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, PageFooter } from "@/components/ui/page-chrome";
import { useT } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useT();
  const a = t.about;
  return (
    <div className="min-h-screen w-full bg-paper text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14">
        <PageHeader section={t.nav.index} variant="sub" />

        <main className="py-12 md:py-20 space-y-20">
          <section className="space-y-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
              {a.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-[-0.04em] max-w-5xl">
              {a.titleA}
              <span className="italic text-[var(--accent)]">{a.titleAccent}</span>
              {a.titleB}
            </h1>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t hairline pt-10">
            <div className="md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                {a.premise}
              </p>
            </div>
            <div className="md:col-span-9 max-w-3xl space-y-6 text-lg leading-relaxed">
              <p>{a.premiseP1}</p>
              <p className="text-mute">{a.premiseP2}</p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t hairline pt-10">
            <div className="md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                {a.principles}
              </p>
            </div>
            <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-10">
              {a.principlesList.map((p) => (
                <div key={p.n} className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] tracking-[0.3em] text-[var(--accent)]">
                      {p.n}
                    </span>
                    <h3 className="font-display text-2xl tracking-tight">
                      {p.t}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-mute">{p.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t hairline pt-10">
            <div className="md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                {a.continue}
              </p>
            </div>
            <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
              <NextLink
                href="/rules"
                label={a.grammarLink}
                sub={a.grammarSub}
              />
              <NextLink href="/api-docs" label={a.apiLink} sub={a.apiSub} />
            </div>
          </section>
        </main>

        <PageFooter />
      </div>
    </div>
  );
}

function NextLink({
  href,
  label,
  sub,
}: {
  href: string;
  label: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between border-t hairline py-5 hover:border-ink transition-colors"
    >
      <div className="space-y-1">
        <p className="font-display text-2xl tracking-tight">{label}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
          {sub}
        </p>
      </div>
      <ArrowUpRight
        size={20}
        className="text-mute group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
      />
    </Link>
  );
}
