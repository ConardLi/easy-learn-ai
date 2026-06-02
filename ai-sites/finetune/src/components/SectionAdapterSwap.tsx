/**
 * Section 05 · 一个 base 模型，N 个 adapter 切来切去
 *
 * 反直觉演示：LoRA adapter 只有几十 MB，可以一个 base 模型放着不动，
 * 按用户请求加载不同 adapter 切换"人格"。这是 multi-tenant SaaS 唯一经济可行架构。
 *
 * 交互：4 个 adapter chip 单选 → 同一 prompt 跑出 4 种风格的回应（mock 文本）+ 该 adapter 元数据
 *
 * 跟 Hero 隔了 3 个 section，且这个是「同一 LoRA 的 4 个特化版本切换」，不是「6 方法对比」。
 * 跟 Matrix 也不同（这里是输出风格演示，不是数值表）。
 *
 * 数据来源：
 *   - BigData Boutique 2026 multi-adapter serving · vLLM LoRA / LoRAX / SGLang
 *   - HuggingFace PEFT load_adapter / set_adapter API
 *   - Predibase 2026 case study LoRA 切换 multi-tenant
 */
import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

const PROMPT = "客户说：上周买的扫地机充不进电了。";

type AdapterId = "chat" | "code" | "translate" | "support";

const ADAPTERS: {
  id: AdapterId;
  name: string;
  trainedOn: string;
  size: string;
  rank: string;
  reply: string;
  tone: string;
}[] = [
  {
    id: "support",
    name: "客服 LoRA",
    trainedOn: "5K 条工单对话 · 3 轮",
    size: "37 MB",
    rank: "r=16, α=32",
    reply:
      "您好，已为您登记。先确认两件事：（1）充电时指示灯是否亮起？（2）换过插座或充电器吗？如果灯不亮，大概率是电源适配器问题，可走 7 天无理由换新。",
    tone: "公司话术 · 客气 · 给方案",
  },
  {
    id: "chat",
    name: "闲聊 LoRA",
    trainedOn: "200K 条社交对话",
    size: "29 MB",
    rank: "r=8, α=16",
    reply:
      "啊太烦了这种事，刚买没多久就出毛病。先试试换个插座哈，有时候真的是插座问题。要是还不行就直接走售后吧，别自己拆。",
    tone: "口语 · 共情 · 不急下结论",
  },
  {
    id: "code",
    name: "代码 LoRA",
    trainedOn: "10K 条 SDK doc · GitHub issue",
    size: "44 MB",
    rank: "r=16, α=16",
    reply:
      "需要补充信息以定位：1) 充电器型号；2) 长按电源 5s 是否有反应；3) APP 端日志最近 24h 的 charge_error code。返回数据后可调用 device.diagnose() 远程检测。",
    tone: "技术腔 · 列条目 · 求 log",
  },
  {
    id: "translate",
    name: "翻译 LoRA · 英→中",
    trainedOn: "WMT22 子集 · 80K 对",
    size: "31 MB",
    rank: "r=8, α=16",
    reply:
      "[翻译模式] Customer says: my robot vacuum stopped charging last week. → 客户反映：上周购入的扫地机器人无法充电。",
    tone: "正式书面 · 双语对照",
  },
];

const SectionAdapterSwap: React.FC = () => {
  const [pick, setPick] = useState<AdapterId>("support");
  const a = ADAPTERS.find((x) => x.id === pick)!;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10 bg-butter-tint/40">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">multi-adapter</span>
        </div>

        <div className="mb-10 lg:mb-12 max-w-3xl">
          <h2 className="font-display text-display-lg text-ink mb-4 leading-tight">
            一个 base 不动，<br className="lg:hidden" />
            <span className="relative inline-block">
              <span
                className="absolute left-0 right-0 bottom-1 h-3 lg:h-4 bg-butter -z-0"
                aria-hidden
              />
              <span className="relative z-10">挂不同 adapter 出不同人格</span>
            </span>。
          </h2>
          <p className="text-[15px] lg:text-[16px] text-ink/70 max-w-2xl leading-relaxed">
            LoRA adapter 只有 30-50 MB。线上一张 Llama-7B 放显存里不动，4 个 adapter 按请求来回切。多租户 SaaS 里这是很常见、也很省显存的一种做法。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* 左 · 架构示意 */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink/55 font-semibold mb-4">
                运行时架构
              </div>
              <svg viewBox="0 0 320 360" className="w-full h-auto" aria-hidden>
                {/* base model 中央大方块 */}
                <g>
                  <rect x="90" y="20" width="140" height="80" rx="10" fill="#241C15" stroke="#241C15" strokeWidth="2" />
                  <text x="160" y="50" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="16" fontWeight="800" fill="#FBEFE3">
                    base model
                  </text>
                  <text x="160" y="72" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#F4D35E">
                    Llama-7B · ~14 GB
                  </text>
                  <text x="160" y="88" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#FBEFE3" opacity="0.7">
                    一直在显存里
                  </text>
                </g>

                {/* 4 个 adapter 圆形 */}
                {ADAPTERS.map((ad, i) => {
                  const x = 40 + i * 80;
                  const on = ad.id === pick;
                  return (
                    <g key={ad.id} style={{ cursor: "pointer" }} onClick={() => setPick(ad.id)}>
                      <line
                        x1={x}
                        y1={150}
                        x2={x}
                        y2={100}
                        stroke="#241C15"
                        strokeWidth={on ? 2.5 : 1.5}
                        strokeDasharray={on ? "0" : "3 3"}
                        opacity={on ? 1 : 0.35}
                      />
                      <circle
                        cx={x}
                        cy={170}
                        r={on ? 26 : 22}
                        fill={on ? "#E07A5F" : "#FBEFE3"}
                        stroke="#241C15"
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />
                      <text
                        x={x}
                        y={174}
                        textAnchor="middle"
                        fontFamily="Smiley Sans, sans-serif"
                        fontSize={on ? 13 : 11}
                        fontWeight="800"
                        fill={on ? "#FBEFE3" : "#241C15"}
                      >
                        {ad.id === "support"
                          ? "客服"
                          : ad.id === "chat"
                            ? "闲聊"
                            : ad.id === "code"
                              ? "代码"
                              : "翻译"}
                      </text>
                      <text
                        x={x}
                        y={210}
                        textAnchor="middle"
                        fontFamily="Geist Mono, monospace"
                        fontSize="8.5"
                        fill="#241C15"
                        opacity={on ? 1 : 0.55}
                      >
                        {ad.size}
                      </text>
                    </g>
                  );
                })}

                {/* 流向箭头 */}
                <g>
                  <line x1="160" y1="240" x2="160" y2="290" stroke="#241C15" strokeWidth="2" />
                  <polygon points="155,288 165,288 160,298" fill="#241C15" />
                </g>

                {/* 用户请求 */}
                <g>
                  <rect x="50" y="300" width="220" height="42" rx="12" fill="#FBE891" stroke="#241C15" strokeWidth="2" />
                  <text x="160" y="318" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11.5" fontWeight="700" fill="#241C15">
                    一次请求 · 加载一个 adapter
                  </text>
                  <text x="160" y="334" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9.5" fill="#241C15" opacity="0.6">
                    切换耗时 &lt; 50ms
                  </text>
                </g>
              </svg>

              <div className="mt-4 pt-4 border-t border-ink/10 grid grid-cols-2 gap-2 text-[11.5px]">
                <div>
                  <div className="font-mono text-[10px] text-ink/45 uppercase tracking-[0.18em]">总显存</div>
                  <div className="font-display text-[16px] font-bold text-ink">
                    14 + 0.04 GB
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-ink/45 uppercase tracking-[0.18em]">如果换 4 个独立模型</div>
                  <div className="font-display text-[16px] font-bold text-coral">
                    56 GB · 4 倍
                  </div>
                </div>
              </div>
              <p className="mt-3 font-mono text-[10px] text-ink/40 leading-snug">
                vLLM / LoRAX / SGLang 2026 都原生支持热切换。
              </p>
            </div>
          </div>

          {/* 右 · 输出 */}
          <div className="lg:col-span-7">
            {/* 4 chip 大号 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {ADAPTERS.map((ad) => {
                const on = ad.id === pick;
                return (
                  <button
                    key={ad.id}
                    onClick={() => setPick(ad.id)}
                    className={[
                      "py-3 px-2 rounded-xl border-2 border-ink font-display text-[13.5px] font-bold transition-all duration-250 ease-spring",
                      on
                        ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                        : "bg-white text-ink hover:bg-butter-soft",
                    ].join(" ")}
                  >
                    {ad.name}
                  </button>
                );
              })}
            </div>

            {/* prompt 卡 */}
            <div className="bg-cream border-2 border-ink rounded-2xl p-4 mb-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5 font-semibold">
                同一句 prompt
              </div>
              <p className="font-display text-[16px] font-bold text-ink leading-snug">{PROMPT}</p>
            </div>

            {/* 当前 adapter 输出 */}
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6" key={a.id}>
              <div className="flex flex-wrap items-baseline gap-3 mb-3 animate-enter-up">
                <span className="font-display text-[18px] font-bold text-ink">
                  {a.name}
                </span>
                <span className="font-mono text-[10.5px] text-ink/45">{a.rank}</span>
              </div>

              <div className="mb-4 px-4 py-3 bg-butter/35 border-2 border-ink/40 rounded-xl animate-enter-fade">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                  base + 这个 adapter 的输出
                </div>
                <p className="text-[14.5px] text-ink leading-relaxed">{a.reply}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-ink/10">
                <KVMini label="训练数据" value={a.trainedOn} />
                <KVMini label="adapter 体积" value={a.size} />
                <KVMini label="语气" value={a.tone} />
              </div>
            </div>
          </div>
        </div>

        {/* 分锅：部署细节看 LoRA */}
        <a
          href="../lora/index.html"
          className="mt-8 inline-flex items-start gap-3 max-w-2xl px-4 py-3.5 bg-white border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-butter border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
          </span>
          <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
            <span className="font-bold text-ink">这里讲的是「能省」的故事。</span>
            <span className="text-ink/70">
              {" "}
              训完到底是把补丁 merge 回模型、还是留成文件热插拔，各有什么取舍——《LoRA》站还有一节专门讲部署。
            </span>
          </span>
        </a>
      </div>
    </section>
  );
};

const KVMini: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/45 mb-0.5">
      {label}
    </div>
    <div className="text-[12px] font-bold text-ink leading-snug">{value}</div>
  </div>
);

export default SectionAdapterSwap;
