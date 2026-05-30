/**
 * Section 04 · 工具谱
 *
 * 5 个主流推理引擎 accordion 折叠展开。每个展开看：
 *   - 一句话定位
 *   - 招牌数字 (吞吐 / 延迟)
 *   - 长板 / 短板
 *   - 适合谁
 *   - 招牌技术 (mini SVG sketch · 每个工具独有的图)
 *   - 一行 CLI 启动命令
 *
 * 数据来源：上面 4 篇 webresearch · 每条数字旁注 src
 */
import React, { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

type Tool = {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  signature: string;
  pros: string[];
  cons: string[];
  fit: string;
  cli: string;
  sketch: React.ReactNode;
  source: string;
};

const TOOLS: Tool[] = [
  {
    id: "sglang",
    name: "SGLang",
    tagline: "结构化输出王 · 多轮 prompt 复用王",
    badge: "16,215 tok/s",
    badgeColor: "#FF4D74",
    signature: "RadixAttention · 共享前缀的 KV cache 自动当字典树管",
    pros: [
      "比 vLLM 多 29% 吞吐 · TTFT 少 23%",
      "结构化生成快 3-10× (xgrammar 编译)",
      "DeepSeek MLA 内核 + MoE 大规模专家并行",
      "AMD GPU 一等公民",
    ],
    cons: [
      "硬件支持窄一些（NVIDIA + AMD only）",
      "Python 路由层在极致并发下偶发瓶颈",
    ],
    fit: "多轮对话 / RAG 共享 system prompt / DeepSeek 系列 / xAI 选型",
    cli: "python -m sglang.launch_server --model meta-llama/Llama-3.1-8B-Instruct --tp 1",
    sketch: <SketchRadix />,
    source: "localaimaster 2026 · pytorch blog 2026 · chatforest 2026",
  },
  {
    id: "vllm",
    name: "vLLM v1",
    tagline: "工业标配 · 兼容性最广 · 文档最厚",
    badge: "12,500 tok/s",
    badgeColor: "#1B4B5A",
    signature: "PagedAttention + 连续批处理 + chunked prefill 默认开",
    pros: [
      "v1 (2025-2026 重写) 把 CPU 开销搬出 GIL",
      "硬件支持最广 · NVIDIA / AMD / TPU / Intel / Apple",
      "模型 zoo 最完整 · 几乎所有架构 Day-0",
      "OpenAI 兼容 API · LoRA / 量化 / 推测解码全套",
    ],
    cons: [
      "结构化输出弱一档",
      "多轮共享 prompt 不如 SGLang 的字典树",
    ],
    fit: "拿不准选什么时的默认选择 / 多云部署 / 模型 zoo 杂",
    cli: "vllm serve meta-llama/Llama-3.1-8B-Instruct --tensor-parallel-size 1",
    sketch: <SketchPaged />,
    source: "effloow.com 2026/04 · solosoft.dev 2026",
  },
  {
    id: "ollama",
    name: "Ollama",
    tagline: "小白友好 · 一行命令 · 单机单流之王",
    badge: "ollama run",
    badgeColor: "#E07A5F",
    signature: "v0.19 起换 MLX 后端 · Apple Silicon 速度 +93%",
    pros: [
      "一行 ollama run llama3.3:70b 就跑",
      "Mac / Win / Linux 一键装",
      "model library 数百模型 · 默认 GGUF 量化",
      "M4 Pro Mac mini 跑 70B @ 12-14 tok/s",
    ],
    cons: [
      "并发上 4 就开始拉跨 · 8 并发只能 82 tok/s",
      "没有 PagedAttention / 连续批处理",
      "不适合给团队当后端",
    ],
    fit: "个人开发 / 离线 demo / Mac 用户 / 不想读文档的人",
    cli: "ollama run llama3.3:70b-instruct-q4_K_M",
    sketch: <SketchOllama />,
    source: "ollama 0.22 release 2026/04 · towardsai 2026/05",
  },
  {
    id: "llamacpp",
    name: "llama.cpp",
    tagline: "极致省资源 · CPU 也能跑 · 树莓派也能跑",
    badge: "GGUF 之父",
    badgeColor: "#E5BD3A",
    signature: "纯 C++ · CPU/Metal/CUDA/Vulkan 多后端 · GGUF 文件格式",
    pros: [
      "二进制单文件 · 没有 Python 依赖",
      "Mac Metal / x86 CPU / 安卓 / Raspberry Pi 都能跑",
      "M4 Pro Llama 3.1 8B Q4 @ 80-100 tok/s",
      "Ollama / LM Studio 都建在它上面",
    ],
    cons: [
      "服务化要自己拼 (llama-server 简单 API)",
      "并发处理基础",
      "新模型支持比 vLLM/SGLang 慢一些",
    ],
    fit: "边缘 / 嵌入 / 老硬件 / Mac 极客 / 完全离线",
    cli: "llama-server -hf bartowski/Llama-3.1-8B-Instruct-GGUF -ngl 99",
    sketch: <SketchGGUF />,
    source: "craftrigs 2026 · llmhardware.io 2026/05",
  },
  {
    id: "tgi",
    name: "TGI",
    tagline: "HuggingFace 出品 · 现已进入维护模式",
    badge: "维护中",
    badgeColor: "#88837C",
    signature: "曾经的 HuggingFace 标配 · 现 HF 推 vLLM",
    pros: [
      "K8s 部署成熟 · 监控 / 健康检查齐",
      "和 HuggingFace Hub 模型注册一体",
      "Rust + Python 架构 · 内存占用低",
    ],
    cons: [
      "HuggingFace 2026 已不再开发新功能",
      "vLLM 在高并发吞吐高 24×",
      "新项目官方建议迁移到 vLLM",
    ],
    fit: "存量 HF TGI 部署 / 已经在 K8s 上跑 · 应规划迁移",
    cli: "docker run --gpus all ghcr.io/huggingface/text-generation-inference --model-id meta-llama/Llama-3.1-8B-Instruct",
    sketch: <SketchTGI />,
    source: "effloow.com 2026/04 · HuggingFace 官方公告",
  },
];

const SectionTools: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("sglang");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">tools shelf</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
          <h2 className="lg:col-span-7 font-display text-display-lg text-ink leading-tight">
            五个工具，五种取舍。
            <br />
            <span className="relative inline-block">
              <span className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0" aria-hidden />
              <span className="relative z-10">没有"全场最佳"，只有"对得上你这一场"。</span>
            </span>
          </h2>
          <div className="lg:col-span-5 self-end">
            <p className="text-[15px] text-ink/70 leading-relaxed">
              点开一个看招牌技术、长板短板、和一行启动命令。
              每张卡的 mini sketch 就是它跟别人最不同的那个点子。
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {TOOLS.map((t) => {
            const open = t.id === openId;
            return (
              <div
                key={t.id}
                className={[
                  "border-2 border-ink rounded-3xl transition-all duration-300 ease-spring overflow-hidden",
                  open ? "bg-white shadow-stamp-lg" : "bg-white shadow-stamp hover:shadow-stamp-lg",
                ].join(" ")}
              >
                {/* header */}
                <button
                  onClick={() => setOpenId(open ? null : t.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className="font-display text-[22px] font-bold text-ink flex-shrink-0 w-24"
                    >
                      {t.name}
                    </div>
                    <div
                      className="px-2.5 py-1 rounded-full border-2 border-ink font-mono text-[10.5px] font-bold tabular-nums text-white flex-shrink-0"
                      style={{ backgroundColor: t.badgeColor }}
                    >
                      {t.badge}
                    </div>
                    <p className="text-[14px] text-ink/70 truncate hidden md:block">
                      {t.tagline}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cream border-2 border-ink rounded-full">
                    {open ? (
                      <Minus className="w-4 h-4 text-ink" strokeWidth={2.5} />
                    ) : (
                      <Plus className="w-4 h-4 text-ink" strokeWidth={2.5} />
                    )}
                  </div>
                </button>

                {open && (
                  <div className="border-t-2 border-ink/15 grid lg:grid-cols-12 gap-6 p-5 lg:p-6 animate-enter-fade">
                    {/* 左：文字 */}
                    <div className="lg:col-span-7 space-y-4">
                      <p className="text-[14px] text-ink/75 md:hidden">{t.tagline}</p>

                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                          招牌技术
                        </div>
                        <p className="text-[14px] text-ink font-medium leading-relaxed">
                          {t.signature}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal mb-1.5">
                            长板
                          </div>
                          <ul className="space-y-1.5">
                            {t.pros.map((p, i) => (
                              <li
                                key={i}
                                className="text-[12.5px] text-ink/80 leading-relaxed pl-3 relative"
                              >
                                <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-teal rounded-full" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1.5">
                            短板
                          </div>
                          <ul className="space-y-1.5">
                            {t.cons.map((c, i) => (
                              <li
                                key={i}
                                className="text-[12.5px] text-ink/80 leading-relaxed pl-3 relative"
                              >
                                <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-coral rounded-full" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                          适合谁
                        </div>
                        <p className="text-[13.5px] text-ink/85 leading-relaxed">
                          {t.fit}
                        </p>
                      </div>

                      <div className="p-3 bg-ink rounded-xl border-2 border-ink overflow-x-auto">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-1.5">
                          一行起服务
                        </div>
                        <code className="font-mono text-[12px] text-cream whitespace-pre block">
                          $ {t.cli}
                        </code>
                      </div>

                      <p className="font-mono text-[10px] text-ink/40">
                        src · {t.source}
                      </p>
                    </div>

                    {/* 右：sketch */}
                    <div className="lg:col-span-5">
                      <div className="aspect-[4/3] bg-cream border-2 border-ink rounded-2xl p-4 flex items-center justify-center">
                        {t.sketch}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─────────── 5 个工具各自的 sketch（独有图） ─────────── */

/** SGLang RadixAttention · 共享前缀字典树 */
function SketchRadix() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full">
      <text x="140" y="14" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
        RadixAttention · 共享前缀 = 共享 KV
      </text>
      {/* 根节点 (system prompt) */}
      <g>
        <rect x="100" y="32" width="80" height="20" rx="6" fill="#241C15" stroke="#241C15" strokeWidth="1.6" />
        <text x="140" y="46" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#F4D35E">
          system: 你是助手
        </text>
      </g>
      {/* 分叉 */}
      <g stroke="#241C15" strokeWidth="1.6" fill="none">
        <path d="M 130 52 L 70 90" />
        <path d="M 150 52 L 210 90" />
      </g>
      {/* 两个分支 */}
      <g>
        <rect x="22" y="90" width="96" height="20" rx="6" fill="#FF4D74" stroke="#241C15" strokeWidth="1.6" />
        <text x="70" y="104" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#FBEFE3">
          user: 写首诗
        </text>
        <rect x="162" y="90" width="96" height="20" rx="6" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.6" />
        <text x="210" y="104" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#FBEFE3">
          user: 写代码
        </text>
      </g>
      {/* 叶子（assistant response） */}
      <g stroke="#241C15" strokeWidth="1.4" fill="none" opacity="0.5">
        <path d="M 50 110 L 30 140" strokeDasharray="2 2" />
        <path d="M 90 110 L 110 140" strokeDasharray="2 2" />
        <path d="M 190 110 L 170 140" strokeDasharray="2 2" />
        <path d="M 230 110 L 250 140" strokeDasharray="2 2" />
      </g>
      <g fill="#FBEFE3" stroke="#241C15" strokeWidth="1.2">
        <circle cx="30" cy="148" r="6" />
        <circle cx="110" cy="148" r="6" />
        <circle cx="170" cy="148" r="6" />
        <circle cx="250" cy="148" r="6" />
      </g>
      <text x="140" y="180" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
        public 节点 KV 复用 → 6.4× 多轮吞吐
      </text>
    </svg>
  );
}

/** vLLM PagedAttention · 内存按 16-tok 小块分配 */
function SketchPaged() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full">
      <text x="140" y="14" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
        PagedAttention · KV 切 16-tok 块
      </text>
      {/* 8x6 块网格，用 3 色表示 3 个请求 */}
      {(() => {
        const cells: React.ReactNode[] = [];
        const ROWS = 6, COLS = 8;
        const cw = 28, gap = 3;
        const xOff = 28;
        const yOff = 32;
        const fills = ["#FF4D74", "#1B4B5A", "#E5BD3A", "#FBEFE3"];
        const map = [
          0,0,0,0,1,1,1,1,
          0,0,0,2,2,2,2,3,
          0,0,3,3,3,3,3,3,
          1,1,1,1,1,1,3,3,
          2,2,2,3,3,3,3,3,
          3,3,3,3,3,3,3,3,
        ];
        for (let i = 0; i < ROWS * COLS; i++) {
          const r = Math.floor(i / COLS), c = i % COLS;
          const x = xOff + c * (cw + gap);
          const y = yOff + r * 16;
          const idx = map[i];
          cells.push(
            <rect
              key={i}
              x={x}
              y={y}
              width={cw}
              height={14}
              rx={2}
              fill={fills[idx]}
              opacity={idx === 3 ? 0.2 : 1}
              stroke="#241C15"
              strokeWidth={0.9}
              strokeOpacity={idx === 3 ? 0.3 : 0.7}
            />,
          );
        }
        return cells;
      })()}
      {/* 图例 */}
      <g fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15">
        <rect x="28" y="148" width="10" height="8" rx="1" fill="#FF4D74" stroke="#241C15" strokeWidth="0.8" />
        <text x="42" y="155">req-A</text>
        <rect x="78" y="148" width="10" height="8" rx="1" fill="#1B4B5A" stroke="#241C15" strokeWidth="0.8" />
        <text x="92" y="155">req-B</text>
        <rect x="128" y="148" width="10" height="8" rx="1" fill="#E5BD3A" stroke="#241C15" strokeWidth="0.8" />
        <text x="142" y="155">req-C</text>
        <rect x="178" y="148" width="10" height="8" rx="1" fill="#FBEFE3" stroke="#241C15" strokeWidth="0.8" />
        <text x="192" y="155">free</text>
      </g>
      <text x="140" y="180" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
        浪费率 60-80% → &lt;4%
      </text>
    </svg>
  );
}

/** Ollama · 一行命令的箱子 */
function SketchOllama() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full">
      <text x="140" y="14" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
        Ollama 0.22 · MLX 后端 +93% on Apple
      </text>
      {/* 终端窗口 */}
      <rect x="30" y="30" width="220" height="98" rx="8" fill="#241C15" stroke="#241C15" strokeWidth="2" />
      <g>
        <circle cx="44" cy="44" r="3.5" fill="#FF4D74" />
        <circle cx="56" cy="44" r="3.5" fill="#E5BD3A" />
        <circle cx="68" cy="44" r="3.5" fill="#1B4B5A" />
      </g>
      <text x="42" y="74" fontFamily="Geist Mono, monospace" fontSize="9.5" fill="#F4D35E">$ ollama run llama3.3:70b</text>
      <text x="42" y="92" fontFamily="Geist Mono, monospace" fontSize="9.5" fill="#FBEFE3" opacity="0.7">pulling manifest ... 43GB</text>
      <text x="42" y="108" fontFamily="Geist Mono, monospace" fontSize="9.5" fill="#FBEFE3" opacity="0.7">&gt;&gt;&gt; Send a message</text>
      <rect x="42" y="116" width="6" height="9" fill="#F4D35E" className="animate-pulse-dot" />
      <text x="140" y="150" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="14" fontWeight="800" fill="#241C15">
        12 tok/s
      </text>
      <text x="140" y="170" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
        Mac mini M4 Pro 48GB · 70B Q4
      </text>
      <text x="140" y="186" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
        单流 OK · 多并发就跪
      </text>
    </svg>
  );
}

/** llama.cpp · GGUF 文件示意 */
function SketchGGUF() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full">
      <text x="140" y="14" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
        GGUF · 单文件量化模型 · 多后端通吃
      </text>
      {/* 文件图标 */}
      <g transform="translate(106, 30)">
        <path
          d="M 0 0 L 50 0 L 68 18 L 68 80 L 0 80 Z"
          fill="#E5BD3A"
          stroke="#241C15"
          strokeWidth="2"
        />
        <path d="M 50 0 L 50 18 L 68 18" fill="none" stroke="#241C15" strokeWidth="2" />
        <text x="34" y="50" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="14" fontWeight="800" fill="#241C15">
          .gguf
        </text>
        <text x="34" y="68" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15">
          Q4_K_M
        </text>
      </g>
      {/* 4 个后端从下面接出来 */}
      <g stroke="#241C15" strokeWidth="1.6" fill="none">
        <path d="M 110 130 Q 90 145 60 160" />
        <path d="M 130 130 L 120 160" />
        <path d="M 160 130 L 170 160" />
        <path d="M 180 130 Q 200 145 230 160" />
      </g>
      {[
        { x: 42, label: "CPU" },
        { x: 102, label: "Metal" },
        { x: 158, label: "CUDA" },
        { x: 218, label: "Vulkan" },
      ].map((b) => (
        <g key={b.label} transform={`translate(${b.x}, 160)`}>
          <rect width="40" height="18" rx="4" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.6" />
          <text x="20" y="13" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#241C15">
            {b.label}
          </text>
        </g>
      ))}
      <text x="140" y="194" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
        Mac / x86 / 树莓派 / 安卓 · 都能跑
      </text>
    </svg>
  );
}

/** TGI · 进入维护模式的图示 */
function SketchTGI() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full">
      <text x="140" y="14" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
        TGI · HuggingFace 已建议迁移
      </text>
      {/* 时间线 */}
      <line x1="30" y1="100" x2="250" y2="100" stroke="#241C15" strokeWidth="2" strokeLinecap="round" />
      {[
        { x: 50, y: 100, label: "2022", note: "TGI v0.1" },
        { x: 120, y: 100, label: "2023-2024", note: "HF 标配" },
        { x: 190, y: 100, label: "2025", note: "vLLM 起飞" },
        { x: 240, y: 100, label: "2026", note: "维护模式" },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x}, ${p.y})`}>
          <circle r="6" fill={i === 3 ? "#88837C" : "#E5BD3A"} stroke="#241C15" strokeWidth="1.6" />
          <text y="-14" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="700" fill="#241C15">
            {p.label}
          </text>
          <text y="22" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="#88837C">
            {p.note}
          </text>
        </g>
      ))}
      {/* 箭头：从 TGI → vLLM */}
      <g transform="translate(150, 150)">
        <text x="0" y="0" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="13" fontWeight="800" fill="#241C15">
          官方建议 → vLLM
        </text>
        <text x="0" y="22" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#E07A5F">
          vLLM 在高并发吞吐高 24×
        </text>
      </g>
    </svg>
  );
}

export default SectionTools;
