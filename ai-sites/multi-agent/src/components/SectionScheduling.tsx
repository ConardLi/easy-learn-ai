/**
 * SectionScheduling · 谁来指挥、怎么不乱
 *
 * 交互：toggle 切换「有调度 vs 没调度」，看同一个团队两种走向
 * 讲为什么需要调度：防止抢着说话、无限互相对话停不下来、活派重了
 */
import React, { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const CHAOS = [
  "规划和执行同时开口，谁也没听谁的",
  "审查说要改，执行没收到，继续往下做",
  "两个 Agent 互相「你先」「不你先」，转圈停不下来",
  "同一步活被两个执行 Agent 各做了一遍，白费",
];

const ORDERED = [
  "调度器规定：同一时刻只让一个 Agent 说话",
  "审查打回的意见，准确转交给对应的执行 Agent",
  "设了上限：来回超过 N 轮还没完，强制收尾",
  "每步活只派给一个 Agent，不重不漏",
];

const SectionScheduling: React.FC = () => {
  const [ordered, setOrdered] = useState(true);
  const list = ordered ? ORDERED : CHAOS;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Scheduling</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          几个 AI 凑一块，谁来指挥才不乱？
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[700px]">
          光有分工还不够。几个 AI 一起干，得有人安排「现在轮到谁说话、谁的话传给谁、什么时候该停」 ——
          这套安排叫调度。下面这个开关，看看有它和没它差多少。
        </p>

        {/* toggle */}
        <div className="mt-9 inline-flex items-center gap-1 p-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
          <button
            onClick={() => setOrdered(false)}
            className={[
              "px-5 py-2 rounded-full font-semibold text-[14px] transition-all duration-250",
              !ordered ? "bg-pop text-cream" : "text-ink/55 hover:text-ink",
            ].join(" ")}
          >
            没有调度
          </button>
          <button
            onClick={() => setOrdered(true)}
            className={[
              "px-5 py-2 rounded-full font-semibold text-[14px] transition-all duration-250",
              ordered ? "bg-teal text-cream" : "text-ink/55 hover:text-ink",
            ].join(" ")}
          >
            有调度
          </button>
        </div>

        {/* 内容卡 */}
        <div
          className={[
            "mt-7 border-2 border-ink rounded-3xl shadow-stamp-lg p-7 lg:p-8 transition-colors duration-300",
            ordered ? "bg-teal/8" : "bg-pop/8",
          ].join(" ")}
        >
          <div className="flex items-center gap-3 mb-6">
            {ordered ? (
              <CheckCircle2 className="w-8 h-8 text-teal" strokeWidth={2.2} />
            ) : (
              <AlertTriangle className="w-8 h-8 text-pop" strokeWidth={2.2} />
            )}
            <div className="font-display font-extrabold text-[24px] text-ink">
              {ordered ? "有调度：井井有条" : "没调度：一团乱"}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {list.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white border-2 border-ink rounded-2xl px-4 py-3.5"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-ink font-mono text-[11px] font-bold"
                  style={{
                    backgroundColor: ordered ? "#1B4B5A" : "#FF4D74",
                    color: "#FBEFE3",
                  }}
                >
                  {idx + 1}
                </span>
                <span className="font-sans text-[14.5px] leading-[1.6] text-ink/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-7 font-sans text-[15px] leading-[1.7] text-ink/65 max-w-[700px]">
          所以光分好工还不够，调度乱了照样干不成事。一半看分工，一半看调度稳不稳。
        </p>
      </div>
    </section>
  );
};

export default SectionScheduling;
