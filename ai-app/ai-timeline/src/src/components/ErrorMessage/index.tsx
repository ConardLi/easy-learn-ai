/**
 * 错误状态组件
 * 展示数据加载失败时的错误信息
 * 提供重试功能和友好的错误提示
 */
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-32"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6"
      >
        <AlertCircle className="w-8 h-8 text-red-500" />
      </motion.div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">数据加载失败</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{message}</p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          <RefreshCw className="w-4 h-4" />
          <span>重试加载</span>
        </motion.button>
      )}
    </motion.div>
  );
};
