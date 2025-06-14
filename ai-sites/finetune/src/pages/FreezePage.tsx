/**
 * 参数冻结微调详情页
 * 提供参数冻结微调方法的深入讲解和实例
 */
import React from 'react';
import { motion } from 'framer-motion';

export const FreezePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">参数冻结微调 (Freeze)</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-700">方法概述</h2>
            <p className="text-gray-700 mb-4">
              参数冻结微调是一种选择性地更新预训练模型的部分参数，同时保持其他参数不变的微调方法。
              通常会冻结模型的底层特征提取部分，只微调顶层的任务特定层。
            </p>
            
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-green-800 mb-2">关键特点</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>只更新模型中的部分参数</li>
                <li>底层特征提取器通常被冻结</li>
                <li>减少计算资源需求</li>
                <li>可以防止过拟合，特别是在小数据集上</li>
                <li>保留预训练模型中的通用知识</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-green-600 text-white p-4">
              <h2 className="text-xl font-bold">实现方法</h2>
            </div>
            <div className="p-6">
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>加载预训练模型和权重</li>
                <li>选择哪些层需要冻结（通常是底层）</li>
                <li>设置选定层的 requires_grad=False</li>
                <li>添加或修改任务特定的输出层</li>
                <li>仅在未冻结的参数上进行训练</li>
              </ol>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold mb-2 text-gray-800">伪代码示例</h3>
                <pre className="bg-gray-800 text-gray-200 p-3 rounded text-sm overflow-x-auto">
{`# 加载预训练模型
model = load_pretrained_model()

# 冻结底层参数
for param in model.base_layers.parameters():
    param.requires_grad = False
    
# 修改输出层适应目标任务
model.output_layer = new_task_specific_layer()

# 设置优化器 - 注意只有未冻结的参数会被更新
optimizer = Adam(
    [p for p in model.parameters() if p.requires_grad],
    lr=1e-4
)

# 训练未冻结的参数
for epoch in range(num_epochs):
    for batch in dataloader:
        outputs = model(batch.inputs)
        loss = compute_loss(outputs, batch.labels)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

# 保存模型
save_model(model, 'freeze_fine_tuned_model.pt')`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-green-600 text-white p-4">
              <h2 className="text-xl font-bold">优缺点分析</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-bold text-green-600 mb-2">优点</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><span className="font-medium">计算效率</span>：减少需要计算的参数数量，加快训练速度</li>
                  <li><span className="font-medium">内存效率</span>：反向传播中不需要存储冻结参数的梯度</li>
                  <li><span className="font-medium">防止过拟合</span>：特别适合小型数据集训练</li>
                  <li><span className="font-medium">保留通用特征</span>：防止破坏预训练模型中有价值的通用特征</li>
                  <li><span className="font-medium">减少灾难性遗忘</span>：保持模型的泛化能力</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-600 mb-2">缺点</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><span className="font-medium">性能可能次优</span>：在某些任务上可能无法达到全参数微调的性能</li>
                  <li><span className="font-medium">需要专业知识</span>：选择哪些层冻结需要对模型架构有深入了解</li>
                  <li><span className="font-medium">灵活性降低</span>：在任务与预训练差异大时效果可能不佳</li>
                  <li><span className="font-medium">调优困难</span>：找到最佳的冻结点可能需要多次实验</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-700">冻结策略</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">逐层冻结</h3>
                <p className="text-gray-700">
                  只冻结前N层，保持后面的层可训练。适用于目标任务与预训练任务相似度中等的情况。
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-800 mb-2">特定模块冻结</h3>
                <p className="text-gray-700">
                  基于模型架构选择性地冻结特定模块，如只训练注意力头或MLP层。需要对模型结构有深入理解。
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-bold text-amber-800 mb-2">渐进式解冻</h3>
                <p className="text-gray-700">
                  首先冻结所有层，然后从顶层到底层逐步解冻并训练。平衡泛化能力和针对性适应。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-700">适用场景</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">理想应用场景</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>计算资源受限的环境</li>
                  <li>训练数据集较小</li>
                  <li>目标任务与预训练任务相似</li>
                  <li>模型主要需要学习任务特定的表示</li>
                  <li>需要防止过拟合</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-800 mb-2">不适合的场景</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>目标任务与预训练任务有很大差异</li>
                  <li>需要模型学习全新的基础特征</li>
                  <li>有足够的计算资源且追求最高性能</li>
                  <li>有大量任务特定的训练数据</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};