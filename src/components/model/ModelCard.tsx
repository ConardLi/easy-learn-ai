/**
 * 模型卡片 · Mailchimp-Freddie 风
 *
 * 设计要点：
 * - stamp 风：白底 + ink 2px 边 + offset 阴影，hover 上左平移
 * - 顶 strip 用品牌色循环（不再彩虹渐变 typeColorMap）
 * - 数据块 (context / output / resolution) 改 cream 浅奶油 + ink 边，无渐变
 * - 标签 chips 单色 + ink 细边
 * - 信息层级：公司+国家 → 模型名 → 时间/开源 → 数据格 → 标签 → 描述
 */

import React, { useState } from "react";
import { Calendar, Lock, Unlock, Tag } from "lucide-react";
import { AIModel } from "../../types/model";
import { ModelDetailModal } from "./ModelDetailModal";

interface ModelCardProps {
  model: AIModel;
}

/** 公司 → 品牌色 strip (循环 5 色，避免乱) */
const companyAccent = (company: string): string => {
  const palette = [
    "bg-butter", // 黄
    "bg-coral", // 珊瑚
    "bg-teal", // 深 teal
    "bg-pop", // 玫粉
    "bg-butter-deep", // 深黄
  ];
  /* 哈希分配，保证同公司始终同色 */
  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = (hash * 31 + company.charCodeAt(i)) % 1000;
  }
  return palette[hash % palette.length];
};

const countryFlag = (country: string): string => {
  const flags: Record<string, string> = {
    美国: "🇺🇸",
    中国: "🇨🇳",
    英国: "🇬🇧",
    德国: "🇩🇪",
    法国: "🇫🇷",
    加拿大: "🇨🇦",
    日本: "🇯🇵",
  };
  return flags[country] || "🌍";
};

const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
    });
  } catch {
    return dateStr;
  }
};

/** 大数字格式化：1024 → 1M, 128 → 128K, 0 / null → N/A */
const formatTokenSize = (n: number | undefined): string => {
  if (!n || n <= 0) return "N/A";
  if (n >= 1000) {
    const m = n / 1000;
    return Number.isInteger(m) ? `${m}M` : `${m.toFixed(1)}M`;
  }
  return `${n}K`;
};

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accent = companyAccent(model.company);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group cursor-pointer flex flex-col bg-white border-2 border-ink rounded-2xl shadow-stamp transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:8px_8px_0_0_#241C15] overflow-hidden"
      >
        {/* 顶 strip —— 品牌色，标识公司归属 */}
        <div
          className={`h-2 ${accent} border-b-2 border-ink`}
          aria-hidden
        />

        <div className="p-5">
          {/* 头部：公司图标 + 模型名 + 元数据 */}
          <div className="flex items-start gap-3.5 mb-4">
            <div className="flex-shrink-0">
              <img
                src={`/imgs/${model.company}.png`}
                alt={model.company}
                className="w-12 h-12 rounded-xl object-cover border-2 border-ink/15"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-display font-extrabold text-[17px] text-ink leading-tight mb-1.5 truncate group-hover:text-ink/85 transition-colors">
                {model.modelName}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[12px] text-ink-secondary">
                <span className="inline-flex items-center gap-1">
                  <span className="font-semibold text-ink">
                    {model.company}
                  </span>
                  <span className="text-[14px] leading-none">
                    {countryFlag(model.country)}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" strokeWidth={2.5} />
                  {formatDate(model.releaseDate)}
                </span>
                <span
                  className={`inline-flex items-center gap-1 font-semibold ${model.openSourceStatus === "开源" ? "text-teal" : "text-ink-tertiary"}`}
                >
                  {model.openSourceStatus === "开源" ? (
                    <Unlock className="w-3 h-3" strokeWidth={2.5} />
                  ) : (
                    <Lock className="w-3 h-3" strokeWidth={2.5} />
                  )}
                  {model.openSourceStatus}
                </span>
              </div>
            </div>
          </div>

          {/* 数据格 —— context / output / resolution 三栏，cream 浅底 + ink 边 */}
          {(!!model.contextWindow ||
            !!model.maxGenerationTokenLength ||
            !!model.maxOutputResolution) && (
            <div className="grid grid-cols-2 gap-2 mb-3">
              {!!model.contextWindow && (
                <DataCell
                  label="上下文"
                  value={formatTokenSize(model.contextWindow)}
                />
              )}
              {!!model.maxGenerationTokenLength && (
                <DataCell
                  label="最大输出"
                  value={formatTokenSize(model.maxGenerationTokenLength)}
                />
              )}
              {!!model.maxOutputResolution && (
                <DataCell
                  label="最大分辨率"
                  value={model.maxOutputResolution}
                  full={!model.contextWindow || !model.maxGenerationTokenLength}
                />
              )}
            </div>
          )}

          {/* 标签 chips —— 单色 stamp 风 */}
          {model.modelTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {model.modelTags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-cream border border-ink/15 rounded-md font-sans font-semibold text-[11px] text-ink-secondary"
                >
                  <Tag className="w-2.5 h-2.5" strokeWidth={2.5} />
                  {tag}
                </span>
              ))}
              {model.modelTags.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 bg-white border border-ink/10 rounded-md font-mono text-[11px] text-ink-tertiary">
                  +{model.modelTags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* 描述 */}
          <p className="font-sans text-[13px] text-ink-secondary leading-[1.6] line-clamp-2">
            {model.description}
          </p>
        </div>
      </div>

      <ModelDetailModal
        model={model}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

/** 数据格小组件 —— cream 浅底 + ink 边 + 标签上 / 数字下 */
const DataCell: React.FC<{ label: string; value: string; full?: boolean }> = ({
  label,
  value,
  full,
}) => (
  <div
    className={`bg-cream border border-ink/12 rounded-lg px-3 py-2 ${full ? "col-span-2" : ""}`}
  >
    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50 mb-0.5">
      {label}
    </div>
    <div className="font-display font-extrabold text-[15px] text-ink leading-tight">
      {value}
    </div>
  </div>
);
