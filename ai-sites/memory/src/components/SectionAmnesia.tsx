/**
 * SectionAmnesia · 一个失忆现场
 *
 * 目标：让用户摸到 context window 是临时的、为什么需要长期记忆。
 *
 * 主交互（L3 slider）：
 *   - 模拟一段编程会话，左侧滑条调「已经聊了几轮」
 *   - 实时看 context window 占用条 + 内容堆积
 *   - 关键演示：拖到接近满 → 提示截断；点「关掉终端再开」→ 一切清零
 */
import React, { useMemo, useState } from "react";
import { Power, AlertTriangle, RotateCcw, Zap } from "lucide-react";

const TURN_TOKENS = [
  // 每轮新增的近似 token 量（用户/agent/工具）
  { user: 80, assistant: 240, tools: 0, label: "项目用 TypeScript，测试是 Vitest" },
  { user: 60, assistant: 320, tools: 180, label: "看一下 src/index.ts" },
  { user: 50, assistant: 280, tools: 220, label: "怎么部署到 Cloudflare Workers" },
  { user: 70, assistant: 360, tools: 320, label: "改一下错误处理" },
  { user: 90, assistant: 410, tools: 510, label: "为什么 fetch 总是 timeout" },
  { user: 60, assistant: 470, tools: 720, label: "看下 wrangler.toml 配置" },
  { user: 80, assistant: 520, tools: 980, label: "跑一遍 vitest" },
  { user: 70, assistant: 580, tools: 1240, label: "把这段重构成 hook" },
  { user: 90, assistant: 640, tools: 1480, label: "再来一个 e2e 测试" },
  { user: 70, assistant: 720, tools: 1680, label: "tsconfig 调一下 strict" },
  { user: 80, assistant: 800, tools: 1920, label: "为什么 build 出来比预期大" },
  { user: 90, assistant: 880, tools: 2240, label: "切到 esbuild bundler 试试" },
];

const CONTEXT_LIMIT = 8000; // 演示用窗口（GPT-4o 真值是 128K，这里压缩比例好可视化）
const SYSTEM_PROMPT = 600;

const SectionAmnesia: React.FC = () => {
  const [turn, setTurn] = useState(5);
  const [closed, setClosed] = useState(false);

  const used = useMemo(() => {
    if (closed) return 0;
    let total = SYSTEM_PROMPT;
    for (let i = 0; i < turn; i++) {
      const t = TURN_TOKENS[i];
      total += t.user + t.assistant + t.tools;
    }
    return total;
  }, [turn, closed]);

  const pct = Math.min(100, (used / CONTEXT_LIMIT) * 100);
  const isCrowded = pct > 75 && !closed;
  const isOverflow = pct >= 100 && !closed;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        {/* section anchor */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Why · 为什么需要</span>
        </div>

        {/* 标题 + 副 */}
        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          Context window 撑得再大，
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">关掉就归零</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          LLM 没有硬盘。它每次请求时收到的那一大段文本（system prompt + 历史消息 + 工具定义）拼起来，
          就是它的全部「记忆」。GPT-4o 是 128K，Claude 200K，Gemini 1M。
          看上去很大，实际开发里几轮工具调用就吃掉一两万。
          <span className="font-bold text-ink">更关键的是 —— 每次新建会话，它都是空的。</span>
        </p>

        {/* ─── 主交互：会话模拟器 ─── */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：控制 */}
          <div className="lg:col-span-5 space-y-5">
            <div className="card-stamp p-6">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
                控制台
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-display font-bold text-[18px] text-ink">
                  对话已进行 {closed ? 0 : turn} 轮
                </span>
                <span className="font-mono text-[12px] text-ink/55">/ {TURN_TOKENS.length}</span>
              </div>
              <input
                type="range"
                min={0}
                max={TURN_TOKENS.length}
                value={closed ? 0 : turn}
                disabled={closed}
                onChange={(e) => setTurn(Number(e.target.value))}
                className="w-full accent-coral disabled:opacity-40 cursor-pointer"
              />

              <div className="flex flex-wrap gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => setClosed(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-ink text-cream border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                >
                  <Power className="w-3.5 h-3.5" strokeWidth={2.5} />
                  关掉终端
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setClosed(false);
                    setTurn(5);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-cream text-ink border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                >
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
                  重置
                </button>
              </div>
            </div>

            {/* 占用条 */}
            <div className="card-stamp p-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  CONTEXT 占用
                </span>
                <span className="font-mono font-bold text-[15px] text-ink">
                  {used.toLocaleString()} / {CONTEXT_LIMIT.toLocaleString()} tokens
                </span>
              </div>
              <div className="relative h-7 bg-cream border-2 border-ink rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-400 ease-editorial ${
                    isOverflow ? "bg-pop" : isCrowded ? "bg-coral" : "bg-butter"
                  }`}
                  style={{ width: `${pct}%` }}
                />
                {/* 75% 警戒线 */}
                <div className="absolute inset-y-0" style={{ left: "75%" }}>
                  <div className="w-px h-full bg-ink/40 border-l border-dashed border-ink/40" />
                </div>
              </div>

              {/* 状态描述 */}
              <div className="mt-3 font-mono text-[12px] text-ink/70 leading-[1.6]">
                {closed && (
                  <span className="inline-flex items-center gap-1.5 text-ink">
                    <RotateCcw className="w-3.5 h-3.5" /> 关闭后再开 ——{" "}
                    <span className="font-bold text-pop">一切归零</span>，
                    项目栈、报错、改过的文件，全得重讲。
                  </span>
                )}
                {!closed && isOverflow && (
                  <span className="inline-flex items-center gap-1.5 text-pop font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" /> 撑爆了：早期消息会被截断 / 摘要
                  </span>
                )}
                {!closed && !isOverflow && isCrowded && (
                  <span className="inline-flex items-center gap-1.5 text-coral font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" /> 越来越挤，模型开始忘前面说过的事
                  </span>
                )}
                {!closed && !isCrowded && (
                  <span>窗口还有空间，前面的对话都能看见。</span>
                )}
              </div>
            </div>
          </div>

          {/* 右：对话堆积可视化 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-6 h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  CONTEXT WINDOW · 模型每轮收到这堆
                </span>
                <span className="font-mono text-[11px] text-ink/45">{closed ? "—" : `当前轮 ${turn}`}</span>
              </div>

              {closed ? (
                <div className="border-2 border-dashed border-ink/30 rounded-2xl p-12 text-center">
                  <div className="font-display font-extrabold text-[28px] text-ink/30 mb-2">
                    EMPTY
                  </div>
                  <div className="font-mono text-[12px] text-ink/50">
                    new session · context = []
                  </div>
                  <p className="font-sans text-[13.5px] text-ink/60 mt-4 leading-[1.7] max-w-[420px] mx-auto">
                    新会话开起来，前面 30 分钟的所有偏好、决策、踩过的坑 —— 全部蒸发。
                    这就是 Agent 记忆要解决的事。
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2">
                  {/* system prompt */}
                  <div className="bg-ink/5 border-2 border-ink/15 rounded-xl px-3.5 py-2 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-ink/65">
                      <span className="font-bold text-ink/85">SYSTEM</span> · 工具定义 / 人设
                    </span>
                    <span className="font-mono text-[11px] text-ink/55">{SYSTEM_PROMPT}t</span>
                  </div>
                  {TURN_TOKENS.slice(0, turn).map((t, i) => (
                    <div
                      key={i}
                      className="border-2 border-ink rounded-xl overflow-hidden"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <div className="bg-butter/60 px-3.5 py-1.5 flex items-center justify-between border-b-2 border-ink">
                        <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-ink/70">
                          TURN {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-ink">
                          {t.user + t.assistant + t.tools}t
                        </span>
                      </div>
                      <div className="px-3.5 py-2 bg-white">
                        <div className="font-sans text-[13px] text-ink/80 leading-[1.5]">
                          <span className="font-mono text-[10.5px] text-coral mr-1.5">USER</span>
                          {t.label}
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 font-mono text-[10.5px] text-ink/55">
                          <span>user {t.user}t</span>
                          <span>· asst {t.assistant}t</span>
                          {t.tools > 0 && <span>· tools {t.tools}t</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 收尾 */}
        <div className="mt-12 flex items-start gap-4 max-w-[800px] bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
          <div className="w-10 h-10 rounded-full bg-butter text-ink flex items-center justify-center flex-shrink-0 border-2 border-cream/40">
            <Zap className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display font-bold text-[17px] mb-1">
              其实就两件事：
            </div>
            <p className="font-sans text-[14.5px] leading-[1.7] text-cream/85">
              <span className="font-bold text-butter">短期</span>：当前对话内，信息怎么在窗口里高效组织（截断 / 压缩 / 摘要）。
              <span className="font-bold text-butter ml-2">长期</span>：跨对话，有价值的信息怎么持久保存、下次怎么取回来。
              大多数人说的「AI 记忆」，主要指后者。下面 5 节都围绕长期记忆。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAmnesia;
