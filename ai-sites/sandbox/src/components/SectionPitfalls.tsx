/**
 * SectionPitfalls · 实际搞沙箱的 5 个坑
 *
 * 主交互（L2 accordion）：
 *   - 5 个坑并列，点击展开看「场景 / 后果 / 修法」
 *   - 默认展开第一个
 *
 * 收尾：一条硬规则 callout
 *
 * 跟相邻 SectionLevels（横向 SVG 表）拉开 —— 这里是竖向展开的列表。
 */
import React, { useState } from "react";
import { Plus, Minus, AlertOctagon, ShieldCheck } from "lucide-react";

type Pit = {
  id: string;
  num: string;
  title: string;
  oneliner: string;
  scene: string;
  result: string;
  fix: string;
};

const PITS: Pit[] = [
  {
    id: "no-net",
    num: "01",
    title: "只隔离文件，忘了网络",
    oneliner: "经典坑，前面整章在讲。",
    scene:
      "你给沙箱配了严密的文件白名单，~/.ssh 一个字节都改不了。但代理服务器没起，或起了但白名单 = *。",
    result:
      "Agent 一样能读 .ssh、curl 出去。看起来文件锁得很死，密钥还是照样泄出去。",
    fix:
      "网络隔离不是可选项。第一天就配上代理 + 域名白名单，跟文件围栏一起开。",
  },
  {
    id: "wide-allowlist",
    num: "02",
    title: "白名单太宽",
    oneliner: "通配符是出口。",
    scene:
      "嫌每个域名一条太麻烦，你写了 *.github.com 一把搞定。",
    result:
      "攻击者在 GitHub Pages 放一个数据接收端点，username.github.io 命中通配符，外泄成功。",
    fix:
      "白名单精确到具体服务的子域名（api.github.com / objects.githubusercontent.com）。通配符是最后手段，不是默认手段。",
  },
  {
    id: "writable",
    num: "03",
    title: "允许写入路径太多",
    oneliner: "尤其当那个路径在 $PATH 里（系统找命令的目录列表）。",
    scene:
      "为了让 Agent 能装全局工具，你把 /usr/local/bin 设成可写。这个目录在 $PATH 里 —— 系统执行 git、npm 等命令时会从这里找。",
    result:
      "Agent 往里面丢一个跟系统命令同名的恶意可执行文件。下次你或 cron 调到这个命令，跑的就是 Agent 写进来的版本，攻击者拿到执行权限。",
    fix:
      "可写白名单按目录、按使用场景细分。$PATH 里的目录永远只读，工具装到沙箱专属目录，跑完即销毁。",
  },
  {
    id: "silent-fallback",
    num: "04",
    title: "静默降级",
    oneliner: "你以为有沙箱，其实在裸奔。",
    scene:
      "沙箱进程因为权限问题或配置错误起不来，你的系统选择「记一条 warning，继续不带沙箱跑」。",
    result:
      "界面上看不出任何区别，但所有的限制都没生效。等出了安全事故才发现日志里那行 warning。",
    fix:
      "硬开关。Claude Code 提供 sandbox.failIfUnavailable: true —— 沙箱起不来，命令就别跑。",
  },
  {
    id: "socket-bypass",
    num: "05",
    title: "Unix Socket 穿透",
    oneliner: "Docker socket（控制宿主 Docker 引擎的接口）就是大穿透口。",
    scene:
      "为了让 Agent 能跑 docker compose，你把 /var/run/docker.sock 放进沙箱可访问列表。这个 socket 是 Docker 引擎对外的「遥控器」，能拿到它就能调起任何容器。",
    result:
      "Agent 通过 Docker socket 直接操控宿主 Docker 引擎 —— 能跑特权容器，约等于拿到宿主 root。沙箱形同虚设。",
    fix:
      "永远不要把宿主侧的高权限 socket 暴露进沙箱。要 Docker 给 Agent 起独立的、受限的 socket，或者放进更外层的 VM 里再用。",
  },
];

const SectionPitfalls: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(PITS[0].id);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-24 lg:pb-32 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">08</span>
          <span className="section-anchor-label">Pitfalls · 实际会踩的坑</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          编译过 ≠ 沙箱真的有用 ——
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">这 5 个坑，最容易掉进去</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[780px]">
          下面 5 条是工程实践里最常翻车的地方。每条都对应一个「看起来配好了，
          但实际上有一条缝」的真实场景。点开看场景 → 后果 → 怎么修。
        </p>

        {/* accordion */}
        <div className="mt-10 space-y-3">
          {PITS.map((p) => {
            const open = openId === p.id;
            return (
              <div
                key={p.id}
                className={`border-2 border-ink rounded-2xl overflow-hidden transition-all duration-300 ease-editorial ${
                  open
                    ? "bg-white shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white shadow-stamp"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : p.id)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4"
                >
                  <span className="w-10 h-10 rounded-full bg-cream border-2 border-ink flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[13px] font-extrabold text-ink">
                      {p.num}
                    </span>
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-extrabold text-[18px] text-ink leading-tight">
                      {p.title}
                    </div>
                    <div className="font-sans text-[13px] text-ink/60 mt-0.5">
                      {p.oneliner}
                    </div>
                  </div>
                  <span
                    className={`w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center flex-shrink-0 transition-colors ${
                      open ? "bg-ink text-cream" : "bg-cream text-ink"
                    }`}
                  >
                    {open ? (
                      <Minus className="w-4 h-4" strokeWidth={2.5} />
                    ) : (
                      <Plus className="w-4 h-4" strokeWidth={2.5} />
                    )}
                  </span>
                </button>

                {open && (
                  <div className="px-5 pb-5 pt-1 grid grid-cols-1 md:grid-cols-3 gap-4 border-t-2 border-dashed border-ink/15 animate-enter-fade">
                    <Cell tag="场景" tone="text-ink">{p.scene}</Cell>
                    <Cell tag="后果" tone="text-pop">{p.result}</Cell>
                    <Cell tag="修法" tone="text-teal">{p.fix}</Cell>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 收尾硬规则 callout */}
        <div className="mt-14 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          <div className="lg:col-span-3 flex lg:justify-center">
            <div className="w-20 h-20 rounded-3xl bg-pop text-white flex items-center justify-center border-2 border-cream/30 shadow-stamp">
              <AlertOctagon className="w-10 h-10" strokeWidth={2.2} />
            </div>
          </div>
          <div className="lg:col-span-9">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-butter mb-3 font-bold">
              一条硬规则 · 别商量
            </div>
            <div className="font-display font-extrabold text-[26px] lg:text-[30px] leading-[1.15] mb-4">
              沙箱起不来，命令就别跑。
            </div>
            <p className="font-sans text-[14.5px] leading-[1.75] text-cream/85 max-w-[720px]">
              所有「静默降级」「就这一次先关沙箱试试」「记个 warning 接着跑」的设计 ——
              一旦留口，就是出事故的那个口。Claude Code 把这条写成了一个配置项：
              <code className="font-mono text-[13.5px] text-butter mx-1">sandbox.failIfUnavailable: true</code>，
              建议默认开启。
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-butter text-ink border-2 border-cream/40 rounded-full font-mono text-[11px] tracking-[0.2em] uppercase font-bold shadow-stamp">
              <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
              别等出事了再配 · 第一次跑命令前就围好
            </div>
            <p className="font-sans text-[13px] leading-[1.6] text-cream/65 mt-3 max-w-[680px]">
              别等出事了再配 —— 第一次让 Agent 跑命令前就先把文件和网络围栏设好。
            </p>
          </div>
        </div>

        {/* 末尾小角标，让收尾不悬空 */}
        <div className="mt-10 text-center font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/40">
          END · 8 节看完 · 沙箱手册到此
        </div>
      </div>
    </section>
  );
};

const Cell: React.FC<{ tag: string; tone: string; children: React.ReactNode }> = ({
  tag,
  tone,
  children,
}) => (
  <div>
    <div className={`font-mono text-[10.5px] tracking-[0.2em] uppercase mb-1.5 font-bold ${tone}`}>
      {tag}
    </div>
    <p className="font-sans text-[13px] leading-[1.65] text-ink/80">{children}</p>
  </div>
);

export default SectionPitfalls;
