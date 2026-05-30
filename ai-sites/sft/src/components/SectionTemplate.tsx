/**
 * Section 02 · Chat template 拼装器
 *
 * SFT 的灵魂动作：把人写的 (instruction, response) 用特殊 token 包起来。
 * 不同模型家族包的方式完全不同 —— 用错 template 训出来的模型会胡言乱语。
 *
 * 交互（L4）：用户改 q / a 文本 + 切 4 家模板 → 实时看实际拼出来的 token 序列。
 */
import React, { useState, useMemo } from "react";

type Family = "chatml" | "llama3" | "alpaca" | "gemma";

const FAMILIES: { id: Family; label: string; models: string }[] = [
  { id: "chatml", label: "ChatML", models: "OpenAI · Qwen 3 · SmolLM2" },
  { id: "llama3", label: "Llama 3", models: "Llama 3 / 4 · Llama-Factory 默认" },
  { id: "alpaca", label: "Alpaca", models: "2023 经典 · 学术常见" },
  { id: "gemma", label: "Gemma", models: "Google Gemma 2 / 3" },
];

type Segment = {
  text: string;
  /** special = 控制 token / system = 系统提示 / user = 用户提问 / asst = 助手回答 */
  kind: "special" | "system" | "user" | "asst" | "newline";
};

function buildSequence(
  family: Family,
  sys: string,
  q: string,
  a: string,
): Segment[] {
  const NL: Segment = { text: "↵\n", kind: "newline" };
  if (family === "chatml") {
    return [
      { text: "<|im_start|>", kind: "special" },
      { text: "system", kind: "system" },
      NL,
      { text: sys, kind: "system" },
      { text: "<|im_end|>", kind: "special" },
      NL,
      { text: "<|im_start|>", kind: "special" },
      { text: "user", kind: "user" },
      NL,
      { text: q, kind: "user" },
      { text: "<|im_end|>", kind: "special" },
      NL,
      { text: "<|im_start|>", kind: "special" },
      { text: "assistant", kind: "asst" },
      NL,
      { text: a, kind: "asst" },
      { text: "<|im_end|>", kind: "special" },
    ];
  }
  if (family === "llama3") {
    return [
      { text: "<|begin_of_text|>", kind: "special" },
      { text: "<|start_header_id|>", kind: "special" },
      { text: "system", kind: "system" },
      { text: "<|end_header_id|>", kind: "special" },
      NL,
      { text: sys, kind: "system" },
      { text: "<|eot_id|>", kind: "special" },
      { text: "<|start_header_id|>", kind: "special" },
      { text: "user", kind: "user" },
      { text: "<|end_header_id|>", kind: "special" },
      NL,
      { text: q, kind: "user" },
      { text: "<|eot_id|>", kind: "special" },
      { text: "<|start_header_id|>", kind: "special" },
      { text: "assistant", kind: "asst" },
      { text: "<|end_header_id|>", kind: "special" },
      NL,
      { text: a, kind: "asst" },
      { text: "<|eot_id|>", kind: "special" },
    ];
  }
  if (family === "alpaca") {
    return [
      {
        text: "Below is an instruction that describes a task. Write a response.",
        kind: "system",
      },
      NL,
      { text: "### Instruction:", kind: "special" },
      NL,
      { text: q, kind: "user" },
      NL,
      { text: "### Response:", kind: "special" },
      NL,
      { text: a, kind: "asst" },
      { text: "</s>", kind: "special" },
    ];
  }
  // gemma
  return [
    { text: "<bos>", kind: "special" },
    { text: "<start_of_turn>", kind: "special" },
    { text: "user", kind: "user" },
    NL,
    { text: sys + " " + q, kind: "user" },
    { text: "<end_of_turn>", kind: "special" },
    NL,
    { text: "<start_of_turn>", kind: "special" },
    { text: "model", kind: "asst" },
    NL,
    { text: a, kind: "asst" },
    { text: "<end_of_turn>", kind: "special" },
  ];
}

const SectionTemplate: React.FC = () => {
  const [fam, setFam] = useState<Family>("chatml");
  const [sys, setSys] = useState("你是一个简洁的助手。");
  const [q, setQ] = useState("员工年假怎么算？");
  const [a, setA] = useState("入职满 1 年起，每年 5 天；满 10 年起，每年 10 天。");

  const segs = useMemo(() => buildSequence(fam, sys, q, a), [fam, sys, q, a]);

  const tokenCount =
    segs.filter((s) => s.kind !== "newline").length +
    Math.ceil((sys.length + q.length + a.length) / 2);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        {/* anchor */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">CHAT TEMPLATE</span>
        </div>

        <h2 className="font-display text-display-lg mb-3">
          SFT 真正在做的事，是把文本包起来
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-10">
          每个模型家族都有自己的「打招呼方式」—— 一堆特殊 token，告诉模型「下面这段是 user 说的，那段是 assistant 该接的」。SFT 的训练数据就是这种拼好的字符串。用错家族的格式，训出来一定胡言乱语。
        </p>

        {/* 家族切换 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FAMILIES.map((f) => {
            const on = f.id === fam;
            return (
              <button
                key={f.id}
                onClick={() => setFam(f.id)}
                className={[
                  "px-4 py-2 rounded-full border-2 border-ink font-mono text-[12px] font-bold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink/70 hover:bg-cream",
                ].join(" ")}
              >
                {f.label}
                <span className="ml-1.5 opacity-60 font-normal text-[10px]">
                  {f.models.split(" · ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* 左：输入 */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                system 提示
              </label>
              <input
                value={sys}
                onChange={(e) => setSys(e.target.value)}
                className="w-full px-3 py-2 bg-white border-2 border-ink rounded-lg font-sans text-[13.5px] focus:outline-none focus:shadow-stamp transition-shadow"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                user 提问 · instruction
              </label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full px-3 py-2 bg-white border-2 border-ink rounded-lg font-sans text-[13.5px] focus:outline-none focus:shadow-stamp transition-shadow"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                assistant 回答 · response
              </label>
              <textarea
                value={a}
                onChange={(e) => setA(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-white border-2 border-ink rounded-lg font-sans text-[13.5px] focus:outline-none focus:shadow-stamp transition-shadow resize-none"
              />
            </div>

            <div className="mt-5 p-3.5 bg-white border-2 border-ink rounded-xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                当前家族 · {FAMILIES.find((f) => f.id === fam)!.label}
              </div>
              <div className="font-sans text-[12.5px] text-ink/75 leading-relaxed">
                {fam === "chatml" &&
                  "<|im_start|> 标 turn 头，<|im_end|> 收尾。OpenAI 2023 提出，现在事实标准。"}
                {fam === "llama3" &&
                  "用 <|start_header_id|> / <|end_header_id|> 包角色，<|eot_id|> 结束。Llama 3 / 4 默认。"}
                {fam === "alpaca" &&
                  "纯文本 ### Instruction / ### Response 标记。2023 Stanford 提出，已被取代但论文里高频出现。"}
                {fam === "gemma" &&
                  "<start_of_turn> / <end_of_turn>。Gemma 没有 system 角色，要拼到 user 里。"}
              </div>
            </div>
          </div>

          {/* 右：实际拼出的字符串 */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ↪ 实际喂给模型的 token 序列
                </div>
                <div className="font-mono text-[10px] text-ink/45">
                  约 {tokenCount} tokens
                </div>
              </div>

              <div
                key={fam}
                className="bg-cream border-2 border-ink rounded-xl p-4 font-mono text-[12px] leading-[1.85] animate-enter-fade max-h-[360px] overflow-auto"
              >
                {segs.map((s, i) => {
                  if (s.kind === "newline") {
                    return (
                      <span key={i} className="text-ink/30">
                        {s.text.replace("↵\n", "↵")}
                        <br />
                      </span>
                    );
                  }
                  const cls =
                    s.kind === "special"
                      ? "bg-coral text-white px-1 py-0.5 rounded font-bold"
                      : s.kind === "system"
                      ? "text-teal font-semibold"
                      : s.kind === "user"
                      ? "text-ink font-semibold"
                      : "bg-butter-tint text-ink px-1 py-0.5 rounded font-semibold";
                  return (
                    <span key={i} className={cls}>
                      {s.text}
                    </span>
                  );
                })}
              </div>

              {/* 色板 legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                <Legend color="bg-coral" label="special token" />
                <Legend color="bg-teal" textColor dotted label="system 段" />
                <Legend color="bg-ink" textColor dotted label="user 段" />
                <Legend color="bg-butter-tint" border label="assistant 段" />
              </div>

              <p className="mt-4 font-mono text-[10.5px] text-ink/50 leading-relaxed">
                source · OpenAI ChatML spec / huggingface tokenizer chat_templating / Stanford Alpaca repo / Gemma model card
              </p>
            </div>

            <div className="mt-4 p-4 bg-pop/8 border-2 border-pop rounded-xl">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-pop">
                  实战提醒
                </span>
              </div>
              <p className="font-sans text-[13px] text-ink leading-relaxed">
                训和推必须用<strong>同一套 chat template</strong>。
                如果用 ChatML 训了，推理时用 Llama 3 那套拼 prompt，模型当场翻车 ——
                同一个权重，换个壳子说话不认。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function Legend({
  color,
  label,
  dotted,
}: {
  color: string;
  label: string;
  textColor?: boolean;
  border?: boolean;
  dotted?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={[
          "w-4 h-4 rounded border-2 border-ink",
          color,
          dotted ? "border-dashed" : "",
        ].join(" ")}
      />
      <span className="font-mono text-[10.5px] text-ink/65">{label}</span>
    </div>
  );
}

export default SectionTemplate;
