import React from "react";
import { ArrowDown, Database, FileText, Search, SlidersHorizontal } from "lucide-react";
import { MiniBadge, StampLink } from "./common";

const points = [
  { icon: FileText, label: "原文", text: "制度、FAQ、产品说明，仍然要留着给人和 AI 读。" },
  { icon: Database, label: "向量", text: "每段文字配一串数字。意思接近，数字方向也接近。" },
  { icon: SlidersHorizontal, label: "条件", text: "来源、时间、部门、权限这些筛选条件一起存。" },
  { icon: Search, label: "检索", text: "问题进来后，先找相似内容，再把原文交给 AI。" },
];

const SectionOpening: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-cream px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <div>
          <p className="eyebrow mb-5">Vector Database · 向量数据库</p>
          <h1 className="font-display text-display-2xl text-ink">向量数据库是什么？</h1>
          <p className="mt-6 inline-block max-w-2xl -rotate-1 border-2 border-ink bg-butter px-4 py-3 text-2xl font-extrabold leading-snug shadow-stamp md:text-3xl">
            向量数据库 = 专门存向量，并快速找相似内容的数据库。
          </p>
          <div className="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-ink/80">
            <p>
              向量是一串数字。文字、图片、商品、用户行为都能先变成向量，意思接近的内容，数字位置也会靠得近。
            </p>
            <p>
              数据库负责把这些向量存起来。你问一句话，它能在很多资料里找出最像的几段，再把原文和来源一起交出来。
            </p>
            <p>
              先看一条员工手册怎么入库，再看用户提问时它怎么被捞回来。
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#store-one-doc" className="btn-stamp bg-ink text-cream">
              继续往下看 <ArrowDown className="h-4 w-4" />
            </a>
            <StampLink
              compact
              href="../embedding/index.html"
              title="先看《Embedding》会更顺"
              desc="那一站讲文字怎么变成向量；这一站接着讲向量怎么存、怎么搜。"
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-8 -top-8 hidden h-32 w-32 rotate-6 border-2 border-ink bg-coral shadow-stamp md:block" />
          <div className="relative border-2 border-ink bg-white p-5 shadow-stamp-xl">
            <div className="mb-4 flex items-center justify-between">
              <MiniBadge dark>query</MiniBadge>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink/45">
                find nearest
              </span>
            </div>
            <div className="rounded-2xl border-2 border-ink bg-butter-tint p-4">
              <p className="font-bold">员工离职后，年假还能折现吗？</p>
              <div className="mt-4 grid gap-3">
                {[
                  ["离职结算规则", "0.94", "match"],
                  ["未休年假折算", "0.89", "match"],
                  ["调休申请流程", "0.52", "skip"],
                ].map(([title, score, kind]) => (
                  <div
                    key={title}
                    className={`flex items-center justify-between rounded-xl border-2 border-ink px-3 py-2 ${
                      kind === "match" ? "bg-white" : "bg-cream text-ink/55"
                    }`}
                  >
                    <span className="font-semibold">{title}</span>
                    <span className="font-mono text-xs font-bold">{score}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {points.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.label} className="rounded-2xl border-2 border-ink bg-cream p-3">
                    <div className="flex items-center gap-2 font-bold">
                      <Icon className="h-4 w-4" />
                      {point.label}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">{point.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionOpening;
