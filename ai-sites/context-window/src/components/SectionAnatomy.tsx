/**
 * SectionAnatomy · 拆开 context window 看里面装什么
 *
 * 主交互：
 *   - L2 pill：切换三种典型场景（普通聊天 / 编程 Agent / 长文档 QA），
 *     同一根 context 长条按场景重新切比例
 *   - L1 hover：把鼠标放到任一段上，左侧出现该段的「定义 + 例子 + 占比」
 *
 * 教学点：context 不是「一句话」，是好几段拼成的一段。
 * 拼法跟你的使用场景强相关。
 */
import React, { useState } from "react";
import { Layers } from "lucide-react";

type SegKey = "system" | "tools" | "history" | "rag" | "now";

type Segment = {
  key: SegKey;
  label: string;
  en: string;
  fill: string;
  text: string;
  /** 这段是啥 */
  what: string;
  /** 真实例子片段 */
  example: string;
};

type Scene = {
  id: string;
  name: string;
  desc: string;
  totalTokens: number;
  /** 每段的 token 数 */
  parts: Record<SegKey, number>;
};

const SEGMENT_DEFS: Record<SegKey, Omit<Segment, "key">> = {
  system: {
    label: "系统设定",
    en: "SYSTEM PROMPT",
    fill: "#1B4B5A",
    text: "#FBEFE3",
    what: "服务端写好的「你是谁、你要怎么干」。每次请求都附在最前面，模型看不到也改不了。",
    example: "「你是一个资深前端工程师，回答简洁、用中文、必要时给代码示例…」",
  },
  tools: {
    label: "工具定义",
    en: "TOOL SCHEMAS",
    fill: "#E07A5F",
    text: "#FBEFE3",
    what: "比如 AI 能「读文件」「跑命令」「搜网页」，这些能力的「使用说明书」也算在 context 里 —— 工具叫什么名、要传什么参数、用来干嘛，全得写清楚。每次请求都得带上，AI 才知道自己手上有哪些招。",
    example: "{ name: \"search_files\", parameters: { pattern: string, path?: string } }",
  },
  history: {
    label: "历史消息",
    en: "CHAT HISTORY",
    fill: "#F4D35E",
    text: "#241C15",
    what: "前面来回的 user / assistant / tool 消息全文。轮数越多，这段越大。",
    example: "USER: 帮我看下 index.ts → ASSISTANT: 我先 cat 一下 → TOOL: (1240 tokens 内容) …",
  },
  rag: {
    label: "检索内容",
    en: "RETRIEVED DOCS",
    fill: "#7A28CB",
    text: "#FBEFE3",
    what: "RAG 场景下从知识库 / 文档里捞出来的相关片段。临时塞进来给模型参考。",
    example: "「Chunk 14：用户偏好…」「Chunk 31：API 限速…」（拼成 N 条 chunk）",
  },
  now: {
    label: "本次提问",
    en: "USER · NOW",
    fill: "#FF4D74",
    text: "#FBEFE3",
    what: "你这一秒刚发出去的话。所有前面几段都是为了让模型「带着背景」回答这一段。",
    example: "「这个函数为什么 timeout？」",
  },
};

const SCENES: Scene[] = [
  {
    id: "chat",
    name: "聊天问答",
    desc: "system 一小段、没工具、几轮对话。绝大多数 chatbot 长这样。",
    totalTokens: 3200,
    parts: { system: 300, tools: 0, history: 2500, rag: 0, now: 400 },
  },
  {
    id: "agent",
    name: "编程 Agent",
    desc: "工具定义吃掉一大块；工具调用回声塞满 history。开发者最容易撑爆的姿势。",
    totalTokens: 42000,
    parts: { system: 800, tools: 6000, history: 33000, rag: 0, now: 2200 },
  },
  {
    id: "rag",
    name: "长文档 QA",
    desc: "把检索回来的几十个 chunk 塞进去给模型参考。文档片段是大头。",
    totalTokens: 38000,
    parts: { system: 500, tools: 0, history: 1500, rag: 35000, now: 1000 },
  },
];

const SEGMENT_ORDER: SegKey[] = ["system", "tools", "rag", "history", "now"];

const SectionAnatomy: React.FC = () => {
  const [sceneId, setSceneId] = useState(SCENES[1].id);
  const [hoverKey, setHoverKey] = useState<SegKey | null>(null);
  const scene = SCENES.find((s) => s.id === sceneId)!;

  const total = scene.totalTokens;
  const visibleSegs: Segment[] = SEGMENT_ORDER.filter((k) => scene.parts[k] > 0).map((k) => ({
    key: k,
    ...SEGMENT_DEFS[k],
  }));

  const focusKey = hoverKey ?? "system";
  const focusSeg = SEGMENT_DEFS[focusKey];
  const focusTokens = scene.parts[focusKey];
  const focusPct = total > 0 ? (focusTokens / total) * 100 : 0;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Anatomy · 内部结构</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          一根 context 长条里，
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">至少切成 4 段</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          「context window」听上去像一个独立的容器，其实它就是一段被服务端拼好的文本。
          这段文本通常包含：系统设定、工具定义、历史消息、（RAG 场景下的）检索内容、本次提问。
          每一段都占 token，加起来就是这次请求的总开销。
          <span className="font-bold text-ink">用什么场景，切法不一样。</span>
        </p>

        {/* 场景 pill */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {SCENES.map((s) => {
            const active = s.id === sceneId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSceneId(s.id);
                  setHoverKey(null);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 border-2 border-ink rounded-full font-mono text-[11.5px] tracking-[0.14em] uppercase transition-all duration-250 ease-spring ${
                  active
                    ? "bg-ink text-cream shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                }`}
              >
                <Layers className="w-3.5 h-3.5" strokeWidth={2.4} />
                {s.name}
              </button>
            );
          })}
        </div>
        <p className="font-mono text-[11px] text-ink/55 mt-3">
          当前场景：{scene.desc} · 总 ≈ {total.toLocaleString()} tokens
        </p>

        {/* ─── 主可视化 ─── */}
        <div key={sceneId} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-enter-up">
          {/* 左：详情 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1">
                {hoverKey ? "悬停的段" : "把鼠标移到右边任一段上"}
              </div>
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-display font-extrabold text-[24px] text-ink leading-tight">
                  {focusSeg.label}
                </span>
                <span className="font-mono text-[12px] text-ink/55">{focusSeg.en}</span>
              </div>

              {/* 占比环 */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-[78px] h-[78px] flex-shrink-0">
                  <svg viewBox="0 0 78 78" className="w-full h-full -rotate-90">
                    <circle cx="39" cy="39" r="32" fill="none" stroke="#241C15" strokeOpacity="0.12" strokeWidth="8" />
                    <circle
                      cx="39"
                      cy="39"
                      r="32"
                      fill="none"
                      stroke={focusSeg.fill}
                      strokeWidth="8"
                      strokeDasharray={`${(focusPct / 100) * (2 * Math.PI * 32)} ${2 * Math.PI * 32}`}
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-editorial"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display font-extrabold text-[15px] text-ink leading-none">
                      {Math.round(focusPct)}%
                    </span>
                    <span className="font-mono text-[9px] text-ink/55 mt-0.5">占比</span>
                  </div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-[20px] text-ink leading-none">
                    {focusTokens.toLocaleString()}
                    <span className="font-mono text-[12px] font-normal text-ink/55 ml-1">tokens</span>
                  </div>
                  <div className="font-mono text-[11px] text-ink/55 mt-1">
                    ≈ {Math.round(focusTokens * 4 / 100) / 10}K 字符
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-dashed border-ink/20">
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1.5">
                  这一段是啥
                </div>
                <p className="font-sans text-[14px] leading-[1.7] text-ink/85">
                  {focusSeg.what}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-dashed border-ink/20">
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1.5">
                  实际长这样
                </div>
                <div className="bg-ink/5 border-2 border-ink/15 rounded-xl px-3 py-2.5 font-mono text-[12px] leading-[1.55] text-ink/80">
                  {focusSeg.example}
                </div>
              </div>
            </div>
          </div>

          {/* 右：分段长条 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-6 h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  本次请求 · 一根 context 长条
                </span>
                <span className="font-mono text-[11px] text-ink/55">
                  {total.toLocaleString()} tokens
                </span>
              </div>

              {/* 长条 */}
              <div className="relative h-[180px] rounded-2xl overflow-hidden border-2 border-ink flex">
                {visibleSegs.map((seg) => {
                  const tokens = scene.parts[seg.key];
                  const pct = (tokens / total) * 100;
                  const isHover = hoverKey === seg.key;
                  return (
                    <button
                      key={seg.key}
                      type="button"
                      onMouseEnter={() => setHoverKey(seg.key)}
                      onFocus={() => setHoverKey(seg.key)}
                      onMouseLeave={() => setHoverKey(null)}
                      className={`relative flex flex-col justify-end items-start px-3 py-3 border-r-2 border-ink last:border-r-0 transition-all duration-300 ease-spring cursor-pointer outline-none ${
                        isHover ? "brightness-110" : hoverKey ? "opacity-55" : ""
                      }`}
                      style={{
                        width: `${pct}%`,
                        backgroundColor: seg.fill,
                        color: seg.text,
                      }}
                    >
                      <span className="font-mono font-extrabold text-[9.5px] tracking-[0.16em]">
                        {seg.en}
                      </span>
                      <span className="font-display font-bold text-[14px] leading-tight mt-0.5">
                        {seg.label}
                      </span>
                      <span className="font-mono text-[10px] mt-1 opacity-85">
                        {tokens.toLocaleString()}t · {Math.round(pct)}%
                      </span>
                      {isHover && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cream border-2 border-ink" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 标尺 */}
              <div className="mt-2 flex justify-between font-mono text-[10px] text-ink/45">
                <span>段 1</span>
                <span>段 2</span>
                <span>段 …</span>
                <span>段 N</span>
              </div>

              {/* 提示 */}
              <p className="font-serif italic text-[14px] text-ink/70 leading-[1.65] mt-5 pt-4 border-t-2 border-dashed border-ink/20">
                所有这些段拼起来，<span className="font-bold text-ink not-italic">才是模型这一秒看到的「全部」</span>。
                它没有「记得上次说过什么」的概念 —— 上次的事如果不在这根长条里，对模型就是不存在。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAnatomy;
