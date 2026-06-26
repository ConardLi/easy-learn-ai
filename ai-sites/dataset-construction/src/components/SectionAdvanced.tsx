/**
 * SectionAdvanced · 进阶玩法（05 · L3 pill 切换）
 *
 * 交互：pill 切四种进阶用法，每种给一句白话 + 一个「啥时候用」+ 一个迷你示意。
 *   数据蒸馏 / GA 对 / 多轮 / 图文。事实依据 Easy Dataset 实际功能。
 *   蒸馏顺手挂跨站链到 distill；GA 对挂 mga。
 */
import React, { useState } from "react";
import { FlaskConical, Users, MessagesSquare, Image } from "lucide-react";
import StampLink from "./StampLink";

const WAYS = [
  {
    key: "distill",
    icon: FlaskConical,
    label: "数据蒸馏",
    color: "#1B4B5A",
    one: "手里没文档也能造数据：直接让一个更强的大模型，围绕某个主题成批吐问答。",
    when: "当你想快速攒某个领域的数据，但手头没现成资料时。",
    demo: "给一个主题「Python 入门」→ 强模型自动编出几百条相关问答",
    link: { href: "../distill/index.html", title: "蒸馏是什么？", desc: "去《轻松理解 蒸馏》看大模型教小模型这件事。" },
  },
  {
    key: "ga",
    icon: Users,
    label: "GA 对（风格 × 受众）",
    color: "#E07A5F",
    one: "给同一份内容指定「什么风格、讲给谁听」，让生成的问答更多样、不千篇一律。",
    when: "当你担心数据太单调、模型学出来一个腔调时。",
    demo: "同一段知识 ×「严谨/活泼」×「小学生/专家」→ 出好几种问法",
    link: { href: "../mga/index.html", title: "多样性怎么来？", desc: "去《轻松理解 MGA》看靠风格受众扩多样性的思路。" },
  },
  {
    key: "multi",
    icon: MessagesSquare,
    label: "多轮对话",
    color: "#FF4D74",
    one: "不只生成「一问一答」，还能生成「你来我往好几轮」的对话，更接近真实聊天。",
    when: "当你要训的是聊天助手、需要它接得住上下文时。",
    demo: "Q→A→追问→再答→再追问…… 一整段连续对话",
    link: null as null | { href: string; title: string; desc: string },
  },
  {
    key: "image",
    icon: Image,
    label: "图文问答",
    color: "#8a6d1f",
    one: "文档里有图也不浪费：围绕图片生成「看图回答」式的问答，喂给能看图的模型。",
    when: "当你训的是能「看图说话」的多模态模型时。",
    demo: "一张流程图 + 「这张图第二步在做什么？」+ 对应答案",
    link: null,
  },
];

const SectionAdvanced: React.FC = () => {
  const [key, setKey] = useState("distill");
  const w = WAYS.find((x) => x.key === key)!;
  const Icon = w.icon;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Beyond Basics</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          基础跑通后，还有这几招
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          「文档变问答」是主线。除此之外，工具还备了几种花样，帮你的数据集更全、更像样。
          点开各看一眼，知道有这回事就行。
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          {WAYS.map((x) => {
            const on = x.key === key;
            const Ic = x.icon;
            return (
              <button
                key={x.key}
                onClick={() => setKey(x.key)}
                className={[
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-ink font-semibold text-[14.5px] transition-all duration-250 ease-spring",
                  on ? "text-cream shadow-stamp -translate-y-0.5" : "bg-cream text-ink/60 hover:text-ink",
                ].join(" ")}
                style={on ? { backgroundColor: x.color } : undefined}
              >
                <Ic className="h-4 w-4" strokeWidth={2.3} />
                {x.label}
              </button>
            );
          })}
        </div>

        <div key={w.key} className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-enter-fade">
          <div className="lg:col-span-7">
            <div className="card-stamp p-7 h-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink" style={{ backgroundColor: w.color }}>
                  <Icon className="h-5 w-5 text-cream" strokeWidth={2.3} />
                </span>
                <h3 className="font-display font-extrabold text-[22px] text-ink">{w.label}</h3>
              </div>
              <p className="font-sans text-[16.5px] leading-[1.8] text-ink/85">{w.one}</p>
              <div className="mt-4 rounded-2xl border-2 border-ink bg-cream/60 px-5 py-3">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50">啥时候用</span>
                <p className="mt-1 font-sans text-[15px] leading-[1.7] text-ink/80">{w.when}</p>
              </div>
              {w.link && (
                <div className="mt-4">
                  <StampLink href={w.link.href} title={w.link.title} desc={w.link.desc} compact />
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full flex flex-col justify-center" style={{ backgroundColor: `${w.color}12` }}>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-3">一眼示意</div>
              <p className="font-display font-bold text-[18px] leading-[1.6] text-ink">{w.demo}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAdvanced;
