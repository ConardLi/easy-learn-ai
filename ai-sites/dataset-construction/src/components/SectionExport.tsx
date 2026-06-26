/**
 * SectionExport · 导出即用（06 · L3 toggle 切格式）
 *
 * 交互：toggle 切 Alpaca / ShareGPT 两种导出格式，同一条问答实时变成对应的 JSON 结构。
 *   再点出「一键对接 LLaMA Factory」一句话落地。让人看到「成品长啥样、怎么直接用」。
 *   互链到 finetune（导出之后就是拿去微调）。
 */
import React, { useState } from "react";
import { FileJson, Rocket } from "lucide-react";
import StampLink from "./StampLink";

const SAMPLE = { q: "你们支持退货吗？", a: "支持，本店提供 7 天无理由退货。" };

const FORMATS = [
  {
    key: "alpaca",
    label: "Alpaca",
    note: "字段简单，单轮问答最常用。",
    json: `{
  "instruction": "你们支持退货吗？",
  "input": "",
  "output": "支持，本店提供 7 天无理由退货。"
}`,
  },
  {
    key: "sharegpt",
    label: "ShareGPT",
    note: "按「谁说的」分角色，天然适合多轮对话。",
    json: `{
  "conversations": [
    { "from": "human", "value": "你们支持退货吗？" },
    { "from": "gpt",   "value": "支持，本店提供 7 天无理由退货。" }
  ]
}`,
  },
];

const SectionExport: React.FC = () => {
  const [key, setKey] = useState("alpaca");
  const f = FORMATS.find((x) => x.key === key)!;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10 bg-teal/5">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Ready To Train</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          导出来的，就是能直接训的文件
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          攒好的问答得变成训练框架认识的格式。下面这条问答，切换格式看看它导出后长啥样 ——
          这就是你最后拿去喂模型的东西。
        </p>

        {/* 原始问答 */}
        <div className="mt-9 rounded-2xl border-2 border-ink bg-butter px-5 py-4 max-w-[680px]">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-1">一条成品问答</div>
          <p className="font-display font-bold text-[15.5px] text-ink">Q：{SAMPLE.q}</p>
          <p className="mt-1 font-sans text-[14.5px] text-ink/80">A：{SAMPLE.a}</p>
        </div>

        {/* 格式切换 */}
        <div className="mt-7 inline-flex items-center gap-1 rounded-full border-2 border-ink bg-cream p-1 shadow-stamp">
          {FORMATS.map((x) => {
            const on = x.key === key;
            return (
              <button
                key={x.key}
                onClick={() => setKey(x.key)}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-[15px] transition-all duration-250 ease-spring",
                  on ? "bg-ink text-cream" : "text-ink/55",
                ].join(" ")}
              >
                <FileJson className="h-4 w-4" strokeWidth={2.3} />
                {x.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div key={f.key} className="rounded-2xl border-2 border-ink bg-ink shadow-stamp overflow-hidden animate-enter-fade">
              <div className="flex items-center justify-between px-4 py-2 border-b-2 border-cream/15">
                <span className="font-mono text-[11px] text-cream/70">dataset.{f.key}.json</span>
                <span className="font-mono text-[10px] text-cream/45 uppercase tracking-[0.18em]">{f.label} 格式</span>
              </div>
              <pre className="px-5 py-4 font-mono text-[13px] leading-[1.7] text-cream/90 overflow-x-auto">
                {f.json}
              </pre>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">这个格式的特点</div>
              <p className="font-sans text-[15.5px] leading-[1.75] text-ink/85 flex-1">{f.note}</p>
              <p className="mt-3 font-sans text-[14px] leading-[1.7] text-ink/65">
                两种都是训练框架通用的写法。选哪种，看你后面用的工具吃哪种、以及是不是多轮。
              </p>
            </div>
          </div>
        </div>

        {/* 一键对接 */}
        <div className="mt-8 rounded-3xl border-2 border-ink bg-pop/10 shadow-stamp p-7 max-w-[900px]">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-pop">
              <Rocket className="h-5 w-5 text-cream" strokeWidth={2.3} />
            </span>
            <div>
              <h3 className="font-display font-extrabold text-[20px] text-ink">还能一键对接训练框架</h3>
              <p className="mt-2 font-sans text-[15.5px] leading-[1.75] text-ink/80 max-w-[640px]">
                Easy Dataset 能直接把导出的数据接进 LLaMA Factory 这类微调工具 ——
                不用手动搬文件、改配置，攒完数据接着就能开训。
              </p>
            </div>
          </div>
          <div className="mt-5">
            <StampLink
              href="../finetune/index.html"
              title="导出之后做什么？"
              desc="去《轻松理解 微调》看这批数据怎么把通用模型调成你要的样子。"
              compact
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionExport;
