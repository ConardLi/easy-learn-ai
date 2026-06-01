/**
 * SectionApprovalFatigue · 审批疲劳现场
 *
 * 主交互（L3 slider）：
 *   - 滑条调「已弹窗的命令数」0→25
 *   - 实时显示：用户当前的反应（仔细看 / 扫一眼 / 直接点 / 全选允许）
 *   - 弹窗瀑布可视化：前几条原文展开，后面坍缩成「YES」连点
 *
 * 目的：让用户摸到「权限弹窗扛不住高频」，引出沙箱的存在意义。
 */
import React, { useMemo, useState } from "react";
import { CheckCircle2, MousePointerClick, Eye, EyeOff } from "lucide-react";

type Reaction = {
  threshold: number;
  label: string;
  desc: string;
  tone: string;
  icon: React.ReactNode;
};

const REACTIONS: Reaction[] = [
  {
    threshold: 0,
    label: "认真看",
    desc: "第一条弹窗 —— 还会把命令文本读完，想想这命令是不是真的需要跑。",
    tone: "bg-teal text-white",
    icon: <Eye className="w-4 h-4" strokeWidth={2.4} />,
  },
  {
    threshold: 3,
    label: "扫一眼",
    desc: "前几条还能注意到命令名（npm install / git status），不太看参数了。",
    tone: "bg-butter text-ink",
    icon: <Eye className="w-4 h-4" strokeWidth={2.4} />,
  },
  {
    threshold: 8,
    label: "直接点",
    desc: "命令文本糊成一团。看到弹窗就 Enter，注意力切到等待 Agent 干完上。",
    tone: "bg-coral text-white",
    icon: <MousePointerClick className="w-4 h-4" strokeWidth={2.4} />,
  },
  {
    threshold: 16,
    label: "全选允许",
    desc: "找到「全部允许」勾上 —— 从此弹窗等于没开，等于 Agent 在你整台电脑上裸奔（还没进沙箱那种）。",
    tone: "bg-pop text-white",
    icon: <EyeOff className="w-4 h-4" strokeWidth={2.4} />,
  },
];

const COMMAND_POOL = [
  "npm install",
  "git status",
  "ls -la src/",
  "cat package.json",
  "node ./scripts/seed.ts",
  "rm -rf .next/",
  "curl https://api.github.com",
  "pnpm test",
  "git add .",
  "git commit -m 'wip'",
  "git push origin main",
  "psql -c 'SELECT 1'",
  "docker ps",
  "open ./dist",
  "tsc --noEmit",
  "rg TODO src/",
  "git pull --rebase",
  "git diff HEAD~1",
  "kubectl get pods",
  "redis-cli ping",
  "ssh dev-server",
  "curl https://npm.registry.org",
  "node -v",
  "git log --oneline",
  "echo done",
];

const SectionApprovalFatigue: React.FC = () => {
  const [count, setCount] = useState(6);

  const reaction = useMemo(() => {
    let cur = REACTIONS[0];
    for (const r of REACTIONS) {
      if (count >= r.threshold) cur = r;
    }
    return cur;
  }, [count]);

  const visibleCmds = COMMAND_POOL.slice(0, Math.min(count, COMMAND_POOL.length));

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Why · 为什么不能光靠弹窗</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          每条命令弹一次窗，
          <br />
          十次之后，
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">你不看了</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          沙箱出现前，主流方案是权限弹窗：Agent 想跑一条命令，系统弹个框「允许执行 npm install 吗？」 ——
          一两次没问题，几十次之后人脑就放弃了。
          这种「人审批兜底」的机制，业内叫{" "}
          <span className="font-bold text-ink">审批疲劳（Approval Fatigue）</span>。
          下面拖一下滑条，看看自己撑得住几条。
        </p>

        {/* ─── 主交互：审批疲劳模拟器 ─── */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：控制 + 状态 */}
          <div className="lg:col-span-5 space-y-5">
            <div className="card-stamp p-6">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
                已弹窗的命令数
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-display font-extrabold text-[38px] text-ink leading-none">
                  {count}
                </span>
                <span className="font-mono text-[12px] text-ink/55">/ {COMMAND_POOL.length}</span>
              </div>
              <input
                type="range"
                min={0}
                max={COMMAND_POOL.length}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer mt-2"
              />
              <div className="flex justify-between mt-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-ink/45">
                <span>认真看</span>
                <span>扫一眼</span>
                <span>直接点</span>
                <span>全允许</span>
              </div>
            </div>

            <div key={reaction.label} className={`border-2 border-ink rounded-3xl p-6 shadow-stamp-lg ${reaction.tone} animate-enter-up`}>
              <div className="flex items-center gap-2 mb-2 font-mono text-[10.5px] tracking-[0.22em] uppercase opacity-80">
                {reaction.icon} 你现在的反应
              </div>
              <div className="font-display font-extrabold text-[26px] leading-tight mb-2">
                {reaction.label}
              </div>
              <p className="font-sans text-[14.5px] leading-[1.7] opacity-90">
                {reaction.desc}
              </p>
            </div>
          </div>

          {/* 右：弹窗瀑布 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-6 h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  弹窗历史
                </span>
                <span className="font-mono text-[11px] text-ink/45">
                  全部点了「允许」
                </span>
              </div>

              {count === 0 ? (
                <div className="border-2 border-dashed border-ink/30 rounded-2xl p-12 text-center">
                  <div className="font-display font-extrabold text-[28px] text-ink/30 mb-2">
                    NO PROMPT YET
                  </div>
                  <div className="font-mono text-[12px] text-ink/50">
                    拖一下左边滑条 · 看看弹窗叠起来什么样
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-[440px] overflow-y-auto pr-2">
                  {visibleCmds.map((cmd, i) => {
                    // 前 3 条展开，3-8 半坍缩，8 后只看到命令名头一截 + YES
                    const expanded = i < 3;
                    const collapsed = i >= 8;
                    return (
                      <div
                        key={i}
                        className={`border-2 border-ink rounded-xl overflow-hidden bg-white ${
                          collapsed ? "py-1.5 px-3 flex items-center justify-between" : ""
                        }`}
                      >
                        {!collapsed && (
                          <>
                            <div className="bg-butter/60 px-3.5 py-1.5 flex items-center justify-between border-b-2 border-ink">
                              <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-ink/70">
                                Prompt #{String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal text-white font-mono text-[10px] tracking-[0.18em] uppercase rounded-full">
                                <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} /> 允许
                              </span>
                            </div>
                            <div className={`px-3.5 py-2 ${expanded ? "" : "py-1.5"}`}>
                              <div className="font-mono text-[13px] text-ink leading-snug">
                                $ {cmd}
                              </div>
                              {expanded && (
                                <div className="font-sans text-[12px] text-ink/55 mt-1 leading-snug">
                                  允许 Agent 执行这条命令吗？
                                </div>
                              )}
                            </div>
                          </>
                        )}
                        {collapsed && (
                          <>
                            <span className="font-mono text-[12px] text-ink/75 truncate">
                              $ {cmd}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-pop text-white font-mono text-[9.5px] tracking-[0.18em] uppercase rounded-full ml-2 flex-shrink-0">
                              YES
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 收尾 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1080px]">
          <Stat n="1" label="还看内容" caption="第一条弹窗，你会读完" />
          <Stat n="5" label="扫命令名" caption="只确认是不是常用工具" />
          <Stat n="15+" label="全选允许" caption="安全机制等同摆设" />
        </div>
        <p className="font-serif italic text-[15px] text-ink/70 mt-7 max-w-[780px]">
          权限弹窗本身没问题，问题是它把决定权完全交给了人脑。
          注意力会衰减，弹窗就会失效。沙箱换了个思路 —— 与其每次问一次，
          不如提前圈一块「随便干都不会出事」的地方。
        </p>
      </div>
    </section>
  );
};

const Stat: React.FC<{ n: string; label: string; caption: string }> = ({ n, label, caption }) => (
  <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5">
    <div className="font-display font-extrabold text-[32px] text-ink leading-none">{n}</div>
    <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-coral mt-2 font-bold">
      {label}
    </div>
    <div className="font-sans text-[13.5px] text-ink/70 mt-1.5 leading-snug">
      {caption}
    </div>
  </div>
);

export default SectionApprovalFatigue;
