import React from "react";
import { ArrowDown, MessageSquare, Play, Send } from "lucide-react";

const SectionWhatIsInference: React.FC = () => (
  <section className="min-h-screen bg-coral px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden">
    <div className="max-w-[1120px] mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-16 items-center">
      <div>
        <span className="eyebrow !text-ink/65">Model Inference · 模型推理</span>
        <h1 className="mt-5 font-display text-display-xl font-extrabold">模型推理是什么？</h1>
        <p className="mt-7 font-display font-bold text-[clamp(1.45rem,3vw,2.25rem)] leading-[1.32]">
          <span className="bg-butter px-2 py-1 box-decoration-clone">模型推理 = 把你的话交给已经学好的模型，让它现场生成回答。</span>
        </p>
        <div className="mt-7 space-y-4 max-w-[650px] text-[16px] sm:text-[18px] leading-[1.75] text-ink/80">
          <p>你按下发送，模型开始工作。它读完眼前的文字，再一个接一个地写出回答。</p>
          <p>这里的“推理”说的是模型运行的过程。数学题里的推理能力，是模型能不能把问题想明白。两个意思容易混，先分开记。</p>
        </div>
        <p className="mt-8 font-bold">先看看一句话怎样变成模型能处理的小块。</p>
        <div className="mt-8 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[.12em]">
          <ArrowDown className="w-4 h-4" />
          继续往下看
        </div>
      </div>

      <div className="relative">
        <div className="absolute -top-7 -right-5 w-32 h-32 rounded-full bg-butter border-2 border-ink" />
        <div className="relative bg-cream border-2 border-ink rounded-[2rem] shadow-stamp-xl p-5 sm:p-7 grid-paper">
          <div className="flex items-center justify-between border-b-2 border-ink/15 pb-4">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-coral border border-ink" />
              <span className="w-3 h-3 rounded-full bg-butter border border-ink" />
              <span className="w-3 h-3 rounded-full bg-teal border border-ink" />
            </div>
            <span className="font-mono text-[10px] tracking-widest">一次请求</span>
          </div>
          <div className="py-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-white border-2 border-ink flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </span>
              <div className="bg-white border-2 border-ink rounded-2xl rounded-bl-sm px-4 py-3 font-bold">帮我写一句请假消息</div>
            </div>
            <div className="flex justify-center">
              <span className="w-12 h-12 rounded-full bg-ink text-cream flex items-center justify-center animate-pulse-dot">
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              </span>
            </div>
            <div className="flex items-center justify-end gap-3">
              <div className="bg-butter border-2 border-ink rounded-2xl rounded-br-sm px-4 py-3 font-bold max-w-[290px]">
                今天身体不太舒服，想请假休息一天。
              </div>
              <span className="w-11 h-11 rounded-xl bg-teal text-white border-2 border-ink flex items-center justify-center">
                <Send className="w-5 h-5" />
              </span>
            </div>
          </div>
          <div className="font-mono text-[11px] text-ink/60 border-t-2 border-ink/15 pt-4">
            输入 → 运行模型 → 输出
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SectionWhatIsInference;
