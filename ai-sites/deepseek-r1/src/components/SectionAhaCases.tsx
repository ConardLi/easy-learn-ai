/**
 * Section 03 · "Wait, wait. Wait." —— Aha Moment 案例库
 *
 * 主轴：4 个真实 R1 / R1-Zero 思考片段，tab 切换不同 case，trace 段里反思词 / 验证词 / 推翻词高亮三种颜色。
 * 次交互：每个 case 卡片右侧有一组 inline chip，统计该案例 trace 里三类词各出现几次（hover 联动 trace 高亮）。
 *
 * 数据来源：
 *  - arXiv:2501.12948 Table 3（AIME 方程题，Wait wait wait）
 *  - HuggingFace 上 OpenR1 / R1-Zero 公开 trace 片段（缩略改写，保持人话）
 *  - Nature 2025 Extended Data Fig.1a 列出的反思词清单
 */
import React, { useMemo, useState } from "react";

type Word = { kind: "reflect" | "verify" | "reject" | "plain"; text: string };
type Case = {
  id: string;
  title: string;
  domain: "math" | "code" | "logic" | "physics";
  problem: string;
  step: string;
  segments: Word[];
  source: string;
};

const CASES: Case[] = [
  {
    id: "aime-eq",
    title: "AIME 方程题",
    domain: "math",
    problem: "√(a − √(a + x)) = x，求所有实数解之和（a > 1）",
    step: "step ~6200 · R1-Zero",
    segments: [
      { kind: "plain", text: "两边平方：a − √(a + x) = x²，移项：√(a + x) = a − x²。再平方得 x⁴ − 2a·x² − x + (a² − a) = 0。" },
      { kind: "plain", text: " 这是四次方程，Vieta 让所有根之和为 0……" },
      { kind: "reflect", text: " Wait, wait. Wait. " },
      { kind: "reject", text: "这里好像不对，" },
      { kind: "plain", text: "让我退回去：原方程左边 √(...) ≥ 0，所以 x ≥ 0；那些负根都得扔掉。" },
      { kind: "verify", text: " 让我用 a = 2 校验一下：" },
      { kind: "plain", text: "代入算出 x = (√5 − 1)/2，对得上 (√(4a−3) − 1)/2。" },
    ],
    source: "arXiv:2501.12948 · Table 3 改写",
  },
  {
    id: "codeforces",
    title: "Codeforces 错路退栈",
    domain: "code",
    problem: "给定数组 a[1..n]，求最长子数组使得所有元素 XOR 为 0",
    step: "step ~7400 · R1-Zero",
    segments: [
      { kind: "plain", text: "想法 1：枚举所有子数组，O(n²)。" },
      { kind: "reject", text: " 不行，n ≤ 2e5 会 TLE。" },
      { kind: "plain", text: " 那用前缀异或 p[i]，子数组 (l, r] XOR = 0 等价于 p[l] = p[r]。" },
      { kind: "plain", text: "扫一遍记录每个 p 值的最小下标，碰到相同的就更新答案。" },
      { kind: "reflect", text: " Hmm, hold on, " },
      { kind: "verify", text: "让我先 verify 一下 p[0] 怎么处理：" },
      { kind: "plain", text: "应该把 p[0] = 0 提前放进 map，这样以 1 开头的子数组也能被算到。否则会漏前缀。" },
    ],
    source: "公开 R1-Zero trace 风格改写 · LiveCodeBench 风",
  },
  {
    id: "logic-trolls",
    title: "逻辑题：5 个开关",
    domain: "logic",
    problem: "三楼有三盏灯，一楼三个开关，只能上楼一次，怎么确定每个开关控制哪盏？",
    step: "step ~5800 · R1",
    segments: [
      { kind: "plain", text: "想到一个直接的：打开开关 A，上楼看哪盏亮。" },
      { kind: "reject", text: " 但这样只能确定一个，剩下两个开关分不清。" },
      { kind: "reflect", text: " But wait, " },
      { kind: "plain", text: "灯泡有温度。把 A 打开 10 分钟，关掉；再打开 B；立刻上楼。" },
      { kind: "verify", text: " Let me verify: " },
      { kind: "plain", text: "亮的那盏是 B，不亮但热的是 A，不亮也凉的是 C。三个开关一一对应。" },
    ],
    source: "R1 公开 sample · classic puzzle",
  },
  {
    id: "physics",
    title: "物理：单摆周期",
    domain: "physics",
    problem: "一根长度 L 的轻绳挂质量 m，小角度近似下周期是多少？",
    step: "step ~4900 · R1",
    segments: [
      { kind: "plain", text: "对单摆，回复力 ≈ −mg sinθ ≈ −mgθ（小角度）。" },
      { kind: "plain", text: "运动方程 L·θ̈ = −g·θ，所以 ω² = g/L。" },
      { kind: "reflect", text: " Hmm, however, " },
      { kind: "verify", text: "I should double-check: " },
      { kind: "plain", text: "对 SHM ω² = (恢复系数 / 惯量)，这里恢复系数是 g/L，惯量项是 1，所以 T = 2π·√(L/g)。" },
      { kind: "plain", text: "代 L = 1 m, g = 9.8: T ≈ 2.007 s，与公开实验吻合。" },
    ],
    source: "R1 公开 sample · GPQA 风物理",
  },
];

/** 统计某 case 三种词出现次数 */
function countCase(c: Case) {
  return c.segments.reduce(
    (acc, s) => {
      if (s.kind === "reflect") acc.reflect += 1;
      else if (s.kind === "verify") acc.verify += 1;
      else if (s.kind === "reject") acc.reject += 1;
      return acc;
    },
    { reflect: 0, verify: 0, reject: 0 },
  );
}

const KIND_STYLE: Record<Exclude<Word["kind"], "plain">, { bg: string; fg: string; label: string }> = {
  reflect: { bg: "bg-pop/22", fg: "text-pop", label: "反思 reflect" },
  verify: { bg: "bg-teal/18", fg: "text-teal", label: "校验 verify" },
  reject: { bg: "bg-coral/22", fg: "text-coral", label: "推翻 reject" },
};

const DOMAIN_LABEL: Record<Case["domain"], string> = {
  math: "数学",
  code: "代码",
  logic: "逻辑",
  physics: "物理",
};

const SectionAhaCases: React.FC = () => {
  const [activeId, setActiveId] = useState(CASES[0].id);
  const [hoverKind, setHoverKind] = useState<Exclude<Word["kind"], "plain"> | null>(null);
  const c = CASES.find((x) => x.id === activeId)!;
  const counts = useMemo(() => countCase(c), [c]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-cream/50">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">Aha Moment · Case Library</span>
        </div>

        <h2 className="font-display text-display-lg text-ink leading-[1.1] mb-4 max-w-[22ch]">
          <span className="font-mono text-[0.7em] text-pop">"Wait, wait. Wait."</span>
          <br />
          模型自己冒出来的那句话。
        </h2>
        <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[60ch] mb-9">
          没人教它"先想再答"，但它训着训着就会自言自语停下、推翻自己、再换一条路。下面这 4 段是真实 R1 / R1-Zero 的 thinking 片段（缩写改写）。
          点 tab 换案例，悬停色块只挑出某一类词。
        </p>

        {/* case tab */}
        <div className="flex flex-wrap gap-2 mb-5">
          {CASES.map((cs) => {
            const on = cs.id === activeId;
            return (
              <button
                key={cs.id}
                onClick={() => setActiveId(cs.id)}
                className={[
                  "px-4 py-2.5 rounded-2xl border-2 border-ink font-mono text-[11.5px] transition-all duration-200 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-[4px_4px_0_0_#FF4D74] -translate-y-0.5"
                    : "bg-white text-ink/70 hover:bg-butter shadow-stamp",
                ].join(" ")}
              >
                <span className="font-bold mr-1.5">[{DOMAIN_LABEL[cs.domain]}]</span>
                {cs.title}
              </button>
            );
          })}
        </div>

        {/* 主卡 */}
        <div key={activeId} className="card-stamp p-5 lg:p-7 animate-enter-fade">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-7">
            {/* 左：trace */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                  user prompt
                </div>
                <div className="font-mono text-[10px] text-ink/45">
                  · {c.step}
                </div>
              </div>
              <div className="p-3 bg-cream border-2 border-ink rounded-xl mb-3 font-mono text-[12.5px] text-ink leading-relaxed">
                {c.problem}
              </div>

              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2">
                R1 internal thought · &lt;think&gt;...&lt;/think&gt;
              </div>
              <div className="p-4 lg:p-5 bg-ink rounded-xl font-mono text-[12.5px] leading-[1.8] text-cream/80">
                {c.segments.map((seg, i) => {
                  if (seg.kind === "plain") {
                    return <span key={i}>{seg.text}</span>;
                  }
                  const style = KIND_STYLE[seg.kind];
                  const dim = hoverKind && hoverKind !== seg.kind;
                  return (
                    <span
                      key={i}
                      className={[
                        style.bg,
                        style.fg,
                        "font-bold px-1 rounded transition-opacity duration-200",
                        dim ? "opacity-25" : "opacity-100",
                      ].join(" ")}
                    >
                      {seg.text}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* 右：词频统计 + 联动 hover */}
            <div className="lg:col-span-4 space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                本片段里三类词次数
              </div>
              {(["reflect", "verify", "reject"] as const).map((k) => {
                const n = counts[k];
                const style = KIND_STYLE[k];
                return (
                  <div
                    key={k}
                    onMouseEnter={() => setHoverKind(k)}
                    onMouseLeave={() => setHoverKind(null)}
                    className={[
                      "p-3.5 border-2 border-ink rounded-xl cursor-default transition-all duration-200",
                      style.bg,
                      hoverKind === k ? "shadow-stamp -translate-x-0.5 -translate-y-0.5" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline justify-between">
                      <div className={`font-mono text-[11px] font-bold ${style.fg}`}>
                        {style.label}
                      </div>
                      <div className={`font-display text-[22px] font-bold tabular-nums ${style.fg}`}>
                        {n}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="p-3.5 bg-cream border-2 border-ink rounded-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-1.5">
                  来源
                </div>
                <div className="font-mono text-[10.5px] text-ink/70 leading-relaxed">
                  {c.source}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 font-mono text-[11px] text-ink/55 leading-relaxed max-w-[64ch]">
          论文原话：「模型学会用拟人语气重新思考。」 ——
          这种"自我反思"在 R1-Zero 训练里**不是被教的**，而是规则奖励逼出来的副产物。
        </p>
      </div>
    </section>
  );
};

export default SectionAhaCases;
