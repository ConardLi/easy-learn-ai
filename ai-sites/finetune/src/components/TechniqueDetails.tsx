/**
 * 技术细节组件，展示每种微调方法的详细原理和实现
 * 使用Tab布局组织不同方法的内容
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TechniqueDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('full');

  const tabs = [
    { id: 'full', label: 'Full Parameter' },
    { id: 'freeze', label: 'Freeze' },
    { id: 'lora', label: 'LoRA' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="border-b">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 font-medium relative ${
                activeTab === tab.id 
                  ? 'text-indigo-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                  layoutId="activeTab"
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'full' && <FullParameterDetail />}
            {activeTab === 'freeze' && <FreezeDetail />}
            {activeTab === 'lora' && <LoRADetail />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const FullParameterDetail: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">全参数微调 (Full Parameter Fine-tuning)</h3>
      
      <p>
        全参数微调是最直接的迁移学习方法，通过在目标任务数据上继续训练预训练模型的全部参数。
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-bold text-blue-800 mb-2">工作原理</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>加载预训练模型和权重</li>
            <li>可选择性添加或替换任务特定层（如分类头）</li>
            <li>在目标任务数据上训练所有模型参数</li>
            <li>使用较小的学习率以保留预训练知识</li>
            <li>通常采用早停和正则化技术防止过拟合</li>
          </ol>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-bold text-blue-800 mb-2">关键特点</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>所有模型参数都会被更新</li>
            <li>参数量通常在百万到数十亿不等</li>
            <li>需要较大的GPU内存</li>
            <li>每个任务都需要单独保存完整的模型</li>
            <li>训练时间相对较长</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">适用场景</h4>
        <p className="text-gray-700">
          全参数微调最适合以下情况：有充足的计算资源、需要最大化模型性能、目标任务与预训练任务有显著差异、
          或有足够的任务数据可以有效训练所有参数。
        </p>
      </div>
      
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">代码示例 (PyTorch)</h4>
        <pre className="bg-gray-800 text-gray-200 p-3 rounded text-sm overflow-x-auto">
{`from transformers import BertForSequenceClassification, AdamW

# 加载预训练模型
model = BertForSequenceClassification.from_pretrained(
    'bert-base-uncased', 
    num_labels=2
)

# 设置优化器，所有参数都参与训练
optimizer = AdamW(model.parameters(), lr=2e-5)

# 训练循环
for epoch in range(3):
    for batch in train_dataloader:
        outputs = model(**batch)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

# 保存完整微调模型
model.save_pretrained('./fine_tuned_model')`}
        </pre>
      </div>
    </div>
  );
};

const FreezeDetail: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">参数冻结微调 (Freeze)</h3>
      
      <p>
        参数冻结微调通过选择性地冻结模型的某些部分（通常是底层），只更新剩余参数，从而减少计算量并防止过拟合。
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-bold text-green-800 mb-2">工作原理</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>加载预训练模型和权重</li>
            <li>确定要冻结的层（通常是底层特征提取器）</li>
            <li>将选定层的参数设置为不需要梯度</li>
            <li>只在未冻结的参数上进行反向传播和更新</li>
            <li>通常配合较大学习率加速训练</li>
          </ol>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-bold text-green-800 mb-2">常见冻结策略</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>冻结底部N层，训练顶部层</li>
            <li>只训练任务特定头部网络</li>
            <li>逐步解冻（先冻结全部，然后逐层解冻）</li>
            <li>根据层的重要性选择性冻结</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">优缺点</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-green-700">优点</h5>
            <ul className="list-disc list-inside text-gray-700">
              <li>减少计算资源需求</li>
              <li>防止过拟合，特别是小数据集</li>
              <li>加快训练速度</li>
              <li>保留预训练模型中的通用特征</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-red-700">缺点</h5>
            <ul className="list-disc list-inside text-gray-700">
              <li>性能可能弱于全参数微调</li>
              <li>选择冻结哪些层需要专业知识</li>
              <li>不同任务可能需要不同冻结策略</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">代码示例 (PyTorch)</h4>
        <pre className="bg-gray-800 text-gray-200 p-3 rounded text-sm overflow-x-auto">
{`from transformers import BertModel, BertTokenizer
import torch.nn as nn

# 加载预训练模型
bert = BertModel.from_pretrained('bert-base-uncased')
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# 冻结BERT的底层
for param in bert.embeddings.parameters():
    param.requires_grad = False
    
for i in range(8):  # 冻结前8层
    for param in bert.encoder.layer[i].parameters():
        param.requires_grad = False

# 添加任务特定分类头
class CustomClassifier(nn.Module):
    def __init__(self, bert_model):
        super().__init__()
        self.bert = bert_model
        self.classifier = nn.Linear(768, num_classes)
        
    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids, attention_mask=attention_mask)
        return self.classifier(outputs.pooler_output)

# 创建模型并设置优化器
model = CustomClassifier(bert)
# 注意：优化器只会更新requires_grad=True的参数
optimizer = torch.optim.AdamW(
    [p for p in model.parameters() if p.requires_grad], 
    lr=1e-4
)`}
        </pre>
      </div>
    </div>
  );
};

const LoRADetail: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">低秩适应 (LoRA)</h3>
      
      <p>
        LoRA通过向预训练模型中注入小型、可训练的低秩矩阵，在保持原始参数不变的情况下实现高效微调。
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-bold text-purple-800 mb-2">数学原理</h4>
          <p className="text-gray-700">
            对于原始权重矩阵 W ∈ ℝ^(d×k)，LoRA假设其更新ΔW可以分解为两个低秩矩阵的乘积：ΔW = BA，
            其中B ∈ ℝ^(d×r)，A ∈ ℝ^(r×k)，且秩r≪min(d,k)。
          </p>
          <p className="text-gray-700 mt-2">
            前向传播时，LoRA计算：h = Wx + BAx = Wx + ΔWx
          </p>
          <p className="text-gray-700 mt-2">
            这种方法将可训练参数从d×k减少到r×(d+k)，对于大型模型可显著减少参数量。
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-bold text-purple-800 mb-2">实现细节</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>冻结所有原始模型参数</li>
            <li>在特定层（通常是自注意力矩阵）注入低秩适配器</li>
            <li>使用较大学习率训练这些适配器</li>
            <li>多个任务可以共享相同的基础模型，只需切换适配器</li>
            <li>常用秩r值通常在4-64之间，根据模型大小和任务复杂度调整</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">关键优势</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-purple-700">参数效率</h5>
            <p className="text-gray-700">
              LoRA适配器通常只有原始模型参数量的0.1%-1%，即使对于数十亿参数的大模型，也只需要几百万参数。
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-purple-700">可组合性</h5>
            <p className="text-gray-700">
              可以组合多个LoRA适配器，甚至可以在推理时动态调整不同适配器的权重，创造混合能力。
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">代码示例 (PyTorch + PEFT库)</h4>
        <pre className="bg-gray-800 text-gray-200 p-3 rounded text-sm overflow-x-auto">
{`from transformers import AutoModelForCausalLM
from peft import get_peft_model, LoraConfig, TaskType

# 加载预训练大型语言模型
model = AutoModelForCausalLM.from_pretrained("facebook/opt-6.7b")

# 定义LoRA配置
peft_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,                       # 低秩矩阵的秩
    lora_alpha=32,              # LoRA缩放参数
    lora_dropout=0.1,           # LoRA层的dropout率
    target_modules=["q_proj", "v_proj"],  # 应用LoRA的目标模块
    bias="none",
)

# 创建PEFT模型
model = get_peft_model(model, peft_config)

# 查看可训练参数
model.print_trainable_parameters()
# 输出: "可训练参数: 4,194,304 (0.1% of 4 billion)"

# 训练LoRA模型
trainer = Trainer(
    model=model,
    train_dataset=dataset,
    args=training_args,
    data_collator=data_collator,
)
trainer.train()

# 保存LoRA适配器（而非完整模型）
model.save_pretrained("lora_adapter")`}
        </pre>
      </div>
    </div>
  );
};