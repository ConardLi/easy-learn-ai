import React, { useState } from "react";

const SectionCoordinates: React.FC = () => {
  const [warm, setWarm] = useState(65);
  const [living, setLiving] = useState(78);
  const [large, setLarge] = useState(30);
  return (
    <section className="border-y-2 border-ink bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor"><span className="section-anchor-num">02</span><span className="section-anchor-label">many coordinates</span></div>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="mb-5 font-display text-display-lg">一个位置，可以由很多数字共同决定。</h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
              <p>二维地图只需要横、纵两个坐标。模型的表示常有几百到几千个数字，每个数字都像一个坐标。</p>
              <p>单个方向未必能直接翻译成“大小”或“生命”。为了入门，右边先用三个能读懂的方向做示意。</p>
              <p>拖动三个坐标，看看位置和系统给出的描述怎样一起变化。</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-cream p-5 shadow-stamp-lg">
              <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
                <div className="space-y-5">
                  <Slider label="温暖感" value={warm} setValue={setWarm} color="#E07A5F" />
                  <Slider label="生命感" value={living} setValue={setLiving} color="#1B4B5A" />
                  <Slider label="体型感" value={large} setValue={setLarge} color="#FF4D74" />
                </div>
                <div className="flex min-h-48 items-center justify-center rounded-3xl border-2 border-ink bg-white">
                  <div className="rounded-full border-2 border-ink transition-all duration-250" style={{ width: 45 + large, height: 45 + large, backgroundColor: warm > 55 ? "#E07A5F" : "#1B4B5A", opacity: .45 + living / 190 }} />
                </div>
              </div>
              <div className="mt-5 rounded-2xl border-2 border-ink bg-white p-4">
                <span className="font-mono text-[10px] uppercase tracking-[.18em] text-ink/45">当前位置</span>
                <p className="mt-2 font-display text-2xl font-bold">[{warm / 100}, {living / 100}, {large / 100}, …]</p>
                <p className="mt-2 text-[13px] text-ink/60">{living > 60 ? "更像有生命的对象" : "更像物品"}，{large > 55 ? "体型偏大" : "体型偏小"}，{warm > 55 ? "颜色或情绪偏暖" : "颜色或情绪偏冷"}。</p>
              </div>
              <p className="mt-3 font-mono text-[10px] text-ink/45">示意坐标，帮助理解“多个数字共同决定位置”。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Slider: React.FC<{ label: string; value: number; setValue: (v: number) => void; color: string }> = ({ label, value, setValue, color }) => (
  <label className="block rounded-2xl border-2 border-ink bg-white p-4">
    <span className="mb-2 flex justify-between text-[12px] font-bold"><span>{label}</span><span className="font-mono">{value}</span></span>
    <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full" style={{ accentColor: color }} />
  </label>
);

export default SectionCoordinates;
