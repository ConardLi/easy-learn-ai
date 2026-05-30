/**
 * Section 07 · 2026 现状 · 「Llama 之后呢」
 *
 * before / after 二元 toggle：
 *   ─ before：2024-2025 Llama 时代，开源社区围着 Llama 转
 *   ─ after：2026-04 之后，Meta 把旗舰位让给闭源 Muse Spark，开源主线转到 Qwen / DeepSeek 这一支
 *
 * 反模板：
 *   ─ 不写鸡汤式收尾
 *   ─ 不堆「学习路线 / 总结」
 *   ─ 用一个反差大的事实当结尾：开源 LLM 鼻祖 Meta，2026 年自己没在开源最前线了
 *
 * 数据来源：
 *   - Muse Spark 2026-04-08 · about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs
 *   - 「Meta 把 Llama 让位 Muse」· fazm.ai/t/meta-llama-4-llama-5-release-date-roadmap-2026
 *   - CNBC 2026-04-08 「Llama 4 disappointing debut」
 *   - 开源前沿转向中国系 · interconnects.ai 2026-Q1 多篇
 */
import React, { useState } from "react";

type Side = "before" | "after";

const SectionAfterLlama: React.FC = () => {
  const [side, setSide] = useState<Side>("after");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">where llama stands now</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          2026 年的 Llama，
          <br />不再是
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-pop/40 -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">开源最前线</span>
          </span>
          了。
        </h2>

        <p className="max-w-2xl text-[15.5px] text-ink/75 leading-relaxed mb-8">
          Llama 4 发布后口碑一般，《华尔街日报》和《CNBC》都说是 disappointing debut。
          九个月后，扎克伯格把整个 AI 团队重组成 Meta Superintelligence Labs，由 Alexandr Wang 接管。
          2026-04-08，新班子推出 Muse Spark —— 闭源、不再叫 Llama。
        </p>

        {/* before / after toggle */}
        <div className="inline-flex p-1 bg-white border-2 border-ink rounded-full shadow-stamp mb-8">
          <button
            onClick={() => setSide("before")}
            className={[
              "px-5 py-2 rounded-full font-display text-[14px] font-bold transition-all duration-200 ease-spring",
              side === "before" ? "bg-ink text-cream" : "text-ink/55 hover:text-ink",
            ].join(" ")}
          >
            Llama 时代 · 2023-2025
          </button>
          <button
            onClick={() => setSide("after")}
            className={[
              "px-5 py-2 rounded-full font-display text-[14px] font-bold transition-all duration-200 ease-spring",
              side === "after" ? "bg-ink text-cream" : "text-ink/55 hover:text-ink",
            ].join(" ")}
          >
            Muse 时代 · 2026-至今
          </button>
        </div>

        <div key={side} className="grid lg:grid-cols-2 gap-5 lg:gap-6 animate-enter-fade">
          {side === "before" ? (
            <>
              <Card
                tone="butter"
                tag="open-weight"
                title="Meta = 开源 LLM 旗手"
                points={[
                  "每代 Llama 直接公开权重",
                  "Llama 3.1 405B 是当时唯一 4 字头开源旗舰",
                  "HuggingFace 排行榜被 Llama 衍生模型刷屏",
                  "学界 / 创业公司默认 fine-tune base 是 Llama",
                ]}
              />
              <Card
                tone="cream"
                tag="ecosystem"
                title="围着 Llama 转的工具圈"
                points={[
                  "推理：llama.cpp / Ollama / vLLM 默认先支持 Llama",
                  "格式：GGUF 因 llama.cpp 而生，是本地跑模型的事实标准",
                  "数据：Alpaca / Vicuna / WizardLM 微调配方是开源 RLHF 模板",
                  "中文化：Chinese-LLaMA-Alpaca / Atom / Llama3-Chinese 多家并行",
                ]}
              />
            </>
          ) : (
            <>
              <Card
                tone="ink"
                tag="closed-weight"
                title="Meta 旗舰位 = Muse Spark · 闭源"
                points={[
                  "2026-04-08 发布，由 Alexandr Wang 领头的 MSL 训练 9 个月",
                  "只在 meta.ai / Meta AI App / 私测 API 给少数合作方",
                  "Meta 自己说「希望未来开源」，没给时间表",
                  "Llama 品牌没正式停，但 Behemoth 一直没发出来",
                ]}
              />
              <Card
                tone="butter"
                tag="open frontier moves"
                title="开源前沿转到中国系"
                points={[
                  "DeepSeek V3 / R1 接班 Llama 在开源界的 baseline 地位",
                  "Qwen 系列在 HuggingFace fine-tune 数量上反超 Llama",
                  "Kimi K2 / GLM-4 / MiniMax 同期发开源 MoE",
                  "Llama 仍可下载，但不再是默认起点",
                ]}
              />
            </>
          )}
        </div>

        {/* 硬规则 callout */}
        <div className="mt-12 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-butter mb-3">
            three takeaways · 不容妥协
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Take
              n="01"
              title="Llama 4 仍是开源最大的 MoE + 多模态权重"
              body="Scout 17B×16E、Maverick 17B×128E 是公开可下载的事实；如果今天要用开源原生多模态，Llama 4 还是默认选项。"
            />
            <Take
              n="02"
              title="open-weight ≠ open-source"
              body="OSI 拒绝把 Llama Community License 算 open source。生产用先读 LICENSE + AUP，特别是 7 亿 MAU 红线和不许训别家模型这两条。"
            />
            <Take
              n="03"
              title="开源主线已经搬家"
              body="2026 年默认起点不再是 Llama。Qwen / DeepSeek / Kimi 在更新频率、benchmark、生态规模上都超过了 Llama 当前节奏。"
            />
          </div>
        </div>

        <p className="mt-6 font-mono text-[10.5px] text-ink/45 max-w-2xl leading-relaxed">
          来源：about.fb.com/news/2026/04 · cnbc.com 2026-04-08 ·
          fazm.ai/t/meta-llama-4-llama-5-release-date-roadmap-2026 · interconnects.ai 2026-Q1
        </p>
      </div>
    </section>
  );
};

const Card: React.FC<{
  tone: "butter" | "cream" | "ink";
  tag: string;
  title: string;
  points: string[];
}> = ({ tone, tag, title, points }) => {
  const bg =
    tone === "butter"
      ? "bg-butter"
      : tone === "ink"
        ? "bg-ink text-cream"
        : "bg-white";
  const tagBg =
    tone === "ink" ? "bg-coral text-cream" : "bg-ink text-cream";
  return (
    <div
      className={[
        "border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6",
        bg,
      ].join(" ")}
    >
      <div
        className={[
          "inline-block font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full font-bold mb-3",
          tagBg,
        ].join(" ")}
      >
        {tag}
      </div>
      <h3
        className={[
          "font-display text-[20px] lg:text-[22px] font-bold leading-tight mb-3",
          tone === "ink" ? "text-cream" : "text-ink",
        ].join(" ")}
      >
        {title}
      </h3>
      <ul className="space-y-1.5">
        {points.map((p, i) => (
          <li
            key={i}
            className={[
              "flex items-start gap-2 text-[13.5px] leading-relaxed",
              tone === "ink" ? "text-cream/85" : "text-ink/80",
            ].join(" ")}
          >
            <span
              className={[
                "mt-1.5 w-1.5 h-1.5 rounded-full flex-none",
                tone === "ink" ? "bg-butter" : "bg-coral",
              ].join(" ")}
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Take: React.FC<{ n: string; title: string; body: string }> = ({ n, title, body }) => (
  <div>
    <div className="font-mono text-[11px] tracking-[0.2em] text-coral font-bold mb-1">{n}</div>
    <div className="font-display text-[16px] font-bold text-cream leading-tight mb-1.5">
      {title}
    </div>
    <p className="text-[12.5px] text-cream/75 leading-relaxed">{body}</p>
  </div>
);

export default SectionAfterLlama;
