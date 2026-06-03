import React, { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

const SAMPLE_PAIRS = [
  { id: "leave", a: "员工年假怎么算", b: "新人入职有几天带薪假", angle: 18 },
  { id: "exact", a: "报销单号 BX-2041", b: "BX-2041 的审批状态", angle: 38 },
  { id: "far", a: "年假能不能结转", b: "周末附近有什么餐厅", angle: 82 },
];

const SectionSimilarity: React.FC = () => {
  const [pairId, setPairId] = useState("leave");
  const [extraAngle, setExtraAngle] = useState(0);
  const pair = SAMPLE_PAIRS.find((item) => item.id === pairId)!;
  const angle = Math.min(90, pair.angle + extraAngle);
  const score = useMemo(() => Math.max(0, Math.cos((angle * Math.PI) / 180)), [angle]);

  return (
    <section className="relative overflow-hidden bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">similarity score</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="mb-5 max-w-3xl font-display text-display-lg text-ink">
              找得近，
              <br />
              还要有个分数。
            </h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
              <p>
                相似度是两个向量的接近程度。常见做法会看两个方向夹得有多紧。
              </p>
              <p>
                夹角小，分数高。夹角大，分数低。分数高的内容更可能被拿去给 AI 参考。
              </p>
              <p>
                这个分数只说明“意思像不像”。编号、金额、日期这类精确信息，还要配合普通搜索或数据库条件。
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp-lg">
              <div className="mb-4 flex flex-wrap gap-2">
                {SAMPLE_PAIRS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPairId(item.id);
                      setExtraAngle(0);
                    }}
                    className={[
                      "rounded-full border-2 border-ink px-3 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] transition-all duration-250 ease-spring",
                      pairId === item.id ? "bg-ink text-cream shadow-stamp" : "bg-white text-ink hover:bg-cream",
                    ].join(" ")}
                  >
                    {item.id}
                  </button>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-2xl border-2 border-ink bg-cream p-4">
                  <svg viewBox="0 0 340 250" className="h-auto w-full" aria-label="两个向量夹角示意">
                    <g stroke="#241C15" strokeWidth="0.6" opacity="0.08">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <line key={`v-${i}`} x1={i * 32} y1="0" x2={i * 32} y2="250" />
                      ))}
                      {Array.from({ length: 9 }).map((_, i) => (
                        <line key={`h-${i}`} x1="0" y1={i * 32} x2="340" y2={i * 32} />
                      ))}
                    </g>
                    <VectorArrow angle={-8} color="#1B4B5A" label="A" />
                    <VectorArrow angle={angle - 8} color="#E07A5F" label="B" />
                    <path
                      d={`M 170 182 A 48 48 0 0 1 ${170 + 48 * Math.cos(((angle - 8) * Math.PI) / 180)} ${182 - 48 * Math.sin(((angle - 8) * Math.PI) / 180)}`}
                      fill="none"
                      stroke="#241C15"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                    <text x="190" y="154" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="700" fill="#241C15" opacity="0.55">
                      {Math.round(angle)}°
                    </text>
                  </svg>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl border-2 border-ink bg-butter/35 p-4">
                    <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">sentence a</div>
                    <p className="text-[14px] font-bold leading-snug text-ink">{pair.a}</p>
                  </div>
                  <div className="rounded-2xl border-2 border-ink bg-coral/20 p-4">
                    <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">sentence b</div>
                    <p className="text-[14px] font-bold leading-snug text-ink">{pair.b}</p>
                  </div>
                  <div className="rounded-2xl border-2 border-ink bg-cream p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">相似分</span>
                      <span className="font-mono text-[22px] font-bold text-ink">{score.toFixed(2)}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full border-2 border-ink bg-white">
                      <div className="h-full bg-teal" style={{ width: `${score * 100}%` }} />
                    </div>
                    <label className="mt-4 block">
                      <span className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">
                      <span>手动把两句话拉远</span>
                        <span>+{extraAngle}°</span>
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        value={extraAngle}
                        onChange={(event) => setExtraAngle(Number(event.target.value))}
                        className="w-full accent-[#1B4B5A]"
                      />
                    </label>
                    <button
                      onClick={() => setExtraAngle(0)}
                      className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition-all hover:bg-butter/30"
                    >
                      <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.4} />
                      reset
                    </button>
                    <p className="mt-3 font-mono text-[10px] leading-relaxed text-ink/45">
                      这里只画成两条箭头方便看。实际那串数字通常有几百到几千个数，屏幕上画不出来。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VectorArrow: React.FC<{ angle: number; color: string; label: string }> = ({ angle, color, label }) => {
  const radians = (-angle * Math.PI) / 180;
  const x2 = 170 + 112 * Math.cos(radians);
  const y2 = 182 - 112 * Math.sin(radians);
  return (
    <g>
      <line x1="170" y1="182" x2={x2} y2={y2} stroke="#241C15" strokeWidth="8" strokeLinecap="round" />
      <line x1="170" y1="182" x2={x2} y2={y2} stroke={color} strokeWidth="5" strokeLinecap="round" />
      <circle cx={x2} cy={y2} r="13" fill={color} stroke="#241C15" strokeWidth="2.5" />
      <text x={x2} y={y2 + 4} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="800" fill="#FFFFFF">
        {label}
      </text>
    </g>
  );
};

export default SectionSimilarity;
