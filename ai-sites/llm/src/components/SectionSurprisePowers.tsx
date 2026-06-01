/**
 * Section 04 · Surprise Powers · 4 个出人意料的本事
 *
 * 4 块上下纵向排列。反模板：连续 4 个交互不能都同款。
 *   04.1 给几个例子就照学   ContextLearningAnimation     · L3 (输入框 + 编辑示例)
 *   04.2 大到某个点突然会    EmergentAbilitiesAnimation  · L3 (slider + 曲线)
 *   04.3 一句话布置 N 件事   InlineMultiStep             · L2 (单步 trace)
 *   04.4 多步想清楚再说      ReasoningAnimation          · L2 (题型切换)
 *
 * 设计要点：
 *   - 不再嵌 tab 顶栏，子小节自带 anchor
 *   - 每块开头 1 句目的句，结尾 1 句过渡到下一块
 *   - 删 zero-shot / few-shot 等英文直出，保留 ICL 名字但用括号注
 */
import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import ContextLearningAnimation from "./Animations/ContextLearningAnimation";
import EmergentAbilitiesAnimation from "./Animations/EmergentAbilitiesAnimation";
import ReasoningAnimation from "./Animations/ReasoningAnimation";

const SectionSurprisePowers: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink">
      <div className="max-w-6xl mx-auto">
        {/* 段头 */}
        <div className="mb-12 max-w-3xl">
          <div className="section-anchor">
            <span className="section-anchor-num">04</span>
            <span className="section-anchor-label">出人意料的本事</span>
          </div>
          <h2 className="font-display text-display-lg text-ink mb-4">
            变够大之后，
            <br />
            它会冒出
            <span className="relative inline-block">
              <span className="relative z-10">这 4 个怪本事</span>
              <span
                className="absolute left-0 right-0 bottom-1 h-3.5 lg:h-5 bg-butter -z-0"
                aria-hidden
              />
            </span>
          </h2>
          <div className="space-y-3 font-sans text-[15px] text-ink/75 leading-relaxed">
            <p>
              没人专门教过它，但模型大到某个体量后，下面这四件事就开始能干。
              这是 LLM 跟以前那些"自动回复机器人"最不一样的地方。
            </p>
            <p>
              下面 4 块 —— 给几个例子就照学 / 突然冒新能力 / 一句话布置多件事 /
              多步算账想清楚 —— 你都可以亲手玩。
            </p>
          </div>
        </div>

        {/* 04.1 ICL */}
        <SubBlock
          num="04.1"
          label="上下文学习 · ICL"
          title="给它几个例子，它就照着学"
          intro={
            <>
              <p>
                不告诉它"这是什么任务"，只在对话里塞 3 行
                <span className="font-mono"> hot → cold / tall → short / happy → sad</span>{" "}
                这种例子，它就猜出"哎你是要我说反义词"，然后真的就开始说反义词。
              </p>
              <p>
                关键点：<strong className="text-ink">模型本身一个旋钮都没动</strong>，
                只是在那一次对话里"看了几个例子就会"。行话叫
                <span className="font-mono text-ink"> ICL（in-context learning）</span>。
                试试把示例都删掉看会怎样。
              </p>
            </>
          }
        >
          <ContextLearningAnimation />
        </SubBlock>

        {/* 04.2 涌现 */}
        <SubBlock
          num="04.2"
          label="涌现能力 · emergent abilities"
          title="变到某个体量，突然会做某件事"
          intro={
            <>
              <p>
                小模型在某些题目上完全是瞎猜（比如多位数加法）—— 给它的训练数据再多也学不会。
                但模型一旦超过某个体量，准确率会
                <strong className="text-ink"> 突然 </strong>
                从瞎猜跳到能做对。不是慢慢变好，是断点式的。
              </p>
              <p>
                拖下面的滑块（横轴 = 训练时烧的电，越往右越大）—— 看曲线在某个位置突然抬头。
              </p>
            </>
          }
        >
          <EmergentAbilitiesAnimation />
        </SubBlock>

        {/* 04.3 多步指令 */}
        <SubBlock
          num="04.3"
          label="多步指令 · 一次拆完"
          title="一句话能布置好几件事，它能拆开做完"
          intro={
            <>
              <p>
                你不用拆成 3 句话挨个问。一句"帮我做 A、B、C"
                它能自己拆成 3 件、按顺序一件件做完，最后给你一份成品。
              </p>
              <p>
                §02 看到的"会按指令做"是地基。它能力其实可以更深一档 ——
                看下面这道题怎么被一步步拆掉。
              </p>
            </>
          }
        >
          <MultiStepDemo />
        </SubBlock>

        {/* 04.4 推理 */}
        <SubBlock
          num="04.4"
          label="逐步推理 · 先打草稿"
          title="算账类的题目，先打草稿再说"
          intro={
            <>
              <p>
                直接问"小明买了 N 个苹果，给了几个，又买了几个，现在多少？" ——
                模型容易凭直觉跳着算然后算错。
              </p>
              <p>
                让它<strong className="text-ink">把每一步先写出来</strong>
                （行话叫
                <span className="font-mono text-ink"> Chain-of-Thought / 思维链</span>），
                正确率立刻翻几倍。2024 年开始的
                <span className="font-mono text-ink"> o1 / DeepSeek-R1 </span>
                之类的"推理模型"干脆把这步内化进了训练 —— 你不用提醒它，它自己会先想。
              </p>
            </>
          }
          last
        >
          <ReasoningAnimation />
        </SubBlock>

        {/* 过渡 */}
        <p className="mt-12 max-w-3xl font-serif italic text-[14px] text-ink/55 leading-relaxed">
          —— 这四样能力是怎么 6 年里一步步出现的？接下来快速过一遍 6 年关键转折。
        </p>
      </div>
    </section>
  );
};

/* ─── 子小节卡 ─── */

const SubBlock: React.FC<{
  num: string;
  label: string;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
  last?: boolean;
}> = ({ num, label, title, intro, children, last }) => {
  return (
    <div className={last ? "" : "mb-16 lg:mb-20"}>
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-[10.5px] font-bold tracking-[0.18em] text-ink bg-butter border-2 border-ink rounded-full px-2.5 py-0.5">
              {num}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              {label}
            </span>
          </div>
          <h3 className="font-display font-extrabold text-[22px] lg:text-[26px] text-ink leading-tight mb-4">
            {title}
          </h3>
          <div className="space-y-3 font-sans text-[14.5px] text-ink/75 leading-relaxed">
            {intro}
          </div>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </div>
  );
};

/* ─── 04.3 多步指令交互（单步 trace · L2）─── */

interface SubTask {
  thought: string;
  output: string;
}

const MULTI_STEP = {
  prompt:
    "帮我准备明天的北京 1 日游：列 3 个必去景点 + 每个加一句简介 + 估计交通时间。",
  steps: [
    {
      thought: "拆解任务",
      output:
        "好的。你这是 3 件事：\n  ① 选 3 个景点\n  ② 每个写 1 句简介\n  ③ 估计交通时间\n按顺序来。",
    },
    {
      thought: "① 选景点",
      output: "故宫 / 颐和园 / 八达岭长城。这三个是首次到北京最经典的组合。",
    },
    {
      thought: "② 一句话简介",
      output:
        "故宫：明清两代皇宫，建筑群完整。\n颐和园：清代皇家园林，环湖好走。\n八达岭长城：长城最易抵达的一段，台阶较陡。",
    },
    {
      thought: "③ 交通时间估计",
      output:
        "市区 → 故宫：地铁 1 号线 ~30 min。\n故宫 → 颐和园：地铁换乘 ~50 min。\n颐和园 → 八达岭：地铁 + 市郊铁路 S2 ~80 min。",
    },
    {
      thought: "汇总成型",
      output:
        "建议路线：上午故宫 → 中午颐和园午餐 → 下午八达岭。两段较长地铁建议查实时班次。",
    },
  ] as SubTask[],
};

const MultiStepDemo: React.FC = () => {
  const [cursor, setCursor] = useState(1); // 默认露出第 1 步
  const total = MULTI_STEP.steps.length;
  const finished = cursor >= total;

  return (
    <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
      {/* 卡顶 */}
      <div className="flex items-center justify-between px-5 lg:px-6 py-3.5 border-b-2 border-ink bg-white">
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-[15px] font-bold text-ink">
            一道多步指令 · 它怎么拆
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
            · 单步演示
          </span>
        </div>
        <span className="font-mono text-[10.5px] text-ink/45 tabular-nums">
          {cursor} / {total}
        </span>
      </div>

      {/* 用户那一句 */}
      <div className="px-5 lg:px-6 pt-5 pb-4 border-b border-ink/10">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-1.5">
          你说
        </div>
        <p className="font-sans text-[14.5px] text-ink leading-relaxed">
          {MULTI_STEP.prompt}
        </p>
      </div>

      {/* 步骤区 */}
      <div className="px-5 lg:px-6 py-5 space-y-3 min-h-[280px]">
        {MULTI_STEP.steps.slice(0, cursor).map((step, i) => {
          const isLatest = i === cursor - 1;
          return (
            <div
              key={i}
              className={[
                "flex items-start gap-3 transition-all duration-300",
                isLatest ? "animate-enter-up" : "",
              ].join(" ")}
            >
              <span
                className={[
                  "flex-shrink-0 w-7 h-7 rounded-full border-2 border-ink flex items-center justify-center font-mono font-bold text-[11px]",
                  isLatest ? "bg-butter text-ink" : "bg-white text-ink/70",
                ].join(" ")}
              >
                {i + 1}
              </span>
              <div
                className={[
                  "flex-1 bg-white border-2 border-ink rounded-xl p-3.5",
                  isLatest ? "shadow-stamp-lg" : "shadow-stamp",
                ].join(" ")}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral mb-1.5">
                  {step.thought}
                </div>
                <pre className="font-sans text-[13.5px] text-ink/85 leading-relaxed whitespace-pre-wrap break-words">
                  {step.output}
                </pre>
              </div>
            </div>
          );
        })}
        {!finished && (
          <div className="flex items-center gap-2 pl-10 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-pulse-dot" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/40">
              下一步 · 按 next
            </span>
          </div>
        )}
      </div>

      {/* 控制条 */}
      <div className="flex items-center justify-between px-5 lg:px-6 py-3.5 border-t-2 border-ink bg-white">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCursor(1)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
            aria-label="重置"
          >
            <RotateCcw className="w-4 h-4 text-ink" strokeWidth={2.4} />
          </button>
          <button
            onClick={() => setCursor((c) => Math.min(total, c + 1))}
            disabled={finished}
            className="px-4 h-9 flex items-center gap-1.5 rounded-full bg-ink text-cream border-2 border-ink shadow-stamp font-mono text-[11px] font-bold tracking-wider disabled:opacity-30 disabled:shadow-none transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
          >
            {finished ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.6} />
                完成
              </>
            ) : (
              <>
                NEXT
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.6} />
              </>
            )}
          </button>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
          {finished ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-teal" strokeWidth={2.5} />
              5 件事一次答完
            </>
          ) : (
            <>
              <Circle className="w-3.5 h-3.5" strokeWidth={2} />
              一步一步看
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default SectionSurprisePowers;
