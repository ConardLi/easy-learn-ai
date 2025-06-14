/**
 * 模型可视化组件，展示三种微调方法的工作原理
 * 使用动画效果直观展示不同微调方法的参数更新过程
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Method = 'full' | 'freeze' | 'lora';

export const ModelVisualization: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<Method>('full');

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 border-b">
        <div className="flex flex-wrap gap-3 justify-center">
          <MethodButton 
            label="Full Parameter" 
            isActive={activeMethod === 'full'} 
            onClick={() => setActiveMethod('full')}
            color="bg-blue-100 text-blue-800"
            activeColor="bg-blue-600"
          />
          <MethodButton 
            label="Freeze" 
            isActive={activeMethod === 'freeze'} 
            onClick={() => setActiveMethod('freeze')}
            color="bg-green-100 text-green-800"
            activeColor="bg-green-600"
          />
          <MethodButton 
            label="LoRA" 
            isActive={activeMethod === 'lora'} 
            onClick={() => setActiveMethod('lora')}
            color="bg-purple-100 text-purple-800"
            activeColor="bg-purple-600"
          />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 bg-slate-50 rounded-lg p-4 shadow-inner">
            <NeuralNetworkViz method={activeMethod} />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold mb-4 text-center md:text-left">
              {activeMethod === 'full' && "全参数微调 (Full Parameter Fine-tuning)"}
              {activeMethod === 'freeze' && "参数冻结微调 (Freeze)"}
              {activeMethod === 'lora' && "低秩适应 (LoRA)"}
            </h3>
            
            <div className="prose max-w-none bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              {activeMethod === 'full' && (
                <>
                  <p>全参数微调通过梯度下降更新预训练模型的<strong>所有参数</strong>，使模型更好地适应特定任务。</p>
                  <ul>
                    <li>优点：性能最优，适应能力强</li>
                    <li>缺点：计算资源需求大，存储多个微调模型成本高</li>
                  </ul>
                  <p>图中所有参数（蓝色节点）都会在训练过程中被更新。</p>
                </>
              )}
              
              {activeMethod === 'freeze' && (
                <>
                  <p>参数冻结微调仅更新预训练模型的<strong>部分参数</strong>，通常冻结底层特征提取器，只训练顶层分类器。</p>
                  <ul>
                    <li>优点：减少训练时间和计算资源需求</li>
                    <li>缺点：模型适应性可能受限</li>
                  </ul>
                  <p>图中灰色节点表示冻结参数，蓝色节点表示可训练参数。</p>
                </>
              )}
              
              {activeMethod === 'lora' && (
                <>
                  <p>LoRA (Low-Rank Adaptation) 在原始参数旁添加小的<strong>低秩适配矩阵</strong>，仅训练这些额外参数。</p>
                  <ul>
                    <li>优点：参数量极大减少，存储效率高，可组合多个适配器</li>
                    <li>缺点：在某些复杂任务上性能可能略逊于全参数微调</li>
                  </ul>
                  <p>图中紫色节点和连接表示低秩适配矩阵，原始网络参数保持不变。</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
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
      className={`px-5 py-2.5 rounded-md font-medium transition-colors shadow-sm ${
        isActive 
          ? `${activeColor} text-white scale-105 shadow-md` 
          : `${color} hover:opacity-90`
      }`}
    >
      {label}
    </button>
  );
};

interface NeuralNetworkVizProps {
  method: Method;
}

const NeuralNetworkViz: React.FC<NeuralNetworkVizProps> = ({ method }) => {
  // 定义网络层次结构
  const layers = [
    { id: 'input', nodes: 4, label: '输入层' },
    { id: 'hidden1', nodes: 6, label: '隐藏层 1' },
    { id: 'hidden2', nodes: 6, label: '隐藏层 2' },
    { id: 'output', nodes: 3, label: '输出层' }
  ];
  
  // 动画配置
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.5, // 降低动画速度
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  };
  
  // 获取节点颜色
  const getNodeColor = (layerId: string, nodeIndex: number) => {
    if (method === 'full') {
      return 'fill-blue-500'; // 全参数微调：所有节点可训练
    } else if (method === 'freeze') {
      // 参数冻结：前两层冻结，后两层可训练
      return (layerId === 'input' || layerId === 'hidden1') 
        ? 'fill-gray-400' // 冻结
        : 'fill-green-500'; // 可训练
    } else { // LoRA
      return 'fill-gray-400'; // LoRA基本参数冻结
    }
  };
  
  // 获取连接颜色
  const getConnectionColor = (fromLayer: string, toLayer: string) => {
    if (method === 'full') {
      return 'stroke-blue-400';
    } else if (method === 'freeze') {
      if (fromLayer === 'hidden1' && toLayer === 'hidden2') {
        return 'stroke-green-400';
      }
      return (fromLayer === 'input' || toLayer === 'hidden1') 
        ? 'stroke-gray-300' 
        : 'stroke-green-400';
    } else { // LoRA
      return 'stroke-gray-300';
    }
  };
  
  // 网络宽度和高度
  const width = 400;
  const height = 300;
  const padding = 40;
  
  // 计算位置
  const layerWidth = (width - 2 * padding) / (layers.length - 1);
  
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
          if (method === 'lora') {
            // 减少LoRA连接数量，每层只显示关键的1-2个连接，避免视觉混乱
            // 只为特定节点添加LoRA连接，突出重点
            const loraConnections = [
              { fromIdx: 0, toIdx: 0 },
              { fromIdx: layer.nodes - 1, toIdx: nextLayer.nodes - 1 },
            ];
            
            for (const conn of loraConnections) {
              const fromY = (height / (layer.nodes + 1)) * (conn.fromIdx + 1);
              const toY = (height / (nextLayer.nodes + 1)) * (conn.toIdx + 1);
              
              connections.push(
                <motion.line
                  key={`lora-${layer.id}-${conn.fromIdx}-${nextLayer.id}-${conn.toIdx}`}
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  className="stroke-purple-500 stroke-[3]"
                  strokeOpacity={0.8}
                  strokeDasharray="4"
                  animate={pulseAnimation}
                />
              );
            }
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
                
                // 特殊处理LoRA的适配器节点 - 减少节点数量，只在关键位置添加
                if (method === 'lora' && (i === 0 || i === layer.nodes - 1) && layerIndex > 0 && layerIndex < layers.length - 1) {
                  return (
                    <g key={`${layer.id}-${i}`}>
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={8}
                        className={nodeColor}
                        animate={pulseAnimation}
                      />
                      <motion.circle
                        cx={x + 16}
                        cy={y - 6}
                        r={5}
                        className="fill-purple-500"
                        animate={pulseAnimation}
                      />
                    </g>
                  );
                }
                
                return (
                  <motion.circle
                    key={`${layer.id}-${i}`}
                    cx={x}
                    cy={y}
                    r={8}
                    className={nodeColor}
                    animate={
                      (method === 'full') || 
                      (method === 'freeze' && !(layerIndex === 0 || layerIndex === 1)) 
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
        <g transform="translate(10, 10)">
          <rect width="120" height={method === 'lora' ? 70 : 50} 
                fill="white" fillOpacity="0.9" 
                stroke="#E5E7EB" strokeWidth="1" rx="4" />
                
          {method === 'full' && (
            <>
              <circle cx="15" cy="15" r="6" className="fill-blue-500" />
              <text x="30" y="18" className="text-xs fill-gray-700">可训练参数</text>
              <circle cx="15" cy="35" r="6" className="fill-gray-400" />
              <text x="30" y="38" className="text-xs fill-gray-700">初始参数</text>
            </>
          )}
          
          {method === 'freeze' && (
            <>
              <circle cx="15" cy="15" r="6" className="fill-green-500" />
              <text x="30" y="18" className="text-xs fill-gray-700">可训练参数</text>
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
      </svg>
    </div>
  );
};