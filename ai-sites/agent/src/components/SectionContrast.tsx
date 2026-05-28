/**
 * Section 02 · 一个对话窗看清差异
 *
 * 设计：
 *   ─ 用户切换 3 个真实 prompt
 *   ─ 左右并排两个"对话窗"
 *   ─ 左：传统 LLM —— 一段文字攻略，停在"建议"
 *   ─ 右：Agent —— 一条一条的工具调用 + 真实结果 + 终态产出
 *   ─ 工具调用条目带 mono / butter chip，模仿真实 trace
 *
 * 不放任何"为什么 Agent 更牛"的总结性结论，让对比自己说话。
 */
import React, { useState } from "react";
import { Send, Sparkles, Hammer, CheckCircle2, FileText } from "lucide-react";

interface AgentStep {
  type: "thought" | "tool_call" | "tool_result" | "final";
  label?: string; // 工具名 / 节点名
  content: string;
}

interface Prompt {
  id: string;
  question: string;
  llmReply: string;
  llmNote: string;
  agentSteps: AgentStep[];
  agentFinal: string;
}

const PROMPTS: Prompt[] = [
  {
    id: "travel",
    question: "我下周三到周六去东京，预算 5000，帮我安排好行程。",
    llmReply: `这里给你一个东京 4 天的参考行程：

Day 1｜浅草寺 → 晴空塔 → 上野公园
Day 2｜迪士尼海洋（建议提前买票）
Day 3｜涩谷 / 原宿 / 表参道购物
Day 4｜筑地市场早餐 → 银座 → 机场

建议机票提前在国航 / 全日空官网查询，
住宿可以选新宿地区，地铁方便。`,
    llmNote: "LLM 只能给「建议」。它没法查航班、没法订酒店，更没法发邮件给你。",
    agentSteps: [
      {
        type: "thought",
        content: "用户给了时间窗口和预算。先查航班 → 再算住宿剩余预算 → 再排行程。",
      },
      {
        type: "tool_call",
        label: "skyscanner.search",
        content: 'origin="PEK", dest="NRT", date_out="2026-06-03", date_in="2026-06-06"',
      },
      {
        type: "tool_result",
        label: "skyscanner.search",
        content: "找到 12 个航班。最便宜：CA181 ¥1,840 往返，10:25 起飞。",
      },
      {
        type: "tool_call",
        label: "booking.search",
        content: 'city="Tokyo", checkin="2026-06-03", nights=3, budget=3160',
      },
      {
        type: "tool_result",
        label: "booking.search",
        content: "推荐：UNPLAN 新宿 ¥820/晚 × 3 = ¥2,460，地铁 8 分钟到涩谷。",
      },
      {
        type: "tool_call",
        label: "calendar.create",
        content: "events × 4 (Day 1–4 行程块)，提醒提前 1 小时",
      },
      {
        type: "tool_call",
        label: "email.draft",
        content: "to: 我自己 · 主题: 东京行程 · 附件: 航班+酒店+行程 PDF",
      },
    ],
    agentFinal:
      "全部就绪 ✔  航班 ¥1,840 / 酒店 ¥2,460 / 余 ¥700 留作交通和吃饭。日历已建好，确认邮件已发到你邮箱。需要我直接帮你下单航班吗？",
  },
  {
    id: "stock",
    question: "把 AAPL 最近 5 个交易日的股价做成图，发给我老板的邮箱。",
    llmReply: `好的，思路如下：
1. 用 yfinance 拉 AAPL 最近 5 天数据
2. 用 matplotlib 画一个折线图
3. 用 smtplib 把图作为附件发送

参考 Python 代码片段:
\`\`\`
import yfinance as yf
data = yf.download("AAPL", period="5d")
data.plot()
\`\`\`

如有需要可以进一步说明发送细节。`,
    llmNote: "LLM 只能给你「代码方案」，自己跑不起来 —— 也无法发邮件。",
    agentSteps: [
      {
        type: "tool_call",
        label: "python.exec",
        content: 'yf.download("AAPL", period="5d") → DataFrame[5×6]',
      },
      {
        type: "tool_result",
        label: "python.exec",
        content: "日期 05-19~05-23  开盘 / 收盘 / 最高 / 最低 已取得",
      },
      {
        type: "tool_call",
        label: "python.exec",
        content: "matplotlib 画 candlestick + 5d MA → /tmp/aapl.png",
      },
      {
        type: "tool_call",
        label: "contacts.lookup",
        content: 'query="老板"',
      },
      {
        type: "tool_result",
        label: "contacts.lookup",
        content: "找到 1 条：王总 wang@company.com（最近联系 3 天前）",
      },
      {
        type: "tool_call",
        label: "email.send",
        content: 'to="wang@company.com", subject="AAPL 5D Snapshot", attach="aapl.png"',
      },
    ],
    agentFinal:
      "已发送 ✔  AAPL 5 日图已作为附件投递至 wang@company.com。本周收盘 $214.27（+2.8%），需要我每日定时发一份吗？",
  },
  {
    id: "pr",
    question: "Review 一下 GitHub PR #4218 然后给出修改建议。",
    llmReply: `Code review 一般需要关注：
- 代码风格是否一致
- 函数命名是否清晰
- 是否有充分的测试
- 边界条件处理
- 性能问题

如果你把 diff 贴给我，我可以更具体地分析。`,
    llmNote: "LLM 看不到你的代码，也提交不了 review。",
    agentSteps: [
      {
        type: "tool_call",
        label: "github.get_pr",
        content: 'repo="acme/api", pr=4218',
      },
      {
        type: "tool_result",
        label: "github.get_pr",
        content: "PR #4218 «refactor: extract user service» · 8 files · +312 -187",
      },
      {
        type: "tool_call",
        label: "github.get_diff",
        content: "pr=4218 · 加载 8 个文件 diff",
      },
      {
        type: "thought",
        content:
          "扫描发现：services/user.py 新增 createUser 缺少 email 唯一性校验；tests 只覆盖了 happy path。",
      },
      {
        type: "tool_call",
        label: "github.post_review",
        content: "comments × 3, verdict=request_changes",
      },
      {
        type: "tool_result",
        label: "github.post_review",
        content: "Review 已提交 · 3 条 inline comment",
      },
    ],
    agentFinal:
      "已 review ✔  提了 3 条修改建议：(1) email 唯一性约束 (2) 新增 duplicate-email 测试 (3) DI 容器要注册 UserRepo。状态 → Changes Requested。",
  },
];

const SectionContrast: React.FC = () => {
  const [active, setActive] = useState(PROMPTS[0]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 lg:py-32 bg-white border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        {/* 段落 anchor */}
        <div className="section-anchor mb-4">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">the contrast</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          同一句话，两种回应。
        </h2>
        <p className="font-sans text-[17px] text-ink/65 max-w-2xl mb-10 leading-relaxed">
          要看清 Agent 到底"多了什么"，最快的方法是给它和一个普通 LLM
          完全相同的指令，然后看它们各自做了什么。
        </p>

        {/* Prompt 选择器 */}
        <div className="mb-8">
          <div className="eyebrow mb-3">pick a task</div>
          <div className="flex flex-wrap gap-3">
            {PROMPTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className={`group relative px-4 py-2.5 border-2 border-ink rounded-full font-sans text-[13px] font-semibold transition-all duration-250 ease-spring ${
                  active.id === p.id
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:bg-butter/40 shadow-[2px_2px_0_0_#241C15] hover:shadow-stamp"
                }`}
              >
                {p.question.length > 30
                  ? p.question.slice(0, 28) + "…"
                  : p.question}
              </button>
            ))}
          </div>
        </div>

        {/* 用户提问气泡 */}
        <div className="mb-8 flex justify-center">
          <div className="relative max-w-2xl w-full bg-butter border-2 border-ink rounded-3xl px-6 py-5 shadow-stamp">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 bg-ink text-cream rounded-full flex items-center justify-center font-display font-bold text-sm">
                你
              </div>
              <div className="flex-1 pt-1">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/60 mb-1.5">
                  user prompt
                </div>
                <div className="font-sans text-[15px] text-ink leading-relaxed">
                  {active.question}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 两栏对比 */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-7">
          {/* ─── LEFT · LLM ─── */}
          <ChatPanel
            title="传统 LLM"
            subtitle="generative · single shot"
            tone="muted"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 bg-cream border-2 border-ink rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-ink/70" />
              </div>
              <div className="flex-1">
                <pre className="font-sans text-[13.5px] text-ink/85 leading-relaxed whitespace-pre-wrap">
                  {active.llmReply}
                </pre>
              </div>
            </div>

            {/* 收尾注 */}
            <div className="mt-6 pt-4 border-t border-dashed border-ink/15">
              <div className="flex items-start gap-2">
                <span className="font-mono text-[10px] text-ink/40 mt-0.5">↳</span>
                <p className="font-sans text-[12px] text-ink/55 italic leading-relaxed">
                  {active.llmNote}
                </p>
              </div>
            </div>
          </ChatPanel>

          {/* ─── RIGHT · AGENT ─── */}
          <ChatPanel
            title="Agent"
            subtitle="reason · act · observe"
            tone="active"
          >
            <div className="space-y-2.5">
              {active.agentSteps.map((step, i) => (
                <StepRow key={`${active.id}-${i}`} step={step} index={i} />
              ))}
            </div>

            {/* 终态产出 */}
            <div className="mt-5 p-4 bg-butter/45 border-2 border-ink rounded-2xl">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-ink shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/65 mb-1">
                    final
                  </div>
                  <p className="font-sans text-[13.5px] text-ink leading-relaxed">
                    {active.agentFinal}
                  </p>
                </div>
              </div>
            </div>
          </ChatPanel>
        </div>

        {/* 隐藏式提示：差异在哪里 */}
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          <DiffChip text="LLM 只说，Agent 也做" />
          <DiffChip text="LLM 一锤子，Agent 分步" />
          <DiffChip text="LLM 凭直觉，Agent 看真实数据" />
        </div>
      </div>
    </section>
  );
};

/* ─── 子组件 ─── */

const ChatPanel: React.FC<{
  title: string;
  subtitle: string;
  tone: "muted" | "active";
  children: React.ReactNode;
}> = ({ title, subtitle, tone, children }) => {
  const isActive = tone === "active";
  return (
    <div
      className={`relative border-2 border-ink rounded-3xl overflow-hidden ${
        isActive ? "bg-white shadow-stamp-lg" : "bg-cream/60 shadow-stamp"
      }`}
    >
      {/* header bar */}
      <div
        className={`px-5 py-3 border-b-2 border-ink flex items-center justify-between ${
          isActive ? "bg-ink text-cream" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1">
            <span
              className={`w-2.5 h-2.5 rounded-full border ${
                isActive ? "bg-coral border-cream/40" : "bg-ink/25 border-ink/40"
              }`}
            />
            <span
              className={`w-2.5 h-2.5 rounded-full border ${
                isActive ? "bg-butter border-cream/40" : "bg-ink/25 border-ink/40"
              }`}
            />
            <span
              className={`w-2.5 h-2.5 rounded-full border ${
                isActive ? "bg-teal border-cream/40" : "bg-ink/25 border-ink/40"
              }`}
            />
          </div>
          <div className="font-display font-bold text-[15px]">{title}</div>
        </div>
        <div
          className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
            isActive ? "text-cream/70" : "text-ink/45"
          }`}
        >
          {subtitle}
        </div>
      </div>
      <div className="p-5 lg:p-6">{children}</div>
    </div>
  );
};

const StepRow: React.FC<{ step: AgentStep; index: number }> = ({
  step,
  index,
}) => {
  if (step.type === "thought") {
    return (
      <div
        className="flex items-start gap-3 px-3 py-2.5 bg-cream/70 rounded-xl border border-ink/10 animate-enter-fade"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <div className="font-mono text-[10px] text-ink/50 shrink-0 mt-0.5 tracking-wider">
          THINK
        </div>
        <p className="font-sans text-[12.5px] text-ink/75 italic leading-relaxed">
          {step.content}
        </p>
      </div>
    );
  }
  if (step.type === "tool_call") {
    return (
      <div
        className="flex items-start gap-3 px-3 py-2.5 bg-white rounded-xl border-2 border-ink/15 animate-enter-fade"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <div className="shrink-0 w-7 h-7 bg-coral border-2 border-ink rounded-md flex items-center justify-center">
          <Hammer className="w-3.5 h-3.5 text-ink" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[11px] font-bold text-ink mb-0.5">
            → {step.label}
          </div>
          <code className="block font-mono text-[11px] text-ink/65 break-words whitespace-pre-wrap leading-snug">
            {step.content}
          </code>
        </div>
      </div>
    );
  }
  if (step.type === "tool_result") {
    return (
      <div
        className="flex items-start gap-3 pl-10 pr-3 py-2 animate-enter-fade"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <div className="font-mono text-[10px] text-teal shrink-0 mt-0.5 tracking-wider">
          ←
        </div>
        <p className="font-sans text-[12px] text-ink/70 leading-relaxed">
          {step.content}
        </p>
      </div>
    );
  }
  return (
    <div className="px-3 py-2 bg-butter/40 rounded-xl flex items-start gap-2 animate-enter-fade">
      <FileText className="w-3.5 h-3.5 text-ink shrink-0 mt-1" />
      <p className="font-sans text-[13px] text-ink">{step.content}</p>
    </div>
  );
};

const DiffChip: React.FC<{ text: string }> = ({ text }) => (
  <div className="px-3.5 py-1.5 bg-white border border-ink/20 rounded-full font-mono text-[11px] text-ink/65 tracking-wide">
    {text}
  </div>
);

export default SectionContrast;
