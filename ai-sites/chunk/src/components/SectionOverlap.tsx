import React, { useMemo, useState } from "react";
import { Link2 } from "lucide-react";
import { MiniBadge, SectionShell, splitText } from "./common";

const TEXT =
  "未休完的年假可以结转到下一年三月底，超过期限自动失效。离职结算时，已经批准但尚未休完的年假按公司制度折算。";

const SectionOverlap: React.FC = () => {
  const [overlap, setOverlap] = useState(12);
  const size = 38;
  const chunks = useMemo(() => splitText(TEXT, size, overlap), [overlap]);

  return (
    <SectionShell num="04" label="overlap" tone="butter">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <h2 className="font-display text-display-lg text-ink">相邻两块，为什么常留一点重复？</h2>
          <div className="mt-5 space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>overlap 是相邻 chunk 之间重复保留的一小段文字。它用来保护边界附近的意思。</p>
            <p>比如“结转到下一年三月底”和“超过期限自动失效”挨得很近。切刀落在中间，搜索可能只拿到半句话。</p>
          </div>

          <div className="mt-7 rounded-2xl border-2 border-ink bg-white p-5 shadow-stamp">
            <div className="mb-3 flex items-center justify-between">
              <MiniBadge>示意</MiniBadge>
              <span className="font-mono text-sm font-bold text-ink">{overlap} 字重复</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              step="2"
              value={overlap}
              onChange={(event) => setOverlap(Number(event.target.value))}
              className="w-full accent-coral"
              aria-label="调整 chunk overlap"
            />
            <p className="mt-3 text-sm leading-relaxed text-ink/65">重复越多，边界更稳；重复也会让保存的块数和成本变高。</p>
          </div>
        </div>

        <div className="rounded-3xl border-2 border-ink bg-cream p-5 shadow-stamp-xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-coral text-cream">
              <Link2 className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <div>
              <div className="font-display text-[23px] font-bold text-ink">边界附近的保护带</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">size fixed at 38 chars</div>
            </div>
          </div>

          <div className="space-y-3">
            {chunks.map((chunk, index) => {
              const previous = chunks[index - 1];
              const repeated = previous ? Math.max(0, previous.end - chunk.start) : 0;
              return (
                <div key={`${chunk.id}-${overlap}`} className="rounded-xl border-2 border-ink bg-white p-4">
                  <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                    <span>chunk {chunk.id}</span>
                    {repeated > 0 && <span className="text-coral">{repeated} 字重复</span>}
                  </div>
                  <p className="text-[14px] leading-relaxed text-ink/78">
                    {previous && repeated > 0 ? (
                      <>
                        <mark className="rounded bg-butter px-0.5 text-ink">{chunk.text.slice(0, repeated)}</mark>
                        {chunk.text.slice(repeated)}
                      </>
                    ) : (
                      chunk.text
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionOverlap;
