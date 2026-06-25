import React, { useMemo, useState } from "react";
import { ArrowDown, Clock3, Gauge, Layers3, Play, RotateCcw, Users } from "lucide-react";
import { DemoNote, LinkCard, Section } from "./common";

type Request = { id: string; arrive: number; length: number; color: string };
const requests: Request[] = [
  { id: "A", arrive: 0, length: 6, color: "bg-coral" },
  { id: "B", arrive: 0, length: 2, color: "bg-butter" },
  { id: "C", arrive: 0, length: 4, color: "bg-teal text-white" },
  { id: "D", arrive: 2, length: 3, color: "bg-pop text-white" },
  { id: "E", arrive: 4, length: 2, color: "bg-cream" },
];

export const Hero = () => (
  <section className="relative min-h-[92vh] overflow-hidden bg-coral px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-[1120px] items-center gap-12 lg:min-h-[78vh] lg:grid-cols-[1.02fr_.98fr]">
      <div>
        <p className="eyebrow !text-ink/65">Continuous Batching · 连续批处理</p>
        <h1 className="mt-5 font-display text-display-2xl font-extrabold">连续批处理是什么？</h1>
        <p className="mt-7 max-w-[710px] text-[clamp(1.35rem,2.7vw,2rem)] font-extrabold leading-snug">
          <span className="bg-butter px-2">连续批处理会在每轮生成后重新排队，空位一出现就补进新请求。</span>
        </p>
        <div className="mt-7 max-w-[650px] space-y-4 text-[17px] leading-[1.8] text-ink/78">
          <p>AI 写回答时，会一小块一小块地往后接。服务器可以让多个人的回答同时往前走。</p>
          <p>有人提前写完，服务器马上把下一位放进来。显卡少等人，单位时间能处理更多请求。</p>
        </div>
        <p className="mt-8 font-bold">先看固定的一批请求，空位是怎么被浪费的。</p>
        <div className="mt-8 flex items-center gap-2 font-mono text-xs font-bold"><ArrowDown className="h-4 w-4" />继续往下看</div>
      </div>
      <div className="rounded-[2.5rem] border-2 border-ink bg-cream p-6 shadow-stamp-xl">
        <div className="flex items-center justify-between">
          <strong className="font-mono text-xs tracking-widest">GPU · 当前一轮</strong>
          <span className="rounded-full border-2 border-ink bg-white px-3 py-1 font-mono text-[10px]">4 个位置</span>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {["A", "D", "C", "E"].map((id, i) => (
            <div key={id} className={`flex aspect-square items-center justify-center rounded-2xl border-2 border-ink ${["bg-coral","bg-pop text-white","bg-teal text-white","bg-butter"][i]} transition-transform duration-400 ease-spring hover:-translate-y-2`}>
              <span className="font-display text-3xl font-bold">{id}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-5 gap-2">
          {[0,1,2,3,4].map((n) => <div key={n} className={`h-3 rounded-full border border-ink ${n < 4 ? "bg-ink" : "bg-white"}`} />)}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/65">B 刚写完，D 已经顶上。整批不用停下来重组。</p>
      </div>
    </div>
  </section>
);

export const FixedBatchProblem = () => {
  const [mode, setMode] = useState<"fixed" | "continuous">("fixed");
  const rows = mode === "fixed"
    ? [["A","A","A","A","A","A"],["B","B","","","",""],["C","C","C","C","",""]]
    : [["A","A","A","A","A","A"],["B","B","D","D","D","E"],["C","C","C","C","E",""]];
  return (
    <Section number="02" label="固定批处理的等待" title="短回答写完了，位置却要等整批结束" intro={<p>固定批处理会先凑好一批请求，再一起跑到这批全部结束。回答长度不同，先完成的请求会留下空位。</p>} tone="white">
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="card-stamp p-6">
          <div className="grid grid-cols-2 gap-2 rounded-2xl border-2 border-ink bg-cream p-2">
            <button onClick={() => setMode("fixed")} className={`rounded-xl px-3 py-3 font-bold ${mode === "fixed" ? "bg-ink text-white" : "bg-white"}`}>固定的一批</button>
            <button onClick={() => setMode("continuous")} className={`rounded-xl px-3 py-3 font-bold ${mode === "continuous" ? "bg-ink text-white" : "bg-white"}`}>连续补位</button>
          </div>
          <div className="mt-6 rounded-2xl border-2 border-ink bg-butter-tint p-5">
            <strong className="font-display text-2xl">{mode === "fixed" ? "B 写完后，位置空着" : "B 写完后，D 马上进来"}</strong>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{mode === "fixed" ? "服务器在等 A 和 C。这段时间，新来的 D 还在队伍里。" : "服务器每轮都看一次谁完成了，然后把等待中的请求补进空位。"}</p>
          </div>
        </div>
        <div className="rounded-[2rem] border-2 border-ink bg-teal p-5 text-white shadow-stamp-lg">
          <div className="grid grid-cols-[32px_repeat(6,1fr)] gap-2 text-center font-mono text-[10px]">
            <span />
            {[1,2,3,4,5,6].map(n => <span key={n}>轮 {n}</span>)}
            {rows.flatMap((row, ri) => [
              <strong key={`l${ri}`} className="flex items-center justify-center">{String.fromCharCode(65 + ri)}</strong>,
              ...row.map((cell, ci) => <span key={`${ri}-${ci}`} className={`h-10 rounded-lg border-2 border-ink ${cell ? (cell === "A" ? "bg-coral" : cell === "B" ? "bg-butter text-ink" : cell === "C" ? "bg-white text-ink" : cell === "D" ? "bg-pop" : "bg-cream text-ink") : "border-dashed bg-white/10"}`}>{cell}</span>)
            ])}
          </div>
        </div>
      </div>
    </Section>
  );
};

export const DecodePrimer = () => {
  const [step, setStep] = useState(1);
  const pieces = ["今","天","适","合","散","步"];
  return (
    <Section number="03" label="一轮生成一小块" title="调度器会在每一轮生成后重新看队伍" intro={<p>这里的一轮，指模型给每个正在处理的请求继续写一小块。写完这一轮，调度器就能加入新请求、移走已完成请求。</p>} tone="butter">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="card-stamp p-6">
          <div className="flex min-h-28 flex-wrap items-center gap-2 rounded-2xl border-2 border-ink bg-white p-5">
            <span className="text-ink/50">回答：</span>
            {pieces.slice(0, step).map((p,i) => <span key={i} className="animate-enter-pop rounded-lg border-2 border-ink bg-butter px-3 py-2 font-bold">{p}</span>)}
          </div>
          <input className="mt-6 w-full accent-coral" type="range" min="1" max={pieces.length} value={step} onChange={e => setStep(Number(e.target.value))} />
          <div className="mt-3 flex justify-between font-mono text-xs"><span>第 {step} 轮</span><span>{step === pieces.length ? "请求完成，可以离场" : "还要继续生成"}</span></div>
        </div>
        <div className="rounded-[2rem] border-2 border-ink bg-ink p-6 text-white shadow-stamp-lg">
          <Layers3 className="h-9 w-9 text-butter" />
          <h3 className="mt-5 font-display text-2xl font-bold">调度粒度变小了</h3>
          <p className="mt-3 leading-relaxed text-white/72">过去按整个请求安排。连续批处理按生成轮次安排。Orca 论文把它叫作 iteration-level scheduling。</p>
          <a className="mt-5 inline-block font-mono text-xs text-butter underline" href="https://www.usenix.org/conference/osdi22/presentation/yu" target="_blank" rel="noreferrer">来源 · OSDI 2022 Orca</a>
        </div>
      </div>
    </Section>
  );
};

export const SchedulerLab = () => {
  const [tick, setTick] = useState(0);
  const slots = 3;
  const state = useMemo(() => simulate(tick, slots), [tick]);
  return (
    <Section number="04" label="调度器实验台" title="亲手推进时间，看请求怎样进入和离开" intro={<p>每点一次“下一轮”，正在运行的请求各写一小块。完成的请求离场，等待队列按到达顺序补位。</p>} tone="white">
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border-2 border-ink bg-cream p-5 shadow-stamp-lg">
          <div className="flex items-center justify-between"><strong className="font-display text-2xl">GPU 上的 {slots} 个位置</strong><span className="font-mono text-xs">轮次 {tick}</span></div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {Array.from({length: slots}, (_,i) => {
              const r = state.active[i];
              return <div key={i} className={`aspect-[.85] rounded-2xl border-2 border-ink p-4 ${r ? r.color : "border-dashed bg-white"}`}>
                {r ? <><strong className="font-display text-3xl">{r.id}</strong><span className="mt-8 block font-mono text-xs">剩 {r.remaining} 块</span></> : <span className="text-sm text-ink/40">空位</span>}
              </div>;
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="btn-stamp bg-ink text-white disabled:opacity-40" onClick={() => setTick(Math.min(10, tick + 1))} disabled={tick >= 10}><Play className="h-4 w-4" />下一轮</button>
            <button className="btn-stamp bg-butter" onClick={() => setTick(0)}><RotateCcw className="h-4 w-4" />重来</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="card-stamp p-5"><span className="font-mono text-xs text-ink/50">等待队列</span><div className="mt-3 flex flex-wrap gap-2">{state.waiting.length ? state.waiting.map(r => <span key={r.id} className={`rounded-full border-2 border-ink px-4 py-2 font-bold ${r.color}`}>{r.id}</span>) : <span className="text-sm text-ink/45">当前没人等待</span>}</div></div>
          <div className="card-stamp p-5"><span className="font-mono text-xs text-ink/50">已经完成</span><div className="mt-3 flex flex-wrap gap-2">{state.done.length ? state.done.map(id => <span key={id} className="rounded-full border-2 border-ink bg-teal px-4 py-2 font-bold text-white">{id}</span>) : <span className="text-sm text-ink/45">继续推进就会有人完成</span>}</div></div>
          <DemoNote />
        </div>
      </div>
    </Section>
  );
};

export const ThroughputLab = () => {
  const [slots, setSlots] = useState(4);
  const [variance, setVariance] = useState(60);
  const fixed = Math.max(32, 88 - variance * 0.62);
  const continuous = Math.min(98, 72 + slots * 4.5);
  return (
    <Section number="05" label="吞吐与等待" title="回答长短差得越多，动态补位越有用" intro={<p>吞吐表示单位时间完成多少请求。请求长度差别大时，固定批处理更容易留下空位；连续批处理会把空位继续用起来。</p>}>
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="card-stamp p-6">
          <Slider label="同时运行的位置" value={slots} min={2} max={8} onChange={setSlots} suffix={`${slots} 个`} />
          <Slider label="回答长度差异" value={variance} min={10} max={90} onChange={setVariance} suffix={variance < 35 ? "较接近" : variance < 70 ? "差别明显" : "差别很大"} />
          <DemoNote />
        </div>
        <div className="rounded-[2rem] border-2 border-ink bg-white p-6 shadow-stamp-lg">
          <Bar label="固定批处理的忙碌程度" value={fixed} color="bg-coral" />
          <Bar label="连续批处理的忙碌程度" value={continuous} color="bg-teal" />
          <p className="mt-7 rounded-2xl border-2 border-ink bg-butter-tint p-4 text-sm leading-relaxed">这里展示的是调度趋势。真实吞吐还会受到模型大小、输入长度、显存和硬件影响。</p>
        </div>
      </div>
    </Section>
  );
};

export const Tradeoffs = () => {
  const [priority, setPriority] = useState<"first" | "short" | "fair">("first");
  const text = {
    first: "先来先服务容易理解，也能避免后来者长期插队。",
    short: "短请求优先能更快完成一批小任务，但长请求可能等太久。",
    fair: "公平调度会限制单个请求占用的资源，代价是规则更复杂。",
  }[priority];
  return (
    <Section number="06" label="它也有边界" title="调度器还要照顾显存、长请求和公平性" intro={<p>每个请求都要保存已经生成过的内容。并发增加，显存占用也会上涨。调度器有时会暂停请求，先给更合适的请求腾位置。</p>} tone="dark">
      <div className="grid gap-6 lg:grid-cols-3">
        {[["first","先来先服务",Clock3],["short","短请求优先",Gauge],["fair","限制单人占用",Users]].map(([id,label,Icon]) => (
          <button key={id as string} onClick={() => setPriority(id as typeof priority)} className={`rounded-3xl border-2 border-ink p-5 text-left text-ink shadow-stamp transition-all ${priority === id ? "bg-butter -translate-y-1" : "bg-white"}`}>
            <Icon className="h-7 w-7" /><strong className="mt-4 block font-display text-xl">{label as string}</strong>
          </button>
        ))}
      </div>
      <p className="mt-6 rounded-2xl border-2 border-ink bg-white p-5 text-ink shadow-stamp">{text}</p>
    </Section>
  );
};

export const Related = () => (
  <Section number="07" label="把前后概念接起来" title="它负责排队，KV Cache 负责保存每个人写到哪" intro={<p>连续批处理只决定这一轮让谁运行。请求重新上场时，还要接着之前的回答继续写，这依赖每个请求自己的历史缓存。</p>} tone="white">
    <div className="grid gap-5 md:grid-cols-3">
      <LinkCard href="../model-inference/index.html" title="先看模型推理">补齐“一轮只生成一小块”的前置知识。</LinkCard>
      <LinkCard href="../kv-cache/index.html" title="再看 KV Cache">理解多个请求同时生成时，显存里保存了什么。</LinkCard>
      <LinkCard href="../deploy/index.html" title="放回部署全景">看 vLLM、PagedAttention 和连续批处理怎样配合。</LinkCard>
    </div>
  </Section>
);

function simulate(tick: number, slots: number) {
  const remaining = new Map(requests.map(r => [r.id, r.length]));
  const active: string[] = [];
  const done: string[] = [];
  for (let t = 0; t <= tick; t++) {
    for (const r of requests) if (r.arrive <= t && !active.includes(r.id) && !done.includes(r.id) && active.length < slots) active.push(r.id);
    if (t === tick) break;
    for (const id of [...active]) {
      const left = (remaining.get(id) ?? 0) - 1;
      remaining.set(id, left);
      if (left <= 0) { active.splice(active.indexOf(id), 1); done.push(id); }
    }
  }
  const activeRows = active.map(id => ({ ...requests.find(r => r.id === id)!, remaining: remaining.get(id)! }));
  const waiting = requests.filter(r => r.arrive <= tick && !active.includes(r.id) && !done.includes(r.id));
  return { active: activeRows, waiting, done };
}

const Slider = ({ label, value, min, max, onChange, suffix }: { label: string; value: number; min: number; max: number; onChange: (n:number)=>void; suffix: string }) => (
  <label className="mb-7 block"><span className="flex justify-between gap-3 text-sm font-bold"><span>{label}</span><span className="font-mono">{suffix}</span></span><input className="mt-3 w-full accent-coral" type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} /></label>
);
const Bar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="mb-7"><div className="mb-2 flex justify-between text-sm font-bold"><span>{label}</span><span>{Math.round(value)}%</span></div><div className="h-8 overflow-hidden rounded-full border-2 border-ink bg-cream"><div className={`h-full ${color} transition-all duration-400`} style={{width:`${value}%`}} /></div></div>
);
