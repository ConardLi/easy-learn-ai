/**
 * 模型列表 · Mailchimp-Freddie 风
 * 分组 heading：ink 实色 + butter 计数 chip + ink 横线
 */

import React from "react";
import { ModelCard } from "./ModelCard";
import { AIModel } from "../../types/model";

interface ModelListProps {
  models: Record<string, AIModel[]>;
  showGroupHeaders: boolean;
}

export const ModelList: React.FC<ModelListProps> = ({
  models,
  showGroupHeaders,
}) => {
  const groupEntries = Object.entries(models);

  if (groupEntries.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-ink/25 rounded-3xl py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-cream border-2 border-ink rounded-full text-3xl">
          🔍
        </div>
        <h3 className="font-display font-extrabold text-display-lg text-ink mb-2">
          没有找到匹配的模型
        </h3>
        <p className="font-sans text-ink-secondary">
          请尝试调整筛选条件或更换搜索关键词
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {groupEntries.map(([groupName, groupModels]) => (
        <div key={groupName}>
          {showGroupHeaders && (
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <h2 className="font-display font-extrabold text-[26px] lg:text-[30px] text-ink leading-none">
                  {groupName}
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 bg-butter border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink">
                  {groupModels.length}
                </span>
              </div>
              <div className="h-[3px] w-16 bg-ink rounded-full" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {groupModels.map((model) => (
              <ModelCard key={model.modelName} model={model} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
