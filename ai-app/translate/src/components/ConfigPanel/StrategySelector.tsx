/**
 * 翻译策略选择器组件
 * 以卡片形式展示各种翻译策略
 */
import React from 'react';
import { useAtom } from 'jotai';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { userConfigAtom } from '../../store/atoms';
import { TRANSLATION_STRATEGIES } from '../../constants/strategies';

export const StrategySelector: React.FC = () => {
  const [config, setConfig] = useAtom(userConfigAtom);
  
  const handleStrategySelect = (strategyId: string) => {
    setConfig(prev => ({ ...prev, strategy: strategyId }));
  };
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        翻译策略
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {TRANSLATION_STRATEGIES.map((strategy) => (
          <div
            key={strategy.id}
            onClick={() => handleStrategySelect(strategy.id)}
            className={`
              relative p-4 border-2 rounded-lg cursor-pointer transition-all
              ${config.strategy === strategy.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }
            `}
          >
            {config.strategy === strategy.id && (
              <CheckCircleIcon className="absolute top-2 right-2 w-5 h-5 text-blue-500" />
            )}
            
            <h3 className="font-medium text-gray-900 mb-2">
              {strategy.name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {strategy.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
