/**
 * SectionVsTeams · SubAgent vs Agent Teams（L3 互动模拟器）
 *
 * 主交互（L3 多参数 → 拓扑图实时形变）：
 *   - 三个旋钮：子 Agent 数量 / 是否长期存在 / 子 Agent 之间通讯
 *   - 中央 SVG 拓扑图按参数实时重画：
 *       · 节点位置用 CSS transform + transition，count 变化时平滑滑到新位置
 *       · 节点 fill 用 CSS transition，临时 ↔ 持久切换时颜色平滑过渡
 *       · 互通线常驻 DOM 但用 opacity 过渡淡入淡出
 *       · 新增节点（count ↑）走 enter-pop 动画，但仅作用在内层 <g> 上，
 *         避免 CSS transform 覆盖外层 translate（这是上一版的核心 bug）
 *   - 4 个 preset 按钮一键切典型形态，verdict 卡随参数翻面 + 配色
 *
 * 跟 SectionFourScenarios（chip + 剧本）拉开：那是切场景，这里是拼配置。
 * 跟 SectionContextRot（slider）拉开：那是单参数 → 噪声柱状条；这里是多参数 → 拓扑图。
 */
import React, { useMemo } from "react";
import { Box, Users, Workflow, Zap, Shuffle, ExternalLink } from "lucide-react";

type Side = "sub" | "teams" | "mixed" | "edge";

const MAX_COUNT = 5;
const RADIUS = 108;
const CX = 220;
const CY = 160;

function computeAngle(i: number, count: number) {
  // 从顶部开始，顺时针铺开
  return -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(count, 2);
}

function nodePos(i: number, count: number) {
  const a = computeAngle(i, count);
  return { x: CX + RADIUS * Math.cos(a), y: CY + RADIUS * Math.sin(a) };
}

const SectionVsTeams: React.FC = () => {
  const [count, setCount] = React.useState(1);
  const [persistent, setPersistent] = React.useState(false);
  const [comm, setComm] = React.useState(false);

  const verdict: Side = useMemo(() => {
    if (!persistent && !comm) return "sub";
    if (persistent && comm) return "teams";
    if (persistent && !comm) return "edge";
    return "mixed";
  }, [persistent, comm]);

  const verdictCopy = useMemo(() => {
    if (verdict === "sub") {
      return {
        title: count === 1 ? "经典 SubAgent" : "并行 SubAgent",
        tone: "bg-butter text-ink",
        line:
          count === 1
            ? "1 个子 Agent + 临时 + 隔离 = Claude Code、Cursor 默认的形态。先把这个玩明白。"
            : "多个子 Agent 同时跑、互不通信、做完散场 = 并行调研典型场景。仍属 SubAgent。",
      };
    }
    if (verdict === "teams") {
      return {
        title: "Agent Teams",
        tone: "bg-coral text-white",
        line:
          "子 Agent 不散伙、还能互相发消息，就像固定班组；比「临时工干完就走」重很多，新手先别碰。",
      };
    }
    if (verdict === "edge") {
      return {
        title: "准 Agent Teams（搭了架子没真协作）",
        tone: "bg-teal text-white",
        line: "持久但不互通：成员各干各的，彼此压根不通气。一般是 Teams 雏形，不算成熟。",
      };
    }
    return {
      title: "罕见混合体",
      tone: "bg-pop text-white",
      line:
        "临时却让它们彼此聊起来：协作开销高、生命周期又短，性价比低。实际工程里基本不这么搭。",
    };
  }, [verdict, count]);

  // 全部潜在节点位置：每个 i 对应在「当前 count」下应该在哪儿
  // 用稳定的 key (`sub-${i}`) → 已存在的节点会用 CSS transition 平滑滑到新位置
  const visibleSubs = useMemo(() => {
    const arr: { i: number; x: number; y: number }[] = [];
    for (let i = 0; i < count; i++) {
      const { x, y } = nodePos(i, count);
      arr.push({ i, x, y });
    }
    return arr;
  }, [count]);

  // 全部 i<j 配对，提前算好所有 (i,j) 在当前 count 布局下的端点
  // 不可见的（comm 关 / 任一端 ≥ count）通过 opacity:0 隐藏，留 DOM 走过渡
  const allPairs = useMemo(() => {
    const ps: { i: number; j: number }[] = [];
    for (let i = 0; i < MAX_COUNT; i++) {
      for (let j = i + 1; j < MAX_COUNT; j++) ps.push({ i, j });
    }
    return ps;
  }, []);

  const applyPreset = (
    preset: "sub-classic" | "sub-parallel" | "teams" | "edge",
  ) => {
    if (preset === "sub-classic") {
      setCount(1);
      setPersistent(false);
      setComm(false);
    } else if (preset === "sub-parallel") {
      setCount(3);
      setPersistent(false);
      setComm(false);
    } else if (preset === "teams") {
      setCount(4);
      setPersistent(true);
      setComm(true);
    } else {
      setCount(2);
      setPersistent(true);
      setComm(false);
    }
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">VS · 别跟 Agent Teams 混了</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          SubAgent vs Agent Teams：
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter z-0" />
            <span className="relative z-10">三个旋钮拨一拨</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          这俩东西容易混。其实就差三件事 ——
          <span className="font-bold text-ink"> 数量、是否长期、彼此通讯 </span>。
          拨动下面的旋钮，看中间的拓扑图实时变形，下方的结论也跟着翻。
        </p>

        {/* preset 按钮 */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mr-1">
            一键切典型形态：
          </span>
          {[
            {
              id: "sub-classic" as const,
              label: "经典 SubAgent",
              icon: <Box className="w-3 h-3" strokeWidth={2.4} />,
            },
            {
              id: "sub-parallel" as const,
              label: "并行 SubAgent",
              icon: <Workflow className="w-3 h-3" strokeWidth={2.4} />,
            },
            {
              id: "teams" as const,
              label: "Agent Teams",
              icon: <Users className="w-3 h-3" strokeWidth={2.4} />,
            },
            {
              id: "edge" as const,
              label: "边界形态",
              icon: <Shuffle className="w-3 h-3" strokeWidth={2.4} />,
            },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.16em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </div>

        {/* 主体：左边旋钮 + 右边拓扑图 */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左：旋钮区 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full flex flex-col gap-7">
              {/* 子 Agent 数量 */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                    子 Agent 数量
                  </div>
                  <div className="font-display font-extrabold text-[24px] text-ink leading-none">
                    {count}
                    <span className="font-mono text-[12px] text-ink/55 ml-1">个</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={MAX_COUNT}
                  step={1}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full accent-coral"
                  aria-label="子 Agent 数量"
                />
                <div className="flex justify-between mt-1 font-mono text-[10px] text-ink/45">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={n === count ? "text-ink font-bold" : ""}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-2">
                  生命周期
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <KnobBtn
                    active={!persistent}
                    onClick={() => setPersistent(false)}
                    title="临时"
                    sub="任务结束就散"
                  />
                  <KnobBtn
                    active={persistent}
                    onClick={() => setPersistent(true)}
                    title="持久"
                    sub="一直在，能再被找"
                  />
                </div>
              </div>

              <div>
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-2">
                  子 Agent 之间
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <KnobBtn
                    active={!comm}
                    onClick={() => setComm(false)}
                    title="互相隔离"
                    sub="只跟主对话讲话"
                  />
                  <KnobBtn
                    active={comm}
                    onClick={() => setComm(true)}
                    title="互相通讯"
                    sub="子 ↔ 子 直接聊"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 右：拓扑图 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                  拓扑 · 实时
                </div>
                <div className="font-mono text-[10.5px] text-ink/55">
                  count={count} · {persistent ? "持久" : "临时"} ·{" "}
                  {comm ? "互通" : "隔离"}
                </div>
              </div>

              <svg viewBox="0 0 440 320" className="w-full h-auto">
                <defs>
                  <pattern id="dotgrid-vs" width="14" height="14" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="#241C15" opacity="0.08" />
                  </pattern>
                  <radialGradient id="mainGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F4D35E" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#F4D35E" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width="440" height="320" fill="url(#dotgrid-vs)" />

                {/* 主 Agent halo */}
                <circle cx={CX} cy={CY} r="76" fill="url(#mainGlow)" />

                {/* 主对话 -> 子 Agent 调用线（每个可见节点一条） */}
                {visibleSubs.map((s) => (
                  <line
                    key={`mainline-${s.i}`}
                    x1={CX}
                    y1={CY}
                    x2={s.x}
                    y2={s.y}
                    stroke="#241C15"
                    strokeWidth={1.8}
                    strokeDasharray="4 4"
                    opacity={0.5}
                    style={{ transition: "all 400ms cubic-bezier(0.22,1,0.36,1)" }}
                  />
                ))}

                {/* 子 Agent 之间互通线：常驻 DOM，用 opacity 淡入淡出 */}
                {allPairs.map(({ i, j }) => {
                  const visible = comm && i < count && j < count;
                  // 端点用「当前 count 下」的位置；不可见时把端点放到中心避免线伸到外面
                  const a = i < count ? nodePos(i, count) : { x: CX, y: CY };
                  const b = j < count ? nodePos(j, count) : { x: CX, y: CY };
                  return (
                    <line
                      key={`comm-${i}-${j}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="#E07A5F"
                      strokeWidth={2.2}
                      strokeDasharray="6 4"
                      style={{
                        opacity: visible ? 0.85 : 0,
                        transition:
                          "opacity 350ms ease-out, x1 400ms cubic-bezier(0.22,1,0.36,1), y1 400ms cubic-bezier(0.22,1,0.36,1), x2 400ms cubic-bezier(0.22,1,0.36,1), y2 400ms cubic-bezier(0.22,1,0.36,1)",
                      }}
                      className={visible ? "animate-dash-flow" : undefined}
                    />
                  );
                })}

                {/* 主 Agent 节点 */}
                <g style={{ transform: `translate(${CX}px, ${CY}px)` }}>
                  <circle cx="3" cy="3" r="34" fill="#241C15" opacity="0.95" />
                  <circle
                    cx="0"
                    cy="0"
                    r="34"
                    fill="#F4D35E"
                    stroke="#241C15"
                    strokeWidth="2.5"
                  />
                  <text
                    x="0"
                    y="-2"
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="10"
                    fontWeight="800"
                    letterSpacing="1.2"
                    fill="#241C15"
                  >
                    MAIN
                  </text>
                  <text
                    x="0"
                    y="11"
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="8.5"
                    letterSpacing="1.4"
                    fill="#241C15"
                    opacity="0.65"
                  >
                    AGENT
                  </text>
                </g>

                {/* 子 Agent 节点：外 g 仅做位置 + transition；内 g 做 enter 动画 */}
                {visibleSubs.map((s) => (
                  <g
                    key={`sub-${s.i}`}
                    style={{
                      transform: `translate(${s.x}px, ${s.y}px)`,
                      transition:
                        "transform 450ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <g
                      className="animate-enter-pop"
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    >
                      <circle cx="2.5" cy="2.5" r="22" fill="#241C15" opacity="0.85" />
                      <circle
                        cx="0"
                        cy="0"
                        r="22"
                        stroke="#241C15"
                        strokeWidth="2.5"
                        strokeDasharray={persistent ? undefined : "5 4"}
                        style={{
                          fill: persistent ? "#1B4B5A" : "#FBEFE3",
                          transition: "fill 350ms ease-out",
                        }}
                      />
                      <text
                        x="0"
                        y="-1"
                        textAnchor="middle"
                        fontFamily="Geist Mono, monospace"
                        fontSize="9"
                        fontWeight="800"
                        letterSpacing="1.1"
                        style={{
                          fill: persistent ? "#FBEFE3" : "#241C15",
                          transition: "fill 350ms ease-out",
                        }}
                      >
                        SUB
                      </text>
                      <text
                        x="0"
                        y="9"
                        textAnchor="middle"
                        fontFamily="Geist Mono, monospace"
                        fontSize="8"
                        fontWeight="700"
                        opacity={persistent ? 0.7 : 0.55}
                        style={{
                          fill: persistent ? "#FBEFE3" : "#241C15",
                          transition: "fill 350ms ease-out",
                        }}
                      >
                        {s.i + 1}
                      </text>
                      {/* 临时态的脉冲点（淡入淡出，不再做 scale 动画避免位置漂移） */}
                      <circle
                        cx="16"
                        cy="-16"
                        r="3.5"
                        fill="#E07A5F"
                        style={{
                          opacity: persistent ? 0 : 1,
                          transition: "opacity 350ms ease-out",
                        }}
                        className={persistent ? undefined : "animate-pulse-dot"}
                      />
                    </g>
                  </g>
                ))}

                {/* 边界标签 */}
                <g style={{ transform: "translate(12px, 18px)" }}>
                  <text
                    fontFamily="Geist Mono, monospace"
                    fontSize="9"
                    letterSpacing="1.6"
                    fill="#241C15"
                    opacity="0.55"
                  >
                    {persistent ? "PERSISTENT POOL" : "EPHEMERAL DISPATCH"}
                  </text>
                </g>
                <g style={{ transform: "translate(12px, 304px)" }}>
                  <text
                    fontFamily="Geist Mono, monospace"
                    fontSize="9"
                    letterSpacing="1.6"
                    fill={comm ? "#E07A5F" : "#241C15"}
                    opacity={comm ? 0.85 : 0.4}
                    style={{ transition: "fill 250ms, opacity 250ms" }}
                  >
                    {comm ? "INTER-SUB CHANNELS · ON" : "INTER-SUB CHANNELS · OFF"}
                  </text>
                </g>
              </svg>

              {/* 图例 */}
              <div className="mt-3 pt-3 border-t-2 border-dashed border-ink/15 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10.5px] text-ink/65">
                <Legend swatchClass="bg-butter border-ink" label="主 Agent" />
                <Legend
                  swatchClass={
                    persistent
                      ? "bg-teal border-ink"
                      : "bg-cream border-ink border-dashed"
                  }
                  label={`子 Agent · ${persistent ? "持久" : "临时"}`}
                />
                <Legend swatchLine label={`子 Agent 互通线 · ${comm ? "ON" : "OFF"}`} dim={!comm} />
                <Legend dashed label="主 → 子 调用线" />
              </div>
            </div>
          </div>
        </div>

        {/* verdict 卡 */}
        <div
          key={`${verdict}-${count}`}
          className={`mt-7 ${verdictCopy.tone} border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-7 animate-enter-up`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ink text-cream flex items-center justify-center">
              <Zap className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase opacity-75 mb-1">
                你刚才搭的这个属于
              </div>
              <div className="font-display font-extrabold text-[28px] lg:text-[32px] leading-[1.15]">
                {verdictCopy.title}
              </div>
              <p className="font-sans text-[15px] leading-[1.7] mt-2 opacity-95">
                {verdictCopy.line}
              </p>
            </div>
          </div>
        </div>

        {/* 浓缩对比表 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <CompareCard
            tone="bg-butter text-ink"
            badge={<Box className="w-3.5 h-3.5" strokeWidth={2.4} />}
            title="SubAgent"
            tagline="主 Agent 临时抓个壮丁，干完一件就散。"
            rows={[
              ["数量", "通常 1，多则并行几个"],
              ["生命周期", "临时，任务结束消失"],
              ["子之间通讯", "不通，都跟主对话讲"],
              ["上手", "低 · 大多框架内置"],
            ]}
            footnote="先把这个玩明白。下面 90% 的实际场景都靠它。"
          />
          <CompareCard
            tone="bg-cream text-ink"
            badge={<Users className="w-3.5 h-3.5" strokeWidth={2.4} />}
            title="Agent Teams"
            tagline="一支长期跑的专业团队，多人会话各干各的。"
            rows={[
              ["数量", "多个角色（Reviewer / Tester …）"],
              ["生命周期", "持久，能跨会话被复用"],
              ["子之间通讯", "互通 · 子 ↔ 子 直接聊"],
              ["上手", "高 · 编排 + 状态共享要自己搭"],
            ]}
            footnote="要先玩明白 SubAgent 再上这个。直接搞容易翻车。"
          />
        </div>

        {/* 跨站入口 → Multi Agent 专站 */}
        <a
          href="../multi-agent/index.html"
          className="mt-8 flex items-start gap-3 max-w-[680px] px-5 py-4 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="w-7 h-7 rounded-full border-2 border-ink flex items-center justify-center shrink-0 bg-cream">
            <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.5} />
          </span>
          <span className="text-[14px] text-ink/80 leading-relaxed">
            想看几个 Agent 怎么分工、有哪几种协作架构、怎么调度
            <span className="font-bold text-ink"> → 去《Multi Agent》专站</span>。
          </span>
        </a>
      </div>
    </section>
  );
};

const KnobBtn: React.FC<{
  active: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}> = ({ active, onClick, title, sub }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-left px-3.5 py-2.5 rounded-2xl border-2 border-ink transition-all duration-250 ease-spring ${
      active
        ? "bg-ink text-cream shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
        : "bg-cream text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
    }`}
  >
    <div className="font-display font-extrabold text-[15.5px] leading-tight">
      {title}
    </div>
    <div
      className={`font-mono text-[10.5px] tracking-[0.05em] mt-0.5 ${active ? "opacity-75" : "text-ink/55"}`}
    >
      {sub}
    </div>
  </button>
);

const Legend: React.FC<{
  label: string;
  swatchClass?: string;
  swatchLine?: boolean;
  dashed?: boolean;
  dim?: boolean;
}> = ({ label, swatchClass, swatchLine, dashed, dim }) => (
  <div className={`inline-flex items-center gap-1.5 transition-opacity ${dim ? "opacity-40" : ""}`}>
    {swatchLine ? (
      <span className="inline-block w-5 h-[3px] bg-coral" />
    ) : dashed ? (
      <span
        className="inline-block w-5 h-0 border-t-2 border-dashed"
        style={{ borderColor: "#241C15" }}
      />
    ) : (
      <span
        className={`inline-block w-3 h-3 rounded-full border-2 ${swatchClass ?? ""}`}
      />
    )}
    <span>{label}</span>
  </div>
);

const CompareCard: React.FC<{
  tone: string;
  badge: React.ReactNode;
  title: string;
  tagline: string;
  rows: [string, string][];
  footnote: string;
}> = ({ tone, badge, title, tagline, rows, footnote }) => (
  <div className={`${tone} border-2 border-ink rounded-3xl shadow-stamp p-6 lg:p-7`}>
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink text-cream rounded-full font-mono text-[10px] tracking-[0.18em] uppercase mb-3">
      {badge}
      {title}
    </div>
    <p className="font-display font-bold text-[18px] leading-snug">{tagline}</p>
    <dl className="mt-4 grid grid-cols-1 gap-2">
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="grid grid-cols-12 gap-2 border-t-2 border-dashed border-ink/20 pt-2 first:border-t-0 first:pt-0"
        >
          <dt className="col-span-4 font-mono text-[11px] tracking-[0.16em] uppercase opacity-65">
            {k}
          </dt>
          <dd className="col-span-8 font-sans text-[13.5px] leading-snug">{v}</dd>
        </div>
      ))}
    </dl>
    <p className="font-serif italic text-[13px] leading-snug mt-4 opacity-80">
      {footnote}
    </p>
  </div>
);

export default SectionVsTeams;
