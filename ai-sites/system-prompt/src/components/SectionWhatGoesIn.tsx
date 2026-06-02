/**
 * SectionWhatGoesIn · 一条 system prompt 里通常写哪几样
 *
 * 交互（L4 · 勾选组合 + 实时拼装）：
 *   4 个开关：角色 / 语气 / 边界 / 输出格式。
 *   勾哪几条，右侧就实时拼出一段 system prompt，并在下面列出「这几条会让模型怎样」。
 *   全不勾 → 一段空白，提示「没人给它定规矩，它就放飞」。
 */
import React, { useState } from "react";
import { Check } from "lucide-react";

type PartKey = "role" | "tone" | "limit" | "format";

const PARTS: {
  key: PartKey;
  label: string;
  sub: string;
  line: string;
  effect: string;
  color: string;
}[] = [
  {
    key: "role",
    label: "角色设定",
    sub: "让它当谁",
    line: "你是一名儿科医生助理。",
    effect: "它会用儿科医生的身份和知识范围答话，不再是「万能 AI」。",
    color: "#E07A5F",
  },
  {
    key: "tone",
    label: "语气",
    sub: "用什么口吻",
    line: "语气温和、口语，少用专业术语。",
    effect: "回答会变得家常、好懂，不甩一堆医学名词。",
    color: "#1B4B5A",
  },
  {
    key: "limit",
    label: "边界规则",
    sub: "什么不能做",
    line: "不开具体药名和剂量，提醒线下就医。",
    effect: "碰到该让医生拍板的事，它会收住，不乱给处方。",
    color: "#7A28CB",
  },
  {
    key: "format",
    label: "输出格式",
    sub: "答案排成啥样",
    line: "先一句结论，再用短句列出建议。",
    effect: "回答有固定结构，不会糊成一大段。",
    color: "#241C15",
  },
];

const SectionWhatGoesIn: React.FC = () => {
  const [on, setOn] = useState<Record<PartKey, boolean>>({
    role: true,
    tone: true,
    limit: false,
    format: false,
  });

  const toggle = (k: PartKey) => setOn((s) => ({ ...s, [k]: !s[k] }));
  const chosen = PARTS.filter((p) => on[p.key]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-butter-tint border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">一段里写哪几样</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px] leading-[1.1]">
          一条 system prompt，通常拿来定四件事
        </h2>
        <p className="mt-5 font-sans text-[16px] leading-[1.75] text-ink/80 max-w-[660px]">
          角色、语气、边界、格式 —— 想管哪样就写哪样。下面勾几条，右边会实时拼出那段话，
          并告诉你模型会因此怎么变。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ─── 左：四个开关 ─── */}
          <div className="space-y-3">
            {PARTS.map((p) => {
              const active = on[p.key];
              return (
                <button
                  key={p.key}
                  onClick={() => toggle(p.key)}
                  className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border-2 border-ink transition-all duration-250 ease-spring ${
                    active
                      ? "bg-ink text-cream shadow-stamp -translate-x-0.5 -translate-y-0.5"
                      : "bg-white text-ink shadow-stamp hover:-translate-y-0.5"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                      active ? "bg-coral border-cream" : "bg-cream border-ink"
                    }`}
                  >
                    {active && <Check className="w-4 h-4 text-cream" strokeWidth={3} />}
                  </span>
                  <span className="flex-1">
                    <span className="font-display font-bold text-[16px] block leading-tight">
                      {p.label}
                    </span>
                    <span
                      className={`font-mono text-[11px] tracking-[0.08em] ${
                        active ? "text-cream/70" : "text-ink/55"
                      }`}
                    >
                      {p.sub}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* ─── 右：实时拼出的 system prompt + 效果 ─── */}
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55 mb-2">
              拼出来的 system prompt
            </div>
            <div className="border-[3px] border-ink rounded-2xl bg-cream shadow-stamp-lg p-4 min-h-[140px]">
              {chosen.length === 0 ? (
                <p className="font-sans text-[14px] text-ink/55 leading-relaxed italic">
                  一条都没写 —— 模型没人给它定规矩，角色、语气、边界全靠它自己猜，结果就飘忽不定。
                </p>
              ) : (
                <div className="space-y-2 font-mono text-[13px] leading-relaxed text-ink">
                  {chosen.map((p) => (
                    <div key={p.key} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: p.color }}
                      />
                      <span>{p.line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {chosen.length > 0 && (
              <>
                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55 mt-5 mb-2">
                  这会让模型怎样
                </div>
                <div className="space-y-2">
                  {chosen.map((p) => (
                    <div
                      key={p.key}
                      className="bg-white border-2 border-ink rounded-xl px-3.5 py-2.5 shadow-stamp flex items-start gap-2.5"
                    >
                      <span
                        className="flex-shrink-0 mt-0.5 px-1.5 py-0.5 rounded-md font-mono text-[9px] font-bold text-cream"
                        style={{ backgroundColor: p.color }}
                      >
                        {p.label}
                      </span>
                      <span className="font-sans text-[12.5px] leading-snug text-ink/85">
                        {p.effect}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWhatGoesIn;
