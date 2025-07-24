import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Eye,
  Wand2,
  Copy,
  ExternalLink,
  User,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { adminApi } from "../services/api";
import { Prompt, SearchFilters } from "../types";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const PromptManagement = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    page: 1,
    pageSize: 20,
  });
  const [showForm, setShowForm] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState<
    Partial<Prompt & { targetLanguage: string }>
  >({
    name: "",
    ai_description: "",
    content: "",
    translations: {},
    interpretation: "",
    source: "",
    tags: [],
    category: "",
    targetLanguage: "en",
  });

  useEffect(() => {
    loadPrompts();
  }, [searchTerm, filters]);

  const loadPrompts = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getPromptsForAdmin();
      // 在客户端进行搜索和过滤
      let filteredPrompts = response;
      if (searchTerm) {
        filteredPrompts = filteredPrompts.filter(
          (prompt) =>
            prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.ai_description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }
      if (filters.category) {
        filteredPrompts = filteredPrompts.filter(
          (prompt) => prompt.category === filters.category
        );
      }
      if (filters.source) {
        filteredPrompts = filteredPrompts.filter(
          (prompt) => prompt.source === filters.source
        );
      }
      setPrompts(filteredPrompts);
    } catch (err) {
      toast.error("加载提示词失败");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.content) {
      toast.error("请填写必填字段");
      return;
    }

    try {
      // 过滤掉不属于数据库字段的属性
      const { targetLanguage, ...promptData } = formData;

      if (editingPrompt) {
        await adminApi.updatePrompt(editingPrompt.id, promptData as Prompt);
        toast.success("提示词更新成功");
      } else {
        await adminApi.createPrompt(promptData as Prompt);
        toast.success("提示词创建成功");
      }
      resetForm();
      loadPrompts();
    } catch (err) {
      console.error("操作失败:", err);
      toast.error(err instanceof Error ? err.message : "操作失败");
    }
  };

  const handleEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setFormData(prompt);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    // 移除confirm()调用，直接执行删除操作
    try {
      await adminApi.deletePrompt(id);
      toast.success("提示词删除成功");
      loadPrompts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "删除失败");
    }
  };

  const handleGenerateContent = async () => {
    console.log("🚀 [AI智能分析] 开始执行");

    if (!formData.content) {
      console.log("❌ [AI智能分析] 验证失败: 提示词内容为空");
      toast.error("请先输入提示词内容");
      return;
    }

    console.log("📝 [AI智能分析] 输入内容:", {
      content:
        formData.content.substring(0, 100) +
        (formData.content.length > 100 ? "..." : ""),
      contentLength: formData.content.length,
    });

    setGenerating(true);
    const startTime = Date.now();

    try {
      const targetLanguage = formData.targetLanguage || "en";
      console.log("🌐 [AI智能分析] 目标语言:", targetLanguage);
      console.log("⚡ [AI智能分析] 开始并行执行三个任务");

      // 并行执行三个任务：标签+描述（结构化输出）、翻译、解读
      const [structuredResponse, translationResponse, analysisResponse] =
        await Promise.all([
          // 任务1: 生成结构化内容（标签+描述）
          (async () => {
            console.log(
              "📋🏷️ [AI智能分析] 任务1: 开始生成结构化内容（标签+描述）"
            );
            const response = await adminApi.generateContent({
              type: "structured",
              content: formData.content,
              targetLanguage: targetLanguage,
            });
            console.log("✅ [AI智能分析] 任务1完成: 结构化内容生成成功", {
              hasDescription: !!(typeof response.result === 'object' && 'description' in response.result && response.result.description),
              tagsCount: typeof response.result === 'object' && 'tags' in response.result && Array.isArray(response.result.tags)
                ? response.result.tags.length
                : 0,
            });
            return response;
          })(),

          // 任务2: 生成翻译（仅在有目标语言时执行）
          targetLanguage &&
            (async () => {
              console.log("🌍 [AI智能分析] 任务2: 开始生成翻译", {
                targetLanguage,
              });
              const response = await adminApi.generateContent({
                type: "translation",
                content: formData.content,
                targetLanguage: targetLanguage,
              });
              console.log("✅ [AI智能分析] 任务2完成: 翻译生成成功", {
                result:
                  typeof response.result === "string"
                    ? response.result.substring(0, 100) + "..."
                    : "非字符串结果",
              });
              return response;
            })(),

          // 任务3: 生成解读
          (async () => {
            console.log("🔍 [AI智能分析] 任务3: 开始生成解读");
            const response = await adminApi.generateContent({
              type: "analysis",
              content: formData.content,
              targetLanguage: targetLanguage,
            });
            console.log("✅ [AI智能分析] 任务3完成: 解读生成成功", {
              result:
                typeof response.result === "string"
                  ? response.result.substring(0, 100) + "..."
                  : "非字符串结果",
            });
            return response;
          })(),
        ]);

      console.log("🔄 [AI智能分析] 开始更新表单数据");
      setFormData((prev) => {
        // 更新translations字段
        const currentTranslations = prev.translations || {};
        const translationResult =
          typeof translationResponse.result === "string"
            ? translationResponse.result
            : "";

        // 处理结构化响应
        const structuredResult = structuredResponse.result;
        const description: string =
          typeof structuredResult === "object" && structuredResult !== null && 'description' in structuredResult
            ? String(structuredResult.description)
            : typeof structuredResult === "string"
            ? structuredResult
            : "";
        const tags: string[] = 
          typeof structuredResult === "object" && structuredResult !== null && 'tags' in structuredResult && Array.isArray(structuredResult.tags)
            ? structuredResult.tags
            : [];

        const newFormData = {
          ...prev,
          ai_description: description,
          tags: tags,
          translations: translationResult
            ? {
                ...currentTranslations,
                [targetLanguage]: translationResult,
              }
            : currentTranslations,
          interpretation:
            typeof analysisResponse.result === "string"
              ? analysisResponse.result
              : "",
        };

        console.log("📊 [AI智能分析] 表单数据更新完成", {
          ai_description: newFormData.ai_description,
          tags: newFormData.tags,
          translationsKeys: Object.keys(newFormData.translations),
          interpretationLength: newFormData.interpretation.length,
        });

        return newFormData;
      });

      const endTime = Date.now();
      const duration = endTime - startTime;
      console.log("🎉 [AI智能分析] 全部完成!", {
        totalDuration: `${duration}ms`,
        parallelTasks: 3,
        success: true,
      });

      toast.success("AI生成完成！");
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;

      console.error("💥 [AI智能分析] 执行失败:", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        duration: `${duration}ms`,
      });

      toast.error("生成内容失败，请检查AI模型配置");
    } finally {
      setGenerating(false);
      console.log("🏁 [AI智能分析] 执行结束，状态重置");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      ai_description: "",
      content: "",
      translations: {},
      interpretation: "",
      source: "",
      tags: [],
      category: "",
      targetLanguage: "en",
    });
    setEditingPrompt(null);
    setShowForm(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setFormData((prev) => ({
        ...prev,
        [name]: value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("已复制到剪贴板");
  };

  const categories = [
    "写作助手",
    "编程开发",
    "营销推广",
    "学术研究",
    "翻译语言",
    "创意设计",
    "数据分析",
    "其他",
  ];
  const sources = ["OpenAI", "Anthropic", "用户提交", "官方示例", "社区贡献"];

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <Wand2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              提示词管理
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              管理和优化您的AI提示词库
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus className="h-5 w-5 mr-2" />
          添加提示词
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Filter className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">搜索与筛选</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
            <input
              type="text"
              placeholder="搜索提示词..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          <select
            value={filters.category || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category: e.target.value || undefined,
              }))
            }
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white font-medium"
          >
            <option value="">🏷️ 所有分类</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={filters.source || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                source: e.target.value || undefined,
              }))
            }
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white font-medium"
          >
            <option value="">🔗 所有来源</option>
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearchTerm("");
              setFilters({ page: 1, pageSize: 20 });
            }}
            className="px-6 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200"
          >
            🔄 重置
          </button>
        </div>
      </div>

      {/* 提示词表单 */}
      {showForm && (
        <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl shadow-2xl border border-indigo-200 overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-xl shadow-lg backdrop-blur-sm">
                  <Wand2 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {editingPrompt ? "✏️ 编辑提示词" : "✨ 创建新提示词"}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {editingPrompt
                      ? "修改现有提示词的内容和设置"
                      : "创建一个新的AI提示词模板"}
                  </p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20 hover:border-white/40 backdrop-blur-sm"
              >
                <Plus className="h-5 w-5 rotate-45" />
                <span className="text-sm font-medium">关闭</span>
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-10 space-y-10 bg-gradient-to-br from-white to-indigo-50/30"
          >
            {/* 用户填写区域 */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl shadow-sm">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900">
                    📝 基础信息填写
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    请填写提示词的基本信息
                  </p>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 via-indigo-200 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-bold text-gray-700">
                    <span className="text-red-500 mr-2 text-lg">*</span>
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      提示词名称
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md font-medium"
                    placeholder="✨ 请输入一个吸引人的提示词名称"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center text-sm font-bold text-gray-700">
                    <span className="text-red-500 mr-2 text-lg">*</span>
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      提示词来源
                    </span>
                  </label>
                  <input
                    type="text"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md font-medium"
                    placeholder="📝 请输入提示词来源（如：OpenAI、用户提交等）"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    🌍 翻译目标语言
                  </label>
                  <select
                    name="targetLanguage"
                    value={formData.targetLanguage || "en"}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md font-medium"
                  >
                    <option value="zh">🇨🇳 中文 (Chinese)</option>
                    <option value="en">🇺🇸 英语 (English)</option>
                    <option value="ja">🇯🇵 日语 (日本語)</option>
                    <option value="ko">🇰🇷 韩语 (한국어)</option>
                    <option value="fr">🇫🇷 法语 (Français)</option>
                    <option value="de">🇩🇪 德语 (Deutsch)</option>
                    <option value="es">🇪🇸 西班牙语 (Español)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center text-sm font-bold text-gray-700">
                  <span className="text-red-500 mr-2 text-lg">*</span>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    提示词正文
                  </span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm resize-none shadow-sm hover:shadow-md font-medium leading-relaxed"
                  placeholder="📝 请输入提示词的完整内容，详细描述您希望AI执行的任务..."
                  required
                />
              </div>
            </div>

            {/* AI生成区域 */}
            <div className="space-y-8 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-3xl p-8 border-2 border-purple-200/50 shadow-inner">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-lg">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900">
                    🤖 AI 智能生成
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    让AI为您自动生成完善的提示词信息
                  </p>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-200 via-pink-200 to-transparent"></div>
                <button
                  type="button"
                  onClick={handleGenerateContent}
                  disabled={generating || !formData.content}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none"
                >
                  {generating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      <span className="text-lg">🎯 AI生成中...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-5 w-5 mr-3" />
                      <span className="text-lg">✨ AI 智能分析</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-bold text-gray-700">
                    <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      AI生成简介 (50字内)
                    </span>
                  </label>
                  <textarea
                    name="ai_description"
                    value={formData.ai_description || ""}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 resize-none shadow-inner font-medium leading-relaxed"
                    placeholder="✨ AI将自动生成简洁而吸引人的提示词简介..."
                    readOnly
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center text-sm font-bold text-gray-700">
                    <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      AI生成标签 (5个)
                    </span>
                  </label>
                  <div className="min-h-[100px] p-5 border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-inner">
                    {formData.tags && formData.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-2 border-purple-200 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
                          >
                            🏷️ {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-sm font-medium">
                          🎯 AI将自动生成5个精准的相关标签...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center text-sm font-bold text-gray-700">
                  <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI生成翻译 (
                    {formData.targetLanguage === "en"
                      ? "🇺🇸 英语"
                      : formData.targetLanguage === "ja"
                      ? "🇯🇵 日语"
                      : formData.targetLanguage === "ko"
                      ? "🇰🇷 韩语"
                      : formData.targetLanguage === "fr"
                      ? "🇫🇷 法语"
                      : formData.targetLanguage === "de"
                      ? "🇩🇪 德语"
                      : formData.targetLanguage === "es"
                      ? "🇪🇸 西班牙语"
                      : "🌍 未知语言"}
                    )
                  </span>
                </label>
                <textarea
                  value={
                    formData.translations?.[formData.targetLanguage || "en"] ||
                    ""
                  }
                  onChange={(e) => {
                    const targetLang = formData.targetLanguage || "en";
                    setFormData((prev) => ({
                      ...prev,
                      translations: {
                        ...prev.translations,
                        [targetLang]: e.target.value,
                      },
                    }));
                  }}
                  rows={6}
                  className="w-full px-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 resize-none shadow-inner font-medium leading-relaxed"
                  placeholder={`🌐 AI将自动翻译提示词到${
                    formData.targetLanguage === "en"
                      ? "英语"
                      : formData.targetLanguage === "ja"
                      ? "日语"
                      : formData.targetLanguage === "ko"
                      ? "韩语"
                      : formData.targetLanguage === "fr"
                      ? "法语"
                      : formData.targetLanguage === "de"
                      ? "德语"
                      : formData.targetLanguage === "es"
                      ? "西班牙语"
                      : "目标语言"
                  }，确保语义准确...`}
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center text-sm font-bold text-gray-700">
                  <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI生成解读
                  </span>
                </label>
                <textarea
                  name="interpretation"
                  value={formData.interpretation}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 resize-none shadow-inner font-medium leading-relaxed"
                  placeholder="🧠 AI将自动解读提示词的关键设计要点和使用技巧..."
                  readOnly
                />
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-end space-x-6 pt-8 border-t-2 border-gradient-to-r from-indigo-200 to-purple-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-4 border-2 border-gray-300 rounded-2xl text-base font-bold text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                ❌ 取消
              </button>
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
              >
                {editingPrompt ? "💾 更新提示词" : "🚀 创建提示词"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 提示词列表 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">提示词列表</h3>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {prompts.length}
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">加载中...</p>
          </div>
        ) : prompts.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">暂无提示词</p>
            <p className="text-gray-400 text-sm mt-2">
              点击上方按钮添加您的第一个提示词
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    📝 名称
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    🏷️ 分类/来源
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    🔖 标签
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    📅 创建时间
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    ⚙️ 操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {prompts.map((prompt, index) => (
                  <tr
                    key={prompt.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100 group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200">
                          <Wand2 className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                            {prompt.name}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 line-clamp-2 max-w-md">
                            {prompt.ai_description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800">
                          {prompt.category}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          {prompt.source}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-2">
                        {prompt.tags?.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200 hover:from-purple-200 hover:to-pink-200 transition-all duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                        {prompt.tags && prompt.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                            +{prompt.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="p-1 bg-gray-100 rounded">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {new Date(prompt.created_at).toLocaleDateString(
                            "zh-CN"
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/prompt/${prompt.id}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 group/btn"
                          title="查看详情"
                        >
                          <ExternalLink className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                        </Link>
                        <button
                          onClick={() => copyToClipboard(prompt.content)}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-100 rounded-lg transition-all duration-200 group/btn"
                          title="复制内容"
                        >
                          <Copy className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                        </button>
                        <button
                          onClick={() => handleEdit(prompt)}
                          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-lg transition-all duration-200 group/btn"
                          title="编辑"
                        >
                          <Edit2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                        </button>
                        <button
                          onClick={() => handleDelete(prompt.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 group/btn"
                          title="删除"
                        >
                          <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptManagement;
