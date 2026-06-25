import React from "react";
import { ExternalLink } from "lucide-react";

export const StampLink: React.FC<{
  href: string;
  title: string;
  desc: string;
  tone?: "butter" | "white";
}> = ({ href, title, desc, tone = "white" }) => (
  <a
    href={href}
    className={[
      "group flex gap-3 rounded-2xl border-2 border-ink p-4 shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg",
      tone === "butter" ? "bg-butter" : "bg-white",
    ].join(" ")}
  >
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white">
      <ExternalLink className="h-4 w-4 text-ink" strokeWidth={2.4} />
    </span>
    <span>
      <span className="block text-[14px] font-bold text-ink">{title}</span>
      <span className="mt-1 block text-[12.5px] leading-relaxed text-ink/65">{desc}</span>
    </span>
  </a>
);

export const SourceNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-3 font-mono text-[10px] leading-relaxed text-ink/45">{children}</p>
);
