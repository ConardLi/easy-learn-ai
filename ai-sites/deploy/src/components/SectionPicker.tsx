/**
 * Section 06 · 4 步问答 → 工具推荐
 *
 * 任务模拟器（L4）：让用户答 4 个问题，实时算出该用什么工具栈 + 一行启动命令 + 理由。
 *
 * 4 个问题：
 *  Q1 跑给谁    : 自己 / 团队 (5-50 人) / 公司 (100+ / 对外)
 *  Q2 硬件      : 纯 CPU / Mac M-series / 1-2 NVIDIA / 多卡 / 云租
 *  Q3 接口偏好  : 命令行 / GUI / OpenAI API
 *  Q4 工作负载  : 单轮聊天 / 多轮 RAG / 结构化输出 / 代码助手
 *
 * 推荐逻辑 = if-else 决策树 + 加权评分。
 */
import React, { useMemo, useState } from "react";
import { CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";

type Choice = { id: string; label: string; hint?: string };
type Question = {
  key: "audience" | "hardware" | "iface" | "workload";
  title: string;
  choices: Choice[];
};

const QUESTIONS: Question[] = [
  {
    key: "audience",
    title: "Q1 · 跑给谁用？",
    choices: [
      { id: "me", label: "就自己玩", hint: "1 个用户 · 离线也行" },
      { id: "team", label: "团队内 5–50 人", hint: "几十到几百 QPS" },
      { id: "company", label: "公司对外", hint: "1000+ QPS · 高 SLA" },
    ],
  },
  {
    key: "hardware",
    title: "Q2 · 手头硬件？",
    choices: [
      { id: "cpu", label: "纯 CPU 笔电", hint: "没独显 · 走 GGUF" },
      { id: "mac", label: "Mac M-series", hint: "M2/M3/M4 · 统一内存" },
      { id: "single", label: "1-2 张 NVIDIA", hint: "3060 → 4090 → H100" },
      { id: "multi", label: "多卡服务器", hint: "4-8 张 H100/H200" },
      { id: "cloud", label: "云租 GPU", hint: "Lambda · RunPod · AWS" },
    ],
  },
  {
    key: "iface",
    title: "Q3 · 怎么用？",
    choices: [
      { id: "cli", label: "命令行直接问", hint: "ollama run 那种" },
      { id: "gui", label: "图形界面", hint: "LM Studio / Open WebUI" },
      { id: "api", label: "OpenAI 兼容 API", hint: "代码里调 client" },
    ],
  },
  {
    key: "workload",
    title: "Q4 · 主要在做什么？",
    choices: [
      { id: "chat", label: "单轮聊天", hint: "客服 / Q&A" },
      { id: "rag", label: "多轮 / RAG", hint: "共享 system prompt" },
      { id: "struct", label: "结构化输出", hint: "JSON / function call" },
      { id: "code", label: "代码生成", hint: "长上下文 + 流式" },
    ],
  },
];

type Answers = {
  audience?: string;
  hardware?: string;
  iface?: string;
  workload?: string;
};

type Pick = {
  tool: string;
  badge: string;
  reasons: string[];
  cli: string;
  fallback?: string;
};

function recommend(a: Answers): Pick | null {
  if (!a.audience || !a.hardware || !a.iface || !a.workload) return null;

  /* 自己玩 */
  if (a.audience === "me") {
    if (a.hardware === "cpu") {
      return {
        tool: "llama.cpp",
        badge: "CPU · 单文件",
        reasons: [
          "纯 C++ 无 Python 依赖，老笔电也跑得起来",
          "GGUF 量化模型 4-bit 体积砍 4×",
          "llama-server 给你 OpenAI 兼容 API",
        ],
        cli: "llama-server -hf bartowski/Llama-3.1-8B-Instruct-GGUF -ngl 0",
      };
    }
    if (a.hardware === "mac") {
      if (a.iface === "gui") {
        return {
          tool: "LM Studio",
          badge: "Mac · GUI",
          reasons: [
            "图形模型浏览器 + 一键下载 GGUF",
            "内置 OpenAI 兼容服务在 :1234",
            "底层用 llama.cpp，支持 MLX 后端",
          ],
          cli: "下载 lmstudio.ai · 搜 llama-3.1-8b · 点 Load",
        };
      }
      return {
        tool: "Ollama 0.22",
        badge: "Mac · MLX 后端",
        reasons: [
          "v0.19 起换 MLX 后端，Apple Silicon 速度 +93%",
          "ollama run llama3.3:70b 一行起",
          "M4 Pro Mac mini 跑 70B Q4 @ 12-14 tok/s",
        ],
        cli: "ollama run llama3.3:70b-instruct-q4_K_M",
      };
    }
    if (a.iface === "gui") {
      return {
        tool: "LM Studio",
        badge: "NVIDIA · GUI",
        reasons: [
          "图形界面浏 GGUF 模型 + 一键 chat",
          "底层 llama.cpp · CUDA 后端自动启用",
          "暴露 OpenAI API 在 :1234",
        ],
        cli: "下载 lmstudio.ai · 选 CUDA · 加载模型",
      };
    }
    return {
      tool: "Ollama",
      badge: "NVIDIA · 单流",
      reasons: [
        "一行 ollama run 就拉模型起服务",
        "CUDA 自动启用",
        "单用户场景下 latency 比 vLLM 还低 18%",
      ],
      cli: "ollama run llama3.1:8b",
    };
  }

  /* 团队 / 公司 → 必上 vLLM 系工具 */
  const isCompany = a.audience === "company";

  /* 多轮 / RAG / 共享 prompt → SGLang */
  if (a.workload === "rag" || a.workload === "struct") {
    return {
      tool: "SGLang",
      badge: a.workload === "struct" ? "结构化 3-10×" : "RadixAttention",
      reasons:
        a.workload === "struct"
          ? [
              "xgrammar 编译 → 结构化输出比 vLLM 快 3-10×",
              "比 vLLM 总吞吐高 29%",
              "OpenAI 兼容 API · 切换无成本",
            ]
          : [
              "RadixAttention 把共享前缀 KV 自动复用",
              "多轮 / 长 system prompt 场景比 vLLM 快 6.4×",
              "xAI Grok 3 · MS Azure DeepSeek 都用它",
            ],
      cli: `python -m sglang.launch_server --model meta-llama/Llama-3.1-${
        isCompany ? "70B" : "8B"
      }-Instruct --tp ${a.hardware === "multi" ? 4 : 1}`,
      fallback: "降级方案：vLLM v1 + chunked prefill",
    };
  }

  /* 代码 / 长上下文 / 大吞吐 → vLLM */
  return {
    tool: "vLLM v1",
    badge: a.hardware === "multi" ? "多卡 TP" : "单卡王",
    reasons: [
      "PagedAttention 把 KV 浪费砍到 <4%",
      "硬件支持最广 · NVIDIA / AMD / TPU 都行",
      "OpenAI 兼容 API · LoRA 热插拔 · 推测解码全套",
      isCompany ? "K8s + 监控生态成熟 · 适合生产 SLA" : "文档最厚 · 拉新人最容易",
    ],
    cli: `vllm serve meta-llama/Llama-3.1-${
      isCompany ? "70B" : "8B"
    }-Instruct --tensor-parallel-size ${a.hardware === "multi" ? 4 : 1}`,
    fallback: "如果要更高吞吐：SGLang · 如果要极致 NVIDIA 闭环：TensorRT-LLM",
  };
}

const SectionPicker: React.FC = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  const pick = useMemo(() => recommend(answers), [answers]);
  const done = Object.keys(answers).length === 4;
  const cur = QUESTIONS[step];

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const choose = (id: string) => {
    const next = { ...answers, [cur.key]: id };
    setAnswers(next);
    if (step < 3) setStep(step + 1);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">scenario picker</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
          <h2 className="lg:col-span-7 font-display text-display-lg text-ink leading-tight">
            把你的情况答一遍。
            <br />
            <span className="relative inline-block">
              <span className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0" aria-hidden />
              <span className="relative z-10">推荐工具 + 一行命令 · 给到你手里。</span>
            </span>
          </h2>
          <div className="lg:col-span-5 self-end">
            <p className="text-[15px] text-ink/70 leading-relaxed">
              没有「最好的工具」。换个场景就换个推荐。
              下面按用的人数、手头硬件、想怎么调用、主要干什么活，四件事定工具。
            </p>
            <p className="mt-2 text-[13px] text-ink/55 leading-relaxed">
              下面会看到 <strong className="text-ink/75">SLA</strong>：对外承诺的稳定标准，比如保证 99.9% 时间能用、多久内响应。
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* 左：进度 + 当前题 */}
          <div className="lg:col-span-7">
            {/* 进度 stepper */}
            <div className="flex items-center gap-2 mb-5">
              {QUESTIONS.map((q, i) => {
                const answered = !!answers[q.key];
                const current = i === step;
                return (
                  <React.Fragment key={q.key}>
                    <button
                      onClick={() => setStep(i)}
                      className={[
                        "w-9 h-9 rounded-full border-2 border-ink font-mono text-[11px] font-bold flex items-center justify-center transition-all",
                        answered
                          ? "bg-teal text-white"
                          : current
                            ? "bg-butter text-ink shadow-stamp"
                            : "bg-white text-ink/55",
                      ].join(" ")}
                    >
                      {answered ? <CheckCircle2 className="w-4 h-4" strokeWidth={2.4} /> : i + 1}
                    </button>
                    {i < QUESTIONS.length - 1 && (
                      <div className="flex-1 h-0.5 bg-ink/20" />
                    )}
                  </React.Fragment>
                );
              })}
              {done && (
                <button
                  onClick={reset}
                  className="ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[10.5px] font-bold uppercase tracking-wider hover:bg-cream"
                >
                  <RotateCcw className="w-3 h-3" strokeWidth={2.4} />
                  重答
                </button>
              )}
            </div>

            {/* 当前题 */}
            <div
              key={cur.key}
              className="card-stamp p-6 animate-enter-up"
            >
              <h3 className="font-display text-[24px] font-bold text-ink mb-5 leading-tight">
                {cur.title}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {cur.choices.map((c) => {
                  const on = answers[cur.key] === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => choose(c.id)}
                      className={[
                        "p-4 text-left border-2 border-ink rounded-2xl transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[6px_6px_0_0_#FF4D74]"
                          : "bg-white hover:bg-butter-tint hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-stamp",
                      ].join(" ")}
                    >
                      <div className="font-display text-[16px] font-bold leading-tight mb-1">
                        {c.label}
                      </div>
                      {c.hint && (
                        <div className={["font-mono text-[10.5px]", on ? "opacity-75" : "text-ink/55"].join(" ")}>
                          {c.hint}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {step < 3 && answers[cur.key] && (
                <button
                  onClick={() => setStep(step + 1)}
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-butter text-ink border-2 border-ink rounded-full font-mono text-[11px] font-bold uppercase tracking-wider shadow-stamp hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-stamp-lg transition-all"
                >
                  下一题 <ArrowRight className="w-3 h-3" strokeWidth={2.4} />
                </button>
              )}
            </div>
          </div>

          {/* 右：推荐 */}
          <div className="lg:col-span-5">
            <div className="sticky top-6">
              {!pick && (
                <div className="p-6 bg-white border-2 border-dashed border-ink/30 rounded-3xl text-center">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45 mb-3">
                    推荐结果
                  </div>
                  <p className="text-[14px] text-ink/55">
                    答完 4 题 · 这里出一行命令
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] text-ink/45">
                    {QUESTIONS.map((q, i) => (
                      <span
                        key={q.key}
                        className={answers[q.key] ? "text-teal" : ""}
                      >
                        Q{i + 1}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {pick && (
                <div className="p-6 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-xl animate-enter-pop">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-butter">
                      推荐工具
                    </span>
                    <span className="px-2.5 py-1 bg-coral rounded-full border-2 border-cream font-mono text-[10px] font-bold uppercase tracking-wider">
                      {pick.badge}
                    </span>
                  </div>

                  <div className="font-display text-[36px] font-bold mb-4 leading-none">
                    {pick.tool}
                  </div>

                  <ul className="space-y-2 mb-5">
                    {pick.reasons.map((r, i) => (
                      <li key={i} className="text-[13.5px] text-cream/85 leading-relaxed pl-4 relative">
                        <span className="absolute left-0 top-1.5 w-2 h-2 bg-butter rounded-full" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 bg-black/40 rounded-xl border border-cream/15">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-1.5">
                      一行起服务
                    </div>
                    <code className="font-mono text-[12px] text-cream block whitespace-pre-wrap break-all">
                      {pick.cli}
                    </code>
                  </div>

                  {pick.fallback && (
                    <p className="mt-4 font-mono text-[10.5px] text-cream/55 leading-relaxed">
                      {pick.fallback}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 p-5 border-2 border-ink rounded-2xl bg-butter">
          <p className="font-mono text-[12px] text-ink leading-relaxed">
            <span className="font-bold uppercase tracking-wider">硬规则 · </span>
            个人玩用 Ollama / LM Studio · 上线给团队就上 vLLM · 多轮共享 prompt 切 SGLang ·
            纯 CPU / Mac 极客走 llama.cpp · 别给单流引擎压 1000 并发。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionPicker;
