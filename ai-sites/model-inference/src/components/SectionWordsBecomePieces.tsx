import React, { useMemo, useState } from "react";
import { Scissors } from "lucide-react";
import { Shell, StampLink } from "./Shared";

const colors = ["bg-butter", "bg-white", "bg-coral", "bg-butter-soft", "bg-white"];

const splitText = (text: string) => {
  const cleaned = text.trim() || "今天 北京 天气 怎么样";
  return cleaned.match(/[\u4e00-\u9fff]{1,2}|[a-zA-Z]+|\d+|[^\s]/g)?.slice(0, 18) ?? [];
};

const SectionWordsBecomePieces: React.FC = () => {
  const [text, setText] = useState("帮我写一句请假消息");
  const pieces = useMemo(() => splitText(text), [text]);

  return (
    <Shell
      num="02"
      label="文字先切小块"
      title="一句话怎样进入模型？"
      intro={<p>模型直接处理数字。你的文字会先被切成小块，每一块再换成一个编号。这样的小块叫 <strong className="text-ink">Token</strong>。一个 Token 可能是一个字、半个词或一个标点。</p>}
      tone="white"
    >
      <div className="grid lg:grid-cols-[1fr_.82fr] gap-7 items-start">
        <div className="card-stamp p-5 sm:p-7">
          <label className="font-mono text-[11px] tracking-[.15em] uppercase text-ink/55">输入一句话</label>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value.slice(0, 40))}
            className="mt-3 w-full min-h-[108px] bg-cream border-2 border-ink rounded-2xl p-4 font-bold outline-none focus:shadow-stamp transition-shadow"
          />
          <div className="mt-6 flex items-center gap-2 font-bold">
            <Scissors className="w-5 h-5" />
            切开后
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {pieces.map((piece, index) => (
              <span key={`${piece}-${index}`} className={`${colors[index % colors.length]} border-2 border-ink rounded-lg px-3 py-2 shadow-[2px_2px_0_#241C15]`}>
                <span className="font-bold">{piece}</span>
                <span className="block font-mono text-[9px] text-ink/55 mt-0.5">#{1000 + index * 137}</span>
              </span>
            ))}
          </div>
          <p className="mt-5 text-[13px] text-ink/60">这里的切法和编号是示意。不同模型会用不同的切分规则。</p>
        </div>

        <div className="space-y-5">
          <div className="bg-teal text-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
            <span className="font-mono text-[11px] tracking-widest text-white/65">模型收到的样子</span>
            <p className="mt-3 font-mono text-[18px] leading-loose break-words">
              [{pieces.map((_, index) => 1000 + index * 137).join(", ")}]
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/80">每个编号还会换成一组供模型计算的数字。模型内部怎样处理这些数字，留到 Transformer 站再讲。</p>
          </div>
          <StampLink href="../token/index.html" title="Token 站专门讲怎么切">
            这里先记住“文字要切成小块”。账单为什么按 Token 算、中文和英文为什么数量不同，去那边继续看。
          </StampLink>
        </div>
      </div>
    </Shell>
  );
};

export default SectionWordsBecomePieces;
