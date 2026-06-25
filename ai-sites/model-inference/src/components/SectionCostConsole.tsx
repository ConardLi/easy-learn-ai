import React, { useMemo, useState } from "react";
import { Gauge, Layers3, Timer, Users } from "lucide-react";
import { DemoNote, Shell } from "./Shared";

const SectionCostConsole: React.FC = () => {
  const [input, setInput] = useState(1200);
  const [output, setOutput] = useState(300);
  const [size, setSize] = useState(2);
  const [users, setUsers] = useState(4);

  const metrics = useMemo(() => {
    const first = Math.round(180 + input * 0.16 * size + users * 22);
    const stream = Math.max(7, Math.round(62 / (size * (1 + users * 0.055))));
    const work = Math.round((input + output * 2.4) * size * users / 100) / 10;
    const memory = Math.round((3.5 + size * 4.2 + users * (input + output) / 5200) * 10) / 10;
    return { first, stream, work, memory };
  }, [input, output, size, users]);

  const controls = [
    { label: "输入长度", value: input, min: 100, max: 8000, step: 100, unit: " Token", setter: setInput },
    { label: "输出长度", value: output, min: 50, max: 2000, step: 50, unit: " Token", setter: setOutput },
    { label: "模型大小", value: size, min: 1, max: 4, step: 1, unit: " 档", setter: setSize },
    { label: "同时请求", value: users, min: 1, max: 24, step: 1, unit: " 人", setter: setUsers },
  ];

  return (
    <Shell
      num="07"
      label="速度与成本"
      title="什么会让推理变慢、变贵？"
      intro={<p>输入长度决定先读多少，输出长度决定循环多少轮。模型越大，每轮工作越多。同时请求越多，机器要在更多回答之间分配空间。显存是 AI 计算机器里存放模型和临时结果的高速空间。</p>}
      tone="white"
    >
      <div className="grid lg:grid-cols-[.83fr_1.17fr] gap-7">
        <div className="card-stamp p-6 space-y-6">
          {controls.map((control) => (
            <label key={control.label} className="block">
              <span className="flex justify-between gap-3 text-sm font-bold">
                <span>{control.label}</span>
                <span className="font-mono text-ink/60">{control.value}{control.unit}</span>
              </span>
              <input
                className="range mt-3"
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={control.value}
                onChange={(event) => control.setter(Number(event.target.value))}
              />
            </label>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Timer, label: "等到第一个字", value: `${metrics.first} ms`, tone: "bg-butter" },
            { icon: Gauge, label: "后续生成速度", value: `${metrics.stream} Token/s`, tone: "bg-coral" },
            { icon: Layers3, label: "总计算量", value: `${metrics.work} 份`, tone: "bg-teal text-white" },
            { icon: Users, label: "显存占用", value: `${metrics.memory} GB`, tone: "bg-cream" },
          ].map(({ icon: Icon, label, value, tone }) => (
            <div key={label} className={`${tone} border-2 border-ink rounded-3xl shadow-stamp p-5 min-h-[158px]`}>
              <Icon className="w-6 h-6" />
              <span className="block mt-7 text-[12px] font-mono tracking-wider opacity-65">{label}</span>
              <strong className="block mt-2 font-display text-3xl">{value}</strong>
            </div>
          ))}
        </div>
      </div>
      <DemoNote />
      <div className="mt-7 bg-butter-tint border-2 border-ink rounded-2xl p-5 max-w-[820px]">
        <strong>日常使用时怎么判断？</strong>
        <p className="mt-2 text-[14px] leading-relaxed text-ink/70">贴了长资料，先看首字等待。要求写很长的回答，后续生成时间会拉长。多人同时使用时，还要看整个服务每秒总共能处理多少 Token，这叫吞吐；同时也要看显存够不够。</p>
      </div>
    </Shell>
  );
};

export default SectionCostConsole;
