import React, { useMemo, useState } from "react";
import { ArrowDown, Braces, Check, ClipboardCheck, FileJson, RotateCcw, ShieldAlert, X } from "lucide-react";
import { DemoNote, LinkCard, Section } from "./common";

type Field = { id: string; label: string; type: "文字" | "数字" | "真假"; required: boolean };
const allFields: Field[] = [
  { id: "name", label: "商品名", type: "文字", required: true },
  { id: "price", label: "价格", type: "数字", required: true },
  { id: "in_stock", label: "有库存", type: "真假", required: false },
  { id: "tags", label: "标签", type: "文字", required: false },
];

export const Hero = () => (
  <section className="min-h-[92vh] overflow-hidden bg-teal px-4 py-16 text-white sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-[1120px] items-center gap-12 lg:min-h-[78vh] lg:grid-cols-[1.03fr_.97fr]">
      <div>
        <p className="eyebrow !text-white/58">Structured Outputs · 结构化输出</p>
        <h1 className="mt-5 font-display text-display-2xl font-extrabold">结构化输出是什么？</h1>
        <p className="mt-7 max-w-[730px] text-[clamp(1.35rem,2.7vw,2rem)] font-extrabold leading-snug text-ink">
          <span className="bg-butter px-2">结构化输出会给回答规定字段和格式，让程序能稳定读取结果。</span>
        </p>
        <div className="mt-7 max-w-[650px] space-y-4 text-[17px] leading-[1.8] text-white/78">
          <p>普通聊天回答可以自由写。程序更喜欢固定形状，比如每次都有“商品名”“价格”“库存”三个位置。</p>
          <p>JSON 是一种常见的文本格式。它把字段名和内容成对写出来，方便程序继续处理。</p>
        </div>
        <p className="mt-8 font-bold text-butter">先看只在提示词里要求“返回 JSON”，会留下哪些漏洞。</p>
        <div className="mt-8 flex items-center gap-2 font-mono text-xs font-bold"><ArrowDown className="h-4 w-4" />继续往下看</div>
      </div>
      <div className="relative rounded-[2.5rem] border-2 border-ink bg-cream p-6 text-ink shadow-stamp-xl">
        <div className="absolute -right-4 -top-4 rounded-full border-2 border-ink bg-coral px-4 py-2 font-mono text-xs font-bold -rotate-3">符合规则</div>
        <div className="font-mono text-[13px] leading-8">
          <p>{"{"}</p>
          <p className="pl-5"><span className="text-pop">"name"</span>: <span className="text-teal">"帆布包"</span>,</p>
          <p className="pl-5"><span className="text-pop">"price"</span>: <span className="text-teal">129</span>,</p>
          <p className="pl-5"><span className="text-pop">"in_stock"</span>: <span className="text-teal">true</span></p>
          <p>{"}"}</p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-bold">
          <span className="rounded-xl border-2 border-ink bg-butter py-2">字段齐</span>
          <span className="rounded-xl border-2 border-ink bg-white py-2">类型对</span>
          <span className="rounded-xl border-2 border-ink bg-coral py-2">无多余项</span>
        </div>
      </div>
    </div>
  </section>
);

export const PromptOnlyFailure = () => {
  const cases = [
    { label: "多说一句", text: "当然可以，结果如下：\n{\"name\":\"帆布包\",\"price\":129}", issue: "JSON 前面多了说明，直接解析会失败。" },
    { label: "类型写错", text: "{\"name\":\"帆布包\",\"price\":\"一百二十九元\"}", issue: "price 需要数字，模型却给了文字。" },
    { label: "漏掉字段", text: "{\"name\":\"帆布包\"}", issue: "程序期待 price，但这次没有收到。" },
  ];
  const [active,setActive] = useState(0);
  return (
    <Section number="02" label="提示词约束的漏洞" title="写一句“请返回 JSON”，模型仍可能漏字段或写错类型" intro={<p>提示词只能告诉模型你的偏好。它没有强制检查每一步，所以长回答、复杂字段或少见情况仍可能偏离要求。</p>} tone="white">
      <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
        <div className="space-y-3">{cases.map((c,i) => <button key={c.label} onClick={() => setActive(i)} className={`w-full rounded-2xl border-2 border-ink p-4 text-left font-bold shadow-stamp transition-all ${active===i?"bg-coral -translate-y-1":"bg-white"}`}>{c.label}</button>)}</div>
        <div className="rounded-[2rem] border-2 border-ink bg-ink p-6 text-white shadow-stamp-lg">
          <pre className="min-h-32 whitespace-pre-wrap font-mono text-sm leading-7 text-cream">{cases[active].text}</pre>
          <div className="mt-5 flex gap-3 rounded-2xl border-2 border-coral bg-coral/15 p-4"><X className="h-5 w-5 flex-none text-coral" /><p className="text-sm text-white/78">{cases[active].issue}</p></div>
        </div>
      </div>
    </Section>
  );
};

export const SchemaPrimer = () => {
  const [field,setField] = useState(0);
  const explanations = [
    ["字段名","程序用它找到对应内容。这里的字段名是 price。"],
    ["类型","类型规定内容长什么样。price 必须是数字。"],
    ["必填","必填字段每次都要出现，缺少就不合格。"],
    ["额外字段","可以禁止规则外的字段，避免模型临时多塞内容。"],
  ];
  return (
    <Section number="03" label="Schema 是一张格式清单" title="规则要写清字段名、内容类型和哪些字段必填" intro={<p>Schema 可以理解成一张机器可读的表格说明。它规定回答能有哪些位置，每个位置能放什么。</p>} tone="butter">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-[2rem] border-2 border-ink bg-white p-6 shadow-stamp-lg">
          <div className="grid gap-3 sm:grid-cols-2">
            {explanations.map(([title],i) => <button key={title} onClick={() => setField(i)} className={`rounded-2xl border-2 border-ink p-4 text-left ${field===i?"bg-ink text-white":"bg-cream"}`}><span className="font-display text-xl font-bold">{title}</span></button>)}
          </div>
        </div>
        <div key={field} className="rounded-[2rem] border-2 border-ink bg-coral p-6 shadow-stamp-lg animate-enter-up">
          <Braces className="h-9 w-9" />
          <h3 className="mt-5 font-display text-3xl font-bold">{explanations[field][0]}</h3>
          <p className="mt-4 leading-relaxed text-ink/72">{explanations[field][1]}</p>
        </div>
      </div>
    </Section>
  );
};

export const ConstrainedTrace = () => {
  const steps = [
    { written: "{", allowed: ['"name"'], note: "对象刚开始，规则要求先写字段名。" },
    { written: '{"name":', allowed: ['"帆布包"','"双肩包"'], note: "name 的类型是文字，所以这里只能接一段文字。" },
    { written: '{"name":"帆布包",', allowed: ['"price"'], note: "name 已完成。必填的 price 还没出现。" },
    { written: '{"name":"帆布包","price":', allowed: ["129","199","259"], note: "price 的类型是数字，引号和文字现在都不合规。" },
    { written: '{"name":"帆布包","price":129}', allowed: ["结束"], note: "必填字段齐了，括号闭合，结构通过。" },
  ];
  const [step,setStep] = useState(0);
  return (
    <Section number="04" label="生成时就拦住错误" title="每写一小块，系统只留下仍然符合规则的候选" intro={<p>模型每轮会考虑很多下一块文字。结构约束会把会破坏格式的候选挡掉，再从允许的候选里继续选。</p>}>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border-2 border-ink bg-ink p-6 text-white shadow-stamp-lg">
          <span className="font-mono text-xs text-white/50">当前已经写出</span>
          <pre className="mt-5 min-h-28 whitespace-pre-wrap font-mono text-lg leading-8 text-butter">{steps[step].written}</pre>
          <div className="mt-5 flex gap-3"><button onClick={() => setStep(Math.min(steps.length-1,step+1))} className="btn-stamp bg-butter text-ink">下一步</button><button onClick={() => setStep(0)} className="btn-stamp bg-coral text-ink"><RotateCcw className="h-4 w-4" />重来</button></div>
        </div>
        <div key={step} className="card-stamp p-6 animate-enter-up">
          <span className="font-mono text-xs text-ink/50">这一步允许继续写</span>
          <div className="mt-4 flex flex-wrap gap-2">{steps[step].allowed.map(v => <span key={v} className="rounded-xl border-2 border-ink bg-butter px-4 py-2 font-mono font-bold">{v}</span>)}</div>
          <p className="mt-6 rounded-2xl border-2 border-ink bg-cream p-4 text-sm leading-relaxed">{steps[step].note}</p>
        </div>
      </div>
    </Section>
  );
};

export const SchemaBuilder = () => {
  const [selected,setSelected] = useState(["name","price"]);
  const [strict,setStrict] = useState(true);
  const toggle = (id:string) => setSelected(s => s.includes(id) ? s.filter(x => x!==id) : [...s,id]);
  const schema = useMemo(() => {
    const fields = allFields.filter(f => selected.includes(f.id));
    return JSON.stringify({
      type:"object",
      properties:Object.fromEntries(fields.map(f => [f.id,{type:f.type==="文字"?"string":f.type==="数字"?"number":"boolean"}])),
      required:fields.filter(f => f.required).map(f => f.id),
      additionalProperties:!strict,
    },null,2);
  },[selected,strict]);
  return (
    <Section number="05" label="亲手搭一张规则表" title="勾选程序需要的字段，Schema 会跟着变化" intro={<p>字段越多，模型要填的内容越多。只保留后续程序真正会用到的信息，规则会更容易维护。</p>} tone="white">
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="card-stamp p-6">
          <div className="space-y-3">{allFields.map(f => <label key={f.id} className="flex cursor-pointer items-center justify-between rounded-2xl border-2 border-ink bg-cream p-4"><span><strong className="block">{f.label}</strong><span className="text-xs text-ink/55">{f.type} · {f.required?"必填":"可选"}</span></span><input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggle(f.id)} className="h-5 w-5 accent-coral" /></label>)}</div>
          <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-ink bg-butter p-4"><input type="checkbox" checked={strict} onChange={e => setStrict(e.target.checked)} className="h-5 w-5 accent-coral" /><span className="font-bold">禁止额外字段</span></label>
        </div>
        <div className="overflow-hidden rounded-[2rem] border-2 border-ink bg-ink shadow-stamp-lg">
          <div className="border-b border-white/15 px-5 py-3 font-mono text-xs text-butter">LIVE SCHEMA</div>
          <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap p-5 font-mono text-xs leading-6 text-cream">{schema}</pre>
        </div>
      </div>
    </Section>
  );
};

export const ThreeChoices = () => {
  const modes = [
    { id:"prompt", title:"提示词要求", fit:"给人看的一次性回答", promise:"模型尽量照做", risk:"可能夹说明、漏字段" },
    { id:"json", title:"JSON Mode", fit:"只要合法 JSON", promise:"保证整体能解析成 JSON", risk:"不保证你想要的字段齐全" },
    { id:"schema", title:"JSON Schema", fit:"程序要稳定接收固定字段", promise:"输出遵守指定结构", risk:"仍要处理拒答、截断和内容错误" },
  ];
  const [active,setActive] = useState("schema");
  const row = modes.find(m => m.id===active)!;
  return (
    <Section number="06" label="三种约束强度" title="选哪一种，取决于后面的程序有多依赖格式" intro={<p>JSON Mode 主要保证“是一段合法 JSON”。按 Schema 生成还会约束字段、类型和必填项。</p>} tone="butter">
      <div className="grid gap-3 sm:grid-cols-3">{modes.map(m => <button key={m.id} onClick={() => setActive(m.id)} className={`rounded-2xl border-2 border-ink p-4 text-left shadow-stamp ${active===m.id?"bg-ink text-white -translate-y-1":"bg-white"}`}><strong className="font-display text-xl">{m.title}</strong></button>)}</div>
      <div key={active} className="mt-6 grid gap-4 rounded-[2rem] border-2 border-ink bg-white p-6 shadow-stamp-lg animate-enter-up md:grid-cols-3">
        <Info label="适合" text={row.fit} /><Info label="能保证什么" text={row.promise} /><Info label="还要防什么" text={row.risk} />
      </div>
      <p className="mt-5 text-sm text-ink/60">OpenAI 官方文档区分 JSON mode 与 Structured Outputs：前者保证有效 JSON，后者按给定 Schema 约束结构。</p>
    </Section>
  );
};

export const CorrectShapeWrongFact = () => {
  const [view,setView] = useState<"shape"|"fact">("shape");
  return (
    <Section number="07" label="格式正确不等于内容正确" title="Schema 能检查回答的形状，不能替你核实事实" intro={<p>价格字段是数字，只说明 129 的写法合规。它不能证明真实价格确实是 129。</p>}>
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="card-stamp p-6">
          <button onClick={() => setView("shape")} className={`mb-3 w-full rounded-xl border-2 border-ink p-4 text-left font-bold ${view==="shape"?"bg-butter":"bg-white"}`}>检查结构</button>
          <button onClick={() => setView("fact")} className={`w-full rounded-xl border-2 border-ink p-4 text-left font-bold ${view==="fact"?"bg-coral":"bg-white"}`}>检查事实</button>
        </div>
        <div className={`rounded-[2rem] border-2 border-ink p-6 shadow-stamp-lg ${view==="shape"?"bg-butter-tint":"bg-coral"}`}>
          {view==="shape" ? <><Check className="h-9 w-9 text-teal" /><h3 className="mt-5 font-display text-3xl font-bold">结构通过</h3><p className="mt-3">name 是文字，price 是数字，必填字段都出现了。</p></> : <><ShieldAlert className="h-9 w-9" /><h3 className="mt-5 font-display text-3xl font-bold">事实仍需核对</h3><p className="mt-3">商品数据库里没有这件商品。格式很整齐，内容仍可能是编出来的。</p></>}
        </div>
      </div>
    </Section>
  );
};

export const ProductionChecks = () => {
  const [checks,setChecks] = useState<string[]>(["parse","validate"]);
  const rows = [
    ["parse","能不能读成 JSON"],
    ["validate","是否符合 Schema"],
    ["refusal","模型是否拒绝回答"],
    ["truncated","回答是否中途截断"],
    ["business","数值是否符合业务规则"],
  ];
  return (
    <Section number="08" label="上线前的检查" title="拿到结构化结果后，程序仍要做验证和错误处理" intro={<p>请求可能被拒绝，网络可能中断，回答也可能达到长度上限。生产代码要把这些情况当成正常分支处理。</p>} tone="dark">
      <div className="grid gap-6 lg:grid-cols-[1fr_.75fr]">
        <div className="rounded-[2rem] border-2 border-ink bg-white p-6 text-ink shadow-stamp-lg space-y-3">
          {rows.map(([id,label]) => <label key={id} className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-ink bg-cream p-4"><input type="checkbox" checked={checks.includes(id)} onChange={() => setChecks(s => s.includes(id)?s.filter(x=>x!==id):[...s,id])} className="h-5 w-5 accent-coral" /><span className="font-bold">{label}</span></label>)}
        </div>
        <div className={`rounded-[2rem] border-2 border-ink p-6 text-ink shadow-stamp-lg ${checks.length===rows.length?"bg-butter":"bg-coral"}`}>
          <ClipboardCheck className="h-10 w-10" />
          <strong className="mt-5 block font-display text-4xl">{checks.length} / {rows.length}</strong>
          <p className="mt-4 leading-relaxed">{checks.length===rows.length?"关键检查都覆盖了，可以进入业务处理。":"还有异常分支没有处理，程序可能在边界情况里报错。"}</p>
          <DemoNote />
        </div>
      </div>
    </Section>
  );
};

export const Related = () => (
  <Section number="09" label="回答格式与工具协议" title="结构化输出管回答形状，Function Calling 管调用哪个工具" intro={<p>两者都会用到 Schema。结构化输出把最终回答交给程序；Function Calling 让模型描述要调用的工具和参数。</p>} tone="white">
    <div className="grid gap-5 md:grid-cols-3">
      <LinkCard href="../function-calling/index.html" title="Function Calling">看工具名称、参数 Schema 和调用回合怎样配合。</LinkCard>
      <LinkCard href="../ai-guardrails/index.html" title="AI Guardrails">结构通过后，还可以继续检查内容、权限和风险。</LinkCard>
      <LinkCard href="../model-inference/index.html" title="模型推理">理解结构约束发生在逐块生成的哪个位置。</LinkCard>
    </div>
    <div className="mt-7 rounded-2xl border-2 border-ink bg-butter-tint p-5 text-sm leading-relaxed">
      参考：<a className="font-bold underline" href="https://developers.openai.com/api/docs/guides/structured-outputs" target="_blank" rel="noreferrer">OpenAI Structured Outputs</a> · <a className="font-bold underline" href="https://docs.vllm.ai/en/latest/features/structured_outputs/" target="_blank" rel="noreferrer">vLLM Structured Outputs</a>
    </div>
  </Section>
);

const Info = ({label,text}:{label:string;text:string}) => <div><span className="font-mono text-xs text-ink/45">{label}</span><p className="mt-2 font-bold leading-relaxed">{text}</p></div>;
