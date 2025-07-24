import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  Copy,
  Tag,
  ExternalLink,
  Calendar,
  User,
  Globe,
  BookOpen,
} from "lucide-react";
import { promptsApi } from "../services/api";
import { Prompt } from "../types";
import { toast } from "sonner";

const PromptDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "original" | "translation" | "analysis"
  >("original");

  useEffect(() => {
    const loadPrompt = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await promptsApi.getPromptById(id);
        setPrompt(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载失败");
      } finally {
        setLoading(false);
      }
    };

    loadPrompt();
  }, [id]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type}已复制到剪贴板`);
    } catch (err) {
      toast.error("复制失败");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6 w-1/4"></div>
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded mb-6 w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="flex space-x-4 mb-6">
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !prompt) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-red-600 mb-4">{error || "提示词不存在"}</p>
        <Link
          to="/prompts"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回列表
        </Link>
      </div>
    );
  }

  const tabs = [
    { key: "original", label: "原文", icon: BookOpen },
    { key: "translation", label: "翻译", icon: Globe },
    { key: "analysis", label: "解读", icon: User },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero区域 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 返回按钮 */}
          <Link
            to="/prompts"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            ← 返回提示词列表
          </Link>

          {/* 提示词基本信息 */}
          <div className="">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              ✨ {prompt.name}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-4xl">
              {prompt.ai_description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* 元信息卡片 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-200/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
              <div className="p-3 bg-blue-500 rounded-xl">
                <ExternalLink className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">📁 来源</p>
                <p className="font-bold text-gray-900 text-lg">
                  {prompt.source}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
              <div className="p-3 bg-green-500 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">
                  📅 创建时间
                </p>
                <p className="font-bold text-gray-900 text-lg">
                  {new Date(prompt.created_at).toLocaleDateString("zh-CN")}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Tag className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">
                  🏷️ 标签数量
                </p>
                <p className="font-bold text-gray-900 text-lg">
                  {prompt.tags.length} 个
                </p>
              </div>
            </div>
          </div>

          {/* 标签 */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Tag className="h-5 w-5 mr-2 text-blue-600" />
              🏷️ 相关标签
            </h3>
            <div className="flex flex-wrap gap-3">
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm rounded-xl border border-blue-200/50 font-medium hover:shadow-md transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 内容标签页 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50">
          {/* 标签页导航 */}
          <div className="border-b border-gray-200/50">
            <nav className="flex space-x-2 px-8 pt-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-t-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 标签页内容 */}
          <div className="p-8">
            {activeTab === "original" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    📝 提示词原文
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(prompt.content, "提示词原文")
                    }
                    className="flex items-center space-x-2 px-6 py-3 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Copy className="h-5 w-5" />
                    <span>📋 复制原文</span>
                  </button>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200/50 shadow-inner">
                  <pre className="whitespace-pre-wrap text-base text-gray-800 leading-relaxed font-mono">
                    {prompt.content}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "translation" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    🌍 翻译版本
                  </h3>
                  <button
                    onClick={() => {
                      const translations = prompt.translations || {};
                      const translationText =
                        Object.values(translations)[0] || prompt.content;
                      copyToClipboard(translationText, "翻译内容");
                    }}
                    className="flex items-center space-x-2 px-6 py-3 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Copy className="h-5 w-5" />
                    <span>📋 复制翻译</span>
                  </button>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-200/50 shadow-inner">
                  {prompt.translations &&
                  Object.keys(prompt.translations).length > 0 ? (
                    <div className="space-y-6">
                      {Object.entries(prompt.translations).map(
                        ([lang, translation]) => {
                          const languageNames: { [key: string]: string } = {
                            zh: "🇨🇳 中文",
                            en: "🇺🇸 英语",
                            ja: "🇯🇵 日语",
                            ko: "🇰🇷 韩语",
                            fr: "🇫🇷 法语",
                            de: "🇩🇪 德语",
                            es: "🇪🇸 西班牙语",
                          };
                          return (
                            <div
                              key={lang}
                              className="bg-white/80 rounded-xl p-6 border border-green-200/30 last:border-b-0"
                            >
                              <h4 className="text-lg font-bold text-green-700 mb-4">
                                {languageNames[lang] ||
                                  `🌐 ${lang.toUpperCase()}`}
                              </h4>
                              <pre className="whitespace-pre-wrap text-base text-gray-800 leading-relaxed font-mono">
                                {translation}
                              </pre>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">🌍</div>
                      <p className="text-lg font-medium mb-2">暂无翻译版本</p>
                      <p className="text-sm">可在管理页面使用AI生成翻译</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "analysis" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    🧠 专业解读
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        prompt.interpretation || "暂无解读",
                        "专业解读"
                      )
                    }
                    className="flex items-center space-x-2 px-6 py-3 text-sm bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Copy className="h-5 w-5" />
                    <span>📋 复制解读</span>
                  </button>
                </div>
                <div className="prose max-w-none">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 border border-purple-200/50 shadow-inner">
                    {prompt.interpretation ? (
                      <div className="text-gray-800 leading-relaxed text-base prose prose-gray max-w-none">
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-xl font-semibold text-gray-800 mb-3">{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-lg font-medium text-gray-800 mb-2">{children}</h3>
                            ),
                            p: ({ children }) => (
                              <p className="text-gray-800 leading-relaxed mb-4">{children}</p>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
                            ),
                            li: ({ children }) => (
                              <li className="text-gray-800">{children}</li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-gray-900">{children}</strong>
                            ),
                            em: ({ children }) => (
                              <em className="italic text-gray-700">{children}</em>
                            ),
                            code: ({ children }) => (
                              <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">{children}</code>
                            ),
                            pre: ({ children }) => (
                              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-purple-300 pl-4 italic text-gray-700 mb-4">{children}</blockquote>
                            ),
                          }}
                        >
                          {prompt.interpretation}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <div className="text-6xl mb-4">🧠</div>
                        <p className="text-lg font-medium mb-2">暂无专业解读</p>
                        <p className="text-sm">可在管理页面使用AI生成解读</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 相关推荐 */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            💡 相关推荐
          </h3>
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg font-medium mb-2">暂无相关推荐</p>
            <p className="text-sm">我们正在为您寻找相关的优质提示词</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;
