/**
 * 错误提示组件
 * 用于显示API错误信息的Toast组件
 */
import React from 'react';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ApiError } from '../../services/translationService';

interface ErrorToastProps {
  error: ApiError | null;
  onClose: () => void;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ error, onClose }) => {
  if (!error) return null;

  const getErrorIcon = () => {
    if (error.code === 401) {
      return '🔐';
    } else if (error.code === 429) {
      return '⏰';
    } else if (error.code >= 500) {
      return '🔧';
    } else {
      return '⚠️';
    }
  };

  const getErrorColor = () => {
    if (error.code === 401) {
      return 'border-red-200 bg-red-50 text-red-800';
    } else if (error.code === 429) {
      return 'border-yellow-200 bg-yellow-50 text-yellow-800';
    } else if (error.code >= 500) {
      return 'border-gray-200 bg-gray-50 text-gray-800';
    } else {
      return 'border-orange-200 bg-orange-50 text-orange-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className={`
        rounded-lg border p-4 shadow-lg backdrop-blur-sm transition-all duration-300
        ${getErrorColor()}
      `}>
        <div className="flex items-start space-x-3">
          <div className="text-2xl">{getErrorIcon()}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">
                {error.getErrorType()} (代码: {error.code})
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-black/10 rounded transition-colors"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm mt-1 leading-relaxed">
              {error.message}
            </p>
            
            {/* 针对特定错误提供建议 */}
            {error.code === 401 && (
              <p className="text-xs mt-2 opacity-80">
                💡 建议：请检查API密钥是否正确，或重新配置
              </p>
            )}
            {error.code === 429 && (
              <p className="text-xs mt-2 opacity-80">
                💡 建议：请稍后再试，避免频繁请求
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
