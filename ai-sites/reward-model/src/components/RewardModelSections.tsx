import React, { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Scale,
  SlidersHorizontal,
  UserRoundCheck,
} from "lucide-react";
import { Anchor, LinkCard, Meter } from "./common";

const PROMPTS = [
  {
    q: "我第一次去露营，要带什么？",
    a: "先看天气和营地规则。基础装备带帐篷、睡袋、防潮垫、照明、饮水和简单急救用品。",
    b: "露营是一种户外休闲活动，起源可以追溯到十九世纪，常见形式包括徒步露营、自驾露营……",
  },
  {
    q: "一句话解释为什么会打雷。",
    a: "云里积累的电荷突然放电，把周围空气瞬间加热并震出巨响。",
    b: "雷电现象涉及复杂的大气物理过程，需要从云层结构、电荷分离、放电通道等方面讨论。",
  },
  {
    q: "这封催款邮件帮我写得礼貌一点。",
    a: "您好，想跟进一下上月发票的付款进度；若已安排，烦请告知预计到账时间，谢谢。",
    b: "你们的款项已经逾期，请尽快支付，否则我们将采取进一步措施。",
  },
];

export const SectionHero: React.FC = () => {
  const [sample, setSample] = useState(0);
  const [picked, setPicked] = useState<"a" | "b">("a");
  const item = PROMPTS[sample];
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5">
          <div className="eyebrow mb-5">Reward Model · 奖励模型</div>
          <h1 className="font-display text-display-xl mb-6">奖励模型是什么？</h1>
          <p className="font-display text-[21px] lg:text-[24px] font-bold leading-snug mb-5">
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-0 h-4 bg-butter -z-0" />
              <span className="relative">奖励模型读取问题和回答，给出一个表示人类偏好程度的分数。</span>
            </span>
          </p>
          <div className="space-y-3 text-[15px] text-ink/75 leading-relaxed">
            <p>人不需要为每个新问题都守在旁边打分。先收集一批“更喜欢 A 还是 B”的选择，再训练一个专门模仿这些选择的模型。</p>
            <p>它学成后就像一名自动评审。回答越符合训练时收集到的口味，分数通常越高。</p>
            <p>这个分数能用来训练聊天模型，也能从多份回答里挑出更合适的一份。</p>
          </div>
          <div className="mt-7">
            <LinkCard href="../rlhf/index.html" title="奖励模型通常是 RLHF 训练流程的一部分。">
              RLHF 会利用人的反馈继续训练聊天模型；这里专门解释其中负责打分的一步。
            </LinkCard>
          </div>
          <p className="mt-6 text-[13.5px] text-ink/55">先在右边选一次：同一个问题，你更喜欢哪份回答？</p>
          <div className="mt-8 flex items-center gap-2 text-[12px] font-mono text-ink/55">
            <ArrowDown className="w-4 h-4" /> 继续往下看
          </div>
        </div>
        <div className="lg:col-span-7 bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6">
          <div className="flex gap-2 mb-5">
            {PROMPTS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setSample(i); setPicked("a"); }}
                className={`px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] ${sample === i ? "bg-ink text-cream shadow-stamp" : "bg-white"}`}
              >
                题目 {i + 1}
              </button>
            ))}
          </div>
          <div className="p-4 bg-butter-tint border-2 border-ink rounded-2xl mb-4">
            <div className="font-mono text-[10px] text-ink/50 mb-1">问题</div>
            <div className="font-display text-[19px] font-bold">{item.q}</div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {(["a", "b"] as const).map((id) => {
              const on = picked === id;
              return (
                <button
                  key={id}
                  onClick={() => setPicked(id)}
                  className={`text-left p-4 rounded-2xl border-2 border-ink transition-all duration-250 ${on ? "bg-teal text-cream shadow-stamp-lg -translate-y-1" : "bg-cream hover:bg-butter-tint"}`}
                >
                  <div className="font-mono text-[11px] mb-2">回答 {id.toUpperCase()}</div>
                  <p className="text-[14px] leading-relaxed">{item[id]}</p>
                  <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px]">
                    {on && <Check className="w-3.5 h-3.5" />} {on ? "你选择了它" : "点击选择"}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-5 p-3.5 bg-cream border-2 border-ink rounded-xl text-[13px] text-ink/70">
            训练记录：在这个问题下，回答 {picked.toUpperCase()} 被标为 <strong className="text-ink">chosen</strong>，另一份是 <strong className="text-ink">rejected</strong>。
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionHumanLabels: React.FC = () => {
  const [choices, setChoices] = useState<Record<number, "a" | "b">>({});
  const done = Object.keys(choices).length;
  return (
    <section className="bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="02" label="human preference data" />
        <h2 className="font-display text-display-lg mb-4 max-w-3xl">人类先做选择，奖励模型再学会模仿</h2>
          <p className="max-w-2xl text-[15.5px] text-ink/70 mb-9">
          偏好对 = 同一个问题下，一份被选中的回答和一份落选的回答。选择题比要求标注员给出精确的 83 分更稳定，也更接近日常判断。
        </p>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            {PROMPTS.map((p, i) => (
              <div key={p.q} className="border-2 border-ink rounded-2xl p-5 bg-cream shadow-stamp">
                <div className="font-display text-[17px] font-bold mb-3">{p.q}</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(["a", "b"] as const).map((id) => {
                    const on = choices[i] === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setChoices((old) => ({ ...old, [i]: id }))}
                        className={`p-3 rounded-xl border-2 border-ink text-left text-[13px] leading-relaxed ${on ? "bg-ink text-cream shadow-stamp" : "bg-white hover:bg-butter-tint"}`}
                      >
                        <span className="font-mono text-[10px] block mb-1">回答 {id.toUpperCase()}</span>
                        {p[id]}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="sticky top-5 bg-butter border-2 border-ink rounded-3xl shadow-stamp-lg p-5">
              <UserRoundCheck className="w-8 h-8 mb-4" />
              <div className="font-display text-[25px] font-bold mb-1">偏好账本</div>
              <div className="font-mono text-[11px] text-ink/55 mb-4">{done} / {PROMPTS.length} 条已标</div>
              <div className="space-y-2 min-h-[128px]">
                {Object.entries(choices).map(([k, v]) => (
                  <div key={k} className="bg-white border-2 border-ink rounded-xl px-3 py-2 font-mono text-[11px]">
                    题目 {Number(k) + 1} · {v.toUpperCase()} › {v === "a" ? "B" : "A"}
                  </div>
                ))}
                {!done && <p className="text-[13px] text-ink/60">左边每选一次，这里就多一条训练样本。</p>}
              </div>
              <button onClick={() => setChoices({})} className="mt-4 btn-stamp bg-white text-ink text-[12px] px-4 py-2">
                <RotateCcw className="w-3.5 h-3.5" /> 清空
              </button>
            </div>
          </div>
        </div>
        <p className="mt-8 text-[11px] font-mono text-ink/45">InstructGPT 使用标注员对多个回答的排序训练奖励模型。来源：Ouyang et al., 2022, arXiv:2203.02155。</p>
      </div>
    </section>
  );
};

export const SectionScoreGap: React.FC = () => {
  const [a, setA] = useState(1.2);
  const [b, setB] = useState(-0.4);
  const probability = 1 / (1 + Math.exp(-(a - b)));
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="03" label="score gap" />
        <h2 className="font-display text-display-lg mb-4 max-w-3xl">排序怎样变成分数？关键看两份回答差多少</h2>
          <p className="max-w-2xl text-[15.5px] text-ink/70 mb-9">
          奖励模型分别给 A、B 一个数。训练时关心的是分差：被人选中的回答应该高一些。分差越大，模型越确信人会选择 A。
        </p>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 space-y-6">
            {[
              { id: "A", value: a, set: setA, tone: "accent-teal" },
              { id: "B", value: b, set: setB, tone: "accent-coral" },
            ].map((x) => (
              <label key={x.id} className="block">
                <div className="flex justify-between font-mono text-[12px] mb-2">
                  <span>回答 {x.id} 的分数</span><strong>{x.value.toFixed(1)}</strong>
                </div>
                <input className={`w-full ${x.tone}`} type="range" min="-3" max="3" step="0.1" value={x.value} onChange={(e) => x.set(Number(e.target.value))} />
              </label>
            ))}
            <div className="p-4 bg-cream border-2 border-ink rounded-xl">
              <div className="font-mono text-[11px] text-ink/55">分差 A − B</div>
              <div className="font-display text-[36px] font-bold">{(a - b).toFixed(1)}</div>
            </div>
          </div>
          <div className="lg:col-span-7 bg-teal text-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8">
            <Scale className="w-8 h-8 text-butter mb-4" />
            <div className="font-mono text-[11px] text-cream/60 mb-2">模型预测</div>
            <div className="font-display text-[34px] lg:text-[46px] font-bold leading-tight mb-6">
              人类选择 A 的概率<br /><span className="text-butter">{(probability * 100).toFixed(1)}%</span>
            </div>
            <div className="h-7 bg-cream border-2 border-ink rounded-full overflow-hidden">
              <div className="h-full bg-butter transition-all duration-250" style={{ width: `${probability * 100}%` }} />
            </div>
            <p className="mt-5 text-[14px] text-cream/80 leading-relaxed">
              这里把 A 和 B 的分差换算成百分比。A 比 B 高得越多，模型越确信人会选择 A。两边一起加 10 分，判断不会变化。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TRAIN_STEPS = [
  { title: "读入偏好对", body: "问题、chosen 和 rejected 一起进入奖励模型。", a: 0.1, b: 0.2 },
  { title: "分别打分", body: "当前模型给 chosen 0.1，给 rejected 0.2，顺序猜反了。", a: 0.1, b: 0.2 },
  { title: "算出错得有多严重", body: "人选了 chosen，模型却给 rejected 更高分。训练程序会据此调整模型。", a: 0.1, b: 0.2 },
  { title: "调整模型", body: "训练把 chosen 的相对分数往上推，把 rejected 往下压。", a: 0.8, b: -0.2 },
  { title: "再遇到相似回答", body: "模型更可能把简洁、可操作的回答排在百科式长答前面。", a: 1.1, b: -0.5 },
];

export const SectionTrainingLoop: React.FC = () => {
  const [step, setStep] = useState(0);
  const s = TRAIN_STEPS[step];
  return (
    <section className="bg-butter-tint border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="04" label="training trace" />
        <h2 className="font-display text-display-lg mb-4">一条偏好对，怎样教会奖励模型？</h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 mb-8">点“下一步”，看看一条选择记录怎样改变模型。真实训练会用大量记录反复调整。</p>
        <div className="flex gap-2 mb-6">
          <button disabled={step === 0} onClick={() => setStep((x) => x - 1)} className="btn-stamp bg-white disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
          <button disabled={step === TRAIN_STEPS.length - 1} onClick={() => setStep((x) => x + 1)} className="btn-stamp bg-ink text-cream disabled:opacity-30">下一步 <ChevronRight className="w-4 h-4" /></button>
          <button onClick={() => setStep(0)} className="btn-stamp bg-white"><RotateCcw className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-2 mb-6">
          {TRAIN_STEPS.map((_, i) => <button key={i} onClick={() => setStep(i)} className={`h-3 flex-1 border-2 border-ink rounded-full ${i <= step ? "bg-coral" : "bg-white"}`} aria-label={`步骤 ${i + 1}`} />)}
        </div>
        <div key={step} className="grid lg:grid-cols-12 gap-6 animate-enter-fade">
          <div className="lg:col-span-5 bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
            <div className="font-mono text-[11px] text-ink/50">STEP {step + 1}</div>
            <h3 className="font-display text-[30px] font-bold mt-1 mb-4">{s.title}</h3>
            <p className="text-[15px] text-ink/75 leading-relaxed">{s.body}</p>
          </div>
          <div className="lg:col-span-7 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-6">
            <div className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="p-4 bg-teal border-2 border-cream/30 rounded-2xl">
                <div className="font-mono text-[10px] text-butter">chosen</div>
                <div className="font-display text-[38px] font-bold">{s.a.toFixed(1)}</div>
              </div>
              <ArrowRight className="w-6 h-6 rotate-90 sm:rotate-0" />
              <div className="p-4 bg-coral border-2 border-cream/30 rounded-2xl">
                <div className="font-mono text-[10px] text-cream/70">rejected</div>
                <div className="font-display text-[38px] font-bold">{s.b.toFixed(1)}</div>
              </div>
            </div>
            <div className="mt-5 font-mono text-[12px] text-cream/65">
              当前排序：{s.a > s.b ? "chosen > rejected，方向正确" : "chosen < rejected，需要调整"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionScoreMeaning: React.FC = () => {
  const [prompt, setPrompt] = useState<"same" | "different">("same");
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="05" label="read the score" />
        <h2 className="font-display text-display-lg mb-4 max-w-3xl">奖励分数适合做排序，别把它当成考试总分</h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 mb-8">一个分数单独拿出来通常没有固定含义。最稳妥的用法，是比较同一个问题下的候选回答。</p>
        <div className="flex gap-2 mb-5">
          <button onClick={() => setPrompt("same")} className={`btn-stamp ${prompt === "same" ? "bg-ink text-cream" : "bg-white"}`}>同一个问题</button>
          <button onClick={() => setPrompt("different")} className={`btn-stamp ${prompt === "different" ? "bg-ink text-cream" : "bg-white"}`}>不同问题</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {(prompt === "same" ? [
            ["回答 A", "2.4", "最适合"],
            ["回答 B", "1.1", "次选"],
            ["回答 C", "-0.3", "落选"],
          ] : [
            ["数学题回答", "2.4", "题目难度不同"],
            ["生日祝福", "1.1", "不能直接横比"],
            ["拒答请求", "-0.3", "低分未必更差"],
          ]).map(([name, score, note], i) => (
            <div key={name} className={`border-2 border-ink rounded-2xl p-5 shadow-stamp ${prompt === "same" && i === 0 ? "bg-butter" : "bg-white"}`}>
              <div className="font-mono text-[11px] text-ink/50">{name}</div>
              <div className="font-display text-[42px] font-bold">{score}</div>
              <div className="text-[13px] text-ink/65">{note}</div>
            </div>
          ))}
        </div>
        <div className={`mt-5 p-4 border-2 border-ink rounded-2xl ${prompt === "same" ? "bg-teal text-cream" : "bg-coral text-cream"}`}>
          {prompt === "same" ? "可以排序：输入条件相同，分差能表示模型更偏向哪一份。" : "谨慎比较：问题换了，分数基线也可能跟着变。"}
        </div>
      </div>
    </section>
  );
};

const BIASES = [
  { id: "length", name: "回答更长", effect: 24, note: "训练数据常把详尽和优质绑在一起，模型可能奖励冗长。" },
  { id: "agree", name: "顺着用户说", effect: 29, note: "标注员喜欢被认可时，奖励模型可能偏向讨好。" },
  { id: "format", name: "格式很整齐", effect: 16, note: "列表和标题容易显得专业，内容错误却可能被掩盖。" },
  { id: "domain", name: "遇到陌生领域", effect: -31, note: "遇到训练数据里很少见的问题时，奖励模型的打分更容易不准。" },
];

export const SectionBiasLab: React.FC = () => {
  const [on, setOn] = useState<string[]>(["length"]);
  const quality = Math.max(15, Math.min(95, 58 + on.reduce((s, id) => s + (BIASES.find((b) => b.id === id)?.effect ?? 0), 0)));
  const trueQuality = Math.max(18, 72 - on.length * 8 - (on.includes("domain") ? 20 : 0));
  return (
    <section className="bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="06" label="bias laboratory" />
        <h2 className="font-display text-display-lg mb-4 max-w-3xl">奖励模型会把标注习惯一起学进去</h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 mb-9">勾选回答特征，看看“奖励分高”和“真实质量高”怎样分开。图中数字是教学示意。</p>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {BIASES.map((b) => {
              const active = on.includes(b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => setOn((xs) => active ? xs.filter((x) => x !== b.id) : [...xs, b.id])}
                  className={`text-left p-5 border-2 border-ink rounded-2xl transition-all ${active ? "bg-butter shadow-stamp-lg -translate-y-1" : "bg-cream"}`}
                >
                  <div className="flex items-center gap-2 font-display text-[18px] font-bold mb-2">
                    <span className={`w-5 h-5 border-2 border-ink rounded flex items-center justify-center ${active ? "bg-ink text-cream" : "bg-white"}`}>{active && <Check className="w-3 h-3" />}</span>
                    {b.name}
                  </div>
                  <p className="text-[13px] text-ink/65 leading-relaxed">{b.note}</p>
                </button>
              );
            })}
          </div>
          <div className="lg:col-span-5 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-6 space-y-6">
            <SlidersHorizontal className="w-8 h-8 text-butter" />
            <Meter label="奖励模型给出的相对分" value={quality} tone="bg-butter" />
            <Meter label="示意的真实质量" value={trueQuality} tone="bg-coral" />
            <div className="p-4 bg-cream text-ink rounded-xl border-2 border-ink text-[13px] leading-relaxed">
              {quality - trueQuality > 20 ? "警报：分数涨得比质量快。继续追这个分，模型可能学会钻空子。" : "两条还算接近。仍要让真人另外检查，确认高分回答确实更好。"}
            </div>
            <div className="font-mono text-[10px] text-cream/45">示意模型，帮助理解趋势，不是实验统计。</div>
          </div>
        </div>
        <p className="mt-7 text-[11px] font-mono text-ink/45">训练过头时，奖励模型给出的分数可能继续上涨，真人评价却停滞或下降。来源：Gao, Schulman & Hilton, 2022, arXiv:2210.10760。</p>
      </div>
    </section>
  );
};

const USES = [
  { id: "ppo", title: "用分数继续训练（RLHF）", body: "聊天模型先生成回答，奖励模型负责打分，训练程序再根据分数调整聊天模型。经典做法常用 PPO，它会让模型逐步试错。", need: "需要持续生成新回答" },
  { id: "bon", title: "多生成几份再挑（Best-of-N）", body: "一次生成 N 份回答，用奖励模型挑分最高的一份交付。", need: "只改变回答挑选方式，不改模型" },
  { id: "filter", title: "过滤训练数据", body: "批量给候选数据打分，留下更符合目标的一部分。", need: "适合清洗和排序" },
  { id: "judge", title: "辅助评测", body: "快速比较很多模型输出，再抽样交给真人复核。", need: "不能替代独立人工评测" },
];

export const SectionWhereUsed: React.FC = () => {
  const [active, setActive] = useState("ppo");
  const cur = USES.find((x) => x.id === active)!;
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <Anchor n="07" label="where it goes" />
        <h2 className="font-display text-display-lg mb-4">学会打分以后，它能放到哪些地方？</h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 mb-8">奖励模型最常用于训练聊天模型。它也可以不参与训练，只从多份回答里挑出分数最高的一份。</p>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-2">
            {USES.map((x) => (
              <button key={x.id} onClick={() => setActive(x.id)} className={`w-full p-4 text-left border-2 border-ink rounded-xl font-display text-[17px] font-bold ${active === x.id ? "bg-ink text-cream shadow-stamp" : "bg-white"}`}>{x.title}</button>
            ))}
          </div>
          <div key={active} className="lg:col-span-8 bg-teal text-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-7 animate-enter-fade">
            <div className="font-mono text-[11px] text-butter mb-2">当前用法</div>
            <h3 className="font-display text-[34px] font-bold mb-4">{cur.title}</h3>
            <p className="text-[16px] text-cream/85 leading-relaxed mb-5">{cur.body}</p>
            <div className="inline-flex px-3 py-2 bg-cream text-ink border-2 border-ink rounded-xl font-mono text-[11px]">{cur.need}</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <LinkCard href="../rlhf/index.html" title="回到 RLHF 总流程" compact>看奖励分怎样进入 PPO，并约束模型别跑太远。</LinkCard>
          <LinkCard href="../dpo/index.html" title="继续看 DPO" compact>DPO 直接使用偏好对训练模型，省掉单独的奖励模型。</LinkCard>
        </div>
      </div>
    </section>
  );
};
