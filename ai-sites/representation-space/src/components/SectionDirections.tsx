import React, { useState } from "react";

const SectionDirections: React.FC = () => {
  const [animal, setAnimal] = useState(75);
  const [speed, setSpeed] = useState(25);
  const x = 40 + speed * 2.7;
  const y = 240 - animal * 2.1;
  return (
    <section className="border-y-2 border-ink bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor"><span className="section-anchor-num">04</span><span className="section-anchor-label">directions carry change</span></div>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="mb-5 font-display text-display-lg">方向也有含义：<br />沿某个方向走，特征会改变。</h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
              <p>位置说明内容现在在哪里，方向说明怎样改变它。向某个方向移动，可能让“动物感”更强；另一个方向可能增加“速度感”。</p>
              <p>真实空间里的方向常混合很多特征，也会受上下文影响。右边把它简化成两个清楚的方向。</p>
              <p>拖动滑杆，让黄色点在空间里移动。</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-butter-soft p-5 shadow-stamp-lg">
              <svg viewBox="0 0 360 280" className="w-full rounded-2xl border-2 border-ink bg-white">
                <line x1="40" y1="240" x2="330" y2="240" stroke="#241C15" strokeWidth="3" /><polygon points="330,240 318,234 318,246" fill="#241C15" />
                <line x1="40" y1="240" x2="40" y2="25" stroke="#241C15" strokeWidth="3" /><polygon points="40,25 34,37 46,37" fill="#241C15" />
                <text x="270" y="263" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="700">速度感 →</text>
                <text x="18" y="85" transform="rotate(-90 18 85)" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="700">动物感 →</text>
                <circle cx={x} cy={y} r="20" fill="#F4D35E" stroke="#241C15" strokeWidth="3" style={{ transition: "all 200ms" }} />
              </svg>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <AxisSlider label="动物感" value={animal} setValue={setAnimal} color="#E07A5F" />
                <AxisSlider label="速度感" value={speed} setValue={setSpeed} color="#1B4B5A" />
              </div>
              <p className="mt-3 font-mono text-[10px] text-ink/45">示意方向。真实模型不会保证每个方向都能用单个词命名。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AxisSlider: React.FC<{ label: string; value: number; setValue: (v: number) => void; color: string }> = ({ label, value, setValue, color }) => (
  <label className="rounded-2xl border-2 border-ink bg-white p-4">
    <span className="mb-2 flex justify-between text-[12px] font-bold"><span>{label}</span><span className="font-mono">{value}</span></span>
    <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full" style={{ accentColor: color }} />
  </label>
);

export default SectionDirections;
