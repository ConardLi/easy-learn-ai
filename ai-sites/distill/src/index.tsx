import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLightbulb, FaMicrochip, FaBrain, FaArrowDown } from 'react-icons/fa6';
import { MdCompare, MdSpeed, MdMemory } from 'react-icons/md';
import { AiOutlineExperiment } from 'react-icons/ai';

/**
 * 蒸馏过程图组件 - 展示模型蒸馏的具体步骤
 */
const DistillationProcess: React.FC = () => {
  return (
    <div className="w-full mb-16">
      <h3 className="text-2xl font-bold mb-8 text-center">蒸馏过程详解</h3>
      
      <div className="flex flex-col items-center">
        {/* 步骤1：准备训练数据 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-4/5 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg mb-8"
        >
          <div className="flex items-start">
            <div className="bg-indigo-600 rounded-full p-3 mr-4">
              <FaGraduationCap className="text-white text-xl" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-indigo-800 mb-2">步骤一：准备训练数据</h4>
              <p className="text-gray-700 mb-4">
                在这一步，我们需要准备原始数据集，并使用教师模型（大模型）对这些数据进行处理，
                生成"软标签"。这类似于老师先做完试卷，写出解题思路和答案。
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-semibold text-indigo-700 mb-2">举例：文本分类任务</p>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="bg-blue-50 p-3 rounded-md mb-2 md:mb-0 flex-1">
                    <p className="font-medium">输入数据：</p>
                    <p className="italic">"这部电影很棒"</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <FaArrowDown className="transform rotate-90 md:rotate-0 text-indigo-500 my-2 md:my-0" />
                  </div>
                  <div className="bg-green-50 p-3 rounded-md flex-1">
                    <p className="font-medium">教师模型输出（软标签）：</p>
                    <p className="italic">[正面: 0.88, 负面: 0.12]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* 步骤2：学生模型训练 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-4/5 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg mb-8"
        >
          <div className="flex items-start">
            <div className="bg-purple-600 rounded-full p-3 mr-4">
              <FaBrain className="text-white text-xl" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-purple-800 mb-2">步骤二：学生模型训练</h4>
              <p className="text-gray-700 mb-4">
                学生模型（小模型）接收原始输入数据，并尝试生成与教师模型相似的输出。
                通过比较学生模型的输出与教师模型的软标签之间的差异，不断优化学生模型的参数。
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 p-3 rounded-md">
                    <p className="font-medium text-purple-800 mb-1">1. 输入数据</p>
                    <p className="text-sm">"这部电影很棒" → 学生模型</p>
                  </div>
                  <div className="bg-pink-50 p-3 rounded-md">
                    <p className="font-medium text-pink-800 mb-1">2. 计算损失</p>
                    <p className="text-sm">学生输出: [0.79, 0.21]</p>
                    <p className="text-sm">目标: [0.88, 0.12]</p>
                    <p className="text-sm font-semibold">计算差异(Loss)</p>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-md">
                    <p className="font-medium text-indigo-800 mb-1">3. 参数更新</p>
                    <p className="text-sm">通过反向传播</p>
                    <p className="text-sm">优化模型参数</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* 步骤3：蒸馏结果验证 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full md:w-4/5 bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-start">
            <div className="bg-green-600 rounded-full p-3 mr-4">
              <AiOutlineExperiment className="text-white text-xl" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-green-800 mb-2">步骤三：蒸馏结果验证</h4>
              <p className="text-gray-700 mb-4">
                完成训练后，我们需要评估学生模型的性能，检验其是否成功"继承"了教师模型的知识，
                同时验证在计算资源、内存需求和推理速度等方面是否达到了预期的优化效果。
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3 bg-teal-50 rounded-md">
                    <MdSpeed className="text-teal-600 text-2xl mb-2" />
                    <p className="font-medium text-teal-800">推理速度提升</p>
                    <p className="text-sm text-center">相比大模型，小模型推理速度显著提高</p>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-green-50 rounded-md">
                    <MdMemory className="text-green-600 text-2xl mb-2" />
                    <p className="font-medium text-green-800">内存占用减少</p>
                    <p className="text-sm text-center">小模型可以在资源受限设备上运行</p>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-50 rounded-md">
                    <MdCompare className="text-blue-600 text-2xl mb-2" />
                    <p className="font-medium text-blue-800">性能对比</p>
                    <p className="text-sm text-center">在特定领域保持与大模型相近的性能</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * 蒸馏技术的背景和必要性组件
 */
const DistillationBackground: React.FC = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-8 text-center">为什么需要模型蒸馏？</h3>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* 计算资源问题 */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-amber-500 rounded-full p-3 mr-3">
              <FaMicrochip className="text-white text-xl" />
            </div>
            <h4 className="text-xl font-bold text-amber-800">计算资源问题</h4>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="inline-block bg-amber-200 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2 mt-1">1</span>
              <span><strong>训练成本高昂：</strong>大模型训练需要数周甚至数月的时间，消耗大量电力和计算资源。</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-amber-200 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2 mt-1">2</span>
              <span><strong>推理速度慢：</strong>在实际应用中，大模型往往无法实时响应请求，因为计算需求过于庞大。</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-amber-200 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2 mt-1">3</span>
              <span><strong>部署挑战：</strong>普通企业难以负担大模型所需的硬件设施和维护成本。</span>
            </li>
          </ul>
        </div>
        
        {/* 内存和存储问题 */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-sky-500 rounded-full p-3 mr-3">
              <MdMemory className="text-white text-xl" />
            </div>
            <h4 className="text-xl font-bold text-sky-800">内存和存储问题</h4>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="inline-block bg-sky-200 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2 mt-1">1</span>
              <span><strong>内存需求：</strong>大模型推理需要占用几十GB甚至上百GB的内存，对普通设备不现实。</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-sky-200 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2 mt-1">2</span>
              <span><strong>存储限制：</strong>移动设备、嵌入式系统等资源受限环境无法存储大模型参数。</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-sky-200 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2 mt-1">3</span>
              <span><strong>边缘计算：</strong>在远程传感器、IoT设备等边缘环境中，无法运行庞大的AI模型。</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * 模型对比组件 - 展示DeepSeek与其他模型的对比
 */
const ModelComparison: React.FC = () => {
  const models = [
    { 
      name: "DeepSeek", 
      approach: "蒸馏式开发", 
      sizes: [7, 8, 14, 32], 
      advantage: "通过蒸馏将大模型知识迁移到小模型，保持性能的同时减少资源消耗",
      color: "bg-indigo-500"
    },
    { 
      name: "Qwen", 
      approach: "从零训练", 
      sizes: [1.5, 3, 7, 14, 32], 
      advantage: "专注于提升多任务、跨领域能力，通过优化训练过程实现",
      color: "bg-purple-500"
    },
    { 
      name: "Llama", 
      approach: "从零训练", 
      sizes: [7, 13, 34], 
      advantage: "注重模型架构优化，提高通用性能",
      color: "bg-blue-500"
    }
  ];
  
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-8 text-center">DeepSeek vs 其他模型</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {models.map((model, index) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`rounded-xl shadow-lg overflow-hidden`}
          >
            <div className={`${model.color} p-4 text-white`}>
              <h4 className="text-xl font-bold">{model.name}</h4>
              <p className="text-sm opacity-90">{model.approach}</p>
            </div>
            <div className="p-4 bg-white">
              <p className="font-semibold mb-2">模型系列参数量 (B):</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {model.sizes.map(size => (
                  <span key={size} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{size}B</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm">{model.advantage}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl shadow-lg">
        <h4 className="text-xl font-bold text-gray-800 mb-4">为什么DeepSeek选择蒸馏路线？</h4>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
              <FaLightbulb className="text-indigo-600 text-sm" />
            </div>
            <span>资源优化：DeepSeek作为规模较小的公司，通过蒸馏技术实现了资源的高效利用</span>
          </li>
          <li className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
              <FaLightbulb className="text-indigo-600 text-sm" />
            </div>
            <span>性能保障：蒸馏模型继承了大模型的知识和推理能力，在特定领域表现优异</span>
          </li>
          <li className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
              <FaLightbulb className="text-indigo-600 text-sm" />
            </div>
            <span>实用导向：聚焦于解决实际部署和推理效率问题，满足广泛的商业应用需求</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

/**
 * 模型蒸馏的定义和类比解释组件
 */
const DistillationDefinition: React.FC = () => {
  return (
    <div className="mb-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-4 text-rose-800">什么是模型蒸馏？</h3>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            模型蒸馏（Model Distillation）是一种将大型复杂模型（"教师模型"）的知识转移到小型简单模型（"学生模型"）的技术。
            其核心思想是通过模仿教师模型的输出，使学生模型在保持较高性能的同时，显著减少模型的大小和计算复杂度。
          </p>
          
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-pink-700 mb-2">模型蒸馏的生动类比</h4>
            <p className="text-gray-700 mb-2">
              想象有一位"大教授"（大模型），知识渊博但"脾气很大"：培养他需要巨额学费（训练成本高），请他讲课需要豪华教室（高算力硬件），
              每节课费用惊人（推理成本高）。
            </p>
            <p className="text-gray-700">
              而"小学生"（小模型）虽然乖巧轻便（低部署成本），但知识面有限。
              <strong className="text-pink-800">模型蒸馏就是让大教授把解题思路"浓缩"成小抄，教给小学生的过程。</strong>
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-amber-700 mb-2">实际案例：DeepSeek蒸馏模型系列</h4>
            <p className="text-gray-700 mb-2">
              DeepSeek推出了多个基于蒸馏技术的开源模型，包括7B、8B、14B和32B等不同参数规模的模型。
              这些模型通过蒸馏技术，在保持高质量输出的同时，显著降低了计算资源需求。
            </p>
            <p className="text-gray-700">
              例如，李飞飞团队的论文《s1：Simple test-time scaling》提到：仅花费50美元，就训练出一个比肩ChatGPT o1和DeepSeek R1的模型，
              其关键在于通过知识蒸馏从Gemini API获取推理轨迹和答案，然后用这些高质量数据微调通义Qwen2.5-32B模型。
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * 主页头部组件
 */
const Header: React.FC = () => {
  return (
    <div className="relative mb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90 rounded-2xl"></div>
      <div className="relative p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">模型蒸馏技术详解</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            从大模型到小模型：知识传递的艺术
          </p>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-lg"
            >
              开始探索
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * 主组件，包含所有子组件
 */
const ModelDistillation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        <Header />
        <DistillationDefinition />
        <DistillationBackground />
        <ModelComparison />
        <DistillationProcess />
        
        <footer className="mt-16 text-center text-gray-600 p-6 border-t border-gray-200">
          <p>© 2024 模型蒸馏技术教育网站 | 探索AI知识传递的奥秘</p>
        </footer>
      </div>
    </div>
  );
};

export default ModelDistillation;
