/**
 * 翻译策略模态框组件
 * 使用 Portal 渲染到全局层级，避免被父容器限制
 */
import React from 'react';
import { createPortal } from 'react-dom';
import { useAtom } from 'jotai';
import { XMarkIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { userConfigAtom } from '../../store/atoms';
import { TRANSLATION_STRATEGIES } from '../../constants/strategies';

interface StrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StrategyModal: React.FC<StrategyModalProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useAtom(userConfigAtom);

  const handleStrategySelect = (strategyId: string) => {
    setConfig(prev => ({ ...prev, strategy: strategyId }));
    onClose();
  };

  if (!isOpen) return null;

  // 使用 Portal 渲染到 document.body，确保全局层级
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* 模态框内容 - 确保居中且不超出屏幕 */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden transform transition-all flex flex-col">
        {/* 头部 - 紧凑设计 */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">选择翻译策略</h2>
                <p className="text-blue-100 text-sm mt-0.5">找到最适合您需求的翻译方式</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors backdrop-blur-sm"
            >
              <XMarkIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* 策略卡片网格 - 去掉核心特点，优化空间 */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRANSLATION_STRATEGIES.map((strategy) => {
              const isSelected = config.strategy === strategy.id;
              
              return (
                <div
                  key={strategy.id}
                  onClick={() => handleStrategySelect(strategy.id)}
                  className={`
                    relative group cursor-pointer rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg
                    ${isSelected 
                      ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  {/* 选中指示器 */}
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="p-5">
                    {/* 策略头部 - 紧凑布局 */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold transition-colors
                        ${isSelected 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:text-blue-700'
                        }
                      `}>
                        {strategy.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold transition-colors ${
                          isSelected ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-700'
                        }`}>
                          {strategy.name}
                        </h3>
                        <span className="text-xs text-gray-500 font-mono">
                          {strategy.id}
                        </span>
                      </div>
                    </div>

                    {/* 描述 - 优化空间 */}
                    <div className="mb-3">
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        {strategy.description}
                      </p>
                    </div>

                    {/* 适用场景 - 简化显示 */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                        适用场景
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed pl-3.5 line-clamp-2">
                        {strategy.applicableScenes}
                      </p>
                    </div>

                    {/* 选择按钮 - 紧凑设计 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStrategySelect(strategy.id);
                      }}
                      className={`
                        w-full py-2.5 px-4 rounded-lg font-medium transition-all text-sm
                        ${isSelected
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 group-hover:bg-blue-100'
                        }
                      `}
                    >
                      {isSelected ? '✓ 已选择' : '选择此策略'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部操作栏 - 紧凑设计 */}
        <div className="border-t border-gray-200 bg-gray-50/80 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <div className="text-sm text-gray-600">
                当前：
                <span className="font-bold text-blue-600 ml-1">
                  {TRANSLATION_STRATEGIES.find(s => s.id === config.strategy)?.name}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg text-sm"
            >
              完成选择
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};