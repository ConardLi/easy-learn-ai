/**
 * API密钥输入组件
 * 处理API密钥的输入和持久化存储
 */
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/24/outline';
import { userConfigAtom } from '../../store/atoms';

export const ApiKeyInput: React.FC = () => {
  const [config, setConfig] = useAtom(userConfigAtom);
  const [showKey, setShowKey] = useState(false);
  
  const handleApiKeyChange = (value: string) => {
    setConfig(prev => ({ ...prev, apiKey: value }));
  };
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <KeyIcon className="w-4 h-4 inline mr-1" />
        API 密钥
      </label>
      <div className="relative">
        <input
          type={showKey ? 'text' : 'password'}
          value={config.apiKey}
          onChange={(e) => handleApiKeyChange(e.target.value)}
          placeholder="请输入您的 API 密钥"
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showKey ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
