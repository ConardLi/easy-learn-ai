import React, { useMemo, useState } from "react";
import { Scissors } from "lucide-react";
import { MiniBadge, SectionShell, splitText } from "./common";

const SAMPLE =
  "公司年假政策按工龄分档：入职满一年后每年可休五天；满三年后每年可休十天；满五年后每年可休十五天。年假需要提前三个工作日在系统提交申请，由直属主管审批。未休完的年假可以结转到下一年三月底，超过期限自动失效。法定节假日和调休不占用年假额度。";

const SectionSliceLab: React.FC = () => {
  const [size, setSize] = useState(54);
  const chunks = useMemo(() => splitText(SAMPLE, size, 0), [size]);

  return (
    <SectionShell num="03" label="chunk size lab">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <h2 className="font-display text-display-lg text-ink">拖一下，看看同一段资料怎么被切开。</h2>
          <div className="mt-5 space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>
              chunk size 是每块大概多长。这里先用“字数”演示；真实系统常用 token 来量长度。
            </p>
            <p>
              Token 可以先理解成模型读文字时用的小碎片。中文、英文、数字都会被切成不同的小单位。
            </p>
          </div>

          <div className="mt-7 rounded-2xl border-2 border-ink bg-white p-5 shadow-stamp">
            <div className="mb-3 flex items-center justify-between gap-3">
              <MiniBadge>示意</MiniBadge>
              <span className="font-mono text-sm font-bold text-ink">{size} 字 / 块</span>
            </div>
            <input
              type="range"
              min="26"
              max="96"
              step="2"
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
              className="w-full accent-coral"
              aria-label="调整每个 chunk 的字数"
            />
            <div className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-ink/45">
              <span>更小</span>
              <span>更大</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp-xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-butter">
                <Scissors className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <div>
                <div className="font-display text-[23px] font-bold text-ink">切出来 {chunks.length} 块</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">live preview</div>
              </div>
            </div>
            <MiniBadge>{SAMPLE.length} 字原文</MiniBadge>
          </div>

          <div className="space-y-3">
            {chunks.map((chunk) => (
              <div
                key={chunk.id}
                className="rounded-xl border-2 border-ink bg-cream p-4 transition-transform duration-250 ease-spring hover:-translate-y-0.5 hover:shadow-stamp"
              >
                <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                  <span>chunk {chunk.id}</span>
                  <span>
                    {chunk.start}-{chunk.end}
                  </span>
                </div>
                <p className="text-[14px] leading-relaxed text-ink/78">{chunk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionSliceLab;
