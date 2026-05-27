/**
 * 首页 · Mailchimp-Freddie 风
 *
 * 三大插画动画场景：
 *   - HeroScene      —— Hero 右侧主图（11 张分层素材，入场 + 循环）
 *   - ManifestoScene —— § 一些坚持，8s 成长剧场（种子 → 大树 → 浇水 → 闪光）
 *   - CTAScene       —— BIG CTA 区庆祝时刻（抱星星 + 比赞 + 装饰 burst）
 *
 * 装饰风格：精简 SVG（Decorations.tsx），每区 2-4 个，不抢主图风头。
 */

import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Newspaper,
  GraduationCap,
  Users,
  ArrowUpRight,
  Zap,
  Award,
  Github,
  Cpu,
  ArrowRight,
  Star as LucideStar,
} from "lucide-react";
import {
  Sparkle4,
  Star,
  DotGrid,
  HandArrow,
  CircleScribble,
  HandUnderline,
  Heart,
} from "../components/Decorations";
import HeroScene from "../components/HeroScene";
import ManifestoScene from "../components/ManifestoScene";
import CTAScene from "../components/CTAScene";

interface Chapter {
  serial: string;
  title: string;
  enTitle: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  meta: string;
  bgColor: string;
  iconColor: string;
  invertText?: boolean;
}

const chapters: Chapter[] = [
  {
    serial: "01",
    title: "AI 知视",
    enTitle: "Concepts, made readable",
    description: "把抽象的 AI 概念拆成图与文，看一眼就明白原理。",
    icon: <Brain strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-knowledge",
    meta: "40+ 概念",
    bgColor: "bg-butter",
    iconColor: "text-ink",
  },
  {
    serial: "02",
    title: "AI 应用",
    enTitle: "From idea to agent",
    description: "精选可上手的 AI 应用，从原型一路看到落地。",
    icon: <Zap strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-application",
    meta: "持续更新",
    bgColor: "bg-coral",
    iconColor: "text-ink",
  },
  {
    serial: "03",
    title: "AI 模型",
    enTitle: "The model almanac",
    description: "全球主流大模型一览，参数、能力横向对比一目了然。",
    icon: <Cpu strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-model",
    meta: "100+ 模型",
    bgColor: "bg-cream",
    iconColor: "text-ink",
  },
  {
    serial: "04",
    title: "AI 评估",
    enTitle: "Benchmarks & truths",
    description: "汇集主流测试基准，理性评估模型的真实能力。",
    icon: <Award strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-benchmark",
    meta: "30+ 基准",
    bgColor: "bg-teal",
    iconColor: "text-white",
    invertText: true,
  },
  {
    serial: "05",
    title: "AI 日报",
    enTitle: "Today, in AI",
    description: "每日精选行业动态，浓缩当天最值得读的几条。",
    icon: <Newspaper strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-daily",
    meta: "Daily",
    bgColor: "bg-butter-soft",
    iconColor: "text-ink",
  },
  {
    serial: "06",
    title: "AI 教程",
    enTitle: "Long-form lessons",
    description: "成体系的入门到进阶教程，配合实战由浅入深。",
    icon: <GraduationCap strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-tutorial",
    meta: "20+ 章节",
    bgColor: "bg-coral",
    iconColor: "text-ink",
  },
  {
    serial: "07",
    title: "知识星球",
    enTitle: "The reading circle",
    description: "付费深度社群，与同好把概念聊穿、把项目做到底。",
    icon: <Users strokeWidth={2} className="w-12 h-12" />,
    path: "/knowledge-planet",
    meta: "邀请加入",
    bgColor: "bg-butter",
    iconColor: "text-ink",
  },
];

const Home: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative bg-butter border-b-2 border-ink overflow-hidden">
        {/* 装饰精简到 1 个 —— 因为插画本身自带丰富装饰元素 */}
        <DotGrid
          className="absolute bottom-10 left-8 w-20 h-12 text-ink opacity-50 hidden md:block"
          color="#241C15"
          rows={3}
          cols={5}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 pt-20 lg:pt-24 pb-20 lg:pb-24">
          {/* 双栏 grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* 左：标题 + CTA */}
            <div className="lg:col-span-7">
              {/* eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp font-sans font-semibold text-[12px] uppercase tracking-wider text-ink mb-10">
                <Heart className="w-3.5 h-3.5" color="#E07A5F" filled />
                为爱学习的你做的
              </div>

              {/* 主标题
                  - font-display = Smiley Sans 得意黑（CJK）+ Plus Jakarta（西文）
                  - whitespace-nowrap 包关键短语，保证不会被丑陋拆字
                  - 由 base 层 text-wrap: balance 自动平衡每行字数 */}
              <h1 className="font-display font-extrabold text-display-2xl text-ink">
                <span className="whitespace-nowrap">让 AI 学习</span>{" "}
                <span className="whitespace-nowrap">
                  变得真的
                  <span className="relative inline-block ml-[0.05em]">
                    <span className="relative z-10">简单。</span>
                    <CircleScribble
                      className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)] z-0"
                      color="#E07A5F"
                    />
                  </span>
                </span>
              </h1>

              {/* 副标 —— text-pretty 自动避免孤儿词 */}
              <p className="font-sans font-medium text-[18px] md:text-[20px] leading-[1.6] text-ink/85 max-w-[560px] mt-8">
                复杂的 AI 概念、模型、评测、工具与每日新闻，被认真整理成你能
                <span className="bg-white px-2 mx-0.5 font-bold border-b-[3px] border-ink/85 whitespace-nowrap">
                  轻松看懂
                </span>
                的样子。
              </p>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <Link
                  to="/ai-knowledge"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-white border-2 border-ink rounded-full font-sans font-semibold text-[15px] shadow-stamp-lg transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#241C15] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0_0_0_0_#241C15]"
                >
                  <span>开始读起来</span>
                  <ArrowUpRight
                    className="w-5 h-5 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </Link>
                <a
                  href="https://github.com/ConardLi/easy-learn-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-ink border-2 border-ink rounded-full font-sans font-semibold text-[15px] shadow-stamp-lg transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#241C15] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0_0_0_0_#241C15]"
                >
                  <Github className="w-5 h-5" strokeWidth={2} />
                  <span>GitHub</span>
                  <LucideStar className="w-4 h-4 fill-ink" strokeWidth={0} />
                </a>
              </div>

              {/* 手绘小箭头 + 微文案 */}
              <div className="relative pl-12 mt-8 hidden md:flex items-center">
                <HandArrow
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 -rotate-12 text-ink"
                  color="#241C15"
                />
                <span className="font-serif italic text-[15px] text-ink/70">
                  免费、不收邮箱、不弹窗
                </span>
              </div>
            </div>

            {/* 右：HERO 主图 — 11 张拆分素材独立动画 */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <HeroScene />
            </div>
          </div>

          {/* metadata strip */}
          <div className="mt-16 lg:mt-20 pt-6 border-t-2 border-ink/15">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-6">
              <MetaItem label="章节" value="7 个模块" />
              <MetaItem label="更新" value="每日新读" />
              <MetaItem label="出品" value="ConardLi · 秘密花园" />
              <MetaItem label="花费" value="0 元 · 永远" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ MODULES ═══════════════════════════ */}
      <section className="relative bg-white border-b-2 border-ink overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-24 lg:py-28">
          {/* Section head */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cream border-2 border-ink rounded-full font-sans font-semibold text-[11px] uppercase tracking-wider text-ink mb-5">
                <span>§ 目录</span>
              </div>
              <h2 className="font-display font-extrabold text-display-lg text-ink">
                <span className="whitespace-nowrap">你想从哪一章</span>{" "}
                <span className="whitespace-nowrap">
                  <span className="relative inline-block">
                    <span className="relative z-10">开始</span>
                    <HandUnderline
                      className="absolute -bottom-2 left-0 right-0 w-full h-3"
                      color="#F4D35E"
                    />
                  </span>
                  ？
                </span>
              </h2>
            </div>
            <p className="font-serif italic text-[18px] text-ink-secondary md:text-right max-w-sm">
              每一章都可以独立读，按好奇心顺序就好。
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {chapters.map((ch) => (
              <ChapterCard key={ch.serial} chapter={ch} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ MANIFESTO ═══════════════════════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* 左：成长剧场动画 */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <ManifestoScene />
            </div>

            {/* 右：标题 + 引文 + 三栏 */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-ink rounded-full font-sans font-semibold text-[11px] uppercase tracking-wider text-ink mb-6">
                <span>§ 一些坚持</span>
              </div>
              <h2 className="font-display font-extrabold text-display-lg text-ink">
                <span className="whitespace-nowrap">
                  我们更在乎
                  <span className="relative inline-block ml-[0.05em]">
                    <span className="relative z-10">说清楚</span>
                    <HandUnderline
                      className="absolute -bottom-2 left-0 right-0 w-full h-3"
                      color="#E07A5F"
                    />
                  </span>
                  ，
                </span>
                <span className="whitespace-nowrap">而不是说得多。</span>
              </h2>

              <blockquote className="font-serif italic text-[26px] md:text-[30px] leading-[1.4] text-ink mt-10">
                &ldquo;复杂的想法，值得被
                <span className="not-italic font-sans font-extrabold bg-butter px-2 mx-0.5">
                  耐心地
                </span>
                解释。&rdquo;
              </blockquote>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-10 border-t-2 border-ink/15">
                <Reason
                  num="i."
                  title="可视化优先"
                  body="复杂概念用图解和互动展开，文字只承担补充。"
                />
                <Reason
                  num="ii."
                  title="每日有新读"
                  body="替你筛过——只留真正值得花十分钟的东西。"
                />
                <Reason
                  num="iii."
                  title="精挑不堆砌"
                  body="每一章经过手工编辑，宁可少几篇，不愿水几篇。"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ BIG CTA ═══════════════════════════ */}
      <section className="relative bg-ink border-b-2 border-ink overflow-hidden">
        {/* 仅 2 个装饰 */}
        <Sparkle4
          className="absolute top-12 left-[8%] w-7 h-7 text-butter hidden md:block"
          color="#F4D35E"
        />
        <Star
          className="absolute top-16 right-[10%] w-9 h-9 -rotate-12 text-coral hidden md:block"
          color="#E07A5F"
          filled
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* 左：文字 + CTA */}
            <div className="lg:col-span-7">
              <h2 className="font-display font-extrabold text-display-xl text-white">
                <span className="whitespace-nowrap">觉得对你有用？</span>{" "}
                <span className="whitespace-nowrap">
                  到
                  <span className="relative inline-block mx-[0.1em] align-baseline">
                    <span className="relative z-10 text-butter">GitHub</span>
                    <CircleScribble
                      className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)]"
                      color="#F4D35E"
                    />
                  </span>
                  给颗星吧。
                </span>
              </h2>
              <p className="font-serif italic text-[18px] text-white/65 mt-7 max-w-xl">
                这是免费内容唯一的回报方式，也是我们持续更新的理由。
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <a
                  href="https://github.com/ConardLi/easy-learn-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-butter text-ink border-2 border-butter rounded-full font-sans font-extrabold text-[15px] shadow-[6px_6px_0_0_#E07A5F] transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#E07A5F]"
                >
                  <Github className="w-5 h-5" strokeWidth={2.5} />
                  <span>Star on GitHub</span>
                  <LucideStar className="w-4 h-4 fill-ink" strokeWidth={0} />
                </a>
                <Link
                  to="/knowledge-planet"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-white border-2 border-white/40 rounded-full font-sans font-semibold text-[15px] transition-all duration-250 ease-spring hover:bg-white/10 hover:border-white"
                >
                  <span>加入知识星球</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </Link>
              </div>
            </div>

            {/* 右：庆祝场景（主角抱星星 + 比赞 + 装饰 burst） */}
            <div className="lg:col-span-5">
              <CTAScene />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FOOTER ═══════════════════════════ */}
      <footer className="relative bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          {/* 顶行 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-7">
              <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-butter border-2 border-ink rounded-2xl shadow-stamp">
                  <span className="font-sans font-extrabold text-[18px] text-ink">
                    E
                  </span>
                </div>
                <span className="font-sans font-extrabold text-[22px] text-ink">
                  Easy AI
                </span>
              </Link>
              <p className="font-sans text-[17px] text-ink-secondary leading-relaxed max-w-md">
                把复杂的 AI 概念，整理成你愿意读的样子。
                <br />
                独立编辑维护，慢慢更新。
              </p>
            </div>
            <div className="lg:col-span-5 lg:pl-8">
              <p className="font-sans text-[15px] text-ink-secondary leading-relaxed max-w-md mb-6">
                如果觉得有用，欢迎来 GitHub 给颗星，或加入星球继续深读。
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/ConardLi/easy-learn-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-[14px] text-ink bg-butter border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
                >
                  <Github className="w-4 h-4" strokeWidth={2} />
                  <span>Star</span>
                </a>
                <Link
                  to="/knowledge-planet"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-[14px] text-ink bg-white border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
                >
                  加入星球
                </Link>
              </div>
            </div>
          </div>

          {/* 链接四栏 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t-2 border-ink/10">
            <FooterCol
              heading="Read"
              links={[
                { name: "AI 知视", path: "/ai-knowledge" },
                { name: "AI 应用", path: "/ai-application" },
                { name: "AI 教程", path: "/ai-tutorial" },
              ]}
            />
            <FooterCol
              heading="Reference"
              links={[
                { name: "AI 模型", path: "/ai-model" },
                { name: "AI 评估", path: "/ai-benchmark" },
                { name: "AI 日报", path: "/ai-daily" },
              ]}
            />
            <FooterCol
              heading="Community"
              links={[
                { name: "知识星球", path: "/knowledge-planet" },
                {
                  name: "B 站",
                  path: "https://space.bilibili.com/474921808",
                  external: true,
                },
                {
                  name: "GitHub",
                  path: "https://github.com/ConardLi/easy-learn-ai",
                  external: true,
                },
              ]}
            />
            <div>
              <div className="eyebrow mb-4">About</div>
              <p className="font-sans text-[14px] text-ink-secondary leading-[1.7]">
                Curated &amp; coded by
                <br />
                <span className="font-semibold text-ink">ConardLi</span>
                <br />
                @ code 秘密花园
              </p>
            </div>
          </div>

          {/* 底部 */}
          <div className="mt-16 pt-6 border-t-2 border-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">
              © 2025 Easy AI · All rights reserved
            </p>
            <p className="font-serif italic text-[14px] text-ink-tertiary flex items-center gap-2">
              <Heart className="w-3.5 h-3.5" color="#E07A5F" filled />
              Made for AI learners
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ────────────── 子组件 ────────────── */

const MetaItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
      {label}
    </div>
    <div className="font-sans font-bold text-[15px] text-ink mt-1">{value}</div>
  </div>
);

const ChapterCard: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const ch = chapter;
  return (
    <Link
      to={ch.path}
      className="group flex flex-col bg-white border-2 border-ink rounded-3xl shadow-stamp-lg transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:10px_10px_0_0_#241C15] overflow-hidden"
    >
      {/* 顶部色块 */}
      <div
        className={`relative ${ch.bgColor} border-b-2 border-ink h-32 flex items-center justify-center`}
      >
        <span
          className={`absolute top-3 left-4 font-mono text-[12px] font-bold ${
            ch.invertText ? "text-white/70" : "text-ink/55"
          }`}
        >
          {ch.serial}
        </span>
        <Sparkle4
          className="absolute top-3 right-4 w-3.5 h-3.5"
          color={ch.invertText ? "#FFFFFF" : "#241C15"}
        />
        <div className={ch.iconColor}>{ch.icon}</div>
      </div>

      {/* 文字区 */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="font-sans font-extrabold text-[22px] text-ink leading-tight">
            {ch.title}
          </h3>
        </div>
        <p className="font-serif italic text-[13px] text-ink-tertiary mb-3">
          {ch.enTitle}
        </p>
        <p className="font-sans text-[15px] text-ink-secondary leading-relaxed flex-1">
          {ch.description}
        </p>
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-ink/10">
          <span className="inline-flex items-center px-3 py-1 bg-cream rounded-full text-[12px] font-semibold text-ink border border-ink/15">
            {ch.meta}
          </span>
          <ArrowUpRight
            className="w-5 h-5 text-ink transition-transform duration-250 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.5}
          />
        </div>
      </div>
    </Link>
  );
};

const Reason: React.FC<{ num: string; title: string; body: string }> = ({
  num,
  title,
  body,
}) => (
  <div>
    <div className="font-serif italic text-[18px] text-coral mb-2">{num}</div>
    <h3 className="font-sans font-extrabold text-[19px] text-ink mb-2 leading-tight">
      {title}
    </h3>
    <p className="font-sans text-[14px] text-ink-secondary leading-[1.65]">
      {body}
    </p>
  </div>
);

const FooterCol: React.FC<{
  heading: string;
  links: { name: string; path: string; external?: boolean }[];
}> = ({ heading, links }) => (
  <div>
    <div className="eyebrow mb-4">{heading}</div>
    <ul className="space-y-2.5">
      {links.map((l) =>
        l.external ? (
          <li key={l.name}>
            <a
              href={l.path}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[15px] text-ink-secondary hover:text-ink transition-colors duration-250"
            >
              {l.name}
            </a>
          </li>
        ) : (
          <li key={l.name}>
            <Link
              to={l.path}
              className="font-sans text-[15px] text-ink-secondary hover:text-ink transition-colors duration-250"
            >
              {l.name}
            </Link>
          </li>
        )
      )}
    </ul>
  </div>
);

export default Home;
