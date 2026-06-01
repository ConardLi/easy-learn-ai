/**
 * SectionWhereStored · 存哪儿：三种存储形态
 *
 * 来自 Hu et al. 2025 综述《Memory in the Age of AI Agents》的三层框架。
 *
 * 主交互（L3 勾选 + 条件结论）：让用户答 2 个问题
 *   - 你用商业 API 还是自部署开源模型？
 *   - 你需要增量更新吗？
 *   → 高亮唯一推荐的存储层
 *
 * 辅助：3 张层级卡 + token 级展开看「扁平 / 图 / 层级」三种细分
 *
 * 跟相邻 SectionThreeTypes 拉开：那是 pill，这里走勾选 → 决策。
 */
import React, { useMemo, useState } from "react";
import { Check, Lock, X } from "lucide-react";

const LAYERS = [
  {
    id: "token",
    label: "Token 级",
    en: "Token-level",
    desc: "把记忆存成可读文本（fact / 摘要 / 用户档案 / 对话片段），写到数据库或文件，需要时取出来塞进 prompt。",
    examples: ["Mem0", "Letta（前 MemGPT）", "Zep", "Claude Code 的 CLAUDE.md"],
    tone: "bg-butter text-ink",
    fitCommercial: true,
    fitIncremental: true,
    note: "目前几乎所有生产级记忆系统都在这一层。",
  },
  {
    id: "implicit",
    label: "隐式记忆",
    en: "Implicit",
    desc: "把记忆存在模型内部 —— KV cache 复用、cache 压缩、学习出来的「记忆 token」。",
    examples: ["KV cache 复用", "cache 压缩", "memory tokens"],
    tone: "bg-coral text-white",
    fitCommercial: false,
    fitIncremental: true,
    note: "要求访问 past_key_values / hidden_states，商业 API 一概不暴露。跑开源模型才有得玩。",
  },
  {
    id: "parametric",
    label: "参数级",
    en: "Parametric",
    desc: "把知识直接写进模型权重 —— fine-tuning、LoRA adapter 这类知识编辑技术。",
    examples: ["full fine-tuning", "LoRA adapter", "knowledge editing"],
    tone: "bg-teal text-white",
    fitCommercial: "limited" as const,
    fitIncremental: false,
    note: "效果最持久，但不支持「学一条改一次」，且有灾难性遗忘风险。",
  },
] as const;

const TOKEN_DETAILS = [
  {
    id: "flat",
    label: "扁平存储",
    desc: "把每条记忆转成一串数字（叫 embedding，意思相近的数字也相近）；问问题时也把问题转成数字，找最接近的几条（top-K）。整个仓库就是一堆这样的条目平铺着，没有层级关系，所以叫扁平。",
    bench: "StructMemEval 显示，扁平检索在标准测试集能打平甚至打赢复杂层级。",
    rec: "起步首选",
  },
  {
    id: "graph",
    label: "图结构",
    desc: "条目之间有关系。Zep 用时序知识图谱，A-Mem 用类 Zettelkasten 双向链接。",
    bench: "适合多跳推理：「某人在 Temporal 工作」+「Temporal 开发了 SDK」+「项目用了 SDK」。",
    rec: "扁平搜不到时再上",
  },
  {
    id: "hier",
    label: "层级结构",
    desc: "底层原始条目，中间聚类摘要，顶层全局抽象。HippoRAG 是这个思路（灵感来自海马体）。",
    bench: "需要「全局回顾」型问题表现更好，工程复杂度也最高。",
    rec: "大规模才考虑",
  },
];

type APIKind = "commercial" | "self-host" | null;
type Update = "incremental" | "batch" | null;

const SectionWhereStored: React.FC = () => {
  const [api, setApi] = useState<APIKind>(null);
  const [update, setUpdate] = useState<Update>(null);
  const [openToken, setOpenToken] = useState<string>("flat");

  const recommended = useMemo<string | null>(() => {
    if (!api || !update) return null;
    // 决策：商业 API → 只能 token 级；自部署 + 批量 → 参数级；自部署 + 增量 → token 或隐式
    if (api === "commercial") return "token";
    if (api === "self-host" && update === "batch") return "parametric";
    if (api === "self-host" && update === "incremental") return "token"; // 隐式还在研究阶段，建议主线 token
    return null;
  }, [api, update]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Where · 存哪儿</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          三种存储形态 ——
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">绝大多数人</span>
          </span>{" "}
          只用得到一种。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          按「记忆放哪儿」分，2025 年底 Hu et al. 那篇 107 页综述给了一个干净的三层框架。
          但对应用开发者，真实可选空间常常只有一层 —— 取决于你用谁的 API。
        </p>

        {/* ─── 决策器（L3 勾选） ─── */}
        <div className="mt-12 card-stamp p-7">
          <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-4">
            两步看你能用哪种
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Choice
              num={1}
              question="你用谁的模型？"
              options={[
                { id: "commercial", label: "商业 API（OpenAI / Claude / Gemini）" },
                { id: "self-host", label: "自部署开源模型（Qwen / GLM / Llama）" },
              ]}
              value={api}
              onSelect={(v) => setApi(v as APIKind)}
            />
            <Choice
              num={2}
              question="知识更新节奏？"
              options={[
                { id: "incremental", label: "随时学新东西，要增量更新" },
                { id: "batch", label: "批量训一次稳一段时间" },
              ]}
              value={update}
              onSelect={(v) => setUpdate(v as Update)}
            />
          </div>

          {recommended && (
            <div className="mt-6 pt-5 border-t-2 border-dashed border-ink/25 flex items-start gap-3 animate-enter-fade">
              <div className="flex-shrink-0 px-3 py-1.5 bg-ink text-cream font-mono text-[11px] tracking-[0.22em] uppercase rounded-full">
                推荐
              </div>
              <div>
                <div className="font-display font-bold text-[18px] text-ink">
                  {LAYERS.find((l) => l.id === recommended)?.label}
                </div>
                <p className="font-sans text-[14px] text-ink/75 mt-1 leading-[1.6]">
                  {recommended === "token" && api === "commercial" &&
                    "你碰不到模型内部，能操作的只有发给模型的文本。所有记忆工程都发生在 token 层面。"}
                  {recommended === "token" && api === "self-host" &&
                    "增量更新场景，token 级最务实。隐式技术（KV cache 复用等）虽然研究火热，但工程成熟度一般，建议主线还是 token 级。"}
                  {recommended === "parametric" &&
                    "批量训练一次稳一段时间的场景下，把知识固化到权重里效果最持久。但记得：每次「重训」 = 灾难性遗忘风险，要做回归测试。"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ─── 三层卡片 ─── */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {LAYERS.map((layer) => {
            const isRec = recommended === layer.id;
            return (
              <div
                key={layer.id}
                className={`relative border-2 border-ink rounded-3xl p-6 transition-all duration-300 ease-spring ${
                  isRec
                    ? "bg-white shadow-stamp-xl translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white shadow-stamp"
                } ${recommended && !isRec ? "opacity-55" : ""}`}
              >
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${layer.tone} border-2 border-ink rounded-full font-mono text-[10.5px] tracking-[0.18em] uppercase mb-4`}>
                  {layer.label}
                </div>
                {layer.id !== "token" && (
                  <div className="mb-4 px-3 py-2 bg-ink/[0.04] border border-dashed border-ink/25 rounded-xl">
                    <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/60 font-bold">
                      进阶 · 自部署才用得上
                    </div>
                    <p className="font-sans text-[12.5px] text-ink/65 leading-[1.55] mt-1">
                      日常用 OpenAI / Claude / Gemini 这些商业 API，不用关心这一层 —— 看看就好。
                    </p>
                  </div>
                )}
                <div className="font-display font-extrabold text-[20px] text-ink leading-tight mb-2">
                  {layer.en}
                </div>
                <p className="font-sans text-[13.5px] text-ink/75 leading-[1.65] mb-4">
                  {layer.desc}
                </p>

                {/* 适配标签 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge ok={layer.fitCommercial}>
                    {layer.fitCommercial === "limited" ? "商业 API · 有限" : "商业 API"}
                  </Badge>
                  <Badge ok={layer.fitIncremental}>增量更新</Badge>
                </div>

                {/* 代表实现 */}
                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/45 mb-1.5">
                  代表
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {layer.examples.map((ex) => (
                    <span
                      key={ex}
                      className="font-mono text-[11px] px-2 py-0.5 bg-cream border border-ink/20 rounded-md text-ink/80"
                    >
                      {ex}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t-2 border-dashed border-ink/15">
                  <p className="font-serif italic text-[13px] text-ink/70 leading-[1.55]">
                    {layer.note}
                  </p>
                </div>

                {layer.id !== "token" && (
                  <div className="absolute top-5 right-5 text-ink/30">
                    <Lock className="w-4 h-4" strokeWidth={2.2} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ─── Token 级内部还有梯度（accordion） ─── */}
        <div className="mt-14">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1">
                Token 级 · 内部细分
              </div>
              <div className="font-display font-bold text-[18px] text-ink">
                选定 token 级之后，还有三种结构
              </div>
            </div>
            <div className="font-mono text-[11px] text-ink/55">点开看</div>
          </div>
          <div className="space-y-3">
            {TOKEN_DETAILS.map((d) => {
              const open = openToken === d.id;
              return (
                <div
                  key={d.id}
                  className={`border-2 border-ink rounded-2xl overflow-hidden transition-all duration-300 ease-editorial ${
                    open ? "bg-white shadow-stamp-lg" : "bg-white shadow-stamp"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenToken(open ? "" : d.id)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px] font-bold text-ink/45 tracking-[0.16em]">
                        {String(TOKEN_DETAILS.indexOf(d) + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display font-extrabold text-[18px] text-ink">
                        {d.label}
                      </span>
                      <span className="font-mono text-[11px] px-2 py-0.5 bg-butter border border-ink/20 rounded-md text-ink/80 hidden md:inline-flex">
                        {d.rec}
                      </span>
                    </div>
                    <span className="font-mono text-[18px] text-ink">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open && (
                    <div className="px-5 pb-5 pt-1 grid grid-cols-1 md:grid-cols-2 gap-5 animate-enter-fade">
                      <div>
                        <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1.5">
                          做法
                        </div>
                        <p className="font-sans text-[14px] leading-[1.7] text-ink/85">
                          {d.desc}
                        </p>
                      </div>
                      <div>
                        <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1.5">
                          实测
                        </div>
                        <p className="font-sans text-[14px] leading-[1.7] text-ink/85">
                          {d.bench}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="font-serif italic text-[14px] text-ink/65 mt-5 max-w-[740px] leading-[1.65]">
            实用建议：从扁平开始。只有当你观察到明确检索失败（多跳问题搜不到 / 全局问题答不准），
            再考虑往图或层级方向演进。
          </p>
        </div>
      </div>
    </section>
  );
};

const Choice: React.FC<{
  num: number;
  question: string;
  options: { id: string; label: string }[];
  value: string | null;
  onSelect: (v: string) => void;
}> = ({ num, question, options, value, onSelect }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <span className="font-mono text-[11px] font-bold text-ink/55 tracking-[0.18em]">
        Q{num}
      </span>
      <span className="font-display font-bold text-[15px] text-ink">{question}</span>
    </div>
    <div className="space-y-2">
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            type="button"
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`w-full text-left px-4 py-3 border-2 border-ink rounded-2xl transition-all duration-250 ease-spring flex items-center gap-3 ${
              selected
                ? "bg-ink text-cream shadow-stamp-lg"
                : "bg-cream text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px]"
            }`}
          >
            <span
              className={`flex-shrink-0 w-5 h-5 rounded-full border-2 ${
                selected ? "border-cream bg-butter" : "border-ink/40"
              } flex items-center justify-center`}
            >
              {selected && <Check className="w-3 h-3 text-ink" strokeWidth={3} />}
            </span>
            <span className="font-sans text-[14px] leading-tight">{opt.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const Badge: React.FC<{ ok: boolean | "limited"; children: React.ReactNode }> = ({
  ok,
  children,
}) => (
  <span
    className={`inline-flex items-center gap-1 font-mono text-[10.5px] tracking-[0.16em] uppercase px-2 py-0.5 rounded-md border ${
      ok === true
        ? "bg-butter/40 border-ink/20 text-ink"
        : ok === "limited"
        ? "bg-cream border-ink/20 text-ink/60"
        : "bg-ink/[0.04] border-ink/15 text-ink/45 line-through"
    }`}
  >
    {ok === true ? <Check className="w-3 h-3" /> : ok === "limited" ? "≈" : <X className="w-3 h-3" />}
    {children}
  </span>
);

export default SectionWhereStored;
