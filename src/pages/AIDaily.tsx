/**
 * AI 日报页面组件
 * 直接使用 React 组件渲染 AI 日报内容
 */

import React from "react";
import { DailyList } from "../components/daily/DailyList";
import { Toaster } from 'react-hot-toast';

const AIDaily: React.FC = () => {
  return (
    <div className="min-h-screen">
      <DailyList />
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

export default AIDaily;
