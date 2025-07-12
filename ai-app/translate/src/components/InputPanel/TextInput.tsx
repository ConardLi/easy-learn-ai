/**
 * 文本输入组件
 * 处理用户的文本输入和翻译触发
 */
import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onTranslate: (text: string) => void;
  disabled: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  onTranslate,
  disabled
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onTranslate(value);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        输入要翻译的文本
      </label>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="请输入需要翻译的文本..."
          rows={4}
          disabled={disabled}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:bg-gray-50"
        />
        
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="absolute bottom-3 right-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <PaperAirplaneIcon className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-xs text-gray-500">
        按 Ctrl/Cmd + Enter 快速翻译
      </p>
    </form>
  );
};
