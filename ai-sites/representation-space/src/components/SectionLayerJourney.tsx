import React, { useState } from "react";
import { Layers3 } from "lucide-react";

const LAYERS = [
  { name: "输入附近", title: "先保留表面样子", desc: "文字会保留字形和局部搭配；图片会保留颜色、边缘和位置。", tokens: ["金", "色", "毛", "发"] },
  { name: "中间层", title: "开始组合上下文", desc: "“金色毛发”逐渐和动物、材质、颜色等线索发生联系。", tokens: ["颜色", "毛发", "动物", "外观"] },
  { name: "后面层", title: "靠近当前任务需要的含义", desc: "如果问题在识别动物，表示会更突出“这可能是金毛犬”的线索。", tokens: ["金毛犬", "宠物", "识别", "回答"] },
];

const SectionLayerJourney: React.FC = () => {
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];
  return (
    <section className="bg-teal px-4 py-20 text-cream sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor"><span className="section-anchor-num">05</span><span className="section-anchor-label !text-cream/60">layer by layer</span></div>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="mb-5 font-display text-display-lg">同一份内容，在不同层里位置会变。</h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-cream/75">
              <p>模型会分很多步处理内容，每一步常叫一层。每经过一步，它都会参考前后内容，重新写出一组数字，也就换到了新位置。</p>
              <p>因此，表示空间有很多张：输入层一张，中间层一张，最后一层又是一张。不同层适合观察不同线索。</p>
              <p>点三个层级，看“金色毛发”怎样逐步接入上下文。</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-cream p-5 text-ink shadow-stamp-xl">
              <div className="mb-5 grid gap-2 sm:grid-cols-3">
                {LAYERS.map((item, i) => <button key={item.name} onClick={() => setActive(i)} className={`rounded-2xl border-2 border-ink px-3 py-3 font-bold ${active === i ? "bg-ink text-cream shadow-stamp" : "bg-white"}`}>{item.name}</button>)}
              </div>
              <div key={active} className="rounded-3xl border-2 border-ink bg-white p-6 animate-enter-pop">
                <div className="mb-4 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-ink bg-butter"><Layers3 /></span><h3 className="font-display text-3xl font-bold">{layer.title}</h3></div>
                <p className="text-[14.5px] leading-relaxed text-ink/65">{layer.desc}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {layer.tokens.map((token, i) => <span key={token} className="rounded-full border-2 border-ink px-4 py-2 font-bold" style={{ backgroundColor: ["#F4D35E", "#E07A5F", "#FBEFE3", "#FF4D74"][i] }}>{token}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLayerJourney;
