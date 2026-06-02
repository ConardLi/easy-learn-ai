/**
 * Section 01 · Hero · 暗知识
 *
 * 反模板：进站第一秒就能拖 T。这是蒸馏的核心动作。
 * 区别于 quantization 的 7-pill 离散选择器 —— 这里用真正连续的 slider，
 * 数值范围 1.0 ~ 10.0，让分布从尖到平地"融化"。
 *
 * 视觉锚：5 类概率柱（猫 / 狗 / 虎 / 狐狸 / 沙发）实时被 T 拉平。
 * 副交互：「硬标签 / 软标签」toggle 让用户对比"丢掉的信息"。
 */
import React, { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";

/* 老师对一张「金毛狗」图片的原始 logits —— 它差点就把这张图分错。
   故意挑这种"边界样本"，让暗知识更可见。 */
const CLASSES = [
  { id: "dog", label: "金毛", tone: "ink" as const },
  { id: "cat", label: "猫", tone: "ink" as const },
  { id: "fox", label: "狐狸", tone: "ink" as const },
  { id: "wolf", label: "狼", tone: "ink" as const },
  { id: "lion", label: "狮子", tone: "ink" as const },
];
const LOGITS = [8.0, 4.0, 4.6, 5.2, 1.5];

function softmaxT(logits: number[], T: number) {
  const scaled = logits.map((z) => z / T);
  const m = Math.max(...scaled);
  const exps = scaled.map((z) => Math.exp(z - m));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

/* shannon entropy（log2），衡量分布的"信息含量"。
   T=1 接近 one-hot ≈ 0 bits；分布越软，entropy 越高，能传给学生的暗知识越多。 */
function entropyBits(p: number[]) {
  return -p.reduce((s, pi) => s + (pi > 1e-12 ? pi * Math.log2(pi) : 0), 0);
}

const SectionDarkKnowledge: React.FC = () => {
  const [T, setT] = useState(4);
  const [view, setView] = useState<"soft" | "hard">("soft");

  const probs = useMemo(() => softmaxT(LOGITS, T), [T]);
  const hardProbs = useMemo(() => {
    const idx = LOGITS.indexOf(Math.max(...LOGITS));
    return LOGITS.map((_, i) => (i === idx ? 1 : 0));
  }, []);
  const display = view === "hard" ? hardProbs : probs;
  const ent = useMemo(() => entropyBits(display), [display]);
  const maxBits = Math.log2(CLASSES.length);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动装饰 */}
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-full shadow-stamp" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-9 h-9 bg-teal border-2 border-ink rounded-2xl shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Knowledge Distillation · 知识蒸馏
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              知识蒸馏
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">用一个大模型（teacher 老师）教一个小模型（student 学生）。</span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                平常训练时，小模型学的是数据集里的标准答案 ——「这张图是金毛」。
              </p>
              <p>
                蒸馏换了个学习对象：小模型学的是大模型的完整输出 ——「这张图，金毛 85%、狼 8%、狐狸 5%」。
              </p>
              <p>
                把大模型脑子里那张概率表抄给小模型，小模型能跑出接近大模型的水平，体积却只有几十分之一。
                那些「次要选项也有几分」的信息，论文里叫<strong className="text-ink">暗知识</strong>。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边那张图，就是一个大模型（老师）对「金毛狗」图片的判断。
              拖滑块 <strong className="text-ink">T</strong>（叫温度，数字越大，老师的把握越摊开成一串百分比），
              看那张概率表怎么从尖锐变得平缓。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                拖温度 T，看老师的概率表怎么从尖锐摊平
              </div>
            </div>
          </div>

          {/* 右：温度交互卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 顶部 view toggle */}
              <div className="flex items-center justify-between mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  teacher · output for one image
                </div>
                <div className="inline-flex rounded-full border-2 border-ink overflow-hidden">
                  <button
                    onClick={() => setView("hard")}
                    className={[
                      "px-3 py-1 font-mono text-[11px] font-bold transition-all duration-250",
                      view === "hard" ? "bg-ink text-cream" : "bg-white text-ink/55",
                    ].join(" ")}
                  >
                    硬标签
                  </button>
                  <button
                    onClick={() => setView("soft")}
                    className={[
                      "px-3 py-1 font-mono text-[11px] font-bold transition-all duration-250 border-l-2 border-ink",
                      view === "soft" ? "bg-ink text-cream" : "bg-white text-ink/55",
                    ].join(" ")}
                  >
                    软标签
                  </button>
                </div>
              </div>

              {/* T slider 区 */}
              <div className={view === "hard" ? "opacity-40 pointer-events-none transition-opacity duration-300" : "transition-opacity duration-300"}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ① temperature T
                  </span>
                  <span className="flex items-baseline gap-1">
                    <span className="font-display text-[34px] font-bold text-ink leading-none tabular-nums">
                      {T.toFixed(1)}
                    </span>
                    <span className="font-mono text-[11px] text-ink/50">
                      {T < 1.5 ? "尖锐" : T < 4 ? "偏软" : T < 7 ? "很软" : "几乎均匀"}
                    </span>
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={0.1}
                  value={T}
                  onChange={(e) => setT(Number(e.target.value))}
                  className="w-full accent-coral cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9px] text-ink/40 mt-1">
                  <span>T=1 · one-hot 风格</span>
                  <span>T=10 · 接近均匀</span>
                </div>
              </div>

              {/* 5 类概率横向柱 */}
              <div className="mt-7 grid grid-cols-1 gap-2">
                {CLASSES.map((c, i) => {
                  const p = display[i];
                  const top = i === 0;
                  return (
                    <div key={c.id} className="flex items-center gap-3">
                      <div className="w-12 shrink-0 font-display text-[14px] font-bold text-ink">
                        {c.label}
                      </div>
                      <div className="flex-1 h-6 bg-cream border-2 border-ink rounded-md overflow-hidden relative">
                        <div
                          className={[
                            "h-full transition-all duration-400 ease-spring",
                            top ? "bg-ink" : view === "hard" ? "bg-ink/0" : "bg-coral",
                          ].join(" ")}
                          style={{ width: `${Math.max(p * 100, 0.2)}%` }}
                        />
                        <div className="absolute inset-0 flex items-center px-2">
                          <span
                            className={[
                              "font-mono text-[10px] tabular-nums",
                              top
                                ? "text-cream"
                                : p > 0.05
                                  ? "text-cream"
                                  : "text-ink/55",
                            ].join(" ")}
                            style={{ marginLeft: `${Math.max(Math.min(p * 100 - 10, 86), 2)}%` }}
                          >
                            {(p * 100).toFixed(p < 0.005 ? 2 : 1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* entropy 衡量条 */}
              <div className="mt-6 pt-5 border-t border-ink/10 grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    暗知识含量
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-[26px] font-bold text-coral tabular-nums">
                      {ent.toFixed(2)}
                    </span>
                    <span className="font-mono text-[11px] text-ink/50">bits</span>
                    <span className="font-mono text-[10px] text-ink/40 ml-1">
                      / max {maxBits.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                    <div
                      className="h-full bg-coral transition-all duration-400 ease-spring"
                      style={{ width: `${(ent / maxBits) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    一句话注解
                  </div>
                  <p className="text-[12.5px] text-ink/75 leading-snug">
                    {view === "hard"
                      ? "硬标签只说「是金毛」。0 bits 给学生 —— 学到的全是别人已知的。"
                      : T < 1.5
                        ? "T 太小，分布尖锐到接近 one-hot。学生学不到「金毛和狼有点像」这种事。"
                        : T < 5
                          ? "甜区。次要类别的概率被放大到学生能看见。Hinton 推荐 T ≈ 3-5。"
                          : "T 太大，所有类别概率拉平。连「正确答案」都被淹没了。"}
                  </p>
                </div>
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40">
                概率为示意 · 帮你感受 T 的效果 · 方法出处：Hinton et al. <i>Distilling the Knowledge in a Neural Network</i> · arXiv:1503.02531
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionDarkKnowledge;
