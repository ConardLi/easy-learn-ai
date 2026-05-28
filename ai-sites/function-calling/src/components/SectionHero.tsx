/**
 * Section 01 · Hero
 *
 * 反直觉钩子直接放进 H1：模型从不调用任何函数 —— 它只是吐了一段 JSON。
 *
 * 主交互（L2 + L2 组合）：
 *   ① 三家协议 chip 切换 · OpenAI / Anthropic / Gemini（左下小 chip 不是大 pill 阵列）
 *   ② 右卡：对应家协议的 raw tool-call JSON · 用户点字段 chip 高亮 + 看解释
 *
 * 区别于 quantization Hero 的 slider + 7-pill：
 *   ─ 这里没有数值滑动，全是「真实 API JSON 解剖」
 *   ─ 视觉锚是「raw response」，不是图表
 */
import React, { useState } from "react";
import { ArrowDown } from "lucide-react";

type Vendor = "openai" | "anthropic" | "gemini";

type FieldKey =
  | "role"
  | "tool_calls"
  | "id"
  | "name"
  | "arguments"
  | "stop_reason"
  | "content_type"
  | "input"
  | "functionCall";

type Snippet = {
  vendor: Vendor;
  label: string;
  /** 真实代表性的 raw response 片段（手抄文档） */
  lines: SnippetLine[];
  /** 协议风味 */
  flavor: string;
};

type SnippetLine = {
  text: string;
  field?: FieldKey;
};

const SNIPPETS: Snippet[] = [
  {
    vendor: "openai",
    label: "OpenAI",
    flavor: "tool_calls 数组 · 同辈 role=assistant",
    lines: [
      { text: "{" },
      { text: '  "role": "assistant",', field: "role" },
      { text: '  "content": null,' },
      { text: '  "tool_calls": [', field: "tool_calls" },
      { text: "    {" },
      { text: '      "id": "call_AbC123xyz",', field: "id" },
      { text: '      "type": "function",' },
      { text: '      "function": {' },
      { text: '        "name": "get_weather",', field: "name" },
      {
        text: '        "arguments": "{\\"city\\":\\"Beijing\\",\\"unit\\":\\"c\\"}"',
        field: "arguments",
      },
      { text: "      }" },
      { text: "    }" },
      { text: "  ]" },
      { text: "}" },
    ],
  },
  {
    vendor: "anthropic",
    label: "Anthropic",
    flavor: "content 数组 · tool_use 与 text 并列",
    lines: [
      { text: "{" },
      { text: '  "role": "assistant",', field: "role" },
      { text: '  "stop_reason": "tool_use",', field: "stop_reason" },
      { text: '  "content": [' },
      { text: "    {" },
      { text: '      "type": "tool_use",', field: "content_type" },
      { text: '      "id": "toolu_01Ab9XYZ",', field: "id" },
      { text: '      "name": "get_weather",', field: "name" },
      { text: '      "input": {', field: "input" },
      { text: '        "city": "Beijing",' },
      { text: '        "unit": "c"' },
      { text: "      }" },
      { text: "    }" },
      { text: "  ]" },
      { text: "}" },
    ],
  },
  {
    vendor: "gemini",
    label: "Gemini",
    flavor: "parts 数组 · functionCall part",
    lines: [
      { text: "{" },
      { text: '  "candidates": [{' },
      { text: '    "content": {' },
      { text: '      "role": "model",', field: "role" },
      { text: '      "parts": [{' },
      { text: '        "functionCall": {', field: "functionCall" },
      { text: '          "name": "get_weather",', field: "name" },
      { text: '          "args": {', field: "input" },
      { text: '            "city": "Beijing",' },
      { text: '            "unit": "c"' },
      { text: "          }" },
      { text: "        }" },
      { text: "      }]" },
      { text: "    }" },
      { text: "  }]" },
      { text: "}" },
    ],
  },
];

/* 字段解释 · 用户点字段 chip 时显示 */
const FIELD_DOC: Record<
  FieldKey,
  { title: string; oneliner: string; gotcha: string }
> = {
  role: {
    title: "role / 角色",
    oneliner:
      "整个消息是从模型这边来的。OpenAI / Anthropic 写 assistant，Gemini 写 model。",
    gotcha: "回写 tool result 时角色名也对应换：openai = tool，anthropic = user。",
  },
  tool_calls: {
    title: "tool_calls / 调用列表",
    oneliner: "数组 —— 一次 response 里可以有 N 个并行调用。",
    gotcha: "即使只有一个调用，也是数组。代码要 forEach，别 [0] 一把梭。",
  },
  id: {
    title: "id / 通话凭证",
    oneliner:
      "唯一标识这一次调用。把结果塞回去时，必须带上同一个 id 匹配。",
    gotcha: "搞错 id 配对 → 模型分不清谁是谁，下一轮幻觉概率飙升。",
  },
  name: {
    title: "name / 函数名",
    oneliner: "模型告诉你「调这个名字」。必须和你 schema 里写的完全一致。",
    gotcha: "别写中文名。模型可能漏字符，匹配不上就废了。",
  },
  arguments: {
    title: "arguments / 参数字符串",
    oneliner:
      "OpenAI 把参数包成一个 JSON 字符串（注意是 string 不是 object）。",
    gotcha: "JSON.parse 之前先 try / catch ——  模型偶尔会吐不完整 JSON。",
  },
  stop_reason: {
    title: "stop_reason",
    oneliner:
      "Anthropic 用这字段告诉你「我想调工具了」。值是 tool_use。",
    gotcha: "loop 终止条件：!= tool_use 时才是真终止。",
  },
  content_type: {
    title: "type: tool_use",
    oneliner:
      "Anthropic 把 text 和 tool_use 平铺在 content 数组里。",
    gotcha: "可以一次响应里既有 text 又有 tool_use —— 两者都要处理。",
  },
  input: {
    title: "input / args 对象",
    oneliner:
      "Anthropic 和 Gemini 直接给 object，不再包字符串。开发体验更友好。",
    gotcha: "依然要 schema 校验 —— 字段缺失 / 类型错的事会发生。",
  },
  functionCall: {
    title: "functionCall part",
    oneliner: "Gemini 把工具调用塞在 parts 数组里，跟文本 part 并列。",
    gotcha: "可能跟 text part 混杂。filter 后再处理。",
  },
};

const SectionHero: React.FC = () => {
  const [vendor, setVendor] = useState<Vendor>("openai");
  const [field, setField] = useState<FieldKey>("tool_calls");

  const snippet = SNIPPETS.find((s) => s.vendor === vendor)!;
  /* 当切换 vendor 时若当前 field 不存在则切默认 */
  const availableFields = Array.from(
    new Set(snippet.lines.map((l) => l.field).filter(Boolean) as FieldKey[]),
  );
  const activeField = availableFields.includes(field)
    ? field
    : availableFields[0];
  const doc = FIELD_DOC[activeField];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动装饰 */}
      <div
        aria-hidden
        className="absolute top-24 right-[6%] hidden lg:block animate-float-y"
      >
        <div className="w-10 h-10 bg-teal border-2 border-ink rounded-2xl shadow-stamp -rotate-12" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-28 left-[5%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-9 h-9 bg-coral border-2 border-ink rounded-full shadow-stamp rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Function Calling · 函数调用
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              Function Calling
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  让大模型按规定格式输出一段 JSON，告诉你的代码：调哪个工具、参数填什么。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                你提前用 JSON Schema 告诉模型：「我这里有这些工具，每个长什么样、要什么参数」。
              </p>
              <p>
                模型回答时，如果觉得需要查天气、算账、查数据库，它就不直接说话了，而是吐出一段结构化的{" "}
                <code className="font-mono text-[13.5px] bg-ink/8 text-ink px-1.5 py-0.5 rounded">
                  {`{ name, arguments }`}
                </code>{" "}
                。
              </p>
              <p>
                你的代码拿这段 JSON 去真正执行 —— 调 API、读文件、跑 SQL ——
                再把结果塞回去当作下一条消息，模型继续看完后再开口。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边就是模型实际「吐出来」的那段 JSON。
              换三家协议看看，字段名不一样，本质都是这件事。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 6 章 · ~10 分钟
              </div>
            </div>
          </div>

          {/* 右：raw response 卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl overflow-hidden">
              {/* 卡顶 vendor 切换 */}
              <div className="flex items-stretch border-b-2 border-ink">
                {SNIPPETS.map((s) => {
                  const on = s.vendor === vendor;
                  return (
                    <button
                      key={s.vendor}
                      onClick={() => setVendor(s.vendor)}
                      className={[
                        "flex-1 px-3 py-3.5 border-r-2 border-ink last:border-r-0 transition-colors duration-200",
                        on
                          ? "bg-ink text-cream"
                          : "bg-white text-ink hover:bg-cream",
                      ].join(" ")}
                    >
                      <div className="font-display text-[15px] font-bold leading-tight">
                        {s.label}
                      </div>
                      <div
                        className={[
                          "font-mono text-[10px] mt-0.5",
                          on ? "text-butter" : "text-ink/45",
                        ].join(" ")}
                      >
                        {s.flavor}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* code area */}
              <div className="bg-ink text-cream font-mono text-[12.5px] leading-[1.65] p-5 lg:p-6 overflow-x-auto">
                <div className="text-cream/40 mb-2 text-[10.5px] uppercase tracking-[0.18em]">
                  {"<<<"} model → host · raw response
                </div>
                <pre key={vendor} className="whitespace-pre animate-enter-fade">
                  {snippet.lines.map((line, i) => {
                    const isActive = line.field === activeField;
                    const isClickable = !!line.field;
                    return (
                      <code
                        key={i}
                        onClick={
                          isClickable
                            ? () => setField(line.field as FieldKey)
                            : undefined
                        }
                        className={[
                          "block transition-colors duration-200",
                          isClickable ? "cursor-pointer" : "",
                          isActive
                            ? "bg-butter text-ink px-1 -mx-1 rounded"
                            : isClickable
                              ? "text-butter hover:bg-cream/10"
                              : "text-cream/85",
                        ].join(" ")}
                      >
                        {line.text || " "}
                      </code>
                    );
                  })}
                </pre>
                <div className="mt-3 text-cream/40 text-[10.5px] uppercase tracking-[0.18em]">
                  {">>>"} 点高亮行看字段含义
                </div>
              </div>

              {/* field 字段 chip 阵列 */}
              <div className="px-5 lg:px-6 pt-4 pb-1 border-t-2 border-ink bg-cream">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                  字段 · click to inspect
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {availableFields.map((f) => {
                    const on = f === activeField;
                    return (
                      <button
                        key={f}
                        onClick={() => setField(f)}
                        className={[
                          "px-2.5 py-1 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-200 ease-spring",
                          on
                            ? "bg-ink text-butter shadow-[3px_3px_0_0_#241C15]"
                            : "bg-white text-ink hover:bg-butter/30",
                        ].join(" ")}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 字段解释面板 */}
              <div className="px-5 lg:px-6 py-5 bg-cream">
                <div
                  key={`${vendor}-${activeField}`}
                  className="animate-enter-fade"
                >
                  <div className="font-display text-[18px] font-bold text-ink leading-tight mb-1">
                    {doc.title}
                  </div>
                  <p className="text-[14.5px] text-ink/75 leading-relaxed mb-2">
                    {doc.oneliner}
                  </p>
                  <div className="flex items-start gap-2 px-3 py-2 bg-coral/12 border-l-[3px] border-coral rounded-r">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral font-bold shrink-0 mt-0.5">
                      gotcha
                    </span>
                    <p className="text-[13px] text-ink/80 leading-relaxed">
                      {doc.gotcha}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 注脚 */}
            <p className="mt-4 font-mono text-[10.5px] text-ink/45 px-1">
              raw schema 摘自 OpenAI / Anthropic / Google AI 官方文档（2026/04
              版本）
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
