import React from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

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
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) => (
  <a href={href} className="flex items-start gap-3 px-5 py-4 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring">
    <span className="shrink-0 w-7 h-7 rounded-full border-2 border-ink bg-white flex items-center justify-center">
      <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
    </span>
    <span className="text-[13.5px] leading-relaxed text-ink/75">
      <strong className="text-ink">{title}</strong> {children}
    </span>
    <ArrowUpRight className="w-4 h-4 shrink-0 mt-1" />
  </a>
);

export const ProbBar = ({ label, value, tone }: { label: string; value: number; tone: string }) => (
  <div>
    <div className="flex justify-between font-mono text-[11px] mb-1">
      <span>{label}</span><span>{value.toFixed(2)}</span>
    </div>
    <div className="h-4 bg-white border-2 border-ink rounded-full overflow-hidden">
      <div className={`h-full ${tone} transition-all duration-250`} style={{ width: `${value * 100}%` }} />
    </div>
  </div>
);
