import React, { useMemo, useState } from "react";
import { Shell, DemoNote } from "./Shared";

const raw = [
  { token: "今天", score: 3.4 },
  { token: "您好", score: 2.1 },
  { token: "我", score: 1.5 },
  { token: "由于", score: 1.1 },
];

const SectionTemperature: React.FC = () => {
  const [temperature, setTemperature] = useState(0.8);
  const probabilities = useMemo(() => {
    const exp = raw.map((item) => Math.exp(item.score / temperature));
    const sum = exp.reduce((a, b) => a + b, 0);
    return raw.map((item, index) => ({ ...item, value: (exp[index] / sum) * 100 }));
  }, [temperature]);

  return (
    <Shell
      num="05"
      label="候选怎么选"
      title="温度会怎样改变回答？"
      intro={<p><strong className="text-ink">温度</strong>是控制候选项差距的设置。温度低，模型常选最稳的词；温度高，其他候选更容易被选中。拖动滑杆看概率怎样散开。</p>}
      tone="butter"
    >
      <div className="grid lg:grid-cols-[.78fr_1.22fr] gap-7">
        <div className="card-stamp p-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-[11px] tracking-widest text-ink/50">TEMPERATURE</span>
              <strong className="block mt-2 font-display text-5xl">{temperature.toFixed(1)}</strong>
            </div>
            <span className="bg-ink text-white rounded-full px-3 py-1 font-mono text-[11px]">
              {temperature < 0.55 ? "更集中" : temperature > 1.25 ? "更分散" : "居中"}
            </span>
          </div>
          <input
            className="range mt-8"
            type="range"
            min="0.2"
            max="1.8"
            step="0.1"
            value={temperature}
            onChange={(event) => setTemperature(Number(event.target.value))}
          />
          <div className="mt-2 flex justify-between text-[11px] font-mono text-ink/50"><span>0.2 更集中</span><span>1.8 更分散</span></div>
          <p className="mt-7 leading-relaxed text-ink/70">
            写固定格式、抽取字段时常想要稳定。起标题、列想法时可以多留几个候选。温度高不会自动让答案更聪明。
          </p>
        </div>

        <div className="bg-ink text-white rounded-[2rem] border-2 border-ink shadow-stamp-lg p-6 sm:p-8">
          <p className="font-mono text-[11px] tracking-widest text-white/55">下一个 Token 的候选</p>
          <div className="mt-6 space-y-5">
            {probabilities.map((item, index) => (
              <div key={item.token}>
                <div className="flex justify-between text-sm font-bold">
                  <span>{item.token}</span><span className="font-mono text-white/60">{item.value.toFixed(1)}%</span>
                </div>
                <div className="mt-2 h-9 border border-white/30 rounded-lg overflow-hidden">
                  <div
                    className={`h-full transition-all duration-250 ${index === 0 ? "bg-butter" : index === 1 ? "bg-coral" : "bg-teal border-r border-white/20"}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DemoNote />
    </Shell>
  );
};

export default SectionTemperature;
