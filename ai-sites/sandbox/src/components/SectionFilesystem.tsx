/**
 * SectionFilesystem · 文件系统隔离怎么做
 *
 * 主交互（L2 单步 trace）：
 *   - 一段「Claude Code 收到一条写文件请求时的判定流程」
 *   - 用户选一个候选路径 → 单步走判定树 → 看放行 / 拒绝
 *   - 5 个候选路径覆盖：工作目录 / 子目录 / 系统目录 / 敏感目录 / 显式 allowWrite
 *
 * 跟相邻 SectionTwoLines（勾选）拉开 —— 这里是用户控制流程推进。
 */
import React, { useState } from "react";
import { ChevronRight, ChevronLeft, CheckCircle2, XCircle, Cpu } from "lucide-react";

type Path = {
  id: string;
  display: string;
  caption: string;
  decisionIdx: number; // 流程最终落在哪个节点（0-based）
  outcome: "allow" | "deny";
  outcomeReason: string;
};

const PATHS: Path[] = [
  {
    id: "cwd-file",
    display: "~/project/src/index.ts",
    caption: "当前项目目录下的源文件",
    decisionIdx: 1,
    outcome: "allow",
    outcomeReason: "在当前工作目录或其子目录内，默认放行写入。",
  },
  {
    id: "subdir",
    display: "~/project/build/out.js",
    caption: "项目子目录里的构建产物",
    decisionIdx: 1,
    outcome: "allow",
    outcomeReason: "子目录递归继承工作目录权限，依然放行。",
  },
  {
    id: "sensitive",
    display: "~/.ssh/id_rsa",
    caption: "用户根目录的 SSH 私钥",
    decisionIdx: 3,
    outcome: "deny",
    outcomeReason:
      "落在围栏外 + 命中敏感目录黑名单，bwrap 隔离下这个路径在 Agent 视野里压根不存在。",
  },
  {
    id: "system",
    display: "/etc/hosts",
    caption: "系统配置文件",
    decisionIdx: 2,
    outcome: "deny",
    outcomeReason: "围栏外的系统路径，默认只读、写入被 OS 内核拒绝。",
  },
  {
    id: "allowed",
    display: "~/.kube/config",
    caption: "kubectl 配置（已在 allowWrite 白名单）",
    decisionIdx: 4,
    outcome: "allow",
    outcomeReason:
      "你在 sandbox.filesystem.allowWrite 显式加了这条目录 —— 单独开口子。",
  },
];

const STEPS = [
  {
    title: "Agent 发出 write 请求",
    sub: "假设 Agent 已经解析完命令，准备落盘写入指定路径。",
  },
  {
    title: "路径在工作目录里？",
    sub: "在当前 cwd 或其子目录内 → 立即放行；不在 → 进下一步。",
  },
  {
    title: "路径在围栏外？",
    sub: "围栏 = cwd + 显式白名单。围栏外的写请求默认拒绝。",
  },
  {
    title: "路径命中敏感黑名单？",
    sub: "~/.ssh、~/.aws、~/.gnupg 这类路径在 bwrap 视图里直接不挂载。",
  },
  {
    title: "在显式 allowWrite 里？",
    sub: "你在 sandbox.filesystem.allowWrite 配过的目录 → 单独放行。",
  },
  {
    title: "OS 内核做最终裁决",
    sub: "Seatbelt（macOS） / bwrap + Namespace（Linux）执行物理拦截。",
  },
];

const SectionFilesystem: React.FC = () => {
  const [pathId, setPathId] = useState(PATHS[2].id);
  const [cursor, setCursor] = useState(0);
  const path = PATHS.find((p) => p.id === pathId) || PATHS[0];
  const finalStep = Math.min(path.decisionIdx + 1, STEPS.length - 1);
  const atEnd = cursor >= STEPS.length - 1;

  function pick(id: string) {
    setPathId(id);
    setCursor(0);
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">How · 文件系统这条线</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          每条 write 请求，
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">都得过一遍这条判定树</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          下面用 Claude Code 举例；真正挡写入的是操作系统工具 —— Mac 叫 Seatbelt，Linux 叫 bwrap（下一节细讲）。
          它的文件写入规则可以拆成几条：
          当前工作目录及子目录默认可写、围栏外默认拒绝、敏感路径硬黑名单、
          额外目录靠 <code className="font-mono text-[14.5px] text-coral">sandbox.filesystem.allowWrite</code> 单开口子。
          下面挑一条路径，跟着 trace 走一遍。
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：候选路径 + trace 控件 */}
          <div className="lg:col-span-5 space-y-5">
            <div className="card-stamp p-6">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
                假设 Agent 要写以下路径
              </div>
              <div className="space-y-2">
                {PATHS.map((p) => {
                  const active = p.id === pathId;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => pick(p.id)}
                      className={`w-full text-left border-2 border-ink rounded-xl px-4 py-3 transition-all duration-250 ease-spring ${
                        active
                          ? "bg-ink text-cream shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                          : "bg-white text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                      }`}
                    >
                      <div className="font-mono text-[13px] leading-tight">{p.display}</div>
                      <div
                        className={`font-sans text-[12px] mt-0.5 ${
                          active ? "text-cream/65" : "text-ink/55"
                        }`}
                      >
                        {p.caption}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="card-stamp p-5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCursor(Math.max(0, cursor - 1))}
                  disabled={cursor === 0}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-cream border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                  上一步
                </button>
                <span className="font-mono text-[11px] text-ink/55 tracking-[0.18em]">
                  {cursor + 1} / {STEPS.length}
                </span>
                <button
                  type="button"
                  onClick={() => setCursor(Math.min(STEPS.length - 1, cursor + 1))}
                  disabled={atEnd}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-ink text-cream border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  下一步
                  <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-dashed border-ink/20 font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55">
                走完一遍 → 这条路径的最终结论
              </div>
              {cursor >= finalStep && (
                <div
                  key={`${path.id}-outcome`}
                  className={`mt-3 border-2 border-ink rounded-xl px-4 py-3 animate-enter-pop ${
                    path.outcome === "allow" ? "bg-teal text-white" : "bg-pop text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.22em] uppercase mb-1">
                    {path.outcome === "allow" ? (
                      <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                    ) : (
                      <XCircle className="w-4 h-4" strokeWidth={2.5} />
                    )}
                    {path.outcome === "allow" ? "WRITE ALLOWED" : "WRITE DENIED"}
                  </div>
                  <div className="font-sans text-[13px] leading-[1.6]">
                    {path.outcomeReason}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 右：判定流程 trace */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  判定流程 · 单步看
                </span>
                <span className="font-mono text-[11px] text-ink/45">
                  当前路径：{path.display}
                </span>
              </div>

              <div className="space-y-2.5">
                {STEPS.map((step, i) => {
                  const reached = i <= cursor;
                  const isCurrent = i === cursor;
                  const isFinal = i === finalStep && cursor >= finalStep;
                  return (
                    <div
                      key={i}
                      className={`border-2 border-ink rounded-2xl px-5 py-3.5 transition-all duration-300 ease-editorial ${
                        isCurrent
                          ? "bg-butter shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                          : reached
                          ? "bg-white shadow-stamp"
                          : "bg-cream/60 opacity-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/65">
                          STEP {String(i + 1).padStart(2, "0")}
                        </span>
                        {isFinal && (
                          <span className="font-mono text-[10px] tracking-[0.22em] uppercase bg-ink text-cream px-2 py-0.5 rounded-full">
                            决定点
                          </span>
                        )}
                      </div>
                      <div className="font-display font-extrabold text-[16.5px] text-ink leading-tight">
                        {step.title}
                      </div>
                      {reached && (
                        <div className="font-sans text-[13px] leading-[1.6] text-ink/70 mt-1">
                          {step.sub}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* OS 强制洞察 callout */}
        <div className="mt-12 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-3 flex md:justify-center">
            <div className="w-16 h-16 rounded-2xl bg-butter text-ink flex items-center justify-center border-2 border-cream/30">
              <Cpu className="w-8 h-8" strokeWidth={2.2} />
            </div>
          </div>
          <div className="md:col-span-9">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-butter mb-2 font-bold">
              为什么这条线靠得住
            </div>
            <div className="font-display font-extrabold text-[22px] leading-tight mb-3">
              拦截动作不在应用层，在操作系统内核里。
            </div>
            <p className="font-sans text-[14.5px] leading-[1.7] text-cream/85">
              Claude Code 自己拦不住写入 —— 它得告诉操作系统哪些路径不能写；
              Mac（Seatbelt）/ Linux（bwrap）在内核层挡，
              <span className="font-bold text-butter ml-1">
                Agent 绕过程序直接调命令也写不进去。
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFilesystem;
