/**
 * 全参数微调方法详情页
 * 提供全参数微调方法的深入讲解和实例
 */
import React from 'react';
import { motion } from 'framer-motion';

export const FullParameterPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">全参数微调 (Full Parameter Fine-tuning)</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">方法概述</h2>
            <p className="text-gray-700 mb-4">
              全参数微调是一种将预训练模型适应到特定任务的方法，它通过在目标任务数据集上训练模型的所有参数来实现。
              这是最直接和传统的微调方法，可以让模型最大限度地适应新任务。
            </p>
            
            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-indigo-800 mb-2">关键特点</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>更新模型中的所有参数</li>
                <li>通常能够达到最佳性能</li>
                <li>需要较大的计算资源和存储空间</li>
                <li>容易出现灾难性遗忘问题</li>
                <li>每个任务需要保存完整的模型副本</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <h2 className="text-xl font-bold">实现方法</h2>
            </div>
            <div className="p-6">
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>加载预训练模型和权重</li>
                <li>添加或修改任务特定的输出层</li>
                <li>选择适当的优化器和学习率</li>
                <li>在目标任务数据上训练所有模型参数</li>
                <li>通常使用较小的学习率避免破坏预训练知识</li>
              </ol>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold mb-2 text-gray-800">伪代码示例</h3>
                <pre className="bg-gray-800 text-gray-200 p-3 rounded text-sm overflow-x-auto">
{`# 加载预训练模型
model = load_pretrained_model()

# 修改输出层适应目标任务
model.output_layer = new_task_specific_layer()

# 设置优化器，通常使用较小学习率
optimizer = Adam(lr=5e-5)

# 训练所有参数
for epoch in range(num_epochs):
    for batch in dataloader:
        outputs = model(batch.inputs)
        loss = compute_loss(outputs, batch.labels)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

# 保存整个模型
save_model(model, 'fine_tuned_model.pt')`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <h2 className="text-xl font-bold">优缺点分析</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-bold text-green-600 mb-2">优点</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><span className="font-medium">最大化性能</span>：通常能够在目标任务上达到最佳性能</li>
                  <li><span className="font-medium">完全适应性</span>：允许模型充分适应新任务的特性</li>
                  <li><span className="font-medium">灵活性</span>：可以用于各种不同的下游任务</li>
                  <li><span className="font-medium">实现简单</span>：概念直接，实现相对简单</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-600 mb-2">缺点</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><span className="font-medium">计算资源需求高</span>：需要大量GPU内存和计算能力</li>
                  <li><span className="font-medium">存储成本高</span>：每个任务都需要保存一个完整模型副本</li>
                  <li><span className="font-medium">灾难性遗忘</span>：可能会丢失原始预训练中获得的知识</li>
                  <li><span className="font-medium">过拟合风险</span>：在小数据集上容易过拟合</li>
                  <li><span className="font-medium">不适合低资源场景</span>：在资源受限设备上难以部署</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">适用场景</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">理想应用场景</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>有充足的计算资源和存储空间</li>
                  <li>需要模型在特定任务上达到最佳性能</li>
                  <li>目标任务与预训练任务有显著差异</li>
                  <li>有足够的任务特定数据进行训练</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-800 mb-2">不适合的场景</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>计算资源有限（如移动设备）</li>
                  <li>存储空间受限</li>
                  <li>需要频繁切换不同任务</li>
                  <li>训练数据非常有限</li>
                  <li>需要保持模型的通用性</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};