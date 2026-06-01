/**
 * SectionLifecycle · 一条记忆的一生
 *
 * 主交互（L2 trace + L1 hover 联动）：
 *   - 顶部 3 阶段（写入 / 维护 / 检索）next/prev
 *   - 每阶段右侧展开具体策略 chips，hover 看每条策略的「优 / 缺 / 例」
 *   - 中间用 SVG 流程线串起来
 *
 * 跟相邻 SectionWhereStored（accordion + 勾选）拉开。
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, FilePlus, Wrench, Search } from "lucide-react";

type Stage = {
  id: string;
  num: string;
  label: string;
  en: string;
  icon: React.ReactNode;
  tone: string;
  oneliner: string;
  strategies: {
    name: string;
    pro: string;
    con: string;
    example: string;
  }[];
  takeaway: string;
};

const STAGES: Stage[] = [
  {
    id: "write",
    num: "01",
    label: "写入",
    en: "Write",
    icon: <FilePlus className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-butter text-ink",
    oneliner: "决定记忆质量上限。记进去的东西烂，后面怎么搜都没用。",
    strategies: [
      {
        name: "摘要式",
        pro: "保留上下文 + 跨段语义",
        con: "增量式更新久了语义漂移；分段式可能丢跨段信息",
        example: "把 30 轮对话压缩成 200 字 running summary",
      },
      {
        name: "提取式",
        pro: "精准、离散、好查",
        con: "可能遗漏 / 提取错；要靠 LLM 判断「这条值不值得记」",
        example: "Mem0 流程：对话 → LLM 提取 → 「用户偏好暗色主题」入库",
      },
      {
        name: "结构化",
        pro: "表达力强，能记关系",
        con: "schema 设计约束后续灵活性",
        example: "Zep 时序知识图谱、A-Mem 双向链接笔记网络",
      },
    ],
    takeaway: "实用建议：事实类用提取式，对话上下文用摘要式，组合起来覆盖大多数需求。",
  },
  {
    id: "maintain",
    num: "02",
    label: "维护",
    en: "Maintain",
    icon: <Wrench className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-coral text-white",
    oneliner: "记忆不是写进去就完事。重复要合并、过期要更新、低价值要清掉。",
    strategies: [
      {
        name: "合并",
        pro: "去重，省 prompt 空间",
        con: "判断「是否同一件事」需要 embedding + LLM 校验",
        example: "「喜欢简洁回答」+「偏好精简回复」→ 合成一条",
      },
      {
        name: "更新",
        pro: "保持记忆跟现实同步",
        con: "老条目要不要直接删，还是软删 + 时间戳？",
        example: "用户说「我们从 PostgreSQL 迁到 MySQL」→ 旧条目软删除",
      },
      {
        name: "遗忘",
        pro: "腾位置 + 降低噪声",
        con: "纯靠访问频率淘汰很危险，频率 ≠ 重要性",
        example: "三种信号组合：时间衰减 + 访问频率 + LLM 判重要性",
      },
    ],
    takeaway: "易踩坑：有些知识一年用一次，但用到时极其关键。别让「没人查过」的条目就被删。",
  },
  {
    id: "retrieve",
    num: "03",
    label: "检索",
    en: "Retrieve",
    icon: <Search className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-teal text-white",
    oneliner: "不是每次都查；查的话也别只靠 embedding。三个杠杆决定召回质量。",
    strategies: [
      {
        name: "时机控制",
        pro: "不该查时不查，省钱省延迟",
        con: "判错就失忆 / 答非所问",
        example: "fast-slow：先不查直接答，置信度低再去翻记忆",
      },
      {
        name: "查询改写 (HyDE)",
        pro: "解决疑问句 vs 陈述句 embedding 距离远",
        con: "多调一次 LLM",
        example: "用户问「认证怎么做的？」→ LLM 假答「项目用 JWT…」→ 用假答检索",
      },
      {
        name: "混合检索",
        pro: "BM25 抓关键词，embedding 抓语义",
        con: "需要权重融合 + 后处理去重",
        example: "用户提到 auth.ts → BM25 命中；说「登录系统」→ embedding 命中",
      },
    ],
    takeaway: "更多 context 不总是更好的 context。塞 10 条半相关的，效果不如 3 条高度相关的。",
  },
];

const SectionLifecycle: React.FC = () => {
  const [stageIdx, setStageIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const stage = STAGES[stageIdx];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">How · 怎么转</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          一条记忆的一生：
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">写入 · 维护 · 检索</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          分类和存储位置定下来之后，最关键的工程问题是 ——
          这堆记忆怎么转起来？拆成三阶段就清楚了。下面一阶一阶看。
        </p>

        {/* ─── 三阶段进度条 + 控制 ─── */}
        <div className="mt-12">
          <div className="grid grid-cols-3 gap-3 mb-6">
            {STAGES.map((s, i) => {
              const active = i === stageIdx;
              const done = i < stageIdx;
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => {
                    setStageIdx(i);
                    setHoverIdx(null);
                  }}
                  className={`relative border-2 border-ink rounded-2xl p-4 text-left transition-all duration-300 ease-spring ${
                    active
                      ? `${s.tone} shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]`
                      : done
                      ? "bg-cream text-ink shadow-stamp opacity-65"
                      : "bg-white text-ink shadow-stamp"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10.5px] tracking-[0.18em] opacity-75">
                      {s.num}
                    </span>
                    <span className="opacity-90">{s.icon}</span>
                  </div>
                  <div className="font-display font-extrabold text-[20px] leading-tight">
                    {s.label}
                  </div>
                  <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase mt-0.5 opacity-65">
                    {s.en}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => {
                setStageIdx(Math.max(0, stageIdx - 1));
                setHoverIdx(null);
              }}
              disabled={stageIdx === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-cream border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
              上一阶段
            </button>
            <span className="font-mono text-[11px] text-ink/55 tracking-[0.18em]">
              {stageIdx + 1} / {STAGES.length}
            </span>
            <button
              type="button"
              onClick={() => {
                setStageIdx(Math.min(STAGES.length - 1, stageIdx + 1));
                setHoverIdx(null);
              }}
              disabled={stageIdx === STAGES.length - 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-cream border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring disabled:opacity-30 disabled:cursor-not-allowed"
            >
              下一阶段
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* ─── 阶段主体 ─── */}
        <div key={stage.id} className="card-stamp p-7 lg:p-9 animate-enter-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 左：阶段定义 */}
            <div className="lg:col-span-5">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${stage.tone} border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase mb-4`}>
                {stage.icon} 阶段 {stage.num}
              </div>
              <div className="font-display font-extrabold text-[32px] text-ink leading-[1.05] mb-3">
                {stage.label}
                <span className="text-ink/40 font-mono text-[18px] ml-2">{stage.en}</span>
              </div>
              <p className="font-sans text-[15px] leading-[1.7] text-ink/80">
                {stage.oneliner}
              </p>

              <div className="mt-6 pt-5 border-t-2 border-dashed border-ink/20">
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
                  这一阶段的硬规则
                </div>
                <p className="font-serif italic text-[14px] leading-[1.65] text-ink">
                  {stage.takeaway}
                </p>
              </div>
            </div>

            {/* 右：策略 chips + hover 详情 */}
            <div className="lg:col-span-7">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
                3 种策略 · hover 看细节
              </div>
              <div className="space-y-3">
                {stage.strategies.map((strat, i) => {
                  const open = hoverIdx === i;
                  return (
                    <div
                      key={strat.name}
                      onMouseEnter={() => setHoverIdx(i)}
                      onMouseLeave={() => setHoverIdx(null)}
                      onClick={() => setHoverIdx(open ? null : i)}
                      className={`border-2 border-ink rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-editorial ${
                        open ? "bg-white shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]" : "bg-white shadow-stamp"
                      }`}
                    >
                      <div className="px-5 py-3 flex items-center justify-between border-b-2 border-ink/15">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] font-bold text-ink/45">
                            S{i + 1}
                          </span>
                          <span className="font-display font-extrabold text-[17px] text-ink">
                            {strat.name}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-ink/50">
                          {open ? "—" : "+"}
                        </span>
                      </div>
                      {open && (
                        <div className="px-5 py-4 bg-butter/15 grid grid-cols-1 md:grid-cols-3 gap-4 animate-enter-fade">
                          <Cell tag="优" tone="text-teal">{strat.pro}</Cell>
                          <Cell tag="缺" tone="text-coral">{strat.con}</Cell>
                          <Cell tag="例" tone="text-ink">{strat.example}</Cell>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── HyDE 单独说一下（这是反直觉技巧，值得专门讲） ─── */}
        {stage.id === "retrieve" && (
          <div className="mt-8 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-7">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-butter mb-3">
              反直觉技巧 · HyDE
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div>
                <div className="font-display font-bold text-[18px] mb-2">
                  问题：疑问句和陈述句 embedding 距离远
                </div>
                <p className="font-sans text-[14px] leading-[1.7] text-cream/80">
                  用户问「认证怎么做的？」，记忆里写的是「项目用 JWT + 24 小时过期，在 auth.ts 中间件验证」。
                  一个疑问句、一个陈述句 —— embedding 空间里距离不近，搜不到。
                </p>
              </div>
              <div>
                <div className="font-display font-bold text-[18px] mb-2">
                  做法：先让 LLM 编一个假答案
                </div>
                <p className="font-sans text-[14px] leading-[1.7] text-cream/80">
                  让 LLM 不查记忆直接回答一次（即使是错的），用这个「假答案」做 embedding 检索。
                  <span className="text-butter font-bold"> 假答案不需要正确，只需要「答案形状」对就够了 </span>
                  —— 跟真正的记忆条目都是陈述句，距离自然近。
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Cell: React.FC<{ tag: string; tone: string; children: React.ReactNode }> = ({
  tag,
  tone,
  children,
}) => (
  <div>
    <div className={`font-mono text-[10.5px] tracking-[0.2em] uppercase mb-1 font-bold ${tone}`}>
      {tag}
    </div>
    <p className="font-sans text-[13px] leading-[1.6] text-ink/80">{children}</p>
  </div>
);

export default SectionLifecycle;
