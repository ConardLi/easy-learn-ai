/**
 * System Prompt 封面
 *
 * 隐喻：一张用图钉钉在对话最顶上的「规则卡 / 设定面板」（SYSTEM），
 *       下面才是用户消息气泡 —— 体现「system 先于 user、钉在最前面定规矩」。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 顶部居中：coral 圆角规则卡，内有 SYSTEM 标 + 三条规则横线
 *   - 卡顶：一枚图钉徽章（cream 圆 + ink 钉）
 *   - 卡下：一条 user 气泡（白）+ 一条回复气泡（butter-tint），靠下错位
 *   - 装饰：左上 sparkle、右下小 ring
 *
 * hover：规则卡轻轻上浮 + 图钉微转；两条气泡错峰下沉，强化「卡在最上、消息在下」。
 */
import React from "react";
import CoverShell from "./CoverShell";

const SystemPromptCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 装饰：左上 sparkle */}
      <g transform="translate(34,30)">
        <g className="origin-center rotate-[15deg] transition-transform duration-700 group-hover:rotate-[120deg]">
          <path
            d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* 装饰：右下小 ring */}
      <g transform="translate(292,172)">
        <circle cx="0" cy="0" r="6" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.5" />
      </g>

      {/* ─── 下层：用户气泡（先画，被规则卡压在上方之后） ─── */}
      {/* 回复气泡（左下，butter-tint） */}
      <g
        transform="translate(56,150)"
        className="transition-transform duration-500 ease-spring group-hover:translate-y-[3px]"
      >
        <rect x="0" y="0" width="118" height="34" rx="9" fill="#241C15" transform="translate(2.5,2.5)" opacity="0.85" />
        <rect x="0" y="0" width="118" height="34" rx="9" fill="#FEF6D3" stroke="#241C15" strokeWidth="2" />
        <line x1="12" y1="13" x2="92" y2="13" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
        <line x1="12" y1="23" x2="66" y2="23" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      </g>

      {/* user 气泡（右下，白） */}
      <g
        transform="translate(190,158)"
        className="transition-transform duration-500 ease-spring group-hover:translate-y-[5px]"
      >
        <rect x="0" y="0" width="78" height="30" rx="9" fill="#241C15" transform="translate(2.5,2.5)" opacity="0.85" />
        <rect x="0" y="0" width="78" height="30" rx="9" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
        <text
          x="12"
          y="19"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          letterSpacing="1"
          fill="#241C15"
        >
          USER
        </text>
        <circle cx="58" cy="15" r="2" fill="#241C15" opacity="0.4" />
        <circle cx="65" cy="15" r="2" fill="#241C15" opacity="0.4" />
      </g>

      {/* ─── 上层：规则卡（SYSTEM，coral，钉在最顶） ─── */}
      <g
        transform="translate(60,46)"
        className="transition-transform duration-500 ease-spring group-hover:-translate-y-[3px]"
      >
        {/* 阴影底 */}
        <rect x="0" y="0" width="200" height="82" rx="13" fill="#241C15" transform="translate(3.5,3.5)" />
        {/* 主体 */}
        <rect x="0" y="0" width="200" height="82" rx="13" fill="#E07A5F" stroke="#241C15" strokeWidth="2.5" />

        {/* SYSTEM 标 */}
        <text
          x="18"
          y="26"
          fontFamily="Geist Mono, monospace"
          fontSize="11"
          fontWeight="700"
          letterSpacing="2"
          fill="#FBEFE3"
        >
          SYSTEM
        </text>
        {/* 角标：你看不到 */}
        <g transform="translate(133,14)">
          <rect x="0" y="0" width="52" height="15" rx="7.5" fill="#241C15" />
          <text
            x="26"
            y="11"
            textAnchor="middle"
            fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif"
            fontSize="8"
            fontWeight="700"
            fill="#FBEFE3"
          >
            你看不到
          </text>
        </g>

        {/* 三条规则横线 */}
        <line x1="18" y1="44" x2="160" y2="44" stroke="#FBEFE3" strokeWidth="3" strokeLinecap="round" opacity="0.92" />
        <line x1="18" y1="56" x2="140" y2="56" stroke="#FBEFE3" strokeWidth="3" strokeLinecap="round" opacity="0.78" />
        <line x1="18" y1="68" x2="100" y2="68" stroke="#FBEFE3" strokeWidth="3" strokeLinecap="round" opacity="0.62" />
      </g>

      {/* 图钉徽章（卡顶居中偏左，hover 微转） */}
      <g transform="translate(82,46)">
        <g className="origin-center transition-transform duration-500 ease-spring group-hover:rotate-[18deg]">
          <circle cx="0" cy="0" r="11" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.5" />
          <circle cx="0" cy="-2" r="4" fill="#FF4D74" stroke="#241C15" strokeWidth="1.8" />
          <line x1="0" y1="2" x2="0" y2="9" stroke="#241C15" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </g>

      {/* 连接：从规则卡指向下方消息（短虚线 + 箭头） */}
      <g className="transition-opacity duration-500 group-hover:opacity-100" opacity="0.55">
        <line x1="160" y1="132" x2="160" y2="146" stroke="#241C15" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
        <path d="M 156 142 L 160 148 L 164 142" stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </CoverShell>
  );
};

export default SystemPromptCover;
