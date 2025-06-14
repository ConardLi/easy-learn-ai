/**
 * AI 教程页面组件
 * 使用 iframe 嵌入飞书文档的 AI 教程内容
 */

import React, { useState } from 'react';

const AITutorial: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const tutorialUrl = 'https://rncg5jvpme.feishu.cn/wiki/U9rYwRHQoil6vBkitY8cbh5tnL9';

  return (
    <div className="min-h-screen bg-white">
      {/* Content - 直接全屏显示 iframe */}
      <div className="h-screen relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <div className="text-lg font-medium text-gray-700">正在加载教程文档...</div>
            </div>
          </div>
        )}
        <iframe
          src={tutorialUrl}
          className="w-full h-full border-0"
          title="AI 教程"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default AITutorial;