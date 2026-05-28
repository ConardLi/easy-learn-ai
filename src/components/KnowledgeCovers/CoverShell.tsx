/**
 * KnowledgeCovers · 通用外壳
 *
 * 给每张封面提供：
 *   - 16:10 比例自适应填满父容器
 *   - 一致的网格点底纹
 *   - groupHover 触发的微动画 hook（父级 KnowCard 已是 group/peer 容器）
 *
 * 每张封面只关心自己的"主图形 SVG"，构图统一在这里。
 */
import React from "react";

type CoverShellProps = {
  /** 背景纯色（Tailwind class），如 bg-butter / bg-teal/10 */
  bgClassName: string;
  /** 网格点颜色（hex） */
  dotColor?: string;
  /** 网格点透明度（0~1） */
  dotOpacity?: number;
  /** 内置 SVG 内容，viewBox 320×200 */
  children: React.ReactNode;
};

const CoverShell: React.FC<CoverShellProps> = ({
  bgClassName,
  dotColor = "#241C15",
  dotOpacity = 0.08,
  children,
}) => {
  return (
    <div className={`absolute inset-0 ${bgClassName}`}>
      {/* 网格点底纹 */}
      <svg
        viewBox="0 0 320 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id="cover-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill={dotColor} opacity={dotOpacity} />
          </pattern>
        </defs>
        <rect width="320" height="200" fill="url(#cover-dots)" />
      </svg>

      {/* 主图形 */}
      <svg
        viewBox="0 0 320 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {children}
      </svg>
    </div>
  );
};

export default CoverShell;
