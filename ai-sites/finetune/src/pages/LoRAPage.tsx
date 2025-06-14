/**
 * LoRA微调方法详情页
 * 提供LoRA微调方法的深入讲解和实例
 */
import React from 'react';
import { motion } from 'framer-motion';

export const LoRAPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">低秩适应 (LoRA)</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-700">方法概述</h2>
            <p className="text-gray-700 mb-4">
              LoRA (Low-Rank Adaptation) 是一种高效的微调技术，它冻结预训练模型的权重，
              并将可训练的低秩矩阵注入模型的每一层，从而极大地减少了需要训练的参数数量。
            </p>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-purple-800 mb-2">关键特点</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>冻结所有原始模型参数</li>
                <li>注入小型低秩矩阵作为额外参数</li>
                <li>大幅减少待训练参数数量（通常是1%以下）</li>
                <li>可以为不同任务训练不同的LoRA适配器</li>
                <li>多个LoRA适配器可以组合使用</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-purple-600 text-white p-4">
              <h2 className="text-xl font-bold">技术原理</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                LoRA基于这样一个假设：模型权重的更新矩阵在微调过程中有较低的"内在维度"。
                因此，不需要学习完整的权重更新矩阵，只需要学习一个低秩分解。
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-bold mb-2 text-gray-800">数学表达</h3>
                <p className="text-gray-700">
                  对于原始的权重矩阵 W ∈ ℝ^(d×k)，LoRA引入两个较小的矩阵 A ∈ ℝ^(d×r) 和 B ∈ ℝ^(r×k)，
                  其中r≪min(d,k)。更新后的权重变为：W + ΔW = W + AB
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold mb-2 text-gray-800">伪代码示例</h3>
                <pre className="bg-gray-800 text-gray-200 p-3 rounded text-sm overflow-x-auto">
{`# 加载预训练模型
model = load_pretrained_model()

# 冻结所有原始参数
for param in model.parameters():
    param.requires_grad = False
    
# 为每个想要适应的权重矩阵添加LoRA适配器
for name, module in model.named_modules():
    if isinstance(module, nn.Linear):
        # 创建低秩矩阵 A 和 B
        lora_A = nn.Parameter(torch.zeros(module.in_features, lora_r))
        lora_B = nn.Parameter(torch.zeros(lora_r, module.out_features))
        nn.init.kaiming_uniform_(lora_A)
        nn.init.zeros_(lora_B)
        
        # 将原始前向传播替换为包含LoRA的版本
        def forward_with_lora(x, orig_forward):
            orig_output = orig_forward(x)
            lora_output = (x @ lora_A) @ lora_B * scaling
            return orig_output + lora_output
        
        # 替换模块的前向传播方法
        module.forward = lambda x: forward_with_lora(
            x, module.original_forward
        )
        
        # 添加LoRA参数到优化器
        lora_params.extend([lora_A, lora_B])

# 仅优化LoRA参数
optimizer = Adam(lora_params, lr=1e-3)

# 训练LoRA参数
for epoch in range(num_epochs):
    for batch in dataloader:
        outputs = model(batch.inputs)
        loss = compute_loss(outputs, batch.labels)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

# 保存LoRA适配器参数
save_lora_params(lora_params, 'lora_adapters.pt')`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-purple-600 text-white p-4">
              <h2 className="text-xl font-bold">优缺点分析</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-bold text-green-600 mb-2">优点</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><span className="font-medium">极高的参数效率</span>：训练参数数量减少99%以上</li>
                  <li><span className="font-medium">内存效率</span>：大幅降低GPU内存需求</li>
                  <li><span className="font-medium">训练速度快</span>：减少计算量，加快收敛</li>
                  <li><span className="font-medium">存储高效</span>：每个任务只需保存小型适配器</li>
                  <li><span className="font-medium">可组合性</span>：不同任务的适配器可以组合使用</li>
                  <li><span className="font-medium">避免灾难性遗忘</span>：原始参数保持不变</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-600 mb-2">缺点</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><span className="font-medium">性能上限</span>：在某些复杂任务上可能弱于全参数微调</li>
                  <li><span className="font-medium">秩超参数选择</span>：需要为不同模型和任务调整适当的秩</li>
                  <li><span className="font-medium">实现复杂性</span>：比简单的微调方法实现更复杂</li>
                  <li><span className="font-medium">不是所有层都适合</span>：某些特殊层可能不适合低秩适应</li>
                  <li><span className="font-medium">推理稍复杂</span>：需要额外处理原始模型和适配器的组合</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-700">LoRA变体</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-bold text-indigo-800 mb-2">AdaLoRA</h3>
                <p className="text-gray-700">
                  自适应分配不同重要层的秩预算，更重要的层获得更高的秩，提高参数利用效率。
                </p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-bold text-pink-800 mb-2">QLoRA</h3>
                <p className="text-gray-700">
                  结合量化技术的LoRA实现，将基础模型量化为4位精度，进一步减少内存需求。
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-bold text-amber-800 mb-2">LoRA+</h3>
                <p className="text-gray-700">
                  通过扩展LoRA适配器以包含偏置项和归一化参数，进一步提升性能。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-700">适用场景</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">理想应用场景</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>计算资源严重受限的环境</li>
                  <li>需要在多个任务间快速切换</li>
                  <li>存储空间有限，无法保存多个完整模型</li>
                  <li>对推理速度有要求的实时应用</li>
                  <li>需要组合多个特性的应用（如多种风格、多种能力）</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-800 mb-2">不适合的场景</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>任务与预训练目标有极大差异</li>
                  <li>对任务性能要求极高且有充足计算资源</li>
                  <li>需要模型学习全新概念而非调整已有知识</li>
                  <li>模型架构不适合低秩分解（如某些特殊网络结构）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};