/**
 * Section 05 · 它存什么、不存什么（分锅）
 *
 * 关键澄清：safetensors 只存「权重数字」。它不存：
 *   - 代码（这正是它安全的原因）
 *   - 模型怎么搭的（网络结构 / 计算图）—— 那是 ONNX 的活
 *   - 量化后的低比特打包细节 + 跑模型要的元信息 —— 那是 GGUF 更擅长的
 *
 * 交互：一组勾选项，逐个判断「safetensors 存不存这个」，给出对错反馈 + 谁负责。
 */
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import StampLink from "./StampLink";

type Item = {
  label: string;
  stored: boolean;
  who: string;
};

const ITEMS: Item[] = [
  { label: "每个权重的具体数字", stored: true, who: "safetensors 的本职：就是存这个。" },
  { label: "每个张量的名字、形状、数据类型", stored: true, who: "存在开头的 JSON 目录里。" },
  { label: "能运行的代码 / 脚本", stored: false, who: "故意不存。不存代码，才谈得上安全。" },
  { label: "模型是怎么搭起来的（网络结构）", stored: false, who: "这是 ONNX 的活：它存的是一张「计算图」—— 一步步该做哪些运算、按什么顺序连起来。" },
  { label: "对话模板、分词器配置这些运行元信息", stored: false, who: "本地跑模型时，这些 GGUF 会一起打包进去。" },
];

const SectionWhatStores: React.FC = () => {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const allDone = Object.keys(revealed).length === ITEMS.length;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">what's inside</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          它只存数字，别的都交给别人
        </h2>
        <p className="max-w-2xl text-ink/70 text-[16px] mb-8">
          safetensors 把事情做得很窄：只负责又安全又快地存权重数字。下面每一项，先猜「它存不存」，再点开看答案。
        </p>

        <div className="space-y-2.5 mb-8">
          {ITEMS.map((it, idx) => {
            const open = revealed[idx];
            return (
              <div
                key={idx}
                className="bg-white border-2 border-ink rounded-2xl shadow-stamp overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <span className="font-display text-[15px] font-bold text-ink flex-1">{it.label}</span>
                  {!open ? (
                    <button
                      onClick={() => setRevealed((r) => ({ ...r, [idx]: true }))}
                      className="px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full font-bold text-[12px] hover:bg-butter transition-colors shrink-0"
                    >
                      存吗？点开
                    </button>
                  ) : (
                    <span
                      className={[
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-ink font-bold text-[12px] shrink-0",
                        it.stored ? "bg-teal text-cream" : "bg-coral text-cream",
                      ].join(" ")}
                    >
                      {it.stored ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : <X className="w-3.5 h-3.5" strokeWidth={3} />}
                      {it.stored ? "存" : "不存"}
                    </span>
                  )}
                </div>
                {open && (
                  <div className="px-4 py-3 bg-cream border-t-2 border-ink/10 text-[14px] text-ink/75 leading-relaxed animate-enter-fade">
                    {it.who}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allDone && (
          <div className="px-5 py-4 bg-ink text-cream rounded-2xl border-2 border-ink mb-8 animate-enter-fade">
            <p className="text-[15px] leading-relaxed">
              看出来了吧：safetensors 只管「存数字」。模型结构归 ONNX，本地运行打包归 GGUF。它们各管一段，经常一起用。
            </p>
          </div>
        )}

        {/* 跨站分锅 */}
        <div className="grid md:grid-cols-2 gap-4">
          <StampLink
            href="../onnx/index.html"
            title="ONNX →"
            desc="存的是整张计算图（模型怎么搭、怎么算），用来跨框架转换部署。"
          />
          <StampLink
            href="../gguf/index.html"
            title="GGUF →"
            desc="本地跑模型用的打包格式，权重 + 量化 + 运行元信息一锅端。"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionWhatStores;
