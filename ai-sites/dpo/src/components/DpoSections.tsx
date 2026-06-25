import React, { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleEqual,
  GitCompareArrows,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { Anchor, LinkCard, ProbBar } from "./common";

const PAIRS = [
  {
    q: "怎么礼貌拒绝一个临时会议？",
    chosen: "今天的安排已经排满了，我先看会议纪要；若有需要我决策的部分，可以单独发我。",
    rejected: "我不参加，没时间。",
  },
  {
    q: "一句话解释缓存。",
    chosen: "把刚算过的结果先存起来，下次遇到同样的请求可以直接拿来用。",
    rejected: "缓存是一种用于提高系统性能的技术，涉及存储层、命中率和淘汰策略等多个方面。",
  },
  {
    q: "用户说自己胸痛，应该怎么回？",
    chosen: "胸痛可能需要紧急处理；如果疼痛持续、呼吸困难或出冷汗，请立即联系急救服务。",
    rejected: "胸痛的常见原因包括肌肉拉伤、胃食管反流、焦虑和心血管疾病。",
  },
];

export const SectionHero: React.FC = () => {
  const [pair, setPair] = useState(0);
  const [show, setShow] = useState<"chosen" | "rejected">("chosen");
  const item = PAIRS[pair];
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5">
          <div className="eyebrow mb-5">Direct Preference Optimization · 直接偏好优化</div>
          <h1 className="font-display text-display-xl mb-6">DPO 是什么？</h1>
          <p className="font-display text-[21px] lg:text-[24px] font-bold leading-snug mb-5">
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-0 h-4 bg-coral/55 -z-0" />
              <span className="relative">DPO 直接用“人更喜欢哪个回答”的数据调整聊天模型。</span>
            </span>
          </p>
          <div className="space-y-3 text-[15px] text-ink/75 leading-relaxed">
            <p>每条训练数据包含一个问题、被选中的回答和落选的回答。训练后，模型遇到类似问题时，会更容易写出人们选中的那类回答。</p>
            <p>训练还会保留一份原模型作为参照，避免新模型为了迎合偏好而改得太猛。</p>
            <p>训练可以一次处理一批现成数据。它省掉了独立打分器，也不用让模型边生成回答、边根据分数反复试错。</p>
          </div>
          <div className="mt-7">
            <LinkCard href="../rlhf/index.html" title="想看另一条常见训练路线？">它会先训练一个专门打分的模型，再让聊天模型按分数反复练习。DPO 直接使用现成的二选一数据。</LinkCard>
          </div>
          <p className="mt-6 text-[13.5px] text-ink/55">右边展示了 DPO 使用的一条训练数据，你可以切换查看两份回答。</p>
          <div className="mt-8 flex items-center gap-2 font-mono text-[12px] text-ink/55"><ArrowDown className="w-4 h-4" />继续往下看</div>
        </div>
        <div className="lg:col-span-7">
          <div className="bg-teal border-2 border-ink rounded-3xl shadow-stamp-xl p-6 text-cream">
            <div className="flex flex-wrap gap-2 mb-5">
              {PAIRS.map((_, i) => (
                <button key={i} onClick={() => setPair(i)} className={`px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] ${pair === i ? "bg-butter text-ink shadow-stamp" : "bg-cream text-ink"}`}>样本 {i + 1}</button>
              ))}
            </div>
            <div className="p-4 bg-cream text-ink border-2 border-ink rounded-xl mb-4">
              <div className="font-mono text-[10px] text-ink/50 mb-1">prompt</div>
              <div className="font-display text-[18px] font-bold">{item.q}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button onClick={() => setShow("chosen")} className={`py-2.5 border-2 border-ink rounded-xl font-mono text-[11px] ${show === "chosen" ? "bg-butter text-ink shadow-stamp" : "bg-cream text-ink"}`}>chosen</button>
              <button onClick={() => setShow("rejected")} className={`py-2.5 border-2 border-ink rounded-xl font-mono text-[11px] ${show === "rejected" ? "bg-coral text-cream shadow-stamp" : "bg-cream text-ink"}`}>rejected</button>
            </div>
            <div key={`${pair}-${show}`} className="min-h-[150px] p-5 bg-cream text-ink border-2 border-ink rounded-2xl animate-enter-fade">
              <div className="font-mono text-[10px] text-ink/50 mb-2">{show === "chosen" ? "人类更喜欢" : "人类没选"}</div>
              <p className="text-[15px] leading-relaxed">{item[show]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TERMS = [
  { id: "pair", name: "偏好对", plain: "同一个问题下，chosen 和 rejected 两份回答组成的一条训练数据。", code: "问题 + 被选回答 + 落选回答" },
  { id: "prob", name: "回答倾向", plain: "模型每写下一小段文字，都会判断哪些写法更可能接在后面。把这些判断合起来，就能比较模型更倾向哪份回答。", code: "哪份回答更容易出现" },
  { id: "ref", name: "参考模型", plain: "训练开始前冻结的一份原模型。它负责告诉 DPO：新模型到底改了多少。", code: "训练前的原模型" },
];

export const SectionThreeWords: React.FC = () => {
  const [active, setActive] = useState("pair");
  const term = TERMS.find((x) => x.id === active)!;
  return (
    <section className="bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="02" label="three words first" />
        <h2 className="font-display text-display-lg mb-4">先补三个词，后面的图才不会卡住</h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 mb-8">点一个词，看它在 DPO 里具体负责什么。</p>
        <div className="grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 space-y-2">
            {TERMS.map((x) => (
              <button key={x.id} onClick={() => setActive(x.id)} className={`w-full p-4 text-left border-2 border-ink rounded-xl font-display text-[19px] font-bold ${active === x.id ? "bg-ink text-cream shadow-stamp" : "bg-cream"}`}>{x.name}</button>
            ))}
          </div>
          <div key={active} className="lg:col-span-8 bg-butter border-2 border-ink rounded-3xl shadow-stamp-xl p-7 animate-enter-fade">
            <div className="font-mono text-[13px] bg-white border-2 border-ink rounded-xl inline-flex px-3 py-2 mb-5">{term.code}</div>
            <h3 className="font-display text-[34px] font-bold mb-3">{term.name}</h3>
            <p className="text-[16px] text-ink/75 leading-relaxed max-w-2xl">{term.plain}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ROUTES = {
  rlhf: [
    ["偏好数据", "人类选 A 或 B"],
    ["奖励模型", "单独训练一个打分器"],
    ["在线生成", "聊天模型不断产出新回答"],
    ["根据分数调整", "让聊天模型反复练习高分回答"],
  ],
  dpo: [
    ["偏好数据", "人类选 A 或 B"],
    ["参考模型", "冻结原模型作参照"],
    ["直接比较", "看模型对两份回答的倾向怎样变化"],
    ["批量更新", "像常规微调一样训练"],
  ],
};

export const SectionTwoRoutes: React.FC = () => {
  const [route, setRoute] = useState<"rlhf" | "dpo">("dpo");
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="03" label="two training routes" />
        <h2 className="font-display text-display-lg mb-4 max-w-3xl">同一批偏好数据，可以走两条训练路线</h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 mb-8">经典 RLHF 把“学会打分”和“根据分数改模型”分开做。DPO 直接训练最终的聊天模型。</p>
        <div className="flex gap-2 mb-6">
          <button onClick={() => setRoute("rlhf")} className={`btn-stamp ${route === "rlhf" ? "bg-ink text-cream" : "bg-white"}`}>打分后反复训练</button>
          <button onClick={() => setRoute("dpo")} className={`btn-stamp ${route === "dpo" ? "bg-ink text-cream" : "bg-white"}`}>DPO</button>
        </div>
        <div key={route} className="grid sm:grid-cols-4 gap-3 animate-enter-fade">
          {ROUTES[route].map(([title, body], i) => (
            <React.Fragment key={title}>
              <div className={`p-5 border-2 border-ink rounded-2xl shadow-stamp ${route === "dpo" ? "bg-butter" : i === 1 ? "bg-coral text-cream" : "bg-white"}`}>
                <div className="font-mono text-[10px] opacity-55">STEP {i + 1}</div>
                <div className="font-display text-[19px] font-bold mt-1 mb-2">{title}</div>
                <div className="text-[13px] opacity-75 leading-relaxed">{body}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="mt-5 p-4 bg-teal text-cream border-2 border-ink rounded-2xl">
          {route === "dpo" ? "DPO 省掉独立奖励模型和在线强化学习，训练结构更短。" : "经典 RLHF 能持续用当前模型生成新回答，工程成本也更高。"}
        </div>
      </div>
    </section>
  );
};

function sigmoid(x: number) { return 1 / (1 + Math.exp(-x)); }

export const SectionProbabilityLab: React.FC = () => {
  const [pc, setPc] = useState(0.62);
  const [pr, setPr] = useState(0.38);
  const [rc, setRc] = useState(0.52);
  const [rr, setRr] = useState(0.48);
  const beta = 0.5;
  const advantage = beta * ((Math.log(pc) - Math.log(rc)) - (Math.log(pr) - Math.log(rr)));
  const win = sigmoid(advantage);
  const loss = -Math.log(Math.max(win, 1e-6));
  return (
    <section className="bg-teal text-cream border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="04" label="probability balance" />
        <h2 className="font-display text-display-lg mb-4 max-w-3xl">DPO 会比较训练前后，模型对两份回答的倾向变化</h2>
        <p className="max-w-2xl text-[15.5px] text-cream/75 mb-9">拖动四个回答倾向值。0 表示几乎不会这样回答，1 表示很容易这样回答。训练后的模型应该比原模型更偏向 chosen。</p>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-cream text-ink border-2 border-ink rounded-3xl shadow-stamp-xl p-6 space-y-5">
            {[
              ["当前模型 · chosen", pc, setPc, "accent-teal"],
              ["当前模型 · rejected", pr, setPr, "accent-coral"],
              ["参考模型 · chosen", rc, setRc, "accent-teal"],
              ["参考模型 · rejected", rr, setRr, "accent-coral"],
            ].map(([label, value, set, accent]) => (
              <label key={label as string} className="block">
                <div className="flex justify-between font-mono text-[11px] mb-1"><span>{label as string}</span><strong>{(value as number).toFixed(2)}</strong></div>
                <input type="range" min="0.05" max="0.95" step="0.01" value={value as number} onChange={(e) => (set as React.Dispatch<React.SetStateAction<number>>)(Number(e.target.value))} className={`w-full ${accent}`} />
              </label>
            ))}
            <div className="font-mono text-[10px] text-ink/45">教学示意：这里把模型对整份回答的倾向缩放到 0–1。具体数学计算属于进阶内容。</div>
          </div>
          <div className="lg:col-span-5 bg-ink border-2 border-cream/30 rounded-3xl p-6 shadow-stamp-xl">
            <CircleEqual className="w-8 h-8 text-butter mb-5" />
            <div className="space-y-5">
              <ProbBar label="DPO 判断 chosen 更优" value={win} tone="bg-butter" />
              <div>
                <div className="font-mono text-[10px] text-cream/55">距离目标还有多远 · 越小越好</div>
                <div className="font-display text-[52px] font-bold text-butter">{loss.toFixed(3)}</div>
              </div>
              <div className={`p-4 border-2 border-cream/30 rounded-xl text-[13px] ${win > 0.6 ? "bg-teal" : "bg-coral"}`}>
                {win > 0.6 ? "方向正确：当前模型相对参考模型更偏向 chosen。" : "还需调整：chosen 的相对优势不够明显。"}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-7 font-mono text-[11px] text-cream/45">DPO 原论文证明，这类训练可以直接用偏好对完成，省去独立打分器和在线试错。来源：Rafailov et al., 2023, arXiv:2305.18290。</p>
      </div>
    </section>
  );
};

export const SectionBetaDial: React.FC = () => {
  const [beta, setBeta] = useState(0.3);
  const change = Math.max(8, 90 - beta * 130);
  const stability = Math.min(96, 30 + beta * 110);
  const chosen = 50 + change * 0.42;
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="05" label="beta dial" />
        <h2 className="font-display text-display-lg mb-4 max-w-3xl">β 决定模型要多看重“别离原模型太远”</h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 mb-8">这里沿用 DPO 常见实现里的直觉：β 较高时更新更保守；β 较低时模型更用力追偏好数据。</p>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-butter border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
            <SlidersHorizontal className="w-8 h-8 mb-4" />
            <div className="flex justify-between items-end mb-3">
              <div className="font-display text-[25px] font-bold">β</div>
              <div className="font-display text-[46px] font-bold">{beta.toFixed(2)}</div>
            </div>
            <input type="range" min="0.05" max="0.7" step="0.01" value={beta} onChange={(e) => setBeta(Number(e.target.value))} className="w-full accent-coral" />
            <div className="flex justify-between font-mono text-[10px] text-ink/50 mt-2"><span>更敢改</span><span>更保守</span></div>
          </div>
          <div className="lg:col-span-7 bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 space-y-5">
            <ProbBar label="偏好推动力度 · 示意" value={change / 100} tone="bg-coral" />
            <ProbBar label="贴近参考模型 · 示意" value={stability / 100} tone="bg-teal" />
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 bg-cream border-2 border-ink rounded-xl"><div className="font-mono text-[10px] text-ink/50">chosen 相对权重</div><div className="font-display text-[32px] font-bold">{chosen.toFixed(0)}%</div></div>
              <div className="p-4 bg-cream border-2 border-ink rounded-xl"><div className="font-mono text-[10px] text-ink/50">当前判断</div><div className="font-display text-[18px] font-bold mt-2">{beta < 0.15 ? "更新很激进" : beta > 0.5 ? "更新较保守" : "力度居中"}</div></div>
            </div>
            <div className="font-mono text-[10px] text-ink/45">示意曲线，帮助理解方向，不代表固定训练结果。</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionTrainingDeck: React.FC = () => {
  const [cursor, setCursor] = useState(0);
  const [strength, setStrength] = useState([52, 49, 55]);
  const train = () => setStrength((xs) => xs.map((x, i) => i === cursor ? Math.min(92, x + 13) : x));
  return (
    <section className="bg-butter-tint border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="06" label="training deck" />
        <h2 className="font-display text-display-lg mb-4">看看一条偏好数据怎样影响训练结果</h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 mb-8">每点一次训练，当前样本里的 chosen 相对优势就增加。实际训练会一起处理整批数据。</p>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <button disabled={cursor === 0} onClick={() => setCursor((x) => x - 1)} className="btn-stamp bg-white disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
              <div className="font-mono text-[11px]">样本 {cursor + 1} / {PAIRS.length}</div>
              <button disabled={cursor === PAIRS.length - 1} onClick={() => setCursor((x) => x + 1)} className="btn-stamp bg-white disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="p-4 bg-butter border-2 border-ink rounded-xl font-display text-[18px] font-bold mb-4">{PAIRS[cursor].q}</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-teal text-cream border-2 border-ink rounded-xl"><div className="font-mono text-[10px] text-butter mb-2">chosen</div><p className="text-[13px] leading-relaxed">{PAIRS[cursor].chosen}</p></div>
              <div className="p-4 bg-coral text-cream border-2 border-ink rounded-xl"><div className="font-mono text-[10px] text-cream/65 mb-2">rejected</div><p className="text-[13px] leading-relaxed">{PAIRS[cursor].rejected}</p></div>
            </div>
            <button onClick={train} className="mt-5 btn-stamp bg-ink text-cream">用这条训练一步 <ArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="lg:col-span-4 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-6">
            <div className="font-display text-[24px] font-bold mb-5">偏好学习进度</div>
            <div className="space-y-5">
              {strength.map((v, i) => <ProbBar key={i} label={`样本 ${i + 1} · chosen 优势`} value={v / 100} tone={i === cursor ? "bg-butter" : "bg-teal"} />)}
            </div>
            <button onClick={() => setStrength([52, 49, 55])} className="mt-6 inline-flex items-center gap-2 text-[11px] font-mono text-cream/65"><RotateCcw className="w-3.5 h-3.5" />重置示意</button>
            <div className="mt-4 font-mono text-[10px] text-cream/40">示意数值，不是模型实测。</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PITFALLS = [
  { title: "偏好数据有噪声", body: "不同标注员可能做出相反选择。把每条 chosen 都当绝对真理，模型会学到互相冲突的方向。" },
  { title: "数据来自旧模型", body: "静态偏好对只覆盖收集数据时出现过的回答。模型更新后产生的新错误，旧数据可能完全没见过。" },
  { title: "训练过头", body: "同一批偏好对练太久，模型会过度放大数据里的措辞和格式习惯，多样性跟着下降。" },
  { title: "chosen 也可能不够好", body: "偏好数据只说明 A 比 B 好。A 本身仍可能有事实错误、安全问题或遗漏。" },
];

export const SectionPitfalls: React.FC = () => {
  const [open, setOpen] = useState(1);
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="07" label="where dpo slips" />
        <h2 className="font-display text-display-lg mb-4">DPO 训练简单，数据问题仍会原样留下</h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 mb-8">点开四个常见问题。DPO 省的是训练流程，不会自动修好偏好数据。</p>
        <div className="space-y-3">
          {PITFALLS.map((x, i) => (
            <button key={x.title} onClick={() => setOpen(i)} className={`w-full text-left border-2 border-ink rounded-2xl p-5 transition-all ${open === i ? "bg-coral text-cream shadow-stamp-lg" : "bg-white"}`}>
              <div className="flex justify-between items-center gap-4">
                <span className="font-display text-[20px] font-bold">{x.title}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </div>
              {open === i && <p className="mt-3 text-[14px] leading-relaxed opacity-85 animate-enter-fade">{x.body}</p>}
            </button>
          ))}
        </div>
        <p className="mt-7 font-mono text-[11px] text-ink/45">直接偏好算法同样会出现过度优化，部分设置甚至在一轮数据结束前就开始退化。来源：Rafailov et al., 2024, arXiv:2406.02900。</p>
      </div>
    </section>
  );
};

export const SectionChooseMethod: React.FC = () => {
  const [facts, setFacts] = useState({ demos: false, prefs: true, online: false, rules: false });
  const method = facts.online || facts.rules ? "在线强化学习" : facts.prefs ? "DPO" : facts.demos ? "示范学习（SFT）" : "先准备数据";
  const reason = method === "DPO" ? "你有静态偏好对，又不需要边生成边训练。DPO 是最直接的起点。" : method === "示范学习（SFT）" ? "你有问题和标准答案，可以先让模型照着好答案练习。" : method === "在线强化学习" ? "你需要模型不断产生新回答，并立即按规则或分数调整。" : "当前没有能告诉模型正确方向的数据。";
  return (
    <section className="bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="08" label="pick the method" />
        <h2 className="font-display text-display-lg mb-4">手里的数据不同，训练方法也不同</h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 mb-8">勾选你已有的条件，右边会给出一个起步建议。</p>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-3">
            {[
              ["demos", "有问题 → 标准答案"],
              ["prefs", "有 chosen / rejected"],
              ["online", "要用当前模型生成新数据"],
              ["rules", "答案能被规则自动打分"],
            ].map(([id, label]) => {
              const active = facts[id as keyof typeof facts];
              return (
                <button key={id} onClick={() => setFacts((old) => ({ ...old, [id]: !active }))} className={`p-5 text-left border-2 border-ink rounded-2xl ${active ? "bg-butter shadow-stamp-lg" : "bg-cream"}`}>
                  <span className={`w-6 h-6 mb-3 border-2 border-ink rounded flex items-center justify-center ${active ? "bg-ink text-cream" : "bg-white"}`}>{active && <Check className="w-4 h-4" />}</span>
                  <div className="font-display text-[18px] font-bold">{label}</div>
                </button>
              );
            })}
          </div>
          <div className="lg:col-span-6 bg-teal text-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-7">
            <GitCompareArrows className="w-8 h-8 text-butter mb-4" />
            <div className="font-mono text-[11px] text-cream/55">建议起点</div>
            <div className="font-display text-[46px] font-bold text-butter mb-3">{method}</div>
            <p className="text-[15px] text-cream/80 leading-relaxed">{reason}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <LinkCard href="../sft/index.html" title="SFT">用人写好的答案示范教模型回答。</LinkCard>
          <LinkCard href="../reward-model/index.html" title="奖励模型">把人的偏好训练成一个可复用打分器。</LinkCard>
          <LinkCard href="../rlhf/index.html" title="RLHF">查看奖励模型、PPO 和 DPO 在整张图里的位置。</LinkCard>
        </div>
      </div>
    </section>
  );
};
