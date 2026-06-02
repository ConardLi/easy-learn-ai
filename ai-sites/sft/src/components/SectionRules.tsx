/**
 * Section 07 · 数据陷阱画廊 + 4 条不容妥协的规则
 *
 * 6 个真实长得像「正常 SFT 样本」的坑。用户先看，自己判断"留还是丢"，
 * 然后点一下看出坑在哪。倒过来教写好数据。
 *
 * 末尾 4 条 硬规则 callout（不是鸡汤、不是总结）—— 真的做 SFT 时立马用得上。
 */
import React, { useState } from "react";
import { Check, X, AlertCircle, ExternalLink } from "lucide-react";

type Trap = {
  id: string;
  q: string;
  a: string;
  shouldKeep: boolean;
  trapTag: string;
  trapDetail: string;
};

const TRAPS: Trap[] = [
  {
    id: "fact",
    q: "莎士比亚是哪一年出生的？",
    a: "莎士比亚出生于 1564 年。他出生在英国斯特拉福德镇，是文艺复兴时期最伟大的剧作家之一，1644 年去世。",
    shouldKeep: false,
    trapTag: "事实错",
    trapDetail: "莎士比亚 1616 年去世，不是 1644。错的 SFT 数据会让模型「自信地胡说」—— 比 base 不知道还糟，这是训练数据里夹了错答案导致的。",
  },
  {
    id: "format",
    q: "用 markdown 列出 3 种排序算法",
    a: "排序算法有很多种，比如冒泡排序、快速排序、归并排序。冒泡排序的时间复杂度是 O(n²)，快速排序平均 O(nlogn)…",
    shouldKeep: false,
    trapTag: "格式不照做",
    trapDetail: "用户明确要求 markdown 列表，回答用了散文。这种样本会教模型「忽略格式要求」。Tulu 3 单独搞了 30K precise-IF 桶就是为了治这个。",
  },
  {
    id: "refuse",
    q: "推荐 5 部 2023 年的科幻电影",
    a: "对不起，我是一个 AI 助手，无法提供电影推荐。建议您查阅豆瓣或 IMDb。",
    shouldKeep: false,
    trapTag: "过度拒绝",
    trapDetail: "完全可以答的问题被拒绝。OpenAI 早期 GPT 一个被骂得最惨的毛病就是这个，2024-2026 大量论文专门研究怎么把这种 over-refusal 样本从训练数据里清掉。",
  },
  {
    id: "good1",
    q: "员工年假怎么算？",
    a: "看《职工带薪年休假条例》：累计工作满 1 年不满 10 年的，年假 5 天；满 10 年不满 20 年的，10 天；满 20 年的，15 天。注意是累计工作年限，不是单位工龄。",
    shouldKeep: true,
    trapTag: "干净",
    trapDetail: "事实准、答到点、引了来源、补了一个常见误解。这就是 LIMA 风格的「单条值钱」样本。",
  },
  {
    id: "style",
    q: "今天天气怎么样？",
    a: "亲～根据您所在位置的天气查询服务～今天气温大约 23°C～建议穿薄外套呢～祝您拥有一个美好的一天哦～！！！🌞✨",
    shouldKeep: false,
    trapTag: "风格不一致",
    trapDetail: "如果整批 SFT 数据里只有这一条是「萌妹子语气」，模型会困惑；如果一半样本是这风格，整个模型就会被带歪。LIMA 论文最强调的就是「风格统一」。",
  },
  {
    id: "leak",
    q: "MMLU 这个问题答案是哪个？",
    a: "正确答案是 C。MMLU 是 Hendrycks et al. 2020 提出的 57 学科测试集合……",
    shouldKeep: false,
    trapTag: "benchmark 污染",
    trapDetail: "训练数据里混进了 evaluation 集的题目。模型跑分会虚高、实际能力不变。Tulu 3 团队从 23M 候选筛到 939K 的核心工作就是 decontamination。",
  },
];

const RULES = [
  {
    n: "01",
    title: "训和推用同一套 chat template",
    body: "chat template 就是训练时对话长什么样（哪段是用户、哪段是助手的固定拼法）。训用 ChatML，推也得 ChatML；换一套，权重一样、说话翻车。",
    tone: "coral",
  },
  {
    n: "02",
    title: "loss mask 必须只盖 assistant 段",
    body: "只让模型学自己该回的那段（assistant），用户和 system 说的不算分（标 -100）；不然模型学到「先复读用户提问再回答」。",
    tone: "teal",
  },
  {
    n: "03",
    title: "epochs ≤ 3，lr ≤ 5e-5",
    body: "比 pre-train 小一到两个数量级。多训一轮，pre-train 学的知识就掉一截。",
    tone: "butter",
  },
  {
    n: "04",
    title: "宁要 1 万条干净的，不要 10 万条脏的",
    body: "事实错 / 格式错 / 风格漂移 / benchmark 污染，每一类样本都不只是「少帮助」，是「主动有害」。",
    tone: "pop",
  },
];

const SectionRules: React.FC = () => {
  const [reveals, setReveals] = useState<Record<string, boolean>>({});

  const reveal = (id: string) =>
    setReveals((r) => ({ ...r, [id]: !r[id] }));

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-butter-tint/40">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">陷阱与规则</span>
        </div>

        <h2 className="font-display text-display-lg mb-3">
          下面 6 条样本，5 条要丢
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-10">
          做 SFT 90% 的精力都花在数据清洗上。先自己看一眼，再点「看坑」对答案。
        </p>

        {/* 6 卡 grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRAPS.map((t) => {
            const r = reveals[t.id];
            return (
              <div
                key={t.id}
                className={[
                  "border-2 border-ink rounded-2xl p-4 transition-all duration-300",
                  r
                    ? t.shouldKeep
                      ? "bg-teal/15 shadow-stamp"
                      : "bg-pop/10 shadow-stamp"
                    : "bg-white hover:shadow-stamp",
                ].join(" ")}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    样本
                  </span>
                  {r && (
                    <span
                      className={[
                        "px-1.5 py-0.5 border-2 border-ink rounded-md font-mono text-[10px] font-bold uppercase tracking-wider",
                        t.shouldKeep ? "bg-teal text-cream" : "bg-pop text-cream",
                      ].join(" ")}
                    >
                      {t.shouldKeep ? "保留" : t.trapTag}
                    </span>
                  )}
                </div>

                <div className="mb-2">
                  <div className="font-mono text-[9.5px] uppercase tracking-wider text-ink/45 mb-0.5">
                    Q
                  </div>
                  <p className="font-sans text-[13px] font-semibold text-ink leading-snug">
                    {t.q}
                  </p>
                </div>
                <div className="mb-3">
                  <div className="font-mono text-[9.5px] uppercase tracking-wider text-ink/45 mb-0.5">
                    A
                  </div>
                  <p className="font-sans text-[12.5px] text-ink/80 leading-snug">
                    {t.a}
                  </p>
                </div>

                {r ? (
                  <div className="pt-3 border-t border-ink/15 animate-enter-fade">
                    <div className="flex items-start gap-2">
                      {t.shouldKeep ? (
                        <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={2.5} />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-pop shrink-0 mt-0.5" strokeWidth={2.5} />
                      )}
                      <p className="font-sans text-[12px] text-ink leading-relaxed">
                        {t.trapDetail}
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => reveal(t.id)}
                    className="w-full mt-1 px-3 py-1.5 bg-ink text-cream rounded-md font-mono text-[10.5px] font-bold uppercase tracking-wider hover:bg-ink/85 transition-colors"
                  >
                    看坑
                  </button>
                )}

                {r && (
                  <button
                    onClick={() => reveal(t.id)}
                    className="mt-2 font-mono text-[10px] text-ink/55 hover:text-ink"
                  >
                    收起
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* 分隔 */}
        <div className="mt-14 mb-6 flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
            ↓ 4 条不容妥协的规则
          </span>
          <span className="flex-1 h-px bg-ink/15" />
        </div>

        {/* 4 条硬规则 */}
        <div className="grid sm:grid-cols-2 gap-4">
          {RULES.map((r) => {
            const bg = {
              coral: "bg-coral text-cream",
              teal: "bg-teal text-cream",
              butter: "bg-butter text-ink",
              pop: "bg-pop text-cream",
            }[r.tone];
            return (
              <div
                key={r.n}
                className={[
                  "border-2 border-ink rounded-2xl p-5 shadow-stamp",
                  bg,
                ].join(" ")}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-mono text-[10.5px] font-bold tracking-[0.18em]">
                    RULE {r.n}
                  </span>
                </div>
                <h4 className="font-display text-[19px] font-bold leading-tight mb-2">
                  {r.title}
                </h4>
                <p className="font-sans text-[13.5px] leading-relaxed opacity-90">
                  {r.body}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-10 font-mono text-[10.5px] text-ink/45 leading-relaxed">
          这一章基于 LIMA / Tulu 3 / DeepSeek V3 / OpenHermes 公开报告里反复提到的清洗规则汇总。任何一条违反，跑分都会立刻反应给你看。
        </p>

        {/* 互链卡：下一站 RLHF */}
        <a
          href="../rlhf/index.html"
          className="mt-10 flex items-start gap-3 max-w-2xl px-5 py-4 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-4 h-4 text-ink" strokeWidth={2.4} />
          </span>
          <span className="font-sans text-[14px] leading-[1.6] text-ink/85">
            <span className="font-bold text-ink">下一站 · RLHF</span>
            <span className="text-ink/70">
              {" "}
              SFT 教会了基本对话，但答得让不让人满意是另一回事。下一步 RLHF 用人类偏好把回答调得更好、更安全 ——
              <strong className="text-ink"> 看《RLHF》那一站</strong>。
            </span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default SectionRules;
