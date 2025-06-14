/**
 * 量化过程可视化组件，展示浮点数如何被量化为整数以及还原的过程
 * 特别演示π值(3.1415926)通过Scale因子量化为INT8值(200)并还原的全过程
 */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

interface QuantizationProcessVisualizerProps {
  initialValue?: number;
  dataRange?: [number, number];
  intBits?: 8 | 4;
}

const QuantizationProcessVisualizer: React.FC<QuantizationProcessVisualizerProps> = ({
  initialValue = 3.1415926,
  dataRange = [0, 4],
  intBits = 8
}) => {
  // 状态变量
  const [activeStep, setActiveStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [customValue, setCustomValue] = useState(initialValue.toString());
  const [customRange, setCustomRange] = useState<[number, number]>(dataRange);
  const [isCustomMode, setIsCustomMode] = useState(false);
  
  // 计算量化相关的值
  const intRange = intBits === 8 ? 255 : 15; // INT8: 0-255, INT4: 0-15
  const scale = (customRange[1] - customRange[0]) / intRange;
  const quantizedValue = Math.round((parseFloat(customValue) - customRange[0]) / scale);
  const dequantizedValue = (quantizedValue * scale) + customRange[0];
  const binary = quantizedValue.toString(2).padStart(intBits, '0');
  
  // 步骤定义
  const steps = [
    { title: '确定Scale系数', description: `数据范围[${customRange[0]}, ${customRange[1]}]映射到INT${intBits}范围[0, ${intRange}]` },
    { title: '计算Scale值', description: `Scale = (${customRange[1]} - ${customRange[0]}) / ${intRange} ≈ ${scale.toFixed(6)}` },
    { title: '执行量化', description: `${customValue} ÷ ${scale.toFixed(6)} ≈ ${quantizedValue}` },
    { title: '二进制表示', description: `${quantizedValue}的二进制表示为${binary}` },
    { title: '执行还原', description: `${quantizedValue} × ${scale.toFixed(6)} + ${customRange[0]} ≈ ${dequantizedValue.toFixed(6)}` }
  ];
  
  // 当用户切换步骤时，触发动画
  useEffect(() => {
    setShowAnimation(false);
    const timer = setTimeout(() => setShowAnimation(true), 50);
    return () => clearTimeout(timer);
  }, [activeStep]);
  
  // 自定义输入处理
  const handleCustomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^-?\d*\.?\d*$/.test(value) || value === '') {
      setCustomValue(value);
    }
  };
  
  const handleRangeChange = (idx: number, value: string) => {
    if (/^-?\d*\.?\d*$/.test(value) || value === '') {
      const newRange = [...customRange] as [number, number];
      newRange[idx] = value === '' ? 0 : parseFloat(value);
      setCustomRange(newRange);
    }
  };
  
  const handleApplyCustomSettings = () => {
    // 验证输入
    const valueNum = parseFloat(customValue);
    if (isNaN(valueNum) || valueNum < customRange[0] || valueNum > customRange[1]) {
      alert(`请输入在[${customRange[0]}, ${customRange[1]}]范围内的有效数值`);
      return;
    }
    setIsCustomMode(true);
    setActiveStep(0); // 重置到第一步
  };
  
  const handleReset = () => {
    setCustomValue(initialValue.toString());
    setCustomRange(dataRange);
    setIsCustomMode(false);
    setActiveStep(0);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 my-8">
      <h3 className="text-2xl font-bold text-indigo-700 mb-4">INT{intBits}量化过程可视化</h3>
      
      {/* 自定义输入区域 */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">自定义参数</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">输入值</label>
            <input
              type="text"
              value={customValue}
              onChange={handleCustomValueChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="输入浮点数"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">数值范围</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={customRange[0]}
                onChange={(e) => handleRangeChange(0, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="最小值"
              />
              <span>至</span>
              <input
                type="text"
                value={customRange[1]}
                onChange={(e) => handleRangeChange(1, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="最大值"
              />
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={handleApplyCustomSettings}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              应用
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              重置
            </button>
          </div>
        </div>
      </div>
      
      {/* 步骤导航 */}
      <div className="mb-6">
        <div className="flex overflow-x-auto py-2 space-x-2">
          {steps.map((step, idx) => (
            <button
              key={idx}
              className={classNames(
                "px-4 py-2 rounded-md whitespace-nowrap transition-all duration-200",
                activeStep === idx 
                  ? "bg-indigo-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              onClick={() => setActiveStep(idx)}
            >
              <span className="font-bold mr-1">{idx + 1}.</span> {step.title}
            </button>
          ))}
        </div>
      </div>
      
      {/* 可视化展示区 */}
      <div 
        className={`transition-all duration-300 transform ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* 步骤1: 确定Scale系数 */}
        {activeStep === 0 && (
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h4 className="text-xl font-bold text-indigo-800 mb-4">步骤1: 确定缩放系数(Scale)</h4>
            <div className="flex flex-col md:flex-row items-center justify-center mb-6 space-y-4 md:space-y-0 md:space-x-6">
              <div className="bg-white p-4 rounded-lg shadow-md border border-indigo-100 w-full md:w-1/2">
                <div className="text-center mb-2 font-semibold">原始浮点数范围</div>
                <div className="h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md flex items-center px-4 text-white font-bold">
                  [{customRange[0]}, {customRange[1]}]
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-indigo-700">映射到</div>
                <div className="text-3xl">↓</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-indigo-100 w-full md:w-1/2">
                <div className="text-center mb-2 font-semibold">INT{intBits}整数范围</div>
                <div className="h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-md flex items-center px-4 text-white font-bold">
                  [0, {intRange}]
                </div>
              </div>
            </div>
            <div className="text-gray-700">
              <p>在量化中，我们需要建立原始数据范围和目标整数范围之间的映射关系。</p>
              <p className="mt-2">对于您的数据：</p>
              <ul className="list-disc pl-5 mt-1">
                <li>原始浮点数范围：[{customRange[0]}, {customRange[1]}]</li>
                <li>INT{intBits}表示范围：[0, {intRange}]（无符号{intBits}位整数）</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* 步骤2: 计算Scale值 */}
        {activeStep === 1 && (
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h4 className="text-xl font-bold text-indigo-800 mb-4">步骤2: 计算缩放因子值</h4>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="text-center text-2xl font-bold text-indigo-700">
                Scale = <span className="text-blue-600">(最大值 - 最小值)</span> ÷ <span className="text-green-600">整数范围</span>
              </div>
              <div className="text-center text-xl mt-4">
                = ({customRange[1]} - {customRange[0]}) ÷ {intRange} ≈ <span className="text-purple-600 font-bold">{scale.toFixed(6)}</span>
              </div>
            </div>
            <div className="text-gray-700">
              <p>缩放因子(Scale)是量化过程中的关键参数，它决定了浮点数如何映射到整数。</p>
              <p className="mt-2">计算公式为：Scale = (最大值 - 最小值) ÷ 整数范围</p>
              <p className="mt-2">意义：每个整数单位代表的浮点数值大小。在这个例子中，每增加1个整数单位，对应的浮点数增加{scale.toFixed(6)}。</p>
            </div>
          </div>
        )}
        
        {/* 步骤3: 执行量化 */}
        {activeStep === 2 && (
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h4 className="text-xl font-bold text-indigo-800 mb-4">步骤3: 执行量化计算</h4>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="text-center text-2xl font-bold text-indigo-700 mb-4">
                量化公式: Quantized = round((原始值 - 最小值) ÷ Scale)
              </div>
              <div className="flex justify-center items-center space-x-3 text-xl">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <span className="text-blue-800 font-bold">{customValue}</span>
                  <span className="text-gray-600 text-sm block text-center">原始浮点数</span>
                </div>
                <div>→</div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  round(({customValue} - {customRange[0]}) ÷ {scale.toFixed(6)})
                </div>
                <div>→</div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <span className="text-green-800 font-bold">{quantizedValue}</span>
                  <span className="text-gray-600 text-sm block text-center">量化后整数</span>
                </div>
              </div>
            </div>
            <div className="text-gray-700">
              <p>量化是将浮点数转换为整数的过程。公式中的round函数确保我们得到最接近的整数值。</p>
              <p className="mt-2">对于π值({customValue}):</p>
              <ul className="list-disc pl-5 mt-1">
                <li>首先减去范围最小值: {customValue} - {customRange[0]} = {parseFloat(customValue) - customRange[0]}</li>
                <li>然后除以Scale: {(parseFloat(customValue) - customRange[0]).toFixed(6)} ÷ {scale.toFixed(6)} ≈ {((parseFloat(customValue) - customRange[0]) / scale).toFixed(6)}</li>
                <li>四舍五入得到整数: round({((parseFloat(customValue) - customRange[0]) / scale).toFixed(6)}) = {quantizedValue}</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* 步骤4: 二进制表示 */}
        {activeStep === 3 && (
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h4 className="text-xl font-bold text-indigo-800 mb-4">步骤4: 整数的二进制表示</h4>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="text-center mb-4">
                <span className="text-xl font-bold text-indigo-700">
                  {quantizedValue}的INT{intBits}二进制表示:
                </span>
              </div>
              <div className="flex justify-center mb-4">
                {binary.split('').map((bit, idx) => (
                  <div 
                    key={idx}
                    className={`w-10 h-10 flex items-center justify-center m-1 rounded-md font-mono text-xl font-bold animate-pop-in`}
                    style={{
                      backgroundColor: bit === '1' ? '#4f46e5' : '#e5e7eb',
                      color: bit === '1' ? 'white' : '#374151',
                      animationDelay: `${idx * 0.1}s`
                    }}
                  >
                    {bit}
                  </div>
                ))}
              </div>
              <div className="text-center text-lg">
                <span className="text-gray-600">十进制: </span>
                <span className="text-indigo-700 font-bold">{quantizedValue}</span>
                <span className="mx-3">→</span>
                <span className="text-gray-600">二进制: </span>
                <span className="text-indigo-700 font-bold">{binary}</span>
              </div>
            </div>
            <div className="text-gray-700">
              <p>量化后的整数{quantizedValue}在INT{intBits}中用{intBits}位二进制表示为{binary}。</p>
              <p className="mt-2">这个二进制值是实际存储在模型中的形式。与浮点数相比：</p>
              <ul className="list-disc pl-5 mt-1">
                <li>INT{intBits}只需要{intBits}位存储空间，而FP32需要32位</li>
                <li>整数计算通常比浮点运算更快</li>
                <li>这种表示方式使模型体积减少，并提高推理速度</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* 步骤5: 执行还原 */}
        {activeStep === 4 && (
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h4 className="text-xl font-bold text-indigo-800 mb-4">步骤5: 推理时的还原计算</h4>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="text-center text-2xl font-bold text-indigo-700 mb-4">
                还原公式: Original ≈ (量化值 × Scale) + 最小值
              </div>
              <div className="flex justify-center items-center space-x-3 text-xl">
                <div className="bg-green-100 p-3 rounded-lg">
                  <span className="text-green-800 font-bold">{quantizedValue}</span>
                  <span className="text-gray-600 text-sm block text-center">存储的整数</span>
                </div>
                <div>→</div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  ({quantizedValue} × {scale.toFixed(6)}) + {customRange[0]}
                </div>
                <div>→</div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <span className="text-blue-800 font-bold">{dequantizedValue.toFixed(6)}</span>
                  <span className="text-gray-600 text-sm block text-center">还原的浮点数</span>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="inline-block bg-yellow-100 p-3 rounded-lg">
                  <div className="text-lg">
                    <span className="font-semibold">原始值: </span>
                    <span className="text-blue-700">{customValue}</span>
                  </div>
                  <div className="text-lg">
                    <span className="font-semibold">还原值: </span>
                    <span className="text-green-700">{dequantizedValue.toFixed(6)}</span>
                  </div>
                  <div className="text-lg">
                    <span className="font-semibold">误差: </span>
                    <span className={Math.abs(parseFloat(customValue) - dequantizedValue) < 0.01 ? "text-green-600" : "text-red-600"}>
                      {(parseFloat(customValue) - dequantizedValue).toFixed(6)} 
                      ({(Math.abs(parseFloat(customValue) - dequantizedValue) / parseFloat(customValue) * 100).toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-gray-700">
              <p>在模型推理时，我们需要将存储的整数值还原回接近原始的浮点数。这个过程是量化的逆过程。</p>
              <p className="mt-2">还原计算:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>整数值乘以Scale: {quantizedValue} × {scale.toFixed(6)} = {(quantizedValue * scale).toFixed(6)}</li>
                <li>加上最小值: {(quantizedValue * scale).toFixed(6)} + {customRange[0]} = {dequantizedValue.toFixed(6)}</li>
                <li>与原始值{customValue}相比，误差为{(parseFloat(customValue) - dequantizedValue).toFixed(6)}</li>
              </ul>
              <p className="mt-3 text-indigo-700 font-semibold">
                {Math.abs(parseFloat(customValue) - dequantizedValue) < 0.01 
                  ? "这个例子中，INT8量化后的误差很小，说明量化效果良好!" 
                  : "在这个例子中，量化导致了一定的精度损失，这是量化的正常现象。"}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* 导航按钮 */}
      <div className="flex justify-between mt-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeStep > 0 
              ? "bg-indigo-600 text-white" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => activeStep > 0 && setActiveStep(prev => prev - 1)}
          disabled={activeStep === 0}
        >
          上一步
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeStep < steps.length - 1 
              ? "bg-indigo-600 text-white" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => activeStep < steps.length - 1 && setActiveStep(prev => prev + 1)}
          disabled={activeStep === steps.length - 1}
        >
          下一步
        </button>
      </div>
    </div>
  );
};

export default QuantizationProcessVisualizer;