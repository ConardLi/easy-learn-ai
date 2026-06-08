import React from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export const SectionShell: React.FC<{
  num: string;
  label: string;
  children: React.ReactNode;
  tone?: "cream" | "white" | "butter" | "teal";
}> = ({ num, label, children, tone = "cream" }) => {
  const toneClass =
    tone === "white"
      ? "bg-white"
      : tone === "butter"
        ? "bg-butter-tint"
        : tone === "teal"
          ? "bg-teal text-cream"
          : "bg-cream";

  return (
    <section className={`${toneClass} px-5 py-16 md:px-8 md:py-24`}>
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor">
          <span className="section-anchor-num">{num}</span>
          <span className="section-anchor-label">{label}</span>
        </div>
        {children}
      </div>
    </section>
  );
};

export const StampLink: React.FC<{
  href: string;
  title: string;
  desc: string;
  compact?: boolean;
}> = ({ href, title, desc, compact = false }) => {
  return (
    <a
      href={href}
      className={`group flex items-start gap-3 border-2 border-ink bg-butter text-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg ${
        compact ? "rounded-xl p-4" : "rounded-2xl p-5"
      }`}
    >
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white">
        <ExternalLink className="h-4 w-4 text-ink" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 font-bold">
          {title}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-250 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-ink/75">{desc}</span>
      </span>
    </a>
  );
};

export const MiniBadge: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({
  children,
  dark = false,
}) => (
  <span
    className={`inline-flex items-center rounded-full border-2 border-ink px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] ${
      dark ? "bg-ink text-cream" : "bg-white text-ink"
    }`}
  >
    {children}
  </span>
);

export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
