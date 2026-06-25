import React, { useMemo, useState } from "react";

const SectionProjection: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const points = useMemo(() => [
    { label: "猫", base: [90, 80] }, { label: "狗", base: [130, 100] }, { label: "虎", base: [112, 150] },
    { label: "汽车", base: [265, 75] }, { label: "公交", base: [290, 135] }, { label: "地铁", base: [245, 175] },
  ], []);
  return (
    <section className="border-y-2 border-ink bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor"><span className="section-anchor-num">07</span><span className="section-anchor-label">projection warning</span></div>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="mb-5 font-display text-display-lg">屏幕上的二维图，<br />只保留了部分关系。</h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
              <p>高维空间无法完整画在屏幕上。我们会把很多坐标压到两个坐标，这一步叫降维或投影。</p>
              <p>投影会丢信息。二维图里挨着的点，在原空间里未必同样近；换一个观察角度，形状也可能变化。</p>
              <p>右图只演示一个结果：换一种画法，同一批点在屏幕上的布局会变化。它不模拟真实的降维计算。读这类图时，更适合看大致分组，少对单个距离下结论。</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-cream p-5 shadow-stamp-lg">
              <svg viewBox="0 0 360 260" className="w-full rounded-2xl border-2 border-ink bg-white">
                {points.map((p, i) => {
                  const rad = angle * Math.PI / 180;
                  const ox = p.base[0] - 180;
                  const oy = p.base[1] - 130;
                  const x = 180 + ox * Math.cos(rad) - oy * Math.sin(rad);
                  const y = 130 + ox * Math.sin(rad) + oy * Math.cos(rad) * .65;
                  return <g key={p.label}><circle cx={x} cy={y} r="14" fill={i < 3 ? "#E07A5F" : "#1B4B5A"} stroke="#241C15" strokeWidth="2" style={{ transition: "all 180ms" }} /><text x={x} y={y - 20} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700">{p.label}</text></g>;
                })}
              </svg>
              <label className="mt-5 block rounded-2xl border-2 border-ink bg-white p-4">
                <span className="mb-2 flex justify-between text-[12px] font-bold"><span>换一个投影角度</span><span className="font-mono">{angle}°</span></span>
                <input type="range" min="-75" max="75" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-[#FF4D74]" />
              </label>
              <p className="mt-3 font-mono text-[10px] text-ink/45">示意投影，展示“观察方式变化会改变二维布局”。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionProjection;
