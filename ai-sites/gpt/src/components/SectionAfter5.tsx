/**
 * Section 07 · 2026 当下 · GPT 5 字头时代
 *
 * 5 个 accordion 项 · 默认展开第 1 项 · 互斥单开
 *
 * 数据来源（每项里有具体 ref）：
 *   ─ GPT-5.5：openai.com/index/introducing-gpt-5-5 2026-04-23
 *   ─ Sora 关停：help.openai.com/articles/20001152 2026-03-28 公告
 *   ─ 分层定价：openai.com/api/pricing 2026-05 抓取
 *   ─ 不公开参数：GPT-4 Technical Report 起 OpenAI 官方政策
 *   ─ 闭源 vs Llama：Meta Llama 4 release notes + OpenAI 闭源声明
 *
 * 反相邻：上一段 (Section 06) 是 pill+trace，本段是 accordion，再叠一个 callout 卡
 */
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

type Item = {
  id: string;
  badge: string;
  title: string;
  brief: string;
  facts: string[];
  ref: string;
};

const ITEMS: Item[] = [
  {
    id: "55",
    badge: "2026-04",
    title: "GPT-5.5 是 2026 年当前旗舰",
    brief: "比 GPT-5 强、比 5.5 Pro 便宜、是 ChatGPT Plus / Pro / Business 默认模型。",
    facts: [
      "上下文 1.05 M（922 K input + 128 K output） · 同档 Claude Opus 4.7 仅 200 K",
      "$5 / $30 per 1M token · 缓存命中价 $0.50 · 是 5.4（$2.5/$15）的 2 倍",
      "GPT-5.5 Pro $30 / $180 per 1M · 主打高精度长任务，没有缓存折扣",
      "Plus / Pro / Business / Enterprise 用户 2026-04-23 全开 · API 2026-04-24 跟上",
    ],
    ref: "openai.com/index/introducing-gpt-5-5 · 2026-04-23",
  },
  {
    id: "sora",
    badge: "2026-04-26",
    title: "Sora 2 起飞 7 个月后被砍",
    brief: "OpenAI 自己关闭的旗舰产品。视频生成这条支线断了。",
    facts: [
      "Sora 2 发布日：2025-09-30 · 主打同步音轨、物理更准、独立 iOS app",
      "停服公告日：2026-03-28 · OpenAI Help Center 官方",
      "Web / app 关停：2026-04-26 · API 关停：2026-09-24",
      "credits 转给 Codex · 用户数据将永久删除",
    ],
    ref: "help.openai.com/articles/20001152 · 2026-03-28",
  },
  {
    id: "tiers",
    badge: "$0.05 → $30",
    title: "GPT 进入「分层 600×」时代",
    brief: "同一个家族里，最便宜和最贵的 input 价差 600 倍。",
    facts: [
      "GPT-5 nano：$0.05 / $0.40 per 1M · 入门级",
      "GPT-5 mini：$0.25 / $2.00 · 拉流量",
      "GPT-5 / 5.4：$1.25-2.50 / $10-15 · 主力",
      "GPT-5.5：$5 / $30 · 复杂工作流",
      "GPT-5.5 Pro：$30 / $180 · 高精度旗舰 · 比最便宜 nano 贵 600× / 450×",
    ],
    ref: "openai.com/api/pricing · 抓取于 2026-05-28",
  },
  {
    id: "closed",
    badge: "从 GPT-4 起",
    title: "参数量 8 年不公开了",
    brief: "GPT-1 / 2 / 3 论文都给了准数，GPT-4 起 OpenAI 全部不披露。",
    facts: [
      "GPT-3 论文 (2020) Table 2.1 给出 175B 准数",
      "GPT-4 Technical Report (2023-03) 明说「不公开模型大小、训练算力、数据集」",
      "GPT-5 / 5.5 同样不公开任何架构数字",
      "行业「估算」也越来越测不出 —— 多专家、动态路由让 active param 不再是单一数",
    ],
    ref: "GPT-4 Technical Report 2023 · openai.com/research/gpt-4",
  },
  {
    id: "vs",
    badge: "vs Llama",
    title: "闭源旗舰 vs 开源底座",
    brief: "OpenAI 选闭源 API、Meta 选开源权重 —— 2026 还是各走各的。",
    facts: [
      "GPT 全系列闭源 · 仅 GPT-OSS（2025-08-05 发布的小开源 reasoning 模型）例外",
      "Llama 4（Meta 2025）全量权重开放下载 · 跑分追上 GPT-4o 一档",
      "走 API 看不到 weights，但拿到 OpenAI 的 SLA、reasoning、Codex 集成、Sora 一站",
      "走开源给你 weights，但要自备 GPU、对齐、安全 —— 大模型每年成本翻倍",
    ],
    ref: "ai.meta.com/llama + openai.com/research/gpt-oss",
  },
];

const SectionAfter5: React.FC = () => {
  const [openId, setOpenId] = useState("55");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">2026 · the 5-era</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-9">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-lg text-ink leading-[1.08] mb-4">
              5 件 2026 必知，
              <br />
              <span className="bg-teal/15 px-1.5">关于 GPT 当下的样子。</span>
            </h2>
            <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[64ch]">
              下面 5 个点是 2026 年讨论 GPT 必须有的事实底盘。点开任意一项看具体数字。
              （都是 2026 年 5 月之前的官方资料 —— 不是行业八卦。）
            </p>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <div className="p-4 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                今天就这一句
              </div>
              <p className="font-display text-[15px] font-bold text-ink leading-snug">
                GPT-5.5 是默认模型，价格在涨，Sora 已注销，参数全闭源。
              </p>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-3 mb-10">
          {ITEMS.map((it) => {
            const open = it.id === openId;
            return (
              <div
                key={it.id}
                className={[
                  "bg-white border-2 border-ink rounded-3xl transition-all duration-300 ease-spring overflow-hidden",
                  open ? "shadow-stamp-lg" : "shadow-stamp",
                ].join(" ")}
              >
                <button
                  onClick={() => setOpenId(open ? "" : it.id)}
                  className="w-full px-5 lg:px-6 py-5 text-left flex items-start gap-4 hover:bg-cream/40 transition-colors"
                >
                  <span className="inline-flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink bg-butter border-2 border-ink rounded-full px-2.5 py-1 shrink-0 mt-0.5">
                    {it.badge}
                  </span>
                  <div className="flex-1">
                    <div className="font-display text-[19px] lg:text-[22px] font-bold text-ink leading-snug mb-1">
                      {it.title}
                    </div>
                    <div className="font-mono text-[12.5px] text-ink/65 leading-relaxed">
                      {it.brief}
                    </div>
                  </div>
                  <span className="inline-flex items-center justify-center w-9 h-9 bg-cream border-2 border-ink rounded-full shrink-0">
                    {open ? <Minus className="w-4 h-4" strokeWidth={2.5} /> : <Plus className="w-4 h-4" strokeWidth={2.5} />}
                  </span>
                </button>

                {open && (
                  <div className="px-5 lg:px-6 pb-5 lg:pb-6 animate-enter-fade">
                    <ul className="space-y-2 mb-3 pl-2 border-l-[3px] border-ink/15">
                      {it.facts.map((f, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 text-[14px] text-ink/85 leading-relaxed pl-3"
                        >
                          <span className="inline-block mt-2 w-1.5 h-1.5 bg-coral rounded-full shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="font-mono text-[10.5px] text-ink/55 pl-3">
                      来源：{it.ref}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 收尾 callout：硬数字事实 */}
        <div className="bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-3">
            收尾 · 硬数字
          </div>
          <h3 className="font-display text-[24px] lg:text-[30px] font-bold text-cream leading-snug mb-4">
            从 GPT-1 到 GPT-5.5，<span className="text-butter">7 年 11 个月</span>。
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <div className="font-display text-[32px] font-bold text-butter leading-none tabular-nums">
                117 M → ?
              </div>
              <div className="font-mono text-[11px] text-cream/65 mt-1">
                参数：从已知到不公开
              </div>
            </div>
            <div>
              <div className="font-display text-[32px] font-bold text-butter leading-none tabular-nums">
                512 → 1 M
              </div>
              <div className="font-mono text-[11px] text-cream/65 mt-1">
                上下文：2000× 长
              </div>
            </div>
            <div>
              <div className="font-display text-[32px] font-bold text-butter leading-none tabular-nums">
                $60 → $5
              </div>
              <div className="font-mono text-[11px] text-cream/65 mt-1">
                旗舰输入价 / 1M token
              </div>
            </div>
          </div>
          <p className="mt-5 font-mono text-[12px] text-cream/75 leading-relaxed border-t border-cream/20 pt-4">
            目标函数没动过 —— 还是「下一个 token 猜啥」。
            真正变了的不是 GPT，是它已经能想几分钟才答一个字。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionAfter5;
