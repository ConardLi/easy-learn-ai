/**
 * 二进制可视化组件，展示不同格式下的二进制位排列
 */
import React, { useEffect, useState } from 'react';
import { getBinaryRepresentation } from '../utils/formatUtils';

interface BinaryVisualizationProps {
  format: string;
}

const BinaryVisualization: React.FC<BinaryVisualizationProps> = ({ format }) => {
  const { binary, sections } = getBinaryRepresentation(format);
  const [visibleBits, setVisibleBits] = useState<number[]>([]);
  
  useEffect(() => {
    setVisibleBits([]);
    const bitsArray = Array.from({ length: binary.length }, (_, i) => i);
    
    // 逐个显示每个位
    const timer = setInterval(() => {
      setVisibleBits(prev => {
        if (prev.length >= binary.length) {
          clearInterval(timer);
          return prev;
        }
        return [...prev, bitsArray[prev.length]];
      });
    }, 30);
    
    return () => clearInterval(timer);
  }, [binary.length, format]);

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center mb-2">
        {sections.map((section, idx) => (
          <div key={idx} className="mr-4 mb-2">
            <span className={`inline-block px-2 py-1 rounded text-sm ${section.colorClass}`}>
              {section.name} ({section.bits}位)
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap font-mono text-lg bg-gray-100 p-3 rounded-lg overflow-x-auto">
        {sections.map((section, sectionIdx) => (
          <React.Fragment key={sectionIdx}>
            {section.bits > 0 && (
              <div className="flex mr-2">
                {binary.slice(section.start, section.end).split('').map((bit, bitIdx) => {
                  const globalBitIdx = section.start + bitIdx;
                  return (
                    <div
                      key={`${sectionIdx}-${bitIdx}`}
                      className={`
                        w-8 h-8 flex items-center justify-center m-0.5 rounded-md
                        ${section.colorClass.replace('text-', 'bg-').replace('bg-white', 'bg-gray-200')}
                        font-bold transition-all duration-200
                        ${visibleBits.includes(globalBitIdx) ? 'opacity-100 transform-none' : 'opacity-0 translate-y-3'}
                      `}
                    >
                      {bit}
                    </div>
                  );
                })}
              </div>
            )}
            {sectionIdx < sections.length - 1 && section.bits > 0 && (
              <div className="flex items-center mx-1 text-gray-400">|</div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-2 text-sm text-gray-600">
        <p>总位数: {binary.length} 位</p>
      </div>
    </div>
  );
};

export default BinaryVisualization;