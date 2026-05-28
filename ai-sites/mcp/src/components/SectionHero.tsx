/**
 * Section 01 · Hero
 *
 * Hero 六段骨架（严格遵循 skill）：
 *   ① eyebrow ② H1「MCP 是什么？」③ 一句话定义（butter 高亮） ④ 白话三段
 *   ⑤ 过渡句 ⑥ 滚动提示
 *
 * 反模板：
 *   ─ 区别于 fc 站「raw JSON 字段 chip」—— 右卡是「M×N → M+N 集成线对比」
 *   ─ 区别于 quantization 站「7-pill bit 离散选择」—— 这里是连续 slider × 2
 *   ─ 区别于 moe 站「257 expert 网格」—— 我们的网格是 client × server 二维连接矩阵
 *
 * 右卡可视化（核心动作）：
 *   两个 slider 控制 N（AI 应用数 / client）和 M（工具数 / server）
 *   左侧 mini-arch：N×M 蛛网（每个 client 跟每个 server 画一条线）
 *   右侧 mini-arch：MCP hub 在中心，N+M 条线收束到中心
 *   下方数字对比：旧 = N×M / MCP = N+M
 */
import React, { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";

const SectionHero: React.FC = () => {
  const [nApps, setNApps] = useState(4);
  const [mTools, setMTools] = useState(5);

  const oldCount = nApps * mTools;
  const mcpCount = nApps + mTools;
  const ratio = (oldCount / mcpCount).toFixed(1);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动小装饰 */}
      <div
        aria-hidden
        className="absolute top-24 right-[8%] hidden lg:block animate-float-y"
      >
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Model Context Protocol · MCP
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              MCP
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
                  Anthropic 2024 年 11 月开源的开放协议，让任何 AI 应用用同一套接口连接任何工具。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                之前 Claude 接 GitHub 写一份适配代码，Cursor 接 GitHub 又得写一份。
                每加一家 AI 应用、加一个工具，工作量都按乘法长。
              </p>
              <p>
                MCP 把这件事拆成两边。工具方写一个{" "}
                <strong className="text-ink">MCP server</strong>，AI 应用方写一个{" "}
                <strong className="text-ink">MCP client</strong>，中间用 JSON-RPC 2.0 说同一种话。
              </p>
              <p>
                2026 年 Claude、ChatGPT、Cursor、VS Code、Gemini 都在用。
                公开 server 跨四大注册表去重后约 9,400 个。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这张卡，就是「集成数」这件事本身。
              拖 AI 应用数和工具数，看两种世界连线怎么变。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 7 章 · ~10 分钟
              </div>
            </div>
          </div>

          {/* 右：N×M → N+M 可视化卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* slider 头部 */}
              <div className="grid grid-cols-2 gap-5 mb-6">
                <SliderBox
                  label="① AI 应用数（client）"
                  value={nApps}
                  min={1}
                  max={6}
                  onChange={setNApps}
                  hint="例：Claude · Cursor · VS Code"
                />
                <SliderBox
                  label="② 工具数（server）"
                  value={mTools}
                  min={1}
                  max={6}
                  onChange={setMTools}
                  hint="例：GitHub · Slack · Postgres"
                />
              </div>

              {/* 双图对比 */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <ArchCard
                  title="在 MCP 之前"
                  subtitle="每对 client × server 单独写适配"
                  count={oldCount}
                  unit="条 N×M 集成"
                  tone="coral"
                >
                  <OldMeshSvg n={nApps} m={mTools} />
                </ArchCard>
                <ArchCard
                  title="MCP 之后"
                  subtitle="所有人都说 JSON-RPC，写一次"
                  count={mcpCount}
                  unit="条 N+M 集成"
                  tone="teal"
                >
                  <NewHubSvg n={nApps} m={mTools} />
                </ArchCard>
              </div>

              {/* 比率横条 */}
              <div className="pt-4 border-t border-ink/10">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    工作量比
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-[26px] lg:text-[30px] font-bold text-ink leading-none tabular-nums">
                      {ratio}×
                    </span>
                    <span className="font-mono text-[11px] text-ink/55">
                      旧 ÷ MCP
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                  <div
                    className="h-full bg-coral transition-all duration-400 ease-spring"
                    style={{
                      width: `${Math.min((oldCount / 36) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="mt-2 font-mono text-[10px] text-ink/45">
                  来源：modelcontextprotocol.io 规范 2025-11-25 · WorkOS 2026-MCP 现状综述
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- 子组件 ---------- */

const SliderBox: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  hint: string;
}> = ({ label, value, min, max, onChange, hint }) => (
  <div className="bg-cream border-2 border-ink rounded-2xl p-3.5">
    <div className="flex items-baseline justify-between mb-1.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
        {label}
      </div>
      <span className="font-display text-[22px] font-bold text-ink leading-none tabular-nums">
        {value}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={1}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-coral cursor-pointer"
    />
    <p className="mt-1 font-mono text-[10px] text-ink/45">{hint}</p>
  </div>
);

const ArchCard: React.FC<{
  title: string;
  subtitle: string;
  count: number;
  unit: string;
  tone: "coral" | "teal";
  children: React.ReactNode;
}> = ({ title, subtitle, count, unit, tone, children }) => {
  const accent = tone === "coral" ? "bg-coral text-white" : "bg-teal text-white";
  const ring = tone === "coral" ? "border-coral/40" : "border-teal/40";
  return (
    <div
      className={`relative bg-cream border-2 ${ring} rounded-2xl p-3.5 overflow-hidden`}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65 font-semibold">
          {title}
        </div>
        <span
          className={`${accent} px-1.5 py-0.5 rounded font-mono text-[10px] font-bold tabular-nums`}
        >
          {count}
        </span>
      </div>
      <p className="font-mono text-[10px] text-ink/45 mb-1.5">{subtitle}</p>
      <div className="aspect-[5/3] bg-white border border-ink/12 rounded-xl overflow-hidden">
        {children}
      </div>
      <div className="mt-1.5 font-mono text-[10px] text-ink/55">
        共 <strong className="text-ink">{count}</strong> {unit}
      </div>
    </div>
  );
};

/* ---------- SVG ---------- */

/** 左图：N×M 蛛网。client 在左侧一列，server 在右侧一列，每个 client 都跟每个 server 连线。 */
const OldMeshSvg: React.FC<{ n: number; m: number }> = ({ n, m }) => {
  const W = 240;
  const H = 144;
  const padY = 16;
  const clients = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        x: 36,
        y: padY + ((H - 2 * padY) * (i + 0.5)) / n,
      })),
    [n],
  );
  const servers = useMemo(
    () =>
      Array.from({ length: m }, (_, i) => ({
        x: W - 36,
        y: padY + ((H - 2 * padY) * (i + 0.5)) / m,
      })),
    [m],
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {clients.map((c, ci) =>
        servers.map((s, si) => (
          <line
            key={`l-${ci}-${si}`}
            x1={c.x}
            y1={c.y}
            x2={s.x}
            y2={s.y}
            stroke="#E07A5F"
            strokeWidth="1"
            strokeOpacity="0.65"
          />
        )),
      )}
      {clients.map((c, i) => (
        <g key={`c-${i}`}>
          <rect
            x={c.x - 12}
            y={c.y - 7}
            width="24"
            height="14"
            rx="3"
            fill="#241C15"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <text
            x={c.x}
            y={c.y + 3}
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="700"
            fill="#F4D35E"
          >
            app{i + 1}
          </text>
        </g>
      ))}
      {servers.map((s, i) => (
        <g key={`s-${i}`}>
          <rect
            x={s.x - 13}
            y={s.y - 7}
            width="26"
            height="14"
            rx="3"
            fill="#FBE891"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <text
            x={s.x}
            y={s.y + 3}
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="700"
            fill="#241C15"
          >
            tool{i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** 右图：N+M 中心收束。中间一个 MCP hub，所有 client 和 server 都连到 hub。 */
const NewHubSvg: React.FC<{ n: number; m: number }> = ({ n, m }) => {
  const W = 240;
  const H = 144;
  const padY = 16;
  const hub = { x: W / 2, y: H / 2 };
  const clients = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        x: 32,
        y: padY + ((H - 2 * padY) * (i + 0.5)) / n,
      })),
    [n],
  );
  const servers = useMemo(
    () =>
      Array.from({ length: m }, (_, i) => ({
        x: W - 32,
        y: padY + ((H - 2 * padY) * (i + 0.5)) / m,
      })),
    [m],
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {clients.map((c, i) => (
        <line
          key={`cl-${i}`}
          x1={c.x}
          y1={c.y}
          x2={hub.x}
          y2={hub.y}
          stroke="#1B4B5A"
          strokeWidth="1.4"
        />
      ))}
      {servers.map((s, i) => (
        <line
          key={`sl-${i}`}
          x1={s.x}
          y1={s.y}
          x2={hub.x}
          y2={hub.y}
          stroke="#1B4B5A"
          strokeWidth="1.4"
        />
      ))}
      {/* hub */}
      <g>
        <circle
          cx={hub.x}
          cy={hub.y}
          r="20"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x={hub.x}
          y={hub.y - 1}
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
        >
          MCP
        </text>
        <text
          x={hub.x}
          y={hub.y + 9}
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="6.5"
          fill="#FBE891"
        >
          json-rpc
        </text>
      </g>
      {clients.map((c, i) => (
        <g key={`c-${i}`}>
          <rect
            x={c.x - 12}
            y={c.y - 7}
            width="24"
            height="14"
            rx="3"
            fill="#241C15"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <text
            x={c.x}
            y={c.y + 3}
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="700"
            fill="#F4D35E"
          >
            app{i + 1}
          </text>
        </g>
      ))}
      {servers.map((s, i) => (
        <g key={`s-${i}`}>
          <rect
            x={s.x - 13}
            y={s.y - 7}
            width="26"
            height="14"
            rx="3"
            fill="#FBE891"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <text
            x={s.x}
            y={s.y + 3}
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="700"
            fill="#241C15"
          >
            tool{i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default SectionHero;
