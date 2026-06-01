/**
 * Section 03 · 三种把外面塞进 LLM 的办法
 *
 * 三种融合做法（contrastive / late fusion / early fusion）。
 * 主交互：3 个架构 tab 切换 + 每个架构 3 个 step 走一遍训练/推理过程，
 *        高亮 SVG 不同部分。
 *
 * 跟 mcp 双 slider / agent state machine / nlp tokenizer 三栏对比都不一样：
 * 这里是「架构家族图 + step trace 解剖」。
 */
import React, { useState } from "react";

type Step = { title: string; detail: string; highlight: string[] };

type Approach = {
  id: string;
  name: string;
  yearStart: string;
  tagline: string;
  models: string[];
  pros: string;
  cons: string;
  steps: Step[];
  /** 渲染 SVG 架构图，传入当前高亮节点 id 集合 */
  render: (active: Set<string>) => React.ReactNode;
  source: string;
};

const APPROACHES: Approach[] = [
  /* ─── 1 · CLIP 双塔对比 ─── */
  {
    id: "clip",
    name: "双塔对比 · CLIP",
    yearStart: "2021",
    tagline: "图和字各走各的编码器，最后算两边向量有多像（夹角越小越匹配）。",
    models: ["CLIP", "SigLIP", "MetaCLIP", "EVA-CLIP"],
    pros: "训完即用，零样本分类。所有现代 VLM 的图像 encoder 都从这一脉来。",
    cons: "只会判「图文是否匹配」，不会生成、不会回答。",
    steps: [
      {
        title: "1. 一对图文塞进两个塔",
        detail: "ViT 给图编码、Text Transformer 给字编码。两边权重独立。",
        highlight: ["img-enc", "txt-enc"],
      },
      {
        title: "2. 两边都吐出一个向量",
        detail: "ViT 输出 [CLS] 向量；文本输出 [EOS] 向量。两个向量同维度。",
        highlight: ["img-vec", "txt-vec"],
      },
      {
        title: "3. 算 cosine，拉近匹配、推远不匹配",
        detail: "batch 里所有图文对：对的拉近，错的推远（contrastive loss）。",
        highlight: ["dot", "loss"],
      },
    ],
    source: "CLIP arXiv:2103.00020 · OpenAI 2021",
    render: (a) => {
      const on = (k: string) => a.has(k);
      return (
        <g>
          {/* 输入 */}
          <g>
            <rect x="20" y="40" width="80" height="36" rx="8" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.8" />
            <text x="60" y="63" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="700" fill="#FBEFE3">
              一张狗的图
            </text>
          </g>
          <g>
            <rect x="20" y="184" width="80" height="36" rx="8" fill="#F4D35E" stroke="#241C15" strokeWidth="1.8" />
            <text x="60" y="207" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="700" fill="#241C15">
              "a dog"
            </text>
          </g>

          {/* encoders */}
          <g
            className="transition-all duration-300"
            style={{ filter: on("img-enc") ? "drop-shadow(3px 3px 0 #E07A5F)" : "none" }}
          >
            <rect x="135" y="32" width="110" height="52" rx="10" fill={on("img-enc") ? "#241C15" : "#FBEFE3"} stroke="#241C15" strokeWidth="2" />
            <text x="190" y="55" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="13" fontWeight="800" fill={on("img-enc") ? "#FBEFE3" : "#241C15"}>
              ViT
            </text>
            <text x="190" y="72" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill={on("img-enc") ? "#FBEFE3" : "#241C15"} opacity="0.7">
              image encoder
            </text>
          </g>
          <g
            className="transition-all duration-300"
            style={{ filter: on("txt-enc") ? "drop-shadow(3px 3px 0 #E07A5F)" : "none" }}
          >
            <rect x="135" y="176" width="110" height="52" rx="10" fill={on("txt-enc") ? "#241C15" : "#FBEFE3"} stroke="#241C15" strokeWidth="2" />
            <text x="190" y="199" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="13" fontWeight="800" fill={on("txt-enc") ? "#FBEFE3" : "#241C15"}>
              Text Transformer
            </text>
            <text x="190" y="216" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill={on("txt-enc") ? "#FBEFE3" : "#241C15"} opacity="0.7">
              text encoder
            </text>
          </g>

          {/* vectors */}
          <g className="transition-all duration-300">
            <rect x="280" y="38" width="76" height="40" rx="20" fill={on("img-vec") ? "#E07A5F" : "#FBEFE3"} stroke="#241C15" strokeWidth="2" />
            <text x="318" y="56" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill={on("img-vec") ? "#FBEFE3" : "#241C15"}>
              v_img
            </text>
            <text x="318" y="69" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill={on("img-vec") ? "#FBEFE3" : "#241C15"} opacity="0.7">
              512-d
            </text>
          </g>
          <g className="transition-all duration-300">
            <rect x="280" y="182" width="76" height="40" rx="20" fill={on("txt-vec") ? "#E07A5F" : "#FBEFE3"} stroke="#241C15" strokeWidth="2" />
            <text x="318" y="200" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill={on("txt-vec") ? "#FBEFE3" : "#241C15"}>
              v_txt
            </text>
            <text x="318" y="213" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill={on("txt-vec") ? "#FBEFE3" : "#241C15"} opacity="0.7">
              512-d
            </text>
          </g>

          {/* shared space */}
          <g className="transition-all duration-300">
            <circle cx="430" cy="130" r="56" fill={on("dot") ? "#FBE891" : "#FBEFE3"} stroke="#241C15" strokeWidth="2" />
            <text x="430" y="118" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="13" fontWeight="800" fill="#241C15">
              共享空间
            </text>
            <text x="430" y="134" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15" opacity="0.7">
              cos(v_img, v_txt)
            </text>
            <text x="430" y="151" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill={on("loss") ? "#E07A5F" : "#241C15"}>
              {on("loss") ? "= 0.92 ✓" : "= ?"}
            </text>
          </g>

          {/* arrows */}
          <g stroke="#241C15" strokeWidth="1.6" fill="none">
            <path d="M 100 58 L 130 58" markerEnd="url(#arr-clip)" />
            <path d="M 245 58 L 275 58" markerEnd="url(#arr-clip)" />
            <path d="M 100 202 L 130 202" markerEnd="url(#arr-clip)" />
            <path d="M 245 202 L 275 202" markerEnd="url(#arr-clip)" />
            <path d="M 356 58 Q 400 58 408 100" markerEnd="url(#arr-clip)" />
            <path d="M 356 202 Q 400 202 408 160" markerEnd="url(#arr-clip)" />
          </g>
          <defs>
            <marker id="arr-clip" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#241C15" />
            </marker>
          </defs>
        </g>
      );
    },
  },

  /* ─── 2 · 后融合 ─── */
  {
    id: "late",
    name: "后融合 · LLaVA",
    yearStart: "2023",
    tagline: "视觉先编成 token，再用一小层网络翻译成 LLM 能读的向量，拼进对话里。",
    models: ["LLaVA-1.5", "BLIP-2", "MiniGPT-4", "Qwen2-VL", "InternVL"],
    pros: "复用现成 CLIP 视觉 + 现成 LLM，只训中间那一层 projector，便宜。商用看图问答（含 ChatGPT 传图）多数走这条：冻住的视觉 encoder + 一小层翻译网络 + 文字 LLM。",
    cons: "视觉部分是冻住的，模型其实没真的「看懂」图，只是被那层翻译网络告诉了图里有啥。",
    steps: [
      {
        title: "1. 图先过 CLIP ViT（冻住）",
        detail: "一张 336×336 图被切成 576 个 patch token。视觉权重不动。",
        highlight: ["img-in", "vit"],
      },
      {
        title: "2. Projector 把视觉 token 翻译成 LLM 能读的向量",
        detail: "就一个 2 层 MLP，把 CLIP 输出维度对齐到 LLM 词表维度。",
        highlight: ["proj"],
      },
      {
        title: "3. 视觉 token + 文字 token 拼一起喂 LLM",
        detail: "LLM 把它们当一串普通 token，自回归生成回答。",
        highlight: ["llm", "out"],
      },
    ],
    source: "LLaVA-1.5 arXiv:2310.03744 · 训练数据 558K + 665K instruction",
    render: (a) => {
      const on = (k: string) => a.has(k);
      return (
        <g>
          {/* image input */}
          <g className="transition-all duration-300">
            <rect x="20" y="38" width="80" height="36" rx="8" fill={on("img-in") ? "#1B4B5A" : "#FBEFE3"} stroke="#241C15" strokeWidth="1.8" />
            <text x="60" y="61" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="700" fill={on("img-in") ? "#FBEFE3" : "#241C15"}>
              图 336²
            </text>
          </g>
          {/* text prompt */}
          <g>
            <rect x="20" y="172" width="80" height="36" rx="8" fill="#F4D35E" stroke="#241C15" strokeWidth="1.8" />
            <text x="60" y="195" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#241C15">
              "里面是啥?"
            </text>
          </g>

          {/* ViT (frozen) */}
          <g className="transition-all duration-300">
            <rect x="125" y="30" width="100" height="52" rx="10" fill={on("vit") ? "#241C15" : "#FBEFE3"} stroke="#241C15" strokeWidth="2" strokeDasharray={on("vit") ? "0" : "4 3"} />
            <text x="175" y="51" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="12" fontWeight="800" fill={on("vit") ? "#FBEFE3" : "#241C15"}>
              CLIP ViT
            </text>
            <text x="175" y="67" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill={on("vit") ? "#FBEFE3" : "#241C15"} opacity="0.7">
              🔒 frozen · 576 token
            </text>
          </g>

          {/* projector */}
          <g className="transition-all duration-300" style={{ filter: on("proj") ? "drop-shadow(3px 3px 0 #FF4D74)" : "none" }}>
            <rect x="252" y="36" width="80" height="40" rx="20" fill={on("proj") ? "#FF4D74" : "#FBEFE3"} stroke="#241C15" strokeWidth="2" />
            <text x="292" y="54" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="11" fontWeight="800" fill={on("proj") ? "#FBEFE3" : "#241C15"}>
              Projector
            </text>
            <text x="292" y="68" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill={on("proj") ? "#FBEFE3" : "#241C15"} opacity="0.7">
              2-层 MLP
            </text>
          </g>

          {/* LLM */}
          <g className="transition-all duration-300">
            <rect x="360" y="80" width="130" height="100" rx="14" fill={on("llm") ? "#241C15" : "#FBEFE3"} stroke="#241C15" strokeWidth="2.4" />
            <text x="425" y="118" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="16" fontWeight="800" fill={on("llm") ? "#F4D35E" : "#241C15"}>
              LLaMA
            </text>
            <text x="425" y="138" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill={on("llm") ? "#FBEFE3" : "#241C15"} opacity="0.75">
              7B / 13B / 70B
            </text>
            <text x="425" y="156" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill={on("llm") ? "#FBE891" : "#88837C"}>
              {on("llm") ? "joint train ✓" : "(visual + text token in)"}
            </text>
          </g>

          {/* output */}
          <g className="transition-all duration-300">
            <rect x="382" y="200" width="86" height="32" rx="8" fill={on("out") ? "#F4D35E" : "#FBEFE3"} stroke="#241C15" strokeWidth="1.8" />
            <text x="425" y="221" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#241C15">
              "一只金毛"
            </text>
          </g>

          {/* arrows */}
          <g stroke="#241C15" strokeWidth="1.6" fill="none">
            <path d="M 100 56 L 122 56" markerEnd="url(#arr-late)" />
            <path d="M 225 56 L 250 56" markerEnd="url(#arr-late)" />
            <path d="M 332 60 Q 360 60 360 120" markerEnd="url(#arr-late)" />
            <path d="M 100 190 L 360 150" markerEnd="url(#arr-late)" />
            <path d="M 425 180 L 425 198" markerEnd="url(#arr-late)" />
          </g>
          <defs>
            <marker id="arr-late" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#241C15" />
            </marker>
          </defs>
        </g>
      );
    },
  },

  /* ─── 3 · 早融合 / 原生 ─── */
  {
    id: "early",
    name: "原生多模态 · GPT-4o / Gemini",
    yearStart: "2024-2026",
    tagline: "一开始就把所有模态当 token 烧进同一个模型。",
    models: ["Chameleon 34B", "GPT-4o", "Gemini 2.5 Pro", "Llama 4", "Qwen3-VL MoE"],
    pros: "跨模态推理无缝（看图听声音同时来）。能反向生成图、声音。",
    cons: "训起来贵（4.4T 多模态 token / 5M GPU 小时 · Chameleon）。优化不稳。",
    steps: [
      {
        title: "1. 一个 tokenizer 啥都吃",
        detail: "图被 VQ-GAN 编码到 8192 个 codebook ID，跟字 BPE 共享同一个 65K 词表。",
        highlight: ["img-in", "txt-in", "aud-in", "tokenizer"],
      },
      {
        title: "2. 所有 token 拌在一起串起来",
        detail: "interleaved 序列：「字 字 字 [IMG patch×196] 字 字 [AUD frame×30] ...」全在同一个时间轴。",
        highlight: ["seq"],
      },
      {
        title: "3. 一个 transformer 从头训",
        detail: "next-token 预测，下一个 token 可能是字、可能是图块、可能是声音帧。原生 any-to-any。",
        highlight: ["model", "out"],
      },
    ],
    source: "Chameleon arXiv:2405.09818 · GPT-4o System Card 2024-08 · Gemini 2.5 Pro 2025",
    render: (a) => {
      const on = (k: string) => a.has(k);
      return (
        <g>
          {/* 3 个输入 */}
          <g className="transition-all duration-300">
            <rect x="18" y="22" width="70" height="32" rx="7" fill={on("img-in") ? "#1B4B5A" : "#FBEFE3"} stroke="#241C15" strokeWidth="1.6" />
            <text x="53" y="42" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill={on("img-in") ? "#FBEFE3" : "#241C15"}>
              图
            </text>
          </g>
          <g className="transition-all duration-300">
            <rect x="18" y="114" width="70" height="32" rx="7" fill={on("txt-in") ? "#F4D35E" : "#FBEFE3"} stroke="#241C15" strokeWidth="1.6" />
            <text x="53" y="134" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#241C15">
              字
            </text>
          </g>
          <g className="transition-all duration-300">
            <rect x="18" y="206" width="70" height="32" rx="7" fill={on("aud-in") ? "#FF4D74" : "#FBEFE3"} stroke="#241C15" strokeWidth="1.6" />
            <text x="53" y="226" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill={on("aud-in") ? "#FBEFE3" : "#241C15"}>
              声 / 视频
            </text>
          </g>

          {/* unified tokenizer */}
          <g className="transition-all duration-300" style={{ filter: on("tokenizer") ? "drop-shadow(3px 3px 0 #E07A5F)" : "none" }}>
            <rect x="120" y="92" width="120" height="80" rx="14" fill={on("tokenizer") ? "#241C15" : "#FBEFE3"} stroke="#241C15" strokeWidth="2" />
            <text x="180" y="124" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="13" fontWeight="800" fill={on("tokenizer") ? "#F4D35E" : "#241C15"}>
              统一 tokenizer
            </text>
            <text x="180" y="142" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill={on("tokenizer") ? "#FBEFE3" : "#241C15"} opacity="0.7">
              VQ-GAN + BPE
            </text>
            <text x="180" y="156" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill={on("tokenizer") ? "#FBE891" : "#88837C"}>
              65K 词表共享
            </text>
          </g>

          {/* interleaved sequence */}
          <g className="transition-all duration-300">
            <text x="320" y="34" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C" letterSpacing="0.5">
              interleaved 序列
            </text>
            {[
              { x: 268, c: "#F4D35E" }, // 字
              { x: 286, c: "#F4D35E" },
              { x: 304, c: "#1B4B5A" }, // 图
              { x: 322, c: "#1B4B5A" },
              { x: 340, c: "#1B4B5A" },
              { x: 358, c: "#F4D35E" }, // 字
              { x: 376, c: "#FF4D74" }, // 声
              { x: 394, c: "#FF4D74" },
            ].map((t, i) => (
              <rect
                key={i}
                x={t.x}
                y="44"
                width="14"
                height="20"
                rx="3"
                fill={on("seq") ? t.c : "#FBEFE3"}
                stroke="#241C15"
                strokeWidth="1.2"
                className="transition-all duration-300"
                style={{ transitionDelay: on("seq") ? `${i * 50}ms` : "0ms" }}
              />
            ))}
          </g>

          {/* transformer */}
          <g className="transition-all duration-300">
            <rect x="260" y="80" width="160" height="100" rx="14" fill={on("model") ? "#241C15" : "#FBEFE3"} stroke="#241C15" strokeWidth="2.4" />
            <text x="340" y="118" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="15" fontWeight="800" fill={on("model") ? "#F4D35E" : "#241C15"}>
              Transformer
            </text>
            <text x="340" y="138" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill={on("model") ? "#FBEFE3" : "#241C15"} opacity="0.75">
              从头联合训练
            </text>
            <text x="340" y="156" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill={on("model") ? "#FBE891" : "#88837C"}>
              next-token = 字 / 图块 / 声音
            </text>
          </g>

          {/* output */}
          <g className="transition-all duration-300">
            <rect x="290" y="200" width="100" height="32" rx="8" fill={on("out") ? "#F4D35E" : "#FBEFE3"} stroke="#241C15" strokeWidth="1.8" />
            <text x="340" y="221" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#241C15">
              字 / 图 / 声
            </text>
          </g>

          {/* arrows */}
          <g stroke="#241C15" strokeWidth="1.6" fill="none">
            <path d="M 88 38 Q 110 38 118 100" markerEnd="url(#arr-early)" />
            <path d="M 88 130 L 118 130" markerEnd="url(#arr-early)" />
            <path d="M 88 222 Q 110 222 118 160" markerEnd="url(#arr-early)" />
            <path d="M 240 130 L 258 130" markerEnd="url(#arr-early)" />
            <path d="M 340 178 L 340 198" markerEnd="url(#arr-early)" />
          </g>
          <defs>
            <marker id="arr-early" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#241C15" />
            </marker>
          </defs>
        </g>
      );
    },
  },
];

const SectionFusion: React.FC = () => {
  const [active, setActive] = useState("clip");
  const [step, setStep] = useState(0);

  const approach = APPROACHES.find((a) => a.id === active) ?? APPROACHES[0];
  const highlightSet = new Set(approach.steps[step].highlight);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-butter-tint border-y-2 border-ink/15">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">fusion family</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-8">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-ink mb-5">
              三种把世界塞
              <br />
              进 LLM 的办法
            </h2>
            <div className="space-y-3 text-[15px] text-ink/75 leading-relaxed max-w-md">
              <p>
                既然图能切成 token，那图和字怎么"对上"？过去五年大致有三种接法。
              </p>
              <p>
                最早 CLIP 让图和字各练各的，最后算两边向量有多像（夹角越小越匹配）。后来 LLaVA 改成：视觉先编成 token，再用一小层网络翻译成 LLM 能读的向量，拼进对话里 —— <strong className="text-ink">商用看图问答（含 ChatGPT 网页传图）大多走这条「后融合」</strong>。
              </p>
              <p>
                到 GPT-4o 这一代，干脆从一开始就所有模态混着训 —— 也就是「原生多模态」；不过产品里的看图聊天，很多仍是上面那条后融合。
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            {/* tab 切换 */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {APPROACHES.map((a) => {
                const on = a.id === active;
                return (
                  <button
                    key={a.id}
                    onClick={() => {
                      setActive(a.id);
                      setStep(0);
                    }}
                    className={[
                      "px-3 py-2.5 rounded-xl border-2 border-ink text-left transition-all duration-250 ease-spring",
                      on ? "bg-ink text-cream shadow-stamp" : "bg-white text-ink hover:bg-butter-tint",
                    ].join(" ")}
                  >
                    <div className={["font-display text-[14px] font-bold leading-tight", on ? "text-cream" : "text-ink"].join(" ")}>
                      {a.name}
                    </div>
                    <div className={["font-mono text-[10px] mt-0.5", on ? "text-butter" : "text-ink/55"].join(" ")}>
                      {a.yearStart}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 架构图 SVG */}
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-4 lg:p-5">
              <div
                key={approach.id}
                className="relative w-full overflow-x-auto"
              >
                <svg
                  viewBox="0 0 520 260"
                  className="w-full h-auto"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {approach.render(highlightSet)}
                </svg>
              </div>

              {/* step 控制 */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {approach.steps.map((s, i) => {
                  const on = i === step;
                  return (
                    <button
                      key={i}
                      onClick={() => setStep(i)}
                      className={[
                        "px-3 py-2 rounded-lg border-2 border-ink text-left transition-all duration-250 ease-spring",
                        on ? "bg-coral text-cream shadow-[3px_3px_0_0_#241C15]" : "bg-cream text-ink hover:bg-butter-tint",
                      ].join(" ")}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.15em] mb-0.5 opacity-80">
                        step {i + 1}
                      </div>
                      <div className="font-display text-[12px] font-bold leading-tight">
                        {s.title}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p
                key={`detail-${approach.id}-${step}`}
                className="mt-3 px-2 font-sans text-[13px] text-ink/75 leading-relaxed animate-enter-fade"
              >
                {approach.steps[step].detail}
              </p>
            </div>
          </div>
        </div>

        {/* 当前流派事实卡 */}
        <div
          key={`fact-${approach.id}`}
          className="grid lg:grid-cols-3 gap-4 animate-enter-fade"
        >
          <div className="card-stamp p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
              代表选手
            </div>
            <div className="flex flex-wrap gap-1.5">
              {approach.models.map((m) => (
                <span
                  key={m}
                  className="px-2 py-0.5 bg-cream border-2 border-ink rounded-full font-mono text-[11px] font-semibold"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className="card-stamp p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal mb-2">
              它好在哪
            </div>
            <p className="text-[13.5px] text-ink leading-relaxed">{approach.pros}</p>
          </div>
          <div className="card-stamp p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral mb-2">
              它的坑在哪
            </div>
            <p className="text-[13.5px] text-ink leading-relaxed">{approach.cons}</p>
          </div>
        </div>

        <p className="mt-5 font-mono text-[10px] text-ink/45">
          来源：{approach.source}
        </p>
      </div>
    </section>
  );
};

export default SectionFusion;
