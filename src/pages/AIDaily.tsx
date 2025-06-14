/**
 * AI 日报页面组件
 * 使用 iframe 嵌入 AI 日报内容
 */

import React, { useState } from "react";

const AIDaily: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="min-h-screen bg-white">
      {/* Content */}
      <div className="h-screen relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <div className="text-lg font-medium text-gray-700">正在加载 AI 日报...</div>
            </div>
          </div>
        )}
        <iframe
          width="100%"
          height="100%"
          src="/ai-daily/index.html"
          className="border-0"
          onLoad={() => setIsLoading(false)}
        ></iframe>
        {/* <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-gray-600 mb-4">AI 日报正在准备中</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              每日为你精选最新的 AI 行业动态、技术突破和应用案例
            </p>
            <p className="text-sm text-gray-400">
              内容将很快上线，敬请期待
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AIDaily;
