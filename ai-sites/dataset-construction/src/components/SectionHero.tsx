/**
 * SectionHero · 数据集构建是什么？
 *
 * Hero 六段骨架。一句话定义只用日常词：「把一堆现成的文档，自动变成模型能直接学的一问一答」。
 * 视觉锚：左边一摞文档 → 中间一台「机器」→ 右边吐出一张张「一问一答」卡片。butter + teal 主色。
 * Hero 前段不甩术语；Easy Dataset / 问答对 等名词在铺垫之后才点名。
 */
import React from "react";
import { ArrowDown, FileText, Cog, MessageSquare } from "lucide-react";

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div className="absolute top-24 right-[7%] hidden md:grid grid-cols-3 gap-2 pointer-events-none opacity-50">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-ink/30" />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Dataset Construction · 数据集构建
            </span>
          </div>

          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            数据集构建
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-teal">？</span>
            </span>
          </h1>

          <p className="font-display font-bold text-[clamp(1.35rem,2.3vw,1.95rem)] leading-[1.42] mt-9 max-w-[720px] text-ink">
            数据集构建是{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">把一堆现成的文档，攒成模型能直接拿去学的材料</span>
            </span>
            ，而且尽量让机器自动来攒。
          </p>

          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              你手里可能有一摞资料：产品手册、客服记录、行业文档。模型没法直接「读」这一摞 ——
              它要学的，是一条条整理好的「一问一答」。
              <span className="font-bold text-ink">把文档变成成千上万条这样的问答，就是数据集构建。</span>
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              一条条手写当然行，但几万条写下来要累垮人。所以现在更常见的做法是：
              让一个工具把文档拆开、自动出题、自动作答，人只在旁边把关。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              这份手册就用一个开源工具
              <span className="font-bold text-ink"> Easy Dataset </span>
              当例子，带你看这条「文档进、问答出」的流水线到底怎么跑。
            </p>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先体会一下纯手工攒数据有多累，再跟着工具走一遍六步流程，看文档怎么一步步变成能用的问答。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>继续往下看</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* 视觉锚：文档 → 机器 → 问答 */}
        <div className="lg:col-span-5">
          <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/45 mb-4">
              文档进 → 问答出
            </div>

            {/* 文档堆 */}
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-cream">
                <FileText className="h-4.5 w-4.5 text-ink" strokeWidth={2.2} />
              </span>
              <div className="flex-1 space-y-1">
                {["产品手册.pdf", "客服记录.txt", "行业白皮书.md"].map((t) => (
                  <div key={t} className="rounded-lg border-2 border-ink bg-cream/60 px-3 py-1.5 font-mono text-[11.5px] text-ink/70">
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* 机器 */}
            <div className="my-3 flex items-center justify-center gap-2">
              <div className="h-5 w-0.5 bg-ink/30" />
            </div>
            <div className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-teal px-4 py-3">
              <Cog className="h-5 w-5 text-cream animate-spin-slow" strokeWidth={2.2} />
              <span className="font-display font-bold text-[14px] text-cream">Easy Dataset 自动加工</span>
            </div>
            <div className="my-3 flex items-center justify-center">
              <div className="h-5 w-0.5 bg-ink/30" />
            </div>

            {/* 问答卡 */}
            <div className="space-y-2">
              {[
                { q: "怎么退货？", a: "在订单页点「申请退货」…" },
                { q: "支持哪些支付？", a: "支持微信、支付宝…" },
              ].map((qa) => (
                <div key={qa.q} className="rounded-2xl border-2 border-ink bg-butter px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="h-3 w-3 text-ink" strokeWidth={2.4} />
                    <span className="font-display font-bold text-[13px] text-ink">Q：{qa.q}</span>
                  </div>
                  <div className="mt-0.5 font-sans text-[12px] text-ink/70 leading-snug">A：{qa.a}</div>
                </div>
              ))}
              <div className="text-center font-mono text-[10.5px] text-ink/45">…成千上万条，自动攒出来</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
