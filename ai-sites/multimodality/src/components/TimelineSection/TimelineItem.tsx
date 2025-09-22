/**
 * 时间线项目组件
 * 单个历程节点的详细展示
 */
import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  highlights: string[];
  color: string;
  image: string;
  index: number;
  inView: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  year,
  title,
  description,
  highlights,
  color,
  image,
  index,
  inView
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex ${isEven ? 'justify-start' : 'justify-end'} items-center relative`}
    >
      {/* 时间节点 */}
      <motion.div
        className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 ${color} rounded-full border-4 border-white shadow-lg z-10`}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
      />

      {/* 内容卡片 */}
      <div className={`w-5/12 ${isEven ? 'mr-auto' : 'ml-auto'}`}>
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 card-hover border border-gray-100"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center mb-4">
            <span className={`inline-block px-3 py-1 text-sm font-bold text-white rounded-full ${color}`}>
              {year}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

          {/* 亮点展示 */}
          <div className="space-y-2">
            {highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 + idx * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-sm text-gray-700">{highlight}</span>
              </motion.div>
            ))}
          </div>

          {/* 示意图 */}
          <motion.div
            className="mt-4 rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-32 object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
