/**
 * SectionWhenToUse · 何时该用 + Fork 进阶 + 收尾硬规则
 *
 * 主交互（L2 勾选清单）：6 条判断题，用户在脑子里打钩
 *   - 4 条「用」+ 2 条「别用」
 *   - 点击任一条切换 ✓ / ✗ 视觉，让用户「真的过一遍」
 *
 * 然后引出 Fork（进阶：继承上下文，隔离过程）
 * 最后一条硬规则收尾，不是鸡汤
 */
import React, { useState } from "react";
import { Check, X, GitFork } from "lucide-react";

type Rule = {
  key: string;
  text: string;
  verdict: "use" | "skip";
  why: string;
};

const RULES: Rule[] = [
  {
    key: "many-for-few",
    text: "子任务需要翻很多东西，但最终结论就几行。",
    verdict: "use",
    why: "外包后主对话只多一段摘要，干净。",
  },
  {
    key: "no-followup-value",
    text: "中间过程后面对话用不上。",
    verdict: "use",
    why: "扔到子 Agent 空间里随它折腾，不污染主对话。",
  },
  {
    key: "ctx-long",
    text: "上下文已经很长，回答质量开始滑坡。",
    verdict: "use",
    why: "再叠翻找就崩了 —— 这是 SubAgent 救场的最典型情况。",
  },
  {
    key: "diff-perm",
    text: "子任务需要跟主任务不同的权限（比如只读审查）。",
    verdict: "use",
    why: "权限隔离从结构上做，比 prompt 提醒可靠。",
  },
  {
    key: "one-step",
    text: "任务简单到一步就能做完。",
    verdict: "skip",
    why: "派子 Agent 的开销比任务本身还大，直接干。",
  },
  {
    key: "process-matters",
    text: "中间过程本身对后续决策很关键。",
    verdict: "skip",
    why: "你需要主对话看到过程。这时候别外包，过程得留在主聊天里。",
  },
];

const SectionWhenToUse: React.FC = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (k: string) => {
    setChecked((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const useCount = RULES.filter((r) => r.verdict === "use" && checked[r.key]).length;
  const skipCount = RULES.filter((r) => r.verdict === "skip" && checked[r.key]).length;

  return (
    <section className="relative bg-ink text-cream border-t-2 border-ink px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-28">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num" style={{ background: "#F4D35E" }}>
            08
          </span>
          <span className="section-anchor-label" style={{ color: "#FBEFE3", opacity: 0.7 }}>
            Decide · 该不该派
          </span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg leading-[1.1] max-w-[820px] text-cream">
          一个快速{" "}
          <span className="relative inline-block bg-butter text-ink rounded-md px-3 py-0.5 mx-1 shadow-stamp -rotate-[1.5deg]">
            判断清单
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-cream/80 mt-6 max-w-[760px]">
          下次卡在「这事到底要不要派子 Agent」时，看这 6 条。
          <span className="font-bold text-cream">
            {" "}
            点一下每条勾上（或叉掉），脑子里走一遍
          </span>
          。
        </p>

        {/* 清单 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {RULES.map((r) => {
            const on = !!checked[r.key];
            const isUse = r.verdict === "use";
            return (
              <button
                type="button"
                key={r.key}
                onClick={() => toggle(r.key)}
                className={`text-left border-2 rounded-2xl p-4 transition-all duration-250 ease-spring ${
                  on
                    ? isUse
                      ? "bg-butter text-ink border-butter shadow-stamp-lg"
                      : "bg-coral text-white border-coral shadow-stamp-lg"
                    : "bg-ink text-cream border-cream/30 hover:border-cream/60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                      on
                        ? isUse
                          ? "bg-ink text-cream border-ink"
                          : "bg-white text-coral border-white"
                        : "bg-cream/10 text-cream/60 border-cream/40"
                    }`}
                  >
                    {on ? (
                      isUse ? (
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      ) : (
                        <X className="w-3.5 h-3.5" strokeWidth={3} />
                      )
                    ) : (
                      <span className="font-mono text-[10px]">·</span>
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="font-display font-bold text-[15.5px] leading-snug">
                      {r.text}
                    </div>
                    <div
                      className={`font-mono text-[11px] tracking-[0.18em] uppercase mt-1.5 ${
                        on ? "opacity-75" : "text-cream/45"
                      }`}
                    >
                      {isUse ? "→ 用 SubAgent" : "→ 别派，直接干"}
                    </div>
                    {on && (
                      <p
                        className={`font-sans text-[12.5px] leading-[1.6] mt-2 ${
                          isUse ? "text-ink/80" : "text-white/85"
                        }`}
                      >
                        {r.why}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 进度小计 */}
        <div className="mt-6 inline-flex items-center gap-4 px-4 py-2 bg-cream/10 border border-cream/25 rounded-full font-mono text-[11px] tracking-[0.18em] uppercase text-cream/75">
          <span>勾了 {useCount}/4 「该用」</span>
          <span className="w-1 h-1 rounded-full bg-cream/40" />
          <span>勾了 {skipCount}/2 「别用」</span>
        </div>

        {/* Fork 进阶 */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div className="bg-cream text-ink border-2 border-cream rounded-3xl shadow-stamp-lg p-7">
              <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-2">
                <GitFork className="w-3.5 h-3.5" strokeWidth={2.4} />
                进阶 · Fork
              </div>
              <h3 className="font-display font-extrabold text-[26px] text-ink leading-[1.15] mb-3">
                继承上下文，隔离后续过程。
              </h3>
              <p className="font-sans text-[14.5px] leading-[1.7] text-ink/80 mb-3 px-3 py-2.5 bg-butter-tint border border-dashed border-ink/30 rounded-xl">
                <span className="font-bold text-ink">一句话先说清 Fork：</span>
                需要子 Agent 记得你们刚聊的方案时，用 Fork
                —— Claude Code 里的术语，意思是「带着当前聊天记录开子任务」。
                平时派子 Agent 从空白开始就行。
              </p>
              <p className="font-sans text-[15px] leading-[1.75] text-ink/85">
                前面聊的子 Agent 都从空白起步。但有种情况 ——
                <span className="font-bold text-ink"> 子任务需要知道前面聊了什么</span>。
                比如你们刚讨论完技术方案，你说「基于刚才定的方案去写单元测试」。
                空白起步的子 Agent 压根不知道「方案」指什么。
              </p>
              <p className="font-sans text-[14px] leading-[1.75] text-ink/75 mt-3">
                这时候 Fork 就把主 Agent 当前的聊天记录复制一份给子 Agent 当起点，
                再追加新任务。子 Agent 拿到了所有讨论历史，继续干活；做完照样只返回精炼结果。
              </p>
              <p className="font-mono text-[11.5px] tracking-[0.16em] uppercase text-ink/55 mt-4">
                大多数场景空白起步够用。Fork 是确实依赖讨论上下文时再上。
              </p>
            </div>
          </div>

          {/* 收尾硬规则 */}
          <div className="lg:col-span-5">
            <div className="bg-butter text-ink border-2 border-butter rounded-3xl shadow-stamp-lg p-7 h-full flex flex-col">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/65 mb-2">
                Rule of Thumb · 一条硬规则
              </div>
              <p className="font-display font-extrabold text-[24px] leading-[1.2] text-ink">
                派子 Agent 之前先想清楚：
                <br />
                <span className="text-coral">它最多能带回来几行字？</span>
              </p>
              <p className="font-sans text-[14px] leading-[1.7] text-ink/85 mt-4">
                答不上来 / 觉得「得带回很多内容」 ——
                <span className="font-bold text-ink"> 这个任务就不适合外包</span>。
                让主 Agent 自己干，或者把任务再切小。
              </p>
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink/55 mt-auto pt-5">
                — 摘要带不回来的活，外包白外包。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWhenToUse;
