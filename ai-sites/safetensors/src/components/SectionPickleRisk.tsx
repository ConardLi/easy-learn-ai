/**
 * Section 02 · 老格式的雷
 *
 * 讲清动机：为什么要发明 safetensors —— 因为老格式 .bin/.pt 用 Python pickle，
 * pickle 加载时会「照着文件里的指令执行」，等于运行别人的代码。
 *
 * 交互：一个「加载文件」按钮，两个 tab（老格式 / safetensors）。
 * 点加载，老格式那边会跳出「文件里夹带的代码偷偷跑了」的提示，safetensors 那边只老老实实读数字。
 */
import React, { useState } from "react";
import { Play, ShieldAlert, ShieldCheck, Terminal } from "lucide-react";

type Mode = "pickle" | "safe";

const SectionPickleRisk: React.FC = () => {
  const [mode, setMode] = useState<Mode>("pickle");
  const [loaded, setLoaded] = useState(false);

  const switchMode = (m: Mode) => {
    setMode(m);
    setLoaded(false);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">why it exists</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          老格式有个雷：
          <span className="relative inline-block ml-1">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/40 -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">打开文件，等于运行代码</span>
          </span>
        </h2>
        <div className="max-w-2xl space-y-3 text-ink/75 text-[16px] mb-8">
          <p>
            在 safetensors 之前，PyTorch 模型常存成 <code className="font-mono text-[14px] bg-cream px-1.5 py-0.5 rounded border border-ink/15">.bin</code> 或 <code className="font-mono text-[14px] bg-cream px-1.5 py-0.5 rounded border border-ink/15">.pt</code>。这种文件用 Python 的 pickle 打包。
          </p>
          <p>
            pickle 有个特点：它不只是「读数据」，加载时会照着文件里写的指令一步步执行。坏人可以在模型文件里夹带一段代码，你一加载，它就在你电脑上跑起来了。
          </p>
          <p>
            你从网上下载一个陌生模型，相当于运行了一个陌生程序。这就是 safetensors 要解决的问题。
          </p>
        </div>

        {/* 交互演示 */}
        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-7">
          {/* tab */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <button
              onClick={() => switchMode("pickle")}
              className={[
                "flex items-center gap-2.5 px-4 py-3 border-2 border-ink rounded-2xl text-left transition-all duration-250 ease-spring",
                mode === "pickle" ? "bg-ink text-cream shadow-stamp-lg" : "bg-white text-ink hover:bg-butter-tint",
              ].join(" ")}
            >
              <ShieldAlert className="w-5 h-5 shrink-0" strokeWidth={2.3} />
              <div>
                <div className="font-display text-[14.5px] font-bold leading-tight">老格式 .bin / .pt</div>
                <div className={["font-mono text-[10px] mt-0.5", mode === "pickle" ? "text-cream/55" : "text-ink/50"].join(" ")}>
                  基于 pickle
                </div>
              </div>
            </button>
            <button
              onClick={() => switchMode("safe")}
              className={[
                "flex items-center gap-2.5 px-4 py-3 border-2 border-ink rounded-2xl text-left transition-all duration-250 ease-spring",
                mode === "safe" ? "bg-ink text-cream shadow-stamp-lg" : "bg-white text-ink hover:bg-butter-tint",
              ].join(" ")}
            >
              <ShieldCheck className="w-5 h-5 shrink-0" strokeWidth={2.3} />
              <div>
                <div className="font-display text-[14.5px] font-bold leading-tight">model.safetensors</div>
                <div className={["font-mono text-[10px] mt-0.5", mode === "safe" ? "text-cream/55" : "text-ink/50"].join(" ")}>
                  纯数据
                </div>
              </div>
            </button>
          </div>

          {/* 终端模拟 */}
          <div className="bg-ink rounded-2xl border-2 border-ink overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cream/15">
              <Terminal className="w-3.5 h-3.5 text-cream/60" strokeWidth={2.4} />
              <span className="font-mono text-[11px] text-cream/60">加载这个模型文件</span>
            </div>
            <div className="p-4 font-mono text-[12.5px] leading-relaxed min-h-[150px]">
              <div className="text-teal-300 text-cream/80">
                <span className="text-butter">$</span> load("{mode === "pickle" ? "model.bin" : "model.safetensors"}")
              </div>

              {!loaded ? (
                <button
                  onClick={() => setLoaded(true)}
                  className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 bg-butter text-ink border-2 border-cream/20 rounded-lg font-bold text-[12px] hover:bg-butter-soft transition-colors"
                >
                  <Play className="w-3.5 h-3.5" strokeWidth={2.6} />
                  点这里加载
                </button>
              ) : mode === "pickle" ? (
                <div className="mt-3 space-y-1.5 animate-enter-fade">
                  <div className="text-cream/70">→ 读取张量 embed.weight ... ok</div>
                  <div className="text-cream/70">→ 读取张量 layer0.attn.q ... ok</div>
                  <div className="text-pop font-bold">→ ⚠ 文件里夹带的指令开始执行：</div>
                  <div className="text-pop pl-4">os.system("上传你的 ~/.ssh 私钥到陌生服务器")</div>
                  <div className="text-pop pl-4">你根本没察觉，模型确实也加载好了。</div>
                </div>
              ) : (
                <div className="mt-3 space-y-1.5 animate-enter-fade">
                  <div className="text-cream/70">→ 读目录：找到 5 个张量</div>
                  <div className="text-cream/70">→ 按地址把数字搬进内存 ... ok</div>
                  <div className="text-teal-200" style={{ color: "#7FD4C1" }}>
                    → 全程只搬数字，没有任何代码可以执行。
                  </div>
                  <div className="text-cream/70">完成，安全。</div>
                </div>
              )}
            </div>
          </div>

          <p className="mt-4 text-[14px] text-ink/70 leading-relaxed">
            {mode === "pickle"
              ? "老格式把「读数据」和「执行指令」混在了一起，所以加载陌生文件有风险。"
              : "safetensors 的文件里根本没有「指令」这种东西，只有数字，从设计上就跑不了代码。"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionPickleRisk;
