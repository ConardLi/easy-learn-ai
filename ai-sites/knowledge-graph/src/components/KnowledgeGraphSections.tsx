import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Link2,
  Network,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { Badge, SectionShell, StampLink } from "./common";

type NodeId = "林然" | "星河科技" | "北斗项目" | "上海";
const nodePos: Record<NodeId, [number, number]> = {
  林然: [75, 74],
  星河科技: [210, 64],
  北斗项目: [220, 164],
  上海: [74, 168],
};
const baseEdges: [NodeId, NodeId, string][] = [
  ["林然", "星河科技", "任职于"],
  ["星河科技", "北斗项目", "负责"],
  ["星河科技", "上海", "位于"],
];

export const SectionGraphHero: React.FC = () => (
  <section className="relative overflow-hidden px-5 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28">
    <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <Badge>Knowledge Graph · 知识图谱</Badge>
        <h1 className="mt-7 font-display text-display-xl">知识图谱是什么？</h1>
        <p className="mt-6 max-w-2xl font-display text-[23px] font-bold leading-snug md:text-[28px]">
          <span className="bg-butter px-1">
            知识图谱把人、地点和事物连起来，并写清它们之间的关系。
          </span>
        </p>
        <div className="mt-6 max-w-xl space-y-3 text-lg leading-relaxed text-ink/75">
          <p>图里的一个圆点代表一个具体东西，例如某个人、公司或项目。</p>
          <p>两个圆点之间的线会写明关系，例如「任职于」「负责」「位于」。沿着线走，就能找到分散事实之间的联系。</p>
        </div>
        <p className="mt-7 text-ink/65">先拿一句普通的话，看看它怎样变成圆点和连线。</p>
        <div className="mt-7 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink/55">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream">
            <ArrowDown className="h-4 w-4" />
          </span>
          继续往下看
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-lg">
        <div className="absolute -left-4 -top-4 h-full w-full rounded-[32px] border-2 border-ink bg-coral" />
        <div className="relative rounded-[32px] border-2 border-ink bg-white p-5 shadow-stamp-xl">
          <GraphSvg active={["林然", "星河科技", "北斗项目", "上海"]} edges={baseEdges} />
          <p className="mt-3 text-center font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink/45">
            四个东西 · 三条关系
          </p>
        </div>
      </div>
    </div>
  </section>
);

const sentenceParts = [
  { text: "林然", kind: "东西", tone: "bg-butter" },
  { text: "任职于", kind: "关系", tone: "bg-teal text-cream" },
  { text: "星河科技", kind: "东西", tone: "bg-coral text-cream" },
  { text: "负责", kind: "关系", tone: "bg-teal text-cream" },
  { text: "北斗项目", kind: "东西", tone: "bg-butter" },
];

export const SectionBuildFacts: React.FC = () => {
  const [picked, setPicked] = useState<number[]>([]);
  const active = sentenceParts.filter((_, index) => picked.includes(index));
  const nodes = active.filter((item) => item.kind === "东西").map((item) => item.text as NodeId);
  const selectedTerms = new Set(active.map((item) => item.text));
  const selectedEdges: [NodeId, NodeId, string][] = [];
  if (selectedTerms.has("林然") && selectedTerms.has("任职于") && selectedTerms.has("星河科技")) {
    selectedEdges.push(["林然", "星河科技", "任职于"]);
  }
  if (selectedTerms.has("星河科技") && selectedTerms.has("负责") && selectedTerms.has("北斗项目")) {
    selectedEdges.push(["星河科技", "北斗项目", "负责"]);
  }
  return (
    <SectionShell num="01" label="sentence to graph" tone="white">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-display text-display-lg">一句话里藏着哪些东西？</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
            点出人、公司和项目，它们会变成节点；再点「任职于」「负责」，节点之间才会出现对应的线。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {sentenceParts.map((part, index) => {
              const selected = picked.includes(index);
              return (
                <button
                  key={`${part.text}-${index}`}
                  onClick={() =>
                    setPicked((old) =>
                      old.includes(index) ? old.filter((id) => id !== index) : [...old, index],
                    )
                  }
                  className={`rounded-xl border-2 border-ink px-4 py-3 font-bold transition-all ${
                    selected ? `${part.tone} shadow-stamp -translate-y-0.5` : "bg-white"
                  }`}
                >
                  {part.text}
                  <span className="ml-2 font-mono text-[10px] opacity-55">{selected ? part.kind : "点我"}</span>
                </button>
              );
            })}
          </div>
          <button className="btn-stamp mt-6 bg-cream px-4 py-3" onClick={() => setPicked([])}>
            <RotateCcw className="h-4 w-4" /> 清空
          </button>
        </div>
        <div className="card-stamp bg-cream p-5">
          <div className="mb-4 flex items-center justify-between">
            <Badge>句子转成关系图</Badge>
            <span className="font-mono text-xs text-ink/55">{nodes.length} 个节点</span>
          </div>
          <GraphSvg
            active={nodes}
            edges={selectedEdges}
          />
          <p className="mt-4 rounded-xl border-2 border-ink bg-white p-4 text-sm leading-relaxed text-ink/70">
            例如原句明确写着「林然任职于星河科技」，就可以记成「林然—任职于→星河科技」。这种“东西—关系—东西”的表达也叫三元组。
          </p>
        </div>
      </div>
    </SectionShell>
  );
};

const relationViews = {
  list: ["林然｜星河科技｜北斗项目", "星河科技｜上海", "顾言｜天穹科技"],
  graph: ["林然 → 星河科技 → 北斗项目", "星河科技 → 上海"],
};

export const SectionWhyRelations: React.FC = () => {
  const [view, setView] = useState<"list" | "graph">("list");
  return (
    <SectionShell num="02" label="why relationships" tone="cream">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="font-display text-display-lg">关系连起来，就能连续查找多个事实</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            普通列表适合逐行查看。关系图能从一个事实继续走到下一个事实。
          </p>
          <div className="mt-6 flex gap-3">
            {(["list", "graph"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setView(item)}
                className={`btn-stamp px-4 py-3 ${view === item ? "bg-ink text-cream" : "bg-white"}`}
              >
                {item === "list" ? "看列表" : "看关系图"}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border-2 border-ink bg-white p-5 shadow-stamp-xl">
          <div className="mb-4 flex items-center justify-between">
            <Badge>{view === "list" ? "逐行记录" : "沿线查询"}</Badge>
            {view === "graph" ? <Network className="h-5 w-5" /> : <GitBranch className="h-5 w-5" />}
          </div>
          {view === "list" ? (
            <div className="space-y-3">
              {["林然 — 任职于 → 星河科技", "星河科技 — 负责 → 北斗项目", "星河科技 — 位于 → 上海"].map((row) => (
                <div key={row} className="rounded-xl border-2 border-ink bg-cream p-4 font-mono text-sm">
                  {row}
                </div>
              ))}
              <p className="text-sm text-ink/65">列表里要先找到「林然任职于星河科技」，再找到「星河科技负责北斗项目」，才能得到答案。</p>
            </div>
          ) : (
            <div>
              <GraphSvg active={["林然", "星河科技", "北斗项目", "上海"]} edges={baseEdges} />
              <p className="mt-3 text-sm text-ink/65">沿着两条线就能得到：林然所在公司负责北斗项目。</p>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
};

const pathSteps = [
  { title: "找到林然", nodes: ["林然"] as NodeId[], edges: [] as [NodeId, NodeId, string][] },
  { title: "沿「任职于」找到公司", nodes: ["林然", "星河科技"] as NodeId[], edges: [baseEdges[0]] },
  { title: "沿「负责」找到项目", nodes: ["林然", "星河科技", "北斗项目"] as NodeId[], edges: [baseEdges[0], baseEdges[1]] },
];

export const SectionAnswerPaths: React.FC = () => {
  const [step, setStep] = useState(0);
  return (
    <SectionShell num="03" label="multi-hop query" tone="teal">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Badge dark>问题：林然负责哪个项目？</Badge>
          <h2 className="mt-5 font-display text-display-lg text-cream">沿着关系，一步一步找答案</h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/75">
            一次跨过多条关系的查询叫“多跳查询”。这里要走两跳：人到公司，公司再到项目。
          </p>
          <div className="mt-7 flex items-center gap-3">
            <button className="btn-stamp bg-white px-4 py-3 text-ink" onClick={() => setStep((n) => Math.max(0, n - 1))}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-mono text-sm font-bold">{step + 1} / {pathSteps.length}</span>
            <button className="btn-stamp bg-butter px-4 py-3 text-ink" onClick={() => setStep((n) => Math.min(pathSteps.length - 1, n + 1))}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="rounded-[28px] border-2 border-ink bg-cream p-5 text-ink shadow-stamp-xl">
          <p className="mb-3 font-display text-2xl font-bold">{pathSteps[step].title}</p>
          <GraphSvg active={pathSteps[step].nodes} edges={pathSteps[step].edges} />
          {step === 2 && (
            <div className="mt-4 rounded-xl border-2 border-ink bg-butter p-4 font-bold">
              答案：北斗项目。图里同时保留了这条答案经过的关系。
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
};

const people = [
  { id: "a", name: "林然", company: "星河科技", city: "上海", email: "linran@xinghe.cn" },
  { id: "b", name: "林 然", company: "星河科技有限公司", city: "上海市", email: "linran@xinghe.cn" },
  { id: "c", name: "林然", company: "远帆设计", city: "杭州", email: "ran.lin@yuanfan.cn" },
];

export const SectionEntityCleanup: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(["a", "b"]);
  const mergeable = selected.includes("a") && selected.includes("b") && !selected.includes("c");
  return (
    <SectionShell num="04" label="entity resolution" tone="white">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="font-display text-display-lg">同名的人，可能是一个人，也可能不是</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            判断两条记录说的是不是同一个对象，叫实体对齐。例如「林然」和「林 然」可能是同一个人，也可能只是同名。
          </p>
          <div className={`mt-6 rounded-2xl border-2 border-ink p-5 shadow-stamp ${mergeable ? "bg-butter" : "bg-coral text-cream"}`}>
            <p className="font-bold">{mergeable ? "可以合并 A 与 B" : "这组记录不能直接合并"}</p>
            <p className="mt-2 text-sm opacity-75">
              {mergeable ? "邮箱相同，公司和城市只是写法不同。" : "公司、城市和邮箱都不一样，名字相同还不够。"}
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {people.map((person, index) => {
            const active = selected.includes(person.id);
            return (
              <button
                key={person.id}
                onClick={() =>
                  setSelected((old) =>
                    old.includes(person.id) ? old.filter((id) => id !== person.id) : [...old, person.id],
                  )
                }
                className={`w-full rounded-2xl border-2 border-ink p-4 text-left shadow-stamp transition-all ${
                  active ? "bg-ink text-cream" : "bg-cream text-ink"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold">{String.fromCharCode(65 + index)} · {person.name}</span>
                  {active && <Check className="h-5 w-5" />}
                </div>
                <p className="mt-2 text-sm opacity-70">{person.company} · {person.city}</p>
                <p className="font-mono text-xs opacity-60">{person.email}</p>
              </button>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
};

type Fact = { id: number; from: NodeId; to: NodeId; relation: string };
const initialFacts: Fact[] = baseEdges.map(([from, to, relation], id) => ({ id, from, to, relation }));

export const SectionKnowledgeChanges: React.FC = () => {
  const [facts, setFacts] = useState(initialFacts);
  const [showForm, setShowForm] = useState(false);
  const nextId = Math.max(-1, ...facts.map((fact) => fact.id)) + 1;
  return (
    <SectionShell num="05" label="edit facts" tone="butter">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-display text-display-lg">事实变了，改对应的线</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            图谱可以逐条增加和删除事实。实际保存时还要记下事实来自哪里、哪天有效；下面只演示增加和删除关系。
          </p>
          <button className="btn-stamp mt-6 bg-white px-4 py-3" onClick={() => setShowForm((value) => !value)}>
            <Plus className="h-4 w-4" /> 添加一条示意事实
          </button>
          {showForm && (
            <button
              className="mt-4 flex w-full items-center justify-between rounded-2xl border-2 border-ink bg-white p-4 text-left shadow-stamp"
              onClick={() => {
                setFacts((old) => [...old, { id: nextId, from: "林然", to: "上海", relation: "常驻" }]);
                setShowForm(false);
              }}
            >
              <span><strong>林然</strong> — 常驻 → <strong>上海</strong></span>
              <Check className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="space-y-3">
          {facts.map((fact) => (
            <div key={fact.id} className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-white p-4 shadow-stamp">
              <Pencil className="h-4 w-4 shrink-0" />
              <p className="flex-1 font-bold">{fact.from} — {fact.relation} → {fact.to}</p>
              <button aria-label="删除事实" onClick={() => setFacts((old) => old.filter((item) => item.id !== fact.id))}>
                <Trash2 className="h-5 w-5 text-coral" />
              </button>
            </div>
          ))}
          <p className="text-xs text-ink/55">示意编辑器：帮助理解增删事实，不会保存数据。</p>
        </div>
      </div>
    </SectionShell>
  );
};

const useCases = [
  { title: "查人物与组织关系", icon: Users, question: "某位负责人还参与了哪些项目？" },
  { title: "查供应链影响", icon: GitBranch, question: "一家供应商停产会影响哪些产品？" },
  { title: "查权限与依赖", icon: Link2, question: "删除这个账号会碰到哪些系统？" },
];

export const SectionGraphUses: React.FC = () => {
  const [active, setActive] = useState(0);
  const CurrentIcon = useCases[active].icon;
  return (
    <SectionShell num="06" label="where it helps" tone="cream">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="font-display text-display-lg">什么时候值得用知识图谱？</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            问题里经常出现「和谁有关」「经过哪些关系」「会影响什么」，图谱就很合适。
          </p>
          <div className="mt-6 space-y-3">
            {useCases.map((item, index) => (
              <button
                key={item.title}
                onClick={() => setActive(index)}
                className={`w-full rounded-xl border-2 border-ink p-4 text-left font-bold ${
                  active === index ? "bg-ink text-cream shadow-stamp" : "bg-white"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="rounded-[28px] border-2 border-ink bg-white p-6 shadow-stamp-xl">
            <CurrentIcon className="h-8 w-8" />
            <p className="mt-5 font-display text-2xl font-bold">{useCases[active].question}</p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-ink bg-butter p-4">
              <Search className="h-5 w-5" />
              <span>先找到起点，再沿关系扩展到相关节点。</span>
            </div>
          </div>
          <div className="mt-6">
            <StampLink
              href="../graphrag/index.html"
              title="接着看《GraphRAG》"
              desc="知识图谱负责把事实连起来；GraphRAG 会利用这些关系替 AI 找资料、组织回答。"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const GraphSvg: React.FC<{
  active: NodeId[];
  edges: [NodeId, NodeId, string][];
}> = ({ active, edges }) => {
  const shown = useMemo(() => new Set(active), [active]);
  return (
    <svg viewBox="0 0 300 230" className="w-full rounded-2xl border-2 border-ink bg-cream" role="img" aria-label="知识图谱示意图">
      <defs>
        <marker id="kg-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill="#241C15" />
        </marker>
      </defs>
      {edges.map(([from, to, relation]) => {
        const [x1, y1] = nodePos[from];
        const [x2, y2] = nodePos[to];
        return (
          <g key={`${from}-${relation}-${to}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#241C15" strokeWidth="2" markerEnd="url(#kg-arrow)" />
            <rect x={(x1 + x2) / 2 - 25} y={(y1 + y2) / 2 - 10} width="50" height="20" rx="10" fill="#fff" stroke="#241C15" strokeWidth="1.5" />
            <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700">{relation}</text>
          </g>
        );
      })}
      {(Object.keys(nodePos) as NodeId[]).map((id, index) => {
        const [x, y] = nodePos[id];
        const visible = shown.has(id);
        return (
          <g key={id} opacity={visible ? 1 : 0.13}>
            <circle cx={x} cy={y} r="28" fill={index % 2 ? "#E07A5F" : "#F4D35E"} stroke="#241C15" strokeWidth="2.5" />
            <text x={x} y={y + 4} textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="11" fontWeight="800" fill={index % 2 ? "#FBEFE3" : "#241C15"}>{id}</text>
          </g>
        );
      })}
    </svg>
  );
};
