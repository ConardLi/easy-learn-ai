/**
 * SectionContextRot · 不用 SubAgent 时的「上下文腐化」现场
 *
 * 主交互（L3 slider）：调主对话的「翻找轮数」
 *   - 0 轮  : 主对话只有 1 句问 / 1 句答，干净
 *   - 3-6 轮: AI 折腾读 pyproject、翻 requirements、搜目录、跑命令
 *   - 9+ 轮 : 主对话堆满了中间过程，开始走神
 *
 * 视觉：
 *   - 顶部 slider，左侧是当前一段对话气泡（噪声占比可视化），
 *     右侧是「下一题答得怎么样」的反应卡片
 *   - 噪声占比 bar：useful vs noise 两段
 *
 * 跟相邻 SectionHero（静态视觉锚）拉开 —— 这里是可调输入 + 实时反馈。
 */
import React, { useState } from "react";
import { User, Bot, Wrench, AlertTriangle } from "lucide-react";

type Bubble = {
  who: "user" | "agent" | "tool";
  text: string;
};

const baseDialog: Bubble[] = [
  { who: "user", text: "这项目用的啥测试框架？" },
];

const exploreSteps: Bubble[] = [
  { who: "tool", text: "Read · pyproject.toml" },
  { who: "tool", text: "Read · requirements.txt" },
  { who: "tool", text: "Glob · **/test_*.py" },
  { who: "tool", text: "Bash · pytest --version" },
  { who: "agent", text: "我先看一下依赖文件⋯⋯" },
  { who: "agent", text: "看到 pytest 在 dev-deps 里⋯⋯" },
  { who: "tool", text: "Read · conftest.py" },
  { who: "tool", text: "Grep · 'pytest' src/" },
  { who: "agent", text: "确认是 pytest，版本 8.x。" },
];

/** 主对话噪声占比模拟（轮数 → 噪声百分比） */
function noiseRatio(rounds: number): number {
  if (rounds <= 1) return 5;
  return Math.min(82, Math.round(8 + Math.pow(rounds, 1.35) * 6));
}

/** 下一题答得怎么样（按噪声分级） */
function followUpQuality(noise: number) {
  if (noise < 25)
    return {
      tone: "bg-butter text-ink",
      label: "干脆",
      detail: "「直接用 pytest，写一个 test_login.py 就行。」",
      footnote: "—— 主 Agent 状态新鲜，抓得住重点。",
    };
  if (noise < 55)
    return {
      tone: "bg-cream text-ink",
      label: "有点啰嗦",
      detail:
        "「考虑到我们之前看到的 pyproject.toml，我建议在⋯⋯也许参考 conftest.py⋯⋯」",
      footnote: "—— 开始把刚才的中间过程也带进答案里。",
    };
  return {
    tone: "bg-coral text-white",
    label: "走神",
    detail: "「先确认一下版本，我刚才好像看到的是⋯⋯让我再读一次 pyproject⋯⋯」",
    footnote: "—— 在已经知道答案的前提下，又开始翻文件。这就是腐化。",
  };
}

const SectionContextRot: React.FC = () => {
  const [rounds, setRounds] = useState(5);
  const noise = noiseRatio(rounds);
  const visibleExplore = exploreSteps.slice(0, Math.min(exploreSteps.length, rounds));
  const followUp = followUpQuality(noise);

  return (
    <section className="relative bg-butter-tint border-t-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Why · 不用 SubAgent 会咋样</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          上下文腐化{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-coral/60 -z-0" />
            <span className="relative z-10">长什么样</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          每一次让 AI 翻文件、跑命令，结果全堆在主对话里。
          <span className="font-bold text-ink"> 拉一下滑条，看主对话一点点变脏 </span>
          —— 然后看你紧接着问下一题，它答得有多走神。
        </p>

        {/* slider */}
        <div className="mt-10 card-stamp p-6 lg:p-7">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                翻找轮数 · 主 Agent 在主对话里翻了几次
              </div>
              <div className="font-display font-extrabold text-[28px] text-ink leading-tight mt-1">
                {rounds} 轮翻箱倒柜
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                噪声占比
              </div>
              <div className="font-display font-extrabold text-[28px] text-coral leading-tight mt-1">
                {noise}%
              </div>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={9}
            step={1}
            value={rounds}
            onChange={(e) => setRounds(Number(e.target.value))}
            className="w-full accent-coral"
          />

          {/* 噪声 bar */}
          <div className="mt-4 h-3 w-full border-2 border-ink rounded-full overflow-hidden flex">
            <div
              className="bg-butter h-full transition-all duration-300"
              style={{ width: `${100 - noise}%` }}
            />
            <div
              className="bg-coral h-full transition-all duration-300"
              style={{ width: `${noise}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55">
            <span>有用信号</span>
            <span>翻找噪声</span>
          </div>
        </div>

        {/* 主对话气泡 + 下一题反馈 */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左：主对话内容 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-6">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-3">
                MAIN CONVERSATION · 主对话窗口
              </div>
              <p className="font-sans text-[12.5px] leading-[1.65] text-ink/65 mb-3 px-3 py-2 bg-butter-tint border border-dashed border-ink/30 rounded-lg">
                <span className="font-bold text-ink">先看怎么读这张图：</span>
                下面三种气泡 —— USER 是你打的字、AGENT 是 AI 给你看的回复，
                <span className="font-bold text-ink">灰色 TOOL 行</span>{" "}
                ＝ AI 没打字给你看，而是在后台读文件 / 跑命令。这些行最容易把主对话塞满。
              </p>
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {baseDialog.map((b, i) => (
                  <BubbleRow key={`base-${i}`} bubble={b} dim={false} />
                ))}
                {visibleExplore.map((b, i) => (
                  <BubbleRow key={`exp-${i}`} bubble={b} dim={true} />
                ))}
                {rounds > 0 && (
                  <div className="pt-2 mt-2 border-t-2 border-dashed border-ink/25">
                    <BubbleRow
                      bubble={{ who: "agent", text: "答：用的是 pytest。" }}
                      dim={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右：下一题反馈 */}
          <div className="lg:col-span-5">
            <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 h-full">
              <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-3">
                <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2.4} />
                你紧接着问下一题
              </div>
              <div className="font-display font-bold text-[16px] text-ink leading-snug mb-3">
                「帮我加个登录功能的单元测试。」
              </div>

              <div
                key={followUp.label}
                className={`${followUp.tone} border-2 border-ink rounded-2xl px-4 py-3.5 shadow-stamp animate-enter-up`}
              >
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-80 mb-1.5">
                  AI 的回答 · {followUp.label}
                </div>
                <p className="font-sans text-[14px] leading-[1.7]">
                  {followUp.detail}
                </p>
              </div>
              <p className="font-mono text-[11px] text-ink/55 mt-3 leading-relaxed">
                {followUp.footnote}
              </p>

              <div className="mt-5 pt-4 border-t-2 border-dashed border-ink/25">
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-1.5">
                  治本的办法
                </div>
                <p className="font-sans text-[13.5px] leading-[1.65] text-ink/80">
                  把那 {Math.max(1, rounds)} 步翻找扔给一个 SubAgent，让它回主对话时
                  <span className="font-bold text-ink"> 只交一句结论 </span>
                  —— 主对话永远停在 5% 噪声。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BubbleRow: React.FC<{ bubble: Bubble; dim: boolean }> = ({ bubble, dim }) => {
  const icon =
    bubble.who === "user" ? (
      <User className="w-3.5 h-3.5" strokeWidth={2.4} />
    ) : bubble.who === "agent" ? (
      <Bot className="w-3.5 h-3.5" strokeWidth={2.4} />
    ) : (
      <Wrench className="w-3.5 h-3.5" strokeWidth={2.4} />
    );
  const label =
    bubble.who === "user" ? "USER" : bubble.who === "agent" ? "AGENT" : "TOOL";
  const tone =
    bubble.who === "user"
      ? "bg-ink text-cream"
      : bubble.who === "agent"
      ? "bg-cream border-2 border-ink text-ink"
      : "bg-butter-tint border-2 border-dashed border-ink/40 text-ink/65";

  return (
    <div className={`flex items-start gap-2.5 ${dim ? "opacity-75" : ""}`}>
      <div
        className={`flex-shrink-0 mt-0.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9.5px] tracking-[0.18em] uppercase ${
          bubble.who === "user"
            ? "bg-ink text-cream"
            : bubble.who === "agent"
            ? "bg-butter border border-ink text-ink"
            : "bg-cream border border-ink/40 text-ink/65"
        }`}
      >
        {icon}
        {label}
      </div>
      <div
        className={`flex-1 px-3 py-1.5 rounded-xl font-mono text-[12px] leading-[1.55] ${tone}`}
      >
        {bubble.text}
      </div>
    </div>
  );
};

export default SectionContextRot;
