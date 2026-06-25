import React from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export const Anchor = ({ n, label }: { n: string; label: string }) => (
  <div className="section-anchor">
    <span className="section-anchor-num">{n}</span>
    <span className="section-anchor-label">{label}</span>
  </div>
);

export const LinkCard = ({
  href,
  title,
  children,
  compact = false,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
  compact?: boolean;
}) => (
  <a
    href={href}
    className={[
      "flex items-start gap-3 border-2 border-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring",
      compact ? "bg-white rounded-xl px-4 py-3" : "bg-butter rounded-2xl px-5 py-4",
    ].join(" ")}
  >
    <span className="shrink-0 w-7 h-7 rounded-full border-2 border-ink bg-white flex items-center justify-center">
      <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.5} />
    </span>
    <span className="text-[13.5px] leading-relaxed text-ink/75">
      <span className="font-bold text-ink">{title}</span> {children}
    </span>
    <ArrowUpRight className="w-4 h-4 shrink-0 mt-1" strokeWidth={2.4} />
  </a>
);

export const Meter = ({
  label,
  value,
  tone = "bg-teal",
}: {
  label: string;
  value: number;
  tone?: string;
}) => (
  <div>
    <div className="flex justify-between text-[11px] font-mono text-ink/55 mb-1">
      <span>{label}</span>
      <span>{Math.round(value)}%</span>
    </div>
    <div className="h-3 rounded-full border-2 border-ink bg-white overflow-hidden">
      <div className={`h-full ${tone} transition-all duration-250`} style={{ width: `${value}%` }} />
    </div>
  </div>
);
