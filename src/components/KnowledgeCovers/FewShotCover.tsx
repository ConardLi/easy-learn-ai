/**
 * Few-shot Learning 封面
 *
 * 隐喻：几张「输入 → 输出」的示例卡叠在一起，箭头喂给右边一个空白新任务（带 ?）——
 * 体现「照着几个样板做新题」。主色 butter / amber，跟兄弟站区分。
 *
 * 构图（viewBox 320×200）：
 *   - 左中：3 张错峰叠放的小例子卡，每张 = 一条输入线 + → + 一个彩色输出标签
 *   - 中间：横向箭头「照着做」
 *   - 右侧：虚线空白「新任务」卡，中间一个大问号
 *
 * hover：三张卡轻轻散开（fan out）；箭头微微前移；问号卡弹一下。
 */
import React from "react";
import CoverShell from "./CoverShell";

const ExampleCard: React.FC<{
  x: number;
  y: number;
  chip: string;
  hoverClass: string;
}> = ({ x, y, chip, hoverClass }) => (
  <g transform={`translate(${x},${y})`}>
    <g className={`transition-transform duration-500 ease-spring ${hoverClass}`}>
      {/* 阴影底 */}
      <rect x="3" y="3" width="118" height="30" rx="7" fill="#241C15" opacity="0.85" />
      {/* 卡面 */}
      <rect width="118" height="30" rx="7" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
      {/* 输入：两条短线 */}
      <line x1="12" y1="12" x2="52" y2="12" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <line x1="12" y1="20" x2="40" y2="20" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
      {/* 箭头 → */}
      <path d="M 62 15 L 74 15 M 70 11 L 74 15 L 70 19" stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* 输出标签 */}
      <rect x="80" y="6" width="30" height="18" rx="5" fill={chip} stroke="#241C15" strokeWidth="2" />
    </g>
  </g>
);

const FewShotCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.08}>
      {/* 装饰：左上小方块（散落示例） */}
      <g transform="translate(30,28)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-45">
          <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#FEF6D3" stroke="#241C15" strokeWidth="1.8" />
        </g>
      </g>

      {/* 三张错峰叠放的例子卡 */}
      <ExampleCard x={26} y={58} chip="#1B4B5A" hoverClass="group-hover:-translate-y-2 group-hover:-rotate-2" />
      <ExampleCard x={34} y={84} chip="#E07A5F" hoverClass="group-hover:translate-x-0.5" />
      <ExampleCard x={42} y={110} chip="#7A28CB" hoverClass="group-hover:translate-y-2 group-hover:rotate-2" />

      {/* 中间「照着做」横向箭头 */}
      <g transform="translate(168,100)">
        <g className="transition-transform duration-500 ease-spring group-hover:translate-x-1">
          <line x1="0" y1="0" x2="30" y2="0" stroke="#241C15" strokeWidth="3" strokeLinecap="round" />
          <path d="M 24 -6 L 32 0 L 24 6" stroke="#241C15" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text
          x="16"
          y="-12"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif"
          fontSize="9"
          fontWeight="700"
          fill="#241C15"
        >
          照着做
        </text>
      </g>

      {/* 右侧：空白「新任务」卡 + 问号 */}
      <g transform="translate(214,72)">
        <g className="origin-center transition-transform duration-400 ease-spring group-hover:scale-105" style={{ transformBox: "fill-box" }}>
          {/* 阴影底 */}
          <rect x="3" y="3" width="80" height="56" rx="10" fill="#241C15" opacity="0.85" />
          {/* 卡面（虚线） */}
          <rect width="80" height="56" rx="10" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.5" strokeDasharray="6 5" />
          {/* 输入线（待填） */}
          <line x1="14" y1="20" x2="50" y2="20" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
          {/* 大问号 */}
          <text
            x="40"
            y="48"
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="26"
            fontWeight="800"
            fill="#E07A5F"
          >
            ?
          </text>
        </g>
      </g>

      {/* 底部标题条 */}
      <g transform="translate(160,182)">
        <rect x="-58" y="-12" width="116" height="22" rx="11" fill="#241C15" />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#FBEFE3"
        >
          FEW-SHOT
        </text>
      </g>
    </CoverShell>
  );
};

export default FewShotCover;
