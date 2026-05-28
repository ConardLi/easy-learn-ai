/**
 * Section 06 · 三个会让你掉坑的事 · 翻面卡片
 *
 * 三张可点击翻面的卡：
 *   - Over-smoothing  · T 太大反而退化
 *   - Capacity Gap   · 学生太小学不来
 *   - Self-distill drift · 用自己生的数据再训自己 → 模式坍缩
 *
 * 跟 quantization S04 的 accordion 完全不同：3D 卡片 flip，每张独立 toggle。
 *
 * 收尾用一条 callout 给硬规则（不写鸡汤）。
 */
import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

type Trap = {
  id: string;
  badge: string;
  title: string;
  hook: string;
  mechanism: string;
  fix: string;
  source: string;
  tone: "coral" | "teal" | "butter";
};

const TRAPS: Trap[] = [
  {
    id: "smooth",
    badge: "Over-smoothing",
    title: "T 拉太大，正确答案被淹了",
    hook: "「T 越大，暗知识越多」—— 这话只对一半。",
    mechanism:
      "T 超过 6 之后，softmax 输出趋于均匀分布。所有类别概率被拉到差不多大，连「该选哪个」的信号都淡掉。学生既学不到 top-1，也学不到次序。",
    fix: "Hinton 论文实测甜区 T ∈ [3, 5]。学生模型越小，T 应越低 —— 小学生消化不了太软的分布。",
    source: "arXiv:1503.02531 · §3 实验",
    tone: "coral",
  },
  {
    id: "gap",
    badge: "Capacity gap",
    title: "学生跟老师差太远，反而学不动",
    hook: "70B 老师 → 1B 学生？多半事倍功半。",
    mechanism:
      "学生容量太小时，无法表达老师那么细的 soft target 分布。强行匹配会让学生陷入 underfit + 学到错误模式两头吃亏的尴尬。",
    fix: "中间塞一个 TA（Teacher Assistant）模型分级蒸馏。或者直接挑同尺寸级别的老师 —— DeepSeek R1 蒸 70B 学生只用 R1 自己，但蒸 1.5B 时改用更小的中间模型筛过的数据。",
    source: "Mirzadeh et al, AAAI 2020 · arXiv:1902.03393",
    tone: "teal",
  },
  {
    id: "drift",
    badge: "Self-distill drift",
    title: "用自己生的数据训自己，会越蒸越偏",
    hook: "代代相传，最后只剩老师最自信那部分。",
    mechanism:
      "如果学生反过来给下一代当老师，每一代都会丢掉一点尾部分布。低概率类别被反复抹除 —— 几代后模型只生成最常见、最安全的输出，多样性塌陷。Shumailov 等称之为 model collapse。",
    fix: "保留一定比例的「真人」数据当锚。或者用 on-policy self-distillation（OPSD），让特权信息进入 teacher 角色，避免走向自我强化的死路。",
    source: "Shumailov et al, Nature 2024 · arXiv:2305.17493",
    tone: "butter",
  },
];

const TONE_BG: Record<Trap["tone"], { front: string; back: string; accent: string }> = {
  coral: { front: "#E07A5F", back: "#241C15", accent: "#FBEFE3" },
  teal: { front: "#1B4B5A", back: "#241C15", accent: "#FBEFE3" },
  butter: { front: "#F4D35E", back: "#241C15", accent: "#FBEFE3" },
};

const SectionTraps: React.FC = () => {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden bg-white border-t-2 border-ink">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">three traps</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          蒸馏不是免费午餐。<br className="hidden lg:block" />
          这{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">三个坑</span>
          </span>
          ，多数人栽过。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          点卡片翻面看「机制 + 怎么躲」。每个坑都是从论文里摘的，不是个人经验。
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {TRAPS.map((t, i) => {
            const isFlipped = !!flipped[t.id];
            const tone = TONE_BG[t.tone];
            return (
              <button
                key={t.id}
                onClick={() => setFlipped((s) => ({ ...s, [t.id]: !s[t.id] }))}
                className="relative w-full text-left aspect-[4/5]"
                style={{ perspective: "1200px" }}
                aria-pressed={isFlipped}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700 ease-spring"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* 正面 */}
                  <div
                    className="absolute inset-0 rounded-3xl border-2 border-ink shadow-stamp-lg p-6 flex flex-col"
                    style={{
                      backfaceVisibility: "hidden",
                      backgroundColor: tone.front,
                      color: t.tone === "butter" ? "#241C15" : "#FBEFE3",
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-cream/15 border border-cream/25">
                        <AlertTriangle className="w-3 h-3" strokeWidth={2.6} style={{ color: t.tone === "butter" ? "#241C15" : "#FBEFE3" }} />
                        <span className="font-mono text-[9.5px] font-bold tracking-[0.12em] uppercase">
                          trap 0{i + 1}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
                        {t.badge}
                      </span>
                    </div>

                    <div className="font-display text-[22px] leading-tight font-bold mb-4">
                      {t.title}
                    </div>

                    <p className="font-display text-[15px] italic leading-snug opacity-90">
                      {t.hook}
                    </p>

                    <div className="mt-auto pt-4 border-t border-cream/20 font-mono text-[10px] uppercase tracking-[0.18em] opacity-70 flex items-center gap-1.5">
                      点一下翻面 <span aria-hidden>↻</span>
                    </div>
                  </div>

                  {/* 背面 */}
                  <div
                    className="absolute inset-0 rounded-3xl border-2 border-ink shadow-stamp-lg p-6 flex flex-col"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundColor: tone.back,
                      color: tone.accent,
                    }}
                  >
                    <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] opacity-65 mb-2">
                      机制
                    </div>
                    <p className="text-[13.5px] leading-relaxed opacity-90 mb-4">
                      {t.mechanism}
                    </p>

                    <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] opacity-65 mb-2">
                      怎么躲
                    </div>
                    <p className="text-[13.5px] leading-relaxed opacity-90">
                      {t.fix}
                    </p>

                    <div className="mt-auto pt-4 border-t border-cream/15 font-mono text-[10px] opacity-55">
                      {t.source}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 底部硬规则 callout */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp p-5 lg:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2">
              hard rule
            </div>
            <p className="font-display text-[18px] lg:text-[22px] leading-snug text-ink font-bold">
              如果老师本身错了，蒸再多次也不会对。<br />
              <span className="text-ink/70 font-normal text-[14.5px] lg:text-[16px]">
                先验证 teacher 的真实误差，再决定蒸不蒸。蒸馏放大老师的好，也放大老师的偏见。
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTraps;
