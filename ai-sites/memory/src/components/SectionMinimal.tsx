/**
 * SectionMinimal · 最小可用版本
 *
 * 主交互（L2 步进 trace）：
 *   - 三步走的最小实现：save_memory 工具 → 索引注入 → 定期清理
 *   - 每步显示具体代码 / 伪代码 + 注意点
 *   - 顶部 stepper 1-2-3 切换
 *
 * 收尾 callout 严守纪律：硬规则 / 反直觉事实 / 可执行建议（这里给一条硬规则）
 */
import React, { useState } from "react";
import { Wrench, FileSearch, Sparkles } from "lucide-react";

type Step = {
  num: string;
  title: string;
  oneliner: string;
  icon: React.ReactNode;
  code: string;
  note: string;
  example: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "给 Agent 一个写记忆的工具",
    oneliner: "定义 save_memory，让 Agent 在对话中遇到值得长期保存的信息时主动调用。存储介质用文件就行。",
    icon: <Wrench className="w-4 h-4" strokeWidth={2.4} />,
    code: `def save_memory(title: str, body: str, tags: list[str]):
    """Agent 调用：把一条值得记的事写到长期存储"""
    path = f"memory/{slugify(title)}.md"
    write_file(path, f"---\\ntags: {tags}\\n---\\n{body}")
    update_index({"title": title, "path": path, "tags": tags})

# 注册到 tools 里，Agent 看到"用户偏好暗色主题" / "项目用 PostgreSQL"
# 这种值得记的 fact，自己会调 save_memory(...)`,
    note: "工具描述写清楚「什么值得记」—— 跨对话有效的事实、用户偏好、项目配置。一次性的临时上下文不要记。",
    example: "Agent 看到「我们部署在 us-east-1」→ 自动 save_memory(title=「部署区域」, body=「AWS us-east-1」, tags=[「deploy」])",
  },
  {
    num: "02",
    title: "每轮对话开始时注入记忆索引",
    oneliner: "把已有记忆的标题和摘要列表塞进 system prompt。Agent 看到索引后，觉得相关就主动去读全文。",
    icon: <FileSearch className="w-4 h-4" strokeWidth={2.4} />,
    code: `def build_system_prompt(user_query: str) -> str:
    index = load_memory_index()
    summary_lines = [
        f"- {item.title} ({', '.join(item.tags)})"
        for item in index
    ]
    return f"""你是一个长期工作伙伴。已知记忆索引：
{chr(10).join(summary_lines)}

当索引里某条跟当前问题相关时，调 read_memory(path) 读全文。
不相关就别读。"""`,
    note: "Claude Code 的「MEMORY.md 索引 + 按需读取正文」就是这个模式。索引是低成本的，让 Agent 看到全貌；正文按需读，省 context。",
    example: "用户问「认证怎么做的？」→ Agent 看到索引里有「认证策略」 → 调 read_memory 读全文 → 引用回答",
  },
  {
    num: "03",
    title: "定期做清理和合并",
    oneliner: "重复条目合并，过时的标记过期。可以手动做，也可以写个脚本周期跑。",
    icon: <Sparkles className="w-4 h-4" strokeWidth={2.4} />,
    code: `# scripts/clean_memory.py · 每周 cron 跑一次
def clean_memory():
    items = load_all_memory()

    # 1. 用 embedding 找出语义相似条 → LLM 判断是否合并
    pairs = find_similar_pairs(items, threshold=0.85)
    for a, b in pairs:
        if llm_is_duplicate(a, b):
            merge(a, b)

    # 2. 找过期：上次被检索到 > 90 天 + LLM 判断「还有用吗」
    for item in items:
        if days_since_last_hit(item) > 90:
            if not llm_still_useful(item):
                soft_delete(item)`,
    note: "易踩坑：纯靠访问频率淘汰很危险 —— 有些知识一年用一次但用到时极其关键。三种信号组合（时间衰减 + 频率 + LLM 判断）。",
    example: "「用户喜欢简洁回答」+「用户偏好精简回复」→ 合并；「项目用 Python 3.9」（已升 3.12）→ 软删除。",
  },
];

const SectionMinimal: React.FC = () => {
  const [stepIdx, setStepIdx] = useState(0);
  const step = STEPS[stepIdx];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-24 lg:pb-32">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">Action · 动手起步</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          最小可用的记忆系统 ——
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">三步起步</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          不需要一上来就做成 Mem0 那种完整 pipeline。下面三步加起来，
          已经能让 Agent 从「每次失忆」变成「基本能记住重要的事」。
          向量检索、图谱推理、自动提取 —— 跑起来之后遇到具体瓶颈再加不迟。
        </p>

        {/* ─── 步骤切换 ─── */}
        <div className="mt-12">
          <div className="grid grid-cols-3 gap-3">
            {STEPS.map((s, i) => {
              const active = i === stepIdx;
              return (
                <button
                  type="button"
                  key={s.num}
                  onClick={() => setStepIdx(i)}
                  className={`text-left border-2 border-ink rounded-2xl p-4 transition-all duration-300 ease-spring ${
                    active
                      ? "bg-ink text-cream shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                      : "bg-white text-ink shadow-stamp"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`font-mono text-[10.5px] tracking-[0.18em] ${active ? "text-butter" : "text-ink/55"}`}>
                      STEP {s.num}
                    </span>
                    <span className={active ? "text-butter" : "text-ink"}>{s.icon}</span>
                  </div>
                  <div className="font-display font-extrabold text-[15px] leading-tight">
                    {s.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 当前步骤主体 ─── */}
        <div key={stepIdx} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-enter-up">
          {/* 左：定义 + 例子 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-7 h-full">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
                STEP {step.num} · 这一步要做的
              </div>
              <p className="font-sans text-[15.5px] leading-[1.7] text-ink mb-6">
                {step.oneliner}
              </p>

              <div className="pt-5 border-t-2 border-dashed border-ink/20">
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
                  注意点
                </div>
                <p className="font-serif italic text-[14px] leading-[1.65] text-ink/85">
                  {step.note}
                </p>
              </div>

              <div className="mt-5 pt-5 border-t-2 border-dashed border-ink/20">
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
                  实际场景
                </div>
                <p className="font-sans text-[13.5px] leading-[1.65] text-ink/80">
                  {step.example}
                </p>
              </div>
            </div>
          </div>

          {/* 右：代码 */}
          <div className="lg:col-span-7">
            <div className="bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
              <div className="px-5 py-3 border-b-2 border-cream/15 flex items-center justify-between">
                <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-cream/55">
                  代码示意 · python
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-pop" />
                  <span className="w-2.5 h-2.5 rounded-full bg-butter" />
                  <span className="w-2.5 h-2.5 rounded-full bg-teal" />
                </div>
              </div>
              <pre className="p-5 lg:p-6 font-mono text-[12.5px] leading-[1.75] overflow-x-auto">
                <code>{step.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* ─── 收尾 callout：一条硬规则 ─── */}
        <div className="mt-16 max-w-[920px] mx-auto">
          <div className="border-4 border-double border-ink rounded-3xl bg-butter px-7 py-7 lg:px-10 lg:py-9 shadow-stamp-lg">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/65 mb-2">
              一条硬规则
            </div>
            <h3 className="font-display font-extrabold text-[clamp(1.4rem,2.4vw,1.85rem)] text-ink leading-[1.2]">
              没有记忆，每次新开对话
              <br />
              都得从头介绍一遍项目。
            </h3>
            <p className="font-sans text-[14.5px] leading-[1.75] text-ink/80 mt-4 max-w-[720px]">
              做了 —— 它会随着使用越来越顺手。
              抓住三条线就够了：
              <span className="font-bold text-ink"> 记什么 </span>（情景 / 语义 / 程序）、
              <span className="font-bold text-ink"> 存哪儿 </span>（商业 API 用户全部空间在 token 级）、
              <span className="font-bold text-ink"> 怎么转 </span>（写入做提取去重，维护做合并遗忘，检索做改写混合）。
              其余的等遇到瓶颈再加。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionMinimal;
