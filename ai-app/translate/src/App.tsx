import React from 'react';
import { ModernConfigBar } from './components/ModernConfigBar';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* 顶部配置栏 */}
      <ModernConfigBar />
      
      {/* 主聊天界面 */}
      <div className="flex-1 flex flex-col min-h-0">
        <ChatInterface />
      </div>
    </div>
  );
}