import React, { useMemo, useState } from "react";
import { Search, Shuffle } from "lucide-react";
import { MiniBadge, SectionShell, StampLink } from "./common";

const rows = [
  {
    title: "POL-HR-2047 离职结算规则",
    vector: 72,
    keyword: 96,
    reason: "编号命中，内容也相关",
  },
  {
    title: "员工离职流程总览",
    vector: 91,
    keyword: 42,
    reason: "意思接近，但缺少编号",
  },
  {
    title: "POL-FN-2047 报销规则",
    vector: 46,
    keyword: 92,
    reason: "编号像，主题跑到财务",
  },
  {
    title: "未休年假折算说明",
    vector: 86,
    keyword: 58,
    reason: "语义相关，关键词较少",
  },
];

const SectionHybridSearch: React.FC = () => {
  const [vectorWeight, setVectorWeight] = useState(60);

  const ranked = useMemo(
    () =>
      rows
        .map((row) => ({
          ...row,
          final: Math.round(row.vector * (vectorWeight / 100) + row.keyword * (1 - vectorWeight / 100)),
        }))
        .sort((a, b) => b.final - a.final),
    [vectorWeight],
  );

  return (
    <SectionShell num="06" label="hybrid search" tone="teal">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-4 inline-flex rounded-full border-2 border-ink bg-butter p-2 text-ink shadow-stamp">
            <Shuffle className="h-5 w-5" />
          </div>
          <h2 className="font-display text-display-lg">混合检索把两种分数合在一起</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/82">
            向量分数看意思，关键词分数看字面。很多搜索系统会把两边都跑一遍，再重新排序。
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-cream/72">
            这样用户说法换了能搜到，编号、日期、金额也更稳。向量数据库常把这种组合做成内置能力，或者留接口给搜索服务一起跑。
          </p>
          <div className="mt-6 rounded-2xl border-2 border-ink bg-cream p-5 text-ink shadow-stamp">
            <div className="flex items-center justify-between gap-4">
              <MiniBadge>vector weight</MiniBadge>
              <span className="font-mono text-sm font-bold">{vectorWeight}%</span>
            </div>
            <input
              className="mt-5 w-full accent-coral"
              type="range"
              min={0}
              max={100}
              step={5}
              value={vectorWeight}
              onChange={(event) => setVectorWeight(Number(event.target.value))}
            />
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              往左更看关键词，往右更看语义。示意分数，帮你感受排序变化。
            </p>
          </div>
        </div>

        <div className="border-2 border-ink bg-white p-5 text-ink shadow-stamp-xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <Search className="h-5 w-5" />
              搜：POL-HR-2047 年假折算
            </div>
            <MiniBadge dark>rerank</MiniBadge>
          </div>
          <div className="space-y-3">
            {ranked.map((row, index) => (
              <div key={row.title} className="rounded-2xl border-2 border-ink bg-cream p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">
                      #{index + 1} {row.title}
                    </p>
                    <p className="mt-1 text-sm text-ink/65">{row.reason}</p>
                  </div>
                  <span className="rounded-full border-2 border-ink bg-butter px-3 py-1 font-mono text-xs font-bold">
                    {row.final}
                  </span>
                </div>
                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  <ScoreBar label="向量" value={row.vector} color="bg-teal" />
                  <ScoreBar label="关键词" value={row.keyword} color="bg-coral" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <StampLink
              compact
              href="../rag/index.html"
              title="放进《RAG》里看完整流程"
              desc="这站讲怎么从库里找候选；RAG 那站讲找到后怎么拼给 AI 回答。"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const ScoreBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div>
    <div className="mb-1 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink/55">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-3 rounded-full border-2 border-ink bg-white">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default SectionHybridSearch;
