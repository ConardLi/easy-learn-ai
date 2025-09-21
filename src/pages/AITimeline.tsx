/**
 * AI 知视详情页面组件
 * 使用 iframe 嵌入具体的学习内容页面
 */

import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AIKnowledgeItem } from "../types";
import { aiKnowledgeData } from "../data/aiKnowledgeData";

const AITimeline: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Content */}
      <div className="h-[calc(100vh-80px)]">
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <div className="text-lg font-medium text-gray-700">
                  正在加载内容...
                </div>
                <p className="text-sm text-gray-500 mt-2">AI Timeline</p>
              </div>
            </div>
          )}
          <iframe
            src={"/ai-timeline/index.html"}
            className="w-full h-full border-0"
            title="AI Timeline"
            onLoad={() => setIsLoading(false)}
          />
        </>
      </div>
    </div>
  );
};

export default AITimeline;
