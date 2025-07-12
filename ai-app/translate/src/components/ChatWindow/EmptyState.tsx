/**
 * 空状态组件
 * 当没有翻译记录时显示的占位内容
 */
import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg h-96 flex items-center justify-center">
      <div className="text-center">
        <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          开始您的翻译之旅
        </h3>
        <p className="text-gray-500 max-w-sm">
          请先配置 API 密钥，然后输入文本或上传文件开始翻译
        </p>
      </div>
    </div>
  );
};
