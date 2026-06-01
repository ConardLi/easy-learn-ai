/**
 * SectionTwoLines · 两条隔离线必须同时做
 *
 * 主交互（L3 勾选组合）：
 *   - 两个开关：[文件系统隔离] [网络隔离]
 *   - 4 种组合状态，分别显示对应漏洞
 *
 * 跟相邻 SectionApprovalFatigue（slider）拉开 —— 切换组合 + 漏洞演示。
 */
import React, { useState } from "react";
import { Lock, Wifi, ShieldCheck, AlertTriangle } from "lucide-react";

type ComboResult = {
  status: "safe" | "leak" | "tamper" | "naked";
  title: string;
  body: string;
  bullets: string[];
  tone: string;
  badgeText: string;
};

function getResult(fs: boolean, net: boolean): ComboResult {
  if (fs && net) {
    return {
      status: "safe",
      title: "两条线都在，攻击链断在第一步",
      body:
        "rm -rf 写不进围栏外，外泄请求被代理拦下。Prompt 注入即使读到了恶意指令，也没有可执行的破坏面。",
      bullets: [
        "写入仅限当前工作目录",
        "外部域名一律走白名单",
        "敏感路径在 Agent 视野里不存在",
      ],
      tone: "bg-teal text-white",
      badgeText: "SAFE",
    };
  }
  if (fs && !net) {
    return {
      status: "leak",
      title: "文件锁住了，密钥还能从网络出去",
      body:
        "你的 .ssh / .aws 密钥不会被改，但 Agent 还能联网，把内容 POST 到外部网站，一样泄露。",
      bullets: [
        "Agent 仍能 curl 任意外部 URL",
        "SSH 私钥 / API token 可被打包上传",
        "DNS 隧道、Webhook 都是出口",
      ],
      tone: "bg-coral text-white",
      badgeText: "DATA LEAK",
    };
  }
  if (!fs && net) {
    return {
      status: "tamper",
      title: "网络拦住了，本机文件可以随便改",
      body:
        "出口虽然封了，Agent 还能往 .bashrc 里埋一行反弹 Shell。\n.bashrc = 你每次开终端都会自动跑的配置文件，改它等于装开机后门；反弹 Shell = 让你的电脑主动连回攻击者机器。\n下次你开终端，攻击链自动启动 —— 数据不一定外泄，但开机后门已经种好。",
      bullets: [
        "可改写 .bashrc / .zshrc / launchd plist（开机/开终端自动跑的脚本）",
        "可往 $PATH（系统找命令的目录列表）丢同名恶意可执行文件，劫持你平时用的 git / npm",
        "可读 .ssh、.kube、.aws 全量凭证",
      ],
      tone: "bg-pop text-white",
      badgeText: "PERSISTENCE",
    };
  }
  return {
    status: "naked",
    title: "两条都没开 = Agent 权限跟你本人一样",
    body:
      "恶意指令来了，弹窗你也点习惯了，拦不住。Agent 的权限就是你这个用户的权限。注入一条指令，等于让人坐在你电脑前敲命令。",
    bullets: [
      "rm -rf ~/ 直接生效",
      "私钥可读、可改、可外发",
      "可装持久化后门 + 关闭审计日志",
    ],
    tone: "bg-ink text-cream",
    badgeText: "NAKED",
  };
}

const SectionTwoLines: React.FC = () => {
  const [fs, setFs] = useState(true);
  const [net, setNet] = useState(true);
  const result = getResult(fs, net);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">What · 沙箱做哪两件事</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[840px]">
          文件 + 网络两条隔离线，
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">少一条就有漏洞</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          沙箱要管两件事：
          <span className="font-bold text-ink">文件系统隔离</span>（能读哪些文件、能写哪些目录），
          和 <span className="font-bold text-ink">网络隔离</span>（能访问哪些域名、能不能联网）。
          两件事必须同时做。
          下面四种组合点一下，看看少哪条都会留什么后门。
        </p>

        {/* ─── 主交互：勾选组合 + 漏洞演示 ─── */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：两个开关 + 状态矩阵 */}
          <div className="lg:col-span-5 space-y-5">
            <Toggle
              icon={<Lock className="w-5 h-5" strokeWidth={2.4} />}
              label="文件系统隔离"
              caption="控制能读写哪些路径"
              on={fs}
              onChange={() => setFs(!fs)}
            />
            <Toggle
              icon={<Wifi className="w-5 h-5" strokeWidth={2.4} />}
              label="网络隔离"
              caption="控制能访问哪些域名"
              on={net}
              onChange={() => setNet(!net)}
            />

            {/* 2×2 状态矩阵 */}
            <div className="card-stamp p-5">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
                组合矩阵
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { f: true, n: true },
                  { f: true, n: false },
                  { f: false, n: true },
                  { f: false, n: false },
                ].map((cell, i) => {
                  const active = cell.f === fs && cell.n === net;
                  const cellResult = getResult(cell.f, cell.n);
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => {
                        setFs(cell.f);
                        setNet(cell.n);
                      }}
                      className={`text-left border-2 border-ink rounded-xl p-3 transition-all duration-300 ease-spring ${
                        active
                          ? `${cellResult.tone} shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]`
                          : "bg-white shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase opacity-75">
                        <span>文件 {cell.f ? "✓" : "✗"}</span>
                        <span>·</span>
                        <span>网络 {cell.n ? "✓" : "✗"}</span>
                      </div>
                      <div className="font-mono text-[10.5px] mt-1.5 font-bold tracking-[0.18em]">
                        {cellResult.badgeText}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右：漏洞演示 */}
          <div className="lg:col-span-7">
            <div
              key={`${fs}-${net}`}
              className={`border-2 border-ink rounded-3xl shadow-stamp-lg p-7 lg:p-8 ${result.tone} animate-enter-up`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 border border-white/25 rounded-full font-mono text-[10.5px] tracking-[0.22em] uppercase font-bold">
                  {result.status === "safe" ? (
                    <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2.5} />
                  )}
                  {result.badgeText}
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase opacity-70">
                  文件 {fs ? "✓" : "✗"} · 网络 {net ? "✓" : "✗"}
                </span>
              </div>
              <div className="font-display font-extrabold text-[24px] lg:text-[28px] leading-tight">
                {result.title}
              </div>
              <p className="font-sans text-[14.5px] lg:text-[15px] leading-[1.7] opacity-90 mt-3 whitespace-pre-line">
                {result.body}
              </p>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {result.bullets.map((b, i) => (
                  <div
                    key={i}
                    className="bg-white/12 border border-white/25 rounded-xl px-3.5 py-2.5"
                  >
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-65 mb-1">
                      影响 {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="font-sans text-[13px] leading-snug font-medium">
                      {b}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-serif italic text-[14.5px] text-ink/65 mt-5 max-w-[640px]">
              Claude Code 文档把这条写得很硬：
              <span className="font-bold text-ink">有效的沙箱必须同时做文件和网络隔离</span>。
              很多人只想着「把文件锁好」，等数据外泄了才发现网络这边没拦。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Toggle: React.FC<{
  icon: React.ReactNode;
  label: string;
  caption: string;
  on: boolean;
  onChange: () => void;
}> = ({ icon, label, caption, on, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-full text-left border-2 border-ink rounded-2xl p-5 flex items-center justify-between transition-all duration-300 ease-spring ${
      on
        ? "bg-ink text-cream shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
        : "bg-white text-ink shadow-stamp"
    }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-2xl border-2 flex items-center justify-center ${
          on ? "bg-butter text-ink border-cream/30" : "bg-cream text-ink border-ink"
        }`}
      >
        {icon}
      </div>
      <div>
        <div className="font-display font-extrabold text-[18px] leading-tight">{label}</div>
        <div className={`font-mono text-[11px] mt-0.5 ${on ? "text-cream/65" : "text-ink/55"}`}>
          {caption}
        </div>
      </div>
    </div>
    <div
      className={`relative w-14 h-7 rounded-full border-2 border-ink transition-colors duration-250 ${
        on ? "bg-butter" : "bg-cream"
      }`}
    >
      <div
        className={`absolute top-[1px] w-5 h-5 rounded-full bg-ink transition-transform duration-300 ease-spring ${
          on ? "translate-x-[28px]" : "translate-x-[2px]"
        }`}
      />
    </div>
  </button>
);

export default SectionTwoLines;
