/**
 * 配置面板主组件
 * 负责渲染API密钥输入、语言选择和翻译策略选择
 */
import React from 'react';
import { useAtom } from 'jotai';
import { userConfigAtom } from '../../store/atoms';
import { ApiKeyInput } from './ApiKeyInput';
import { LanguageSelector } from './LanguageSelector';
import { StrategySelector } from './StrategySelector';

export const ConfigPanel: React.FC = () => {
  const [config] = useAtom(userConfigAtom);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">配置设置</h2>
      
      <div className="space-y-4">
        <ApiKeyInput />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LanguageSelector
            label="源语言"
            value={config.sourceLang}
            type="source"
          />
          <LanguageSelector
            label="目标语言"
            value={config.targetLang}
            type="target"
          />
        </div>
        
        <StrategySelector />
      </div>
    </div>
  );
};
