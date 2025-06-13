/**
 * 日报卡片组件
 * 展示单个日报的信息，包括日期、标题和标签，支持点击跳转
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { DailyReport } from '../types';

interface DailyCardProps {
  report: DailyReport;
}

export const DailyCard: React.FC<DailyCardProps> = ({ report }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/daily/${report.date}`);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] border border-gray-100"
    >
      <div className="flex items-center gap-2 mb-3 text-blue-600">
        <Calendar size={16} />
        <span className="text-sm font-medium">{formatDate(report.date)}</span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-2 leading-relaxed">
        {report.title}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {report.tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100"
          >
            <Tag size={10} />
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};
