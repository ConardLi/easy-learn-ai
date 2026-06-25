import React from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export const SectionShell: React.FC<{
  num: string;
  label: string;
  tone?: "cream" | "white" | "butter" | "teal";
  children: React.ReactNode;
}> = ({ num, label, tone = "cream", children }) => (
  <section className={`px-5 py-16 md:px-8 md:py-24 ${tone === "white" ? "bg-white" : tone === "butter" ? "bg-butter-tint" : tone === "teal" ? "bg-teal text-cream" : "bg-cream"}`}>
    <div className="mx-auto max-w-6xl">
      <div className="section-anchor"><span className="section-anchor-num">{num}</span><span className="section-anchor-label">{label}</span></div>
      {children}
    </div>
  </section>
);

export const Badge: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <span className={`inline-flex rounded-full border-2 border-ink px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] ${dark ? "bg-ink text-cream" : "bg-white text-ink"}`}>{children}</span>
);

export const StampLink: React.FC<{ href: string; title: string; desc: string }> = ({ href, title, desc }) => (
  <a href={href} className="group flex items-start gap-3 rounded-2xl border-2 border-ink bg-butter p-5 text-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg">
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white"><ExternalLink className="h-4 w-4" /></span>
    <span><span className="flex items-center gap-1.5 font-bold">{title}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span><span className="mt-1 block text-sm leading-relaxed text-ink/75">{desc}</span></span>
  </a>
);
