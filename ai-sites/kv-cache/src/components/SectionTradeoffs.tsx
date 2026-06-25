import React, { useMemo, useState } from "react";
import { Check, ChevronDown, HardDrive, MemoryStick, Scissors } from "lucide-react";
import { LinkCard, SectionHead } from "./SectionBits";

type Plan = "fixed" | "dynamic";
type Extra = "quantize" | "offload" | "window";

const EXTRAS: Array<{
  id: Extra;
  title: string;
  desc: string;
  icon: React.ReactNode;
}> = [
  {
    id: "quantize",
    title: "压低缓存精度（量化）",
    desc: "用更少的字节保存每个数字，省显存；转换会增加少量工作，也可能影响结果。",
    icon: <MemoryStick className="h-5 w-5" />,
  },
  {
    id: "offload",
    title: "移到电脑内存（卸载）",
    desc: "显卡放不下时，把部分缓存搬到普通内存；来回搬运会拖慢生成。",
    icon: <HardDrive className="h-5 w-5" />,
  },
  {
    id: "window",
    title: "只保留最近一段（滑动窗口）",
    desc: "超过长度后丢掉最旧的缓存；模型也会少看到远处内容。",
    icon: <Scissors className="h-5 w-5" />,
  },
];

const SectionTradeoffs: React.FC = () => {
  const [plan, setPlan] = useState<Plan>("dynamic");
  const [extras, setExtras] = useState<Set<Extra>>(new Set());
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const result = useMemo(() => {
    let memory = plan === "dynamic" ? 68 : 82;
    let speed = plan === "dynamic" ? 88 : 92;
    let context = 100;
    if (extras.has("quantize")) {
      memory -= 28;
      speed -= 4;
    }
    if (extras.has("offload")) {
      memory -= 22;
      speed -= 24;
    }
    if (extras.has("window")) {
      memory -= 18;
      context -= 35;
    }
    return {
      memory: Math.max(8, memory),
      speed: Math.max(10, speed),
      context: Math.max(10, context),
    };
  }, [plan, extras]);

  const toggle = (id: Extra) => {
    setExtras((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="border-y-2 border-ink bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead
          number="07"
          label="速度和显存怎么取舍"
          title="缓存没有统一配置，要看机器和任务"
          intro={
            <>
              <p>
                缓存能省计算，也会占显存。服务程序会按机器大小、对话长度和并发人数选择保存方式。
              </p>
              <p className="mt-3">
                <span className="mr-2 inline-flex rounded-full border-2 border-ink bg-butter px-2 py-0.5 font-mono text-[10px] font-bold text-ink">进阶 · 自部署</span>
                日常使用商业聊天产品不用配置这些选项。自己运行模型时，再来拼一套方案。
              </p>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-cream p-5 shadow-stamp">
              <h3 className="font-display text-xl font-bold">先选分配方式</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Choice
                  active={plan === "dynamic"}
                  title="按实际长度增长"
                  desc="需要多少加多少，短回答少占空间。管理过程更灵活。"
                  onClick={() => setPlan("dynamic")}
                />
                <Choice
                  active={plan === "fixed"}
                  title="提前留好最大空间"
                  desc="位置固定、实现简单。回答很短时，预留的空位也占着。"
                  onClick={() => setPlan("fixed")}
                />
              </div>
            </div>

            <div className="rounded-3xl border-2 border-ink bg-butter-tint p-5 shadow-stamp">
              <h3 className="font-display text-xl font-bold">再加节省手段</h3>
              <div className="mt-4 space-y-3">
                {EXTRAS.map((item) => {
                  const active = extras.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className={`flex w-full items-start gap-3 rounded-2xl border-2 border-ink p-4 text-left transition-all duration-250 ${
                        active ? "bg-ink text-cream shadow-stamp" : "bg-white"
                      }`}
                    >
                      <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 border-ink ${active ? "bg-butter text-ink" : "bg-cream"}`}>
                        {active ? <Check className="h-4 w-4" strokeWidth={3} /> : item.icon}
                      </span>
                      <span>
                        <span className="block font-display text-base font-bold">{item.title}</span>
                        <span className={`mt-1 block text-xs leading-relaxed ${active ? "text-cream/70" : "text-ink/60"}`}>
                          {item.desc}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="space-y-5 lg:col-span-5">
            <div className="rounded-[2rem] border-2 border-ink bg-teal p-6 text-cream shadow-stamp-lg">
              <div className="font-mono text-[10px] uppercase tracking-[0.17em] text-butter-soft">
                方案反馈 · 示意
              </div>
              <Score label="显存余量" value={100 - result.memory} />
              <Score label="生成速度" value={result.speed} />
              <Score label="可保留的远处内容" value={result.context} />
              <p className="mt-5 text-sm leading-relaxed text-cream/75">
                {extras.size === 0
                  ? "当前方案优先保留完整缓存。显存紧张时，可以加一项节省手段。"
                  : extras.has("window")
                    ? "这套方案更省空间，但旧内容可能提前离开模型的视野。"
                    : extras.has("offload")
                      ? "这套方案能缓解显存压力，生成速度会受到数据搬运影响。"
                      : "这套方案压低缓存占用，适合显存紧张又想保留长内容的场景。"}
              </p>
            </div>

            <button
              onClick={() => setAdvancedOpen((value) => !value)}
              className="flex w-full items-center justify-between rounded-2xl border-2 border-ink bg-white px-5 py-4 text-left shadow-stamp"
              aria-expanded={advancedOpen}
            >
              <span>
                <span className="block font-display font-bold">进阶：PagedAttention 放在哪</span>
                <span className="mt-1 block text-xs text-ink/55">自部署服务才需要关心</span>
              </span>
              <ChevronDown className={`h-5 w-5 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
            </button>
            {advancedOpen && (
              <div className="animate-enter-fade rounded-2xl border-2 border-ink bg-cream p-5 text-sm leading-[1.7] text-ink/70">
                PagedAttention 把 KV Cache 切成小块，再按需分配。它解决多请求服务时的显存管理问题，
                具体调度和部署工具放在模型部署站讲。
              </div>
            )}
            <LinkCard
              href="../deploy/index.html"
              title="PagedAttention 和并发服务"
              desc="部署站主讲怎样分块管理缓存、怎样让多个请求轮流使用显卡。"
            />
          </aside>
        </div>
      </div>
    </section>
  );
};

const Choice: React.FC<{
  active: boolean;
  title: string;
  desc: string;
  onClick: () => void;
}> = ({ active, title, desc, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-2xl border-2 border-ink p-4 text-left transition-all duration-250 ${
      active ? "bg-ink text-cream shadow-stamp" : "bg-white"
    }`}
  >
    <span className="font-display text-base font-bold">{title}</span>
    <span className={`mt-2 block text-xs leading-relaxed ${active ? "text-cream/70" : "text-ink/60"}`}>
      {desc}
    </span>
  </button>
);

const Score: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="mt-5">
    <div className="mb-2 flex justify-between gap-3 text-sm">
      <span>{label}</span>
      <span className="font-mono text-xs">{value}%</span>
    </div>
    <div className="h-3 overflow-hidden rounded-full border-2 border-cream bg-ink">
      <div className="h-full bg-butter transition-all duration-250" style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default SectionTradeoffs;
