/**
 * SectionFourScenarios · 拿 SubAgent 干什么
 *
 * 主交互（L2 chip 阵列筛选）：4 个场景 chip，点一个把详情卡换成对应场景
 *   - 代码库探索 / 代码审查 / 并行调研 / 调试排错
 *   - 每个场景卡：主 Agent 在干啥 + 子 Agent 干啥 + 它回来说啥
 *
 * 跟上一节（pill 切属性）拉开风格：这里 chip + 完整流程剧本，更像「用例库」
 */
import React, { useState } from "react";
import {
  Compass,
  ClipboardCheck,
  GitBranch,
  Bug,
  ArrowRight,
} from "lucide-react";

type ScenarioKey = "explore" | "review" | "parallel" | "debug";

const SCENARIOS: Record<
  ScenarioKey,
  {
    label: string;
    icon: React.ReactNode;
    tone: string;
    mainAsks: string;
    subDoes: string[];
    subReturns: string;
    whyFit: string;
  }
> = {
  explore: {
    label: "代码库探索",
    icon: <Compass className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-butter text-ink",
    mainAsks: "「改一下这个 calculate_tax 函数。」",
    subDoes: [
      "Grep 这个函数名，收集所有调用点",
      "读每个调用方上下文，分辨业务路径 vs 测试",
      "理出核心调用链",
    ],
    subReturns:
      "「这个函数被 12 处调用，其中 3 处是测试。核心路径：checkout → calculate_tax → invoice。注意 invoice 那条假设了返回 Decimal 类型。」",
    whyFit: "纯调研，结论几行。中间翻多少文件主 Agent 不关心。",
  },
  review: {
    label: "代码审查",
    icon: <ClipboardCheck className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-coral text-white",
    mainAsks: "「我刚写完 PR，帮我 review 一下。」",
    subDoes: [
      "Read 改动的所有文件",
      "Grep 项目里类似模式，看是否一致",
      "对照最佳实践给出问题清单",
    ],
    subReturns:
      "「找到 3 处可优化：(1) login.ts 第 42 行没处理空响应；(2) 用了 var，建议改 const；(3) 错误信息泄露了内部路径。」",
    whyFit: "review 子 Agent 只给 Read 权限，结构上就改不了你代码，比 prompt 提醒可靠。",
  },
  parallel: {
    label: "并行调研",
    icon: <GitBranch className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-teal text-white",
    mainAsks: "「在 Postgres、MongoDB、Supabase 里选一个，给方案。」",
    subDoes: [
      "派子 Agent A 查 Postgres 的优缺点 + 社区动态",
      "派子 Agent B 查 MongoDB 同样维度",
      "派子 Agent C 看现有代码跟三方案各自的兼容性",
    ],
    subReturns:
      "三份简报回主对话。主 Agent 综合 3 段摘要拍板，不用自己读完一手资料。",
    whyFit: "三路并行互不干扰，又省时间又省主对话空间。",
  },
  debug: {
    label: "调试排错",
    icon: <Bug className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-pop text-white",
    mainAsks: "「CI 上 test_login 又挂了，看下原因。」",
    subDoes: [
      "Read CI 日志、追错误栈",
      "Read 涉及的源代码定位行号",
      "复现并确认根因",
    ],
    subReturns:
      "「问题在 auth_middleware.py 第 47 行：没处理 token 过期返回 None，下游直接拿来取属性。修法：在 47 行加 if token is None 早退。」",
    whyFit: "翻日志最污染上下文，让子 Agent 去啃，主 Agent 收到一行可执行结论。",
  },
};

const ORDER: ScenarioKey[] = ["explore", "review", "parallel", "debug"];

const SectionFourScenarios: React.FC = () => {
  const [active, setActive] = useState<ScenarioKey>("explore");
  const s = SCENARIOS[active];

  return (
    <section className="relative bg-butter-tint border-t-2 border-ink px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Use · 拿来干什么</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          4 个最该派{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-coral/60 -z-0" />
            <span className="relative z-10">子 Agent</span>
          </span>{" "}
          的场景。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          共同点：
          <span className="font-bold text-ink"> 都是「翻很多东西，但结论就几行」</span>。
          点一个 chip，看主 Agent 怎么开口、子 Agent 怎么干、它回来说啥。
        </p>

        {/* chip 阵列 */}
        <div className="mt-10 flex flex-wrap gap-3">
          {ORDER.map((key) => {
            const item = SCENARIOS[key];
            const isActive = active === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => setActive(key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-ink font-sans text-[14px] font-bold transition-all duration-250 ease-spring ${
                  isActive
                    ? `${item.tone} shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]`
                    : "bg-cream text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 主剧本卡片 */}
        <div key={active} className="mt-10 animate-enter-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 主 Agent 问 */}
            <div className="lg:col-span-4">
              <div className="card-stamp p-6 h-full">
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-2">
                  主 Agent · 收到任务
                </div>
                <div className="font-display font-bold text-[18px] text-ink leading-snug">
                  {s.mainAsks}
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink text-cream font-mono text-[10px] tracking-[0.18em] uppercase rounded-full">
                  外包给 SubAgent <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* 子 Agent 在干 */}
            <div className="lg:col-span-5">
              <div className={`${s.tone} border-2 border-ink rounded-3xl shadow-stamp-lg p-6 h-full`}>
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase opacity-80 mb-3">
                  子 Agent · 独立空间里干这些
                </div>
                <ul className="space-y-2.5">
                  {s.subDoes.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cream border-2 border-ink font-mono text-[11px] font-bold text-ink flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="font-sans text-[14px] leading-[1.6]">{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase opacity-85">
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse-dot" />
                  这些过程全留在它自己空间里
                </div>
              </div>
            </div>

            {/* 摘要回到主对话 */}
            <div className="lg:col-span-3">
              <div className="bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 h-full">
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-cream/65 mb-2">
                  RETURN · 交回主对话
                </div>
                <p className="font-sans text-[13.5px] leading-[1.7]">
                  {s.subReturns}
                </p>
              </div>
            </div>
          </div>

          {/* 为啥适合 */}
          <div className="mt-6 border-2 border-dashed border-ink/40 rounded-3xl px-5 py-4 bg-cream/60">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                为什么适合外包
              </span>
              <p className="font-sans text-[14px] text-ink/85 flex-1">{s.whyFit}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFourScenarios;
