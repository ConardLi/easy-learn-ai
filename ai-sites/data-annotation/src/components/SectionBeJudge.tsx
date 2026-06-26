/**
 * SectionBeJudge · 当一回标注员（L3 亲手标 · 点选哪个回答更好）
 *
 * 交互：给一道题 + 两个回答，用户点「这个更好」给它打钩；
 *   标完一题自动换下一题，最后给出「你标的偏好」小结。
 * 让用户真正摸到「偏好标注」这件事。
 */
import React, { useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";

type Task = {
  q: string;
  a: string;
  b: string;
  better: "a" | "b";
  why: string;
};

const TASKS: Task[] = [
  {
    q: "用户问：我电脑突然黑屏了怎么办？",
    a: "先别慌，按住电源键 10 秒强制关机，再开机看看；不行就检查电源线有没有松。",
    b: "可能是坏了，建议拿去修。",
    better: "a",
    why: "A 给了能立刻动手的具体步骤，B 只是泛泛打发。",
  },
  {
    q: "用户问：帮我把这句话写得礼貌点 ——「快点把报告发我」。",
    a: "可以的，你自己改改就行。",
    b: "可以改成：「方便的话，麻烦尽快把报告发我一下，谢谢！」",
    better: "b",
    why: "B 直接给了改好的句子，A 没真正完成任务。",
  },
  {
    q: "用户问：番茄炒蛋要先炒蛋还是先炒番茄？",
    a: "一般先把蛋炒到半熟盛出，再炒番茄出汁，最后倒回蛋一起翻几下。",
    b: "随便啦，都能吃。",
    better: "a",
    why: "A 说清了顺序和原因，B 没给有用信息。",
  },
];

const SectionBeJudge: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<"a" | "b" | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const task = TASKS[idx];
  const correct = picked === task.better;

  const pick = (choice: "a" | "b") => {
    if (picked) return;
    setPicked(choice);
    if (choice === task.better) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx === TASKS.length - 1) {
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  };

  const reset = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const summary = useMemo(() => {
    if (score === TASKS.length) return "三题全标对了！你抓的标准跟主流标注规范一致：要具体、要真完成任务。";
    if (score >= 1) return "标完了。注意：好的回答通常更具体、能直接帮上忙，这正是标注规范里反复强调的。";
    return "都标反了？别灰心 —— 标注规范的核心就是：优先选「具体、能落地、真解决问题」的那个。";
  }, [score]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">You Be The Judge</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          换你来：当一回偏好标注员
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          偏好标注的活儿，就是看两个回答、选出更好的那个。
          下面有三道题，你来标 —— 点你觉得更好的那个回答。
        </p>

        {!done ? (
          <div className="mt-9">
            <div className="flex items-center gap-2 mb-4">
              {TASKS.map((_, i) => (
                <span
                  key={i}
                  className={[
                    "h-2 rounded-full border-2 border-ink transition-all",
                    i === idx ? "w-8 bg-pop" : i < idx ? "w-2 bg-ink" : "w-2 bg-cream",
                  ].join(" ")}
                />
              ))}
              <span className="ml-auto font-mono text-[11px] tracking-[0.16em] uppercase text-ink/50">
                第 {idx + 1} / {TASKS.length} 题
              </span>
            </div>

            <div className="card-stamp p-6">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                这道题
              </div>
              <p className="font-display font-bold text-[18px] leading-[1.5] text-ink">{task.q}</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(["a", "b"] as const).map((opt) => {
                  const isPicked = picked === opt;
                  const isBetter = task.better === opt;
                  const reveal = picked !== null;
                  return (
                    <button
                      key={opt}
                      onClick={() => pick(opt)}
                      disabled={picked !== null}
                      className={[
                        "text-left rounded-2xl border-2 border-ink p-5 transition-all duration-250 ease-spring",
                        reveal && isBetter
                          ? "bg-teal/15 border-teal"
                          : reveal && isPicked && !isBetter
                            ? "bg-coral/15 border-coral"
                            : "bg-white hover:-translate-y-0.5 hover:shadow-stamp",
                        picked === null ? "cursor-pointer" : "cursor-default",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink/45">
                          回答 {opt.toUpperCase()}
                        </span>
                        {reveal && isBetter && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-teal px-2.5 py-0.5 font-bold text-[11px] text-cream">
                            <Check className="h-3 w-3" strokeWidth={3} /> 更好
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-[15px] leading-[1.7] text-ink/85">
                        {opt === "a" ? task.a : task.b}
                      </p>
                    </button>
                  );
                })}
              </div>

              {picked && (
                <div className="mt-5 animate-enter-fade">
                  <div
                    className={[
                      "rounded-2xl border-2 px-5 py-4",
                      correct ? "border-teal bg-teal/10" : "border-coral bg-coral/10",
                    ].join(" ")}
                  >
                    <span className="font-display font-bold text-[15px] text-ink">
                      {correct ? "标对了 ✓ " : "这个再想想 — "}
                    </span>
                    <span className="font-sans text-[15px] text-ink/80">{task.why}</span>
                  </div>
                  <button onClick={next} className="btn-stamp bg-ink text-cream mt-4">
                    {idx === TASKS.length - 1 ? "看小结" : "下一题"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-9 card-stamp p-8 animate-enter-fade">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
              你的标注小结
            </div>
            <div className="font-display font-extrabold text-[40px] text-ink leading-none">
              {score} / {TASKS.length}
              <span className="font-mono text-[15px] text-ink/45 ml-2">标对</span>
            </div>
            <p className="mt-4 font-sans text-[16.5px] leading-[1.75] text-ink/85 max-w-[680px]">
              {summary}
            </p>
            <p className="mt-4 font-serif italic text-[15px] text-ink/65 max-w-[680px]">
              真实项目里，每条数据会让好几个人各标一遍，再看大家标得一不一致 —— 这就是下面要讲的质量保证。
            </p>
            <button onClick={reset} className="btn-stamp bg-cream text-ink mt-5">
              <RotateCcw className="w-4 h-4" strokeWidth={2.4} />
              再标一遍
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionBeJudge;
