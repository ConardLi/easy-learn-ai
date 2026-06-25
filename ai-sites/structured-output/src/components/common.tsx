import React from "react";
import { ExternalLink } from "lucide-react";

export const Section: React.FC<{
  number: string;
  label: string;
  title: string;
  intro: React.ReactNode;
  tone?: "cream" | "white" | "dark" | "butter";
  children: React.ReactNode;
}> = ({ number, label, title, intro, tone = "cream", children }) => {
  const bg =
    tone === "white" ? "bg-white" :
    tone === "dark" ? "bg-teal text-white" :
    tone === "butter" ? "bg-butter-tint" : "bg-cream";
  return (
    <section className={`${bg} border-t-2 border-ink/10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28`}>
      <div className="mx-auto max-w-[1120px]">
        <div className="section-anchor">
          <span className="section-anchor-num">{number}</span>
          <span className={`section-anchor-label ${tone === "dark" ? "!text-white/60" : ""}`}>{label}</span>
        </div>
        <h2 className="max-w-[850px] font-display text-display-lg font-extrabold">{title}</h2>
        <div className={`mt-5 max-w-[760px] text-[16px] leading-[1.8] ${tone === "dark" ? "text-white/78" : "text-ink/75"}`}>{intro}</div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
};

export const LinkCard: React.FC<{ href: string; title: string; children: React.ReactNode }> = ({ href, title, children }) => (
  <a href={href} className="block rounded-2xl border-2 border-ink bg-butter px-5 py-4 text-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg">
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border-2 border-ink bg-white">
        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
      <span><strong className="block font-display text-[16px]">{title}</strong><span className="mt-1 block text-[13px] leading-relaxed text-ink/70">{children}</span></span>
    </div>
  </a>
);

export const DemoNote = () => <p className="mt-4 font-mono text-[11px] text-ink/55">示意：数字只用来展示变化方向，不代表某台真实服务器的测试结果。</p>;
