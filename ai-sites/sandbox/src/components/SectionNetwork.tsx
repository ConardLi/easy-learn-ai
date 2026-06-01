/**
 * SectionNetwork · 网络隔离怎么做（任务模拟器）
 *
 * 主交互（L4）：
 *   - 用户当 Agent，按钮点想发的请求
 *   - 经过代理 → 白名单内直通 / 未知域名弹窗 / 黑名单拒绝
 *   - 右侧实时记录请求日志（带 PASS / ASK / BLOCK 状态）
 *
 * 跟相邻 SectionFilesystem（trace）拉开 —— 这里是开放探索，用户随便点。
 */
import React, { useState } from "react";
import { Send, Check, X, HelpCircle, Trash2, Globe } from "lucide-react";

type Target = {
  id: string;
  url: string;
  intent: string;
  verdict: "pass" | "ask" | "block";
  reason: string;
};

const TARGETS: Target[] = [
  {
    id: "npm",
    url: "registry.npmjs.org",
    intent: "Agent 装一个 npm 包",
    verdict: "pass",
    reason: "命中白名单。代理直接放行，子进程下载也走代理。",
  },
  {
    id: "github-api",
    url: "api.github.com",
    intent: "Agent 调 GitHub API 创 PR",
    verdict: "pass",
    reason: "命中白名单。注意：白名单写的是 api.github.com，不是泛 *.github.com。",
  },
  {
    id: "google-fonts",
    url: "fonts.googleapis.com",
    intent: "拉一段网页字体",
    verdict: "ask",
    reason: "未配置过这个域名 → 弹窗问你「是否允许」，你可以这次允许、永久允许或拒绝。",
  },
  {
    id: "evil",
    url: "evil-collector.com",
    intent: "把 .ssh/id_rsa POST 出去",
    verdict: "block",
    reason: "不在白名单 + 启用了 allowManagedDomainsOnly：拒绝且不弹窗。攻击链当场断。",
  },
  {
    id: "discord-webhook",
    url: "discordapp.com/api/webhooks",
    intent: "把 token 推到一个 Discord webhook",
    verdict: "block",
    reason: "未授权域名 → 拒绝。这是 Prompt 注入最爱的出口之一。",
  },
  {
    id: "subprocess-curl",
    url: "raw.githubusercontent.com",
    intent: "子进程 curl 一段 shell 脚本",
    verdict: "ask",
    reason: "请求走子进程，但代理同样能拦到 —— 因为 Agent 起的所有子进程都被强制走这个代理。",
  },
];

const SectionNetwork: React.FC = () => {
  const [log, setLog] = useState<{ target: Target; at: number }[]>([]);

  function fire(target: Target) {
    setLog((prev) => [{ target, at: Date.now() }, ...prev].slice(0, 12));
  }

  const total = log.length;
  const passed = log.filter((l) => l.target.verdict === "pass").length;
  const asked = log.filter((l) => l.target.verdict === "ask").length;
  const blocked = log.filter((l) => l.target.verdict === "block").length;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">How · 网络这条线</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          所有请求都经过一个代理，
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">域名级精确放行</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          为什么不直接封端口？封了 443 就连 HTTPS 都发不了，太粗暴。
          实际做法是在沙箱外面跑一个代理，
          所有 Agent 请求（包括子进程的）都得走它。
          代理只放行白名单里的域名，其余的弹窗确认或直接拒绝。
          下面你来当一回 Agent，按按钮发请求 —— 看代理怎么判。
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：候选请求 */}
          <div className="lg:col-span-7 space-y-3">
            <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
              你（Agent）想发的请求 · 点一下发出去
            </div>
            {TARGETS.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => fire(t)}
                className="w-full text-left card-stamp px-5 py-4 flex items-center gap-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-stamp-xl transition-all duration-250 ease-spring"
              >
                <div className="w-11 h-11 rounded-2xl bg-cream border-2 border-ink flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-ink" strokeWidth={2.2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[13.5px] text-ink truncate">
                    POST {t.url}
                  </div>
                  <div className="font-sans text-[12.5px] text-ink/65 mt-0.5">
                    {t.intent}
                  </div>
                </div>
                <Verdict v={t.verdict} compact />
              </button>
            ))}
          </div>

          {/* 右：代理 + 日志 */}
          <div className="lg:col-span-5 space-y-5">
            {/* 代理示意 */}
            <div className="card-stamp p-6">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-4">
                代理流转 · 一眼看明白
              </div>
              <div className="space-y-2.5">
                <ProxyRow label="Agent / 子进程" tone="bg-coral text-white" />
                <ProxyArrow />
                <ProxyRow
                  label="代理 · 白名单匹配"
                  tone="bg-ink text-cream"
                  icon={<Globe className="w-4 h-4" strokeWidth={2.4} />}
                />
                <ProxyArrow />
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <Verdict v="pass" />
                  <Verdict v="ask" />
                  <Verdict v="block" />
                </div>
              </div>
            </div>

            {/* 日志 */}
            <div className="card-stamp p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55">
                  请求日志
                </span>
                <button
                  type="button"
                  onClick={() => setLog([])}
                  className="inline-flex items-center gap-1 text-ink/55 hover:text-ink font-mono text-[10px] tracking-[0.18em] uppercase"
                >
                  <Trash2 className="w-3 h-3" strokeWidth={2.5} /> 清空
                </button>
              </div>

              {total === 0 ? (
                <div className="border-2 border-dashed border-ink/30 rounded-xl px-4 py-6 text-center font-mono text-[12px] text-ink/55">
                  还没有请求 · 点左边任意一条试试
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <Stat n={passed} label="放行" tone="text-teal" />
                    <Stat n={asked} label="弹窗" tone="text-coral" />
                    <Stat n={blocked} label="拒绝" tone="text-pop" />
                  </div>
                  <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                    {log.map((entry, i) => (
                      <div
                        key={entry.at + "-" + i}
                        className={`border-2 border-ink rounded-xl px-3 py-2 flex items-start gap-2 ${
                          entry.target.verdict === "pass"
                            ? "bg-teal/10"
                            : entry.target.verdict === "ask"
                            ? "bg-coral/10"
                            : "bg-pop/10"
                        }`}
                      >
                        <Verdict v={entry.target.verdict} dot />
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-[11.5px] text-ink truncate">
                            {entry.target.url}
                          </div>
                          <div className="font-sans text-[11.5px] text-ink/65 mt-0.5 leading-snug">
                            {entry.target.reason}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="font-serif italic text-[14.5px] text-ink/65 mt-8 max-w-[780px]">
          不是一刀切断网 —— npm、GitHub 这些该通的通，陌生域名直接拒。
          再加一句：
          <span className="font-bold text-ink ml-1">
            Agent 起的所有子进程都被强制走代理，没有第二条出口。
          </span>
        </p>
      </div>
    </section>
  );
};

const ProxyRow: React.FC<{ label: string; tone: string; icon?: React.ReactNode }> = ({
  label,
  tone,
  icon,
}) => (
  <div className={`border-2 border-ink rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 ${tone}`}>
    {icon}
    <span className="font-mono text-[11.5px] tracking-[0.18em] uppercase font-bold">
      {label}
    </span>
  </div>
);

const ProxyArrow: React.FC = () => (
  <div className="flex items-center justify-center">
    <svg width="12" height="14" viewBox="0 0 12 14">
      <line x1="6" y1="0" x2="6" y2="10" stroke="#241C15" strokeWidth="2" />
      <path d="M 2 8 L 6 14 L 10 8" fill="none" stroke="#241C15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const Verdict: React.FC<{ v: Target["verdict"]; compact?: boolean; dot?: boolean }> = ({ v, compact, dot }) => {
  const map = {
    pass: { label: "PASS", icon: <Check className="w-3 h-3" strokeWidth={3} />, tone: "bg-teal text-white" },
    ask: { label: "ASK", icon: <HelpCircle className="w-3 h-3" strokeWidth={2.5} />, tone: "bg-coral text-white" },
    block: { label: "BLOCK", icon: <X className="w-3 h-3" strokeWidth={3} />, tone: "bg-pop text-white" },
  };
  const c = map[v];

  if (dot) {
    return (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${c.tone} flex-shrink-0 border-2 border-ink`}>
        {c.icon}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase font-bold border-2 border-ink flex-shrink-0 ${c.tone}`}
    >
      {c.icon}
      {!compact && c.label}
      {compact && c.label}
    </div>
  );
};

const Stat: React.FC<{ n: number; label: string; tone: string }> = ({ n, label, tone }) => (
  <div className="bg-white border-2 border-ink rounded-xl py-2 text-center">
    <div className={`font-display font-extrabold text-[20px] leading-none ${tone}`}>{n}</div>
    <div className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-ink/55 mt-1">{label}</div>
  </div>
);

export default SectionNetwork;
