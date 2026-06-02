/**
 * Section 06 · Auto 模式 + 分类器
 *
 * 主交互（L3 勾选）：选一类操作，看 Claude Code 的分类器怎么判
 *   - 6 个操作类别（chip）
 *   - 实时显示「直通 / 弹窗确认 / 拦截」三档结论
 *   - 兜底：连续拦 3 次 / 累计 20 次 → 自动降级
 *
 * 视觉：左侧 6 个开关，右侧仪表盘式结论卡。跟 Default 的「审批列表」拉开。
 */
import React, { useMemo, useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldX, AlarmClock, ExternalLink } from "lucide-react";

type Op = {
  id: string;
  label: string;
  hint: string;
  verdict: "pass" | "ask" | "block";
  reason: string;
};

const OPS: Op[] = [
  {
    id: "read",
    label: "读文件 / git status",
    hint: "纯读取，无副作用",
    verdict: "pass",
    reason: "分类器判定为只读操作，直通 —— 不打扰你。",
  },
  {
    id: "write",
    label: "改一个普通源文件",
    hint: "src/components/Foo.tsx 增删几行",
    verdict: "pass",
    reason: "在工作目录内、非受保护路径，Auto 模式直接写。",
  },
  {
    id: "rm",
    label: "rm -rf 一个目录",
    hint: "Agent 想删 src/legacy/",
    verdict: "ask",
    reason: "rm 不可逆，分类器吃不准 → 弹窗让你过目。",
  },
  {
    id: "curl",
    label: "curl | bash 一段网络脚本",
    hint: "从外网拉 install.sh 直接执行",
    verdict: "block",
    reason: "供应链高风险 —— 默认拦截，需明确放行。",
  },
  {
    id: "force-push",
    label: "git push --force 到 main",
    hint: "重写主分支历史",
    verdict: "block",
    reason: "主分支受保护 + 强制 push 双红线，拦截。",
  },
  {
    id: "env",
    label: "读写 .env / .git/config",
    hint: "触碰受保护路径",
    verdict: "ask",
    reason: ".env、.git/* 永远需审批 —— 哪怕你说全放开。",
  },
];

type Verdict = "pass" | "ask" | "block";

const META: Record<
  Verdict,
  { label: string; color: string; textOn: string; icon: React.ReactNode }
> = {
  pass: {
    label: "直通",
    color: "#F4D35E",
    textOn: "#241C15",
    icon: <ShieldCheck className="w-5 h-5" strokeWidth={2.4} />,
  },
  ask: {
    label: "弹窗确认",
    color: "#E07A5F",
    textOn: "#FBEFE3",
    icon: <ShieldAlert className="w-5 h-5" strokeWidth={2.4} />,
  },
  block: {
    label: "拦截",
    color: "#FF4D74",
    textOn: "#FBEFE3",
    icon: <ShieldX className="w-5 h-5" strokeWidth={2.4} />,
  },
};

const SectionAutoMode: React.FC = () => {
  const [picked, setPicked] = useState<Record<string, boolean>>({
    rm: true,
    curl: true,
  });

  const toggle = (id: string) =>
    setPicked((p) => ({ ...p, [id]: !p[id] }));

  const stats = useMemo(() => {
    const list = OPS.filter((o) => picked[o.id]);
    const blocks = list.filter((o) => o.verdict === "block").length;
    const asks = list.filter((o) => o.verdict === "ask").length;
    const passes = list.filter((o) => o.verdict === "pass").length;
    return { list, blocks, asks, passes };
  }, [picked]);

  const downgrade = stats.blocks >= 3;

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Auto · 放开手，让它飞</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          Auto 不等于{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-pop/40 -z-0" />
            <span className="relative z-10">无脑放行</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          Claude Code 的 Auto 背后有一个独立的 AI 分类器：每个操作执行前先评一次风险。
          安全的直通，可疑的弹审批，红线的直接拦。
          <strong className="text-ink"> 就像后台站了个安全员 </strong>
          ，只在它也吃不准时才打断你。Codex CLI 的 Full Access 更激进、OpenCode 用全局
          allow + 单独 deny，各家味道不同，但思路相通。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* 左：操作勾选 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-5 lg:p-6 bg-white">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-4">
                勾上 Agent 想做的操作 · 看分类器怎么判
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OPS.map((o) => {
                  const on = !!picked[o.id];
                  const m = META[o.verdict];
                  return (
                    <button
                      type="button"
                      key={o.id}
                      onClick={() => toggle(o.id)}
                      className={`text-left flex items-start gap-3 p-3.5 rounded-2xl border-2 border-ink transition-all duration-200 ease-spring ${
                        on
                          ? "bg-ink text-cream shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                          : "bg-cream text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded border-2 border-ink flex items-center justify-center font-mono text-[11px] font-bold ${
                          on ? "bg-butter text-ink" : "bg-white text-ink/0"
                        }`}
                      >
                        ✓
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-extrabold text-[14.5px] leading-tight">
                          {o.label}
                        </div>
                        <div
                          className={`font-mono text-[11px] tracking-[0.06em] leading-[1.45] mt-1 ${
                            on ? "text-cream/65" : "text-ink/55"
                          }`}
                        >
                          {o.hint}
                        </div>
                        {on && (
                          <div
                            className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full border border-cream/45 font-mono text-[10px] tracking-[0.16em] uppercase font-bold"
                            style={{ color: m.color }}
                          >
                            {m.label}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右：分类器结论 */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border-2 border-ink bg-cream p-5 lg:p-6 shadow-stamp-lg">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-3">
                Claude Code · 分类器仪表盘
              </div>

              <div className="grid grid-cols-3 gap-2 mb-5">
                {(["pass", "ask", "block"] as Verdict[]).map((v) => {
                  const count =
                    v === "pass"
                      ? stats.passes
                      : v === "ask"
                      ? stats.asks
                      : stats.blocks;
                  const m = META[v];
                  return (
                    <div
                      key={v}
                      className="rounded-2xl border-2 border-ink p-2.5 text-center"
                      style={{ backgroundColor: m.color, color: m.textOn }}
                    >
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        {m.icon}
                      </div>
                      <div className="font-display font-extrabold text-[22px] leading-none">
                        {count}
                      </div>
                      <div
                        className="font-mono text-[9.5px] tracking-[0.18em] uppercase mt-1"
                        style={{ opacity: 0.85 }}
                      >
                        {m.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 单条解释 */}
              <div className="space-y-2.5 max-h-[180px] overflow-y-auto">
                {stats.list.length === 0 ? (
                  <p className="font-sans text-[13.5px] leading-[1.65] text-ink/55 italic">
                    左边勾几个操作试试 —— 看分类器分别怎么判。
                  </p>
                ) : (
                  stats.list.map((o) => {
                    const m = META[o.verdict];
                    return (
                      <div
                        key={o.id}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white border-2 border-ink/15"
                      >
                        <span
                          className="flex-shrink-0 font-mono text-[10px] tracking-[0.18em] uppercase font-bold px-2 py-0.5 rounded border-2 border-ink"
                          style={{ backgroundColor: m.color, color: m.textOn }}
                        >
                          {m.label}
                        </span>
                        <span className="font-sans text-[13px] leading-[1.55] text-ink/80">
                          {o.reason}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* 兜底告警 */}
              {downgrade && (
                <div
                  key="downgrade"
                  className="mt-5 p-4 rounded-2xl border-2 border-ink bg-ink text-cream animate-enter-up"
                >
                  <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.2em] uppercase text-pop mb-1">
                    <AlarmClock className="w-4 h-4" strokeWidth={2.4} />
                    自动降级
                  </div>
                  <p className="font-sans text-[13.5px] leading-[1.65]">
                    分类器已连续拦截 ≥ 3 次（累计 20 次也触发） ——
                    <strong> Auto 模式自动退回 Default 手动审批 </strong>
                    ，等你确认风险后再切回来。
                  </p>
                </div>
              )}
            </div>

            {/* 各家路线 */}
            <div className="mt-5 grid grid-cols-1 gap-3">
              <div className="p-4 rounded-2xl border-2 border-ink bg-butter">
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1">
                  Codex CLI · Full Access
                </div>
                <p className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                  更激进：移除大部分审批。OpenAI 自己建议「只在一次性沙箱、Docker
                  容器、实验分支用」。
                </p>
              </div>
              <div className="p-4 rounded-2xl border-2 border-ink bg-teal text-cream">
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-cream/65 mb-1">
                  OpenCode · 全局 allow + 单独 deny
                </div>
                <p className="font-sans text-[13.5px] leading-[1.6] text-cream/90">
                  整体放开但单独锁 rm —— 大面放开、重点卡住，日常很好用。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 互链卡：Auto 放手 → 配一道围栏（Agent 沙箱站，vs） */}
        <a
          href="../agent-sandbox/index.html"
          className="mt-10 flex items-start gap-3 max-w-[820px] px-4 py-3.5 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
          </span>
          <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
            <span className="font-bold text-ink">Auto 档放开手脚，最好配一道围栏 →《Agent 沙箱》</span>
            <span className="text-ink/65">
              {" "}
              上面 Codex Full Access 说的「只在沙箱里用」就是它 —— 那站讲就算每步都点了允许，Agent 还能碰哪些文件、连哪些网。
            </span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default SectionAutoMode;
