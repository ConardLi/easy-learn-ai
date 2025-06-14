import React, { useState } from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import Architecture from './components/Architecture';
import CommunicationModes from './components/CommunicationModes';
import InteractionFlow from './components/InteractionFlow';
import Examples from './components/Examples';

const MCPLearningPlatform: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('introduction');

  const sections = [
    { id: 'introduction', title: 'MCP 概念介绍', component: Introduction },
    { id: 'architecture', title: '系统架构', component: Architecture },
    { id: 'communication', title: '通信模式', component: CommunicationModes },
    { id: 'flow', title: '交互流程', component: InteractionFlow },
    { id: 'examples', title: '应用示例', component: Examples },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      {/* 导航栏 */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sections.map((section) => {
          const Component = section.component;
          return (
            <div
              key={section.id}
              className={`transition-all duration-500 ${
                activeSection === section.id ? 'block' : 'hidden'
              }`}
            >
              <Component />
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default MCPLearningPlatform;
