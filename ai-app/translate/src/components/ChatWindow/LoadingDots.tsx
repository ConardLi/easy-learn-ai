/**
 * 加载动画组件
 * 在流式翻译时显示加载状态
 */
import React from 'react';

export const LoadingDots: React.FC = () => {
  return (
    <span className="inline-flex ml-1">
      <span className="animate-pulse">.</span>
      <span className="animate-pulse animation-delay-200">.</span>
      <span className="animate-pulse animation-delay-400">.</span>
    </span>
  );
};
