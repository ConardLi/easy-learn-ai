/**
 * Function Calling 封面
 *
 * 隐喻：LLM 吐一段结构化 JSON → 钩子箭头钩到外部工具 → 工具结果回流。
 * 整张图突出「结构化」+「双向」两个核心。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 左侧大方块：LLM「脑」simplified（butter 填充）
 *   - 左→右上：实线箭头 + 中间一个 JSON 卡片（{name, args} 视觉化的小方块）
 *   - 右侧大圆角矩形：外部 tool（齿轮 icon · teal 填充 · 标 API）
 *   - 右→左下：虚线箭头 + 中间一个 result 卡（{status, data} 小方块）
 *   - 角落装饰：右上 sparkle、左下小方块
 *
 * hover 行为：
 *   - JSON 卡和 result 卡沿着各自轨道往前推进一点
 *   - 齿轮工具图标转一点角度
 */
import React from "react";
import CoverShell from "./CoverShell";

const FunctionCallingCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 装饰：右上 sparkle */}
      <g
        transform="translate(290,28)"
        className="origin-center transition-transform duration-700 group-hover:rotate-45"
      >
        <path
          d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="1.2"
        />
      </g>

      {/* 装饰：左下小方块 */}
      <g transform="translate(28,176) rotate(-8)" className="origin-center">
        <rect
          x="-7"
          y="-7"
          width="14"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
      </g>

      {/* ─── 左：LLM 块 ─── */}
      <g transform="translate(54,100)">
        <g
          className="origin-center transition-transform duration-500 ease-out group-hover:-rotate-2"
          style={{ transformBox: "fill-box" }}
        >
          {/* 阴影底 */}
          <rect
            x="-32"
            y="-32"
            width="64"
            height="64"
            rx="12"
            fill="#241C15"
            transform="translate(3,3)"
            opacity="0.85"
          />
          {/* 主体 · butter */}
          <rect
            x="-32"
            y="-32"
            width="64"
            height="64"
            rx="12"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="2.4"
          />
          {/* 神经元点阵 4×4 */}
          {Array.from({ length: 16 }).map((_, i) => {
            const cx = -22 + (i % 4) * 14;
            const cy = -22 + Math.floor(i / 4) * 14;
            const accent = [5, 6, 9, 10].includes(i);
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="2.4"
                fill={accent ? "#E07A5F" : "#241C15"}
                opacity={accent ? "1" : "0.55"}
              />
            );
          })}
          {/* 底标 LLM */}
          <text
            x="0"
            y="44"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9"
            fontWeight="700"
            letterSpacing="1.8"
            fill="#241C15"
          >
            LLM
          </text>
        </g>
      </g>

      {/* ─── 右：外部 tool 卡 ─── */}
      <g transform="translate(266,100)">
        <g
          className="origin-center transition-transform duration-500 ease-out group-hover:rotate-3"
          style={{ transformBox: "fill-box" }}
        >
          {/* 阴影底 */}
          <rect
            x="-32"
            y="-32"
            width="64"
            height="64"
            rx="12"
            fill="#241C15"
            transform="translate(3,3)"
            opacity="0.85"
          />
          {/* 主体 · teal */}
          <rect
            x="-32"
            y="-32"
            width="64"
            height="64"
            rx="12"
            fill="#1B4B5A"
            stroke="#241C15"
            strokeWidth="2.4"
          />
          {/* 齿轮 */}
          <g
            className="origin-center transition-transform duration-[1400ms] ease-linear group-hover:rotate-90"
            style={{ transformOrigin: "0 0" }}
          >
            {Array.from({ length: 8 }).map((_, i) => {
              const deg = i * 45;
              const rad = (deg * Math.PI) / 180;
              const x1 = Math.cos(rad) * 11;
              const y1 = Math.sin(rad) * 11;
              const x2 = Math.cos(rad) * 17;
              const y2 = Math.sin(rad) * 17;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#FBEFE3"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })}
            <circle
              cx="0"
              cy="0"
              r="8.5"
              fill="#F4D35E"
              stroke="#FBEFE3"
              strokeWidth="2.2"
            />
            <circle cx="0" cy="0" r="2.4" fill="#241C15" />
          </g>
          {/* 底标 API */}
          <text
            x="0"
            y="44"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9"
            fontWeight="700"
            letterSpacing="1.8"
            fill="#FBEFE3"
          >
            API
          </text>
        </g>
      </g>

      {/* ─── 上：LLM → tool 实线箭头 + JSON 卡 ─── */}
      <g>
        <path
          d="M 90 78 C 130 50, 190 50, 230 78"
          fill="none"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* 箭头头 · 指向右上 */}
        <polygon
          points="-6,-3 0,0 -6,3"
          fill="#241C15"
          transform="translate(230,78) rotate(35)"
        />
      </g>

      {/* JSON 卡 · 中央上方 · hover 沿轨道向右推 */}
      <g
        transform="translate(160,52)"
        className="transition-transform duration-700 ease-out group-hover:translate-x-3"
      >
        <rect
          x="-30"
          y="-12"
          width="60"
          height="24"
          rx="5"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        {/* 4 个小方块代表结构化字段 */}
        <rect x="-25" y="-7" width="10" height="14" rx="2" fill="#E07A5F" />
        <rect x="-12" y="-7" width="10" height="14" rx="2" fill="#F4D35E" />
        <rect x="1" y="-7" width="10" height="14" rx="2" fill="#1B4B5A" />
        <rect x="14" y="-7" width="10" height="14" rx="2" fill="#FF4D74" />
        {/* 标 tool_call */}
        <g transform="translate(0,-22)">
          <rect
            x="-26"
            y="-7"
            width="52"
            height="13"
            rx="6.5"
            fill="#241C15"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <text
            x="0"
            y="2"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="1"
            fill="#F4D35E"
          >
            tool_call
          </text>
        </g>
      </g>

      {/* ─── 下：tool → LLM 虚线箭头 + result 卡 ─── */}
      <g>
        <path
          d="M 230 122 C 190 150, 130 150, 90 122"
          fill="none"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
        {/* 箭头头 · 指向左下 */}
        <polygon
          points="-6,-3 0,0 -6,3"
          fill="#241C15"
          transform="translate(90,122) rotate(215)"
        />
      </g>

      {/* result 卡 · 中央下方 · hover 沿轨道向左推 */}
      <g
        transform="translate(160,148)"
        className="transition-transform duration-700 ease-out group-hover:-translate-x-3"
      >
        <rect
          x="-30"
          y="-12"
          width="60"
          height="24"
          rx="5"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        {/* 数据线条（模拟 result JSON 值） */}
        <line
          x1="-23"
          y1="-5"
          x2="23"
          y2="-5"
          stroke="#1B4B5A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="-23"
          y1="0"
          x2="12"
          y2="0"
          stroke="#E07A5F"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="-23"
          y1="5"
          x2="18"
          y2="5"
          stroke="#88837C"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* 标 result */}
        <g transform="translate(0,22)">
          <rect
            x="-22"
            y="-7"
            width="44"
            height="13"
            rx="6.5"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <text
            x="0"
            y="2"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="1"
            fill="#241C15"
          >
            result
          </text>
        </g>
      </g>

      {/* ─── 中心强调：fn 标签 ─── */}
      <g transform="translate(160,100)">
        <rect
          x="-20"
          y="-9"
          width="40"
          height="18"
          rx="9"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fontWeight="800"
          letterSpacing="0.8"
          fill="#FBEFE3"
        >
          fn()
        </text>
      </g>
    </CoverShell>
  );
};

export default FunctionCallingCover;
