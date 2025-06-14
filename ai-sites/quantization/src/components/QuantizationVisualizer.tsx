/**
 * 量化可视化组件，根据选择的格式展示3.1415926的二进制表示
 */
import React, { useEffect, useState } from 'react';
import BinaryVisualization from './BinaryVisualization';
import { getFormatDetails } from '../utils/formatUtils';

interface QuantizationVisualizerProps {
  format: string;
}

const QuantizationVisualizer: React.FC<QuantizationVisualizerProps> = ({ format }) => {
  const details = getFormatDetails(format);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [format]);
  
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 transform ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      <h3 className="text-2xl font-bold text-indigo-700 mb-4">
        π (3.1415926) 在 {format} 中的表示
      </h3>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">二进制表示:</h4>
        <div className="overflow-x-auto">
          <BinaryVisualization format={format} />
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">详细说明:</h4>
        <div className="prose max-w-none text-gray-600">
          <div dangerouslySetInnerHTML={{ __html: details.explanation }} />
        </div>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-indigo-700 mb-2">实际值与精度损失:</h4>
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="mb-2 md:mb-0 md:mr-8">
            <span className="font-medium">原始值: </span>
            <span className="text-green-600 font-mono">3.1415926</span>
          </div>
          <div className="mb-2 md:mb-0 md:mr-8">
            <span className="font-medium">实际存储值: </span>
            <span className="text-indigo-600 font-mono">{details.actualValue}</span>
          </div>
          <div>
            <span className="font-medium">误差: </span>
            <span className={`font-mono ${Math.abs(parseFloat(details.error)) > 0.01 ? 'text-red-600' : 'text-green-600'}`}>
              {details.error}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="text-lg font-semibold text-yellow-700 mb-2">关键特点:</h4>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {details.keyPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuantizationVisualizer;