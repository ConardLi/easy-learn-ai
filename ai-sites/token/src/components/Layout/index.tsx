/**
 * 布局组件
 * 提供页面的整体布局结构，包含导航栏和内容区域
 */
import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
