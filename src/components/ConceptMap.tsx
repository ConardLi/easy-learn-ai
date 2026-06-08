/**
 * ConceptMap — AI 知视「全景视图」（地铁线路图 + 关联高亮）
 *
 * 设计意图（对应用户诉求：从哪开始 / 怎么学 / 学到什么 / 关联是什么）：
 *   1. 顶部「学习主线一览」7 张卡 —— 一眼看清一共有哪几条学习路线、各自从哪起步
 *   2. 中部「地铁线路图」—— 每条彩色线就是一条学习顺序，从左往右、到头折返往下
 *   3. 把鼠标放到任意概念上（或点一下）—— 高亮它和别的概念的关联，按 6 种关系上色
 *   4. 点「打开讲解」—— 进入该概念的交互式讲解站
 *
 * 布局：蛇形折弯（boustrophedon）—— 每条线最多排 COLS 站，超出就折到下一行
 * 并反向往回走（圆角拐弯），长线自动盘起来，整张图宽度受控、不会无限拉长。
 *
 * 纯 SVG + React，无第三方图形库。
 */

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MousePointerClick,
  Sparkles,
  X,
} from "lucide-react";
import {
  ADJACENCY,
  GRAPH_NODES,
  LEARNING_LINES,
  lineById,
  NODES_BY_LINE,
  RECOMMENDED_START,
  RELATION_META,
  type GraphNode,
  type RelationType,
} from "../data/conceptGraphData";

/* ── 布局常量 ── */
const COLS = 6; // 每行最多几站，超出折返
const LABEL_W = 150; // 左侧线名留白
const COL_GAP = 178; // 同行相邻站水平间距
const ROW_GAP = 88; // 折返行间距
const PAD_TOP = 30; // 线条带内·首行上留白
const PAD_BOTTOM = 26; // 线条带内·末行下留白
const PILL_H = 36;
const HUB_H = 44;
const MAX_H = HUB_H; // 行高基准
const DETAIL_PANEL_W = 290;
const DETAIL_PANEL_H = 420;
const DETAIL_PANEL_MARGIN = 16;
const DETAIL_PANEL_GAP = 18;

/** 估算 station 宽度（中文字宽 ~15，英文 ~8） */
const estWidth = (label: string): number => {
  let w = 0;
  for (const ch of label) w += /[\x00-\xff]/.test(ch) ? 8 : 15;
  return Math.max(80, w + 30);
};

interface Placed extends GraphNode {
  cx: number;
  cy: number;
  w: number;
  h: number;
  lineColor: string;
}

interface LineLayout {
  id: string;
  name: string;
  startHint: string;
  color: string;
  yTop: number;
  bandH: number;
  /** 该线节点中心点序列（用于画地铁折线） */
  path: { cx: number; cy: number }[];
}

const ConceptMap: React.FC<{
  /** 点击「打开讲解」时回调概念 id，由父组件负责跳转 */
  onSelectConcept: (id: string) => void;
}> = ({ onSelectConcept }) => {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const displayId = selectedId ?? hoverId;

  /* 蛇形折弯布局：算出每个节点坐标 + 每条线的条带与折线 */
  const { placed, byId, lineLayouts, width, height } = useMemo(() => {
    const map = new Map<string, Placed>();
    const list: Placed[] = [];
    const layouts: LineLayout[] = [];
    const baseX = LABEL_W + 96; // 第一站圆心 x（给左侧 pill 留出半宽）

    let cursorY = 8;
    LEARNING_LINES.forEach((line) => {
      const lineNodes = NODES_BY_LINE[line.id] ?? [];
      const len = lineNodes.length;
      const rows = Math.max(1, Math.ceil(len / COLS));
      const firstRowY = cursorY + PAD_TOP + MAX_H / 2;
      const path: { cx: number; cy: number }[] = [];

      lineNodes.forEach((node, i) => {
        const row = Math.floor(i / COLS);
        const colInRow = i % COLS;
        // 蛇形：偶数行从左到右，奇数行从右到左（折返处同列 → 竖直连接）
        const col = row % 2 === 0 ? colInRow : COLS - 1 - colInRow;
        const cx = baseX + col * COL_GAP;
        const cy = firstRowY + row * ROW_GAP;
        const w = estWidth(node.label);
        const p: Placed = {
          ...node,
          cx,
          cy,
          w,
          h: node.hub ? HUB_H : PILL_H,
          lineColor: line.color,
        };
        map.set(node.id, p);
        list.push(p);
        path.push({ cx, cy });
      });

      const bandH = PAD_TOP + (rows - 1) * ROW_GAP + MAX_H + PAD_BOTTOM;
      layouts.push({
        id: line.id,
        name: line.name,
        startHint: line.startHint,
        color: line.color,
        yTop: cursorY,
        bandH,
        path,
      });
      cursorY += bandH;
    });

    const maxRight = list.reduce((m, p) => Math.max(m, p.cx + p.w / 2), 0);
    return {
      placed: list,
      byId: map,
      lineLayouts: layouts,
      width: maxRight + 40,
      height: cursorY + 12,
    };
  }, []);

  /* 当前高亮节点的邻居集合（含关系类型） */
  const neighbors = useMemo(() => {
    if (!displayId) return null;
    const m = new Map<string, RelationType>();
    (ADJACENCY[displayId] ?? []).forEach((n) => m.set(n.id, n.type));
    return m;
  }, [displayId]);

  const isDimmed = (id: string): boolean => {
    if (!displayId) return false;
    return id !== displayId && !neighbors?.has(id);
  };

  const selectedNode = selectedId ? byId.get(selectedId) : null;
  const detailPanelTop = selectedNode
    ? Math.max(
        DETAIL_PANEL_MARGIN,
        Math.min(
          selectedNode.cy - DETAIL_PANEL_H / 2,
          Math.max(DETAIL_PANEL_MARGIN, height - DETAIL_PANEL_H - DETAIL_PANEL_MARGIN),
        ),
      )
    : DETAIL_PANEL_MARGIN;
  const detailPanelLeft = selectedNode
    ? (() => {
        const rightOfNode =
          selectedNode.cx + selectedNode.w / 2 + DETAIL_PANEL_GAP;
        const leftOfNode =
          selectedNode.cx - selectedNode.w / 2 - DETAIL_PANEL_GAP - DETAIL_PANEL_W;

        if (rightOfNode + DETAIL_PANEL_W <= width - DETAIL_PANEL_MARGIN) {
          return rightOfNode;
        }
        if (leftOfNode >= DETAIL_PANEL_MARGIN) {
          return leftOfNode;
        }

        return Math.max(
          DETAIL_PANEL_MARGIN,
          Math.min(
            selectedNode.cx - DETAIL_PANEL_W / 2,
            width - DETAIL_PANEL_W - DETAIL_PANEL_MARGIN,
          ),
        );
      })()
    : DETAIL_PANEL_MARGIN;

  /* 选中节点的关联，按关系类型分组（用于侧面板） */
  const groupedRelations = useMemo(() => {
    if (!selectedId) return [];
    const groups = new Map<RelationType, { id: string; label: string }[]>();
    (ADJACENCY[selectedId] ?? []).forEach(({ id, type }) => {
      const n = byId.get(id);
      if (!n) return;
      if (!groups.has(type)) groups.set(type, []);
      groups.get(type)!.push({ id, label: n.label });
    });
    return Array.from(groups.entries());
  }, [selectedId, byId]);

  return (
    <div>
      {/* ───────── 引导文案 ───────── */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp font-sans font-semibold text-[12px] text-ink mb-5">
          <Sparkles className="w-3.5 h-3.5 text-coral" strokeWidth={2.5} />
          全景视图 · 知视图谱
        </div>
        <h2 className="font-display font-extrabold text-[28px] md:text-[36px] leading-[1.15] text-ink">
          这 40 个概念，其实是一张网
        </h2>
        <p className="font-sans text-[15px] md:text-[16px] leading-[1.7] text-ink/70 mt-4">
          每一条彩色线，就是一条从头到尾的学习路线，顺着往前学就行（到头会折回下一排）。
          把鼠标放到任意一个概念上，能看到它和谁有关系；
          <span className="font-semibold text-ink">点一下，就进入它的讲解。</span>
          不知道从哪开始？先看 <StartTag /> 那一站。
        </p>
      </div>

      {/* ───────── 学习主线一览（7 张卡）───────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
        {LEARNING_LINES.map((line) => (
          <div
            key={line.id}
            className="relative bg-white border-2 border-ink rounded-2xl p-4 shadow-stamp"
          >
            <span
              className="absolute top-0 left-5 -translate-y-1/2 inline-flex items-center px-2.5 py-0.5 rounded-full border-2 border-ink font-mono text-[10.5px] font-bold text-white"
              style={{ backgroundColor: line.color }}
            >
              {NODES_BY_LINE[line.id]?.length ?? 0} 站
            </span>
            <h3 className="font-display font-extrabold text-[16px] text-ink mt-1 flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full border border-ink"
                style={{ backgroundColor: line.color }}
              />
              {line.name}
            </h3>
            <p className="font-sans text-[12.5px] leading-[1.55] text-ink/65 mt-1.5">
              {line.blurb}
            </p>
            <div className="font-sans text-[11px] text-ink/45 mt-2.5 flex items-center gap-1">
              <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              {line.startHint}
            </div>
          </div>
        ))}
      </div>

      {/* ───────── 地铁线路图 ───────── */}
      <div className="relative">
        <div className="lg:hidden font-sans text-[12px] text-ink/45 mb-2 flex items-center gap-1.5">
          <MousePointerClick className="w-3.5 h-3.5" strokeWidth={2.5} />
          点概念看关联、进入讲解
        </div>

        <div className="overflow-x-auto rounded-3xl border-2 border-ink bg-cream shadow-stamp-lg">
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="block min-w-full"
            onMouseLeave={() => setHoverId(null)}
            role="img"
            aria-label="AI 概念关联地铁图"
          >
            {/* 行背景条纹 + 行标题 */}
            {lineLayouts.map((ln, li) => (
              <g key={`band-${ln.id}`}>
                <rect
                  x={0}
                  y={ln.yTop}
                  width={width}
                  height={ln.bandH}
                  fill={li % 2 === 0 ? "#FFFFFF" : "#FBF7EE"}
                  opacity={0.55}
                />
                <rect
                  x={14}
                  y={ln.yTop + ln.bandH / 2 - 7}
                  width={14}
                  height={14}
                  rx={4}
                  fill={ln.color}
                  stroke="#241C15"
                  strokeWidth={1.5}
                />
                <text
                  x={36}
                  y={ln.yTop + ln.bandH / 2 - 2}
                  fontSize={13}
                  fontWeight={800}
                  fill="#241C15"
                >
                  {ln.name}
                </text>
                <text
                  x={36}
                  y={ln.yTop + ln.bandH / 2 + 15}
                  fontSize={10.5}
                  fill="#241C15"
                  opacity={0.5}
                >
                  {ln.startHint}
                </text>
              </g>
            ))}

            {/* 地铁折线（蛇形拐弯）—— 圆角连接同线各站 */}
            {lineLayouts.map((ln) => {
              if (ln.path.length < 2) return null;
              const d =
                `M ${ln.path[0].cx} ${ln.path[0].cy} ` +
                ln.path
                  .slice(1)
                  .map((p) => `L ${p.cx} ${p.cy}`)
                  .join(" ");
              return (
                <path
                  key={`metro-${ln.id}`}
                  d={d}
                  fill="none"
                  stroke={ln.color}
                  strokeWidth={7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={displayId ? 0.12 : 0.5}
                />
              );
            })}

            {/* 关联高亮曲线（仅 hover/选中时）—— 跨线关系 */}
            {displayId &&
              neighbors &&
              Array.from(neighbors.entries()).map(([nid, type]) => {
                const a = byId.get(displayId);
                const b = byId.get(nid);
                if (!a || !b) return null;
                const meta = RELATION_META[type];
                const midX = (a.cx + b.cx) / 2;
                const midY = (a.cy + b.cy) / 2;
                const dist = Math.hypot(a.cx - b.cx, a.cy - b.cy);
                const cpY = midY - Math.min(90, dist * 0.28 + 24);
                return (
                  <path
                    key={`rel-${nid}`}
                    d={`M ${a.cx} ${a.cy} Q ${midX} ${cpY} ${b.cx} ${b.cy}`}
                    fill="none"
                    stroke={meta.color}
                    strokeWidth={2.5}
                    strokeDasharray={meta.dashed ? "6 5" : undefined}
                    opacity={0.85}
                  />
                );
              })}

            {/* 站点 */}
            {placed.map((p) => {
              const dimmed = isDimmed(p.id);
              const isActive = p.id === displayId;
              const relType = neighbors?.get(p.id);
              const ringColor = isActive
                ? p.lineColor
                : relType
                  ? RELATION_META[relType].color
                  : null;
              const isStart = p.id === RECOMMENDED_START;
              return (
                <g
                  key={p.id}
                  transform={`translate(${p.cx} ${p.cy})`}
                  opacity={dimmed ? 0.22 : 1}
                  style={{ cursor: "pointer", transition: "opacity .2s" }}
                  onMouseEnter={() => setHoverId(p.id)}
                  onClick={() => setSelectedId(p.id)}
                >
                  {isStart && !displayId && (
                    <rect
                      x={-p.w / 2 - 6}
                      y={-p.h / 2 - 6}
                      width={p.w + 12}
                      height={p.h + 12}
                      rx={(p.h + 12) / 2}
                      fill="none"
                      stroke={p.lineColor}
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      opacity={0.7}
                    />
                  )}
                  {ringColor && (
                    <rect
                      x={-p.w / 2 - 4}
                      y={-p.h / 2 - 4}
                      width={p.w + 8}
                      height={p.h + 8}
                      rx={(p.h + 8) / 2}
                      fill="none"
                      stroke={ringColor}
                      strokeWidth={3}
                    />
                  )}
                  <rect
                    x={-p.w / 2}
                    y={-p.h / 2}
                    width={p.w}
                    height={p.h}
                    rx={p.h / 2}
                    fill={p.hub ? p.lineColor : "#FFFFFF"}
                    stroke="#241C15"
                    strokeWidth={2}
                    style={{
                      filter: isActive
                        ? "drop-shadow(2px 3px 0 #241C15)"
                        : undefined,
                    }}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={p.hub ? 14 : 12.5}
                    fontWeight={p.hub ? 800 : 600}
                    fill={p.hub ? "#FFFFFF" : "#241C15"}
                  >
                    {p.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 选中详情面板 */}
        {selectedNode && (
          <div
            className="absolute w-[290px] max-w-[calc(100%-2rem)] max-h-[min(520px,calc(100vh-7rem))] overflow-y-auto bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5 z-10"
            style={{ top: detailPanelTop, left: detailPanelLeft }}
          >
            <button
              onClick={() => setSelectedId(null)}
              aria-label="关闭"
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-ink/5 transition-colors"
            >
              <X className="w-4 h-4 text-ink/60" strokeWidth={2.5} />
            </button>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border-2 border-ink font-mono text-[10.5px] font-bold text-white mb-2.5"
              style={{ backgroundColor: selectedNode.lineColor }}
            >
              {lineById[selectedNode.line]?.tag ?? selectedNode.category}
            </div>
            <h3 className="font-display font-extrabold text-[20px] text-ink leading-tight">
              {selectedNode.label}
            </h3>
            {selectedNode.desc && (
              <p className="font-sans text-[13px] leading-[1.6] text-ink/65 mt-2">
                {selectedNode.desc}
              </p>
            )}

            {groupedRelations.length > 0 ? (
              <div className="mt-4 space-y-3 max-h-[240px] overflow-y-auto pr-1">
                {groupedRelations.map(([type, items]) => {
                  const meta = RELATION_META[type];
                  return (
                    <div key={type}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: meta.color }}
                        />
                        <span className="font-sans font-semibold text-[11.5px] text-ink/70">
                          {meta.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((it) => (
                          <button
                            key={it.id}
                            onClick={() => setSelectedId(it.id)}
                            className="inline-flex items-center px-2.5 py-1 bg-cream border border-ink rounded-full font-sans text-[12px] text-ink hover:bg-butter transition-colors"
                          >
                            {it.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="font-sans text-[13px] text-ink/55 mt-4">
                这个概念暂时没标注关联。
              </p>
            )}

            <button
              onClick={() => onSelectConcept(selectedNode.id)}
              className="group w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-ink text-white border-2 border-ink rounded-full font-sans font-bold text-[13.5px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:5px_5px_0_0_#241C15]"
            >
              打开《{selectedNode.label}》讲解
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </button>
          </div>
        )}
      </div>

      {/* ───────── 关系图例 ───────── */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="font-sans font-semibold text-[12px] text-ink/55">
          线的颜色表示关系：
        </span>
        {(Object.keys(RELATION_META) as RelationType[]).map((t) => {
          const meta = RELATION_META[t];
          return (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 font-sans text-[12px] text-ink/70"
            >
              <svg width={22} height={8}>
                <line
                  x1={0}
                  y1={4}
                  x2={22}
                  y2={4}
                  stroke={meta.color}
                  strokeWidth={2.5}
                  strokeDasharray={meta.dashed ? "5 4" : undefined}
                />
              </svg>
              {meta.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/** 推荐起点小药丸（与图上发光起点同色） */
const StartTag: React.FC = () => {
  const node = GRAPH_NODES.find((n) => n.id === RECOMMENDED_START);
  const line = LEARNING_LINES.find((l) => l.id === node?.line);
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full border-2 border-ink font-sans font-bold text-[13px] text-white align-middle"
      style={{ backgroundColor: line?.color ?? "#241C15" }}
    >
      {node?.label ?? "LLM"}
    </span>
  );
};

export default ConceptMap;
