/**
 * 语言配置组件
 * 紧凑的语言选择界面
 */
import React from 'react';
import { useAtom } from 'jotai';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { userConfigAtom } from '../../store/atoms';
import { SOURCE_LANGUAGES, TARGET_LANGUAGES } from '../../constants/languages';

interface LanguageConfigProps {
  onClose: () => void;
}

export const LanguageConfig: React.FC<LanguageConfigProps> = ({ onClose }) => {
  const [config, setConfig] = useAtom(userConfigAtom);

  const handleSourceChange = (langCode: string) => {
    setConfig(prev => ({ ...prev, sourceLang: langCode }));
  };

  const handleTargetChange = (langCode: string) => {
    setConfig(prev => ({ ...prev, targetLang: langCode }));
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-800 mb-3">语言配置</h3>
      
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">源语言</label>
          <select
            value={config.sourceLang}
            onChange={(e) => handleSourceChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {SOURCE_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRightIcon className="w-4 h-4 text-gray-400" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">目标语言</label>
          <select
            value={config.targetLang}
            onChange={(e) => handleTargetChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {TARGET_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
