/**
 * AI 知视详情页面组件
 * 使用 iframe 嵌入具体的学习内容页面
 */

import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AIKnowledgeItem } from "../types";
import { aiKnowledgeData } from "../data/aiKnowledgeData";

const AIKnowledgeDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // 优先使用 location.state 中的 item，如果没有则从数据源中查找
  let item: AIKnowledgeItem | undefined = location.state?.item;
  
  if (!item && id) {
    item = aiKnowledgeData.find(data => data.id === id);
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">内容不存在</h2>
          <button
            onClick={() => navigate("/ai-knowledge")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            返回列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] relative overflow-hidden">
      {item.htmlUrl ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#060607] bg-opacity-80 z-10">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <div className="text-lg font-medium text-gray-200">正在加载内容...</div>
                <p className="text-sm text-gray-400 mt-2">{item.title}</p>
              </div>
            </div>
          )}
          <iframe
            src={item.htmlUrl}
            className="w-full h-full border-0"
            title={item.title}
            onLoad={() => setIsLoading(false)}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-50 to-purple-50">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              内容正在准备中
            </h2>
            <p className="text-gray-500 mb-8 max-w-md">{item.description}</p>
            <p className="text-sm text-gray-400">敬请期待精彩内容的上线</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIKnowledgeDetail;
