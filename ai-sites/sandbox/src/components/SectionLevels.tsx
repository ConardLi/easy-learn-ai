/**
 * SectionLevels · 4 级隔离对比
 *
 * 主交互（L1 hover + L2 选中）：
 *   - 4 个方案横向 SVG 表（Docker / bwrap / gVisor / Firecracker）
 *   - 每列一根柱，柱高 = 隔离强度；hover 展开详情
 *   - 顶部一条强度刻度（共享内核 → 用户空间内核 → 独立内核 → 硬件隔离）
 *   - 底部决策建议
 *
 * 跟相邻 SectionOSImpl（pill）拉开 —— 这里是横向多方案 + SVG 表，
 * 整体感觉是一张「评测图」。
 */
import React, { useState } from "react";
import { Server, ShieldCheck, AlertTriangle, Cpu } from "lucide-react";

type Level = {
  id: string;
  name: string;
  subtitle: string;
  kernel: string;
  isolation: number; // 1-4
  startTime: string;
  bestFor: string;
  detail: string;
  cost: string;
  color: string;
  textOn: string;
};

const LEVELS: Level[] = [
  {
    id: "docker",
    name: "Docker",
    subtitle: "容器 · 共享内核",
    kernel: "共享宿主机内核",
    isolation: 1,
    startTime: "毫秒级",
    bestFor: "可信代码 · 应用打包分发",
    detail:
      "Docker 主要是为「环境一致性」做的，不是为「不可信代码隔离」做的。安全边界依赖上面三件套（namespace + cgroup + capabilities）共享宿主内核，内核漏洞一旦命中就能逃逸。",
    cost: "近乎零",
    color: "#FBE891",
    textOn: "#241C15",
  },
  {
    id: "bwrap",
    name: "bwrap",
    subtitle: "Namespace · 共享内核",
    kernel: "共享宿主机内核",
    isolation: 2,
    startTime: "毫秒级",
    bestFor: "单用户 Agent（如 Claude Code）",
    detail:
      "比 Docker 更精细的 namespace 配置，可以剥到 Agent 看不到任何敏感目录、关掉网络。但底层还是宿主内核，多租户场景下风险跟 Docker 同级。",
    cost: "近乎零",
    color: "#F4D35E",
    textOn: "#241C15",
  },
  {
    id: "gvisor",
    name: "gVisor",
    subtitle: "用户空间迷你内核",
    kernel: "Sentry · 用户态内核",
    isolation: 3,
    startTime: "毫秒级",
    bestFor: "多租户 SaaS · CI/CD 代码执行",
    detail:
      "Google 开源。Sentry 在用户空间实现一份「迷你内核」，拦截所有系统调用。宿主内核只看到 gVisor 的极少量调用，攻击面大幅缩小。",
    cost: "I/O 密集任务 10%-30% 损耗",
    color: "#E07A5F",
    textOn: "#FBEFE3",
  },
  {
    id: "firecracker",
    name: "Firecracker",
    subtitle: "MicroVM · 独立内核",
    kernel: "独立 Linux 内核 + KVM",
    isolation: 4,
    startTime: "~125 ms",
    bestFor: "多租户 Agent · 不可信代码执行",
    detail:
      "AWS 开源。每个沙箱是独立 MicroVM，要逃逸先攻破 Guest 内核再攻破 Hypervisor，难度指数级上升。启动 ~125ms、内存开销 < 5MB。",
    cost: "启动开销 + 内存常驻",
    color: "#1B4B5A",
    textOn: "#FBEFE3",
  },
];

const ISOLATION_LABELS: Record<number, string> = {
  1: "进程级",
  2: "进程级 +",
  3: "系统调用拦截",
  4: "硬件级 · MicroVM",
};

const SectionLevels: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>("bwrap");
  const cur = LEVELS.find((l) => l.id === hovered) || LEVELS[1];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">Stronger · 不够用怎么办</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          隔离也分等级 ——
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">四档，从够用到防御不可信代码</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[820px]">
          bwrap 和 Seatbelt 单用户场景够用，但
          共享内核的方案，万一内核本身有 bug，理论上可能被突破 —— 所以多租户、不可信代码场景才上更强的方案。
          下面四个方案从弱到强排开，把柱子 hover 一下看每档的实际形态。
        </p>

        {/* 三个名词的白话框 */}
        <div className="mt-6 max-w-[820px] grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="border-2 border-ink rounded-2xl bg-cream px-4 py-3">
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-coral font-bold mb-1">namespace</div>
            <p className="font-sans text-[13px] leading-[1.55] text-ink/80">
              让进程只看到一部分文件 / 网络。
            </p>
          </div>
          <div className="border-2 border-ink rounded-2xl bg-cream px-4 py-3">
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-coral font-bold mb-1">cgroup</div>
            <p className="font-sans text-[13px] leading-[1.55] text-ink/80">
              限制进程能用多少 CPU / 内存。
            </p>
          </div>
          <div className="border-2 border-ink rounded-2xl bg-cream px-4 py-3">
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-coral font-bold mb-1">capabilities</div>
            <p className="font-sans text-[13px] leading-[1.55] text-ink/80">
              限制进程能做哪些系统级操作。
            </p>
          </div>
        </div>

        {/* ─── 主体：4 列柱状对比图 ─── */}
        <div className="mt-12 card-stamp p-6 lg:p-8">
          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
              隔离强度 · 从左到右递增
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
              hover 看细节
            </span>
          </div>

          {/* 柱状图 SVG */}
          <svg viewBox="0 0 720 280" className="w-full h-auto" aria-hidden>
            {/* y 轴 4 档参考线 */}
            {[1, 2, 3, 4].map((tier) => {
              const y = 220 - tier * 42;
              return (
                <g key={tier}>
                  <line
                    x1="80"
                    y1={y}
                    x2="700"
                    y2={y}
                    stroke="#241C15"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    opacity="0.18"
                  />
                  <text
                    x="72"
                    y={y + 3.5}
                    textAnchor="end"
                    fontFamily="Geist Mono, monospace"
                    fontSize="9.5"
                    fill="#88837C"
                  >
                    {ISOLATION_LABELS[tier]}
                  </text>
                </g>
              );
            })}

            {/* 4 根柱 */}
            {LEVELS.map((lv, i) => {
              const colWidth = 620 / LEVELS.length;
              const cx = 80 + i * colWidth + colWidth / 2;
              const barW = 78;
              const barH = lv.isolation * 42;
              const barY = 220 - barH;
              const isHover = hovered === lv.id;
              return (
                <g
                  key={lv.id}
                  onMouseEnter={() => setHovered(lv.id)}
                  onClick={() => setHovered(lv.id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* 透明 hover 区 */}
                  <rect
                    x={cx - colWidth / 2 + 6}
                    y="20"
                    width={colWidth - 12}
                    height="240"
                    fill="transparent"
                  />
                  {/* 阴影 */}
                  <rect
                    x={cx - barW / 2 + 3}
                    y={barY + 3}
                    width={barW}
                    height={barH}
                    rx="6"
                    fill="#241C15"
                    opacity="0.85"
                  />
                  {/* 主柱 */}
                  <rect
                    x={cx - barW / 2}
                    y={barY}
                    width={barW}
                    height={barH}
                    rx="6"
                    fill={lv.color}
                    stroke="#241C15"
                    strokeWidth={isHover ? "3" : "2"}
                    style={{ transition: "all 250ms cubic-bezier(0.22,1,0.36,1)" }}
                  />
                  {/* 柱顶圆环 */}
                  <circle
                    cx={cx}
                    cy={barY}
                    r="10"
                    fill="#FBEFE3"
                    stroke="#241C15"
                    strokeWidth="2"
                  />
                  <text
                    x={cx}
                    y={barY + 3.5}
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="10"
                    fontWeight="800"
                    fill="#241C15"
                  >
                    L{lv.isolation}
                  </text>

                  {/* 柱内大字 */}
                  {barH >= 60 && (
                    <text
                      x={cx}
                      y={barY + barH / 2 + 4}
                      textAnchor="middle"
                      fontFamily='"Plus Jakarta Sans", "Noto Sans SC", sans-serif'
                      fontSize="13"
                      fontWeight="800"
                      fill={lv.textOn}
                    >
                      {lv.name}
                    </text>
                  )}

                  {/* 柱下方标签 */}
                  <text
                    x={cx}
                    y="244"
                    textAnchor="middle"
                    fontFamily='"Plus Jakarta Sans", "Noto Sans SC", sans-serif'
                    fontSize="12"
                    fontWeight="800"
                    fill="#241C15"
                  >
                    {lv.name}
                  </text>
                  <text
                    x={cx}
                    y="258"
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="9"
                    fontWeight="600"
                    fill="#88837C"
                  >
                    {lv.subtitle}
                  </text>

                  {/* hover 高亮：上方小三角指示 */}
                  {isHover && (
                    <g transform={`translate(${cx},${barY - 18})`}>
                      <path d="M -6 0 L 6 0 L 0 8 Z" fill="#241C15" />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* hover 详情卡 */}
          <div
            key={cur.id}
            className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 border-2 border-ink rounded-2xl p-5 bg-cream animate-enter-fade"
          >
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 font-bold mb-2">
                <Server className="w-3.5 h-3.5" strokeWidth={2.5} />
                Detail · {cur.name}
              </div>
              <div className="font-display font-extrabold text-[20px] text-ink leading-tight mb-2">
                {cur.subtitle}
              </div>
              <p className="font-sans text-[13.5px] leading-[1.65] text-ink/75">
                {cur.detail}
              </p>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 gap-3">
              <Fact label="内核形态" value={cur.kernel} icon={<Cpu className="w-3.5 h-3.5" strokeWidth={2.5} />} />
              <Fact label="启动速度" value={cur.startTime} />
              <Fact label="性能开销" value={cur.cost} />
              <Fact label="典型场景" value={cur.bestFor} />
            </div>
          </div>
        </div>

        {/* 决策建议 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Pick
            tone="bg-butter text-ink"
            icon={<ShieldCheck className="w-5 h-5" strokeWidth={2.4} />}
            head="自用 · 本地 Agent"
            sub="bwrap / Seatbelt 够用"
            body="单用户 Agent（如本机的 Claude Code），共享内核 + namespace 已经能挡住绝大多数 Prompt 注入和恶意脚本。"
          />
          <Pick
            tone="bg-ink text-cream"
            icon={<AlertTriangle className="w-5 h-5 text-pop" strokeWidth={2.4} />}
            head="服务多人 · 多租户"
            sub="至少 gVisor · 理想 Firecracker"
            body="跑别人写的、可能不可信的代码，bwrap 的共享内核就不够了。gVisor 是性价比平衡点，Firecracker 是上限。"
          />
        </div>
      </div>
    </section>
  );
};

const Fact: React.FC<{ label: string; value: string; icon?: React.ReactNode }> = ({
  label,
  value,
  icon,
}) => (
  <div className="bg-white border-2 border-ink rounded-xl px-3.5 py-2.5">
    <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-ink/55 mb-1">
      {icon}
      {label}
    </div>
    <div className="font-sans text-[13px] font-bold text-ink leading-snug">{value}</div>
  </div>
);

const Pick: React.FC<{
  tone: string;
  icon: React.ReactNode;
  head: string;
  sub: string;
  body: string;
}> = ({ tone, icon, head, sub, body }) => (
  <div className={`border-2 border-ink rounded-3xl shadow-stamp-lg p-6 ${tone}`}>
    <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.22em] uppercase opacity-80 mb-2 font-bold">
      {icon}
      {head}
    </div>
    <div className="font-display font-extrabold text-[20px] leading-tight mb-2">
      {sub}
    </div>
    <p className="font-sans text-[13.5px] leading-[1.7] opacity-90">{body}</p>
  </div>
);

export default SectionLevels;
