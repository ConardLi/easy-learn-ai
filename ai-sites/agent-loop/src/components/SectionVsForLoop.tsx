/**
 * Section 08 · Agent Loop ≠ for 循环 + 多 Loop 结尾
 *
 * 初次接触的人最常问的问题。给一个左右对照的视觉答案。
 *
 * 末尾启发性 callout：单 Loop 不够时 → Magentic-One 双循环 / Claude Research 编排-工作者，
 * 但业界共识是「先用单循环把事办了，确实不够再加」。
 *
 * 视觉：cream + butter 底，静态对照为主（整站 L3+ 已经够 3 个，S8 走轻交互收尾）。
 */
import React from "react";
import { Code2, Bot, ArrowRight, Network, Workflow, Layers } from "lucide-react";

const SectionVsForLoop: React.FC = () => {
  return (
    <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="section-anchor">
          <span className="section-anchor-num">08</span>
          <span className="section-anchor-label">
            Diff · 跟 for 循环到底差在哪
          </span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[860px] leading-tight">
          有人会问：这跟我写个 for 循环调 API 有啥区别？
          <br />
          <span className="inline-block bg-butter px-2 -mx-2 -mb-1 pb-1">
            区别在控制权。
          </span>
        </h2>

        <p className="font-sans text-[16px] text-ink/75 max-w-[720px] mt-5 leading-relaxed">
          传统 for 循环里，每一步做什么是你的代码决定的。Agent Loop 里，每一步做什么是 LLM 在运行时决定的。
          <strong className="text-ink">区别在：步骤谁定 —— 你写死的，还是 AI 临场想的。</strong>
        </p>

        {/* 左右对照 */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
          {/* 左：传统 for 循环 */}
          <CompareCard
            tone="teal"
            badge="传统 for 循环"
            badgeEn="HARD-CODED LOOP"
            icon={Code2}
            code={`# 路径完全由你写死
for stock in stocks:
    price = get_price(stock)
    if price > threshold:
        notify(stock)
    else:
        log(stock)`}
            who="你的代码"
            whoDesc="逻辑全是 if-else，分支提前枚举"
            tag="可预测"
            tagDesc="同样输入永远同样输出"
          />

          {/* 右：Agent Loop */}
          <CompareCard
            tone="coral"
            badge="Agent Loop"
            badgeEn="RUNTIME DECISIONS"
            icon={Bot}
            code={`# 路径由 LLM 临场决策
while not done:
    response = call_llm(messages)
    if response.has_tool_calls:
        # 调哪个工具、传啥参数
        # —— LLM 想出来的
        results = run_tools(response)
        messages.append(results)
    else:
        done = True`}
            who="LLM 在运行时"
            whoDesc="每一步看当前上下文临场判断"
            tag="开放"
            tagDesc="不用提前枚举分支，能处理你没想过的情况"
          />
        </div>

        {/* 4 行对比表 */}
        <div className="mt-10 bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
          <div className="grid grid-cols-3 border-b-2 border-ink">
            <div className="p-4 bg-ink text-cream font-mono text-[10.5px] uppercase tracking-[0.22em]">
              对比项
            </div>
            <div className="p-4 border-l-2 border-ink bg-teal text-white">
              <div className="font-display font-bold text-[14px] leading-tight">
                传统 for 循环
              </div>
            </div>
            <div className="p-4 border-l-2 border-ink bg-coral text-white">
              <div className="font-display font-bold text-[14px] leading-tight">
                Agent Loop
              </div>
            </div>
          </div>
          <DiffRow
            label="谁决定每一步做什么"
            left="开发者（写死在代码里）"
            right="LLM（运行时推理）"
          />
          <DiffRow
            label="新情况怎么办"
            left="得改代码加 if 分支"
            right="模型自己适应，不用改代码"
          />
          <DiffRow
            label="可预测性"
            left="强 · 同输入恒同输出"
            right="弱 · 决策权交给概率模型"
          />
          <DiffRow
            label="出错代价"
            left="bug 你 debug"
            right="决策错了也是你买单"
          />
        </div>

        {/* 启发结尾：多 Loop 架构 */}
        <div className="mt-16 pt-14 border-t-2 border-dashed border-ink/25">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-coral mb-3">
            ── 想再进一步 ──
          </div>
          <h3 className="font-display font-extrabold text-[28px] md:text-[34px] text-ink max-w-[860px] leading-tight">
            一个循环不够用？业界已经在玩{" "}
            <span className="inline-block bg-coral text-white px-2 -mx-2 -mb-1 pb-1">
              多循环架构
            </span>{" "}
            了。
          </h3>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <OutroCard
              icon={Layers}
              badge="Magentic-One · Microsoft"
              title="双循环架构"
              body="外层循环做战略规划，内层循环做具体执行。内层卡住，外层可以推翻整个策略，从头来。"
            />
            <OutroCard
              icon={Network}
              badge="Claude Research · Anthropic"
              title="编排 - 工作者模式"
              body="一个主 Agent 做任务分配，多个子 Agent 并行执行不同子任务。Anthropic 某内部测试里多 Agent 明显更好，但 token 贵很多 —— 详见 sub-agent 专题。"
            />
          </div>

          <div className="mt-8 inline-flex items-start gap-3 max-w-full px-5 py-4 bg-ink text-cream rounded-2xl border-2 border-ink shadow-stamp">
            <Workflow
              className="w-5 h-5 mt-0.5 text-butter flex-shrink-0"
              strokeWidth={2.2}
            />
            <div>
              <div className="font-display font-bold text-[15px] text-cream mb-0.5">
                多数团队的做法
              </div>
              <p className="font-sans text-[13.5px] text-cream/80 leading-relaxed">
                Agent 越多，循环越多，token 消耗往上飙，协调复杂度也大幅增加。所以 ——
                <span className="text-butter font-bold">
                  先把单循环跑稳，真不够再加。
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 最末闭环小条 */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 pt-6 border-t-2 border-ink/20">
          <div className="font-sans text-[13.5px] text-ink/65 leading-relaxed">
            Agent Loop 讲完了。想继续可以看 sub-agent / agent-todo 等专题。
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-mono text-[12px] text-ink hover:text-coral transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5 -rotate-90" strokeWidth={2.5} />
            回到顶部 · 再看一遍
          </a>
        </div>
      </div>
    </section>
  );
};

/* ────── 子件 ────── */

const CompareCard: React.FC<{
  tone: "teal" | "coral";
  badge: string;
  badgeEn: string;
  icon: React.ElementType;
  code: string;
  who: string;
  whoDesc: string;
  tag: string;
  tagDesc: string;
}> = ({ tone, badge, badgeEn, icon: Icon, code, who, whoDesc, tag, tagDesc }) => {
  const toneClasses = {
    teal: { bg: "bg-teal", text: "text-white", soft: "bg-teal/8" },
    coral: { bg: "bg-coral", text: "text-white", soft: "bg-coral/8" },
  };
  const t = toneClasses[tone];

  return (
    <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp overflow-hidden flex flex-col">
      {/* badge bar */}
      <div className={`flex items-center gap-3 px-5 py-3 ${t.bg} border-b-2 border-ink`}>
        <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-white border-2 border-ink flex items-center justify-center">
          <Icon className="w-4 h-4 text-ink" strokeWidth={2.2} />
        </span>
        <div className="flex-1">
          <div className={`font-display font-extrabold text-[15px] leading-tight ${t.text}`}>
            {badge}
          </div>
          <div className={`font-mono text-[10px] uppercase tracking-[0.22em] ${t.text} opacity-70`}>
            {badgeEn}
          </div>
        </div>
      </div>

      {/* code */}
      <pre className="bg-ink text-cream font-mono text-[12.5px] leading-[1.75] p-5 lg:p-6 overflow-x-auto flex-1">
        <code>{code}</code>
      </pre>

      {/* footer 信息 */}
      <div className={`px-5 py-4 ${t.soft} border-t-2 border-ink/12 grid grid-cols-2 gap-3`}>
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-wider text-ink/55 mb-0.5">
            决策权在
          </div>
          <div className="font-sans font-bold text-[13px] text-ink leading-tight">
            {who}
          </div>
          <div className="font-mono text-[10px] text-ink/55 mt-0.5">
            {whoDesc}
          </div>
        </div>
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-wider text-ink/55 mb-0.5">
            性质
          </div>
          <div className="font-sans font-bold text-[13px] text-ink leading-tight">
            {tag}
          </div>
          <div className="font-mono text-[10px] text-ink/55 mt-0.5">
            {tagDesc}
          </div>
        </div>
      </div>
    </div>
  );
};

const DiffRow: React.FC<{
  label: string;
  left: string;
  right: string;
}> = ({ label, left, right }) => (
  <div className="grid grid-cols-3 border-t-2 border-ink/12 group/row hover:bg-cream/40 transition-colors">
    <div className="p-4 font-sans font-bold text-[13px] text-ink/85 border-r-2 border-ink/12">
      {label}
    </div>
    <div className="p-4 border-l-2 border-ink/12 font-sans text-[13.5px] text-ink leading-relaxed">
      {left}
    </div>
    <div className="p-4 border-l-2 border-ink/12 font-sans text-[13.5px] text-ink leading-relaxed">
      {right}
    </div>
  </div>
);

const OutroCard: React.FC<{
  icon: React.ElementType;
  badge: string;
  title: string;
  body: string;
  highlight?: string;
}> = ({ icon: Icon, badge, title, body, highlight }) => (
  <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp p-5 lg:p-6 group/o hover:-translate-x-1 hover:-translate-y-1 hover:shadow-stamp-lg transition-all duration-300 ease-spring">
    <div className="flex items-start justify-between mb-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-coral font-bold">
        {badge}
      </div>
      <Icon className="w-5 h-5 text-ink/55" strokeWidth={2} />
    </div>
    <h4 className="font-display font-extrabold text-[20px] text-ink leading-tight mb-2">
      {title}
    </h4>
    <p className="font-sans text-[13.5px] text-ink/75 leading-[1.75]">
      {body}
    </p>
    {highlight && (
      <div className="mt-4 inline-flex items-baseline gap-1 px-3 py-1 bg-butter rounded-full border-2 border-ink">
        <span className="font-display font-extrabold text-[16px] text-ink leading-none">
          {highlight}
        </span>
        <span className="font-mono text-[10px] text-ink/65">vs 单 Agent</span>
      </div>
    )}
  </div>
);

export default SectionVsForLoop;
