/**
 * AI 知视详情页面组件
 * 使用 iframe 嵌入具体的学习内容页面
 */

import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AIKnowledgeItem } from "../types";

const AIKnowledgeDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const item: AIKnowledgeItem | undefined = location.state?.item;

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
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Content */}
      <div className="h-[calc(100vh-80px)]">
        {item.htmlUrl ? (
          <iframe
            src={item.htmlUrl}
            className="w-full h-full border-0"
            title={item.title}
          />
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
    </div>
  );
};

export default AIKnowledgeDetail;
