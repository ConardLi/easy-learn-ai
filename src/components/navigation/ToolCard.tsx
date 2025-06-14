import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { AITool } from '../../types/navigation';
import LazyImage from './LazyImage';

interface ToolCardProps {
  tool: AITool;
  category?: string;
  showCategory?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  tool, 
  category,
  showCategory = false
}) => {
  const handleClick = () => {
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
                 cursor-pointer group overflow-hidden border border-gray-100
                 hover:scale-[1.02] hover:border-orange-200"
      onClick={handleClick}
    >
      {/* 图标区域 */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <LazyImage
              src={tool.icon}
              alt={tool.title}
              className="w-12 h-12 rounded-xl object-cover border-2 border-gray-100"
              fallbackClassName="w-12 h-12 rounded-xl border-2 border-gray-100"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg group-hover:text-orange-600 
                           transition-colors duration-200 line-clamp-1">
                {tool.title}
              </h3>
              {showCategory && category && (
                <span className="inline-block mt-1 px-2 py-1 text-xs font-medium 
                               bg-orange-100 text-orange-600 rounded-lg">
                  {category}
                </span>
              )}
            </div>
          </div>
          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-500 
                                 transition-colors duration-200 flex-shrink-0" />
        </div>

        {/* 描述 */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {tool.description}
        </p>

        {/* 底部操作区 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-500">推荐</span>
          </div>
          <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
            点击访问
          </div>
        </div>
      </div>

      {/* 悬停效果 */}
      <div className="h-1 bg-gradient-to-r from-orange-500 to-red-500 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
};

export default ToolCard;
