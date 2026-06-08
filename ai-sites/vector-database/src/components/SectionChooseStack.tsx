import React, { useMemo, useState } from "react";
import { Building2, CheckCircle2, Cloud, Database, Search, Server } from "lucide-react";
import { MiniBadge, SectionShell } from "./common";

const options = [
  {
    id: "pgvector",
    name: "pgvector",
    icon: Database,
    scale: "small",
    ops: "own",
    hybrid: "插件搭配",
    fit: "已经在用 Postgres，先把原型跑起来。",
  },
  {
    id: "qdrant",
    name: "Qdrant",
    icon: Server,
    scale: "mid",
    ops: "own",
    hybrid: "向量 + 关键词能力",
    fit: "想要专门的向量服务，又希望运维别太重。",
  },
  {
    id: "milvus",
    name: "Milvus",
    icon: Building2,
    scale: "large",
    ops: "own",
    hybrid: "索引选择多",
    fit: "数据量很大，团队愿意管理一套检索基础设施。",
  },
  {
    id: "pinecone",
    name: "Pinecone",
    icon: Cloud,
    scale: "mid",
    ops: "managed",
    hybrid: "托管向量搜索",
    fit: "想少管机器，优先用托管服务上线。",
  },
  {
    id: "elastic",
    name: "Elasticsearch / OpenSearch",
    icon: Search,
    scale: "mid",
    ops: "own",
    hybrid: "关键词 + 向量",
    fit: "原来就有搜索系统，需要把语义搜索加进去。",
  },
];

const SectionChooseStack: React.FC = () => {
  const [scale, setScale] = useState("mid");
  const [managed, setManaged] = useState(false);
  const [needHybrid, setNeedHybrid] = useState(true);

  const ranked = useMemo(() => {
    return options
      .map((option) => {
        let score = 0;
        if (option.scale === scale) score += 2;
        if (managed && option.ops === "managed") score += 2;
        if (!managed && option.ops === "own") score += 1;
        if (needHybrid && option.hybrid.includes("关键词")) score += 1;
        if (option.id === "pgvector" && scale === "small") score += 1;
        return { ...option, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [scale, managed, needHybrid]);

  return (
    <SectionShell num="07" label="choose a stack" tone="white">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="font-display text-display-lg">选型先问三个小问题</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
            向量数据库没有统一答案。先看数据规模、团队想不想管服务、你是否需要关键词一起查。
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-ink/70">
            这张表是学习用的粗筛。真正上线还要压测你的数据、权限规则和延迟目标。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
          <div className="card-stamp bg-cream p-5">
            <MiniBadge>picker</MiniBadge>
            <div className="mt-5 space-y-5">
              <div>
                <p className="mb-2 font-bold">向量数量</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    ["small", "小"],
                    ["mid", "中"],
                    ["large", "大"],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setScale(id)}
                      className={`rounded-full border-2 border-ink px-3 py-2 text-sm font-bold ${
                        scale === id ? "bg-ink text-cream" : "bg-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center justify-between rounded-2xl border-2 border-ink bg-white p-4 font-bold">
                <span>想少管运维</span>
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-coral"
                  checked={managed}
                  onChange={(event) => setManaged(event.target.checked)}
                />
              </label>
              <label className="flex items-center justify-between rounded-2xl border-2 border-ink bg-white p-4 font-bold">
                <span>要关键词一起查</span>
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-coral"
                  checked={needHybrid}
                  onChange={(event) => setNeedHybrid(event.target.checked)}
                />
              </label>
            </div>
          </div>

          <div className="space-y-3">
            {ranked.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className={`rounded-2xl border-2 border-ink p-4 shadow-stamp ${
                    index === 0 ? "bg-butter" : "bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-cream">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xl font-extrabold">{option.name}</p>
                        {index === 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-white px-2 py-0.5 text-xs font-bold">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            当前更贴
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink/65">{option.fit}</p>
                      <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45">
                        {option.hybrid} · score {option.score}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionChooseStack;
