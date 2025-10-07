/**
 * 时间轴单项组件
 * 展示单个 AI 事件的详细信息
 * 包含时间、标题、描述、领域标签和交互效果
 * 支持点击"了解更多"按钮跳转到相关链接
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight, ExternalLink } from 'lucide-react';
import { TimelineEvent } from '../../store/timelineStore';

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}

// 优化：使用 React.memo 避免不必要的重渲染
export const TimelineItem: React.FC<TimelineItemProps> = React.memo(({ event, index, isLeft }) => {
  // 优化：简化动画配置，移除 index 延迟
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? -30 : 30,
      y: 10
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // 优化：简化 hover 动画
  const cardVariants = {
    hover: {
      y: -8,
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // 处理"了解更多"按钮点击
  const handleLearnMoreClick = () => {
    if (event.ref) {
      window.open(event.ref, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px", amount: 0.3 }}
      className="relative mb-12"
    >
      {/* Timeline Dot - 优化：简化动画 */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full z-20 flex items-center justify-center shadow-lg"
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>
      
      {/* Content Card */}
      <div className={`${isLeft ? 'pr-8 text-right' : 'pl-8 text-left ml-auto'} w-1/2`}>
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 p-6 relative cursor-pointer transition-shadow duration-200"
        >
          {/* Arrow */}
          <div className={`absolute top-6 ${isLeft ? '-right-2.5' : '-left-2.5'} w-5 h-5 bg-white border-r border-b border-gray-100 transform rotate-45`}></div>
          
          {/* Time Badge - 优化：移除 hover 动画 */}
          <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full mb-3">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {event.time}
          </div>
          
          {/* Domain Tag */}
          <div className="inline-block px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full mb-3 ml-2">
            {event.domain}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
            {event.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {event.desc}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-1.5 text-xs text-gray-500">
              <Tag className="w-3.5 h-3.5" />
              <span>{event.domain}</span>
            </div>
            
            {/* 了解更多按钮 - 优化：移除 motion，使用 CSS */}
            {event.ref ? (
              <button
                onClick={handleLearnMoreClick}
                className="flex items-center space-x-1.5 text-purple-600 hover:text-pink-600 transition-colors duration-200 group cursor-pointer"
              >
                <span className="text-xs font-medium">了解更多</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            ) : (
              <div className="flex items-center space-x-1.5 text-gray-400 group cursor-default">
                <span className="text-xs font-medium">了解更多</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

TimelineItem.displayName = 'TimelineItem';