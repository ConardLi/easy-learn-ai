/**
 * AI 导航页面组件
 * 显示即将上线的提示信息
 */

import React from 'react';
import { Clock } from 'lucide-react';

const AINavigation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Content */}
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">即将上线</h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            我们正在精心筛选和整理最优质的 AI 工具和资源，为你打造一站式的 AI 导航平台
          </p>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">即将包含：</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                AI 绘画工具
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                代码生成助手
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                文本处理工具
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                学习资源平台
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AINavigation;