/**
 * 网站头部组件，显示网站标题和简要介绍
 */
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="animate-slide-down">
          <h1 className="text-4xl font-bold mb-4">模型量化可视化教程</h1>
          <p className="text-xl opacity-90">
            通过具体示例理解FP32、FP16、BF16、INT8和INT4的二进制存储方式
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;