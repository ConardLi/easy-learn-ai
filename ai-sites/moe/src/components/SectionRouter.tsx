/**
 * Section 02 · 拆开 router 看看
 *
 * 反模板形式：2D 语义平面 + 可拖 token + top-K stepper。
 *   ─ quantization 数轴 slider 是 1D，我这是 2D 拖拽
 *   ─ 直接对应 MoE 概念："router 就是看 token 和哪个 expert 的中心更近"
 *
 * 可动元素：
 *   ① 拖拽紫色 token 点改语义坐标（L3）
 *   ② top-K stepper 「1 / 2 / 4 / 8」（L2）
 *   ③ 8 个 expert 中心 hover 看 score（基础礼貌，不计入）
 */
import React, { useState, useRef, useMemo } from "react";

type Expert = { id: number; name: string; vibe: string; x: number; y: number; tone: string };

/** 8 个 expert 的语义"领域中心"，分布在 2D 平面 */
const EXPERTS: Expert[] = [
  { id: 0, name: "代码", vibe: "py / js / sql", x: 100, y: 70, tone: "#E07A5F" },
  { id: 1, name: "数学", vibe: "证明 / 求解", x: 170, y: 50, tone: "#1B4B5A" },
  { id: 2, name: "推理", vibe: "逻辑 / 归纳", x: 250, y: 60, tone: "#E5BD3A" },
  { id: 3, name: "翻译", vibe: "中↔英", x: 320, y: 90, tone: "#FF4D74" },
  { id: 4, name: "对话", vibe: "闲聊 / 客服", x: 330, y: 175, tone: "#E07A5F" },
  { id: 5, name: "事实", vibe: "百科 / 命名", x: 260, y: 205, tone: "#1B4B5A" },
  { id: 6, name: "创意", vibe: "故事 / 诗", x: 165, y: 215, tone: "#E5BD3A" },
  { id: 7, name: "中文", vibe: "古典 / 成语", x: 90, y: 175, tone: "#FF4D74" },
];

const TOPK_OPTIONS = [1, 2, 4, 8];

const SectionRouter: React.FC = () => {
  const [pos, setPos] = useState({ x: 220, y: 130 });
  const [topK, setTopK] = useState(2);
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  /* affinity = -dist² · softmax */
  const { scores, topIds } = useMemo(() => {
    const raw = EXPERTS.map((e) => {
      const dx = (pos.x - e.x) / 80;
      const dy = (pos.y - e.y) / 80;
      return -(dx * dx + dy * dy);
    });
    const max = Math.max(...raw);
    const exps = raw.map((s) => Math.exp(s - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    const ss = exps.map((e) => e / sum);
    const idxs = ss
      .map((s, i) => [s, i] as [number, number])
      .sort((a, b) => b[0] - a[0])
      .slice(0, topK)
      .map(([, i]) => i);
    return { scores: ss, topIds: new Set(idxs) };
  }, [pos, topK]);

  /* renormalized weights for top-K only */
  const topWeights = useMemo(() => {
    const arr = EXPERTS.map((_, i) => (topIds.has(i) ? scores[i] : 0));
    const sum = arr.reduce((a, b) => a + b, 0) || 1;
    return arr.map((v) => v / sum);
  }, [scores, topIds]);

  /* 拖拽 */
  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    movePos(e);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    movePos(e);
  };
  const handlePointerUp = () => setDragging(false);

  const movePos = (e: React.PointerEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 420;
    const y = ((e.clientY - rect.top) / rect.height) * 260;
    setPos({
      x: Math.max(30, Math.min(390, x)),
      y: Math.max(30, Math.min(230, y)),
    });
  };

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">inside the router</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          所谓 router，
          <br />
          就是一个{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">小打分网络</span>
          </span>
          ，告诉你这个词
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">更像哪几个专家</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          路由器就是一个小打分网络：每个 token（句子切成的一小段，约等于一个字 / 词）进来，它给每个专家打个分，看这个词更像哪几个专家，分数最高的取前 K 个。
          下面把专家放进一个二维平面给你看 —— 拖那个紫点（代表当前这个 token），看它离哪几个专家最近、router 就选谁。愿意看公式的，最底下有一行。
        </p>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* 左：2D 平面 */}
          <div className="lg:col-span-7">
            <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp-lg p-4 lg:p-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  semantic plane · drag the dot
                </div>
                <div className="font-mono text-[10px] text-ink/45 tabular-nums">
                  ({pos.x.toFixed(0)}, {pos.y.toFixed(0)})
                </div>
              </div>
              <svg
                ref={svgRef}
                viewBox="0 0 420 260"
                className={[
                  "w-full h-auto bg-white border-2 border-ink rounded-xl select-none",
                  dragging ? "cursor-grabbing" : "cursor-grab",
                ].join(" ")}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                style={{ touchAction: "none" }}
              >
                {/* 背景网格 */}
                <defs>
                  <pattern id="rgrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.8" fill="#241C15" opacity="0.1" />
                  </pattern>
                </defs>
                <rect width="420" height="260" fill="url(#rgrid)" />

                {/* 8 个 expert 的"势力范围"圈 */}
                {EXPERTS.map((e, i) => {
                  const isTop = topIds.has(i);
                  return (
                    <g key={`zone-${e.id}`}>
                      <circle
                        cx={e.x}
                        cy={e.y}
                        r="50"
                        fill={e.tone}
                        fillOpacity={isTop ? 0.18 : 0.06}
                        stroke={e.tone}
                        strokeOpacity={isTop ? 0.55 : 0.18}
                        strokeWidth="1.5"
                        strokeDasharray={isTop ? "0" : "3 3"}
                      />
                    </g>
                  );
                })}

                {/* 连接线 token → topK experts */}
                {EXPERTS.map((e, i) => {
                  if (!topIds.has(i)) return null;
                  return (
                    <line
                      key={`ln-${e.id}`}
                      x1={pos.x}
                      y1={pos.y}
                      x2={e.x}
                      y2={e.y}
                      stroke="#241C15"
                      strokeWidth={1.5}
                      strokeDasharray="4 3"
                      className="animate-dash-flow"
                    />
                  );
                })}

                {/* expert 中心 */}
                {EXPERTS.map((e, i) => {
                  const isTop = topIds.has(i);
                  return (
                    <g key={`exp-${e.id}`} transform={`translate(${e.x},${e.y})`}>
                      <circle
                        r={isTop ? 11 : 8}
                        fill={isTop ? e.tone : "#FBEFE3"}
                        stroke="#241C15"
                        strokeWidth={isTop ? 2.2 : 1.5}
                      />
                      <text
                        y="-15"
                        textAnchor="middle"
                        fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
                        fontSize="11"
                        fontWeight="800"
                        fill="#241C15"
                      >
                        {e.name}
                      </text>
                      <text
                        y="22"
                        textAnchor="middle"
                        fontFamily="Geist Mono, monospace"
                        fontSize="8"
                        fill="#241C15"
                        opacity="0.55"
                      >
                        {(scores[i] * 100).toFixed(0)}%
                      </text>
                    </g>
                  );
                })}

                {/* token */}
                <g
                  transform={`translate(${pos.x},${pos.y})`}
                  onPointerDown={handlePointerDown}
                  style={{ cursor: dragging ? "grabbing" : "grab" }}
                >
                  <circle r="14" fill="#241C15" opacity="0.12" />
                  <circle
                    r="9"
                    fill="#241C15"
                    stroke="#F4D35E"
                    strokeWidth="2"
                  />
                  <text
                    y="3"
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="9"
                    fontWeight="700"
                    fill="#F4D35E"
                  >
                    tok
                  </text>
                </g>

                {/* 提示 */}
                <text x="14" y="252" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
                  拖紫点 → 看 router 选谁
                </text>
              </svg>
            </div>
          </div>

          {/* 右：top-K + 分布 + 公式 */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* top-K 切换 */}
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4">
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  top-K · 选几个
                </div>
                <div className="font-mono text-[10px] text-ink/45">
                  {topK === 1 && "Switch / Llama4"}
                  {topK === 2 && "Mixtral / Grok-1"}
                  {topK === 4 && "GPT-OSS"}
                  {topK === 8 && "DeepSeek V3 / Qwen3 / Kimi"}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {TOPK_OPTIONS.map((k) => {
                  const on = k === topK;
                  return (
                    <button
                      key={k}
                      onClick={() => setTopK(k)}
                      className={[
                        "py-2 rounded-md border-2 border-ink font-display text-[16px] font-bold transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-cream text-ink hover:bg-butter/40 hover:-translate-y-0.5",
                      ].join(" ")}
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* softmax bar 分布 */}
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4 flex-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                router 输出 · softmax 8 个 expert
              </div>
              <div className="space-y-1.5">
                {EXPERTS.map((e, i) => {
                  const isTop = topIds.has(i);
                  const pct = scores[i] * 100;
                  const wt = topWeights[i] * 100;
                  return (
                    <div key={e.id} className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full border border-ink shrink-0"
                        style={{ backgroundColor: isTop ? e.tone : "#FBEFE3" }}
                      />
                      <div className="w-12 shrink-0 font-display text-[12.5px] font-bold text-ink">
                        {e.name}
                      </div>
                      <div className="flex-1 h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/10 relative">
                        <div
                          className={[
                            "h-full transition-all duration-300 ease-spring",
                            isTop ? "" : "opacity-40",
                          ].join(" ")}
                          style={{
                            width: `${Math.max(2, pct)}%`,
                            backgroundColor: e.tone,
                          }}
                        />
                      </div>
                      <div
                        className={[
                          "w-12 text-right shrink-0 font-mono text-[10px] tabular-nums",
                          isTop ? "text-ink font-bold" : "text-ink/40",
                        ].join(" ")}
                      >
                        {pct.toFixed(1)}%
                      </div>
                      {isTop && (
                        <div className="w-12 text-right shrink-0 font-mono text-[10px] text-coral font-bold tabular-nums">
                          →{wt.toFixed(0)}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 font-mono text-[9.5px] text-ink/45 leading-relaxed">
                左列 = 原始 softmax · 右列 = top-{topK} 重新归一化后的权重（实际乘进 expert 输出）
              </p>
            </div>

            {/* 一行公式（伪代码） */}
            <div className="bg-ink text-cream rounded-2xl border-2 border-ink p-3.5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-1.5">
                router · 一行字
              </div>
              <code className="block font-mono text-[12px] leading-relaxed text-cream/90">
                y = Σ<sub>i∈topK</sub> softmax(W·x)<sub>i</sub> · E<sub>i</sub>(x)
              </code>
              <p className="mt-1.5 font-mono text-[9.5px] text-cream/55">
                W 是一层打分用的小矩阵 · E<sub>i</sub> 是第 i 个 expert · x 是 token 向量
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionRouter;
