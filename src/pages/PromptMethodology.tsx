import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Database,
  Fingerprint,
  Heart,
  LayoutGrid,
  Library,
  LifeBuoy,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Palette,
  Quote,
  Ruler,
  ShieldCheck,
  Sparkles,
  Tags,
  Terminal,
  Wrench,
  Workflow,
} from "lucide-react";
import {
  MethodologyIcon,
  MethodologyLaw,
  caseProductToPromptId,
  methodologyChecklist,
  methodologyIntro,
  methodologyLaws,
  methodologyPatterns,
} from "../data/promptMethodology";
import { DotGrid, HandUnderline, Sparkle4, Star } from "../components/Decorations";
import PromptViewSwitch from "../components/PromptViewSwitch";

const lawIcons: Record<MethodologyIcon, React.ReactNode> = {
  identity: <Fingerprint className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  shield: <ShieldCheck className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  tool: <Wrench className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  workflow: <Workflow className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  output: <Terminal className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  diff: <LayoutGrid className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  memory: <Database className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  comms: <MessagesSquare className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  knowledge: <Library className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  fewshot: <Quote className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  recovery: <LifeBuoy className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  quality: <Palette className="w-[18px] h-[18px]" strokeWidth={2.4} />,
};

const patternIcons: Record<string, React.ReactNode> = {
  A: <LayoutGrid className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  B: <Tags className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  C: <Ruler className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  D: <Workflow className="w-[18px] h-[18px]" strokeWidth={2.4} />,
  E: <Heart className="w-[18px] h-[18px]" strokeWidth={2.4} />,
};

type NavItem =
  | { kind: "law"; id: string; serial: string; label: string; law: MethodologyLaw }
  | { kind: "patterns"; id: "patterns"; serial: string; label: string }
  | { kind: "checklist"; id: "checklist"; serial: string; label: string };

const PromptMethodology: React.FC = () => {
  const navItems = useMemo<NavItem[]>(
    () => [
      ...methodologyLaws.map<NavItem>((law) => ({
        kind: "law",
        id: law.id,
        serial: String(law.index).padStart(2, "0"),
        label: law.shortTitle,
        law,
      })),
      { kind: "patterns", id: "patterns", serial: "＋", label: "组合模式" },
      { kind: "checklist", id: "checklist", serial: "✓", label: "自检清单" },
    ],
    [],
  );

  const [activeId, setActiveId] = useState<string>(navItems[0].id);
  const activeIndex = navItems.findIndex((item) => item.id === activeId);
  const active = navItems[activeIndex];
  const detailRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeId]);

  const go = (delta: number) => {
    const next = navItems[activeIndex + delta];
    if (next) setActiveId(next.id);
  };

  return (
    <div className="relative bg-white">
      <MethodologyHero />

      <section className="relative bg-cream/40 border-b-2 border-ink/10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <MobileNav items={navItems} activeId={activeId} onPick={setActiveId} />

          <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-6 lg:gap-9 items-start">
            <DeskNav items={navItems} activeId={activeId} onPick={setActiveId} />

            <div ref={detailRef} className="min-w-0 scroll-mt-24">
              {active.kind === "law" && <LawDetail law={active.law} />}
              {active.kind === "patterns" && <PatternsView />}
              {active.kind === "checklist" && <ChecklistView />}

              <DetailFooter
                prev={navItems[activeIndex - 1]}
                next={navItems[activeIndex + 1]}
                onPrev={() => go(-1)}
                onNext={() => go(1)}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─────────────── Hero ─────────────── */

const MethodologyHero: React.FC = () => {
  const stats = [
    { label: "核心法则", value: "12 条" },
    { label: "样本来源", value: "40 份" },
    { label: "组合模式", value: "5 组" },
    { label: "自检维度", value: "12 项" },
  ];
  return (
    <section className="relative bg-butter border-b-2 border-ink overflow-hidden">
      <DotGrid
        className="absolute bottom-7 right-[5%] w-20 h-12 text-ink opacity-30 hidden md:block"
        color="#241C15"
        rows={3}
        cols={5}
      />
      <Star
        className="absolute top-14 left-[6%] w-8 h-8 -rotate-12 text-coral hidden lg:block"
        color="#E07A5F"
        filled
      />
      <Sparkle4
        className="absolute top-20 right-[13%] w-5 h-5 text-ink/35 hidden lg:block"
        color="#241C15"
      />
      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 pt-9 lg:pt-11 pb-11 lg:pb-12">
        <PromptViewSwitch active="methodology" className="mb-8" />

        <div className="max-w-[820px]">
          <h1 className="font-display font-extrabold text-[34px] sm:text-[44px] lg:text-[54px] leading-[1.08] text-ink">
            顶级 AI Agent{" "}
            <span className="relative inline-block">
              <span className="relative z-10">提示词设计方法论</span>
              <HandUnderline
                className="absolute -bottom-2 left-0 right-0 w-full h-3"
                color="#E07A5F"
              />
            </span>
          </h1>
          <p className="font-sans font-medium text-[16px] lg:text-[18px] leading-[1.7] text-ink/85 mt-6">
            {methodologyIntro.lead}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 mt-9 pt-5 border-t-2 border-ink/15">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                {stat.label}
              </div>
              <div className="font-sans font-bold text-[15px] text-ink mt-1">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────── Navigators ─────────────── */

const DeskNav: React.FC<{
  items: NavItem[];
  activeId: string;
  onPick: (id: string) => void;
}> = ({ items, activeId, onPick }) => (
  <aside className="hidden lg:block lg:sticky lg:top-24 self-start">
    <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
      <div className="bg-ink text-white px-5 py-3.5 flex items-center justify-between">
        <span className="font-display font-extrabold text-[15px]">目录</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          12 法则 + 附录
        </span>
      </div>
      <nav className="p-2.5 max-h-[calc(100vh-9rem)] overflow-y-auto">
        {items.map((item, i) => {
          const isActive = item.id === activeId;
          const isExtra = item.kind !== "law";
          return (
            <React.Fragment key={item.id}>
              {isExtra && i > 0 && items[i - 1].kind === "law" && (
                <div className="my-2 mx-2 h-px bg-ink/10" />
              )}
              <button
                onClick={() => onPick(item.id)}
                className={`group w-full flex items-center gap-3 px-2.5 py-2 rounded-2xl text-left transition-all duration-200 ${
                  isActive ? "bg-ink text-white" : "hover:bg-cream text-ink"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[12px] font-mono font-bold shrink-0 transition-colors ${
                    isActive
                      ? "bg-butter text-ink"
                      : "bg-cream border border-ink/12 text-ink/55 group-hover:border-ink/25"
                  }`}
                >
                  {item.serial}
                </span>
                <span className="font-sans font-semibold text-[13.5px] truncate">
                  {item.label}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  </aside>
);

const MobileNav: React.FC<{
  items: NavItem[];
  activeId: string;
  onPick: (id: string) => void;
}> = ({ items, activeId, onPick }) => (
  <div className="lg:hidden -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6 overflow-x-auto no-scrollbar">
    <div className="flex gap-2 w-max pb-1">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onPick(item.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border-2 border-ink font-sans font-semibold text-[13px] whitespace-nowrap transition-colors ${
              isActive ? "bg-ink text-white" : "bg-white text-ink"
            }`}
          >
            <span
              className={`font-mono text-[11px] font-bold ${
                isActive ? "text-butter" : "text-coral"
              }`}
            >
              {item.serial}
            </span>
            {item.label}
          </button>
        );
      })}
    </div>
  </div>
);

/* ─────────────── Law detail ─────────────── */

const LawDetail: React.FC<{ law: MethodologyLaw }> = ({ law }) => (
  <article className="bg-white border-2 border-ink rounded-[28px] shadow-stamp-lg overflow-hidden">
    <header className="relative bg-cream border-b-2 border-ink px-6 md:px-8 py-6 md:py-7">
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-ink/15 rounded-full font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
          法则 {law.index} / 12
        </span>
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-ink text-white border-2 border-ink shadow-stamp shrink-0">
          {lawIcons[law.icon]}
        </span>
      </div>
      <h2 className="font-display font-extrabold text-[27px] md:text-[34px] text-ink leading-[1.15] mt-4">
        {law.title.split("——")[0]}
      </h2>
      <p className="inline-flex items-center gap-2 font-serif italic text-[15px] md:text-[16px] text-ink-secondary mt-2">
        <Sparkle4 className="w-3.5 h-3.5 text-coral" color="#E07A5F" />
        {law.subtitle}
      </p>
    </header>

    <div className="p-6 md:p-8 space-y-9">
      <Field title="解决什么问题">
        <p className="font-sans text-[15.5px] md:text-[16px] text-ink leading-[1.9]">
          {law.problem}
        </p>
        {law.problemPoints && (
          <div className="mt-4 space-y-2.5">
            {law.problemPoints.map((point, i) => (
              <div
                key={point}
                className="flex gap-3 bg-cream/70 border border-ink/10 rounded-2xl px-4 py-3"
              >
                <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-butter border border-ink/20 font-mono text-[12px] font-bold text-ink">
                  {i + 1}
                </span>
                <span className="font-sans text-[14.5px] text-ink-secondary leading-[1.7] pt-0.5">
                  {point}
                </span>
              </div>
            ))}
          </div>
        )}
      </Field>

      <Field title="可复用模板">
        <TemplatePanel template={law.template} />
      </Field>

      <Field title="典型案例">
        <p className="-mt-1 mb-3 font-sans text-[12.5px] text-ink/50">
          点击产品名可跳转到对应的提示词详情 ↗
        </p>
        <CaseTable cases={law.cases} />
      </Field>

      <Field title="不宜照抄" danger>
        <ul className="bg-pop/[0.06] border-2 border-pop/25 rounded-2xl p-4 md:p-5 space-y-3">
          {law.cautions.map((caution) => (
            <li
              key={caution}
              className="flex gap-2.5 font-sans text-[14.5px] text-ink leading-[1.7]"
            >
              <AlertTriangle
                className="w-4 h-4 text-pop shrink-0 mt-1"
                strokeWidth={2.5}
              />
              <span>{caution}</span>
            </li>
          ))}
        </ul>
      </Field>
    </div>
  </article>
);

const Field: React.FC<{
  title: string;
  danger?: boolean;
  children: React.ReactNode;
}> = ({ title, danger, children }) => (
  <section>
    <div className="flex items-center gap-2.5 mb-4">
      <span
        className={`w-1.5 h-5 rounded-full ${danger ? "bg-pop" : "bg-coral"}`}
      />
      <h3 className="font-display font-extrabold text-[18px] md:text-[20px] text-ink">
        {title}
      </h3>
    </div>
    {children}
  </section>
);

const CaseTable: React.FC<{ cases: MethodologyLaw["cases"] }> = ({ cases }) => (
  <div className="border-2 border-ink rounded-2xl overflow-hidden">
    <div className="hidden md:grid grid-cols-[150px_minmax(0,1.4fr)_minmax(0,1fr)] bg-ink text-white">
      <div className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
        产品
      </div>
      <div className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 border-l border-white/12">
        写法
      </div>
      <div className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 border-l border-white/12">
        亮点
      </div>
    </div>
    <div>
      {cases.map((item, i) => (
        <div
          key={item.product}
          className={`grid grid-cols-1 md:grid-cols-[150px_minmax(0,1.4fr)_minmax(0,1fr)] ${
            i > 0 ? "border-t-2 border-ink/8" : ""
          } ${i % 2 ? "bg-cream/40" : "bg-white"}`}
        >
          <div className="px-4 pt-3.5 md:py-3.5">
            <ProductChip product={item.product} />
          </div>
          <div className="px-4 pt-2 md:pt-3.5 md:py-3.5 md:border-l border-ink/8">
            <span className="md:hidden font-mono text-[9px] uppercase tracking-[0.14em] text-ink/40 block mb-0.5">
              写法
            </span>
            <p className="font-sans text-[14px] text-ink leading-[1.65]">
              {item.approach}
            </p>
          </div>
          <div className="px-4 pt-2 pb-3.5 md:py-3.5 md:border-l border-ink/8">
            <span className="md:hidden font-mono text-[9px] uppercase tracking-[0.14em] text-ink/40 block mb-0.5">
              亮点
            </span>
            <p className="flex items-start gap-1.5 font-sans text-[13.5px] text-ink-secondary leading-[1.6]">
              <Lightbulb
                className="w-3.5 h-3.5 text-coral shrink-0 mt-0.5"
                strokeWidth={2.5}
              />
              <span>{item.highlight}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProductChip: React.FC<{ product: string }> = ({ product }) => {
  const promptId = caseProductToPromptId[product];
  if (!promptId) {
    return (
      <span className="inline-flex items-center px-3 py-1 bg-butter border border-ink/20 rounded-full font-sans font-extrabold text-[12.5px] text-ink">
        {product}
      </span>
    );
  }
  return (
    <Link
      to={`/ai-prompts/${promptId}`}
      title={`查看 ${product} 的提示词详情`}
      className="group/chip inline-flex items-center gap-1 pl-3 pr-2 py-1 bg-butter border border-ink/20 rounded-full font-sans font-extrabold text-[12.5px] text-ink transition-all duration-200 ease-spring hover:bg-ink hover:text-white hover:border-ink hover:-translate-y-[1px] hover:shadow-stamp"
    >
      <span>{product}</span>
      <ArrowUpRight
        className="w-3.5 h-3.5 text-ink/55 transition-colors group-hover/chip:text-butter"
        strokeWidth={2.5}
      />
    </Link>
  );
};

/* ─────────────── Template panel with copy ─────────────── */

const TemplatePanel: React.FC<{ template: string }> = ({ template }) => (
  <div className="border-2 border-ink rounded-2xl shadow-stamp overflow-hidden">
    <div className="bg-ink text-white px-4 py-2.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-coral" />
        <span className="w-2.5 h-2.5 rounded-full bg-butter" />
        <span className="w-2.5 h-2.5 rounded-full bg-teal" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          Template
        </span>
      </div>
      <CopyButton text={template} />
    </div>
    <pre className="px-5 py-4 bg-ink text-white/95 overflow-x-auto font-mono text-[12.5px] leading-[1.75] whitespace-pre border-t border-white/10">
      <code>{template}</code>
    </pre>
  </div>
);

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <button
      onClick={handleCopy}
      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/25 rounded-full font-sans font-bold text-[11.5px] text-white transition-colors hover:bg-white/20"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-butter" strokeWidth={2.5} />
      ) : (
        <Copy className="w-3.5 h-3.5" strokeWidth={2.5} />
      )}
      {copied ? "已复制" : "复制模板"}
    </button>
  );
};

/* ─────────────── Patterns view ─────────────── */

const PatternsView: React.FC = () => (
  <article className="bg-white border-2 border-ink rounded-[28px] shadow-stamp-lg overflow-hidden">
    <header className="bg-cream border-b-2 border-ink px-6 md:px-8 py-6 md:py-7">
      <span className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-ink/15 rounded-full font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
        附录
      </span>
      <h2 className="font-display font-extrabold text-[27px] md:text-[34px] text-ink leading-[1.15] mt-4">
        跨法则的高阶组合模式
      </h2>
      <p className="font-sans text-[15px] text-ink-secondary leading-[1.7] mt-2 max-w-2xl">
        把多条法则编织在一起的 5 种结构性技巧，让提示词从“规则堆砌”升级为“可维护的系统”。
      </p>
    </header>
    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      {methodologyPatterns.map((pattern) => (
        <div
          key={pattern.id}
          className="flex flex-col bg-white border-2 border-ink rounded-3xl shadow-stamp overflow-hidden"
        >
          <div className="flex items-center gap-3 bg-cream border-b-2 border-ink px-5 py-4">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-teal text-white border-2 border-ink shadow-stamp shrink-0">
              {patternIcons[pattern.letter] || (
                <Sparkles className="w-[18px] h-[18px]" strokeWidth={2.4} />
              )}
            </span>
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                模式 {pattern.letter}
              </div>
              <h3 className="font-display font-extrabold text-[18px] text-ink leading-tight">
                {pattern.title}
              </h3>
            </div>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-start gap-1.5 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45 shrink-0 pt-0.5">
                来源
              </span>
              <span className="font-sans font-semibold text-[12.5px] text-ink leading-snug">
                {pattern.source}
              </span>
            </div>
            <p className="font-sans text-[14.5px] text-ink-secondary leading-[1.75] flex-1">
              {pattern.body}
            </p>
            {pattern.example && (
              <pre className="mt-4 px-4 py-3 bg-ink text-white/95 rounded-2xl overflow-x-auto font-mono text-[11.5px] leading-[1.7] whitespace-pre">
                <code>{pattern.example}</code>
              </pre>
            )}
          </div>
        </div>
      ))}
    </div>
  </article>
);

/* ─────────────── Interactive checklist view ─────────────── */

const ChecklistView: React.FC = () => {
  const [checked, setChecked] = useState<boolean[]>(
    () => methodologyChecklist.map(() => false),
  );
  const done = checked.filter(Boolean).length;
  const total = methodologyChecklist.length;
  const allDone = done === total;
  const progress = Math.round((done / total) * 100);
  const toggle = (index: number) =>
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));

  return (
    <article className="bg-white border-2 border-ink rounded-[28px] shadow-stamp-lg overflow-hidden">
      <header className="bg-cream border-b-2 border-ink px-6 md:px-8 py-6 md:py-7">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-ink/15 rounded-full font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
          结语
        </span>
        <h2 className="font-display font-extrabold text-[27px] md:text-[34px] text-ink leading-[1.15] mt-4">
          一份提示词的自检清单
        </h2>
        <p className="font-sans text-[15px] text-ink-secondary leading-[1.7] mt-2 max-w-2xl">
          {methodologyIntro.closing}
        </p>
      </header>

      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-ink text-white border-2 border-ink shadow-stamp">
              <ListChecks className="w-[18px] h-[18px]" strokeWidth={2.4} />
            </span>
            <span className="font-display font-extrabold text-[17px] text-ink">
              {allDone ? "全部命中，工业级 ✦" : "勾掉已覆盖的维度"}
            </span>
          </div>
          <div className="font-display font-extrabold text-[22px] leading-none text-ink">
            {done}
            <span className="text-ink/35 text-[15px]"> / {total}</span>
          </div>
        </div>

        <div className="h-2.5 w-full bg-ink/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-coral rounded-full transition-all duration-500 ease-spring"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {methodologyChecklist.map((item, index) => {
            const isOn = checked[index];
            return (
              <button
                key={item.dimension}
                onClick={() => toggle(index)}
                aria-pressed={isOn}
                className={`group flex items-start gap-3 text-left px-4 py-3.5 rounded-2xl border-2 transition-all duration-250 ease-spring ${
                  isOn
                    ? "bg-butter/30 border-ink"
                    : "bg-white border-ink/15 hover:border-ink/45"
                }`}
              >
                <span
                  className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-colors ${
                    isOn
                      ? "bg-ink border-ink text-white"
                      : "bg-white border-ink/30 text-transparent"
                  }`}
                >
                  <Check className="w-4 h-4" strokeWidth={3} />
                </span>
                <span className="min-w-0">
                  <span className="block font-sans font-extrabold text-[14px] text-ink">
                    {index + 1}. {item.dimension}
                  </span>
                  <span
                    className={`block font-sans text-[13px] leading-[1.6] mt-0.5 ${
                      isOn ? "text-ink/45 line-through" : "text-ink-secondary"
                    }`}
                  >
                    {item.question}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
};

/* ─────────────── Prev / next footer ─────────────── */

const DetailFooter: React.FC<{
  prev?: NavItem;
  next?: NavItem;
  onPrev: () => void;
  onNext: () => void;
}> = ({ prev, next, onPrev, onNext }) => (
  <div className="grid grid-cols-2 gap-3 mt-6">
    <button
      onClick={onPrev}
      disabled={!prev}
      className="group flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-ink rounded-2xl text-left shadow-stamp transition-all duration-250 ease-spring disabled:opacity-35 disabled:cursor-not-allowed enabled:hover:-translate-x-[2px] enabled:hover:-translate-y-[2px] enabled:hover:[box-shadow:6px_6px_0_0_#241C15]"
    >
      <ChevronLeft className="w-5 h-5 shrink-0 text-ink" strokeWidth={2.5} />
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
          上一条
        </span>
        <span className="block font-sans font-extrabold text-[14px] text-ink truncate">
          {prev ? prev.label : "已是开头"}
        </span>
      </span>
    </button>
    <button
      onClick={onNext}
      disabled={!next}
      className="group flex items-center justify-end gap-3 px-4 py-3.5 bg-ink border-2 border-ink rounded-2xl text-right shadow-stamp transition-all duration-250 ease-spring disabled:opacity-35 disabled:cursor-not-allowed enabled:hover:-translate-x-[2px] enabled:hover:-translate-y-[2px] enabled:hover:[box-shadow:6px_6px_0_0_#241C15]"
    >
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
          下一条
        </span>
        <span className="block font-sans font-extrabold text-[14px] text-white truncate">
          {next ? next.label : "已到结尾"}
        </span>
      </span>
      <ChevronRight className="w-5 h-5 shrink-0 text-white" strokeWidth={2.5} />
    </button>
  </div>
);

export default PromptMethodology;
