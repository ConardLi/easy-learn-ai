/**
 * SectionOSImpl · 谁在底层执行这些限制
 *
 * 主交互（L2 pill 切换）：
 *   - macOS / Linux / WSL2 三个 pill
 *   - 每个 OS 给两块卡：文件机制 + 网络机制
 *   - 底部一行注脚：状态 / 是否需要 root / 隔离强度比较
 *
 * 跟相邻 SectionNetwork（任务模拟器）拉开 —— 这里是横向多平台对比。
 */
import React, { useState } from "react";
import { Apple, Terminal, Monitor, ShieldCheck, AlertCircle } from "lucide-react";

type OS = {
  id: "mac" | "linux" | "wsl2";
  name: string;
  tagline: string;
  icon: React.ReactNode;
  tool: string;
  toolNote: string;
  fs: { title: string; body: string };
  net: { title: string; body: string };
  facts: { label: string; value: string }[];
  status: { tone: "good" | "warn"; text: string };
};

const OPTIONS: OS[] = [
  {
    id: "mac",
    name: "macOS",
    tagline: "Seatbelt · 苹果内置框架",
    icon: <Apple className="w-4 h-4" strokeWidth={2.5} />,
    tool: "sandbox-exec",
    toolNote:
      "Claude Code 在运行时动态生成一份沙箱配置（Sandbox Profile），调 sandbox-exec 起进程。",
    fs: {
      title: "Sandbox Profile · 显式声明读写白名单",
      body:
        "默认拒绝写入，仅放行配置里列出的目录。读权限按需放行，敏感路径在 profile 里硬拒。",
    },
    net: {
      title: "代理转发 · 按域名放行",
      body:
        "Profile 里设置环境变量，把所有出站流量导向沙箱外的代理服务器，由代理做白名单判断。",
    },
    facts: [
      { label: "需要 root", value: "不需要" },
      { label: "隔离强度", value: "中" },
      { label: "支持子进程", value: "✓ 继承 profile" },
    ],
    status: {
      tone: "warn",
      text: "苹果已把 sandbox-exec 标为 deprecated，但目前仍是 macOS 上最实际的方案。",
    },
  },
  {
    id: "linux",
    name: "Linux",
    tagline: "bubblewrap · Namespace 机制",
    icon: <Terminal className="w-4 h-4" strokeWidth={2.5} />,
    tool: "bwrap",
    toolNote:
      "Flatpak 出身的轻量工具，用 Linux Namespace 给进程一份「缩小版」文件系统视图。不需要 root、不需要守护进程。",
    fs: {
      title: "Mount Namespace · 围栏外的路径压根不存在",
      body:
        "Agent 视野里只看得到 /usr、/lib、/bin（只读）+ 工作目录（可写）。~/.ssh 这种路径在挂载列表里没有 —— 看到的就是「No such file」。",
    },
    net: {
      title: "Network Namespace · 想关就关",
      body:
        "可以直接拆掉网络命名空间。拆掉后 Agent 别说外网，连 localhost 都 ping 不通。DNS 解析直接失败，攻击链第一步就断。",
    },
    facts: [
      { label: "需要 root", value: "不需要" },
      { label: "隔离强度", value: "高" },
      { label: "支持子进程", value: "✓ 共享 namespace" },
    ],
    status: {
      tone: "good",
      text: "目前 Linux 上的事实标准。隔离比 Seatbelt 更彻底，配置也更可控。",
    },
  },
  {
    id: "wsl2",
    name: "WSL2",
    tagline: "本质是 Linux · 沿用 bwrap",
    icon: <Monitor className="w-4 h-4" strokeWidth={2.5} />,
    tool: "bwrap (in WSL2)",
    toolNote:
      "WSL2 跑的是完整的 Linux 内核，所以 bwrap 的全套机制原样可用。WSL1 不行 —— 它是翻译层，缺少 namespace 内核特性。",
    fs: {
      title: "等同 Linux · 同一套 mount namespace",
      body:
        "走 WSL2 内核的 namespace，外层 Windows 看不到 Agent，Agent 也看不到 Windows 文件系统（除非显式挂载 /mnt/c）。",
    },
    net: {
      title: "等同 Linux · 同一套 network namespace",
      body:
        "网络拆与不拆都行。注意 WSL2 默认是 NAT 模式，跟 Windows 主机之间还隔了一层路由，攻击面更小。",
    },
    facts: [
      { label: "需要 root", value: "不需要" },
      { label: "隔离强度", value: "高" },
      { label: "WSL1 支持", value: "✗ 不支持" },
    ],
    status: {
      tone: "good",
      text: "Windows 上的 Agent 沙箱推荐方案。WSL1 用户先升级到 WSL2 再说。",
    },
  },
];

const SectionOSImpl: React.FC = () => {
  const [osId, setOsId] = useState<OS["id"]>("linux");
  const os = OPTIONS.find((o) => o.id === osId) || OPTIONS[0];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Impl · 谁在底层动手</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          OS 层执行这些限制 ——
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">三个平台各有一套</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          文件和网络两条线的实际拦截动作，由操作系统提供的原语执行。
          macOS 用 Seatbelt、Linux 用 bubblewrap、WSL2 沿用 Linux。
          点上面 pill 切一下，看每个平台是怎么做的。
        </p>

        {/* pill 切换 */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {OPTIONS.map((o) => {
            const active = o.id === osId;
            return (
              <button
                type="button"
                key={o.id}
                onClick={() => setOsId(o.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 border-2 border-ink rounded-full font-mono text-[12px] tracking-[0.18em] uppercase transition-all duration-250 ease-spring ${
                  active
                    ? "bg-ink text-cream shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                }`}
              >
                {o.icon}
                {o.name}
              </button>
            );
          })}
        </div>

        {/* 主面板 */}
        <div key={os.id} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-7 animate-enter-up">
          {/* 左：工具说明 + 状态 */}
          <div className="lg:col-span-4 space-y-5">
            <div className="card-stamp p-6">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
                {os.tagline}
              </div>
              <div className="font-display font-extrabold text-[22px] text-ink leading-tight">
                {os.tool}
              </div>
              <p className="font-sans text-[13.5px] leading-[1.7] text-ink/75 mt-3">
                {os.toolNote}
              </p>
            </div>

            <div className="card-stamp p-5 space-y-2.5">
              {os.facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between font-mono text-[11.5px]"
                >
                  <span className="text-ink/55 tracking-[0.16em] uppercase">{f.label}</span>
                  <span className="font-bold text-ink">{f.value}</span>
                </div>
              ))}
            </div>

            <div
              className={`border-2 border-ink rounded-2xl p-4 ${
                os.status.tone === "good" ? "bg-teal text-white" : "bg-butter text-ink"
              }`}
            >
              <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.22em] uppercase font-bold mb-1">
                {os.status.tone === "good" ? (
                  <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                )}
                {os.status.tone === "good" ? "推荐 · 当前最佳" : "可用 · 但要留意"}
              </div>
              <p className="font-sans text-[13px] leading-[1.6]">
                {os.status.text}
              </p>
            </div>
          </div>

          {/* 右：两条线的具体机制 */}
          <div className="lg:col-span-8 space-y-5">
            <Mechanism
              tag="文件系统这条线"
              title={os.fs.title}
              body={os.fs.body}
              tone="bg-coral"
            />
            <Mechanism
              tag="网络这条线"
              title={os.net.title}
              body={os.net.body}
              tone="bg-teal"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Mechanism: React.FC<{
  tag: string;
  title: string;
  body: string;
  tone: string;
}> = ({ tag, title, body, tone }) => (
  <div className="card-stamp overflow-hidden">
    <div className={`${tone} text-white px-5 py-2 flex items-center justify-between border-b-2 border-ink`}>
      <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase font-bold">{tag}</span>
    </div>
    <div className="px-5 py-4">
      <div className="font-display font-extrabold text-[17.5px] text-ink leading-tight">
        {title}
      </div>
      <p className="font-sans text-[14px] leading-[1.7] text-ink/75 mt-2">
        {body}
      </p>
    </div>
  </div>
);

export default SectionOSImpl;
