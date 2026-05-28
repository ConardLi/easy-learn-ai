/**
 * DeepSpeed 封面
 *
 * 隐喻：一个超大模型 → 被拆成 4 份摊到 4 张 GPU 方块上。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 左上：一个大「Model 70B」气泡（cream + ink 描边，stamp）
 *   - 中央：4 条曲线从大模型扇出
 *   - 右下：4 张 GPU 方块（coral / butter / teal / pop），每个里有 1/4 的小方块表示「自己那份」
 *   - 右上：「÷4」压缩 stamp
 *   - 左下：ZeRO mono 装饰
 *
 * hover：4 张 GPU 方块各自向外微浮动，扇形线流动 dash 加速。
 */
import React from "react";
import CoverShell from "./CoverShell";

const GPU_BOXES = [
  { x: 218, y: 60, color: "#E07A5F", piece: 0 }, // coral · GPU0 持有第 0 片
  { x: 268, y: 60, color: "#E5BD3A", piece: 1 }, // butter · GPU1
  { x: 218, y: 120, color: "#1B4B5A", piece: 2 }, // teal · GPU2
  { x: 268, y: 120, color: "#FF4D74", piece: 3 }, // pop · GPU3
];

const MODEL = { x: 78, y: 88 };

const DeepspeedCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* 右上 ÷4 stamp */}
      <g
        transform="translate(286,28) rotate(-7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
      >
        <rect
          x="-22"
          y="-11"
          width="44"
          height="22"
          rx="4"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.8"
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
          ÷ 4
        </text>
      </g>

      {/* 左上小标签 ZeRO-3 */}
      <g transform="translate(60,30)">
        <rect
          x="-30"
          y="-9"
          width="60"
          height="16"
          rx="8"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#F4D35E"
        >
          ZeRO-3
        </text>
      </g>

      {/* 左下：DeepSpeed mono 装饰 */}
      <g transform="translate(28,178) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="90"
          height="14"
          rx="3"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="42"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          P + G + S → P/N
        </text>
      </g>

      {/* 中央大「Model 70B」气泡 */}
      <g
        transform={`translate(${MODEL.x},${MODEL.y})`}
        className="origin-center transition-transform duration-500 group-hover:-translate-x-1"
      >
        {/* 外圈 cream 气泡 */}
        <rect
          x="-38"
          y="-30"
          width="76"
          height="60"
          rx="14"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* 内部 4 段堆叠 = 完整模型 */}
        <rect x="-30" y="-22" width="60" height="10" rx="2" fill="#E07A5F" stroke="#241C15" strokeWidth="1.2" />
        <rect x="-30" y="-10" width="60" height="10" rx="2" fill="#E5BD3A" stroke="#241C15" strokeWidth="1.2" />
        <rect x="-30" y="2" width="60" height="10" rx="2" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.2" />
        <rect x="-30" y="14" width="60" height="10" rx="2" fill="#FF4D74" stroke="#241C15" strokeWidth="1.2" />
        {/* 标签 */}
        <text
          x="0"
          y="-36"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#241C15"
        >
          Model 70B
        </text>
      </g>

      {/* 4 条扇形连线：从模型 → 4 张 GPU */}
      <g
        stroke="#241C15"
        strokeWidth="1.4"
        strokeDasharray="3 3"
        opacity="0.45"
        className="transition-opacity duration-400 group-hover:opacity-80"
      >
        {GPU_BOXES.map((g, i) => (
          <line
            key={`l-${i}`}
            x1={MODEL.x + 38}
            y1={MODEL.y + (i - 1.5) * 6}
            x2={g.x - 14}
            y2={g.y}
          />
        ))}
      </g>

      {/* 中间小漏斗节点 */}
      <g transform="translate(160,90)">
        <circle r="7.5" fill="#241C15" stroke="#241C15" strokeWidth="1.5" />
        <text
          y="2.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#F4D35E"
        >
          ZeRO
        </text>
      </g>

      {/* 4 张 GPU 方块 · 每个里画 4 格，自己那格满色，其他浅色 */}
      {GPU_BOXES.map((g, i) => (
        <g
          key={`gpu-${i}`}
          transform={`translate(${g.x},${g.y})`}
          className="origin-center transition-transform duration-500"
          style={{
            transformOrigin: `${g.x}px ${g.y}px`,
          }}
        >
          {/* 外框 */}
          <rect
            x="-22"
            y="-22"
            width="44"
            height="44"
            rx="6"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.8"
          />
          {/* 4 格内部 */}
          {[0, 1, 2, 3].map((idx) => {
            const cx = (idx % 2) * 18 - 18;
            const cy = Math.floor(idx / 2) * 18 - 18;
            const own = idx === g.piece;
            return (
              <rect
                key={idx}
                x={cx + 1}
                y={cy + 1}
                width="16"
                height="16"
                rx="2"
                fill={own ? g.color : "#FBEFE3"}
                stroke="#241C15"
                strokeWidth={own ? 1.4 : 0.9}
                opacity={own ? 1 : 0.5}
              />
            );
          })}
          {/* GPU 编号 */}
          <text
            y="-28"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8.5"
            fontWeight="700"
            fill="#241C15"
          >
            GPU{i}
          </text>
        </g>
      ))}

      {/* 底部 caption */}
      <text
        x="160"
        y="195"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
      >
        big model → 1/N per GPU
      </text>
    </CoverShell>
  );
};

export default DeepspeedCover;
