import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Shell, StampLink } from "./Shared";

const steps = [
  { title: "读完输入", body: "模型同时查看“帮我写一句请假消息”这些 Token，弄清现在要完成什么。", mark: "输入已就位" },
  { title: "算候选项", body: "模型给许多可能的下一个 Token 打分。分数越高，接在这里越合适。", mark: "正在打分" },
  { title: "得到概率", body: "概率表示每个候选被选中的可能性，通常用百分比表示。这里“今天”的可能性最高，“您好”和“我”也可能被选中。", mark: "候选已排序" },
  { title: "选出第一个", body: "按当前生成规则选中“今天”。它成为回答的第一个 Token。", mark: "输出：今天" },
];

const SectionFirstPiece: React.FC = () => {
  const [cursor, setCursor] = useState(0);
  const candidates = [
    { name: "今天", value: 72 },
    { name: "您好", value: 18 },
    { name: "我", value: 7 },
    { name: "因", value: 3 },
  ];

  return (
    <Shell
      num="03"
      label="第一个输出"
      title="模型怎样写出第一个 Token？"
      intro={<p>模型每次只决定下一小块写什么。它会看完现有文字，给候选项打分，再选出一个。点按钮走一遍。</p>}
      tone="cream"
    >
      <div className="grid lg:grid-cols-[.78fr_1.22fr] gap-7">
        <div className="card-stamp p-6 flex flex-col">
          <span className="font-mono text-[11px] tracking-widest text-ink/50">STEP {cursor + 1} / {steps.length}</span>
          <h3 className="mt-4 font-display text-3xl font-extrabold">{steps[cursor].title}</h3>
          <p className="mt-4 leading-[1.75] text-ink/70 min-h-[112px]">{steps[cursor].body}</p>
          <div className="mt-5 bg-butter border-2 border-ink rounded-xl px-4 py-3 font-mono text-[12px] font-bold">{steps[cursor].mark}</div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button className="btn-stamp bg-white !px-4" onClick={() => setCursor(Math.max(0, cursor - 1))} disabled={cursor === 0} aria-label="上一步">
              <ChevronLeft className="w-4 h-4" /> 上一步
            </button>
            <button className="btn-stamp bg-ink text-white !px-4" onClick={() => setCursor(Math.min(steps.length - 1, cursor + 1))} disabled={cursor === steps.length - 1}>
              下一步 <ChevronRight className="w-4 h-4" />
            </button>
            <button className="btn-stamp bg-coral !px-4" onClick={() => setCursor(0)} aria-label="重置">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-ink text-white rounded-[2rem] border-2 border-ink shadow-stamp-lg p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-widest text-white/55">NEXT TOKEN</span>
            <span className="w-3 h-3 rounded-full bg-butter animate-pulse-dot" />
          </div>
          <div className="mt-7 space-y-5">
            {candidates.map((item, index) => {
              const visible = cursor >= 2 ? item.value : cursor === 1 ? Math.max(8, 48 - index * 9) : 8;
              return (
                <div key={item.name}>
                  <div className="flex justify-between font-bold text-sm">
                    <span>{item.name}</span><span className="font-mono text-white/60">{cursor >= 2 ? `${item.value}%` : "…"}</span>
                  </div>
                  <div className="mt-2 h-8 rounded-lg border border-white/35 overflow-hidden">
                    <div className={`h-full transition-all duration-400 ${index === 0 && cursor === 3 ? "bg-butter" : "bg-coral"}`} style={{ width: `${visible}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-[12px] text-white/50">概率为示意，只用来展示候选项怎样排队。</p>
        </div>
      </div>
      <div className="mt-7 max-w-[720px]">
        <StampLink href="../transformer/index.html" title="Transformer 站讲模型内部怎样算" compact>
          这站只追踪一次请求。注意力、层与内部计算留给 Transformer 站。
        </StampLink>
      </div>
    </Shell>
  );
};

export default SectionFirstPiece;
