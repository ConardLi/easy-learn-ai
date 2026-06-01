/**
 * Section 02 · Conflict
 *
 * 主交互（L3 slider）：自主性 ↔ 安全性 单轴拖动
 *   - 拖到最左 → 全审批（安全但慢）
 *   - 中间 → 三档分别对应一个落点
 *   - 拖到最右 → 全放手（快但风险）
 *
 * 视觉锚：左右两端有「事故」「卡死」两个反例卡片，中间是「找平衡」的滑轨。
 */
import React, { useMemo, useState } from "react";
import { ShieldAlert, Hourglass, GaugeCircle } from "lucide-react";

type Verdict = {
  modeKey: "stuck" | "plan" | "default" | "auto" | "yolo";
  modeLabel: string;
  modeEn: string;
  modeColor: string;
  textOn: string;
  posTag: string;
  oneLine: string;
  risk: string;
  speed: string;
};

const VERDICTS: Verdict[] = [
  {
    modeKey: "stuck",
    modeLabel: "全审批 · 卡死",
    modeEn: "OVER-LOCKED",
    modeColor: "#241C15",
    textOn: "#FBEFE3",
    posTag: "0%",
    oneLine: "每读一个字节都问你 —— 工作变成「帮 AI 点确认」。",
    risk: "几乎为零",
    speed: "几乎为零",
  },
  {
    modeKey: "plan",
    modeLabel: "Plan 模式",
    modeEn: "READ-ONLY",
    modeColor: "#F4D35E",
    textOn: "#241C15",
    posTag: "20-35%",
    oneLine: "Agent 只能读和分析，最后给你一份方案，不动文件。",
    risk: "极低",
    speed: "想得清楚",
  },
  {
    modeKey: "default",
    modeLabel: "Default 模式",
    modeEn: "STEP REVIEW",
    modeColor: "#E07A5F",
    textOn: "#FBEFE3",
    posTag: "50%",
    oneLine: "每一步写操作弹审批，你看 diff 点确认。Default 是出厂设置。",
    risk: "可控",
    speed: "中等",
  },
  {
    modeKey: "auto",
    modeLabel: "Auto 模式",
    modeEn: "AUTO + GUARD",
    modeColor: "#1B4B5A",
    textOn: "#FBEFE3",
    posTag: "75-90%",
    oneLine: "Agent 自动跑；危险操作（force push、curl|bash）有分类器（另一个小 AI，专门判断这条命令危不危险）拦截。",
    risk: "中（有兜底）",
    speed: "快",
  },
  {
    modeKey: "yolo",
    modeLabel: "全放开 · YOLO",
    modeEn: "NO GUARD",
    modeColor: "#FF4D74",
    textOn: "#FBEFE3",
    posTag: "100%",
    oneLine: "完全无审批，删 .env、push 到 main 都不拦你。沙箱里再用。",
    risk: "高",
    speed: "最快",
  },
];

function verdictFor(v: number): Verdict {
  if (v < 10) return VERDICTS[0];
  if (v < 42) return VERDICTS[1];
  if (v < 62) return VERDICTS[2];
  if (v < 94) return VERDICTS[3];
  return VERDICTS[4];
}

const SectionConflict: React.FC = () => {
  const [val, setVal] = useState<number>(50);
  const verdict = useMemo(() => verdictFor(val), [val]);

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Conflict · 一个核心矛盾</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          自主性{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">越大</span>
          </span>
          ，安全{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-coral/45 -z-0" />
            <span className="relative z-10">越小</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          所有模式设计都在回答同一个问题：
          <strong className="text-ink"> Agent 替你跑得多快，你愿意冒多大险？</strong>{" "}
          往两头走都会崩 —— 一头是改错文件、误删配置；另一头是每步都问，效率塌方。
          模式就是在这条轴上选「停在哪一档」。
        </p>

        {/* 两端反例卡片 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card-stamp p-6 bg-cream">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-ink text-cream flex items-center justify-center">
                <Hourglass className="w-4 h-4" strokeWidth={2.4} />
              </div>
              <div>
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  极端一：太死
                </div>
                <div className="font-display font-extrabold text-[18px] text-ink leading-tight">
                  每一步都问
                </div>
              </div>
            </div>
            <p className="font-sans text-[14.5px] leading-[1.65] text-ink/80">
              读一个文件弹一次，列个目录也弹一次。20 分钟点了 80 个确认，你已经累了。
              <span className="text-ink/55">「让 AI 帮忙」 → 「帮 AI 点确认」。</span>
            </p>
          </div>
          <div className="card-stamp p-6 bg-coral/15">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-pop text-cream flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" strokeWidth={2.4} />
              </div>
              <div>
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  极端二：太放
                </div>
                <div className="font-display font-extrabold text-[18px] text-ink leading-tight">
                  全放手让它跑
                </div>
              </div>
            </div>
            <p className="font-sans text-[14.5px] leading-[1.65] text-ink/80">
              Agent 自己删了 .env、把 WIP 分支强推到 main、执行了从网上下载的脚本。
              <span className="text-ink/55"> 出事时你一无所知，回滚也来不及。</span>
            </p>
          </div>
        </div>

        {/* 滑轨主交互 */}
        <div className="mt-12 card-stamp p-7 lg:p-8 bg-white">
          <div className="flex items-center gap-3 mb-2">
            <GaugeCircle className="w-5 h-5 text-ink" strokeWidth={2.2} />
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
              拖动滑块 · 看你停在哪一档
            </div>
          </div>
          <div className="font-display font-extrabold text-[22px] lg:text-[26px] text-ink leading-tight">
            自主性轴
          </div>

          {/* 刻度区 */}
          <div className="mt-8">
            <div className="relative">
              {/* 档位标记点 */}
              <div className="absolute -top-7 left-0 right-0 flex justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-ink/55 pointer-events-none">
                <span>0 · 全审批</span>
                <span>25 · Plan</span>
                <span>50 · Default</span>
                <span>80 · Auto</span>
                <span>100 · Yolo</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={val}
                onChange={(e) => setVal(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer"
                aria-label="自主性"
              />
              <div className="mt-2 flex justify-between font-mono text-[10px] text-ink/40">
                <span>安全 ←</span>
                <span>→ 速度</span>
              </div>
            </div>
          </div>

          {/* 当前落点结论 */}
          <div
            key={verdict.modeKey}
            className="mt-7 grid grid-cols-1 md:grid-cols-12 gap-5 animate-enter-up"
          >
            <div className="md:col-span-5">
              <div
                className="border-2 border-ink rounded-2xl shadow-stamp p-5"
                style={{ backgroundColor: verdict.modeColor, color: verdict.textOn }}
              >
                <div
                  className="font-mono text-[10.5px] tracking-[0.22em] uppercase mb-1"
                  style={{ opacity: 0.75 }}
                >
                  落点 · {verdict.posTag}
                </div>
                <div className="font-display font-extrabold text-[26px] leading-tight">
                  {verdict.modeLabel}
                </div>
                <div className="font-mono text-[10.5px] tracking-[0.18em] mt-1 opacity-80">
                  {verdict.modeEn}
                </div>
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="font-sans text-[16px] leading-[1.65] text-ink mb-4">
                {verdict.oneLine}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="card-stamp p-3 bg-cream">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/55">
                    出事风险
                  </div>
                  <div className="font-display font-extrabold text-[18px] text-ink leading-tight mt-1">
                    {verdict.risk}
                  </div>
                </div>
                <div className="card-stamp p-3 bg-cream">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/55">
                    干活速度
                  </div>
                  <div className="font-display font-extrabold text-[18px] text-ink leading-tight mt-1">
                    {verdict.speed}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 收尾一句 */}
        <p className="font-sans text-[15px] leading-[1.7] text-ink/65 mt-7 max-w-[760px] italic">
          没有永远最好的档。
          <span className="not-italic font-bold text-ink"> 看任务换 Plan、Default 还是 Auto </span>。
        </p>
      </div>
    </section>
  );
};

export default SectionConflict;
