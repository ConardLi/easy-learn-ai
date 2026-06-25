import React from "react";
import { ArrowDown, Check, FileClock } from "lucide-react";

const NOTES = ["你好", "，", "帮我", "写一封", "请假邮件"];

const SectionWhatIsCache: React.FC = () => (
  <section className="relative min-h-[92vh] overflow-hidden bg-teal px-4 py-16 text-cream sm:px-6 lg:px-8 lg:py-20">
    <div className="relative mx-auto grid max-w-[1160px] items-center gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="eyebrow !text-butter-soft">Key-Value Cache · 键值缓存</div>
        <h1 className="mt-5 font-display text-display-2xl font-extrabold text-cream">
          KV Cache 是什么？
        </h1>
        <p className="mt-7 max-w-[720px] font-display text-[clamp(1.45rem,3vw,2.25rem)] font-bold leading-[1.25]">
          <span className="box-decoration-clone bg-butter px-2 text-ink">
            KV Cache = 模型留下已经算好的阅读笔记，接着写时直接拿来用。
          </span>
        </p>
        <div className="mt-8 max-w-[650px] space-y-4 text-[16px] leading-[1.8] text-cream/85">
          <p>
            聊天模型每次只往回答末尾添一小段。继续写之前，它仍要参考前面聊过的内容。
          </p>
          <p>
            KV Cache 把前面内容的计算结果放进电脑的高速工作区，工程里常叫“显存”。
            回答越长，留下的笔记越多，占用的空间也越大。
          </p>
        </div>
        <p className="mt-9 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.12em] text-butter-soft">
          先看这些笔记从哪来
          <ArrowDown className="h-4 w-4" />
        </p>
      </div>

      <div className="lg:col-span-5">
        <div className="relative mx-auto max-w-[460px] rotate-1 rounded-[2rem] border-2 border-ink bg-cream p-5 text-ink shadow-stamp-xl">
          <div className="flex items-center justify-between border-b-2 border-dashed border-ink/35 pb-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                计算便签
              </div>
              <div className="mt-1 font-display text-xl font-bold">边读边存</div>
            </div>
            <FileClock className="h-8 w-8 text-coral" strokeWidth={2.2} />
          </div>
          <div className="mt-5 space-y-3">
            {NOTES.map((note, index) => (
              <div
                key={note}
                className="flex items-center gap-3 rounded-xl border-2 border-ink bg-white px-3 py-2.5"
                style={{ transform: `translateX(${index * 4}px)` }}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-ink bg-butter font-mono text-[10px] font-bold">
                  {index + 1}
                </span>
                <span className="flex-1 font-sans text-[13px]">{note}</span>
                <Check className="h-4 w-4 text-teal" strokeWidth={3} />
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-ink px-4 py-3 text-cream">
            <span className="font-mono text-[10px] tracking-[0.14em] text-butter-soft">
              下一步
            </span>
            <p className="mt-1 text-sm">只计算新添的那一小段。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SectionWhatIsCache;
