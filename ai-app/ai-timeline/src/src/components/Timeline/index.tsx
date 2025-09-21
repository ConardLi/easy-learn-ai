/**
 * 时间轴主体组件
 * 负责渲染整个时间轴布局和事件列表
 * 包含中心线、加载状态和空状态处理
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { filteredTimelineAtom, isLoadingAtom, errorAtom } from '../../store/timelineStore';
import { TimelineItem } from '../TimelineItem';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage';
import { EmptyState } from '../EmptyState';

export const Timeline: React.FC = () => {
  const filteredData = useAtomValue(filteredTimelineAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  const error = useAtomValue(errorAtom);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (filteredData.length === 0) {
    return <EmptyState />;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative">
        {/* Central Timeline Line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 via-violet-500 to-pink-600 rounded-full shadow-lg"
          style={{
            boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)"
          }}
        />
        
        {/* Timeline Items */}
        {filteredData.map((event, index) => (
          <TimelineItem
            key={`${event.time}-${event.title}`}
            event={event}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </main>
  );
};
