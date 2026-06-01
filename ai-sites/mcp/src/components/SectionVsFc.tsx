/**
 * Section 07 · Dark closing · MCP 跟 function calling 不在一层
 *
 * 反模板：
 *   ─ 区别于 fc 站尾 dark section「下一步 = MCP」—— 这里 dark section 反过来从 MCP 视角解释 fc
 *   ─ 区别于 quantization 站「展望 1-bit 未来」—— 我们这里是「协议分层 + 对手协议横向比」
 *   ─ Section 06 用 chip filter + 卡片展开，本节用 layered click + chip 切对手 —— 范式不同
 *
 * 交互（L2 点击分层 + L2 chip 切对手）：
 *   ① 点 stack 图的「FC 层」或「MCP 层」高亮 + 显示该层职责
 *   ② 底部 chip 切换 4 个对手协议，看 MCP 跟它的位置关系
 *
 * 数据：portkey.ai 2026 / atlan.com / utcp.io / WorkOS 2026
 */
import React, { useState } from "react";
import { ArrowDownToLine } from "lucide-react";

type Layer = "fc" | "mcp";

const LAYERS: Record<
  Layer,
  {
    label: string;
    sub: string;
    where: string;
    job: string;
    body: string;
    sample: string[];
  }
> = {
  fc: {
    label: "Function Calling",
    sub: "model ⟷ host",
    where: "藏在 host 进程里。OpenAI / Anthropic / Gemini 各家 API 自带的 tool_calls 字段。",
    job: "让模型在回答里夹一段「我要调用 X(args)」的结构化输出。",
    body: "Host 拿到这段结构化输出，决定要不要执行、传给谁执行。FC 本身只解决「模型说意图」这件事，不管谁去做。",
    sample: [
      "OpenAI tool_calls 数组",
      "Anthropic tool_use content block",
      "Gemini functionCall",
    ],
  },
  mcp: {
    label: "Model Context Protocol",
    sub: "host ⟷ server",
    where: "Host 进程 ↔ 一个 server 进程。JSON-RPC 2.0 over stdio 或 HTTP。",
    job: "标准化「host 怎么发现工具、怎么调用、怎么拿结果、怎么订阅变化」。",
    body: "Host 收到模型 FC 输出后，把它翻译成 tools/call JSON-RPC，发给对应 server。换厂商、换模型，这一层不动。",
    sample: [
      "tools/list · tools/call",
      "resources/list · resources/read",
      "prompts/get · sampling/createMessage",
    ],
  },
};

type Rival = {
  id: string;
  label: string;
  status: string;
  statusTone: "killed" | "co" | "rival";
  one: string;
  body: string;
  pos: string;
};

const RIVALS: Rival[] = [
  {
    id: "fc",
    label: "Function Calling",
    status: "互补",
    statusTone: "co",
    one: "不同层。FC 让模型说要做什么，MCP 让 host 把它真的做出来。",
    body: "可以这么分：FC 管模型怎么开口要工具；MCP 管程序怎么连上工具、把调用送过去、把结果拿回来。两个都要用 —— host 内部用某家 FC，要接外部工具就走 MCP。",
    pos: "接在 FC 后面 —— 模型吐了调用，MCP 把它送到工具",
  },
  {
    id: "plugins",
    label: "ChatGPT Plugins",
    status: "已淘汰",
    statusTone: "killed",
    one: "OpenAI 2023 的旧路线，靠 OpenAPI manifest，单 vendor 锁死。",
    body: "Plugins 在 2024 年中悄悄停掉。OpenAI 2025-03 转头宣布全面接入 MCP，Plugins 时代正式翻篇。",
    pos: "被 MCP 取代",
  },
  {
    id: "utcp",
    label: "UTCP",
    status: "竞品",
    statusTone: "rival",
    one: "Universal Tool Calling Protocol · 2025 末出现，主张「不要 wrapper，直接读 API manual」。",
    body: "UTCP 描述一个 manual 让 agent 拿现有 OpenAPI/HTTP/gRPC 端点直接调，没有中间 server。MCP 的代价是「多跑一个进程」，UTCP 的代价是「客户端要会说更多协议」。两边各有支持。",
    pos: "并行替代",
  },
  {
    id: "a2a",
    label: "Agent2Agent",
    status: "邻居",
    statusTone: "co",
    one: "Google 2025 推的协议，让 agent 跟 agent 之间互相调度。MCP 管 agent ↔ 工具。",
    body: "A2A 和 MCP 解的不是同一个问题。A2A 是 agent 间委托任务，MCP 是 agent 拿外部能力。多 agent 系统两个都要用 —— A2A 在 agent 之间，MCP 在 agent 跟它能用的工具之间。",
    pos: "正交层",
  },
];

const STATUS_BG: Record<Rival["statusTone"], string> = {
  killed: "bg-ink text-cream border-cream/30",
  co: "bg-butter text-ink",
  rival: "bg-coral text-white",
};

const SectionVsFc: React.FC = () => {
  const [layer, setLayer] = useState<Layer>("mcp");
  const [rid, setRid] = useState(RIVALS[0].id);
  const rival = RIVALS.find((r) => r.id === rid)!;
  const l = LAYERS[layer];

  return (
    <section className="relative bg-ink text-cream px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      {/* 浮动小装饰 */}
      <div
        aria-hidden
        className="absolute top-16 right-[8%] hidden lg:block animate-float-y"
      >
        <div className="w-12 h-12 bg-butter border-2 border-cream rounded-2xl shadow-stamp -rotate-6" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-28 left-[6%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-10 h-10 bg-coral border-2 border-cream rounded-full shadow-stamp" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="section-anchor">
          <span className="section-anchor-num text-butter">07</span>
          <span className="section-anchor-label text-cream/55">
            mcp ≠ fc · 协议堆栈 + 4 个对手
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-start">
          {/* 左：定调 */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg leading-tight mb-6 max-w-3xl">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-butter -z-0 -rotate-1"
                  aria-hidden
                />
                <span className="relative z-10 text-ink">「MCP vs FC」</span>
              </span>
              <br />
              是个错命题。
            </h2>
            <p className="max-w-md text-cream/75 text-[15px] mb-3 leading-relaxed">
              它俩不在一层。FC 是模型告诉 host 「我要调用 create_issue」 ——
              这是<strong className="text-cream">模型与 host 之间</strong>的事。
            </p>
            <p className="max-w-md text-cream/75 text-[15px] mb-3 leading-relaxed">
              MCP 是 host 拿着那段意图，跑去问一个 server「create_issue 怎么调」「能不能给我返个 issue id」——
              这是<strong className="text-cream">host 与 tool 之间</strong>的事。
            </p>
            <p className="max-w-md text-cream/65 text-[14px] leading-relaxed">
              右边点上下两层看每层职责。下方 4 个 chip 看 MCP 跟其他主流协议的关系。
            </p>
          </div>

          {/* 右：双层 stack */}
          <div className="lg:col-span-7">
            <div className="bg-cream text-ink border-2 border-cream rounded-3xl shadow-stamp-xl p-5 lg:p-6">
              <div className="space-y-3">
                <StackLayer
                  id="fc"
                  active={layer === "fc"}
                  onPick={setLayer}
                  data={LAYERS.fc}
                  tone="butter"
                />
                <div className="flex justify-center">
                  <div className="w-9 h-9 rounded-full bg-ink text-cream border-2 border-ink shadow-stamp flex items-center justify-center">
                    <ArrowDownToLine className="w-4 h-4" strokeWidth={2.4} />
                  </div>
                </div>
                <StackLayer
                  id="mcp"
                  active={layer === "mcp"}
                  onPick={setLayer}
                  data={LAYERS.mcp}
                  tone="teal"
                />
              </div>

              {/* 选中层 详情 */}
              <div
                key={layer}
                className="mt-4 bg-white border-2 border-ink rounded-2xl p-4 animate-enter-fade"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                      在哪一层
                    </div>
                    <h3 className="font-display text-[20px] font-bold text-ink leading-tight">
                      {l.label}
                      <span className="font-mono text-[12px] font-normal text-ink/55 ml-2">
                        · {l.sub}
                      </span>
                    </h3>
                  </div>
                </div>
                <p className="font-display text-[15px] font-bold text-ink mb-2 leading-snug">
                  {l.job}
                </p>
                <p className="text-[13.5px] text-ink/70 mb-3 leading-relaxed">
                  {l.body}
                </p>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55 mb-1.5">
                  在哪儿
                </div>
                <p className="text-[12.5px] text-ink/65 mb-2 leading-snug">
                  {l.where}
                </p>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55 mb-1.5">
                  具体例子
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {l.sample.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] px-2 py-1 bg-cream border border-ink/20 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 个对手 chip + 对比卡 */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/55 mb-3">
            ↓ MCP 跟其他主流协议怎么放
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {RIVALS.map((r) => {
              const on = r.id === rid;
              return (
                <button
                  key={r.id}
                  onClick={() => setRid(r.id)}
                  className={[
                    "px-3.5 py-2 rounded-full border-2 transition-all duration-250 ease-spring font-mono text-[12px] font-bold",
                    on
                      ? "bg-butter text-ink border-butter shadow-[4px_4px_0_0_#E5BD3A]"
                      : "bg-transparent text-cream/75 border-cream/40 hover:bg-cream/10",
                  ].join(" ")}
                >
                  vs {r.label}
                </button>
              );
            })}
          </div>
          <div
            key={rid}
            className="bg-cream/5 border-2 border-cream/25 rounded-2xl p-5 lg:p-6 animate-enter-fade"
          >
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span
                className={`${STATUS_BG[rival.statusTone]} border-2 font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-2 py-1 rounded-full`}
              >
                {rival.status}
              </span>
              <span className="font-display text-[18px] font-bold text-cream">
                MCP {rival.pos}
              </span>
              <span className="font-mono text-[10.5px] text-cream/55">
                · 跟 {rival.label}
              </span>
            </div>
            <p className="font-display text-[16.5px] font-bold text-cream mb-2 leading-snug max-w-3xl">
              {rival.one}
            </p>
            <p className="text-[14px] text-cream/70 leading-relaxed max-w-3xl">
              {rival.body}
            </p>
            {rival.id === "fc" && (
              <p className="mt-3 font-serif italic text-[13px] text-cream/55 leading-relaxed max-w-3xl">
                想看模型那段 JSON 长啥样、三家 API 字段差异 ——{" "}
                <a
                  href="../function-calling/index.html"
                  className="text-butter font-bold not-italic hover:underline"
                >
                  去《Function Calling》那一站
                </a>
                。
              </p>
            )}
          </div>
        </div>

        {/* 硬规则 callout */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          <Rule
            num="01"
            head="MCP 跟 FC 一起用"
            body="模型用 FC 输出意图；host 内部把它翻译成 MCP 调用。两个都留着，分别解不同问题。"
          />
          <Rule
            num="02"
            head="远程 server 必走 OAuth 2.1"
            body="2025-03 起 spec 强制。2026-07-28 RC 再加 RFC 8707 资源绑定 + RFC 9207 iss 校验。"
            tone="coral"
          />
          <Rule
            num="03"
            head="写操作要让用户拍板"
            body="会改文件、提交 issue 这类「能改世界」的工具，server 要在元信息里标「可能破坏」（行话叫 destructiveHint），host 才会弹「同意 / 拒绝」给用户。"
            tone="butter"
          />
        </div>

        <p className="mt-10 font-mono text-[10.5px] text-cream/45 max-w-3xl">
          来源：modelcontextprotocol.io spec 2025-11-25 · 2026-07-28 RC 公告 · WorkOS 2026 MCP 现状综述 · Portkey 2026-04 MCP vs FC · utcp.io 主页 · A2A protocol RFC
        </p>
      </div>
    </section>
  );
};

const StackLayer: React.FC<{
  id: Layer;
  active: boolean;
  onPick: (l: Layer) => void;
  data: { label: string; sub: string };
  tone: "butter" | "teal";
}> = ({ id, active, onPick, data, tone }) => {
  const baseBg = tone === "butter" ? "bg-butter" : "bg-teal";
  const baseText = tone === "butter" ? "text-ink" : "text-cream";
  return (
    <button
      onClick={() => onPick(id)}
      className={[
        "w-full text-left rounded-2xl border-2 border-ink p-4 transition-all duration-300 ease-spring",
        baseBg,
        baseText,
        active
          ? "shadow-stamp-xl -translate-x-1 -translate-y-1"
          : "shadow-stamp opacity-90 hover:opacity-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg",
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-75 mb-0.5">
            layer · {id === "fc" ? "model ↔ host" : "host ↔ server"}
          </div>
          <div className="font-display text-[20px] lg:text-[22px] font-bold leading-tight">
            {data.label}
          </div>
        </div>
        <div
          className={[
            "font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border border-current",
            active ? "" : "opacity-65",
          ].join(" ")}
        >
          {active ? "selected" : "click"}
        </div>
      </div>
    </button>
  );
};

const Rule: React.FC<{
  num: string;
  head: string;
  body: string;
  tone?: "default" | "coral" | "butter";
}> = ({ num, head, body, tone = "default" }) => {
  const accent =
    tone === "coral"
      ? "text-coral"
      : tone === "butter"
        ? "text-butter"
        : "text-cream";
  return (
    <div className="bg-cream/[0.04] border-2 border-cream/25 rounded-2xl p-4">
      <div className={`font-mono text-[10.5px] font-bold tracking-[0.18em] uppercase mb-2 ${accent}`}>
        rule · {num}
      </div>
      <div className="font-display text-[16px] font-bold text-cream mb-1.5 leading-snug">
        {head}
      </div>
      <p className="text-[13px] text-cream/65 leading-relaxed">{body}</p>
    </div>
  );
};

export default SectionVsFc;
