import React from "react";
import CoverShell from "./CoverShell";

const PromptInjectionCover: React.FC = () => (
  <CoverShell bgClassName="bg-butter-tint" dotOpacity={0.08}>
    <g className="transition-transform duration-500 ease-spring group-hover:-translate-y-1">
      <rect x="38" y="42" width="150" height="54" rx="12" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.2" />
      <text x="52" y="63" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#5A5147">USER TASK</text>
      <text x="52" y="82" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="12" fontWeight="700" fill="#241C15">总结这封邮件</text>
    </g>
    <g className="transition-transform duration-500 ease-spring group-hover:translate-y-1">
      <rect x="132" y="104" width="150" height="58" rx="12" fill="#E07A5F" stroke="#241C15" strokeWidth="2.2" />
      <text x="146" y="125" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#FBEFE3">UNTRUSTED TEXT</text>
      <text x="146" y="146" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="11" fontWeight="700" fill="#FBEFE3">忽略原任务…</text>
    </g>
    <path d="M174 92 C202 93 212 104 216 119" fill="none" stroke="#241C15" strokeWidth="2.5" strokeDasharray="5 4" />
    <circle cx="218" cy="102" r="18" fill="#F4D35E" stroke="#241C15" strokeWidth="2" className="transition-transform duration-500 ease-spring group-hover:rotate-12" style={{ transformOrigin: "218px 102px" }} />
    <path d="M210 94 L226 110 M226 94 L210 110" stroke="#241C15" strokeWidth="3" strokeLinecap="round" />
  </CoverShell>
);

export default PromptInjectionCover;
