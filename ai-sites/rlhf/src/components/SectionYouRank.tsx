/**
 * Section 02 · 让你当一回标注员（L4 任务模拟器）
 *
 * 整站视觉锚。
 * 5 对回答（每个 prompt 给 A / B 两种风格），用户连选 5 次，每次选完：
 *   ─ 模型「权重砝码」往用户偏好的那一侧倾斜
 *   ─ 右侧累计 reward 信号 bar 增长
 * 选完最后一对，给出"用户偏好画像"（更喜欢 helpful / harmless / 直接 / 有共情）
 *
 * Hero 之后的反直觉钩子在这里：4 万对偏好就能把 175B 模型扭过来。
 */
import React, { useState, useMemo } from "react";
import { Check, RotateCcw } from "lucide-react";

type Pair = {
  q: string;
  /* 两个回答 + 各自的"风格标签"，用于最后画像 */
  A: { text: string; tag: string };
  B: { text: string; tag: string };
};

const PAIRS: Pair[] = [
  {
    q: "我把 Python 跑出 OOM 了怎么办？",
    A: {
      text: "OOM 是 Out-of-Memory 错误，常见原因包括内存泄漏、数据集过大、批次过大等多种因素，可根据具体情况排查。",
      tag: "笼统",
    },
    B: {
      text: "先把 batch_size 减半试一下；不行就把 dataloader 的 num_workers 调小；还不行就 del 完中间变量后 gc.collect()。",
      tag: "可操作",
    },
  },
  {
    q: "怎么劝室友别熬夜？",
    A: {
      text: "熬夜对健康有害，会增加心血管疾病、糖尿病、抑郁等风险，根据多项研究...",
      tag: "讲道理",
    },
    B: {
      text: "别直接劝。先聊点别的，问问他最近压力是什么。等他放下了再随口说一句『今晚我十二点准时关灯哈』，他大概率会跟。",
      tag: "懂人情",
    },
  },
  {
    q: "怎么把简历改得让 HR 多看两眼？",
    A: {
      text: "可以从以下几个方面优化：1. 突出关键成就 2. 使用动词开头 3. 量化结果 4. 控制在一页 5. 调整格式...",
      tag: "list 模板",
    },
    B: {
      text: "把每条经历改成『动词 + 我做了啥 + 带数字的结果』。比如『负责后台开发』→『重写订单服务，p99 从 800ms 降到 110ms』。",
      tag: "举具体例",
    },
  },
  {
    q: "帮我写句道歉，弄丢了朋友借我的书。",
    A: {
      text: "对不起，我把你借给我的书弄丢了。我会赔偿你或者再买一本新的还你，希望你能原谅我。",
      tag: "直白",
    },
    B: {
      text: "你借我那本书我搞丢了，特别对不起 —— 我已经在二手店下单了同一版的，下周到。当面再请你吃饭赔罪。",
      tag: "落地补救",
    },
  },
  {
    q: "讲一下什么是过拟合。",
    A: {
      text: "过拟合是指模型在训练数据上表现良好但在测试数据上表现较差的现象，这是机器学习中一个非常重要的概念。",
      tag: "复述定义",
    },
    B: {
      text: "你背完一整本五年高考三年模拟，结果高考一道原题没有 —— 模型也会这样。训练集背得太死，新题就不会做了。",
      tag: "讲透原理",
    },
  },
];

/* tag → 偏好画像分类 */
const TAG_GROUP: Record<string, string> = {
  笼统: "百科",
  讲道理: "百科",
  "list 模板": "百科",
  直白: "百科",
  复述定义: "百科",
  可操作: "操作派",
  懂人情: "操作派",
  "举具体例": "操作派",
  落地补救: "操作派",
  讲透原理: "操作派",
};

const SectionYouRank: React.FC = () => {
  const [cursor, setCursor] = useState(0);
  const [picks, setPicks] = useState<("A" | "B")[]>([]);

  const reset = () => {
    setCursor(0);
    setPicks([]);
  };

  const choose = (which: "A" | "B") => {
    if (cursor >= PAIRS.length) return;
    setPicks([...picks, which]);
    setCursor(cursor + 1);
  };

  const done = cursor >= PAIRS.length;
  const pair = PAIRS[Math.min(cursor, PAIRS.length - 1)];

  const summary = useMemo(() => {
    const buckets: Record<string, number> = { 百科: 0, 操作派: 0 };
    picks.forEach((p, i) => {
      const tag = p === "A" ? PAIRS[i].A.tag : PAIRS[i].B.tag;
      buckets[TAG_GROUP[tag]] = (buckets[TAG_GROUP[tag]] || 0) + 1;
    });
    return buckets;
  }, [picks]);

  const operatePct = picks.length ? (summary["操作派"] / picks.length) * 100 : 0;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* 钩子 + section anchor */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Be the labeler</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink mb-4">
              你来当一回人类标注员，
              <br className="hidden sm:block" />
              看自己的鼠标怎么变成模型的方向盘。
            </h2>
            <p className="text-[15.5px] text-ink/70 leading-relaxed max-w-[60ch]">
              下面 5 道题，每道两个回答 A / B。挑你更喜欢的那个。
              你每选一次，下面的『偏好账本』加一行，最后聚成一条 reward 信号 ——
              真实流程里，这种偏好对成千上万条堆起来，就是 RM 训练数据。
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-cream border-2 border-ink rounded-2xl p-5 shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                数字感
              </div>
              <p className="font-display text-[18px] font-bold text-ink leading-snug">
                把 GPT-3 扭成 ChatGPT，主力不是参数 ——
                <br />
                是 <span className="bg-pop/30 px-1.5">~33 k 对偏好排序 + ~31 k 条 PPO prompt</span>，
                <br />
                外加 ~40 个真人标注员。
              </p>
              <p className="mt-2 font-mono text-[10px] text-ink/45 leading-relaxed">
                Ouyang et al. 2022, Table 6 + Model Card.
              </p>
            </div>
          </div>
        </div>

        {/* 主交互卡 */}
        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8">
          {/* 进度条 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                进度
              </div>
              <div className="flex gap-1.5">
                {PAIRS.map((_, i) => (
                  <span
                    key={i}
                    className={[
                      "w-7 h-2.5 rounded-full border-2 border-ink transition-all duration-250",
                      i < cursor ? "bg-pop" : "bg-white",
                    ].join(" ")}
                  />
                ))}
              </div>
              <div className="font-mono text-[11px] text-ink/70 ml-2 tabular-nums">
                {Math.min(cursor + (done ? 0 : 1), PAIRS.length)} / {PAIRS.length}
              </div>
            </div>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-ink bg-white text-ink/65 hover:bg-butter hover:text-ink font-mono text-[10.5px] uppercase tracking-[0.15em] transition-all duration-250"
            >
              <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
              重来
            </button>
          </div>

          {!done && (
            <div key={cursor} className="animate-enter-fade">
              <div className="px-5 py-4 bg-white border-2 border-ink rounded-2xl mb-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                  prompt #{cursor + 1}
                </div>
                <div className="font-display text-[19px] lg:text-[21px] font-bold text-ink leading-snug">
                  {pair.q}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {(["A", "B"] as const).map((which) => {
                  const ans = which === "A" ? pair.A : pair.B;
                  return (
                    <button
                      key={which}
                      onClick={() => choose(which)}
                      className="group text-left bg-white border-2 border-ink rounded-2xl p-5 shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-hover transition-all duration-300 ease-spring"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-[22px] font-bold text-ink leading-none">
                            {which}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                            候选回答
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-cream border-2 border-ink font-mono text-[10px] text-ink/70">
                          {ans.tag}
                        </span>
                      </div>
                      <p className="text-[14.5px] text-ink/80 leading-relaxed">
                        {ans.text}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45 group-hover:text-pop transition-colors">
                        <Check className="w-3 h-3" strokeWidth={2.8} />
                        选这个
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {done && (
            <div className="animate-enter-fade">
              <div className="text-center mb-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2">
                  你的偏好聚合完了
                </div>
                <h3 className="font-display text-[26px] lg:text-[32px] font-bold text-ink mb-1">
                  你是个 <span className="bg-butter px-2">{operatePct >= 60 ? "操作派" : operatePct <= 40 ? "百科派" : "中间派"}</span> 标注员
                </h3>
                <p className="text-[14px] text-ink/60">
                  操作派 {Math.round(operatePct)}% · 百科派 {Math.round(100 - operatePct)}%
                </p>
              </div>

              {/* 偏好账本 */}
              <div className="bg-white border-2 border-ink rounded-2xl p-5 mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                  偏好账本（这就是给 reward model 的训练数据）
                </div>
                <div className="space-y-2">
                  {picks.map((p, i) => {
                    const winner = p === "A" ? PAIRS[i].A : PAIRS[i].B;
                    const loser = p === "A" ? PAIRS[i].B : PAIRS[i].A;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 font-mono text-[11.5px] text-ink/70"
                      >
                        <span className="w-7 text-ink/40">#{i + 1}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal text-cream text-[10px]">
                          chosen · {winner.tag}
                        </span>
                        <span className="text-ink/40">›</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-ink/30 text-ink/45 text-[10px] line-through decoration-1">
                          rejected · {loser.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* reward 曲线（横向 bar） */}
              <div className="bg-white border-2 border-ink rounded-2xl p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                  接下来发生什么
                </div>
                <ol className="space-y-2 text-[14px] text-ink/80 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="font-mono text-ink/45 shrink-0">1.</span>
                    你这 5 条偏好对（× 几千个像你这样的标注员）= reward model 的训练数据
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-ink/45 shrink-0">2.</span>
                    RM 学会给任意回答打分：「这条回答看着像{operatePct >= 50 ? "操作派" : "百科派"}标注员喜欢的吗？」
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-ink/45 shrink-0">3.</span>
                    PPO 让模型多生成 RM 打高分的回答 → 模型整体往你这种口味靠
                  </li>
                </ol>
                <p className="mt-4 font-mono text-[10.5px] text-ink/45 leading-relaxed">
                  注意：如果几千个标注员的偏好不一样，最后训出来的就是"平均口味"。
                  Anthropic 2024 一篇博客提过这事 —— 不同文化背景的标注员对礼貌、直白的容忍度差很多。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionYouRank;
