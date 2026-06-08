import React, { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, FileText, Hash, Tags } from "lucide-react";
import { MiniBadge, SectionShell } from "./common";

const steps = [
  {
    title: "切成小段",
    icon: FileText,
    text: "长文档先切成几段。检索时只取相关片段，AI 不用吞完整手册。",
    sample: "离职时，未休年假按员工最近十二个月平均工资折算。",
  },
  {
    title: "算出向量",
    icon: Hash,
    text: "每段文字配一串数字。这里画成 8 格，真实向量常见是几百到几千维。",
    sample: "[0.42, -0.11, 0.78, 0.23, -0.36, 0.64, 0.08, -0.51]",
  },
  {
    title: "带上来源",
    icon: Tags,
    text: "向量旁边还要存原文、文档名、版本、部门、权限。之后才能筛选和引用。",
    sample: "source=员工手册 v2026 · region=中国区 · acl=HR,manager",
  },
  {
    title: "写入索引",
    icon: Check,
    text: "索引会提前整理向量位置。用户提问时，数据库能少看很多无关内容。",
    sample: "node#2147 linked to node#1981, node#2206, node#0784",
  },
];

const docs = [
  "离职时，未休年假按员工最近十二个月平均工资折算。",
  "试用期员工也享有已工作天数对应的年假权益。",
  "跨区调动后，假期规则按新工作地政策执行。",
  "审批系统每周五同步一次剩余假期余额。",
];

const vectorBars = [42, 14, 78, 23, 36, 64, 8, 51];

const SectionStoreOneDoc: React.FC = () => {
  const [step, setStep] = useState(0);
  const [chunk, setChunk] = useState(0);
  const active = steps[step];
  const Icon = active.icon;

  const visibleDocs = useMemo(() => docs.slice(0, Math.max(1, chunk + 1)), [chunk]);

  return (
    <div id="store-one-doc">
      <SectionShell num="01" label="store one document" tone="white">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <h2 className="font-display text-display-lg">一条资料进库，会被拆成四件事</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
              向量数据库里存的通常不是整本文档。它存很多小片段：每片段有原文、有向量，也有筛选条件。
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                className="btn-stamp bg-white px-4 py-3"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                aria-label="上一步"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-mono text-sm font-bold">
                {step + 1} / {steps.length}
              </span>
              <button
                className="btn-stamp bg-butter px-4 py-3"
                onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                aria-label="下一步"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
            <div className="card-stamp p-5">
              <div className="flex items-center justify-between">
                <MiniBadge>chunk size</MiniBadge>
                <span className="font-mono text-xs font-bold text-ink/55">{chunk + 1} 段示意</span>
              </div>
              <input
                className="mt-5 w-full accent-coral"
                type="range"
                min={0}
                max={3}
                value={chunk}
                onChange={(event) => setChunk(Number(event.target.value))}
              />
              <div className="mt-5 space-y-3">
                {visibleDocs.map((doc, index) => (
                  <div key={doc} className="rounded-xl border-2 border-ink bg-cream p-3">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-coral">
                      chunk {index + 1}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">{doc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-2 border-ink bg-butter-tint p-5 shadow-stamp-lg">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-2xl font-extrabold">{active.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/75">{active.text}</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border-2 border-ink bg-white p-4">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink/45">
                  当前看到的内容
                </p>
                <p className="mt-3 text-sm leading-relaxed">{active.sample}</p>
                {step === 1 && (
                  <div className="mt-4 flex items-end gap-2">
                    {vectorBars.map((bar, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center gap-1">
                        <div
                          className="w-full border-2 border-ink bg-teal"
                          style={{ height: `${24 + bar * 0.8}px` }}
                        />
                        <span className="font-mono text-[10px] text-ink/45">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
};

export default SectionStoreOneDoc;
