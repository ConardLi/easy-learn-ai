import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  FileText,
  GitBranch,
  Layers3,
  Network,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { Badge, SectionShell, StampLink } from "./common";

type Topic = "产品" | "客户" | "风险";
const docs = [
  { id: 1, topic: "产品" as Topic, text: "北斗项目将在第三季度发布移动端。", entity: "北斗项目" },
  { id: 2, topic: "客户" as Topic, text: "制造业客户最关心离线使用和数据权限。", entity: "制造业客户" },
  { id: 3, topic: "风险" as Topic, text: "移动端延期来自安全审查和人员变动。", entity: "安全审查" },
  { id: 4, topic: "产品" as Topic, text: "星河科技把北斗项目列为年度重点。", entity: "星河科技" },
  { id: 5, topic: "客户" as Topic, text: "华东客户把权限管理列为采购前提。", entity: "华东客户" },
  { id: 6, topic: "风险" as Topic, text: "负责移动端的林然将在七月转岗。", entity: "林然" },
];

const graphNodes = [
  { id: "北斗项目", x: 150, y: 105, tone: "#F4D35E" },
  { id: "移动端", x: 68, y: 55, tone: "#E07A5F" },
  { id: "林然", x: 56, y: 158, tone: "#F4D35E" },
  { id: "安全审查", x: 150, y: 188, tone: "#E07A5F" },
  { id: "制造业客户", x: 248, y: 55, tone: "#F4D35E" },
  { id: "权限管理", x: 250, y: 154, tone: "#E07A5F" },
];
const graphEdges = [
  ["北斗项目", "移动端", "包含"],
  ["林然", "移动端", "负责"],
  ["安全审查", "移动端", "拖慢"],
  ["制造业客户", "权限管理", "关注"],
  ["权限管理", "北斗项目", "影响采购"],
];

export const SectionGraphRagHero: React.FC = () => (
  <section className="relative overflow-hidden bg-teal px-5 pb-20 pt-20 text-cream md:px-8 md:pb-28 md:pt-28">
    <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div>
        <Badge dark>Graph Retrieval-Augmented Generation · 图检索增强生成</Badge>
        <h1 className="mt-7 font-display text-display-xl text-cream">GraphRAG 是什么？</h1>
        <p className="mt-6 max-w-2xl font-display text-[23px] font-bold leading-snug text-ink md:text-[28px]">
          <span className="bg-butter px-1">GraphRAG 沿着事物之间的关系找资料，再把找到的内容交给 AI 回答。</span>
        </p>
        <div className="mt-6 max-w-xl space-y-3 text-lg leading-relaxed text-cream/78">
          <p>普通 RAG 会先从资料库里找几段意思相近的文字，再交给 AI 回答。遇到分散在多份文件里的关系，它可能只捞到其中一段。</p>
          <p>GraphRAG 会先把人、公司、项目等事物连成关系网。提问时，它能从一个事物出发继续找邻居，也能先看整张网里的几组主题。</p>
        </div>
        <div className="mt-7 max-w-xl">
          <StampLink href="../knowledge-graph/index.html" title="还不熟悉圆点和连线？先看《知识图谱》" desc="那一站讲怎样用节点和关系记录事实；这里继续讲 AI 怎样利用这张关系网找资料。" />
        </div>
        <p className="mt-7 text-cream/70">接下来对比两种找资料的方法。</p>
        <div className="mt-7 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cream/60">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-butter text-ink"><ArrowDown className="h-4 w-4" /></span>
          继续往下看
        </div>
      </div>
      <div className="rounded-[32px] border-2 border-ink bg-cream p-5 text-ink shadow-stamp-xl">
        <GraphPicture active={graphNodes.map((node) => node.id)} />
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center font-mono text-xs font-bold">
          <span className="rounded-full border-2 border-ink bg-white px-3 py-2">关系网</span>
          <ArrowRight className="h-4 w-4" />
          <span className="rounded-full border-2 border-ink bg-butter px-3 py-2">带证据的回答</span>
        </div>
      </div>
    </div>
  </section>
);

export const SectionRagBlindSpot: React.FC = () => {
  const [question, setQuestion] = useState<"point" | "whole">("point");
  const [method, setMethod] = useState<"rag" | "graph">("rag");
  const point = question === "point";
  const good = point || method === "graph";
  return (
    <SectionShell num="01" label="where plain rag misses" tone="white">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="font-display text-display-lg">单点问题和整体问题，找资料的方法不同</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            先选问题，再切换检索方式。这里的结果是教学示意，用来观察两类问题的差别。
          </p>
          <div className="mt-6 space-y-3">
            <button onClick={() => setQuestion("point")} className={`w-full rounded-2xl border-2 border-ink p-4 text-left ${point ? "bg-ink text-cream shadow-stamp" : "bg-white"}`}>
              <strong>单点问题</strong><span className="mt-1 block text-sm opacity-70">北斗项目何时发布移动端？</span>
            </button>
            <button onClick={() => setQuestion("whole")} className={`w-full rounded-2xl border-2 border-ink p-4 text-left ${!point ? "bg-ink text-cream shadow-stamp" : "bg-white"}`}>
              <strong>整体问题</strong><span className="mt-1 block text-sm opacity-70">这些材料反映了哪些主要风险？</span>
            </button>
          </div>
        </div>
        <div className="rounded-[28px] border-2 border-ink bg-cream p-5 shadow-stamp-xl">
          <div className="mb-5 flex gap-3">
            {(["rag", "graph"] as const).map((item) => (
              <button key={item} onClick={() => setMethod(item)} className={`btn-stamp flex-1 justify-center px-4 py-3 ${method === item ? "bg-butter" : "bg-white"}`}>
                {item === "rag" ? "普通 RAG" : "GraphRAG"}
              </button>
            ))}
          </div>
          <div className={`rounded-2xl border-2 border-ink p-5 ${good ? "bg-white" : "bg-coral text-cream"}`}>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.15em] opacity-55">找到的材料</p>
            <div className="mt-4 space-y-3">
              {(point
                ? docs.filter((doc) => doc.topic === "产品").slice(0, 2)
                : method === "rag"
                  ? docs.filter((doc) => doc.topic === "风险").slice(0, 1)
                  : docs.filter((doc) => doc.topic === "风险" || doc.topic === "客户")
              ).map((doc) => (
                <p key={doc.id} className="rounded-xl border-2 border-ink bg-cream p-3 text-sm text-ink">{doc.text}</p>
              ))}
            </div>
            <p className="mt-5 font-bold">
              {point
                ? "两种方法都能直接命中发布日期。"
                : method === "rag"
                  ? "只捞到一段风险描述，容易漏掉客户权限要求。"
                  : "沿关系与主题分组一起找，能覆盖延期、人员和采购三类风险。"}
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const indexSteps = [
  { title: "切开文档", icon: FileText, text: "先把长文档切成较短的文本片段，保留原文和来源。" },
  { title: "找出事物与关系", icon: Search, text: "从片段里识别人、公司、项目和它们之间的关系。" },
  { title: "连成关系网", icon: Network, text: "相同事物合并成一个节点，关系变成带方向的线。" },
  { title: "给相近节点分组", icon: Layers3, text: "连接紧密的一群节点会被分到同一社区，之后可以先概括这一组。" },
];

export const SectionBuildIndex: React.FC = () => {
  const [step, setStep] = useState(0);
  const Current = indexSteps[step].icon;
  return (
    <SectionShell num="02" label="build the graph index" tone="cream">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="font-display text-display-lg">问问题之前，先把资料整理成图索引</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            索引是一份提前整理好的查找目录。GraphRAG 的准备工作比普通 RAG 多，主要多在提取关系和给节点分组。
          </p>
          <div className="mt-7 flex items-center gap-3">
            <button className="btn-stamp bg-white px-4 py-3" onClick={() => setStep((n) => Math.max(0, n - 1))}><ChevronLeft className="h-4 w-4" /></button>
            <span className="font-mono text-sm font-bold">{step + 1} / {indexSteps.length}</span>
            <button className="btn-stamp bg-butter px-4 py-3" onClick={() => setStep((n) => Math.min(indexSteps.length - 1, n + 1))}><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="mt-6">
            <StampLink href="../knowledge-graph/index.html" title="需要补一下关系图？" desc="那一站讲圆点和连线怎样表示事实；这里继续讲怎样用关系网替 AI 找资料。" />
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-3">
            {indexSteps.map((item, index) => (
              <button key={item.title} onClick={() => setStep(index)} className={`w-full rounded-xl border-2 border-ink p-4 text-left font-bold ${step === index ? "bg-ink text-cream shadow-stamp" : "bg-white"}`}>
                {index + 1}. {item.title}
              </button>
            ))}
          </div>
          <div className="rounded-[28px] border-2 border-ink bg-white p-6 shadow-stamp-xl">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-butter"><Current className="h-6 w-6" /></span>
            <h3 className="mt-5 font-display text-3xl font-bold">{indexSteps[step].title}</h3>
            <p className="mt-3 leading-relaxed text-ink/70">{indexSteps[step].text}</p>
            <div className="mt-6 rounded-2xl border-2 border-ink bg-cream p-4">
              {step === 0 && "片段 03：负责移动端的林然将在七月转岗。"}
              {step === 1 && "林然 — 负责 → 移动端"}
              {step === 2 && "节点「林然」连接「移动端」，后者再连接「北斗项目」。"}
              {step === 3 && "产品社区：北斗项目、移动端、林然、安全审查"}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export const SectionCommunityReports: React.FC = () => {
  const [links, setLinks] = useState(3);
  const split = links < 3;
  return (
    <SectionShell num="03" label="community summaries" tone="butter">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div>
          <h2 className="font-display text-display-lg">连接紧密的节点，会先被归成一组</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            这样的一组节点叫社区。系统可以提前为每个社区写一份摘要，回答整体问题时先读摘要。
          </p>
          <div className="mt-6 rounded-2xl border-2 border-ink bg-white p-5 shadow-stamp">
            <div className="flex items-center justify-between"><Badge>跨组连接</Badge><strong>{links}</strong></div>
            <input className="mt-5 w-full accent-coral" type="range" min={0} max={5} value={links} onChange={(event) => setLinks(Number(event.target.value))} />
            <p className="mt-3 text-sm text-ink/65">拖动滑块，观察两个主题在连接变多后是否会合成一组。</p>
          </div>
        </div>
        <div className="rounded-[28px] border-2 border-ink bg-white p-5 shadow-stamp-xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <CommunityCard title="产品推进" items={["北斗项目", "移动端", "林然", "安全审查"]} tone="bg-coral text-cream" />
            <CommunityCard title="客户要求" items={["制造业客户", "华东客户", "权限管理"]} tone={split ? "bg-teal text-cream" : "bg-coral text-cream"} />
          </div>
          <div className="mt-5 rounded-2xl border-2 border-ink bg-cream p-4">
            <p className="font-bold">{split ? "当前分成两个社区" : "连接较多，可能合成一个大社区"}</p>
            <p className="mt-2 text-sm text-ink/65">
              {split ? "摘要可以分别讲产品延期与客户权限要求。" : "大社区覆盖更广，但摘要容易变得宽泛。"}
            </p>
          </div>
          <p className="mt-3 text-xs text-ink/55">示意分组，帮助理解连接密度；真实系统会使用图聚类算法。</p>
        </div>
      </div>
    </SectionShell>
  );
};

export const SectionLocalWalk: React.FC = () => {
  const [radius, setRadius] = useState(1);
  const active = useMemo(() => {
    if (radius === 1) return ["林然", "移动端"];
    if (radius === 2) return ["林然", "移动端", "北斗项目", "安全审查"];
    return graphNodes.map((node) => node.id);
  }, [radius]);
  return (
    <SectionShell num="04" label="local search" tone="teal">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <Badge dark>局部搜索 · specific entity</Badge>
          <h2 className="mt-5 font-display text-display-lg text-cream">问一个具体对象，就从它附近展开</h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/75">
            “林然转岗会影响什么？”有明确起点。系统先找到林然，再向相邻节点扩展。
          </p>
          <div className="mt-6 rounded-2xl border-2 border-ink bg-white p-5 text-ink shadow-stamp">
            <div className="flex items-center justify-between"><Badge>向外找几层</Badge><strong>{radius} 层</strong></div>
            <input className="mt-5 w-full accent-coral" type="range" min={1} max={3} value={radius} onChange={(event) => setRadius(Number(event.target.value))} />
            <p className="mt-3 text-sm text-ink/65">范围太小会漏信息；范围太大会带回很多旁枝。</p>
          </div>
        </div>
        <div className="rounded-[28px] border-2 border-ink bg-cream p-5 text-ink shadow-stamp-xl">
          <GraphPicture active={active} />
          <p className="mt-4 rounded-xl border-2 border-ink bg-butter p-4 font-bold">
            {radius === 1 && "只看到：林然负责移动端。"}
            {radius === 2 && "继续看到：移动端属于北斗项目，并被安全审查拖慢。"}
            {radius === 3 && "再扩一层：客户对权限管理的要求也会影响项目采购。"}
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border-2 border-ink bg-white p-4">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink/45">找到的原文</p>
              <p className="mt-2 text-sm leading-relaxed">「负责移动端的林然将在七月转岗。」</p>
            </div>
            <div className="rounded-xl border-2 border-ink bg-white p-4">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink/45">交给 AI 后</p>
              <p className="mt-2 text-sm leading-relaxed">林然转岗可能影响移动端进度；向外找两层还能看到安全审查这条风险。</p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const searchModes = [
  { id: "basic", label: "Basic", clue: "问题可由几段直接相关的文字回答", example: "移动端计划何时发布？", color: "bg-white" },
  { id: "local", label: "Local", clue: "问题围绕一个具体人、公司或项目", example: "林然转岗会影响什么？", color: "bg-butter" },
  { id: "global", label: "Global", clue: "全局搜索先读每组关系的摘要，再把多组摘要合起来回答整批资料的共同主题", example: "这些材料反映了哪些主要风险？", color: "bg-coral text-cream" },
  { id: "drift", label: "DRIFT", clue: "DRIFT 先查具体对象附近的关系，再逐步补入相关社区摘要，兼顾细节和整体背景", example: "北斗项目延期与全局风险有什么联系？", color: "bg-teal text-cream" },
];

export const SectionChooseSearch: React.FC = () => {
  const [signals, setSignals] = useState({ entity: true, whole: false, background: false });
  const result = signals.whole ? "global" : signals.entity && signals.background ? "drift" : signals.entity ? "local" : "basic";
  const chosen = searchModes.find((mode) => mode.id === result)!;
  return (
    <SectionShell num="05" label="pick a query mode" tone="white">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="font-display text-display-lg">问题不同，选择的检索方式也不同</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">勾选问题特征，看看更适合从片段、邻居还是社区摘要开始找。</p>
          <div className="mt-6 space-y-3">
            {[
              ["entity", "问题点名了具体对象"],
              ["whole", "问题要概括整批资料"],
              ["background", "还需要更大的主题背景"],
            ].map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-ink bg-cream p-4 font-bold">
                <input type="checkbox" className="h-5 w-5 accent-coral" checked={signals[key as keyof typeof signals]} onChange={(event) => setSignals((old) => ({ ...old, [key]: event.target.checked }))} />
                {label}
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className={`rounded-[28px] border-2 border-ink p-6 shadow-stamp-xl ${chosen.color}`}>
            <Badge dark={result === "global" || result === "drift"}>推荐：{chosen.label} Search</Badge>
            <p className="mt-5 font-display text-2xl font-bold">{chosen.clue}</p>
            <p className="mt-4 rounded-xl border-2 border-ink bg-cream p-4 text-ink">例：{chosen.example}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {searchModes.map((mode) => (
              <div key={mode.id} className={`rounded-xl border-2 border-ink p-3 text-sm font-bold ${mode.id === result ? "bg-butter shadow-stamp" : "bg-white opacity-50"}`}>{mode.label}</div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const tradeoffs = [
  { title: "建索引更贵", icon: CircleDollarSign, body: "要额外提取实体、关系、社区和摘要。资料很多时，这部分会花更多模型调用与时间。" },
  { title: "更新更麻烦", icon: Layers3, body: "新文档可能改变节点关系和社区分组。频繁变化的资料需要设计增量更新。" },
  { title: "错误会沿图扩散", icon: Target, body: "如果实体合错或关系抽错，检索会沿着错误的线继续走。原文来源必须保留。" },
];

export const SectionTradeoffs: React.FC = () => {
  const [active, setActive] = useState(0);
  const Current = tradeoffs[active].icon;
  return (
    <SectionShell num="06" label="costs and boundaries" tone="cream">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="font-display text-display-lg">需要跨文件找关系或概括整批资料时，可以考虑 GraphRAG</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            几份短文档和简单问答，普通 RAG 通常更省事。GraphRAG 适合跨文档联系、整体主题和多跳问题较多的资料库。
          </p>
          <div className="mt-6 space-y-3">
            {tradeoffs.map((item, index) => (
              <button key={item.title} onClick={() => setActive(index)} className={`w-full rounded-xl border-2 border-ink p-4 text-left font-bold ${active === index ? "bg-ink text-cream shadow-stamp" : "bg-white"}`}>{item.title}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="rounded-[28px] border-2 border-ink bg-white p-6 shadow-stamp-xl">
            <Current className="h-8 w-8" />
            <h3 className="mt-5 font-display text-3xl font-bold">{tradeoffs[active].title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-ink/70">{tradeoffs[active].body}</p>
            <div className="mt-6 rounded-2xl border-2 border-ink bg-butter p-4 font-bold">回答应附上原文出处，方便核对关系有没有找错。</div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <StampLink href="../rag/index.html" title="回到《RAG》看基础流程" desc="RAG 站讲切片、检索、拼回问题和生成答案。" />
            <StampLink href="../knowledge-graph/index.html" title="回到《知识图谱》看关系" desc="知识图谱站讲节点、关系、多跳查询和实体消歧。" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const CommunityCard: React.FC<{ title: string; items: string[]; tone: string }> = ({ title, items, tone }) => (
  <div className={`rounded-2xl border-2 border-ink p-4 shadow-stamp transition-colors ${tone}`}>
    <p className="font-display text-xl font-bold">{title}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => <span key={item} className="rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-bold text-ink">{item}</span>)}
    </div>
  </div>
);

const GraphPicture: React.FC<{ active: string[] }> = ({ active }) => (
  <svg viewBox="0 0 310 230" className="w-full rounded-2xl border-2 border-ink bg-white" role="img" aria-label="GraphRAG 关系网示意">
    {graphEdges.map(([from, to, label]) => {
      const a = graphNodes.find((node) => node.id === from)!;
      const b = graphNodes.find((node) => node.id === to)!;
      const visible = active.includes(from) && active.includes(to);
      return (
        <g key={`${from}-${to}`} opacity={visible ? 1 : 0.12}>
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#241C15" strokeWidth="2" />
          <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 4} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="700">{label}</text>
        </g>
      );
    })}
    {graphNodes.map((node) => {
      const visible = active.includes(node.id);
      return (
        <g key={node.id} opacity={visible ? 1 : 0.12}>
          <circle cx={node.x} cy={node.y} r="25" fill={node.tone} stroke="#241C15" strokeWidth="2.5" />
          <text x={node.x} y={node.y + 4} textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="10" fontWeight="800">{node.id}</text>
        </g>
      );
    })}
  </svg>
);
