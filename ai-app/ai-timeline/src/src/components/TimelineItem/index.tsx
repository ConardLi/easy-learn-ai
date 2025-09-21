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

export const TimelineItem: React.FC<TimelineItemProps> = ({ event, index, isLeft }) => {
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? -50 : 50,
      y: 20
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -12,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(124, 58, 237, 0.15)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
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
      viewport={{ once: true, margin: "-50px" }}
      className="relative mb-16"
    >
      {/* Timeline Dot */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 100 }}
        className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full z-20 flex items-center justify-center shadow-lg"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            boxShadow: ["0 0 20px rgba(124, 58, 237, 0.3)", "0 0 40px rgba(124, 58, 237, 0.6)", "0 0 20px rgba(124, 58, 237, 0.3)"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-2 h-2 bg-white rounded-full"
        />
      </motion.div>
      
      {/* Content Card */}
      <div className={`${isLeft ? 'pr-8 text-right' : 'pl-8 text-left ml-auto'} w-1/2`}>
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative cursor-pointer"
        >
          {/* Arrow */}
          <div className={`absolute top-8 ${isLeft ? '-right-3' : '-left-3'} w-6 h-6 bg-white border-r border-b border-gray-100 transform rotate-45`}></div>
          
          {/* Time Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full mb-4"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {event.time}
          </motion.div>
          
          {/* Domain Tag */}
          <div className="inline-block px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full mb-4 ml-2">
            {event.domain}
          </div>
          
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
            {event.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">
            {event.desc}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Tag className="w-4 h-4" />
              <span>{event.domain}</span>
            </div>
            
            {/* 了解更多按钮 - 根据是否有 ref 字段决定行为 */}
            {event.ref ? (
              <motion.button
                whileHover={{ x: 5 }}
                onClick={handleLearnMoreClick}
                className="flex items-center space-x-2 text-purple-600 hover:text-pink-600 transition-colors duration-200 group cursor-pointer"
              >
                <span className="text-sm font-medium">了解更多</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            ) : (
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-2 text-gray-400 group cursor-default"
              >
                <span className="text-sm font-medium">了解更多</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};