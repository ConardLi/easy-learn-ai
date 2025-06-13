/**
 * AI 教程页面组件
 * 使用 iframe 嵌入飞书文档的 AI 教程内容
 */

import React from 'react';

const AITutorial: React.FC = () => {
  const tutorialUrl = 'https://rncg5jvpme.feishu.cn/wiki/U9rYwRHQoil6vBkitY8cbh5tnL9';

  return (
    <div className="min-h-screen bg-white">
      {/* Content - 直接全屏显示 iframe */}
      <div className="h-screen">
        <iframe
          src={tutorialUrl}
          className="w-full h-full border-0"
          title="AI 教程"
        />
      </div>
    </div>
  );
};

export default AITutorial;