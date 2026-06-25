import React from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export const SectionHead: React.FC<{
  number: string;
  label: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  inverse?: boolean;
}> = ({ number, label, title, intro, inverse = false }) => (
  <div className="grid lg:grid-cols-12 gap-5 lg:gap-10 mb-10">
    <div className="lg:col-span-7">
      <div className="section-anchor">
        <span className="section-anchor-num">{number}</span>
        <span className={`section-anchor-label ${inverse ? "!text-cream/65" : ""}`}>{label}</span>
      </div>
      <h2 className={`font-display text-display-lg font-extrabold leading-[1.08] ${inverse ? "text-cream" : ""}`}>
        {title}
      </h2>
    </div>
    <div className={`lg:col-span-5 lg:self-end text-[15.5px] leading-[1.8] ${inverse ? "text-cream/80" : "text-ink/75"}`}>
      {intro}
    </div>
  </div>
);

export const DemoBadge: React.FC = () => (
  <span className="inline-flex items-center rounded-full border-2 border-ink bg-butter px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] uppercase">
    示意
  </span>
);

export const LinkCard: React.FC<{
  href: string;
  title: string;
  desc: string;
  compact?: boolean;
}> = ({ href, title, desc, compact = false }) => (
  <a
    href={href}
    className={[
      "block border-2 border-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring",
      compact ? "bg-white rounded-xl px-4 py-3.5" : "bg-butter rounded-2xl px-5 py-4",
    ].join(" ")}
  >
    <div className="flex items-start gap-3">
      <span
        className={[
          "flex-shrink-0 rounded-full border-2 border-ink flex items-center justify-center mt-0.5",
          compact ? "w-6 h-6 bg-cream" : "w-7 h-7 bg-white",
        ].join(" ")}
      >
        {compact ? (
          <ArrowUpRight className="w-3.5 h-3.5 text-ink" strokeWidth={2.6} />
        ) : (
          <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
        )}
      </span>
      <span>
        <span className="font-display font-bold text-[16px] text-ink block leading-tight">
          {title}
        </span>
        <span className="font-sans text-[13px] leading-relaxed text-ink/75 block mt-1.5">
          {desc}
        </span>
      </span>
    </div>
  </a>
);

export const Meter: React.FC<{
  value: number;
  max?: number;
  tone?: "teal" | "coral" | "pop" | "butter";
}> = ({ value, max = 100, tone = "teal" }) => {
  const width = Math.max(2, Math.min(100, (value / max) * 100));
  const color = {
    teal: "bg-teal",
    coral: "bg-coral",
    pop: "bg-pop",
    butter: "bg-butter",
  }[tone];
  return (
    <div className="h-3 rounded-full border-2 border-ink bg-cream overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-250 ease-editorial`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
