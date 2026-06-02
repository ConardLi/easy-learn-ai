/**
 * Section 06 · 出问题怎么 debug
 *
 * 反模板：「输入框 + 诊断输出」+「症状 → 处方」 accordion 二档。
 *   - 范式是 input + diagnostic + accordion，跟前面 5 个 section 都不一样
 *   - input 让用户用自己的数（vocab_size 输进去看 ln(V)）—— 这是 patterns.md 的「输入框 + live preview」
 *
 * 内容：
 *   1. 第一步 loss 应等于 ln(vocab_size) · 输入 vocab 看预期
 *   2. 三档症状 → 处方（loss 不动 / loss NaN / loss 抖到不收敛）
 *   3. 一个工程经验法则的小卡：试 1e-5 / 3e-5 / 1e-4 三个
 */
import React, { useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";

const PRESET_VOCABS = [
  { name: "Llama 3.1 / 4", v: 128000 },
  { name: "Qwen 3", v: 151936 },
  { name: "GPT-3", v: 50257 },
  { name: "DeepSeek V3", v: 129280 },
];

type Symptom = {
  id: string;
  title: string;
  cause: string;
  fix: string;
  detail: string;
};

const SYMPTOMS: Symptom[] = [
  {
    id: "stuck",
    title: "loss 几乎不动 / 第一步就停在 ln(V) 附近",
    cause: "lr 太小，参数走半天没挪。",
    fix: "lr ×3 一档一档加，到第一步 loss 开始往下走为止。",
    detail: "如果 ×30 还不动，多半是数据 / 初始化的问题，先查这两样，别只盯着 lr 调。",
  },
  {
    id: "nan",
    title: "loss 第一步爆 NaN / 突然飞到 1e9",
    cause: "lr 太大，第一步参数被推飞到 inf，反向传播算不下去。",
    fix: "lr ÷10。配合 grad clip = 1.0 兜底。",
    detail: "如果连 ÷100 都炸，可能是 fp16 溢出，换 bf16 或加 loss scale。",
  },
  {
    id: "wobble",
    title: "loss 降是降，但抖得像锯齿",
    cause: "lr 偏大，处于「稳/炸」的边界。",
    fix: "lr ÷3，或者加更长的 warmup（5% → 10%），让模型先稳住。",
    detail: "拐点抖很正常；中后段一直抖说明 lr 真的过头。",
  },
];

const SectionDebug: React.FC = () => {
  const [vocabInput, setVocabInput] = useState("128000");
  const [openId, setOpenId] = useState<string | null>("nan");

  const vocab = Number(vocabInput.replace(/[^0-9]/g, "")) || 0;
  const expected = useMemo(() => (vocab > 1 ? Math.log(vocab) : 0), [vocab]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">debug</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-3">
          训出问题，看 lr 还是看数据？
        </h2>
        <p className="max-w-2xl text-[16px] text-ink/75 leading-relaxed mb-6">
          九成 LLM 训练翻车第一秒能看出来 —— 就两个问题：第一步 loss 对不对、loss 会不会 NaN。
          会看这两个数，能省下一整天 debug。
        </p>

        {/* 互链：loss 站（lr ↔ loss · 病曲线诊断） */}
        <a
          href="../loss/index.html"
          className="mb-10 inline-flex items-start gap-3 max-w-2xl px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
          </span>
          <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
            <span className="font-bold text-ink">loss 到底是什么、曲线各种病态长啥样？</span>
            <span className="text-ink/70">
              {" "}
              这站只讲 lr 怎么调 loss；loss 自己怎么读、不收敛 / 过拟合曲线怎么认 —— 去《Loss》那一站。
            </span>
          </span>
        </a>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* 左：第一步 loss 诊断器 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-5 lg:p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ① 第一步 loss 应该是多少
              </div>

              <p className="text-[13.5px] text-ink/75 leading-relaxed mb-4">
                训练刚开始，模型还没学，对下一个词基本是瞎猜。词表里有 N 个词时，瞎猜的第一步 loss
                大约就是 <span className="font-mono">ln(N)</span>（N 就是 vocab_size，词表里词的总数）。
                第一步 loss 落在 ln(N) 附近 → 正常，lr 可以开始动；差很远 → 初始化或数据出错。
              </p>
              <p className="text-[12px] text-ink/55 leading-relaxed mb-4">
                进阶：ln(N) 这个数学上叫 cross-entropy 在均匀分布下的取值，看不懂可以跳过，记住「瞎猜 loss ≈ ln(词表大小)」就够用。
              </p>

              <div className="bg-cream border-2 border-ink rounded-xl p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
                  输入 vocab_size
                </div>
                <input
                  type="text"
                  value={vocabInput}
                  onChange={(e) => setVocabInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white border-2 border-ink rounded-lg font-mono text-[16px] font-bold text-ink focus:outline-none focus:shadow-stamp focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-250"
                  placeholder="128000"
                />

                {/* 4 个 preset */}
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  {PRESET_VOCABS.map((p) => {
                    const on = vocab === p.v;
                    return (
                      <button
                        key={p.name}
                        onClick={() => setVocabInput(String(p.v))}
                        className={[
                          "px-2 py-1.5 border-2 border-ink rounded-md font-mono text-[10.5px] font-bold transition-all duration-250 ease-spring text-left",
                          on
                            ? "bg-ink text-cream shadow-[2px_2px_0_0_#E07A5F]"
                            : "bg-white text-ink/70 hover:bg-cream",
                        ].join(" ")}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-ink/15">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    预期第一步 loss
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-display text-[40px] font-bold text-coral tabular-nums leading-none">
                      {expected > 0 ? expected.toFixed(2) : "—"}
                    </span>
                    <span className="font-mono text-[12px] text-ink/55">≈ ln({vocab.toLocaleString()})</span>
                  </div>
                  {vocab > 1 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <Range label="实测在 ±0.3 内" tone="teal" body={(expected - 0.3).toFixed(2) + " ~ " + (expected + 0.3).toFixed(2)} />
                      <Range label="略偏 · 检查 init" tone="butter" body={"±0.3 ~ ±1"} />
                      <Range label="炸了 / 数据错" tone="coral" body=">±1 或 NaN" />
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/45">
                参考：Karpathy 的 nanoGPT / minLLM 默认初始化都满足这条；偏离往往是 logit scale 没归一。
              </p>
            </div>
          </div>

          {/* 右：症状 -> 处方 + 经验法则 */}
          <div className="lg:col-span-7 space-y-4">
            <div className="card-stamp p-5 lg:p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ② 三种典型症状
              </div>
              <div className="space-y-2">
                {SYMPTOMS.map((s) => {
                  const open = s.id === openId;
                  return (
                    <div key={s.id} className="border-2 border-ink rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenId(open ? null : s.id)}
                        className={[
                          "w-full text-left px-4 py-3 transition-all duration-250 ease-spring flex items-baseline justify-between gap-3",
                          open ? "bg-ink text-cream" : "bg-white text-ink hover:bg-cream",
                        ].join(" ")}
                      >
                        <div className="font-display text-[15px] font-bold leading-snug">{s.title}</div>
                        <span className={`font-mono text-[12px] font-bold tabular-nums ${open ? "text-cream/70" : "text-ink/55"}`}>
                          {open ? "−" : "+"}
                        </span>
                      </button>
                      {open && (
                        <div className="bg-cream px-4 py-3 border-t-2 border-ink space-y-2">
                          <Detail label="为啥" body={s.cause} />
                          <Detail label="怎么改" body={s.fix} />
                          <Detail label="备注" body={s.detail} muted />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 经验法则 */}
            <div className="card-stamp p-5 lg:p-6 bg-butter-tint">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ③ 不知道选哪个？三档先扫一遍
              </div>
              <p className="text-[14px] text-ink/85 leading-relaxed mb-3">
                微调时如果实在没头绪，固定 batch / epoch / 数据，跑三个 lr 各 200 步：
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { lr: "1e-5", verdict: "保守 · SFT 主流", color: "teal" },
                  { lr: "3e-5", verdict: "稳一档 · 多数模型甜区", color: "ink" },
                  { lr: "1e-4", verdict: "激进 · LoRA 起点", color: "coral" },
                ].map((c) => (
                  <div key={c.lr} className="bg-white border-2 border-ink rounded-xl px-3 py-3 text-center">
                    <div className="font-display text-[24px] font-bold tabular-nums text-ink">{c.lr}</div>
                    <div
                      className={[
                        "font-mono text-[10.5px] mt-1",
                        c.color === "coral" ? "text-coral" : c.color === "teal" ? "text-teal" : "text-ink/65",
                      ].join(" ")}
                    >
                      {c.verdict}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[13px] text-ink/70 leading-snug">
                看哪一档 200 步 loss 降得最稳。再用那一档跑全程。
              </p>
              <p className="mt-2 font-mono text-[10px] text-ink/45">
                来源：HuggingFace LoRA cookbook 2026 / Unsloth lr 选型指引
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Range: React.FC<{ label: string; tone: "teal" | "butter" | "coral"; body: string }> = ({ label, tone, body }) => {
  const cls = tone === "teal" ? "bg-teal text-cream" : tone === "coral" ? "bg-coral text-cream" : "bg-butter text-ink";
  return (
    <div className={`px-2 py-2 border-2 border-ink rounded-md ${cls}`}>
      <div className="font-mono text-[9px] uppercase tracking-[0.15em] opacity-75 leading-tight">{label}</div>
      <div className="font-mono text-[11px] font-bold mt-0.5 leading-tight">{body}</div>
    </div>
  );
};

const Detail: React.FC<{ label: string; body: string; muted?: boolean }> = ({ label, body, muted }) => (
  <div className="flex items-baseline gap-2">
    <span className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] ${muted ? "text-ink/40" : "text-ink/55"}`}>
      {label}
    </span>
    <span className={`text-[13px] leading-snug ${muted ? "text-ink/55" : "text-ink/85"}`}>{body}</span>
  </div>
);

export default SectionDebug;
