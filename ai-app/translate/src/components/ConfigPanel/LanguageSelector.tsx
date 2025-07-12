/**
 * 语言选择器组件
 * 用于选择源语言和目标语言
 */
import React from 'react';
import { useAtom } from 'jotai';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { userConfigAtom } from '../../store/atoms';
import { SOURCE_LANGUAGES, TARGET_LANGUAGES } from '../../constants/languages';

interface LanguageSelectorProps {
  label: string;
  value: string;
  type: 'source' | 'target';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  label,
  value,
  type
}) => {
  const [config, setConfig] = useAtom(userConfigAtom);
  const languages = type === 'source' ? SOURCE_LANGUAGES : TARGET_LANGUAGES;
  
  const handleLanguageChange = (langCode: string) => {
    setConfig(prev => ({
      ...prev,
      [type === 'source' ? 'sourceLang' : 'targetLang']: langCode
    }));
  };
  
  const selectedLanguage = languages.find(lang => lang.code === value);
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <GlobeAltIcon className="w-4 h-4 inline mr-1" />
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};
