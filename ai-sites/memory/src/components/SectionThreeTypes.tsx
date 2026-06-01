/**
 * SectionThreeTypes · 记什么：三种长期记忆
 *
 * 主交互（L2 pill）：三类记忆切换
 *   - 情景记忆 / 语义记忆 / 程序记忆
 *   - 同一个开发场景下，三类各能记什么 + 单独缺一类的后果
 *
 * 视觉锚：3 张厚卡片 + 选中态 stamp 阴影翻倍 + 对应配色
 */
import React, { useState } from "react";
import { Clock, BookOpen, Workflow } from "lucide-react";

type TypeKey = "episodic" | "semantic" | "procedural";

const TYPES: Record<
  TypeKey,
  {
    label: string;
    en: string;
    icon: React.ReactNode;
    tone: string;
    answers: string;
    humanExample: string;
    agentContent: string[];
    missingCost: string;
  }
> = {
  episodic: {
    label: "情景记忆",
    en: "Episodic",
    icon: <Clock className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-butter text-ink",
    answers: "发生过什么？",
    humanExample:
      "你记得「上周二那个 bug 查了两小时，最后发现是数据库连接池溢出」—— 跟具体时间、上下文绑定。",
    agentContent: [
      "用户问了什么 + Agent 怎么回的",
      "工具调用轨迹（先调了 A 失败，B 才成）",
      "任务最终成 / 败 / 用户改主意",
    ],
    missingCost: "没有它 → Agent 不会从自己的历史里学东西，每次都从头试错。",
  },
  semantic: {
    label: "语义记忆",
    en: "Semantic",
    icon: <BookOpen className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-coral text-white",
    answers: "什么是事实？",
    humanExample:
      "你知道「Python 是动态类型语言」—— 这条知识跟任何具体事件无关，它就是一个事实。",
    agentContent: [
      "用户偏好（喜欢简洁回答 / 暗色主题）",
      "项目配置（这个项目用 PostgreSQL）",
      "领域知识（部署在 AWS us-east-1）",
    ],
    missingCost: "没有它 → 跨对话每次都得重讲项目栈和个人偏好。",
  },
  procedural: {
    label: "程序记忆",
    en: "Procedural",
    icon: <Workflow className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-teal text-white",
    answers: "怎么做事？",
    humanExample:
      "你会骑自行车 —— 不需要每次从头推导「左脚踩、右脚跟、平衡」，整套动作已经内化了。",
    agentContent: [
      "处理密码重置的标准流程",
      "调试某类报错的策略链",
      "多步任务的分解模板（搜 → 算 → 画图）",
    ],
    missingCost: "没有它 → 遇到熟悉问题还是从原始推理开始，浪费 token + 不稳定。",
  },
};

const ORDER: TypeKey[] = ["episodic", "semantic", "procedural"];

const SectionThreeTypes: React.FC = () => {
  const [active, setActive] = useState<TypeKey>("episodic");
  const t = TYPES[active];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">What · 记什么</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          三种长期记忆，
          <br />
          各管{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">一摊</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          AI Agent 记忆系统的分类大量借鉴了认知科学对人类记忆的研究。不需要背术语，
          后面讲存哪儿、怎么取，都会回到这三类。
          <span className="font-bold text-ink"> 一个成熟 Agent 三类都得有 </span>
          —— 只有情景过度依赖个例，只有语义不会从经验学习，只有程序遇到新情况就歇菜。
        </p>

        {/* pill 切换 */}
        <div className="mt-10 flex flex-wrap gap-3">
          {ORDER.map((key) => {
            const item = TYPES[key];
            const isActive = active === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => setActive(key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-ink font-mono text-[12px] tracking-[0.16em] uppercase transition-all duration-250 ease-spring ${
                  isActive
                    ? `${item.tone} shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]`
                    : "bg-cream text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                <span className={isActive ? "opacity-65" : "opacity-50"}>· {item.en}</span>
              </button>
            );
          })}
        </div>

        {/* 主体内容（key 强制重渲染） */}
        <div key={active} className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-enter-up">
          {/* 左：定义 + 人类例子 */}
          <div className="lg:col-span-5">
            <div className={`${t.tone} border-2 border-ink rounded-3xl shadow-stamp-lg p-7`}>
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase opacity-75 mb-2">
                这一类回答的问题
              </div>
              <div className="font-display font-extrabold text-[36px] leading-[1.1] mb-4">
                {t.answers}
              </div>
              <div className="border-t-2 border-current/30 pt-4 opacity-90">
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase mb-2 opacity-80">
                  人类对照
                </div>
                <p className="font-sans text-[14.5px] leading-[1.7]">
                  {t.humanExample}
                </p>
              </div>
            </div>
          </div>

          {/* 中：Agent 里典型存什么 */}
          <div className="lg:col-span-4">
            <div className="card-stamp p-6 h-full">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
                Agent 里典型存这些
              </div>
              <ul className="space-y-3">
                {t.agentContent.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cream border-2 border-ink font-mono text-[11px] font-bold text-ink flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="font-sans text-[14.5px] leading-[1.6] text-ink/85">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 右：缺这一类会怎样 */}
          <div className="lg:col-span-3">
            <div className="border-2 border-dashed border-ink/40 rounded-3xl p-6 h-full bg-ink/[0.02]">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
                少了这一类
              </div>
              <p className="font-sans text-[13.5px] leading-[1.65] text-ink/80 italic">
                {t.missingCost}
              </p>
            </div>
          </div>
        </div>

        {/* 底部三类对照表（不切换的全局视角） */}
        <div className="mt-14">
          <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
            一图全览
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-ink rounded-3xl overflow-hidden shadow-stamp-lg bg-cream">
            {ORDER.map((key, idx) => {
              const item = TYPES[key];
              return (
                <div
                  key={key}
                  className={`p-5 ${idx > 0 ? "md:border-l-2 border-ink" : ""} ${idx > 0 ? "border-t-2 md:border-t-0 border-ink" : ""}`}
                >
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${item.tone} border-2 border-ink rounded-full font-mono text-[10.5px] tracking-[0.18em] uppercase mb-3`}>
                    {item.icon} {item.label}
                  </div>
                  <div className="font-display font-bold text-[18px] text-ink mb-1.5">
                    {item.answers}
                  </div>
                  <div className="font-sans text-[13px] text-ink/65 leading-[1.5]">
                    {item.agentContent[0]}…
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionThreeTypes;
