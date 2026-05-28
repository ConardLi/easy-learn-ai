/**
 * RLHF 封面
 *
 * 隐喻：两个候选回答 A / B → 人手指向 A（thumbs up）→ reward 信号回流到模型权重砝码
 *
 * 视觉构图（viewBox 320×200）：
 *   - 左：两张候选答卡 A / B（A 高亮 butter 底 + 大拇指印章，B 暗淡 + 划掉）
 *   - 中：A 的圆环被一只小手指 / 红心命中 → 一条 reward 箭头流向右边的"model 砝码"
 *   - 右：model 砝码（teal 立方体感）+ 上下两组小箭头表示「权重朝偏好那一侧动」
 *   - 右上：reward stamp（pop 色 +0.81）
 *   - 左下：β·KL 公式碎片
 *
 * hover：
 *   - 大拇指印章 wiggle
 *   - reward 流动 dash 加速
 *   - model 砝码下沉一点（偏好生效感）
 */
import React from "react";
import CoverShell from "./CoverShell";

const RlhfCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 左上 stamp：human-rated */}
      <g
        transform="translate(40,28) rotate(-7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2"
      >
        <rect
          x="-32"
          y="-10"
          width="64"
          height="20"
          rx="4"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#F4D35E"
        >
          HUMAN RATED
        </text>
      </g>

      {/* 右上 stamp：reward +0.81 */}
      <g
        transform="translate(282,30) rotate(6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-110"
      >
        <rect
          x="-28"
          y="-11"
          width="56"
          height="22"
          rx="11"
          fill="#FF4D74"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
        >
          r = +0.81
        </text>
      </g>

      {/* 左下：β·KL 公式碎片 */}
      <g transform="translate(30,178) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="80"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="37"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          − β · KL(π‖SFT)
        </text>
      </g>

      {/* === 左侧：两张候选回答卡 === */}
      {/* 候选 A · chosen */}
      <g
        transform="translate(78,90)"
        className="origin-center transition-transform duration-500 group-hover:-translate-y-1"
      >
        <rect
          x="-32"
          y="-22"
          width="64"
          height="44"
          rx="6"
          fill="#FBE891"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="-24"
          y="-11"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          fill="#241C15"
        >
          A · chosen
        </text>
        {/* 三条文本占位线 */}
        <line x1="-24" y1="-2" x2="22" y2="-2" stroke="#241C15" strokeWidth="1.2" />
        <line x1="-24" y1="5" x2="14" y2="5" stroke="#241C15" strokeWidth="1.2" />
        <line x1="-24" y1="12" x2="20" y2="12" stroke="#241C15" strokeWidth="1.2" opacity="0.6" />
      </g>

      {/* 候选 B · rejected */}
      <g transform="translate(78,150)">
        <rect
          x="-32"
          y="-18"
          width="64"
          height="36"
          rx="6"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.5"
          opacity="0.85"
        />
        <text
          x="-24"
          y="-7"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="600"
          fill="#88837C"
        >
          B · rejected
        </text>
        <line
          x1="-24"
          y1="2"
          x2="22"
          y2="2"
          stroke="#88837C"
          strokeWidth="1.1"
          opacity="0.6"
        />
        <line
          x1="-24"
          y1="9"
          x2="14"
          y2="9"
          stroke="#88837C"
          strokeWidth="1.1"
          opacity="0.6"
        />
        {/* 划掉 */}
        <line
          x1="-30"
          y1="14"
          x2="30"
          y2="-14"
          stroke="#E07A5F"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* === 中间：thumbs up · A 被人选中 === */}
      <g
        transform="translate(132,90)"
        className="origin-center transition-transform duration-500 group-hover:scale-110 animate-wiggle"
      >
        <circle r="13" fill="#FF4D74" stroke="#241C15" strokeWidth="2" />
        {/* 拇指简笔 */}
        <path
          d="M -5 3 L -5 -1 L -2 -1 L -2 -6 Q -2 -8 0 -8 Q 2 -8 2 -6 L 2 -1 L 5 -1 Q 7 -1 7 1 L 7 4 Q 7 6 5 6 L -3 6 Q -5 6 -5 4 Z"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </g>

      {/* === A → reward 信号箭头（流动 dash） === */}
      <g
        stroke="#E07A5F"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 3"
        className="animate-dash-flow"
      >
        <path d="M 152 90 Q 180 80 210 96" />
      </g>
      <polygon points="210,92 218,96 210,100" fill="#E07A5F" />

      {/* 中部小标签：reward 信号 */}
      <text
        x="180"
        y="72"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fontWeight="600"
        fill="#241C15"
        opacity="0.7"
      >
        reward
      </text>

      {/* === 右侧：model 砝码（被推动的模型权重） === */}
      <g
        transform="translate(252,110)"
        className="origin-bottom transition-transform duration-500 group-hover:translate-y-1"
      >
        {/* 主立方体 */}
        <rect
          x="-26"
          y="-22"
          width="52"
          height="44"
          rx="6"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* 顶面高光 */}
        <rect
          x="-26"
          y="-22"
          width="52"
          height="10"
          rx="6"
          fill="#FBEFE3"
          opacity="0.18"
        />
        <text
          y="-3"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
        >
          π_RL
        </text>
        <text
          y="10"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#FBEFE3"
          opacity="0.7"
        >
          policy
        </text>
        {/* 底座 */}
        <rect
          x="-32"
          y="22"
          width="64"
          height="6"
          rx="2"
          fill="#241C15"
        />
      </g>

      {/* 砝码上下：两组指示权重移动的小箭头 */}
      <g stroke="#F4D35E" strokeWidth="1.6" fill="#F4D35E" strokeLinecap="round">
        {/* 上箭头：reward 推 */}
        <line x1="252" y1="78" x2="252" y2="84" />
        <polygon points="248,84 252,80 256,84" fill="#F4D35E" />
        {/* 下箭头：KL 拉 */}
        <line x1="252" y1="140" x2="252" y2="146" />
        <polygon points="248,140 252,144 256,140" fill="#F4D35E" />
      </g>

      {/* 底部说明：preference → reward → policy */}
      <text
        x="160"
        y="192"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
      >
        preference → reward → policy
      </text>
    </CoverShell>
  );
};

export default RlhfCover;
