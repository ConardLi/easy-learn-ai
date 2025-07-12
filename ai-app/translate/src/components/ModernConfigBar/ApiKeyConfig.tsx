/**
 * API密钥配置组件
 * 紧凑的API密钥输入界面
 */
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { EyeIcon, EyeSlashIcon, CheckIcon } from '@heroicons/react/24/outline';
import { userConfigAtom } from '../../store/atoms';

interface ApiKeyConfigProps {
  onClose: () => void;
}

export const ApiKeyConfig: React.FC<ApiKeyConfigProps> = ({ onClose }) => {
  const [config, setConfig] = useAtom(userConfigAtom);
  const [showKey, setShowKey] = useState(false);
  const [localKey, setLocalKey] = useState(config.apiKey);

  const handleSave = () => {
    setConfig(prev => ({ ...prev, apiKey: localKey }));
    onClose();
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-800 mb-3">API 密钥配置</h3>
      
      <div className="space-y-3">
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={localKey}
            onChange={(e) => setLocalKey(e.target.value)}
            placeholder="请输入您的 API 密钥"
            className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showKey ? (
              <EyeSlashIcon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            disabled={!localKey.trim()}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
          >
            <CheckIcon className="w-4 h-4" />
            <span>保存</span>
          </button>
        </div>
      </div>
    </div>
  );
};
