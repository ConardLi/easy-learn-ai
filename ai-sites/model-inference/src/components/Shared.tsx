import React from "react";
import { ExternalLink } from "lucide-react";

export const Shell: React.FC<{
  num: string;
  label: string;
  title: string;
  intro: React.ReactNode;
  tone?: "cream" | "white" | "butter";
  children: React.ReactNode;
}> = ({ num, label, title, intro, tone = "cream", children }) => {
  const bg = tone === "white" ? "bg-white" : tone === "butter" ? "bg-butter-tint" : "bg-cream";
  return (
    <section className={`${bg} px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t-2 border-ink/10`}>
      <div className="max-w-[1120px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">{num}</span>
          <span className="section-anchor-label">{label}</span>
        </div>
        <h2 className="font-display text-display-lg font-extrabold max-w-[820px]">{title}</h2>
        <div className="mt-5 text-[16px] sm:text-[17px] leading-[1.8] text-ink/75 max-w-[760px]">{intro}</div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
};

export const StampLink: React.FC<{ href: string; title: string; children: React.ReactNode; compact?: boolean }> = ({
  href,
  title,
  children,
  compact = false,
}) => (
  <a
    href={href}
    className={`block ${compact ? "bg-white rounded-xl px-4 py-3.5" : "bg-butter rounded-2xl px-5 py-4"} border-2 border-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring`}
  >
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
        <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.5} />
      </span>
      <span>
        <span className="font-display font-bold text-[15px] sm:text-[16px] block leading-tight">{title}</span>
        <span className="text-[12.5px] sm:text-[13px] leading-relaxed text-ink/70 block mt-1.5">{children}</span>
      </span>
    </div>
  </a>
);

export const DemoNote = () => (
  <p className="mt-4 font-mono text-[11px] leading-relaxed text-ink/55">
    示意：数字和比例只帮你感受变化方向，不代表某个真实模型的测试结果。
  </p>
);
