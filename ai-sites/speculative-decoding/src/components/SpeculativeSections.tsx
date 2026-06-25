import React, { useMemo, useState } from "react";
import { ArrowDown, Check, FastForward, Rabbit, RotateCcw, ShieldCheck, Turtle, X } from "lucide-react";
import { DemoNote, LinkCard, Section } from "./common";

const sentence = ["今天", "适合", "去", "公园", "散步", "。"];

export const Hero = () => (
  <section className="min-h-[92vh] overflow-hidden bg-butter px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-[1120px] items-center gap-12 lg:min-h-[78vh] lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="eyebrow !text-ink/60">Speculative Decoding · 推测解码</p>
        <h1 className="mt-5 font-display text-display-2xl font-extrabold">推测解码是什么？</h1>
        <p className="mt-7 max-w-[720px] text-[clamp(1.35rem,2.7vw,2rem)] font-extrabold leading-snug">
          <span className="bg-white px-2">推测解码让一个更快的助手先写几小块，再让主模型一次检查这批草稿。</span>
        </p>
        <div className="mt-7 max-w-[650px] space-y-4 text-[17px] leading-[1.8] text-ink/78">
          <p>模型读写的“小块”叫 Token。一个 Token 可以是一个字、一个词，或词的一部分。</p>
          <p>草稿猜对时，主模型一轮确认多块内容。猜错的地方会被改掉，后面的草稿也会重新来。</p>
        </div>
        <p className="mt-8 font-bold">先看普通生成为什么要一轮接一轮地等。</p>
        <div className="mt-8 flex items-center gap-2 font-mono text-xs font-bold"><ArrowDown className="h-4 w-4" />继续往下看</div>
      </div>
      <div className="rounded-[2.5rem] border-2 border-ink bg-cream p-6 shadow-stamp-xl">
        <div className="grid grid-cols-[.8fr_1.2fr] gap-5">
          <div className="rounded-3xl border-2 border-ink bg-coral p-5">
            <Rabbit className="h-9 w-9" />
            <strong className="mt-10 block font-display text-xl">草稿助手</strong>
            <p className="mt-2 text-sm">先猜 4 块</p>
          </div>
          <div className="rounded-3xl border-2 border-ink bg-teal p-5 text-white">
            <ShieldCheck className="h-9 w-9 text-butter" />
            <strong className="mt-10 block font-display text-xl">主模型</strong>
            <p className="mt-2 text-sm text-white/70">一次检查整段</p>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          {["今天","适合","去","公园"].map((t,i) => <span key={t} className={`flex-1 rounded-xl border-2 border-ink py-3 text-center font-bold ${i < 3 ? "bg-butter" : "bg-coral"}`}>{t}{i < 3 ? " ✓" : " ×"}</span>)}
        </div>
      </div>
    </div>
  </section>
);

export const OneByOne = () => {
  const [count, setCount] = useState(1);
  return (
    <Section number="02" label="普通生成" title="主模型原本每跑一轮，只确定下一小块" intro={<p>主模型写出一块后，要把它接回已有文字，再计算下一块。长回答需要重复很多轮。</p>} tone="white">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="card-stamp p-6">
          <div className="flex min-h-32 flex-wrap items-center gap-2 rounded-2xl border-2 border-ink bg-cream p-5">
            {sentence.slice(0,count).map((t,i) => <span key={i} className="animate-enter-pop rounded-xl border-2 border-ink bg-butter px-3 py-2 font-bold">{t}</span>)}
            {count < sentence.length && <span className="h-8 w-2 animate-pulse-dot bg-coral" />}
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setCount(Math.min(sentence.length,count+1))} className="btn-stamp bg-ink text-white"><FastForward className="h-4 w-4" />主模型再跑一轮</button>
            <button onClick={() => setCount(1)} className="btn-stamp bg-coral"><RotateCcw className="h-4 w-4" />重来</button>
          </div>
        </div>
        <div className="rounded-[2rem] border-2 border-ink bg-coral p-6 shadow-stamp-lg">
          <Turtle className="h-9 w-9" />
          <strong className="mt-5 block font-display text-3xl">{count} / {sentence.length}</strong>
          <p className="mt-3 leading-relaxed text-ink/70">当前已经调用主模型 {count} 次。这个演示把每块都简化成一次调用。</p>
        </div>
      </div>
    </Section>
  );
};

export const DraftAndVerify = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "草稿助手先写", body: "更快的助手连续猜出「今天 / 适合 / 去 / 海边」。", marks: ["?","?","?","?"] },
    { title: "主模型一起检查", body: "主模型同时给这四个位置打分。", marks: ["…","…","…","…"] },
    { title: "保留连续猜对的部分", body: "前三块通过。第四块没有通过。", marks: ["✓","✓","✓","×"] },
    { title: "从出错处继续", body: "主模型把「海边」改成「公园」，下一轮再猜。", marks: ["✓","✓","✓","公园"] },
  ];
  const current = steps[step];
  return (
    <Section number="03" label="草稿与验证" title="一轮推测解码分成先猜、再验两段" intro={<p>草稿助手追求快，主模型负责最后决定。主模型从左到右检查，前面连续通过的草稿可以直接留下。</p>} tone="butter">
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="card-stamp p-6">
          <span className="font-mono text-xs text-ink/50">步骤 {step+1} / 4</span>
          <h3 className="mt-3 font-display text-3xl font-bold">{current.title}</h3>
          <p className="mt-4 leading-relaxed text-ink/70">{current.body}</p>
          <div className="mt-6 flex gap-3">
            <button onClick={() => setStep(Math.min(3,step+1))} className="btn-stamp bg-ink text-white">下一步</button>
            <button onClick={() => setStep(0)} className="btn-stamp bg-coral"><RotateCcw className="h-4 w-4" />重来</button>
          </div>
        </div>
        <div key={step} className="rounded-[2rem] border-2 border-ink bg-teal p-6 text-white shadow-stamp-lg animate-enter-up">
          <div className="grid grid-cols-4 gap-3">
            {["今天","适合","去","海边"].map((t,i) => <div key={t} className={`rounded-2xl border-2 border-ink p-4 text-center ${current.marks[i] === "×" ? "bg-coral text-ink" : current.marks[i] === "✓" ? "bg-butter text-ink" : "bg-white text-ink"}`}><strong className="block">{step === 3 && i === 3 ? "公园" : t}</strong><span className="mt-3 block font-mono text-xl">{current.marks[i]}</span></div>)}
          </div>
        </div>
      </div>
    </Section>
  );
};

export const VerificationGame = () => {
  const options = [
    { text: "今天适合去公园散步", accepted: 4 },
    { text: "今天可能有一场暴雨", accepted: 2 },
    { text: "量子猫正在烤面包", accepted: 0 },
  ];
  const [choice,setChoice] = useState(0);
  const row = options[choice];
  const tokens = row.text.match(/.{1,2}/g) ?? [];
  return (
    <Section number="04" label="猜中多少" title="草稿越贴近主模型，一次留下的内容越多" intro={<p>常见句子和重复文字更容易猜中。需要复杂推理、风格变化大或内容很意外时，草稿通过率可能下降。</p>}>
      <div className="flex flex-wrap gap-2">
        {options.map((o,i) => <button key={o.text} onClick={() => setChoice(i)} className={`rounded-full border-2 border-ink px-4 py-2 font-bold ${choice===i ? "bg-ink text-white shadow-stamp" : "bg-white"}`}>例子 {i+1}</button>)}
      </div>
      <div className="mt-6 rounded-[2rem] border-2 border-ink bg-white p-6 shadow-stamp-lg">
        <div className="flex flex-wrap gap-2">{tokens.map((t,i) => <span key={i} className={`rounded-xl border-2 border-ink px-3 py-2 font-bold ${i < row.accepted ? "bg-butter" : "bg-coral"}`}>{t}{i < row.accepted ? <Check className="ml-1 inline h-4 w-4" /> : <X className="ml-1 inline h-4 w-4" />}</span>)}</div>
        <p className="mt-5 text-sm text-ink/65">这个例子里，连续通过 {Math.min(row.accepted,tokens.length)} 块。红色部分要丢掉并重新生成。</p>
        <DemoNote />
      </div>
    </Section>
  );
};

export const SpeedLab = () => {
  const [draft,setDraft] = useState(5);
  const [hit,setHit] = useState(75);
  const [draftCost,setDraftCost] = useState(18);
  const accepted = draft * hit / 100;
  const normalCost = draft * 100;
  const speculativeCost = draft * draftCost + 105;
  const gain = Math.max(.55, normalCost / speculativeCost * Math.max(.45, accepted / draft));
  return (
    <Section number="05" label="速度实验台" title="猜得多、猜得准、草稿够快，才容易省时间" intro={<p>草稿长度太短，主模型少不了几轮。草稿太长又经常猜错，助手白写的内容会变多。</p>} tone="white">
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="card-stamp p-6">
          <Slider label="每轮先猜几块" value={draft} min={2} max={10} suffix={`${draft} 块`} onChange={setDraft} />
          <Slider label="草稿通过率" value={hit} min={30} max={95} suffix={`${hit}%`} onChange={setHit} />
          <Slider label="草稿助手相对成本" value={draftCost} min={5} max={45} suffix={`${draftCost}%`} onChange={setDraftCost} />
        </div>
        <div className="rounded-[2rem] border-2 border-ink bg-teal p-6 text-white shadow-stamp-lg">
          <span className="font-mono text-xs text-white/55">示意结果</span>
          <strong className="mt-3 block font-display text-5xl text-butter">{gain.toFixed(1)}×</strong>
          <p className="mt-3 text-white/72">当前组合的相对速度估算。每轮平均可留下约 {accepted.toFixed(1)} 块草稿。</p>
          <div className="mt-7 h-8 overflow-hidden rounded-full border-2 border-white bg-white/10"><div className="h-full bg-butter transition-all" style={{width:`${Math.min(100,gain/3*100)}%`}} /></div>
          <DemoNote />
        </div>
      </div>
    </Section>
  );
};

export const Exactness = () => {
  const [mode,setMode] = useState<"greedy"|"sampling">("greedy");
  return (
    <Section number="06" label="结果会不会变" title="验证规则会保留主模型原本的选择方式" intro={<p>推测解码的关键要求是：草稿只能帮忙加速，最终结果仍由主模型的概率决定。</p>} tone="butter">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-stamp p-6">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setMode("greedy")} className={`rounded-xl border-2 border-ink p-3 font-bold ${mode==="greedy"?"bg-ink text-white":"bg-white"}`}>每次选最高分</button>
            <button onClick={() => setMode("sampling")} className={`rounded-xl border-2 border-ink p-3 font-bold ${mode==="sampling"?"bg-ink text-white":"bg-white"}`}>按概率抽取</button>
          </div>
          <p className="mt-6 rounded-2xl border-2 border-ink bg-white p-5 leading-relaxed">{mode==="greedy" ? "草稿和主模型选中同一块就保留；遇到第一处不同，主模型接管。" : "系统使用经过修正的接受与重抽规则，让最终分布和直接使用主模型一致。"}</p>
        </div>
        <div className="rounded-[2rem] border-2 border-ink bg-ink p-6 text-white shadow-stamp-lg">
          <ShieldCheck className="h-10 w-10 text-butter" />
          <h3 className="mt-5 font-display text-2xl font-bold">草稿没有最终决定权</h3>
          <p className="mt-3 leading-relaxed text-white/72">它只提出候选。严格的推测采样算法通过接受和重抽规则保持目标模型的输出分布。</p>
          <a className="mt-5 inline-block font-mono text-xs text-butter underline" href="https://arxiv.org/abs/2211.17192" target="_blank" rel="noreferrer">来源 · Leviathan 等，2022</a>
        </div>
      </div>
    </Section>
  );
};

export const WhenItHelps = () => {
  const [checks,setChecks] = useState({small:true,predictable:true,batch:false});
  const score = Object.values(checks).filter(Boolean).length;
  return (
    <Section number="07" label="什么时候值得用" title="单个请求等得久、草稿容易命中时，收益更明显" intro={<p>高并发服务已经能用批处理提高显卡利用率，推测解码的额外收益可能缩小。实际部署需要测延迟、吞吐和显存。</p>}>
      <div className="grid gap-6 lg:grid-cols-[1fr_.8fr]">
        <div className="card-stamp p-6 space-y-3">
          {([
            ["small","有一个明显更快的草稿助手"],
            ["predictable","输出包含较多可预测或重复内容"],
            ["batch","当前批量较小，更在意单次等待"],
          ] as const).map(([key,label]) => <label key={key} className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-ink bg-cream p-4"><input type="checkbox" checked={checks[key]} onChange={e => setChecks({...checks,[key]:e.target.checked})} className="h-5 w-5 accent-coral" /><span className="font-bold">{label}</span></label>)}
        </div>
        <div className={`rounded-[2rem] border-2 border-ink p-6 shadow-stamp-lg ${score>=2?"bg-butter":"bg-coral"}`}><strong className="font-display text-3xl">{score>=2?"值得做一次基准测试":"收益可能有限"}</strong><p className="mt-4 leading-relaxed text-ink/70">这只是筛选方向。草稿长度、批量大小和硬件都会改变结果。</p></div>
      </div>
    </Section>
  );
};

export const Related = () => (
  <Section number="08" label="把前后概念接起来" title="它改变每轮能确认几块内容，模型本身没有重新训练" intro={<p>推测解码发生在模型运行和写回答的时候。先理解逐块生成，再看部署框架怎样把它和批处理组合起来。</p>} tone="white">
    <div className="grid gap-5 md:grid-cols-3">
      <LinkCard href="../model-inference/index.html" title="模型推理">看普通模型如何一轮生成一个 Token。</LinkCard>
      <LinkCard href="../continuous-batching/index.html" title="连续批处理">它通过动态排队提高同时服务多人时的吞吐。</LinkCard>
      <LinkCard href="../deploy/index.html" title="模型部署">把量化、缓存、批处理和推测解码放回完整系统。</LinkCard>
    </div>
  </Section>
);

const Slider = ({label,value,min,max,suffix,onChange}:{label:string;value:number;min:number;max:number;suffix:string;onChange:(n:number)=>void}) => (
  <label className="mb-7 block"><span className="flex justify-between gap-3 text-sm font-bold"><span>{label}</span><span className="font-mono">{suffix}</span></span><input className="mt-3 w-full accent-coral" type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} /></label>
);
