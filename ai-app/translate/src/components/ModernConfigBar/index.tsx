/**
 * 现代化配置栏
 * 紧凑的顶部配置区域，支持折叠展开
 */
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { 
  Cog6ToothIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  KeyIcon,
  GlobeAltIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';
import { userConfigAtom } from '../../store/atoms';
import { ConfigDropdown } from './ConfigDropdown';
import { TRANSLATION_STRATEGIES } from '../../constants/strategies';

export const ModernConfigBar: React.FC = () => {
  const [config] = useAtom(userConfigAtom);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const hasApiKey = config.apiKey.length > 0;
  const currentStrategy = TRANSLATION_STRATEGIES.find(s => s.id === config.strategy);

  return (
    <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-4xl mx-auto">
        {/* 主配置栏 */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* 左侧：应用标题 */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <LanguageIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-800">AI翻译</h1>
          </div>

          {/* 中间：快捷配置按钮 */}
          <div className="hidden md:flex items-center space-x-2">
            <ConfigDropdown
              type="apikey"
              icon={<KeyIcon className="w-4 h-4" />}
              label={hasApiKey ? "API已配置" : "配置API"}
              status={hasApiKey ? "success" : "warning"}
              active={activeDropdown === 'apikey'}
              onToggle={() => setActiveDropdown(activeDropdown === 'apikey' ? null : 'apikey')}
            />
            
            <ConfigDropdown
              type="language"
              icon={<GlobeAltIcon className="w-4 h-4" />}
              label={`${config.sourceLang} → ${config.targetLang}`}
              active={activeDropdown === 'language'}
              onToggle={() => setActiveDropdown(activeDropdown === 'language' ? null : 'language')}
            />
            
            <ConfigDropdown
              type="strategy"
              icon={<Cog6ToothIcon className="w-4 h-4" />}
              label={currentStrategy?.name || "翻译策略"}
              active={activeDropdown === 'strategy'}
              onToggle={() => setActiveDropdown(activeDropdown === 'strategy' ? null : 'strategy')}
            />
          </div>

          {/* 右侧：展开按钮（移动端） */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* 移动端展开配置 */}
        {isExpanded && (
          <div className="md:hidden border-t border-gray-200/50 px-4 py-3 space-y-2">
            <ConfigDropdown
              type="apikey"
              icon={<KeyIcon className="w-4 h-4" />}
              label={hasApiKey ? "API已配置" : "配置API"}
              status={hasApiKey ? "success" : "warning"}
              active={activeDropdown === 'apikey'}
              onToggle={() => setActiveDropdown(activeDropdown === 'apikey' ? null : 'apikey')}
              fullWidth
            />
            
            <ConfigDropdown
              type="language"
              icon={<GlobeAltIcon className="w-4 h-4" />}
              label="语言配置"
              active={activeDropdown === 'language'}
              onToggle={() => setActiveDropdown(activeDropdown === 'language' ? null : 'language')}
              fullWidth
            />
            
            <ConfigDropdown
              type="strategy"
              icon={<Cog6ToothIcon className="w-4 h-4" />}
              label={currentStrategy?.name || "翻译策略"}
              active={activeDropdown === 'strategy'}
              onToggle={() => setActiveDropdown(activeDropdown === 'strategy' ? null : 'strategy')}
              fullWidth
            />
          </div>
        )}
      </div>
    </div>
  );
};