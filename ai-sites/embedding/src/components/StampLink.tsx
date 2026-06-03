import React from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

type StampLinkProps = {
  href: string;
  title: string;
  desc: string;
  compact?: boolean;
};

const StampLink: React.FC<StampLinkProps> = ({ href, title, desc, compact }) => {
  return (
    <a
      href={href}
      className={[
        "inline-flex items-start gap-3 border-2 border-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring",
        compact ? "w-full rounded-xl bg-white px-3 py-3" : "max-w-xl rounded-2xl bg-butter px-4 py-3",
      ].join(" ")}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white">
        <ExternalLink className="h-3.5 w-3.5 text-ink" strokeWidth={2.4} />
      </span>
      <span className="text-[13.5px] leading-[1.55] text-ink/75">
        <span className="font-bold text-ink">{title}</span>
        <span> {desc}</span>
      </span>
      {compact && <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-ink" strokeWidth={2.3} />}
    </a>
  );
};

export default StampLink;
