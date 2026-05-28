/**
 * 视图切换 · Mailchimp-Freddie 风
 * 选中态：ink 实心反白；未选：白底 ink 文字
 */

import React from "react";
import { LayoutGrid, Network } from "lucide-react";

export type ViewMode = "card" | "tree";

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ mode, onChange }) => {
  return (
    <div className="inline-flex items-center gap-0.5 bg-white border-2 border-ink rounded-full p-1 shadow-stamp">
      <ToggleBtn
        active={mode === "card"}
        onClick={() => onChange("card")}
        icon={<LayoutGrid className="w-4 h-4" strokeWidth={2.5} />}
        label="卡片"
      />
      <ToggleBtn
        active={mode === "tree"}
        onClick={() => onChange("tree")}
        icon={<Network className="w-4 h-4" strokeWidth={2.5} />}
        label="树形"
      />
    </div>
  );
};

const ToggleBtn: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-sans font-semibold text-[13px] transition-colors duration-200 ${
      active
        ? "bg-ink text-cream"
        : "bg-transparent text-ink hover:bg-ink/5"
    }`}
  >
    {icon}
    {label}
  </button>
);
