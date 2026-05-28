/**
 * Section 04 · GRPO · 让一组答案互相比 · L4 任务模拟器
 *
 * 用户当一回 GRPO 调度员：
 *  1. 拖一道题（math / code / format-check），看 G=4..8 个候选答案
 *  2. 每个候选自动结算 accuracy reward (0/1) + format reward (0/1)
 *  3. 点 "compute advantage" 看 (r_i − mean) / std，正得到推力、负得到压力
 *  4. 群体里没有 critic、没有 value model；advantage 完全来自组内对比
 *
 * 这与 rlhf 站「A/B 偏好任务」彻底不同 —— 那是让人当标注员，这是规则当裁判。
 *
 * 数据来源：arXiv:2501.12948 §2.1 GRPO + DeepSeekMath 原始论文 GRPO 公式
 */
import React, { useMemo, useState } from "react";
import { Sigma } from "lucide-react";

type Problem = {
  id: string;
  title: string;
  question: string;
  correctSummary: string;
  /* 每个候选：思考片段简化 + 是否正确 + 是否符合 <think>/</think> 格式 */
  candidates: {
    id: string;
    snippet: string;
    correct: boolean;
    formatted: boolean;
    finalAnswer: string;
  }[];
};

const PROBLEMS: Problem[] = [
  {
    id: "math-quad",
    title: "数学 · 一元二次",
    question: "解方程 x² − 5x + 6 = 0 的两根之和",
    correctSummary: "正确答案 = 5（由 Vieta 直接得）",
    candidates: [
      { id: "c1", snippet: "<think>因式分解 (x−2)(x−3)，根 = 2, 3，和 = 5。</think> 答案：5", correct: true, formatted: true, finalAnswer: "5" },
      { id: "c2", snippet: "<think>用求根公式：x = (5 ± 1)/2 = 3 或 2，和 5。</think> 答案：5", correct: true, formatted: true, finalAnswer: "5" },
      { id: "c3", snippet: "<think>Vieta 公式：两根和 = b/a = 5。</think> 答案：5", correct: true, formatted: true, finalAnswer: "5" },
      { id: "c4", snippet: "直接公式 −b/a = 5（漏了 think 标签）", correct: true, formatted: false, finalAnswer: "5" },
      { id: "c5", snippet: "<think>看花眼了把 −5x 写成 +5x，根 = −2, −3，和 −5。</think> 答案：−5", correct: false, formatted: true, finalAnswer: "−5" },
      { id: "c6", snippet: "<think>两根之积是 6，乘起来应是 5？</think> 答案：6", correct: false, formatted: true, finalAnswer: "6" },
    ],
  },
  {
    id: "code-xor",
    title: "代码 · 异或前缀",
    question: "给定数组 a，求最长子段使 XOR = 0",
    correctSummary: "正确答案 = 前缀异或扫一遍 + map 记最小下标，O(n)",
    candidates: [
      { id: "c1", snippet: "<think>暴力 O(n²)，但会 TLE。改前缀异或 p，相同 p 值对应 XOR=0。</think> ✓ AC", correct: true, formatted: true, finalAnswer: "AC · 1820 ms" },
      { id: "c2", snippet: "<think>前缀 p 扫一遍，map 记首次下标。注意把 p[0]=0 提前入 map。</think> ✓ AC", correct: true, formatted: true, finalAnswer: "AC · 1900 ms" },
      { id: "c3", snippet: "<think>暴力两层 for 枚举 (l, r)，再算 XOR。</think> ✗ TLE", correct: false, formatted: true, finalAnswer: "TLE" },
      { id: "c4", snippet: "前缀异或思路对，但代码没贴 think 标签", correct: true, formatted: false, finalAnswer: "AC · 没格式" },
      { id: "c5", snippet: "<think>排序后双指针。</think> ✗ WA", correct: false, formatted: true, finalAnswer: "WA" },
      { id: "c6", snippet: "<think>前缀异或，但忘了 p[0]，漏掉以 1 开头的段。</think> ✗ WA", correct: false, formatted: true, finalAnswer: "WA" },
    ],
  },
  {
    id: "logic-truth",
    title: "逻辑 · 三人真假",
    question: "甲乙丙三人，一个总说真话一个说假话一个随机，问怎么找出说真话的？",
    correctSummary: "正确答案 = 用嵌套自指问题（Smullyan 经典解）",
    candidates: [
      { id: "c1", snippet: "<think>问甲：'如果我问乙是不是说假话的，他会说是吗？' 用嵌套问把随机说话者隔离。</think> ✓", correct: true, formatted: true, finalAnswer: "嵌套自指法 · 正确" },
      { id: "c2", snippet: "<think>直接问'你说真话吗' —— 所有人都会说是。</think> ✗", correct: false, formatted: true, finalAnswer: "假阴性" },
      { id: "c3", snippet: "<think>Smullyan 嵌套问 + 用 'da/ja' 处理未知映射。</think> ✓", correct: true, formatted: true, finalAnswer: "正确 + 通用" },
      { id: "c4", snippet: "答 'random one will lie sometimes'，但没给方案", correct: false, formatted: false, finalAnswer: "无方案" },
      { id: "c5", snippet: "<think>挨个问 'is 2+2=4', 但随机者会随便答。</think> ✗", correct: false, formatted: true, finalAnswer: "区分不开" },
      { id: "c6", snippet: "<think>用嵌套问问甲乙之一是不是 random。</think> ✓", correct: true, formatted: true, finalAnswer: "正确 · 变种" },
    ],
  },
];

function reward(c: Problem["candidates"][number]) {
  return (c.correct ? 1 : 0) + (c.formatted ? 0.5 : 0);
}

const SectionGRPO: React.FC = () => {
  const [pid, setPid] = useState(PROBLEMS[0].id);
  const [G, setG] = useState<4 | 6 | 8>(6);
  const [revealed, setRevealed] = useState(false);

  const problem = PROBLEMS.find((p) => p.id === pid)!;
  const pool = problem.candidates.slice(0, G);

  const stats = useMemo(() => {
    const rewards = pool.map(reward);
    const mean = rewards.reduce((a, b) => a + b, 0) / rewards.length;
    const variance = rewards.reduce((a, r) => a + (r - mean) ** 2, 0) / rewards.length;
    const std = Math.sqrt(variance) || 1e-6;
    const advs = rewards.map((r) => (r - mean) / std);
    return { rewards, mean, std, advs };
  }, [pool]);

  const reset = () => setRevealed(false);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">GRPO · Group Relative Policy</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-9">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-lg text-ink leading-[1.1] mb-4">
              PPO 要一个 critic 给每步打分，
              <br className="hidden sm:block" />
              <span className="bg-teal/15 px-1.5">GRPO 让 G 个回答互相比。</span>
            </h2>
            <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[64ch]">
              同一道题让模型采样 G 条回答。每条按规则结算两笔奖励 —— 答对 +1、格式对 +0.5。
              然后把这 G 个 reward 减去均值除以标准差，得到每条的 advantage。正的就往那个方向推、负的就压。
              省掉一整个 value model，显存比 PPO 省一半。
            </p>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <div className="p-4 bg-pop/12 border-2 border-ink rounded-2xl shadow-stamp font-mono text-[11px] leading-relaxed text-ink/85">
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                公式
              </div>
              A<sub>i</sub> = (r<sub>i</sub> − mean(r)) / std(r)
              <br />
              r<sub>i</sub> = r<sub>acc</sub> + r<sub>fmt</sub> (+ r<sub>lang</sub>)
              <div className="mt-3 pt-3 border-t border-ink/15 text-[9.5px] text-ink/45">
                arXiv:2501.12948 §2.1 + DeepSeekMath
              </div>
            </div>
          </div>
        </div>

        {/* 控制条：题目切换 + group size */}
        <div className="card-stamp p-5 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-5">
            <div className="flex flex-wrap gap-2">
              {PROBLEMS.map((p) => {
                const on = p.id === pid;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPid(p.id);
                      setRevealed(false);
                    }}
                    className={[
                      "px-3.5 py-2 rounded-xl border-2 border-ink font-mono text-[11px] transition-all duration-200",
                      on
                        ? "bg-ink text-cream shadow-[3px_3px_0_0_#1B4B5A]"
                        : "bg-white text-ink/70 hover:bg-cream",
                    ].join(" ")}
                  >
                    {p.title}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 lg:ml-auto">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                group size G
              </span>
              <div className="flex items-center gap-1 p-0.5 bg-cream border-2 border-ink rounded-full">
                {([4, 6, 8] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setG(g);
                      setRevealed(false);
                    }}
                    className={[
                      "px-3 py-1 rounded-full font-mono text-[11px] font-bold transition-all duration-200",
                      G === g ? "bg-ink text-cream" : "text-ink/55 hover:text-ink",
                    ].join(" ")}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  if (revealed) reset();
                  else setRevealed(true);
                }}
                className="ml-2 inline-flex items-center gap-2 px-4 h-9 rounded-full border-2 border-ink bg-butter font-mono text-[10.5px] uppercase tracking-[0.15em] font-bold shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-250 ease-spring"
              >
                <Sigma className="w-3.5 h-3.5" strokeWidth={2.5} />
                {revealed ? "重置" : "算 advantage"}
              </button>
            </div>
          </div>

          <div className="p-3 bg-cream border-2 border-ink rounded-xl mb-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-1">
              user prompt
            </div>
            <div className="font-mono text-[12.5px] text-ink leading-relaxed">
              {problem.question}
            </div>
          </div>

          {/* G 个候选 */}
          <div className="grid md:grid-cols-2 gap-3">
            {pool.map((c, i) => {
              const r = stats.rewards[i];
              const adv = stats.advs[i];
              const push = revealed && adv > 0;
              const pull = revealed && adv < 0;
              return (
                <div
                  key={c.id}
                  className={[
                    "p-3.5 border-2 border-ink rounded-xl transition-all duration-300 ease-spring relative",
                    push ? "bg-teal/10 -translate-y-0.5 shadow-[5px_5px_0_0_#1B4B5A]" : "",
                    pull ? "bg-coral/10 translate-y-1 shadow-[2px_2px_0_0_#E07A5F]" : "",
                    !revealed ? "bg-white shadow-stamp" : "",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                      候选 #{i + 1}
                    </div>
                    <div className="flex gap-1">
                      <span
                        className={[
                          "font-mono text-[10px] px-1.5 py-0.5 rounded border",
                          c.correct
                            ? "bg-teal/15 text-teal border-teal/40"
                            : "bg-coral/15 text-coral border-coral/40",
                        ].join(" ")}
                      >
                        acc {c.correct ? "+1" : "+0"}
                      </span>
                      <span
                        className={[
                          "font-mono text-[10px] px-1.5 py-0.5 rounded border",
                          c.formatted
                            ? "bg-butter/40 text-ink border-ink/30"
                            : "bg-white text-ink/55 border-ink/20",
                        ].join(" ")}
                      >
                        fmt {c.formatted ? "+0.5" : "+0"}
                      </span>
                    </div>
                  </div>
                  <div className="font-mono text-[11.5px] text-ink/85 leading-relaxed mb-2 min-h-[3.5em]">
                    {c.snippet}
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10.5px]">
                    <div className="text-ink/55">
                      reward r = <span className="text-ink font-bold tabular-nums">{r.toFixed(2)}</span>
                    </div>
                    {revealed ? (
                      <div
                        className={[
                          "px-2 py-0.5 rounded-md font-bold tabular-nums",
                          adv > 0.3 ? "bg-teal text-cream" : adv < -0.3 ? "bg-coral text-cream" : "bg-ink/10 text-ink/65",
                        ].join(" ")}
                      >
                        A = {adv >= 0 ? "+" : ""}
                        {adv.toFixed(2)}
                      </div>
                    ) : (
                      <div className="text-ink/30 font-mono">A = ?</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 结果板 */}
          {revealed && (
            <div className="mt-5 grid md:grid-cols-4 gap-3 animate-enter-fade">
              <div className="p-3 bg-cream border-2 border-ink rounded-xl">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55">
                  group size
                </div>
                <div className="font-display text-[22px] font-bold text-ink leading-none mt-1 tabular-nums">
                  G = {G}
                </div>
              </div>
              <div className="p-3 bg-butter border-2 border-ink rounded-xl">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/65">
                  mean(r)
                </div>
                <div className="font-display text-[22px] font-bold text-ink leading-none mt-1 tabular-nums">
                  {stats.mean.toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-cream border-2 border-ink rounded-xl">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55">
                  std(r)
                </div>
                <div className="font-display text-[22px] font-bold text-ink leading-none mt-1 tabular-nums">
                  {stats.std.toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-teal/10 border-2 border-ink rounded-xl">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55">
                  正梯度推 / 负梯度压
                </div>
                <div className="font-display text-[20px] font-bold text-teal leading-none mt-1 tabular-nums">
                  ↑{stats.advs.filter((a) => a > 0).length} / ↓{stats.advs.filter((a) => a < 0).length}
                </div>
              </div>
            </div>
          )}

          <p className="mt-5 font-mono text-[10.5px] text-ink/55 leading-relaxed max-w-[68ch]">
            注意：实际 R1 训练里 G 通常取 64 左右，KL 惩罚还要乘一项 β·KL(π‖π<sub>ref</sub>)。这里简化到 G ≤ 8 + 省略 KL，方便用眼睛看明白对比逻辑。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionGRPO;
