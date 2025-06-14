import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaChartLine, FaCode, FaLayerGroup, FaPlay, FaPause, FaRedo } from 'react-icons/fa';

const EnhancedVisualizationPage: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<'full' | 'freeze' | 'lora'>('full');
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const maxSteps = 5;
  
  // Ref for play/pause button to improve UI
  const playButtonRef = useRef<HTMLButtonElement>(null);

  // 控制动画步骤
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setAnimationStep(prev => {
        const next = prev + 1;
        setSliderValue(next * 20); // Update slider value
        if (next >= maxSteps) {
          setIsPlaying(false);
          return maxSteps;
        }
        return next;
      });
    }, 800); // 加快动画间隔
    
    return () => clearInterval(timer);
  }, [isPlaying]);
  
  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    setAnimationStep(Math.floor(value / 20));
    setIsPlaying(false);
  };
  
  // 播放/暂停动画
  const togglePlayPause = () => {
    if (animationStep >= maxSteps) {
      // 如果已完成，则重置
      setAnimationStep(0);
      setSliderValue(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };
  
  // 重置动画
  const resetAnimation = () => {
    setAnimationStep(0);
    setSliderValue(0);
    setIsPlaying(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">微调方法增强可视化</h1>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex justify-center mb-6 space-x-4">
              <MethodButton 
                label="Full Parameter" 
                isActive={activeMethod === 'full'} 
                onClick={() => {
                  setActiveMethod('full');
                  resetAnimation();
                }}
                color="bg-blue-100 text-blue-800"
                activeColor="bg-blue-600"
              />
              <MethodButton 
                label="Freeze" 
                isActive={activeMethod === 'freeze'} 
                onClick={() => {
                  setActiveMethod('freeze');
                  resetAnimation();
                }}
                color="bg-green-100 text-green-800"
                activeColor="bg-green-600"
              />
              <MethodButton 
                label="LoRA" 
                isActive={activeMethod === 'lora'} 
                onClick={() => {
                  setActiveMethod('lora');
                  resetAnimation();
                }}
                color="bg-purple-100 text-purple-800"
                activeColor="bg-purple-600"
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 bg-slate-50 rounded-lg p-4 shadow-inner">
                  <EnhancedNeuralNetworkViz 
                    method={activeMethod} 
                    animationStep={animationStep}
                  />
                </div>
                
                <div className="lg:w-1/3">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-full">
                    <h3 className="text-xl font-bold mb-4">
                      {activeMethod === 'full' && "全参数微调"}
                      {activeMethod === 'freeze' && "参数冻结微调"}
                      {activeMethod === 'lora' && "低秩适应 (LoRA)"}
                    </h3>
                    
                    <div className="prose max-w-none">
                      {activeMethod === 'full' && (
                        <div>
                          <p className="mb-2">
                            <span className="font-semibold">阶段 {animationStep + 1}/5:</span> {getStepDescription(activeMethod, animationStep)}
                          </p>
                          <p className="text-sm text-gray-600">
                            全参数微调通过更新所有参数，使模型完全适应新任务，但需要大量计算资源。
                          </p>
                        </div>
                      )}
                      
                      {activeMethod === 'freeze' && (
                        <div>
                          <p className="mb-2">
                            <span className="font-semibold">阶段 {animationStep + 1}/5:</span> {getStepDescription(activeMethod, animationStep)}
                          </p>
                          <p className="text-sm text-gray-600">
                            参数冻结通过只更新部分层，保留底层特征提取能力，减少计算需求。
                          </p>
                        </div>
                      )}
                      
                      {activeMethod === 'lora' && (
                        <div>
                          <p className="mb-2">
                            <span className="font-semibold">阶段 {animationStep + 1}/5:</span> {getStepDescription(activeMethod, animationStep)}
                          </p>
                          <p className="text-sm text-gray-600">
                            LoRA仅添加少量低秩矩阵参数，原模型参数保持不变，极大减少资源需求。
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-600">动画进度: {Math.floor(sliderValue/20 + 1)}/6</div>
                  <div className="flex space-x-2">
                    <button 
                      ref={playButtonRef}
                      onClick={togglePlayPause}
                      className={`flex items-center justify-center p-2 rounded-full ${
                        isPlaying ? 'bg-gray-200' : 'bg-indigo-100 hover:bg-indigo-200'
                      }`}
                      aria-label={isPlaying ? "暂停" : animationStep >= maxSteps ? "重播" : "播放"}
                    >
                      {isPlaying ? (
                        <FaPause className="text-gray-600" />
                      ) : animationStep >= maxSteps ? (
                        <FaRedo className="text-indigo-600" />
                      ) : (
                        <FaPlay className="text-indigo-600" />
                      )}
                    </button>
                    <button
                      onClick={resetAnimation}
                      className="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                      aria-label="重置"
                    >
                      <FaRedo className="text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="relative w-full h-10">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full bg-gray-200 h-1 rounded-full">
                      {/* 步骤标记 */}
                      {Array.from({ length: maxSteps + 1 }).map((_, i) => (
                        <div 
                          key={i}
                          className={`absolute h-3 w-3 rounded-full top-1/2 -translate-y-1/2 -ml-1.5 border border-white
                            ${i * 20 <= sliderValue ? 
                              'bg-indigo-600' : 'bg-gray-300'}`}
                          style={{ left: `${i * 20}%` }}
                        />
                      ))}
                      
                      {/* 进度条 */}
                      <div 
                        className="absolute h-1 bg-indigo-600 rounded-full"
                        style={{ width: `${sliderValue}%` }}
                      />
                    </div>
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="20"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="absolute cursor-pointer w-full opacity-0 h-10"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<FaInfoCircle className="text-blue-600" />}
                title="性能比较"
                color="bg-blue-50"
              >
                <ul className="text-sm space-y-1">
                  <li><span className="font-medium">全参数:</span> 最高性能，最大适应性</li>
                  <li><span className="font-medium">冻结:</span> 平衡性能和效率</li>
                  <li><span className="font-medium">LoRA:</span> 接近全参数性能，极小参数量</li>
                </ul>
              </FeatureCard>
              
              <FeatureCard 
                icon={<FaLayerGroup className="text-green-600" />}
                title="参数更新"
                color="bg-green-50"
              >
                <ul className="text-sm space-y-1">
                  <li><span className="font-medium">全参数:</span> 更新100%参数</li>
                  <li><span className="font-medium">冻结:</span> 更新10-50%参数</li>
                  <li><span className="font-medium">LoRA:</span> 仅更新&lt;1%参数</li>
                </ul>
              </FeatureCard>
              
              <FeatureCard 
                icon={<FaChartLine className="text-purple-600" />}
                title="应用场景"
                color="bg-purple-50"
              >
                <ul className="text-sm space-y-1">
                  <li><span className="font-medium">全参数:</span> 资源充足，最高性能需求</li>
                  <li><span className="font-medium">冻结:</span> 中等资源约束</li>
                  <li><span className="font-medium">LoRA:</span> 严格资源限制，多任务需求</li>
                </ul>
              </FeatureCard>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">详细技术对比</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">特性</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">全参数微调</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-green-50">参数冻结</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-purple-50">LoRA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">计算需求</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-blue-50 bg-opacity-20">高</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-green-50 bg-opacity-20">中</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-purple-50 bg-opacity-20">低</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">训练速度</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-blue-50 bg-opacity-20">慢</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-green-50 bg-opacity-20">中</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-purple-50 bg-opacity-20">快</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">存储需求</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-blue-50 bg-opacity-20">大(完整模型)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-green-50 bg-opacity-20">大(完整模型)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-purple-50 bg-opacity-20">小(仅适配器)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">多任务支持</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-blue-50 bg-opacity-20">困难</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-green-50 bg-opacity-20">困难</td>
                  <td className="px-4 py-3 text-sm text-gray-700 bg-purple-50 bg-opacity-20">简单(切换适配器)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface MethodButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  color: string;
  activeColor: string;
}

const MethodButton: React.FC<MethodButtonProps> = ({ label, isActive, onClick, color, activeColor }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-md font-medium transition-all duration-200 shadow-sm ${
        isActive 
          ? `${activeColor} text-white scale-105 shadow-md` 
          : `${color} hover:opacity-90`
      }`}
    >
      {label}
    </button>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  children: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, color, children }) => {
  return (
    <div className={`rounded-lg shadow-sm overflow-hidden ${color}`}>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="mr-3 text-xl">{icon}</div>
          <h3 className="font-bold text-gray-800">{title}</h3>
        </div>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
};

interface EnhancedNeuralNetworkVizProps {
  method: 'full' | 'freeze' | 'lora';
  animationStep: number;
}

// 获取步骤描述
function getStepDescription(method: string, step: number): string {
  const steps = {
    full: [
      "加载预训练模型初始参数",
      "准备目标任务数据",
      "计算所有参数的梯度",
      "更新全部模型参数",
      "保存整个微调模型"
    ],
    freeze: [
      "加载预训练模型初始参数",
      "冻结底层特征提取器参数",
      "只计算未冻结层的梯度",
      "仅更新顶层参数",
      "保存带有冻结层的模型"
    ],
    lora: [
      "加载预训练模型并冻结所有参数",
      "为关键层添加小型低秩矩阵",
      "仅计算低秩适配器的梯度",
      "更新低秩矩阵权重",
      "只保存轻量级适配器参数"
    ]
  };
  
  return step < 5 ? steps[method as keyof typeof steps][step] : "完成";
}

const EnhancedNeuralNetworkViz: React.FC<EnhancedNeuralNetworkVizProps> = ({ method, animationStep }) => {
  // 定义网络层次结构
  const layers = [
    { id: 'input', nodes: 4, label: '输入层' },
    { id: 'hidden1', nodes: 6, label: '底层特征' },
    { id: 'hidden2', nodes: 6, label: '高层特征' },
    { id: 'output', nodes: 3, label: '输出层' }
  ];
  
  // 动画配置
  const pulseAnimation = {
    scale: [1, 1.03, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.2, 
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  };
  
  // 获取节点颜色 - 基于方法和动画步骤
  const getNodeColor = (layerId: string, nodeIndex: number) => {
    // 初始状态都是灰色
    if (animationStep === 0) return 'fill-gray-400';
    
    if (method === 'full') {
      // 全参数微调：所有节点激活
      return animationStep >= 3 ? 'fill-blue-500' : 'fill-gray-400';
    } else if (method === 'freeze') {
      // 参数冻结：前两层冻结(始终灰色)，后两层激活
      return (layerId === 'input' || layerId === 'hidden1') 
        ? 'fill-gray-400' // 冻结
        : animationStep >= 3 ? 'fill-green-500' : 'fill-gray-400'; // 可训练
    } else { // LoRA
      // LoRA基本参数冻结，只有低秩适配器激活
      return 'fill-gray-400';
    }
  };
  
  // 获取连接颜色 - 基于方法和动画步骤
  const getConnectionColor = (fromLayer: string, toLayer: string) => {
    // 初始状态都是浅灰色
    if (animationStep === 0) return 'stroke-gray-300';
    
    if (method === 'full') {
      // 全参数微调：所有连接激活
      return animationStep >= 3 ? 'stroke-blue-400' : 'stroke-gray-300';
    } else if (method === 'freeze') {
      // 参数冻结：前两层连接冻结，后两层激活
      if (fromLayer === 'input' && toLayer === 'hidden1') return 'stroke-gray-300';
      if (fromLayer === 'hidden1' && toLayer === 'hidden2' && animationStep < 3) return 'stroke-gray-300';
      
      return (fromLayer === 'hidden1' && toLayer === 'hidden2') || fromLayer === 'hidden2'
        ? animationStep >= 3 ? 'stroke-green-400' : 'stroke-gray-300'
        : 'stroke-gray-300';
    } else { // LoRA
      // LoRA所有原始连接保持冻结
      return 'stroke-gray-300';
    }
  };
  
  // 网络宽度和高度
  const width = 400;
  const height = 300;
  const padding = 40;
  
  // 计算位置
  const layerWidth = (width - 2 * padding) / (layers.length - 1);
  
  // 是否显示LoRA节点和连接
  const showLoRA = method === 'lora' && animationStep >= 2;
  
  return (
    <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
        {/* 绘制层之间的连接 */}
        {layers.slice(0, -1).map((layer, layerIndex) => {
          const nextLayer = layers[layerIndex + 1];
          const fromX = padding + layerIndex * layerWidth;
          const toX = padding + (layerIndex + 1) * layerWidth;
          
          const connections = [];
          
          // 常规连接
          for (let i = 0; i < layer.nodes; i++) {
            const fromY = (height / (layer.nodes + 1)) * (i + 1);
            
            for (let j = 0; j < nextLayer.nodes; j++) {
              const toY = (height / (nextLayer.nodes + 1)) * (j + 1);
              
              connections.push(
                <line
                  key={`${layer.id}-${i}-${nextLayer.id}-${j}`}
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  className={`${getConnectionColor(layer.id, nextLayer.id)} stroke-[1.5]`}
                  strokeOpacity={0.6}
                />
              );
            }
          }
          
          // LoRA连接 (仅在LoRA模式下)
          if (showLoRA) {
            // 显著减少LoRA连接，仅显示少量关键连接，避免视觉混乱
            const loraConnections = [];
            
            // 每层只添加两个LoRA连接，一个在顶部，一个在底部
            const fromIdx1 = 0;
            const toIdx1 = 0;
            const fromY1 = (height / (layer.nodes + 1)) * (fromIdx1 + 1);
            const toY1 = (height / (nextLayer.nodes + 1)) * (toIdx1 + 1);
            
            loraConnections.push(
              <motion.line
                key={`lora-${layer.id}-top-${nextLayer.id}`}
                x1={fromX}
                y1={fromY1}
                x2={toX}
                y2={toY1}
                className="stroke-purple-500 stroke-[2]"
                strokeOpacity={0.8}
                strokeDasharray="5"
                animate={animationStep >= 3 ? pulseAnimation : {}}
              />
            );
            
            if (layer.nodes > 2 && nextLayer.nodes > 2) {
              const fromIdx2 = layer.nodes - 1;
              const toIdx2 = nextLayer.nodes - 1;
              const fromY2 = (height / (layer.nodes + 1)) * (fromIdx2 + 1);
              const toY2 = (height / (nextLayer.nodes + 1)) * (toIdx2 + 1);
              
              loraConnections.push(
                <motion.line
                  key={`lora-${layer.id}-bottom-${nextLayer.id}`}
                  x1={fromX}
                  y1={fromY2}
                  x2={toX}
                  y2={toY2}
                  className="stroke-purple-500 stroke-[2]"
                  strokeOpacity={0.8}
                  strokeDasharray="5"
                  animate={animationStep >= 3 ? pulseAnimation : {}}
                />
              );
            }
            
            return [...connections, ...loraConnections];
          }
          
          return connections;
        })}
        
        {/* 绘制网络节点 */}
        {layers.map((layer, layerIndex) => {
          const x = padding + layerIndex * layerWidth;
          
          return (
            <g key={layer.id}>
              {/* 层标签 */}
              <text 
                x={x} 
                y={height - 10} 
                textAnchor="middle" 
                className="fill-gray-700 text-xs font-medium"
              >
                {layer.label}
              </text>
              
              {/* 节点 */}
              {Array.from({ length: layer.nodes }).map((_, i) => {
                const y = (height / (layer.nodes + 1)) * (i + 1);
                const nodeColor = getNodeColor(layer.id, i);
                
                // LoRA适配器节点 - 只在关键位置添加少量节点
                if (showLoRA && (i === 0 || i === layer.nodes - 1) && layerIndex > 0 && layerIndex < layers.length - 1) {
                  return (
                    <g key={`${layer.id}-${i}`}>
                      {/* 基础节点 */}
                      <circle
                        cx={x}
                        cy={y}
                        r={8}
                        className={nodeColor}
                      />
                      
                      {/* LoRA适配器节点 */}
                      <motion.circle
                        cx={x + 16}
                        cy={y - 8}
                        r={5}
                        className="fill-purple-500"
                        animate={animationStep >= 3 ? pulseAnimation : {}}
                      />
                    </g>
                  );
                }
                
                // 标准节点
                return (
                  <motion.circle
                    key={`${layer.id}-${i}`}
                    cx={x}
                    cy={y}
                    r={8}
                    className={nodeColor}
                    animate={
                      (method === 'full' && animationStep >= 3) || 
                      (method === 'freeze' && !(layerIndex === 0 || layerIndex === 1) && animationStep >= 3)
                        ? pulseAnimation 
                        : {}
                    }
                  />
                );
              })}
            </g>
          );
        })}
        
        {/* 添加图例 */}
        <g transform="translate(20, 20)">
          <rect width="150" height={method === 'lora' ? 70 : 50} 
                fill="white" fillOpacity="0.9" 
                stroke="#E5E7EB" strokeWidth="1" rx="4" />
                
          {method === 'full' && (
            <>
              <circle cx="15" cy="15" r="6" className={animationStep >= 3 ? "fill-blue-500" : "fill-gray-400"} />
              <text x="30" y="18" className="text-xs fill-gray-700">
                {animationStep >= 3 ? "已更新参数" : "初始参数"}
              </text>
              <circle cx="15" cy="35" r="6" className="fill-gray-400" />
              <text x="30" y="38" className="text-xs fill-gray-700">初始参数</text>
            </>
          )}
          
          {method === 'freeze' && (
            <>
              <circle cx="15" cy="15" r="6" className={animationStep >= 3 ? "fill-green-500" : "fill-gray-400"} />
              <text x="30" y="18" className="text-xs fill-gray-700">
                {animationStep >= 3 ? "已更新参数" : "可训练参数"}
              </text>
              <circle cx="15" cy="35" r="6" className="fill-gray-400" />
              <text x="30" y="38" className="text-xs fill-gray-700">冻结参数</text>
            </>
          )}
          
          {method === 'lora' && (
            <>
              <circle cx="15" cy="15" r="6" className="fill-gray-400" />
              <text x="30" y="18" className="text-xs fill-gray-700">原始参数(冻结)</text>
              <circle cx="15" cy="35" r="5" className="fill-purple-500" />
              <text x="30" y="38" className="text-xs fill-gray-700">LoRA适配器</text>
              <line x1="10" y1="55" x2="20" y2="55" className="stroke-purple-500 stroke-[2.5]" strokeDasharray="3,2" />
              <text x="30" y="58" className="text-xs fill-gray-700">LoRA连接</text>
            </>
          )}
        </g>
        
        {/* 动画步骤指示器 */}
        <g transform="translate(20, 240)">
          <text className="text-xs fill-gray-700 font-bold">
            {animationStep === 0 && "步骤 1: 初始化"}
            {animationStep === 1 && "步骤 2: 准备"}
            {animationStep === 2 && "步骤 3: 计算梯度"}
            {animationStep === 3 && "步骤 4: 更新参数"}
            {animationStep === 4 && "步骤 5: 保存模型"}
            {animationStep >= 5 && "完成"}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default EnhancedVisualizationPage;