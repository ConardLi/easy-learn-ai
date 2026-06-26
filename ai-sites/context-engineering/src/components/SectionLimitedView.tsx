/**
 * SectionLimitedView · AI 的「眼前」是有限的
 *
 * 铺垫 context window（聊天窗口就这么大，满了要丢）+ 互链 context-window 站
 * 交互：一个会被填满的窗口可视化（点按钮往里塞消息，看它怎么满、怎么挤掉旧的）
 */
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import StampLink from "./StampLink";

const CAP = 8; // 窗口最多放几条（示意）

const SectionLimitedView: React.FC = () => {
  const [items, setItems] = useState<number[]>([1, 2, 3]);
  const [next, setNext] = useState(4);

  const add = () => {
    setItems((prev) => {
      const arr = [...prev, next];
      // 满了就挤掉最旧的
      return arr.length > CAP ? arr.slice(arr.length - CAP) : arr;
    });
    setNext((n) => n + 1);
  };
  const reset = () => {
    setItems([1, 2, 3]);
    setNext(4);
  };

  const full = items.length >= CAP;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10 bg-white/40">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">A Finite View</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          AI 的「眼前」，到底有多大？
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[700px]">
          AI 每次能一起读进去的内容是有上限的 —— 这个上限有个名字，叫{" "}
          <span className="font-bold text-ink">上下文窗口（context window）</span>。
          可以把它想成一张就这么大的桌子：东西摆满了，再想放新的，就得先把旧的挪走。
          点下面的按钮往里塞消息，看它塞满之后会怎样。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="card-stamp p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55">
                  上下文窗口 · 最多放 {CAP} 条
                </span>
                <span
                  className={[
                    "font-mono text-[12px] font-bold",
                    full ? "text-pop" : "text-ink/60",
                  ].join(" ")}
                >
                  {items.length} / {CAP} {full && "· 满了"}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 min-h-[160px] content-start">
                {items.map((id) => (
                  <div
                    key={id}
                    className="h-16 bg-coral border-2 border-ink rounded-xl shadow-stamp flex items-center justify-center font-display font-bold text-cream text-[14px] animate-enter-pop"
                  >
                    #{id}
                  </div>
                ))}
                {Array.from({ length: CAP - items.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="h-16 border-2 border-dashed border-ink/25 rounded-xl"
                  />
                ))}
              </div>

              <div className="mt-5 flex gap-3">
                <button onClick={add} className="btn-stamp bg-teal text-cream">
                  <Plus className="w-4 h-4" strokeWidth={2.5} />
                  塞一条新消息
                </button>
                <button onClick={reset} className="btn-stamp bg-cream">
                  <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                  清空
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5">
              <div className="font-display font-bold text-[18px] text-ink mb-2">
                满了之后，旧的会被挤掉
              </div>
              <p className="font-sans text-[15px] leading-[1.7] text-ink/75">
                你一直塞，桌子满了，最早那几条就被推出去了 —— AI 再也看不到它们。
                如果被挤掉的恰好是关键信息，它就开始忘事、答非所问。
              </p>
            </div>
            <div className="bg-butter/40 border-2 border-ink rounded-2xl p-5">
              <div className="font-display font-bold text-[18px] text-ink mb-2">
                所以「放什么」成了门手艺
              </div>
              <p className="font-sans text-[15px] leading-[1.7] text-ink/75">
                桌子就这么大，你不能什么都往上堆。把最该让 AI 看到的放上去、
                没用的挡在外面 —— 这正是上下文工程要解决的事。
              </p>
            </div>
          </div>
        </div>

        {/* 互链 context-window */}
        <div className="mt-8 max-w-[760px]">
          <StampLink
            href="../context-window/index.html"
            title="想把「这张桌子」本身搞透？"
            desc="去《轻松理解 Context Window》，专讲这个窗口怎么计大小、为啥会满、满了具体怎么处理。"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionLimitedView;
