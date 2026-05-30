/**
 * Section 05 · 指标实时算
 *
 * 固定模型 (Llama 3.1 70B BF16) + 硬件 (2× H100)，换 3 个工具。
 * 拖 2 个 slider：prompt 长度 / 输出长度。实时算：
 *   - TTFT  = base + per_token_prefill × prompt_len
 *   - TPOT  = const per tool
 *   - Total = TTFT + TPOT × output_len
 *
 * 顶部解释 4 个指标是什么。可视化是流式时间轴：横坐标时间，左段 TTFT (灰)，右段 TPOT × N (彩)。
 *
 * 数据来源：
 *  - iotdigitaltwinplm Q2 2026 (TTFT/TPOT 表)
 *  - effloow.com 2026/04 (vLLM 2×H100 100c 4741 tok/s, TTFT 261ms)
 *  - markaicode 2026 (Ollama 8c 82 tok/s)
 */
import React, { useMemo, useState } from "react";
import { Clock, Zap } from "lucide-react";

type Engine = {
  id: "vllm" | "sglang" | "ollama";
  name: string;
  color: string;
  /* TTFT base (ms) at 0 prompt */
  ttftBase: number;
  /* TTFT 每 token prefill ms（70B 大模型 prefill 比 8B 慢） */
  ttftPerTok: number;
  /* TPOT ms */
  tpot: number;
  note: string;
};

const ENGINES: Engine[] = [
  {
    id: "sglang",
    name: "SGLang",
    color: "#FF4D74",
    ttftBase: 240,
    ttftPerTok: 0.08,
    tpot: 7.9,
    note: "Llama 3.1 70B BF16 · 2× H100 · TP=2",
  },
  {
    id: "vllm",
    name: "vLLM v1",
    color: "#1B4B5A",
    ttftBase: 280,
    ttftPerTok: 0.09,
    tpot: 8.2,
    note: "Llama 3.1 70B BF16 · 2× H100 · TP=2 · chunked prefill on",
  },
  {
    id: "ollama",
    name: "Ollama",
    color: "#E07A5F",
    ttftBase: 600,
    ttftPerTok: 0.45,
    tpot: 45,
    note: "Llama 3.1 70B Q4 · 单流模式 · 不支持 TP",
  },
];

const SectionMetrics: React.FC = () => {
  const [engineId, setEngineId] = useState<Engine["id"]>("sglang");
  const [promptLen, setPromptLen] = useState(2000);
  const [outputLen, setOutputLen] = useState(400);
  const engine = ENGINES.find((e) => e.id === engineId)!;

  const m = useMemo(() => {
    const ttft = engine.ttftBase + engine.ttftPerTok * promptLen;
    const decode = engine.tpot * outputLen;
    const total = ttft + decode;
    const tps = (outputLen / decode) * 1000; // tokens / sec during stream
    return { ttft, decode, total, tps };
  }, [engine, promptLen, outputLen]);

  /* 三个引擎在同样输入下的对比，用来排名 */
  const ranked = useMemo(() => {
    return ENGINES.map((e) => {
      const ttft = e.ttftBase + e.ttftPerTok * promptLen;
      const total = ttft + e.tpot * outputLen;
      return { e, total };
    }).sort((a, b) => a.total - b.total);
  }, [promptLen, outputLen]);

  /* 时间轴可视化：以最慢的为基准缩放，max 8000ms */
  const maxScale = Math.max(8000, ranked[ranked.length - 1].total);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">latency math</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
          <h2 className="lg:col-span-7 font-display text-display-lg text-ink leading-tight">
            「我的请求要多久回？」
            <br />
            <span className="relative inline-block">
              <span className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0" aria-hidden />
              <span className="relative z-10">先把这两个数字拆出来。</span>
            </span>
          </h2>
          <div className="lg:col-span-5 self-end space-y-3 text-[14px] text-ink/75 leading-relaxed">
            <p>
              <b>TTFT</b>（time to first token）= 用户按下回车到看见第一个字的时间。决定流式体验。
            </p>
            <p>
              <b>TPOT</b>（time per output token）= 流式过程中相邻 token 的间隔。决定打字感和总耗时。
            </p>
          </div>
        </div>

        {/* 指标解释卡 · 4 张 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {[
            { k: "TTFT", v: "首 token 延迟", d: "从请求到第 1 个 token", icon: <Zap className="w-3.5 h-3.5" strokeWidth={2.2} /> },
            { k: "TPOT", v: "token 间延迟", d: "流式中两 token 间隔", icon: <Clock className="w-3.5 h-3.5" strokeWidth={2.2} /> },
            { k: "Throughput", v: "吞吐量", d: "集群每秒总 tokens", icon: <Zap className="w-3.5 h-3.5" strokeWidth={2.2} /> },
            { k: "Concurrency", v: "并发数", d: "同时服务的请求数", icon: <Clock className="w-3.5 h-3.5" strokeWidth={2.2} /> },
          ].map((c) => (
            <div key={c.k} className="p-3 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-coral">{c.icon}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink/55 font-bold">
                  {c.k}
                </span>
              </div>
              <div className="font-display text-[14px] font-bold text-ink leading-tight">{c.v}</div>
              <div className="font-mono text-[10px] text-ink/55 mt-1">{c.d}</div>
            </div>
          ))}
        </div>

        {/* 计算器 */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* 控件 */}
          <div className="lg:col-span-5 space-y-5">
            {/* 引擎切换 */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                选个引擎
              </div>
              <div className="flex gap-2">
                {ENGINES.map((e) => {
                  const on = e.id === engineId;
                  return (
                    <button
                      key={e.id}
                      onClick={() => setEngineId(e.id)}
                      className={[
                        "flex-1 px-3 py-2.5 rounded-xl border-2 border-ink font-display text-[14px] font-bold transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-stamp"
                          : "bg-white text-ink hover:bg-butter-tint",
                      ].join(" ")}
                    >
                      {e.name}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 font-mono text-[10.5px] text-ink/55">
                {engine.note}
              </p>
            </div>

            {/* prompt slider */}
            <div className="p-4 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55">
                  Prompt 长度
                </span>
                <span className="font-display text-[24px] font-bold text-ink tabular-nums">
                  {promptLen.toLocaleString()}
                  <span className="font-mono text-[11px] text-ink/55 ml-1">tok</span>
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={8000}
                step={50}
                value={promptLen}
                onChange={(e) => setPromptLen(Number(e.target.value))}
                className="w-full accent-coral"
              />
              <div className="flex justify-between mt-1 font-mono text-[9.5px] text-ink/45">
                <span>100</span>
                <span>2k</span>
                <span>4k</span>
                <span>8k</span>
              </div>
            </div>

            {/* output slider */}
            <div className="p-4 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55">
                  输出长度
                </span>
                <span className="font-display text-[24px] font-bold text-ink tabular-nums">
                  {outputLen.toLocaleString()}
                  <span className="font-mono text-[11px] text-ink/55 ml-1">tok</span>
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={2000}
                step={10}
                value={outputLen}
                onChange={(e) => setOutputLen(Number(e.target.value))}
                className="w-full accent-coral"
              />
              <div className="flex justify-between mt-1 font-mono text-[9.5px] text-ink/45">
                <span>50</span>
                <span>500</span>
                <span>1k</span>
                <span>2k</span>
              </div>
            </div>
          </div>

          {/* 结果 */}
          <div className="lg:col-span-7 space-y-4">
            {/* 当前引擎大数字 */}
            <div
              className="p-5 border-2 border-ink rounded-2xl shadow-stamp-lg"
              style={{ backgroundColor: engine.color, color: "#FBEFE3" }}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] opacity-80">
                  {engine.name} · 当前请求
                </div>
                <div className="font-mono text-[10.5px] opacity-80 tabular-nums">
                  {fmtMs(m.total)} 总时长
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Metric label="TTFT" value={fmtMs(m.ttft)} dim />
                <Metric label="TPOT" value={`${engine.tpot.toFixed(1)} ms`} dim />
                <Metric label="流式" value={`${m.tps.toFixed(0)} tok/s`} dim />
              </div>
            </div>

            {/* 三引擎时间轴对比 */}
            <div className="p-5 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                同样请求 · 3 个引擎实时对比
              </div>
              <div className="space-y-3">
                {ranked.map(({ e, total }, i) => {
                  const ttft = e.ttftBase + e.ttftPerTok * promptLen;
                  const decode = e.tpot * outputLen;
                  const ttftPct = (ttft / maxScale) * 100;
                  const decodePct = (decode / maxScale) * 100;
                  const isCurrent = e.id === engineId;
                  return (
                    <div key={e.id}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block w-2 h-2 rounded-full"
                            style={{ backgroundColor: e.color }}
                          />
                          <span
                            className={[
                              "font-display text-[14px] font-bold",
                              isCurrent ? "text-ink" : "text-ink/55",
                            ].join(" ")}
                          >
                            {e.name}
                          </span>
                          {i === 0 && (
                            <span className="px-1.5 py-0.5 bg-butter border border-ink rounded font-mono text-[8.5px] font-bold uppercase tracking-wider">
                              最快
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[11px] text-ink tabular-nums">
                          {fmtMs(total)}
                        </span>
                      </div>
                      <div className="flex h-5 border-2 border-ink rounded-full overflow-hidden bg-cream">
                        <div
                          className="h-full bg-ink/30 transition-all duration-300 ease-out"
                          style={{ width: `${ttftPct}%` }}
                          title={`TTFT ${fmtMs(ttft)}`}
                        />
                        <div
                          className="h-full transition-all duration-300 ease-out"
                          style={{
                            width: `${decodePct}%`,
                            backgroundColor: e.color,
                          }}
                          title={`Decode ${fmtMs(decode)}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-4 font-mono text-[10px] text-ink/55">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-ink/30 border border-ink" />
                  TTFT
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-coral border border-ink" />
                  Decode (TPOT × 输出长度)
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 font-mono text-[10.5px] text-ink/45 max-w-3xl">
          数据：iotdigitaltwinplm Q2 2026 (vLLM 82ms / SGLang 79ms TTFT @ chat workload) ·
          effloow.com 2026/04 · markaicode 2026 · 70B 模型 prefill ms/tok 由 8B 数据推算
        </p>
      </div>
    </section>
  );
};

const Metric: React.FC<{ label: string; value: string; dim?: boolean }> = ({ label, value, dim }) => (
  <div>
    <div className={`font-mono text-[10px] uppercase tracking-wider ${dim ? "opacity-65" : "text-ink/55"} mb-1`}>
      {label}
    </div>
    <div className="font-display text-[20px] font-bold tabular-nums leading-none">{value}</div>
  </div>
);

function fmtMs(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(2)} s`;
  return `${Math.round(v)} ms`;
}

export default SectionMetrics;
