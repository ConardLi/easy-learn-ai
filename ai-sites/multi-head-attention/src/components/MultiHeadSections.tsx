import React, { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Check, Minus, Plus, RotateCcw, X } from "lucide-react";
import { Badge, LinkCard, SectionHead } from "./common";

const TOKENS = ["小李","把","杯子","递给","小王","，","他","说","谢谢"];
const HEADS = [
  { name:"指代关系", note:"「他」更可能指向谁", focus:[0,4,6], color:"bg-coral", scores:[90,10,8,8,45,5,100,8,8] },
  { name:"动作关系", note:"谁做了什么动作", focus:[0,3,4], color:"bg-teal", scores:[72,8,12,100,70,5,15,26,18] },
  { name:"局部搭配", note:"相邻词怎样组成短语", focus:[2,3,4], color:"bg-butter", scores:[8,35,82,100,72,8,8,20,15] },
  { name:"句子边界", note:"停顿和结尾在哪里", focus:[5,8], color:"bg-pop", scores:[4,4,4,7,8,100,8,20,88] },
];

export const SectionHeadsHero:React.FC=()=>{
  const [head,setHead]=useState(0);
  const active=HEADS[head];
  return <section className="overflow-hidden bg-coral px-4 py-16 sm:px-6 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-[1160px] gap-12 lg:grid-cols-12 lg:items-center">
    <div className="lg:col-span-6"><div className="eyebrow text-ink/65">Multi-Head Attention · 多头注意力</div><h1 className="mt-5 font-display text-display-xl font-extrabold">多头注意力是什么？</h1><p className="mt-7 max-w-xl font-display text-[clamp(1.4rem,3vw,2.1rem)] font-bold leading-[1.3]"><span className="box-decoration-clone bg-butter px-2">多头注意力 = 并行运行多组注意力，再把各组结果合在一起。</span></p><div className="mt-7 max-w-xl space-y-4 text-[16px] leading-[1.8] text-ink/80"><p>一组注意力会产生一份观察结果。模型把同一句话交给多个“头”，每个头用自己的方式查找和拿回信息。</p><p>右边四个头同时看一句话。点开它们，看看每份结果强调了什么。</p></div><a href="../attention/index.html" className="mt-6 block max-w-xl rounded-2xl border-2 border-ink bg-butter px-4 py-3 text-sm font-bold shadow-stamp transition-all hover:-translate-x-0.5 hover:-translate-y-0.5">如果“注意力”还不熟，先看前一章会更顺 →</a><p className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[.12em]"><span>先看不同头分别关注什么</span><ArrowDown className="h-4 w-4"/></p></div>
    <div className="lg:col-span-6"><div className="rounded-[2rem] border-2 border-ink bg-cream p-5 shadow-stamp-xl lg:p-7"><div className="grid grid-cols-2 gap-2">{HEADS.map((item,index)=><button key={item.name} onClick={()=>setHead(index)} className={`rounded-xl border-2 border-ink p-3 text-left transition-all ${head===index?"bg-ink text-cream shadow-stamp":"bg-white"}`}><span className="font-mono text-[10px]">HEAD {index+1}</span><span className="mt-1 block font-display font-bold">{item.name}</span></button>)}</div><div key={active.name} className="mt-6 animate-enter-fade"><h3 className="font-display text-2xl font-bold">{active.note}</h3><div className="mt-5 flex flex-wrap gap-2">{TOKENS.map((token,index)=><span key={`${token}-${index}`} className={`rounded-xl border-2 border-ink px-3 py-2 font-bold ${active.focus.includes(index)?`${active.color} ${head===1||head===3?"text-cream":""} shadow-stamp`:"bg-white text-ink/45"}`}>{token}</span>)}</div><p className="mt-5 text-sm text-ink/60">这些关系是教学示意。真实注意力头学到的模式通常更混合。</p></div></div></div>
  </div></section>
};

export const SectionRelationLenses:React.FC=()=>{
  const [sentence,setSentence]=useState("小猫追着毛线球跑进房间");
  const chars=Array.from(sentence).slice(0,16);
  const [activeHeads,setActiveHeads]=useState(new Set([0,1]));
  const toggle=(id:number)=>setActiveHeads(cur=>{const next=new Set(cur);next.has(id)?next.delete(id):next.add(id);return next});
  return <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-[1140px]"><SectionHead number="02" label="多个角度同时工作" title={<>一段话里有多种关系，<br/>可以让不同头并行处理</>} intro={<p>多个头没有排队等待。你可以换掉显示的句子，再叠加几种固定的示意关系。这里不会分析你输入的真实语义。</p>}/>
    <div className="grid gap-6 lg:grid-cols-12"><div className="card-stamp p-5 lg:col-span-4"><label className="font-display text-xl font-bold">换一句话</label><textarea value={sentence} onChange={e=>setSentence(e.target.value)} maxLength={16} rows={4} className="mt-4 w-full resize-none rounded-2xl border-2 border-ink bg-cream p-4 outline-none focus:shadow-stamp"/><div className="mt-5 space-y-2">{HEADS.map((head,index)=><button key={head.name} onClick={()=>toggle(index)} className={`flex w-full items-center gap-3 rounded-xl border-2 border-ink p-3 text-left ${activeHeads.has(index)?"bg-ink text-cream":"bg-white"}`}><span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${activeHeads.has(index)?"border-cream bg-butter text-ink":"border-ink"}`}>{activeHeads.has(index)?<Check className="h-3.5 w-3.5"/>:index+1}</span><span className="font-bold">{head.name}</span></button>)}</div></div>
    <div className="rounded-[2rem] border-2 border-ink bg-butter-tint p-5 shadow-stamp-lg lg:col-span-8"><div className="flex items-center justify-between"><h3 className="font-display text-xl font-bold">叠加观察结果</h3><Badge/></div><div className="mt-6 flex flex-wrap gap-2">{chars.map((char,index)=>{const score=[...activeHeads].reduce((sum,id)=>sum+HEADS[id].scores[index%HEADS[id].scores.length],0)/Math.max(1,activeHeads.size);return <span key={`${char}-${index}`} className="relative rounded-xl border-2 border-ink bg-white px-3 py-2 font-display text-lg font-bold" style={{boxShadow:`0 -${Math.round(score/12)}px 0 rgba(224,122,95,.8) inset`}}>{char}<span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-ink bg-butter px-1 font-mono text-[8px]">{Math.round(score)}</span></span>})}</div><div className="mt-7 grid gap-3 sm:grid-cols-2">{[...activeHeads].map(id=><div key={id} className="rounded-2xl border-2 border-ink bg-white p-4"><div className="font-mono text-[10px] text-ink/50">HEAD {id+1}</div><div className="mt-1 font-display text-lg font-bold">{HEADS[id].name}</div><p className="mt-1 text-sm text-ink/65">{HEADS[id].note}</p></div>)}</div></div></div>
  </div></section>
};

const FLOW=["同一输入变成多组 Q/K/V","每个头使用自己的一组","各头独立做注意力","把结果拼在一起","再混合成统一输出"];
export const SectionParallelFlow:React.FC=()=>{
  const [step,setStep]=useState(0);
  const [mix,setMix]=useState([65,45,30,20]);
  return <section className="border-y-2 border-ink bg-teal px-4 py-20 text-cream sm:px-6 lg:px-8"><div className="mx-auto max-w-[1140px]"><SectionHead inverse number="03" label="一层里的完整流程" title={<>多个头分开计算，<br/>最后仍要合成一个结果</>} intro={<p>每个头都会用 Q 发起查找、用 K 匹配线索、从 V 拿回信息。各头先处理输入的一部分数字，算完后拼接，再经过一次混合。</p>}/>
    <div className="rounded-[2rem] border-2 border-ink bg-cream p-5 text-ink shadow-stamp-xl lg:p-7"><div className="grid gap-2 md:grid-cols-5">{FLOW.map((item,index)=><button key={item} onClick={()=>setStep(index)} className={`rounded-xl border-2 border-ink p-3 text-left text-sm font-bold ${index<=step?"bg-butter shadow-stamp":"bg-white text-ink/45"}`}><span className="block font-mono text-[10px]">{index+1}</span>{item}</button>)}</div><div className="mt-8 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center"><div className="grid grid-cols-2 gap-3">{mix.map((value,index)=><label key={index} className={`rounded-2xl border-2 border-ink p-4 ${HEADS[index].color} ${index===1||index===3?"text-cream":""}`}><span className="font-bold">头 {index+1} · {value}%</span><input type="range" min={0} max={100} value={value} onChange={e=>setMix(cur=>cur.map((v,i)=>i===index?Number(e.target.value):v))} className="range-control mt-3"/></label>)}</div><ArrowRight className="mx-auto h-6 w-6 rotate-90 lg:rotate-0"/><div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp"><div className="font-mono text-[10px] text-ink/50">合并后的输出 · 示意</div><div className="mt-4 flex h-36 items-end gap-2">{mix.map((value,index)=><div key={index} className={`flex-1 rounded-t-xl border-2 border-b-0 border-ink ${HEADS[index].color} transition-all duration-250`} style={{height:`${Math.max(10,value)}%`}}/>)}</div><p className="mt-4 text-sm text-ink/65">拖动四个头，感受最终输出怎样同时带着多份信息。</p></div></div></div>
  </div></section>
};

export const SectionHeadWidth:React.FC=()=>{
  const [heads,setHeads]=useState(8);
  const total=512;
  const width=Math.round(total/heads);
  const options=[1,2,4,8,16];
  return <section className="bg-butter-tint px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-[1140px]"><SectionHead number="04" label="头数和每头宽度" title={<>总宽度固定时，头越多，<br/>每个头分到的数字越少</>} intro={<p>模型通常先定好一层的总宽度，再把它均分给多个头。增加头数会增加观察角度，也会让每个头能使用的空间变窄。</p>}/>
    <div className="grid gap-6 lg:grid-cols-12"><div className="card-stamp p-6 lg:col-span-4"><div className="flex items-center justify-between"><button onClick={()=>setHeads(options[Math.max(0,options.indexOf(heads)-1)])} disabled={heads===1} className="btn-stamp bg-white px-3"><Minus className="h-4 w-4"/></button><div className="text-center"><div className="font-display text-5xl font-black">{heads}</div><div className="font-mono text-xs text-ink/50">个头</div></div><button onClick={()=>setHeads(options[Math.min(options.length-1,options.indexOf(heads)+1)])} disabled={heads===16} className="btn-stamp bg-butter px-3"><Plus className="h-4 w-4"/></button></div><div className="mt-8 rounded-2xl border-2 border-ink bg-ink p-4 text-cream"><div className="font-mono text-[10px] text-butter-soft">每头宽度</div><div className="mt-1 font-display text-4xl font-bold">{width}</div><p className="mt-2 text-sm text-cream/70">本例假设总宽度为 {total}，再平均分给 {heads} 个头。</p></div></div>
    <div className="rounded-[2rem] border-2 border-ink bg-white p-5 shadow-stamp-lg lg:col-span-8"><div className="flex flex-wrap gap-2">{Array.from({length:heads},(_,index)=><div key={index} className={`flex h-24 min-w-[40px] flex-1 items-end rounded-xl border-2 border-ink p-2 ${HEADS[index%4].color}`}><span className={`font-mono text-[9px] font-bold ${index%4===1||index%4===3?"text-cream":"text-ink"}`}>H{index+1}<br/>{width}d</span></div>)}</div><p className="mt-5 text-sm leading-relaxed text-ink/65">图中每块代表一个头分到的数字空间。头数是模型设计选择，头多不等于结果一定更好。</p></div></div>
  </div></section>
};

export const SectionHeadReality:React.FC=()=>{
  const [answers,setAnswers]=useState<Record<number,boolean>>({});
  const facts=[{text:"每个头都会稳定变成一个清楚的语法专家。",right:false,why:"真实头经常混合多种关系，也可能彼此重复。"},
  {text:"不同头使用不同的 Q、K、V 变换。",right:true,why:"这让各头能形成不同的匹配方式。"},
  {text:"所有头的结果会在这一层结束前合并。",right:true,why:"下游仍收到一份统一宽度的表示。"}];
  return <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-[1140px]"><SectionHead number="05" label="多头不会整齐分工" title={<>“一个头管语法、一个头管指代”<br/>只能帮助入门理解</>} intro={<p>训练没有给每个头发岗位说明。我们能观察到一些明显模式，也会看到重复、混合或作用很弱的头。判断下面三句话。</p>}/><div className="grid gap-4 md:grid-cols-3">{facts.map((fact,index)=>{const answered=index in answers;const correct=answers[index]===fact.right;return <div key={fact.text} className="card-stamp flex min-h-[250px] flex-col p-5"><p className="font-display text-lg font-bold leading-relaxed">{fact.text}</p><div className="mt-auto flex gap-2 pt-6"><button onClick={()=>setAnswers(cur=>({...cur,[index]:true}))} className="btn-stamp flex-1 bg-butter"><Check className="h-4 w-4"/>对</button><button onClick={()=>setAnswers(cur=>({...cur,[index]:false}))} className="btn-stamp flex-1 bg-white"><X className="h-4 w-4"/>不对</button></div>{answered&&<p className={`mt-4 rounded-xl border-2 border-ink p-3 text-sm ${correct?"bg-teal text-cream":"bg-coral text-cream"}`}>{correct?"判断正确。":`应选「${fact.right?"对":"不对"}」。`}{fact.why}</p>}</div>})}</div></div></section>
};

export const SectionHeadsNext:React.FC=()=> <section className="bg-butter-tint px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-[1140px]"><SectionHead number="06" label="接着学" title={<>多个查询头很有用，<br/>但每个头都保存 K、V 会占更多空间</>} intro={<p>生成回答时，模型要反复读取前文的 K 和 V。下一章会保留多个查询头，同时让它们共享同一组 K、V。</p>}/><div className="grid gap-5 md:grid-cols-3"><LinkCard href="../attention/index.html" title="前一章：注意力机制" desc="回看单个头怎样用 Q 匹配 K，再按权重拿 V。"/><LinkCard href="../multi-query-attention/index.html" title="下一章：Multi-Query Attention" desc="看看共享 K、V 怎样缩小缓存并加快逐字生成。"/><LinkCard href="../transformer/index.html" title="回到 Transformer 全景" desc="把多头注意力放回完整模型层。"/></div><div className="mt-8 rounded-3xl border-2 border-ink bg-ink p-6 text-cream shadow-stamp"><div className="font-mono text-[10px] tracking-[.16em] text-butter-soft">本章结论</div><p className="mt-2 font-display text-2xl font-bold">多头注意力会并行算出多份观察结果，再合成一份输出。</p><p className="mt-3 font-mono text-[10px] text-cream/55">资料：Vaswani et al., 2017 · arXiv:1706.03762</p></div></div></section>;
