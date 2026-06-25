import React, { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { DemoBadge, LinkCard, SectionHead } from "./common";

const EXAMPLES = [
  { text: "小猫趴在窗边，因为那里很暖和", focus: 9, weights: [18, 24, 6, 8, 22, 31, 3, 10, 12, 44, 38, 5, 28, 30] },
  { text: "小李把杯子递给小王，他说谢谢", focus: 10, weights: [42, 35, 5, 12, 10, 9, 8, 38, 34, 3, 50, 14, 6, 6] },
  { text: "雨停以后，路边的积水慢慢变少", focus: 12, weights: [24, 28, 12, 10, 3, 20, 18, 8, 32, 35, 14, 15, 42, 30] },
];

const tone = (weight: number) =>
  weight >= 25 ? "bg-coral text-cream" : weight >= 14 ? "bg-butter" : weight >= 8 ? "bg-butter/40" : "bg-white";

export const SectionAttentionHero: React.FC = () => {
  const [example, setExample] = useState(0);
  const active = EXAMPLES[example];
  return (
    <section className="relative overflow-hidden bg-teal px-4 py-16 text-cream sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1160px] gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <div className="eyebrow text-butter-soft">Attention Mechanism · 注意力机制</div>
          <h1 className="mt-5 font-display text-display-xl font-extrabold">注意力是什么？</h1>
          <p className="mt-7 max-w-xl font-display text-[clamp(1.4rem,3vw,2.15rem)] font-bold leading-[1.3]">
            <span className="box-decoration-clone bg-butter px-2 text-ink">
              注意力机制 = 模型处理当前内容时，给相关位置更高的参考权重。
            </span>
          </p>
          <div className="mt-7 max-w-xl space-y-4 text-[16px] leading-[1.8] text-cream/85">
            <p>模型会先把文字切成一个个小片段。为了方便演示，这里暂时用单个汉字代表一个片段。</p>
            <p>模型处理当前片段时，会决定前面哪些位置多看一点、哪些位置少看一点。</p>
            <p>权重越高，那里的信息对当前结果影响越大。点击右边的句子，看看重点怎样跟着当前词变化。</p>
          </div>
          <p className="mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-[.12em] text-butter-soft">
            先看同一个词为什么会找不同线索 <ArrowDown className="h-4 w-4" />
          </p>
        </div>
        <div className="lg:col-span-6">
          <div className="rounded-[2rem] border-2 border-ink bg-cream p-5 text-ink shadow-stamp-xl lg:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] font-bold tracking-[.16em] text-ink/50">当前处理的位置</div>
                <div className="mt-1 font-display text-xl font-bold">句子里的「{active.text[active.focus]}」</div>
              </div>
              <DemoBadge />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {Array.from(active.text).map((char, index) => (
                <span key={`${char}-${index}`} className={`relative rounded-lg border-2 border-ink px-2.5 py-2 font-display text-lg font-bold ${tone(active.weights[index])}`}>
                  {char}
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-ink bg-white px-1 font-mono text-[8px]">{active.weights[index]}</span>
                </span>
              ))}
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {EXAMPLES.map((item, index) => (
                <button key={item.text} onClick={() => setExample(index)} className={`rounded-xl border-2 border-ink px-3 py-2 text-left text-xs font-bold transition-all ${example === index ? "bg-ink text-cream shadow-stamp" : "bg-white"}`}>
                  例子 {index + 1}
                </button>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink/65">数字是示意权重，帮你看清“当前词变了，参考重点也会变”。</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionSameWord: React.FC = () => {
  const [sentence, setSentence] = useState("银行旁边的河岸很安静");
  const chars = Array.from(sentence.trim()).slice(0, 18);
  const [focus, setFocus] = useState(0);
  const weights = useMemo(
    () => chars.map((char, index) => {
      const distance = Math.abs(index - focus);
      const same = char === chars[focus] ? 12 : 0;
      return Math.max(3, Math.round(28 - distance * 4 + same));
    }),
    [chars, focus],
  );
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead number="02" label="重点会跟着问题变" title={<>模型每处理一个位置，<br />都会重新挑重点</>} intro={<p>注意力没有一张固定的“重点名单”。当前处理的位置变了，模型发出的查找需求也会变。输入一句话，再点一个字。</p>} />
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="card-stamp p-5 lg:col-span-4">
            <label className="font-display text-xl font-bold" htmlFor="attention-input">换成你的句子</label>
            <textarea id="attention-input" rows={4} maxLength={18} value={sentence} onChange={(event) => { setSentence(event.target.value); setFocus(0); }} className="mt-4 w-full resize-none rounded-2xl border-2 border-ink bg-cream px-4 py-3 outline-none focus:shadow-stamp" />
            <p className="mt-3 text-xs leading-relaxed text-ink/55">这是一段教学模拟。真实模型会根据训练学到的关系计算权重。</p>
          </div>
          <div className="rounded-[2rem] border-2 border-ink bg-butter-tint p-5 shadow-stamp-lg lg:col-span-8">
            <div className="font-mono text-[10px] font-bold tracking-[.15em] text-ink/50">点一个字，看看它参考哪里</div>
            <div className="mt-5 flex flex-wrap gap-2">
              {chars.map((char, index) => (
                <button key={`${char}-${index}`} onClick={() => setFocus(index)} className={`rounded-xl border-2 border-ink px-3 py-2 font-display text-lg font-bold ${index === focus ? "bg-ink text-cream shadow-stamp" : tone(weights[index])}`}>
                  {char}
                </button>
              ))}
            </div>
            <div className="mt-7 space-y-2">
              {weights.map((weight, index) => (
                <div key={index} className="grid grid-cols-[28px_1fr_38px] items-center gap-3">
                  <span className="font-display font-bold">{chars[index]}</span>
                  <div className="h-3 overflow-hidden rounded-full border-2 border-ink bg-white"><div className="h-full bg-coral transition-all duration-250" style={{ width: `${Math.min(100, weight * 2)}%` }} /></div>
                  <span className="font-mono text-xs">{weight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const QKV = [
  { id: "Q", name: "Query · 查询", plain: "当前位置想找什么", example: "处理「它」时：我想找它指的是谁", color: "bg-coral text-cream" },
  { id: "K", name: "Key · 键", plain: "每个位置提供的匹配线索", example: "「小猫」带着“可能是对象”的线索", color: "bg-teal text-cream" },
  { id: "V", name: "Value · 值", plain: "匹配以后真正拿回的信息", example: "从「小猫」拿回它的含义和上下文", color: "bg-butter" },
];

export const SectionQkvNames: React.FC = () => {
  const [step, setStep] = useState(0);
  const active = QKV[step];
  return (
    <section className="border-y-2 border-ink bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead number="03" label="给三个动作起名字" title={<>Q 负责找，K 负责匹配，<br />V 负责把信息带回来</>} intro={<p>先记动作，再记字母。每个位置都会产生 Q、K、V 三组数字。Q 和所有 K 比较，比较结果决定从各个 V 拿多少信息。</p>} />
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-4">
            {QKV.map((item, index) => (
              <button key={item.id} onClick={() => setStep(index)} className={`w-full rounded-2xl border-2 border-ink p-4 text-left transition-all ${step === index ? `${item.color} shadow-stamp` : "bg-cream"}`}>
                <span className="font-mono text-xs font-bold">{item.id}</span>
                <span className="mt-1 block font-display text-lg font-bold">{item.name}</span>
                <span className={`mt-1 block text-sm ${step === index && item.id !== "V" ? "text-cream/75" : "text-ink/65"}`}>{item.plain}</span>
              </button>
            ))}
          </div>
          <div className="rounded-[2rem] border-2 border-ink bg-cream p-6 shadow-stamp-lg lg:col-span-8">
            <div key={active.id} className="animate-enter-fade">
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-ink font-mono text-3xl font-black shadow-stamp ${active.color}`}>{active.id}</div>
              <h3 className="mt-6 font-display text-3xl font-bold">{active.plain}</h3>
              <p className="mt-4 rounded-2xl border-2 border-ink bg-white p-4 text-[15px] leading-relaxed">{active.example}</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="rounded-xl border-2 border-ink bg-coral px-3 py-2 font-bold text-cream">Q</span>
                <ArrowRight className="h-5 w-5" />
                <span className="rounded-xl border-2 border-ink bg-teal px-3 py-2 font-bold text-cream">与所有 K 比较</span>
                <ArrowRight className="h-5 w-5" />
                <span className="rounded-xl border-2 border-ink bg-butter px-3 py-2 font-bold">按比例拿 V</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionWeightMixer: React.FC = () => {
  const [weights, setWeights] = useState([55, 25, 20]);
  const names = ["小猫", "窗边", "暖和"];
  const total = weights.reduce((sum, value) => sum + value, 0);
  const normalized = weights.map((value) => value / total);
  return (
    <section className="bg-butter-tint px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead number="04" label="权重怎样汇总信息" title={<>每个位置都贡献一点，<br />比例由注意力权重决定</>} intro={<p>模型把比较分数压成一组加起来等于 100% 的比例。随后，各位置携带的信息按这个比例混在一起，形成当前位置的新表示。</p>} />
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="card-stamp p-6 lg:col-span-5">
            <div className="flex items-center justify-between"><h3 className="font-display text-xl font-bold">拖动三处原始分数</h3><DemoBadge /></div>
            {weights.map((value, index) => (
              <label key={names[index]} className="mt-6 block">
                <span className="flex justify-between text-sm font-bold"><span>{names[index]}</span><span>{value}</span></span>
                <input className="range-control mt-3" type="range" min={1} max={100} value={value} onChange={(event) => setWeights((current) => current.map((item, itemIndex) => itemIndex === index ? Number(event.target.value) : item))} />
              </label>
            ))}
            <button onClick={() => setWeights([55,25,20])} className="btn-stamp mt-7 bg-white"><RotateCcw className="h-4 w-4" />恢复示例</button>
          </div>
          <div className="rounded-[2rem] border-2 border-ink bg-teal p-6 text-cream shadow-stamp-lg lg:col-span-7">
            <div className="font-mono text-[10px] font-bold tracking-[.16em] text-butter-soft">归一后的权重</div>
            <div className="mt-6 space-y-4">
              {normalized.map((value, index) => (
                <div key={names[index]}>
                  <div className="mb-2 flex justify-between text-sm font-bold"><span>{names[index]} 的信息</span><span>{(value * 100).toFixed(0)}%</span></div>
                  <div className="h-8 overflow-hidden rounded-xl border-2 border-cream bg-ink"><div className={`${index === 0 ? "bg-coral" : index === 1 ? "bg-butter" : "bg-pop"} h-full transition-all duration-250`} style={{ width: `${value * 100}%` }} /></div>
                </div>
              ))}
            </div>
            <p className="mt-7 rounded-2xl border-2 border-cream/70 p-4 text-sm leading-relaxed">
              当前结果更偏向「{names[normalized.indexOf(Math.max(...normalized))]}」的信息。真实模型混合的是多维数字，这里用三条色带演示比例。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionTwoSources: React.FC = () => {
  const [mode, setMode] = useState<"self" | "cross">("self");
  const [question, setQuestion] = useState("它为什么喜欢趴在窗边？");
  const [source, setSource] = useState("小猫喜欢趴在窗边。那里下午会晒到太阳。");
  return (
    <section className="border-y-2 border-ink bg-teal px-4 py-20 text-cream sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead inverse number="05" label="信息从哪里来" title={<>自己看自己，叫自注意力；<br />去另一段内容里找，叫交叉注意力</>} intro={<p>两种注意力使用同一套“比较后取信息”的动作。差别只在 Q、K、V 来自哪里。</p>} />
        <div className="rounded-[2rem] border-2 border-ink bg-cream p-5 text-ink shadow-stamp-xl lg:p-7">
          <div className="inline-flex rounded-full border-2 border-ink bg-white p-1">
            <button onClick={() => setMode("self")} className={`rounded-full px-4 py-2 text-sm font-bold ${mode === "self" ? "bg-ink text-cream" : ""}`}>自注意力</button>
            <button onClick={() => setMode("cross")} className={`rounded-full px-4 py-2 text-sm font-bold ${mode === "cross" ? "bg-ink text-cream" : ""}`}>交叉注意力</button>
          </div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <label className="block">
              <span className="font-display text-lg font-bold">{mode === "self" ? "正在处理的句子" : "查询内容"}</span>
              <textarea value={question} onChange={(event) => setQuestion(event.target.value)} rows={4} className="mt-3 w-full resize-none rounded-2xl border-2 border-ink bg-white p-4 outline-none focus:shadow-stamp" />
            </label>
            <label className="block">
              <span className="font-display text-lg font-bold">{mode === "self" ? "K、V 也来自这句话" : "K、V 来自另一段内容"}</span>
              <textarea value={mode === "self" ? question : source} onChange={(event) => mode === "self" ? setQuestion(event.target.value) : setSource(event.target.value)} rows={4} className="mt-3 w-full resize-none rounded-2xl border-2 border-ink bg-butter-tint p-4 outline-none focus:shadow-stamp" />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border-2 border-ink bg-white p-4">
            <span className="rounded-xl border-2 border-ink bg-coral px-3 py-2 font-bold text-cream">Q：{question.slice(0,8)}…</span>
            <ArrowRight className="h-5 w-5" />
            <span className="rounded-xl border-2 border-ink bg-teal px-3 py-2 font-bold text-cream">{mode === "self" ? "在同一句话里找" : "去资料里找"}</span>
            <ArrowRight className="h-5 w-5" />
            <span className="rounded-xl border-2 border-ink bg-butter px-3 py-2 font-bold">拿回相关信息</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionLimits: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const cards = [
    { text: "某个词权重高，说明它对当前计算影响更大。", right: true },
    { text: "看一张注意力图，就能完整解释模型为什么这样回答。", right: false },
    { text: "注意力会为每个当前位置重新计算参考比例。", right: true },
  ];
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead number="06" label="别把权重当成人类理由" title={<>注意力图能看影响大小，<br />解释不了模型的全部决定</>} intro={<p>模型还有很多层、许多注意力头和后续加工。单独一张权重图只展示其中一步。点每句话判断一下。</p>} />
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => {
            const answered = index in answers;
            const correct = answers[index] === card.right;
            return (
              <div key={card.text} className="card-stamp flex min-h-[230px] flex-col p-5">
                <p className="font-display text-lg font-bold leading-relaxed">{card.text}</p>
                <div className="mt-auto flex gap-2 pt-6">
                  <button onClick={() => setAnswers((current) => ({ ...current, [index]: true }))} className="btn-stamp flex-1 bg-butter"><Check className="h-4 w-4" />对</button>
                  <button onClick={() => setAnswers((current) => ({ ...current, [index]: false }))} className="btn-stamp flex-1 bg-white"><X className="h-4 w-4" />不对</button>
                </div>
                {answered && <p className={`mt-4 rounded-xl border-2 border-ink p-3 text-sm font-bold ${correct ? "bg-teal text-cream" : "bg-coral text-cream"}`}>{correct ? "判断正确" : `这里应选「${card.right ? "对" : "不对"}」`}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const SectionAttentionNext: React.FC = () => (
  <section className="bg-butter-tint px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-[1140px]">
      <SectionHead number="07" label="接着学" title={<>一套注意力给出一种观察结果，<br />模型通常会并行算很多套</>} intro={<p>Q 发起查找，K 提供匹配线索，权重决定从各个 V 拿回多少信息。下一章会把这套动作复制成多个“头”。</p>} />
      <div className="grid gap-5 md:grid-cols-2">
        <LinkCard href="../multi-head-attention/index.html" title="下一章：Multi-Head Attention" desc="看看多个注意力头怎样同时观察指代、动作和位置关系。" />
        <LinkCard href="../transformer/index.html" title="回到 Transformer 全景" desc="把注意力放回完整架构，继续看编码器、解码器和每层的其他部件。" />
      </div>
      <div className="mt-8 rounded-3xl border-2 border-ink bg-ink p-6 text-cream shadow-stamp">
        <div className="font-mono text-[10px] font-bold tracking-[.16em] text-butter-soft">本章结论</div>
        <p className="mt-2 font-display text-2xl font-bold">注意力会为当前内容挑参考重点，再按权重拿回信息。</p>
        <p className="mt-3 font-mono text-[10px] text-cream/55">资料：Vaswani et al., Attention Is All You Need, 2017 · arXiv:1706.03762</p>
      </div>
    </div>
  </section>
);
