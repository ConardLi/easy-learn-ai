import React from "react";
import { ExternalLink } from "lucide-react";

export const SectionHead: React.FC<{
  number: string;
  label: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  inverse?: boolean;
}> = ({ number, label, title, intro, inverse }) => (
  <div className="grid gap-6 lg:grid-cols-12 lg:gap-10 mb-9">
    <div className="lg:col-span-7">
      <div className="section-anchor">
        <span className="section-anchor-num">{number}</span>
        <span className={`section-anchor-label ${inverse ? "!text-cream/65" : ""}`}>{label}</span>
      </div>
      <h2 className={`font-display text-display-lg font-extrabold leading-[1.08] ${inverse ? "text-cream" : ""}`}>{title}</h2>
    </div>
    <div className={`lg:col-span-5 lg:self-end text-[15.5px] leading-[1.8] ${inverse ? "text-cream/80" : "text-ink/75"}`}>{intro}</div>
  </div>
);

export const LinkCard: React.FC<{ href: string; title: string; desc: string; compact?: boolean }> = ({
  href,
  title,
  desc,
  compact,
}) => (
  <a
    href={href}
    className={`block border-2 border-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring ${compact ? "bg-white rounded-xl px-4 py-3" : "bg-butter rounded-2xl px-5 py-4"}`}
  >
    <span className="flex items-start gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white">
        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
      <span>
        <span className="block font-display text-base font-bold leading-tight">{title}</span>
        <span className="mt-1.5 block text-[13px] leading-relaxed text-ink/70">{desc}</span>
      </span>
    </span>
  </a>
);

export const DemoBadge: React.FC = () => (
  <span className="rounded-full border-2 border-ink bg-butter px-2.5 py-1 font-mono text-[10px] font-bold tracking-[.14em]">示意</span>
);
