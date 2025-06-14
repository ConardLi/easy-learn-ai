import React, { useState } from 'react';
import QuantizationVisualizer from './components/QuantizationVisualizer';
import FormatSelector from './components/FormatSelector';
import ComparisonTable from './components/ComparisonTable';
import Header from './components/Header';
import QuantizationProcessVisualizer from './components/QuantizationProcessVisualizer';

const App: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<string>('FP32');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">模型量化简介</h2>
          <p className="text-gray-700 mb-4">
            模型量化是将神经网络中的高精度浮点数转换为低精度表示的过程，目的是减小模型体积并提高推理速度，同时尽可能保持模型精度。
            下面我们以π值(3.1415926)为例，看看它在不同精度格式下的表示方式。
          </p>
        </div>

        <FormatSelector 
          selectedFormat={selectedFormat} 
          onFormatChange={setSelectedFormat} 
        />
        
        <QuantizationVisualizer format={selectedFormat} />
        
        {/* 添加新的量化过程可视化组件，并在INT8格式被选中时显示 */}
        {selectedFormat === 'INT8' && (
          <QuantizationProcessVisualizer 
            initialValue={3.1415926}
            dataRange={[0, 4]}
            intBits={8}
          />
        )}
        
        <div className="animate-fade-in-delay">
          <ComparisonTable />
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>模型量化教学网站 © 2023</p>
        </div>
      </footer>
    </div>
  );
};

export default App;