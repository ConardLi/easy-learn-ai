/**
 * SectionWhyHard · 纯手工攒数据集有多累（02 · L2 toggle 对照）
 *
 * 交互：拨动「手工」/「用工具」开关，同一批指标（耗时、出错率、一致性、能攒多少）翻面对比。
 *   让人先疼一下手工的累，才懂为啥要自动化。互链回 训练数据集（看数据从哪来）。
 */
import React, { useState } from "react";
import { Hand, Cog } from "lucide-react";
import StampLink from "./StampLink";

const ROWS = [
  { label: "攒 1 千条要多久", manual: "好几天，写到手软", tool: "个把小时，挂着等" },
  { label: "出错 / 漏写", manual: "人累了就容易写错", tool: "规则统一，少出错" },
  { label: "风格一致性", manual: "今天这样写、明天那样写", tool: "格式由模板锁死" },
  { label: "规模上限", manual: "顶天几千条就崩了", tool: "几万、几十万都行" },
];

const SectionWhyHard: React.FC = () => {
  const [tool, setTool] = useState(false);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Why So Painful</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          一条条手写？真的会写崩
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          训练模型动辄要上万条问答。靠人一条条敲，不光慢，还容易写得忽好忽坏。
          拨一下开关，对比「纯手工」和「用工具」差在哪。
        </p>

        {/* 开关 */}
        <div className="mt-9 inline-flex items-center gap-1 rounded-full border-2 border-ink bg-cream p-1 shadow-stamp">
          <button
            onClick={() => setTool(false)}
            className={[
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-[15px] transition-all duration-250 ease-spring",
              !tool ? "bg-coral text-cream" : "text-ink/55",
            ].join(" ")}
          >
            <Hand className="h-4 w-4" strokeWidth={2.3} />
            纯手工
          </button>
          <button
            onClick={() => setTool(true)}
            className={[
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-[15px] transition-all duration-250 ease-spring",
              tool ? "bg-teal text-cream" : "text-ink/55",
            ].join(" ")}
          >
            <Cog className="h-4 w-4" strokeWidth={2.3} />
            用工具
          </button>
        </div>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ROWS.map((r) => (
            <div key={r.label} className="card-stamp p-5">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                {r.label}
              </div>
              <p
                key={tool ? "t" : "m"}
                className={[
                  "font-display font-bold text-[18px] leading-[1.5] animate-enter-fade",
                  tool ? "text-teal" : "text-coral",
                ].join(" ")}
              >
                {tool ? r.tool : r.manual}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-ink text-cream rounded-2xl px-6 py-5 max-w-[820px]">
          <p className="font-display font-bold text-[16.5px] leading-[1.6]">
            {tool
              ? "用工具是把人腾出来，只做最值钱的那件事：把关质量，剩下的力气活全交给机器。"
              : "手工写到后面最容易开始糊弄，质量越写越飘 —— 这才是真正的坑。"}
          </p>
        </div>

        <div className="mt-8 max-w-[820px]">
          <StampLink
            href="../training-dataset/index.html"
            title="这些文档又是从哪来的？"
            desc="去《轻松理解 训练数据集》，看一份数据集都由哪几类料组成、各从哪儿弄。"
            compact
          />
        </div>
      </div>
    </section>
  );
};

export default SectionWhyHard;
