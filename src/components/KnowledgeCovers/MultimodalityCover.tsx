/**
 * Multimodality 封面
 *
 * 隐喻：一张图被切成 patch 网格 → 流出一行 token 流 → 跟上面的字 / 下面的音波 一起喂进同一个模型框。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 左：迷你彩色"图"（蛋糕风 64×64） + 7×7 patch 网格（dashed → 实线 on hover）
 *   - 中：一根 dashed 箭头从图切出来 → 流向 token 串
 *   - 右上：一行 8 个 token 小方块（teal/butter 交替）
 *   - 右下：一行小音波 + 一行 frame 三连帧
 *   - 右上 stamp："224→196"
 *   - 左下 mono："image patch ⊕ text ⊕ audio"
 *
 * hover：图微微"浮起" + 切割线变实 + token 方块依次 pulse + 音波微动。
 */
import React from "react";
import CoverShell from "./CoverShell";

const PATCH_GRID = 7; // 7×7 切分网格
const IMG_X = 24;
const IMG_Y = 50;
const IMG_SIZE = 78;
const CELL = IMG_SIZE / PATCH_GRID;

const TOKEN_X = 156;
const TOKEN_Y = 52;
const TOKEN_W = 17;
const TOKEN_H = 22;
const TOKEN_GAP = 4;
const TOKEN_COLORS = ["#1B4B5A", "#1B4B5A", "#F4D35E", "#1B4B5A", "#F4D35E", "#1B4B5A", "#1B4B5A", "#F4D35E"];

const MultimodalityCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-coral" dotColor="#FBEFE3" dotOpacity={0.16}>
      {/* 上方装饰：mono 标签 */}
      <g
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fill="#FBEFE3"
        opacity="0.55"
      >
        <text x="24" y="36">image · text · audio → token</text>
      </g>

      {/* 右上 stamp */}
      <g
        transform="translate(282,24) rotate(-6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110"
      >
        <rect
          x="-28"
          y="-12"
          width="56"
          height="24"
          rx="5"
          fill="#F4D35E"
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
          fill="#241C15"
        >
          224→196
        </text>
      </g>

      {/* 左：迷你图 + patch 网格 */}
      <g
        className="origin-center transition-transform duration-500 ease-out group-hover:-translate-y-1"
        style={{ transformBox: "fill-box" }}
      >
        {/* 图底（蛋糕风：butter bg + 红蛋糕） */}
        <rect x={IMG_X} y={IMG_Y} width={IMG_SIZE} height={IMG_SIZE} rx="3" fill="#FBE891" stroke="#241C15" strokeWidth="1.8" />
        {/* 蛋糕 */}
        <rect x={IMG_X + 14} y={IMG_Y + 46} width={IMG_SIZE - 28} height="22" fill="#E07A5F" stroke="#241C15" strokeWidth="1" />
        <rect x={IMG_X + 18} y={IMG_Y + 36} width={IMG_SIZE - 36} height="10" fill="#FBEFE3" stroke="#241C15" strokeWidth="1" />
        <rect x={IMG_X + 22} y={IMG_Y + 26} width={IMG_SIZE - 44} height="10" fill="#FF4D74" stroke="#241C15" strokeWidth="1" />
        {/* 蜡烛 */}
        <line x1={IMG_X + 30} y1={IMG_Y + 18} x2={IMG_X + 30} y2={IMG_Y + 26} stroke="#241C15" strokeWidth="1.4" />
        <line x1={IMG_X + 48} y1={IMG_Y + 18} x2={IMG_X + 48} y2={IMG_Y + 26} stroke="#241C15" strokeWidth="1.4" />
        <circle cx={IMG_X + 30} cy={IMG_Y + 16} r="1.8" fill="#F4D35E" stroke="#241C15" strokeWidth="0.6" />
        <circle cx={IMG_X + 48} cy={IMG_Y + 16} r="1.8" fill="#F4D35E" stroke="#241C15" strokeWidth="0.6" />

        {/* patch 网格切割线 */}
        <g
          stroke="#241C15"
          strokeWidth="0.7"
          strokeDasharray="1.5 2"
          opacity="0.55"
          className="transition-opacity duration-500 group-hover:opacity-95 group-hover:[stroke-dasharray:0]"
        >
          {Array.from({ length: PATCH_GRID + 1 }).map((_, i) => (
            <g key={i}>
              <line
                x1={IMG_X + i * CELL}
                y1={IMG_Y}
                x2={IMG_X + i * CELL}
                y2={IMG_Y + IMG_SIZE}
              />
              <line
                x1={IMG_X}
                y1={IMG_Y + i * CELL}
                x2={IMG_X + IMG_SIZE}
                y2={IMG_Y + i * CELL}
              />
            </g>
          ))}
        </g>
      </g>

      {/* 图标签：7×7 = 49 */}
      <g
        transform={`translate(${IMG_X + IMG_SIZE / 2}, ${IMG_Y + IMG_SIZE + 14})`}
      >
        <rect
          x="-22"
          y="-9"
          width="44"
          height="16"
          rx="8"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.4"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          fill="#241C15"
        >
          7×7=49
        </text>
      </g>

      {/* 中间：dashed 流向箭头（图 → token 行） */}
      <g
        fill="none"
        stroke="#FBEFE3"
        strokeWidth="1.6"
        strokeDasharray="3 3"
        className="group-hover:[animation:dashFlow_1.2s_linear_infinite]"
      >
        <path d={`M ${IMG_X + IMG_SIZE + 4} ${IMG_Y + 30} Q ${TOKEN_X - 12} ${IMG_Y + 30} ${TOKEN_X - 4} ${TOKEN_Y + TOKEN_H / 2}`} />
      </g>
      <polygon points={`${TOKEN_X - 4},${TOKEN_Y + TOKEN_H / 2 - 4} ${TOKEN_X + 2},${TOKEN_Y + TOKEN_H / 2} ${TOKEN_X - 4},${TOKEN_Y + TOKEN_H / 2 + 4}`} fill="#FBEFE3" />

      {/* 右上：token 行（8 个方块） */}
      <g>
        {TOKEN_COLORS.map((c, i) => (
          <rect
            key={i}
            x={TOKEN_X + i * (TOKEN_W + TOKEN_GAP)}
            y={TOKEN_Y}
            width={TOKEN_W}
            height={TOKEN_H}
            rx="3"
            fill={c}
            stroke="#241C15"
            strokeWidth="1.4"
            className="origin-center"
            style={{
              transformBox: "fill-box",
              animation: `floatYSm 4.5s ${i * 0.12}s ease-in-out infinite`,
            }}
          />
        ))}
      </g>

      {/* 右上 token 标签 */}
      <g
        fontFamily="Geist Mono, monospace"
        fontSize="8"
        fill="#FBEFE3"
        opacity="0.7"
      >
        <text x={TOKEN_X} y={TOKEN_Y - 5}>token stream</text>
      </g>

      {/* 右中：音波（5 条竖线高度不一） */}
      <g
        transform={`translate(${TOKEN_X + 4}, ${TOKEN_Y + 50})`}
        className="transition-transform duration-500 group-hover:translate-y-1"
      >
        <g
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#FBEFE3"
          opacity="0.6"
        >
          <text x="0" y="-4">audio</text>
        </g>
        {[10, 18, 7, 14, 22, 12, 16, 9, 13, 20, 11, 16, 8].map((h, i) => (
          <rect
            key={i}
            x={i * 6}
            y={(24 - h) / 2}
            width="3"
            height={h}
            rx="1"
            fill="#241C15"
            stroke="#241C15"
            strokeWidth="0.8"
          />
        ))}
      </g>

      {/* 右下：3 帧视频 frame */}
      <g transform={`translate(${TOKEN_X + 4}, ${TOKEN_Y + 96})`}>
        <g
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#FBEFE3"
          opacity="0.6"
        >
          <text x="0" y="-4">video · 3 frames</text>
        </g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 36}, 0)`}>
            <rect
              x="0"
              y="0"
              width="30"
              height="20"
              rx="2"
              fill="#FBEFE3"
              stroke="#241C15"
              strokeWidth="1.4"
            />
            {/* 一个小山头表示画面 */}
            <polygon
              points="3,17 12,7 18,12 27,17"
              fill="#1B4B5A"
              opacity="0.8"
            />
            <circle cx="24" cy="5" r="2" fill="#F4D35E" stroke="#241C15" strokeWidth="0.6" />
          </g>
        ))}
      </g>

      {/* 左下：mono 三模态标签条 */}
      <g transform="translate(20,180) rotate(-3)" className="origin-left">
        <rect
          x="-2"
          y="-8"
          width="92"
          height="14"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="44"
          y="2"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="1"
          fill="#FBEFE3"
        >
          img ⊕ txt ⊕ aud
        </text>
      </g>
    </CoverShell>
  );
};

export default MultimodalityCover;
