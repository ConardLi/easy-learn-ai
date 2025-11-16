/**
 * 模型详情弹框组件
 * 展示模型的完整详细信息
 */

import React, { useEffect } from "react";
import {
  X,
  Calendar,
  Lock,
  Unlock,
  Tag,
  ExternalLink,
  Layers,
  MessageSquare,
} from "lucide-react";
import { AIModel } from "../../types/model";

interface ModelDetailModalProps {
  model: AIModel;
  isOpen: boolean;
  onClose: () => void;
}

export const ModelDetailModal: React.FC<ModelDetailModalProps> = ({
  model,
  isOpen,
  onClose,
}) => {
  // 处理 ESC 键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getCompanyColor = (company: string) => {
    const colors: Record<string, string> = {
      Anthropic: "from-orange-500 to-red-500",
      OpenAI: "from-green-500 to-emerald-500",
      DeepSeek: "from-blue-500 to-cyan-500",
      "Moonshot AI": "from-purple-500 to-pink-500",
    };
    return colors[company] || "from-gray-500 to-slate-500";
  };

  // 获取国家图标
  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      '美国': '🇺🇸',
      '中国': '🇨🇳',
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 弹框内容 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* 顶部公司标签栏 */}
        <div
          className={`h-2 bg-gradient-to-r ${getCompanyColor(model.company)}`}
        />

        {/* 头部 */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div className="flex items-start gap-4 flex-1">
            {/* 公司图标 */}
            <div className="flex-shrink-0">
              <img
                src={`/imgs/${model.company}.png`}
                alt={model.company}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* 标题信息 */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {model.modelName}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">{model.company}</span>
                  <span className="text-lg">{getCountryFlag(model.country)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(model.releaseDate)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {model.openSourceStatus === "开源" ? (
                    <>
                      <Unlock className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-medium">开源</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">闭源</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 父模型标识 */}
          {model.parent && (
            <div className="flex items-center gap-2 text-sm bg-purple-50 border border-purple-100 rounded-xl p-3">
              <Layers className="w-4 h-4 text-purple-500" />
              <span className="text-gray-700">
                基于{" "}
                <span className="font-medium text-purple-600">
                  {model.parent}
                </span>
              </span>
            </div>
          )}

          {/* 核心参数 */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">核心参数</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                <div className="text-xs text-blue-600 font-medium mb-1">
                  上下文窗口
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {(() => {
                    const k = model.contextWindow || 0;
                    if (k <= 0) return "N/A";
                    if (k >= 1000) {
                      const m = k / 1000;
                      return Number.isInteger(m) ? `${m}M` : `${m.toFixed(1)}M`;
                    }
                    return `${k}K`;
                  })()}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <div className="text-xs text-purple-600 font-medium mb-1">
                  最大输出
                </div>
                <div className="text-2xl font-bold text-purple-700">
                  {(() => {
                    const k = model.maxGenerationTokenLength || 0;
                    if (k <= 0) return "N/A";
                    if (k >= 1000) {
                      const m = k / 1000;
                      return Number.isInteger(m) ? `${m}M` : `${m.toFixed(1)}M`;
                    }
                    return `${k}K`;
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* 模型标签 */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">功能标签</h3>
            <div className="flex flex-wrap gap-2">
              {model.modelTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 模型描述 */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">模型介绍</h3>
            <p className="text-gray-600 leading-relaxed">{model.description}</p>
          </div>

          {/* 相关链接 */}
          {model.relatedLinks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold text-gray-800">相关资源</h3>
              </div>
              <div className="space-y-2">
                {model.relatedLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors duration-200 group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-blue-600 flex-1">
                      {link.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
