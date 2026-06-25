import React, { useMemo, useState } from "react";
import { CornerDownLeft, Plus, RotateCcw } from "lucide-react";
import { DemoBadge, SectionHead } from "./SectionBits";

const ANSWER = ["可", "以", "，", "带", "把", "伞", "。"];
const LAYERS = [1, 2, 3, 4];

const SectionCacheGrows: React.FC = () => {
  const [prompt, setPrompt] = useState("今天会下雨吗？");
  const [generated, setGenerated] = useState(0);
  const promptTokens = useMemo(
    () => Array.from(prompt.trim()).slice(0, 12),
    [prompt],
  );
  const allTokens = [...promptTokens, ...ANSWER.slice(0, generated)];

  return (
    <section className="bg-butter-tint px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead
          number="04"
          label="缓存怎样增长"
          title="每生成一个 token，每层都追加一格 K 和 V"
          intro={
            <>
              <p>
                大模型由很多层组成。每一层都有自己的 KV Cache。
                新 token 出现后，各层都会为它补上一份 K 和一份 V。
              </p>
              <p className="mt-3">改掉问题，再逐步生成回答。下面用 4 层代表真实模型里的许多层。</p>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 rounded-[2rem] border-2 border-ink bg-white p-5 shadow-stamp-lg lg:col-span-4 lg:p-6">
            <div className="flex items-center justify-between">
              <label htmlFor="prompt" className="font-display text-xl font-bold">
                你的问题
              </label>
              <DemoBadge />
            </div>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(event) => {
                setPrompt(event.target.value);
                setGenerated(0);
              }}
              maxLength={20}
              rows={3}
              className="mt-4 w-full resize-none rounded-2xl border-2 border-ink bg-cream px-4 py-3 text-[15px] outline-none focus:shadow-stamp"
            />
            <div className="mt-5 rounded-2xl border-2 border-ink bg-ink p-4 text-cream">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-butter-soft">
                已生成
              </div>
              <p className="mt-2 min-h-[52px] font-display text-xl font-bold">
                {ANSWER.slice(0, generated).join("") || "点一下，写出第一个 token"}
                {generated > 0 && generated < ANSWER.length && (
                  <span className="ml-1 inline-block h-5 w-1 animate-pulse-dot bg-butter" />
                )}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => setGenerated((value) => Math.min(ANSWER.length, value + 1))}
                disabled={generated === ANSWER.length || promptTokens.length === 0}
                className="btn-stamp flex-1 bg-coral disabled:opacity-45"
              >
                <Plus className="h-4 w-4" />
                生成一步
              </button>
              <button
                onClick={() => setGenerated(0)}
                className="btn-stamp bg-white px-4"
                aria-label="清空已生成内容"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="min-w-0 rounded-[2rem] border-2 border-ink bg-cream p-5 shadow-stamp-lg lg:col-span-8 lg:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold">四层缓存架</h3>
                <p className="mt-1 text-xs text-ink/55">
                  每列对应一个 token；每格同时代表 K 和 V 两份数据。
                </p>
              </div>
              <div className="rounded-full border-2 border-ink bg-butter px-3 py-1 font-mono text-[11px] font-bold">
                {allTokens.length} 列 × {LAYERS.length} 层
              </div>
            </div>

            <div className="mt-6 overflow-x-auto pb-3">
              <div className="min-w-[620px] space-y-3">
                {LAYERS.map((layer) => (
                  <div key={layer} className="flex items-center gap-2">
                    <span className="w-12 flex-none font-mono text-[10px] font-bold text-ink/55">
                      层 {layer}
                    </span>
                    {allTokens.map((token, index) => {
                      const isAnswer = index >= promptTokens.length;
                      const newest = index === allTokens.length - 1 && generated > 0;
                      return (
                        <div
                          key={`${layer}-${index}-${token}`}
                          className={[
                            "relative flex h-12 w-12 flex-none items-center justify-center rounded-lg border-2 border-ink font-mono text-[10px] font-bold transition-all duration-250",
                            isAnswer ? "bg-coral" : "bg-white",
                            newest ? "animate-enter-pop shadow-stamp" : "",
                          ].join(" ")}
                          title={`token：${token} · K + V`}
                        >
                          <span className="absolute -top-2 rounded-full border border-ink bg-butter px-1.5 text-[8px]">
                            {token}
                          </span>
                          K·V
                        </div>
                      );
                    })}
                    {allTokens.length === 0 && (
                      <div className="flex h-12 items-center gap-2 rounded-lg border-2 border-dashed border-ink/35 px-3 text-xs text-ink/50">
                        <CornerDownLeft className="h-4 w-4" />
                        先输入问题
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              新 token 只会在右边追加一列。前面的列继续留在显卡内存里，直到这次生成结束或缓存被清掉。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCacheGrows;
