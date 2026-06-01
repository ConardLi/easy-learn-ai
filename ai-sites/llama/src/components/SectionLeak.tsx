/**
 * Section 02 · 反直觉钩子 · 「Llama 1 先出论文，权重随后被泄露到 4chan」
 *
 * 用户点 9 个事件 chip，下方展开当天发生的事；左侧"60 天计数器"显示当时已开源的衍生模型数。
 * 形式跟 Hero（slider）不一样：chip + 单事件展开。也跟 deepseek-r1 / bert / transformer 任何 section 不重。
 *
 * 数据来源：
 *   - LLaMA 1 release 2023-02-24 · Meta blog / arXiv:2302.13971
 *   - 4chan leak 2023-03-03 · DeepLearning.ai The Batch（Andrew Ng）/ analyticsindiamag.com
 *   - DMCA takedown 2023-03-06 · GitHub / HuggingFace
 *   - Alpaca 2023-03-13 · crfm.stanford.edu/2023/03/13/alpaca
 *   - llama.cpp 首发 2023-03-10 · ggerganov/llama.cpp 首个 commit
 *   - Vicuna 2023-03-30 · lmsys.org/blog/2023-03-30-vicuna
 *   - Koala 2023-04-03 · bair.berkeley.edu
 *   - WizardLM 2023-04-24 · arXiv:2304.12244
 *   - 衍生模型计数引自 deeplearning.ai The Batch、devopedia.org/llama-llm
 */
import React, { useState } from "react";
import { Calendar, Download, Triangle } from "lucide-react";

type Event = {
  id: string;
  date: string; // 短格式 "02-24"
  full: string;
  title: string;
  body: string;
  source: string;
  cumulative: number; // 当天已存在的"基于 Llama 的开源/衍生模型数"
};

const EVENTS: Event[] = [
  {
    id: "release",
    date: "02-24",
    full: "2023 年 2 月 24 日",
    title: "Meta 发 LLaMA 论文，权重不公开",
    body:
      "7B / 13B / 33B / 65B 四个尺寸。论文里说 LLaMA-13B 在大多数 benchmark 跑赢 GPT-3 175B。代码 GPLv3 开源，权重要填表申请，only for 学术研究。",
    source: "arXiv:2302.13971",
    cumulative: 0,
  },
  {
    id: "leak",
    date: "03-03",
    full: "2023 年 3 月 3 日",
    title: "4chan 用户 Laminon 把权重磁链上传",
    body:
      "全部 4 个尺寸的权重，磁力链发到 4chan 的 /g/ 板。当天就有人在 GitHub 主仓库提 PR 请求把磁链加到 README。",
    source: "DeepLearning.ai The Batch · analyticsindiamag",
    cumulative: 1,
  },
  {
    id: "dmca",
    date: "03-06",
    full: "2023 年 3 月 6 日",
    title: "Meta 发 DMCA 撤下函，HuggingFace 配合",
    body:
      "Meta 把上传到 HuggingFace 的 Llama 权重镜像下架了。但磁链还在 BitTorrent 网络上跑，撤不掉。",
    source: "Wikipedia · LLaMA · 撤下记录",
    cumulative: 1,
  },
  {
    id: "llamacpp",
    date: "03-10",
    full: "2023 年 3 月 10 日",
    title: "llama.cpp 首个 commit",
    body:
      "Georgi Gerganov 用纯 C/C++ 写了一份推理代码，把 4-bit 量化的 LLaMA-7B 跑在 MacBook M1 上。今天 GGUF 格式就是从这里长出来的。",
    source: "github.com/ggerganov/llama.cpp",
    cumulative: 2,
  },
  {
    id: "alpaca",
    date: "03-13",
    full: "2023 年 3 月 13 日",
    title: "Stanford 发 Alpaca-7B",
    body:
      "用 OpenAI text-davinci-003 生成 52K 条指令数据，微调 LLaMA-7B。训练成本 < 600 美金。第一次有人把开源 base 模型调成能跟 GPT 抢任务的对话模型。",
    source: "crfm.stanford.edu/2023/03/13/alpaca",
    cumulative: 3,
  },
  {
    id: "vicuna",
    date: "03-30",
    full: "2023 年 3 月 30 日",
    title: "LMSYS 发 Vicuna-13B",
    body:
      "拿 ShareGPT 上 70K 条用户跟 ChatGPT 的真实对话，微调 LLaMA-13B。GPT-4 当裁判打分，跑分声称达到 ChatGPT 90% 水准，训练费 300 美金。",
    source: "lmsys.org/blog/2023-03-30-vicuna",
    cumulative: 4,
  },
  {
    id: "koala",
    date: "04-03",
    full: "2023 年 4 月 3 日",
    title: "UC Berkeley 发 Koala",
    body:
      "BAIR 实验室继续用蒸馏路线，从 ShareGPT + HH-RLHF 数据上调 LLaMA-13B。目标是用学术算力复现 ChatGPT 体验。",
    source: "bair.berkeley.edu/blog/2023/04/03/koala",
    cumulative: 5,
  },
  {
    id: "wizard",
    date: "04-24",
    full: "2023 年 4 月 24 日",
    title: "微软发 WizardLM · Evol-Instruct",
    body:
      "微软提出 Evol-Instruct：让 GPT 把简单指令「进化」成复杂指令。在 LLaMA 上微调出的 WizardLM 跑赢 Vicuna。",
    source: "arXiv:2304.12244",
    cumulative: 6,
  },
  {
    id: "shift",
    date: "07-18",
    full: "2023 年 7 月 18 日",
    title: "Meta 反向调整：Llama 2 直接允许商用",
    body:
      "5 个月后，Meta 发 Llama 2。这次连许可证都改了：< 7 亿月活的公司可以免费商用。从「拦不住泄露」变成「干脆放给你用」。",
    source: "Llama 2 Community License Section 2",
    cumulative: 12,
  },
];

const SectionLeak: React.FC = () => {
  const [activeId, setActiveId] = useState("leak");
  const active = EVENTS.find((e) => e.id === activeId)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">how it really started</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          Llama 1 先出论文，权重随后被
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">泄露</span>
          </span>
          到 4chan。
        </h2>

        <p className="max-w-2xl text-[15.5px] text-ink/75 leading-relaxed mb-10">
          2023 年 2 月 24 日 Meta 只把权重放给申请通过的研究员。
          一周后，权重整包出现在 4chan。Meta 发 DMCA 撤下，但已经压不住。
          后面 60 天里，开源社区用泄露的权重，把整个 LLM 微调路线跑了一遍。
        </p>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* 左：60 天计数器 + 事件 chip */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6 mb-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                那天为止 · 基于 Llama 的开源衍生
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[64px] lg:text-[78px] font-bold text-ink tabular-nums leading-none">
                  {active.cumulative}
                </span>
                <span className="font-mono text-[12px] text-ink/55">个公开模型</span>
              </div>
              <div className="mt-4 h-2.5 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                <div
                  className="h-full bg-coral transition-all duration-400 ease-spring"
                  style={{ width: `${Math.min(active.cumulative * 7, 100)}%` }}
                />
              </div>
              <p className="mt-3 font-mono text-[10.5px] text-ink/45 leading-relaxed">
                * 计数仅含当时公开发布、可验证基于 LLaMA 微调的开源模型，不含私有 fork。
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {EVENTS.map((e) => {
                const on = e.id === active.id;
                return (
                  <button
                    key={e.id}
                    onClick={() => setActiveId(e.id)}
                    className={[
                      "px-2.5 py-2.5 rounded-xl border-2 border-ink text-left transition-all duration-200 ease-spring",
                      on
                        ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                        : "bg-white text-ink hover:bg-butter/30",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "font-mono text-[10px] tracking-wider mb-0.5",
                        on ? "text-butter" : "text-ink/55",
                      ].join(" ")}
                    >
                      {e.date}
                    </div>
                    <div className="font-display text-[12.5px] font-bold leading-tight">
                      {e.id === "release"
                        ? "发布"
                        : e.id === "leak"
                          ? "泄露"
                          : e.id === "dmca"
                            ? "撤下"
                            : e.id === "llamacpp"
                              ? "llama.cpp"
                              : e.id === "alpaca"
                                ? "Alpaca"
                                : e.id === "vicuna"
                                  ? "Vicuna"
                                  : e.id === "koala"
                                    ? "Koala"
                                    : e.id === "wizard"
                                      ? "WizardLM"
                                      : "Llama 2"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 右：当天事件展开 */}
          <div className="lg:col-span-7">
            <div
              key={active.id}
              className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8 animate-enter-fade"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <Calendar className="w-4 h-4 text-coral" strokeWidth={2.5} />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/65 font-bold">
                  {active.full}
                </span>
              </div>

              <h3 className="font-display text-[26px] lg:text-[30px] font-bold text-ink leading-tight mb-4">
                {active.title}
              </h3>

              <p className="text-[15px] text-ink/80 leading-relaxed mb-5">{active.body}</p>

              {/* 关键 ID stamp */}
              {active.id === "leak" && (
                <div className="mb-5 inline-flex items-center gap-2 bg-ink text-cream px-3 py-1.5 rounded-full">
                  <Triangle className="w-3 h-3 fill-coral stroke-coral" />
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase font-bold">
                    Laminon · 4chan /g/
                  </span>
                </div>
              )}
              {active.id === "alpaca" && (
                <div className="mb-5 inline-flex items-center gap-2 bg-ink text-cream px-3 py-1.5 rounded-full">
                  <Download className="w-3 h-3 stroke-butter" />
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase font-bold">
                    52 k 指令 · 训练费 ≤ $600
                  </span>
                </div>
              )}
              {active.id === "vicuna" && (
                <div className="mb-5 inline-flex items-center gap-2 bg-ink text-cream px-3 py-1.5 rounded-full">
                  <Download className="w-3 h-3 stroke-butter" />
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase font-bold">
                    70 k ShareGPT 对话 · 训练费 ≤ $300
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-4 border-t border-ink/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                  source
                </div>
                <div className="font-mono text-[11px] text-ink/65 truncate">{active.source}</div>
              </div>
            </div>

            <p className="mt-4 font-mono text-[10.5px] text-ink/45 leading-relaxed max-w-xl">
              这 60 天后来被叫做开源 LLM 的「寒武纪大爆发」。Meta 没有把权限收得更紧 —— 5 个月后它直接放出 Llama 2 允许商用，
              既然拦不住泄露，那干脆把开源做成战略。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLeak;
