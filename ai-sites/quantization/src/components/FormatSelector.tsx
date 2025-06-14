/**
 * 格式选择器组件，用于切换不同的数值格式
 */
import React from 'react';
import classNames from 'classnames';

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ selectedFormat, onFormatChange }) => {
  const formats = [
    { id: 'FP32', name: 'FP32 (32位浮点)', description: '1位符号 + 8位指数 + 23位尾数' },
    { id: 'FP16', name: 'FP16 (16位浮点)', description: '1位符号 + 5位指数 + 10位尾数' },
    { id: 'BF16', name: 'BF16 (脑浮点)', description: '1位符号 + 8位指数 + 7位尾数' },
    { id: 'INT8', name: 'INT8 (8位整数)', description: '8位整数，需量化，范围-128~127' },
    { id: 'INT4', name: 'INT4 (4位整数)', description: '4位整数，需量化，范围-8~7' }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">选择数值格式:</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {formats.map(format => (
          <button
            key={format.id}
            className={classNames(
              "p-3 rounded-lg shadow-md transition-all duration-200 text-left hover:shadow-lg transform hover:-translate-y-1",
              selectedFormat === format.id
                ? "bg-indigo-600 text-white"
                : "bg-white hover:bg-indigo-100"
            )}
            onClick={() => onFormatChange(format.id)}
          >
            <h4 className="font-bold">{format.name}</h4>
            <p className={classNames(
              "text-sm mt-1",
              selectedFormat === format.id ? "text-indigo-100" : "text-gray-600"
            )}>
              {format.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormatSelector;