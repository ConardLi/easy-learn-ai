/**
 * 包饺子动画组件 - 可视化展示不同 Stage 的工作模式
 * 修复了 UI 布局问题，防止元素重叠和文字遮挡
 */
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DumplingAnimationProps {
  stage: number;
  isAnimating: boolean;
  memoryUsage: number;
}

interface Worker {
  id: number;
  name: string;
  task: string;
  color: string;
  x: number;
  y: number;
  hasMemory?: boolean;
  hasOptimizer?: boolean;
}

interface WorkItem {
  id: number;
  x: number;
  y: number;
  type: 'dough' | 'filling' | 'dumpling' | 'memory' | 'gradient';
  targetWorker?: number;
}

const getWorkersForStage = (stage: number): Worker[] => {
  switch (stage) {
    case 0:
      return [
        { id: 1, name: 'GPU 1', task: '独立工作', color: 'bg-blue-500', x: 20, y: 30, hasMemory: true, hasOptimizer: true },
        { id: 2, name: 'GPU 2', task: '独立工作', color: 'bg-blue-500', x: 80, y: 30, hasMemory: true, hasOptimizer: true },
        { id: 3, name: 'GPU 3', task: '独立工作', color: 'bg-blue-500', x: 20, y: 70, hasMemory: true, hasOptimizer: true },
        { id: 4, name: 'GPU 4', task: '独立工作', color: 'bg-blue-500', x: 80, y: 70, hasMemory: true, hasOptimizer: true },
      ];
    case 1:
      return [
        { id: 1, name: 'GPU 1', task: '共享计算', color: 'bg-green-500', x: 15, y: 50, hasMemory: false, hasOptimizer: true },
        { id: 2, name: 'GPU 2', task: '共享计算', color: 'bg-green-500', x: 40, y: 50, hasMemory: false, hasOptimizer: true },
        { id: 3, name: 'GPU 3', task: '共享计算', color: 'bg-green-500', x: 60, y: 50, hasMemory: false, hasOptimizer: true },
        { id: 4, name: 'GPU 4', task: '共享计算', color: 'bg-green-500', x: 85, y: 50, hasMemory: false, hasOptimizer: true },
      ];
    case 2:
      return [
        { id: 1, name: 'GPU 1', task: '参数存储', color: 'bg-purple-500', x: 20, y: 35, hasMemory: true, hasOptimizer: false },
        { id: 2, name: 'GPU 2', task: '优化器', color: 'bg-indigo-500', x: 80, y: 35, hasMemory: false, hasOptimizer: true },
        { id: 3, name: 'GPU 3', task: '前向计算', color: 'bg-orange-500', x: 20, y: 65, hasMemory: false, hasOptimizer: false },
        { id: 4, name: 'GPU 4', task: '反向计算', color: 'bg-red-500', x: 80, y: 65, hasMemory: false, hasOptimizer: false },
      ];
    case 3:
      return [
        { id: 1, name: 'GPU 1', task: '第1层', color: 'bg-red-500', x: 15, y: 50, hasMemory: false, hasOptimizer: false },
        { id: 2, name: 'GPU 2', task: '第2层', color: 'bg-yellow-500', x: 35, y: 50, hasMemory: false, hasOptimizer: false },
        { id: 3, name: 'GPU 3', task: '第3层', color: 'bg-green-500', x: 65, y: 50, hasMemory: false, hasOptimizer: false },
        { id: 4, name: 'GPU 4', task: '第4层', color: 'bg-blue-500', x: 85, y: 50, hasMemory: false, hasOptimizer: false },
      ];
    default:
      return [];
  }
};

export const DumplingAnimation: React.FC<DumplingAnimationProps> = ({ 
  stage, 
  isAnimating,
  memoryUsage 
}) => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    setWorkers(getWorkersForStage(stage));
    setWorkItems([]);
    setAnimationStep(0);
  }, [stage]);

  const createWorkItems = useCallback(() => {
    if (!isAnimating) return;

    const newItems: WorkItem[] = [];
    
    switch (stage) {
      case 0:
        // 每个GPU独立工作
        if (animationStep % 4 === 0) {
          workers.forEach((worker, idx) => {
            newItems.push({
              id: Date.now() + idx,
              x: worker.x,
              y: worker.y - 15,
              type: 'dough',
              targetWorker: worker.id
            });
          });
        }
        break;
        
      case 1:
        // 从中心分发参数
        if (animationStep % 3 === 0) {
          newItems.push({
            id: Date.now(),
            x: 50,
            y: 20,
            type: 'memory',
            targetWorker: 0
          });
        }
        break;
        
      case 2:
        // 参数和优化器分别分发
        if (animationStep % 4 === 0) {
          newItems.push({
            id: Date.now(),
            x: 20,
            y: 25,
            type: 'memory',
            targetWorker: 1
          });
        }
        if (animationStep % 4 === 2) {
          newItems.push({
            id: Date.now() + 100,
            x: 80,
            y: 25,
            type: 'gradient',
            targetWorker: 2
          });
        }
        break;
        
      case 3:
        // 流水线数据流动
        if (animationStep % 2 === 0) {
          newItems.push({
            id: Date.now(),
            x: 5,
            y: 45,
            type: 'dough',
            targetWorker: 1
          });
        }
        break;
    }
    
    setWorkItems(prev => [...prev.filter(item => item.x < 95), ...newItems]);
  }, [isAnimating, stage, workers, animationStep]);

  useEffect(() => {
    if (!isAnimating) {
      setWorkItems([]);
      return;
    }

    const interval = setInterval(() => {
      createWorkItems();
      setAnimationStep(prev => prev + 1);
      
      // 移动现有工作项
      setWorkItems(prev => prev.map(item => {
        switch (stage) {
          case 3:
            return { ...item, x: item.x + 6 };
          case 1:
            // 参数从中心向各GPU分发
            const randomTarget = workers[Math.floor(Math.random() * workers.length)];
            if (randomTarget) {
              return {
                ...item,
                x: item.x + (randomTarget.x - item.x) * 0.15,
                y: item.y + (randomTarget.y - item.y) * 0.15
              };
            }
            return item;
          case 2:
            // 向目标GPU移动
            const targetGPU = workers.find(w => w.id === item.targetWorker);
            if (targetGPU) {
              return {
                ...item,
                x: item.x + (targetGPU.x - item.x) * 0.1,
                y: item.y + (targetGPU.y - item.y) * 0.1
              };
            }
            return item;
          default:
            return { ...item, y: item.y + 3 };
        }
      }).filter(item => {
        // 清理超出边界的项目
        if (stage === 3) return item.x < 95;
        return item.y < 85;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnimating, stage, workers, createWorkItems]);

  const renderStageDescription = () => {
    const descriptions = {
      0: '每个 GPU 独立工作，各自拥有完整的模型和优化器',
      1: '所有 GPU 共享模型参数，但各自维护优化器状态',
      2: '模型参数和优化器状态分别存储在专用的 GPU 上',
      3: '模型按层分割，数据在 GPU 间流水线式处理'
    };
    
    return descriptions[stage as keyof typeof descriptions] || '';
  };

  const getMemoryIndicator = (worker: Worker) => {
    let memoryLoad = 0;
    
    switch (stage) {
      case 0:
        memoryLoad = 100; // 每个GPU都有完整模型
        break;
      case 1:
        memoryLoad = 75; // 共享参数，但有优化器
        break;
      case 2:
        if (worker.hasMemory) memoryLoad = 60;
        else if (worker.hasOptimizer) memoryLoad = 40;
        else memoryLoad = 20;
        break;
      case 3:
        memoryLoad = 25; // 只有部分层
        break;
    }
    
    return memoryLoad;
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Stage Description */}
      <div className="absolute top-3 left-3 right-3 z-20">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm">
          <p className="text-sm font-medium text-gray-800 leading-relaxed">
            Stage {stage}: {renderStageDescription()}
          </p>
        </div>
      </div>

      {/* Shared Memory Pool for Stage 1 */}
      {stage === 1 && (
        <motion.div
          className="absolute top-16 left-1/2 transform -translate-x-1/2 z-15"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-blue-100 border-2 border-blue-300 rounded-lg px-3 py-2 text-center shadow-sm">
            <div className="text-xs font-bold text-blue-700">共享参数池</div>
            <div className="text-xs text-blue-600">Model Weights</div>
          </div>
        </motion.div>
      )}

      {/* Connection lines (behind GPUs) */}
      <div className="absolute inset-0 z-5">
        {stage === 1 && (
          <svg className="w-full h-full pointer-events-none opacity-40">
            {workers.map((worker, index) => (
              <motion.line
                key={index}
                x1="50%"
                y1="22%"
                x2={`${worker.x}%`}
                y2={`${worker.y - 8}%`}
                stroke="#3B82F6"
                strokeWidth="1"
                strokeDasharray="3,3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            ))}
          </svg>
        )}

        {stage === 3 && (
          <svg className="w-full h-full pointer-events-none opacity-50">
            <motion.path
              d="M 15% 50% L 35% 50% M 35% 50% L 65% 50% M 65% 50% L 85% 50%"
              stroke="#6B7280"
              strokeWidth="2"
              strokeDasharray="4,4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            {/* Flow direction arrows */}
            <motion.polygon
              points="38,140 42,145 38,150"
              fill="#6B7280"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
            <motion.polygon
              points="68,140 72,145 68,150"
              fill="#6B7280"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            />
          </svg>
        )}
      </div>

      {/* Work Items (data flowing) */}
      <div className="absolute inset-0 z-10">
        <AnimatePresence>
          {workItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: `${item.x}%`,
                y: `${item.y}%`
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)'
              }}
              className={`w-3 h-3 rounded-full shadow-md ${
                item.type === 'memory' ? 'bg-blue-500' :
                item.type === 'gradient' ? 'bg-purple-500' :
                item.type === 'dough' ? 'bg-yellow-400' :
                'bg-green-500'
              }`}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Workers/GPUs */}
      <div className="absolute inset-0 z-15">
        <AnimatePresence>
          {workers.map((worker, index) => (
            <motion.div
              key={`${stage}-${worker.id}`}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: `${worker.x}%`,
                y: `${worker.y}%`
              }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* GPU Node */}
              <div className="relative">
                <div className={`relative w-12 h-12 ${worker.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white`}>
                  {worker.id}
                  
                  {/* Memory indicator */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                    <div 
                      className={`w-1.5 h-1.5 rounded-full ${
                        getMemoryIndicator(worker) > 80 ? 'bg-red-500' :
                        getMemoryIndicator(worker) > 50 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    />
                  </div>
                  
                  {/* Memory/Optimizer indicators */}
                  {worker.hasMemory && (
                    <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 bg-blue-600 rounded-sm border border-white" title="存储参数" />
                  )}
                  {worker.hasOptimizer && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-purple-600 rounded-sm border border-white" title="优化器状态" />
                  )}
                  
                  {/* Pulsing animation when active */}
                  {isAnimating && (
                    <motion.div
                      className={`absolute inset-0 w-12 h-12 ${worker.color} rounded-lg opacity-20`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  )}
                </div>
                
                {/* Worker Info */}
                <div className="mt-2 text-center max-w-16">
                  <div className="text-xs font-bold text-gray-800 truncate">
                    {worker.name}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {worker.task}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getMemoryIndicator(worker)}%
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Memory usage summary */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-800">单卡显存占用:</span>
            <span className={`font-bold ${
              memoryUsage > 20 ? 'text-red-600' : 
              memoryUsage > 15 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {memoryUsage.toFixed(1)}G
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <motion.div
              className={`h-2 rounded-full ${
                memoryUsage > 20 ? 'bg-red-500' : 
                memoryUsage > 15 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${(memoryUsage / 24) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <div className="text-xs text-gray-600 text-center">
            总容量: 24G × 2 = 48G | 利用率: {((memoryUsage / 24) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};