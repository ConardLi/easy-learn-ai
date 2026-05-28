/**
 * Section 04 · 你来当 router
 *
 * 反模板形式 · L4 任务模拟器：
 *   ─ 给一句话，token 都摆好了
 *   ─ 你给每个 token 点一个专家
 *   ─ 下面 8 个 expert 的"工作量条"实时跳，告诉你是平衡的还是塌缩的
 *
 * quantization 全站没有任务模拟器 · 这是 MoE 站独有
 *
 * 可动元素：
 *   ① 切换场景 · 3 个 preset 句子（L2 chip）
 *   ② 点 token 循环换 expert（L3 reassign）
 *   ③ "auto-balance" / "reset" 按钮（L2）
 */
import React, { useState, useMemo, useCallback } from "react";
import { Shuffle, RotateCcw, Sparkles, AlertTriangle } from "lucide-react";

type Expert = { id: number; name: string; tone: string; vibe: string };

const EXPERTS: Expert[] = [
  { id: 0, name: "代码", tone: "#E07A5F", vibe: "py" },
  { id: 1, name: "数学", tone: "#1B4B5A", vibe: "∑" },
  { id: 2, name: "推理", tone: "#E5BD3A", vibe: "→" },
  { id: 3, name: "翻译", tone: "#FF4D74", vibe: "中↔英" },
  { id: 4, name: "对话", tone: "#88837C", vibe: "💬" },
  { id: 5, name: "事实", tone: "#9C7CFF", vibe: "?" },
  { id: 6, name: "创意", tone: "#3FA876", vibe: "✦" },
  { id: 7, name: "中文", tone: "#D4A574", vibe: "字" },
];

type Scene = {
  id: string;
  title: string;
  hint: string;
  tokens: string[];
  ideal: number[]; // 每 token 的"合理"专家 idx
};

const SCENES: Scene[] = [
  {
    id: "code",
    title: "代码任务",
    hint: "应该多走代码 / 推理 / 数学",
    tokens: ["写", "一个", "fib", "(", "n", ")", "返回", "数列"],
    ideal: [0, 0, 0, 0, 1, 0, 2, 1],
  },
  {
    id: "translate",
    title: "中英翻译",
    hint: "应该多走翻译 / 中文 / 英文",
    tokens: ["把", "今天", "天气", "翻译成", "It", "is", "sunny", "today"],
    ideal: [7, 7, 7, 3, 3, 3, 3, 3],
  },
  {
    id: "story",
    title: "创意写作",
    hint: "应该多走创意 / 中文 / 对话",
    tokens: ["从前", "有", "一只", "猫", "它", "喜欢", "晒", "太阳"],
    ideal: [6, 4, 4, 7, 4, 6, 6, 7],
  },
];

const SectionAsRouter: React.FC = () => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const scene = SCENES[sceneIdx];
  /* 每个 token 当前的 expert 分配 · 初始随机分布 */
  const [routes, setRoutes] = useState<number[]>(() => deterministicSpread(SCENES[0].tokens.length));

  /* 切场景时初始化路由 */
  const handleSceneChange = useCallback((i: number) => {
    setSceneIdx(i);
    setRoutes(deterministicSpread(SCENES[i].tokens.length));
  }, []);

  const cycle = (i: number) => {
    setRoutes((r) => r.map((v, idx) => (idx === i ? (v + 1) % EXPERTS.length : v)));
  };

  const usage = useMemo(() => {
    const counts = new Array(EXPERTS.length).fill(0);
    for (const r of routes) counts[r]++;
    return counts;
  }, [routes]);

  const total = routes.length;
  const expectedPerExpert = total / EXPERTS.length;
  const maxUsage = Math.max(...usage);
  const minUsage = Math.min(...usage);
  /* "塌缩指数"：最大利用率 / 期望，>2 算坍缩 */
  const collapseRatio = maxUsage / expectedPerExpert;
  const dieCount = usage.filter((u) => u === 0).length;

  const verdict =
    collapseRatio >= 2.5
      ? { kind: "collapse" as const, msg: `${dieCount} 个专家饿死，路由器塌缩到 ${usage.indexOf(maxUsage) + 1} 号` }
      : collapseRatio >= 1.6
        ? { kind: "skew" as const, msg: `专家 ${EXPERTS[usage.indexOf(maxUsage)].name} 偏重，${dieCount} 个没工作` }
        : dieCount === 0 && collapseRatio < 1.4
          ? { kind: "good" as const, msg: "DeepSeek 教科书级 · 8 个 expert 都在干活" }
          : { kind: "ok" as const, msg: `还行 · ${dieCount} 个空转、其它 ${EXPERTS.length - dieCount} 个分散` };

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">play as the router</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          把鼠标当 router 试一下 ——
          <br />
          故意让一个专家{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">累死</span>
          </span>
          ，看其它怎么{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">饿死</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-8">
          下面每个 token 都是按钮，<strong className="text-ink">点一下</strong>就换一个专家。
          全戳给&ldquo;代码&rdquo;试试 —— 你会看到经典的&ldquo;路由塌缩 (routing collapse)&rdquo;，
          这是所有 MoE 训练都得防的失败模式。
        </p>

        {/* 场景切换 */}
        <div className="flex flex-wrap gap-2 mb-5 items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mr-1">scene ·</span>
          {SCENES.map((s, i) => {
            const on = i === sceneIdx;
            return (
              <button
                key={s.id}
                onClick={() => handleSceneChange(i)}
                className={[
                  "px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-cream text-ink hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#241C15]",
                ].join(" ")}
              >
                {s.title}
              </button>
            );
          })}
          <div className="ml-2 font-mono text-[11px] text-ink/55">
            {scene.hint}
          </div>
        </div>

        {/* 主舞台 */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* 左：token + 操作区 */}
          <div className="lg:col-span-7 space-y-4">
            {/* tokens */}
            <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp p-5">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  你的句子 · 点 token 换 expert
                </div>
                <div className="font-mono text-[10px] text-ink/45">
                  {scene.tokens.length} 个 token
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {scene.tokens.map((t, i) => {
                  const e = EXPERTS[routes[i]];
                  return (
                    <button
                      key={`${t}-${i}`}
                      onClick={() => cycle(i)}
                      className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg border-2 border-ink bg-white hover:-translate-y-0.5 transition-all duration-200 ease-spring active:translate-y-0 shadow-[2px_2px_0_0_#241C15] hover:shadow-[4px_4px_0_0_#241C15]"
                    >
                      <span className="font-display text-[15px] font-bold text-ink leading-none">
                        {t}
                      </span>
                      <span
                        className="font-mono text-[9px] font-bold text-cream px-1 rounded-sm leading-tight"
                        style={{ backgroundColor: e.tone }}
                      >
                        {e.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setRoutes(scene.ideal.slice(0, scene.tokens.length))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-butter border-2 border-ink text-ink font-mono text-[11px] font-bold shadow-stamp hover:-translate-y-0.5 transition-all"
                >
                  <Sparkles className="w-3 h-3" strokeWidth={2.5} />
                  按场景理想路由
                </button>
                <button
                  onClick={() => setRoutes(new Array(scene.tokens.length).fill(0))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral border-2 border-ink text-cream font-mono text-[11px] font-bold shadow-stamp hover:-translate-y-0.5 transition-all"
                >
                  <AlertTriangle className="w-3 h-3" strokeWidth={2.5} />
                  全砸给代码 · 看坍缩
                </button>
                <button
                  onClick={() => setRoutes(deterministicSpread(scene.tokens.length))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-ink text-ink font-mono text-[11px] font-bold shadow-stamp hover:-translate-y-0.5 transition-all"
                >
                  <Shuffle className="w-3 h-3" strokeWidth={2.5} />
                  均匀分散
                </button>
                <button
                  onClick={() => setRoutes((r) => r.map(() => Math.floor(Math.random() * EXPERTS.length)))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-ink text-ink font-mono text-[11px] font-bold shadow-stamp hover:-translate-y-0.5 transition-all"
                >
                  <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
                  随机
                </button>
              </div>
            </div>

            {/* verdict */}
            <div
              className={[
                "p-4 border-2 border-ink rounded-2xl flex items-start gap-3",
                verdict.kind === "good"
                  ? "bg-teal text-cream"
                  : verdict.kind === "ok"
                    ? "bg-butter"
                    : verdict.kind === "skew"
                      ? "bg-coral/30"
                      : "bg-coral text-cream",
              ].join(" ")}
            >
              <div className="font-display text-[26px] leading-none">
                {verdict.kind === "good" ? "✓" : verdict.kind === "ok" ? "≈" : verdict.kind === "skew" ? "!" : "×"}
              </div>
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-0.5 opacity-70">
                  {verdict.kind === "good" && "balanced"}
                  {verdict.kind === "ok" && "imbalanced but alive"}
                  {verdict.kind === "skew" && "skewed"}
                  {verdict.kind === "collapse" && "routing collapse"}
                </div>
                <p className="text-[14.5px] font-semibold leading-snug">
                  {verdict.msg}
                </p>
              </div>
            </div>
          </div>

          {/* 右：8 个 expert utilization bars */}
          <div className="lg:col-span-5">
            <div className="bg-ink text-cream rounded-2xl border-2 border-ink p-5 shadow-stamp">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter">
                  8 个 expert 的工作量
                </div>
                <div className="font-mono text-[10px] text-cream/55">
                  期望均匀 = {expectedPerExpert.toFixed(1)} 次
                </div>
              </div>
              <div className="space-y-2">
                {EXPERTS.map((e, i) => {
                  const u = usage[i];
                  const pct = (u / Math.max(1, maxUsage)) * 100;
                  const isMax = u === maxUsage && u > 0;
                  const isDead = u === 0;
                  return (
                    <div key={e.id} className="flex items-center gap-2.5">
                      <div className="w-12 shrink-0 flex items-center gap-1.5">
                        <div
                          className="w-2.5 h-2.5 rounded-sm border border-cream/30"
                          style={{ backgroundColor: e.tone }}
                        />
                        <span className="font-display text-[12px] font-bold text-cream leading-none">
                          {e.name}
                        </span>
                      </div>
                      <div className="flex-1 h-3 bg-cream/8 rounded-full overflow-hidden border border-cream/15 relative">
                        <div
                          className="h-full transition-all duration-300 ease-spring"
                          style={{
                            width: `${Math.max(2, pct)}%`,
                            backgroundColor: isDead ? "transparent" : e.tone,
                            opacity: isDead ? 0.3 : 1,
                          }}
                        />
                      </div>
                      <div className={[
                        "w-9 text-right font-mono text-[11px] tabular-nums shrink-0",
                        isDead ? "text-coral" : isMax ? "text-butter font-bold" : "text-cream/65",
                      ].join(" ")}>
                        {u}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-cream/15 grid grid-cols-3 gap-2">
                <Mini label="塌缩指数" value={`${collapseRatio.toFixed(2)}×`} tone={collapseRatio >= 2 ? "coral" : "butter"} />
                <Mini label="饿死专家" value={dieCount.toString()} tone={dieCount === 0 ? "teal" : "coral"} />
                <Mini label="标准差" value={stddev(usage).toFixed(2)} tone="cream" />
              </div>
              <p className="mt-3 font-mono text-[9.5px] text-cream/40 leading-relaxed">
                真实 MoE 训练里这事自动发生，没监督会越偏越偏。
                DeepSeek V3 用 bias 项纠偏，不加 aux loss。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Mini: React.FC<{ label: string; value: string; tone: "coral" | "butter" | "teal" | "cream" }> = ({ label, value, tone }) => {
  const c = {
    coral: "text-coral",
    butter: "text-butter",
    teal: "text-teal",
    cream: "text-cream",
  }[tone];
  return (
    <div className="px-2 py-1.5 bg-cream/8 rounded border border-cream/15">
      <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-cream/55 mb-0.5">{label}</div>
      <div className={`font-display text-[15px] font-bold tabular-nums ${c}`}>{value}</div>
    </div>
  );
};

/** 均匀洒一遍：n 个 token 按 i % 8 分配 */
function deterministicSpread(n: number): number[] {
  return Array.from({ length: n }).map((_, i) => i % EXPERTS.length);
}

function stddev(arr: number[]): number {
  const m = arr.reduce((a, b) => a + b, 0) / arr.length;
  return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length);
}

export default SectionAsRouter;
