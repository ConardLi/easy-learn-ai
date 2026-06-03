import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Languages,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import {
  aiPromptIndex,
  AIPromptIndexItem,
  AIPromptLearningModule,
} from "../data/aiPromptIndex";
import { DotGrid, HandUnderline, Sparkle4, Star } from "../components/Decorations";
import PromptViewSwitch from "../components/PromptViewSwitch";

const AIPrompts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedModule, setSelectedModule] = useState("全部");

  const categories = useMemo(
    () => ["全部", ...Array.from(new Set(aiPromptIndex.map((item) => item.category)))],
    [],
  );

  const modules = useMemo(
    () => [
      "全部",
      ...Array.from(new Set(aiPromptIndex.flatMap((item) => item.learningModules))),
    ],
    [],
  );

  const productCounts = useMemo(() => {
    return aiPromptIndex.reduce<Record<string, number>>((acc, item) => {
      acc[item.product] = (acc[item.product] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return aiPromptIndex.filter((item) => {
      const inCategory =
        selectedCategory === "全部" || item.category === selectedCategory;
      const inModule =
        selectedModule === "全部" ||
        item.learningModules.includes(selectedModule as AIPromptLearningModule);
      const text = [
        item.product,
        item.title,
        item.vendor,
        item.category,
        item.summary,
        ...item.tags,
        ...item.learningModules,
      ]
        .join(" ")
        .toLowerCase();
      return inCategory && inModule && (!q || text.includes(q));
    });
  }, [searchQuery, selectedCategory, selectedModule]);

  const moduleCount = new Set(aiPromptIndex.flatMap((item) => item.learningModules)).size;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white overflow-hidden">
      <section className="relative bg-butter border-b-2 border-ink overflow-hidden">
        <DotGrid
          className="absolute bottom-8 left-[6%] w-20 h-12 text-ink opacity-35 hidden md:block"
          color="#241C15"
          rows={3}
          cols={5}
        />
        <Star
          className="absolute top-16 right-[7%] w-9 h-9 -rotate-12 text-coral hidden md:block"
          color="#E07A5F"
          filled
        />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 pt-10 lg:pt-11 pb-10 lg:pb-12">
          <PromptViewSwitch active="catalog" className="mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <h1 className="font-display font-extrabold text-display-xl text-ink">
                <span className="whitespace-nowrap">像读源码一样，</span>{" "}
                <span className="whitespace-nowrap">
                  读懂
                  <span className="relative inline-block ml-[0.05em]">
                    <span className="relative z-10">优秀提示词</span>
                    <HandUnderline
                      className="absolute -bottom-2 left-0 right-0 w-full h-3"
                      color="#E07A5F"
                    />
                  </span>
                  。
                </span>
              </h1>
              <p className="font-sans font-medium text-[17px] md:text-[19px] leading-[1.65] text-ink/85 max-w-[700px] mt-5 lg:mt-6">
                把优秀 AI 产品的 Prompt 拆成原文、中文翻译和学习分析。
                先找到一个真实样本，再看它如何安排身份、工具、边界和工作流。
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-y-4 gap-x-6 max-w-[720px] mt-8 pt-5 border-t-2 border-ink/15">
                <MetaItem label="提示词" value={`${aiPromptIndex.length} 份`} />
                <MetaItem label="场景" value={`${categories.length - 1} 类`} />
                <MetaItem label="学习模块" value={`${moduleCount} 个`} />
                <MetaItem label="阅读方式" value="原文 / 翻译 / 分析" />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-6">
              <HeroGuide />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-cream border-b-2 border-ink">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-5 items-start">
            <div className="relative max-w-[760px]">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索产品、标签或模块，例如 Cursor / 工具调用 / 安全规则"
                className="w-full pl-12 pr-12 py-4 bg-white border-2 border-ink rounded-full font-sans text-[15px] text-ink placeholder:text-ink/40 shadow-stamp transition-all duration-250 ease-spring focus:outline-none focus:-translate-x-[2px] focus:-translate-y-[2px] focus:[box-shadow:6px_6px_0_0_#241C15]"
              />
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/55"
                strokeWidth={2.5}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="清除搜索"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-ink/5"
                >
                  <X className="w-4 h-4 text-ink/60" strokeWidth={2.5} />
                </button>
              )}
            </div>
            <div className="font-mono text-[12px] text-ink/55 lg:text-right pt-1">
              当前显示 <span className="font-bold text-ink">{filteredPrompts.length}</span> 份
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <FilterLine
              label="场景"
              values={categories}
              active={selectedCategory}
              onChange={setSelectedCategory}
            />
            <FilterLine
              label="模块"
              values={modules}
              active={selectedModule}
              onChange={setSelectedModule}
            />
          </div>
        </div>
      </section>

      <section className="relative bg-white border-b-2 border-ink">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
              {filteredPrompts.map((item) => (
                <PromptTile
                  key={item.id}
                  item={item}
                  productCount={productCounts[item.product] || 1}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              onClear={() => {
                setSearchQuery("");
                setSelectedCategory("全部");
                setSelectedModule("全部");
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

const MetaItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
      {label}
    </div>
    <div className="font-sans font-bold text-[15px] text-ink mt-1">{value}</div>
  </div>
);

const HeroGuide: React.FC = () => {
  const steps = [
    {
      icon: <Languages className="w-5 h-5" strokeWidth={2.5} />,
      title: "先读翻译",
      body: "看懂每段规则在说什么",
    },
    {
      icon: <GraduationCap className="w-5 h-5" strokeWidth={2.5} />,
      title: "再看拆解",
      body: "理解为什么这样设计",
    },
    {
      icon: <Sparkles className="w-5 h-5" strokeWidth={2.5} />,
      title: "最后迁移",
      body: "改成自己的 Agent 模式",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute -top-4 -right-3 w-16 h-16 bg-coral border-2 border-ink rounded-full shadow-stamp hidden md:block" />
      <div className="relative bg-white border-2 border-ink rounded-[28px] shadow-stamp-xl overflow-hidden">
        <div className="bg-ink text-white px-5 py-3 border-b-2 border-ink flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-coral" />
            <span className="w-3 h-3 rounded-full bg-butter" />
            <span className="w-3 h-3 rounded-full bg-teal" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
            Read Method
          </span>
        </div>
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-4 pb-5 border-b-2 border-ink/10">
            <div className="w-14 h-14 rounded-2xl bg-butter border-2 border-ink shadow-stamp flex items-center justify-center shrink-0">
              <BookOpen className="w-7 h-7 text-ink" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-[25px] text-ink leading-tight">
                三步读法
              </h2>
              <p className="font-sans text-[14px] text-ink-secondary leading-[1.65] mt-1.5">
                不追求一次复制，而是读出结构，学会迁移。
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex items-center gap-3 bg-cream/70 border border-ink/15 rounded-2xl px-4 py-3"
              >
                <span className="font-serif italic text-[18px] text-coral w-6 shrink-0">
                  {index + 1}.
                </span>
                <span className="w-9 h-9 rounded-full bg-white border border-ink/15 flex items-center justify-center text-ink shrink-0">
                  {step.icon}
                </span>
                <span className="min-w-0">
                  <span className="block font-sans font-extrabold text-[15px] text-ink">
                    {step.title}
                  </span>
                  <span className="block font-sans text-[12.5px] text-ink-secondary mt-0.5">
                    {step.body}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterLine: React.FC<{
  label: string;
  values: string[];
  active: string;
  onChange: (value: string) => void;
}> = ({ label, values, active, onChange }) => (
  <div className="flex flex-col md:flex-row md:items-start gap-3">
    <div className="md:w-14 shrink-0 font-sans font-extrabold text-[14px] text-ink pt-1.5">
      {label}
    </div>
    <div className="flex flex-wrap gap-2">
      {values.map((value) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-ink font-sans font-semibold text-[13px] transition-all duration-250 ease-spring ${
              isActive
                ? "bg-ink text-white shadow-[3px_3px_0_0_#241C15]"
                : "bg-white text-ink hover:bg-butter hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:4px_4px_0_0_#241C15]"
            }`}
          >
            <span>{value}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const getPromptVariantTitle = (item: AIPromptIndexItem) => {
  const escapedProduct = item.product.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const withoutProduct = item.title
    .replace(new RegExp(`^${escapedProduct}\\s*`, "i"), "")
    .replace(new RegExp(`^${escapedProduct.replace(/\\ /g, "\\s+")}\\s*`, "i"), "")
    .trim();
  return withoutProduct || item.title;
};

const PromptTile: React.FC<{
  item: AIPromptIndexItem;
  productCount: number;
}> = ({ item, productCount }) => {
  const variantTitle = getPromptVariantTitle(item);

  return (
  <Link
    to={`/ai-prompts/${item.id}`}
    className="group flex flex-col bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:10px_10px_0_0_#241C15]"
  >
    <div className="relative bg-cream border-b-2 border-ink px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50 pt-1">
          {item.category} · {item.difficulty}
        </div>
        {productCount > 1 && (
          <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full bg-white border border-ink/15 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink/55">
            {productCount} 份
          </span>
        )}
      </div>
      <h3 className="font-display font-extrabold text-[28px] text-ink leading-tight mt-3">
        {item.product}
      </h3>
      <div className="mt-3 inline-flex max-w-full items-center px-3 py-1.5 bg-butter border border-ink/20 rounded-full">
        <span className="font-sans font-extrabold text-[13px] text-ink truncate">
          {variantTitle}
        </span>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <p className="font-sans text-[14.5px] text-ink-secondary leading-[1.7] flex-1">
        {item.summary}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-5">
        {item.learningModules.slice(0, 4).map((module) => (
          <ModuleChip key={module} module={module} compact />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 pt-5 border-t border-ink/10">
        <span className="font-sans font-bold text-[13px] text-ink">
          原文 / 翻译 / 分析
        </span>
        <ArrowRight
          className="w-5 h-5 text-ink transition-transform duration-250 group-hover:translate-x-1"
          strokeWidth={2.5}
        />
      </div>
    </div>
  </Link>
  );
};

const ModuleChip: React.FC<{
  module: AIPromptLearningModule;
  compact?: boolean;
}> = ({ module, compact }) => (
  <span
    className={`inline-flex items-center bg-white border border-ink/15 rounded-full font-sans font-bold text-ink ${
      compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-[12px]"
    }`}
  >
    {module}
  </span>
);

const EmptyState: React.FC<{ onClear: () => void }> = ({ onClear }) => (
  <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-8 text-center max-w-xl mx-auto">
    <h3 className="font-display font-extrabold text-[28px] text-ink">
      没找到对应提示词
    </h3>
    <p className="font-sans text-[15px] text-ink-secondary mt-3">
      可以换个关键词，或者清空筛选回到完整目录。
    </p>
    <button
      onClick={onClear}
      className="mt-6 inline-flex items-center px-6 py-3 bg-butter border-2 border-ink rounded-full font-sans font-extrabold text-[14px] text-ink shadow-stamp"
    >
      清空筛选
    </button>
  </div>
);

export default AIPrompts;
