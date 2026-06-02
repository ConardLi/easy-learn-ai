/**
 * SectionVsUser · 你打的字 vs 那段预设
 *
 * 交互（L3 · 输入框 + live preview）：
 *   左侧一个输入框，用户改「你打给 ChatGPT 的话」，右下实时拼出模型真正收到的消息栈：
 *     [ SYSTEM 卡（固定 · 你看不到） ] 钉在最上
 *     [ USER 气泡 = 你刚打的那句 ]    在下面
 *   让用户亲手看到：不管我打啥，那段 system 永远先于我、在我前面。
 *   右侧一张小对比表：谁写的 / 在哪个位置 / 谁优先级高。
 */
import React, { useState } from "react";

const COMPARE = [
  {
    q: "谁写的？",
    sys: "做 app 的开发者预先写好",
    usr: "你自己当场打的",
  },
  {
    q: "在哪个位置？",
    sys: "对话最前面，固定不动",
    usr: "排在 system 后面",
  },
  {
    q: "你看得到吗？",
    sys: "看不到，界面不显示",
    usr: "看得到，就是你输入框那句",
  },
  {
    q: "谁说了算？",
    sys: "一般压过你（下文细说）",
    usr: "得在 system 划的范围里",
  },
];

const SectionVsUser: React.FC = () => {
  const [text, setText] = useState("帮我把这段话翻译成英文");

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        {/* 段标 */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">谁写的 · 在哪 · 谁说了算</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px] leading-[1.1]">
          你打的字，和那段预设，差在哪？
        </h2>
        <p className="mt-5 font-sans text-[16px] leading-[1.75] text-ink/80 max-w-[640px]">
          它俩都是「喂给模型的文字」，但来路完全不同。在下面框里随便改一句你想问的话，看看模型实际收到的是什么。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ─── 左：输入 + 实时消息栈 ─── */}
          <div>
            <label className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55 block mb-2">
              你打给 ChatGPT 的话
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
              className="w-full resize-none bg-white border-2 border-ink rounded-2xl px-4 py-3 font-sans text-[15px] text-ink shadow-stamp focus:outline-none focus:shadow-stamp-lg focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all duration-250 ease-spring"
              placeholder="随便打一句你想问的……"
            />

            <p className="mt-4 mb-2 font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55">
              ↓ 模型这一轮真正收到的
            </p>

            {/* 消息栈 */}
            <div className="border-[3px] border-ink rounded-2xl bg-cream shadow-stamp p-3 space-y-2.5">
              {/* SYSTEM 固定卡 */}
              <div className="relative bg-coral border-2 border-ink rounded-xl px-3.5 py-2.5 shadow-stamp">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] font-extrabold tracking-[0.15em] text-cream">
                    1 · SYSTEM
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-cream/85">
                    开发者预设 · 固定
                  </span>
                </div>
                <span className="font-sans text-[12.5px] leading-snug text-cream">
                  你是一个翻译助手，把用户给的内容翻成地道英文，只输出译文。
                </span>
              </div>

              {/* USER 实时卡 */}
              <div className="bg-white border-2 border-ink rounded-xl px-3.5 py-2.5 shadow-stamp">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] font-extrabold tracking-[0.15em] text-ink">
                    2 · USER
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-ink/55">
                    你打的 · 实时
                  </span>
                </div>
                <span className="font-sans text-[12.5px] leading-snug text-ink break-words">
                  {text.trim() === "" ? "（你还没打字）" : text}
                </span>
              </div>
            </div>

            <p className="mt-3 font-sans text-[12.5px] leading-relaxed text-ink/55">
              换任何一句话，那张 coral 卡都纹丝不动地待在你前面 —— 它是 app 钉死的。
            </p>
          </div>

          {/* ─── 右：对比表 ─── */}
          <div>
            {/* 表头 */}
            <div className="grid grid-cols-[auto_1fr_1fr] gap-2 mb-2">
              <div />
              <div className="bg-coral border-2 border-ink rounded-lg px-2 py-1.5 text-center shadow-stamp">
                <span className="font-mono text-[10px] font-extrabold tracking-[0.12em] text-cream uppercase">
                  System
                </span>
              </div>
              <div className="bg-white border-2 border-ink rounded-lg px-2 py-1.5 text-center shadow-stamp">
                <span className="font-mono text-[10px] font-extrabold tracking-[0.12em] text-ink uppercase">
                  User（你）
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {COMPARE.map((row) => (
                <div key={row.q} className="grid grid-cols-[auto_1fr_1fr] gap-2 items-stretch">
                  <div className="w-[58px] flex items-center">
                    <span className="font-sans font-bold text-[12px] text-ink leading-tight">
                      {row.q}
                    </span>
                  </div>
                  <div className="bg-coral/12 border-2 border-ink rounded-lg px-2.5 py-2 flex items-center">
                    <span className="font-sans text-[12px] leading-snug text-ink">{row.sys}</span>
                  </div>
                  <div className="bg-white border-2 border-ink rounded-lg px-2.5 py-2 flex items-center">
                    <span className="font-sans text-[12px] leading-snug text-ink/85">{row.usr}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-ink text-cream border-2 border-ink rounded-2xl px-4 py-3.5 shadow-stamp">
              <span className="font-sans text-[13.5px] leading-relaxed">
                <span className="font-bold text-butter">记住一点：</span>
                你只能控制 USER 那行；SYSTEM 那行由做产品的人定，你既看不到也改不了 —— 除非 app 专门给你开一个设置框（ChatGPT 里叫「自定义指令」），让你写两句长期生效的偏好。
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionVsUser;
