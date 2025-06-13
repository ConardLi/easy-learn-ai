/**
 * AI 日报页面组件
 * 使用 iframe 嵌入 AI 日报内容
 */

import React from "react";

const AIDaily: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Content */}
      <div className="h-screen">
        <iframe
          width="100%"
          height="100%"
          src="../../public/ai-daily/index.html"
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
