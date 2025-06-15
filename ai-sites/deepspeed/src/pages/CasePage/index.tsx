/**
 * 实际案例页面 - 展示真实的显存消耗数据和性能对比
 * 包含交互式图表和详细的数据分析
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Monitor, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

const memoryData = [
  {
    scenario: '单卡训练',
    traditional: 30.5,
    deepspeed: 0,
    status: 'failed'
  },
  {
    scenario: '2卡传统',
    traditional: 30.5,
    deepspeed: 0,
    status: 'failed'
  },
  {
    scenario: '2卡 Stage3',
    traditional: 0,
    deepspeed: 16.3,
    status: 'success'
  }
];

const performanceData = [
  { stage: 'Stage 0', speed: 100, memory: 100, communication: 0 },
  { stage: 'Stage 1', speed: 95, memory: 75, communication: 10 },
  { stage: 'Stage 2', speed: 85, memory: 50, communication: 25 },
  { stage: 'Stage 3', speed: 70, memory: 25, communication: 40 }
];

const detailedCase = {
  model: 'Large Language Model',
  sequence_length: 2048,
  batch_size: 3,
  gpu_model: 'RTX 4090D',
  gpu_memory: '24GB',
  estimated_memory: '30.5GB',
  actual_stage3_usage: '16.3GB',
  communication_overhead: '2GB'
};

export const CasePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'memory' | 'performance' | 'details'>('memory');

  const renderMemoryChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={memoryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="scenario" />
        <YAxis label={{ value: 'GB', angle: -90, position: 'insideLeft' }} />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `${value}GB`, 
            name === 'traditional' ? '传统多卡' : 'DeepSpeed Stage3'
          ]}
        />
        <Legend />
        <Bar dataKey="traditional" fill="#ef4444" name="传统多卡" />
        <Bar dataKey="deepspeed" fill="#10b981" name="DeepSpeed Stage3" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPerformanceChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={performanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stage" />
        <YAxis label={{ value: '相对值 (%)', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value: number) => [`${value}%`]} />
        <Legend />
        <Line type="monotone" dataKey="speed" stroke="#3b82f6" strokeWidth={3} name="训练速度" />
        <Line type="monotone" dataKey="memory" stroke="#ef4444" strokeWidth={3} name="显存占用" />
        <Line type="monotone" dataKey="communication" stroke="#f59e0b" strokeWidth={3} name="通信开销" />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          实际案例分析
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          基于真实训练场景的显存消耗和性能数据分析
        </p>
      </motion.div>

      {/* Case Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">训练场景配置</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-gray-600">GPU 配置</div>
            <div className="font-semibold text-gray-800">2x RTX 4090D</div>
            <div className="text-xs text-gray-500">24GB 每卡</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-gray-600">序列长度</div>
            <div className="font-semibold text-gray-800">2048</div>
            <div className="text-xs text-gray-500">Token 长度</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-gray-600">批量大小</div>
            <div className="font-semibold text-gray-800">3</div>
            <div className="text-xs text-gray-500">Batch Size</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-gray-600">预估显存</div>
            <div className="font-semibold text-gray-800">30.5GB</div>
            <div className="text-xs text-gray-500">每卡需求</div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex justify-center">
          <div className="bg-white p-1 rounded-xl shadow-lg">
            <button
              onClick={() => setActiveTab('memory')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'memory'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              显存对比
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'performance'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              性能分析
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'details'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              详细数据
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        {activeTab === 'memory' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              显存消耗对比
            </h3>
            {renderMemoryChart()}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h4 className="font-semibold text-red-800 mb-2">传统多卡训练</h4>
                <p className="text-red-700 text-sm">
                  每张卡都需要 30.5GB 显存，超出 24GB 限制，训练失败
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-semibold text-green-800 mb-2">DeepSpeed Stage 3</h4>
                <p className="text-green-700 text-sm">
                  每张卡只需 16.3GB（含 2GB 通信开销），成功运行
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              不同 Stage 性能权衡
            </h3>
            {renderPerformanceChart()}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-800 mb-3">性能分析要点</h4>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• Stage 越高，显存节省越多，但通信开销增加</li>
                <li>• Stage 0 速度最快，但显存占用最大</li>
                <li>• Stage 3 显存最省，适合超大模型，但速度有所下降</li>
                <li>• 选择 Stage 需要平衡显存需求和训练速度</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              详细配置数据
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">模型配置</h4>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">模型类型</span>
                    <span className="font-medium">{detailedCase.model}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">序列长度</span>
                    <span className="font-medium">{detailedCase.sequence_length}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">批量大小</span>
                    <span className="font-medium">{detailedCase.batch_size}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">硬件配置</h4>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">GPU 型号</span>
                    <span className="font-medium">{detailedCase.gpu_model}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">单卡显存</span>
                    <span className="font-medium">{detailedCase.gpu_memory}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">GPU 数量</span>
                    <span className="font-medium">2 张</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-semibold text-gray-800 mb-4">显存分析</h4>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-600 mb-2">
                      {detailedCase.estimated_memory}
                    </div>
                    <div className="text-gray-600">预估需求</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {detailedCase.actual_stage3_usage}
                    </div>
                    <div className="text-gray-600">Stage3 实际</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      {detailedCase.communication_overhead}
                    </div>
                    <div className="text-gray-600">通信开销</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
