import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Code2,
  Copy,
  FileText,
  GraduationCap,
  Languages,
  Loader2,
} from "lucide-react";
import {
  aiPromptIndex,
  aiPromptIndexById,
  AIPromptIndexItem,
} from "../data/aiPromptIndex";

type PromptTab = "learning" | "translation" | "original";

const tabs: Record<PromptTab, { label: string; hint: string; icon: React.ReactNode }> = {
  learning: {
    label: "学习分析",
    hint: "先看结构和设计思路",
    icon: <GraduationCap className="w-4 h-4" strokeWidth={2.5} />,
  },
  translation: {
    label: "中文翻译",
    hint: "完整中文对照",
    icon: <Languages className="w-4 h-4" strokeWidth={2.5} />,
  },
  original: {
    label: "原文",
    hint: "保留原始 Prompt",
    icon: <FileText className="w-4 h-4" strokeWidth={2.5} />,
  },
};

const AIPromptDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = id ? aiPromptIndexById[id] : undefined;
  const [activeTab, setActiveTab] = useState<PromptTab>("learning");
  const [content, setContent] = useState("");
  const [state, setState] = useState<"loading" | "ready" | "missing" | "error">(
    "loading",
  );
  const [copied, setCopied] = useState(false);

  const related = useMemo(() => {
    if (!item) return [];
    return aiPromptIndex
      .filter((candidate) => candidate.id !== item.id)
      .filter(
        (candidate) =>
          candidate.category === item.category ||
          candidate.learningModules.some((module) =>
            item.learningModules.includes(module),
          ),
      )
      .slice(0, 3);
  }, [item]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!item) return;
    const path =
      activeTab === "original"
        ? item.originalPath
        : activeTab === "translation"
          ? item.translationPath
          : item.learningPath;

    const controller = new AbortController();
    setContent("");
    setState("loading");

    fetch(encodeURI(path), { signal: controller.signal })
      .then((res) => {
        if (res.status === 404) {
          setState("missing");
          return "";
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (text) {
          setContent(text);
          setState("ready");
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") setState("error");
      });

    return () => controller.abort();
  }, [activeTab, item]);

  if (!item) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-8 text-center max-w-md">
          <AlertCircle className="w-10 h-10 text-coral mx-auto mb-4" />
          <h1 className="font-display font-extrabold text-[28px] text-ink">
            没找到这份提示词
          </h1>
          <button
            onClick={() => navigate("/ai-prompts")}
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-butter border-2 border-ink rounded-full font-sans font-extrabold text-[14px] shadow-stamp"
          >
            <ArrowLeft className="w-4 h-4" />
            回到提示词目录
          </button>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-ink text-white border-b-2 border-ink">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
          <Link
            to="/ai-prompts"
            className="inline-flex items-center gap-2 font-sans font-bold text-[14px] text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            回到提示词目录
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-end">
            <div className="lg:col-span-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                {item.vendor} · {item.category} · {item.sourceStatus}
              </div>
              <h1 className="font-display font-extrabold text-[42px] md:text-[58px] leading-[1.04] mt-3">
                {item.product}
              </h1>
              <p className="font-serif italic text-[17px] text-white/55 mt-2">
                {item.title}
              </p>
              <p className="font-sans text-[16px] md:text-[17px] text-white/74 leading-[1.75] max-w-3xl mt-6">
                {item.summary}
              </p>
            </div>
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <InfoCard label="难度" value={item.difficulty} />
              <InfoCard label="类型" value={item.promptType} />
              <InfoCard label="版本" value={item.versionLabel} wide />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream border-b-2 border-ink">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(Object.keys(tabs) as PromptTab[]).map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-3 px-4 py-3 border-2 border-ink rounded-2xl text-left transition-all duration-250 ease-spring ${
                    active
                      ? "bg-butter shadow-stamp"
                      : "bg-white hover:bg-butter/60"
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-ink/15">
                    {tabs[tab].icon}
                  </span>
                  <span>
                    <span className="block font-sans font-extrabold text-[15px] text-ink">
                      {tabs[tab].label}
                    </span>
                    <span className="block font-sans text-[12px] text-ink/55">
                      {tabs[tab].hint}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-10 items-start">
          <main className="min-w-0 bg-white border-2 border-ink rounded-[28px] shadow-stamp-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-cream px-5 md:px-7 py-4 border-b-2 border-ink">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                  Reading mode
                </div>
                <h2 className="font-display font-extrabold text-[24px] text-ink mt-1">
                  {tabs[activeTab].label}
                </h2>
              </div>
              <button
                onClick={handleCopy}
                disabled={state !== "ready"}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-ink rounded-full font-sans font-bold text-[13px] text-ink shadow-stamp disabled:opacity-45 disabled:cursor-not-allowed transition-all duration-250 ease-spring enabled:hover:-translate-x-[2px] enabled:hover:-translate-y-[2px] enabled:hover:[box-shadow:6px_6px_0_0_#241C15]"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-teal" strokeWidth={2.5} />
                ) : (
                  <Copy className="w-4 h-4" strokeWidth={2.5} />
                )}
                {copied ? "已复制" : "复制当前内容"}
              </button>
            </div>
            <div className="p-5 md:p-8 lg:p-10">
              <Reader state={state} content={content} activeTab={activeTab} />
            </div>
          </main>

          <aside className="lg:sticky lg:top-24 space-y-5">
            <SideBlock title="学习模块">
              <div className="flex flex-wrap gap-2">
                {item.learningModules.map((module) => (
                  <span
                    key={module}
                    className="inline-flex items-center px-3 py-1.5 bg-white border border-ink/15 rounded-full font-sans font-bold text-[12px] text-ink"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </SideBlock>
            <SideBlock title="亮点">
              <ul className="space-y-3">
                {item.highlights.map((text, index) => (
                  <li key={text} className="font-sans text-[13.5px] text-ink-secondary leading-[1.65]">
                    <span className="font-serif italic text-coral mr-2">
                      {index + 1}.
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </SideBlock>
            <SideBlock title="别直接照抄">
              <ul className="space-y-2">
                {item.cautions.map((text) => (
                  <li key={text} className="font-sans text-[13.5px] text-ink-secondary leading-[1.65]">
                    {text}
                  </li>
                ))}
              </ul>
            </SideBlock>
            {related.length > 0 && (
              <SideBlock title="继续读">
                <div className="space-y-2.5">
                  {related.map((prompt) => (
                    <Link
                      key={prompt.id}
                      to={`/ai-prompts/${prompt.id}`}
                      className="block bg-white border border-ink/15 rounded-2xl px-3 py-3 hover:border-ink transition-colors"
                    >
                      <div className="font-sans font-extrabold text-[14px] text-ink">
                        {prompt.product}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 mt-1">
                        {prompt.category}
                      </div>
                    </Link>
                  ))}
                </div>
              </SideBlock>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
};

const InfoCard: React.FC<{ label: string; value: string; wide?: boolean }> = ({
  label,
  value,
  wide,
}) => (
  <div
    className={`bg-white/10 border border-white/20 rounded-2xl px-4 py-3 ${
      wide ? "col-span-2" : ""
    }`}
  >
    <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
      {label}
    </div>
    <div className="font-sans font-extrabold text-[13px] text-white mt-1 leading-snug">
      {value}
    </div>
  </div>
);

const SideBlock: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className="bg-cream border-2 border-ink rounded-3xl shadow-stamp p-5">
    <h3 className="font-display font-extrabold text-[20px] text-ink mb-4 pb-3 border-b-2 border-ink/15">
      {title}
    </h3>
    {children}
  </section>
);

const Reader: React.FC<{
  state: "loading" | "ready" | "missing" | "error";
  content: string;
  activeTab: PromptTab;
}> = ({ state, content, activeTab }) => {
  if (state === "loading") {
    return (
      <div className="min-h-[420px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-coral animate-spin mx-auto mb-4" />
          <p className="font-sans font-semibold text-ink/65">正在打开资料...</p>
        </div>
      </div>
    );
  }

  if (state === "missing") {
    return (
      <Notice
        title="这部分还在整理"
        body={
          activeTab === "translation"
            ? "中文翻译文件还没有生成。你可以先切到原文阅读。"
            : "学习分析文件还没有生成。后续补齐后这里会自动展示。"
        }
      />
    );
  }

  if (state === "error") {
    return <Notice title="资料加载失败" body="请检查索引路径或稍后再试。" />;
  }

  return (
    <div className="prompt-reader">
      <style>{readerStyles}</style>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

const Notice: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <div className="min-h-[420px] flex items-center justify-center">
    <div className="max-w-md bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-8 text-center">
      <AlertCircle className="w-10 h-10 text-coral mx-auto mb-4" strokeWidth={2.5} />
      <h3 className="font-display font-extrabold text-[26px] text-ink">{title}</h3>
      <p className="font-sans text-[15px] text-ink-secondary leading-[1.7] mt-3">
        {body}
      </p>
    </div>
  </div>
);

type MdProps = {
  children?: React.ReactNode;
  href?: string;
  inline?: boolean;
  className?: string;
};

const mdComponents = {
  h1: ({ children }: MdProps) => (
    <h1 className="font-display font-extrabold text-[30px] md:text-[40px] text-ink leading-[1.15] mb-8">
      {children}
    </h1>
  ),
  h2: ({ children }: MdProps) => (
    <h2 className="font-display font-extrabold text-[24px] md:text-[29px] text-ink leading-[1.25] mt-12 mb-5 pb-3 border-b-2 border-ink">
      {children}
    </h2>
  ),
  h3: ({ children }: MdProps) => (
    <h3 className="font-display font-extrabold text-[20px] md:text-[23px] text-ink leading-[1.35] mt-9 mb-4">
      {children}
    </h3>
  ),
  p: ({ children }: MdProps) => (
    <p className="font-sans text-[15.5px] md:text-[16.5px] text-ink leading-[1.9] mb-5">
      {children}
    </p>
  ),
  ul: ({ children }: MdProps) => (
    <ul className="font-sans text-[15.5px] md:text-[16.5px] text-ink leading-[1.85] mb-5 space-y-2 list-none pl-0">
      {children}
    </ul>
  ),
  ol: ({ children }: MdProps) => (
    <ol className="font-sans text-[15.5px] md:text-[16.5px] text-ink leading-[1.85] mb-5 space-y-2 list-decimal pl-6">
      {children}
    </ol>
  ),
  li: ({ children }: MdProps) => (
    <li className="pl-1 marker:text-coral">{children}</li>
  ),
  a: ({ children, href }: MdProps & { href?: string }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="font-semibold text-ink underline decoration-coral decoration-2 underline-offset-[3px] hover:text-coral"
    >
      {children}
    </a>
  ),
  code: ({ inline, children, className }: MdProps) => {
    if (inline) {
      return (
        <code className="px-1.5 py-0.5 mx-0.5 bg-cream border border-ink/10 rounded font-mono text-[0.88em] text-ink-secondary">
          {children}
        </code>
      );
    }
    return (
      <code className={`${className || ""} font-mono text-[13px] leading-[1.75]`}>
        {children}
      </code>
    );
  },
  pre: ({ children }: MdProps) => (
    <pre className="my-7 px-5 py-4 bg-ink text-white border-2 border-ink rounded-2xl shadow-stamp overflow-x-auto font-mono text-[13px] leading-[1.75]">
      {children}
    </pre>
  ),
  blockquote: ({ children }: MdProps) => (
    <blockquote className="my-6 pl-5 pr-5 py-4 bg-butter/25 border-l-[4px] border-coral rounded-r-2xl font-sans text-[15px] text-ink-secondary leading-[1.75]">
      {children}
    </blockquote>
  ),
  strong: ({ children }: MdProps) => (
    <strong className="font-extrabold text-ink">{children}</strong>
  ),
};

const readerStyles = `
  .prompt-reader > :first-child { margin-top: 0 !important; }
  .prompt-reader > :last-child { margin-bottom: 0 !important; }
  .prompt-reader ul ul,
  .prompt-reader ol ol,
  .prompt-reader ul ol,
  .prompt-reader ol ul { margin-top: 0.5rem; margin-bottom: 0; }
`;

export default AIPromptDetail;
