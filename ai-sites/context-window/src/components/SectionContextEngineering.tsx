/**
 * SectionContextEngineering · 主动管理 context window 的工程实践
 *
 * 收尾节，不放新交互：
 *   - 一句话定义 Context Engineering
 *   - 4 条实操建议（卡片）
 *   - 末尾一句话提到长期记忆（带 /agent-memory 链接）
 *   - 收尾 callout：一条硬规则（不鸡汤）
 */
import React from "react";
import { Settings2, Wrench, FileText, Trash2, ExternalLink } from "lucide-react";

type Tip = {
  num: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  example: string;
};

const TIPS: Tip[] = [
  {
    num: "01",
    title: "system prompt 不要堆太多",
    body: "system 每次请求都常驻。堆了 5K 你就先输 5K，后面每段都要给它腾位置。把项目级规则放外部文件按需注入，比塞 system 干净。",
    icon: <Settings2 className="w-4 h-4" strokeWidth={2.4} />,
    example: "❌ 8K 的 system prompt（什么规则都列）  ·  ✅ 400 token 的核心 system + 用工具按需 read（项目规则文件）",
  },
  {
    num: "02",
    title: "工具定义按需加载",
    body: "20 个工具 schema 全塞进去 ≈ 6-10K tokens。先用一个 dispatcher 工具按场景返回相关工具的描述，再让 Agent 实际调用。",
    icon: <Wrench className="w-4 h-4" strokeWidth={2.4} />,
    example: "Claude Code 的「Skills」就是按需加载思路：用到才把那个 skill 的工具 / 描述 / 模板拼进 context。",
  },
  {
    num: "03",
    title: "长会话定期摘要 + 截断",
    body: "超过 40-50 轮就把前 N 轮整体摘成 300 token 一段，替换掉。摘要时机不要等到撑爆才做 —— 那时已经在退化区了，应该在 50-60% 占用就开始。",
    icon: <FileText className="w-4 h-4" strokeWidth={2.4} />,
    example: "Cursor / Claude Code 都内置了这个：超过阈值自动「Summarize chat」，保留关键决策、丢弃中间反复。",
  },
  {
    num: "04",
    title: "不再有用的工具结果就删掉",
    body: "Agent 跑完一步通常不再需要 5 分钟前 cat 出来的 1000 行代码。在下一轮 build context 时把旧的 tool_result 内容字段清空，只保留「tool 被调过」的记录。",
    icon: <Trash2 className="w-4 h-4" strokeWidth={2.4} />,
    example: "旧消息只留「调用过这个工具」的记录，不把当时返回的几千行结果再塞一遍。OpenAI Responses API、Anthropic 的 prompt caching 都在做这件事。",
  },
];

const SectionContextEngineering: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-24 lg:pb-32">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">Engineering · 主动管理</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          Context Engineering ——
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">主动管理每一次拼接</span>
          </span>
          。
        </h2>
        <p className="font-display font-bold text-[clamp(1.1rem,1.8vw,1.4rem)] leading-[1.55] mt-7 max-w-[800px] text-ink">
          一句话：
          <span className="relative inline-block ml-1">
            <span className="absolute inset-x-0 bottom-1 h-2.5 bg-butter -z-0" />
            <span className="relative z-10">每次喂给模型的 context，是工程师设计出来的，不是顺手攒出来的。</span>
          </span>
        </p>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          以前只管怎么提问（prompt engineering）；现在要管整段输入：
          system 写什么、tools 装几个、history 留多久、RAG 塞几条、哪段留、哪段删 ——
          整根 context 长条上的每一段都得自己定。这就是 Context Engineering。
        </p>

        {/* 4 条建议 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {TIPS.map((tip) => (
            <div
              key={tip.num}
              className="card-stamp p-6 lg:p-7 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 flex items-center justify-center rounded-full bg-ink text-cream border-2 border-ink">
                  {tip.icon}
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-ink/55">
                  TIP {tip.num}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-[19px] text-ink leading-tight">
                {tip.title}
              </h3>
              <p className="font-sans text-[14.5px] leading-[1.7] text-ink/85 mt-3 flex-1">
                {tip.body}
              </p>
              <div className="mt-4 pt-4 border-t-2 border-dashed border-ink/20">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/55 mb-1">
                  实际怎么落
                </div>
                <p className="font-mono text-[12px] text-ink/80 leading-[1.6]">
                  {tip.example}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 跨会话提示 → 长期记忆 */}
        <div className="mt-14 max-w-[860px] border-2 border-ink rounded-3xl bg-cream p-6 lg:p-7 shadow-stamp-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-coral text-cream flex items-center justify-center flex-shrink-0 border-2 border-ink">
              <ExternalLink className="w-5 h-5" strokeWidth={2.4} />
            </div>
            <div>
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-1">
                那 context 之外呢？
              </div>
              <h3 className="font-display font-extrabold text-[20px] text-ink leading-tight">
                跨会话保留信息 —— 那是
                <span className="relative inline-block ml-1.5">
                  <span className="absolute inset-x-0 bottom-1 h-2 bg-butter -z-0" />
                  <span className="relative z-10">长期记忆系统</span>
                </span>
                做的事
              </h3>
              <p className="font-sans text-[14.5px] leading-[1.7] text-ink/80 mt-3">
                这一站只讲 context window 本身 —— 它的解剖、撑爆症状、当前会话内的管理。
                关掉终端再开，怎么让 Agent 还记得「你这个项目用 PostgreSQL、部署在 us-east-1」 ——
                这是另一个话题，要把信息挪到 context 之外存起来。
              </p>
              <a
                href="../agent-memory/index.html"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-ink text-cream border-2 border-ink rounded-full font-mono text-[11.5px] font-bold tracking-[0.14em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                看 Agent Memory 那一站
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.4} />
              </a>
            </div>
          </div>
        </div>

        {/* 收尾 callout：一条硬规则 */}
        <div className="mt-16 max-w-[920px] mx-auto">
          <div className="border-4 border-double border-ink rounded-3xl bg-butter px-7 py-7 lg:px-10 lg:py-9 shadow-stamp-lg">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/65 mb-2">
              一条硬规则
            </div>
            <h3 className="font-display font-extrabold text-[clamp(1.4rem,2.4vw,1.85rem)] text-ink leading-[1.2]">
              不要把 context window 当背景资料库 ——
              <br />
              它是一段每秒都在重新拼的工作内存。
            </h3>
            <p className="font-sans text-[14.5px] leading-[1.75] text-ink/80 mt-4 max-w-[760px]">
              每一次请求都是从零拼一遍。装得下不等于记得清；记得清不等于挑得出。
              <span className="font-bold text-ink"> 把它当工程问题对待</span> ——
              知道每段是什么、加起来多少、警戒线在哪、撑爆了走哪条降级路径 ——
              Agent 就不会在聊久之后突然开始答非所问。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionContextEngineering;
