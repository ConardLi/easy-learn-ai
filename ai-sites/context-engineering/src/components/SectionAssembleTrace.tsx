/**
 * SectionAssembleTrace · 走一遍：一次请求的上下文怎么拼出来
 *
 * 交互（L3）：单步 trace，一块块把上下文拼进有限窗口
 * 系统指令 → 挑出来的资料 → 压缩过的历史 → 当前问题 → 满了/超了怎么取舍
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

const BLOCKS = [
  {
    name: "系统指令",
    cat: "Select",
    color: "#1B4B5A",
    size: 18,
    say: "先放最底层的规矩：「你是公司客服助手，只答产品相关问题，语气友好。」",
    note: "这段每次都在，定 AI 的角色和边界。写得精简、稳定，别老变。",
  },
  {
    name: "挑出来的资料",
    cat: "Select",
    color: "#E07A5F",
    size: 30,
    say: "用户问的是退货政策，就只捞「退货」那一段说明放进来，不搬整本手册。",
    note: "这是「挑着放」：用到哪条才放哪条，避免无关内容占地方。",
  },
  {
    name: "压缩过的历史",
    cat: "Compress",
    color: "#F4D35E",
    size: 22,
    say: "前面聊了二十来轮，压成一句：「用户买了 A 型号，三天前到货，想退。」",
    note: "这是「压一压」：旧对话总结成几句，省出空间又不丢关键。",
  },
  {
    name: "当前的问题",
    cat: "Select",
    color: "#FF4D74",
    size: 12,
    say: "最后放上用户这一句：「我这个还能退吗？」",
    note: "真正要回答的问题，放在显眼位置，别被前面的内容埋掉。",
  },
];

const SectionAssembleTrace: React.FC = () => {
  const [i, setI] = useState(0);
  const visible = BLOCKS.slice(0, i + 1);
  const used = visible.reduce((s, b) => s + b.size, 0);
  const cur = BLOCKS[i];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10 bg-white/40">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Assemble</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          走一遍：AI 这次的「眼前」是怎么拼出来的
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[700px]">
          一次请求的上下文，是好几块东西现拼的。一块块看它怎么进窗口、怎么把空间填起来。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 窗口可视化 */}
          <div className="lg:col-span-6">
            <div className="card-stamp p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55">
                  窗口已用
                </span>
                <span className="font-mono text-[13px] font-bold text-coral">{used}%</span>
              </div>
              <div className="h-4 bg-cream border-2 border-ink rounded-full overflow-hidden mb-5">
                <div
                  className="h-full transition-all duration-400 ease-spring"
                  style={{
                    width: `${used}%`,
                    background:
                      "linear-gradient(90deg,#1B4B5A,#E07A5F,#F4D35E,#FF4D74)",
                  }}
                />
              </div>

              <div className="space-y-2.5 min-h-[230px]">
                {visible.map((b, idx) => (
                  <div
                    key={b.name}
                    className="flex items-center gap-3 border-2 border-ink rounded-xl px-4 py-3 shadow-stamp animate-enter-up"
                    style={{ backgroundColor: b.color }}
                  >
                    <span
                      className={[
                        "font-display font-bold text-[15px]",
                        b.color === "#F4D35E" ? "text-ink" : "text-cream",
                      ].join(" ")}
                    >
                      {idx + 1}. {b.name}
                    </span>
                    <span
                      className={[
                        "ml-auto font-mono text-[11px]",
                        b.color === "#F4D35E" ? "text-ink/70" : "text-cream/80",
                      ].join(" ")}
                    >
                      占 {b.size}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 当前块说明 */}
          <div className="lg:col-span-6">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp p-7 min-h-[230px] flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full border-2 border-ink font-display font-bold text-[15px]"
                  style={{
                    backgroundColor: cur.color,
                    color: cur.color === "#F4D35E" ? "#241C15" : "#FBEFE3",
                  }}
                >
                  {cur.name}
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/50">
                  STEP {i + 1} / {BLOCKS.length}
                </span>
              </div>
              <div className="bg-cream border-2 border-ink rounded-2xl px-5 py-4 mb-4">
                <p className="font-serif italic text-[16px] leading-[1.6] text-ink/85">{cur.say}</p>
              </div>
              <p className="font-sans text-[14.5px] leading-[1.7] text-ink/70 mt-auto">{cur.note}</p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setI((v) => Math.max(0, v - 1))}
                disabled={i === 0}
                className="btn-stamp bg-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                上一块
              </button>
              <button
                onClick={() => setI((v) => Math.min(BLOCKS.length - 1, v + 1))}
                disabled={i === BLOCKS.length - 1}
                className="btn-stamp bg-coral text-cream disabled:opacity-30 disabled:cursor-not-allowed"
              >
                下一块
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button onClick={() => setI(0)} className="btn-stamp bg-cream ml-auto">
                <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
                重来
              </button>
            </div>
          </div>
        </div>

        {i === BLOCKS.length - 1 && (
          <div className="mt-8 bg-teal/10 border-2 border-teal rounded-2xl px-6 py-5 max-w-[760px] animate-enter-fade">
            <p className="font-sans text-[15.5px] leading-[1.7] text-ink/80">
              四块拼完，窗口刚好够用、重点突出。AI 拿到这一整包，才能答得又准又稳 ——
              这一拼一拣的功夫，就是上下文工程的日常。
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionAssembleTrace;
