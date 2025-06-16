/**
 * 应用场景页面 - 展示GGUF在不同场景下的实际应用
 * 包含使用案例和部署示例
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Server, 
  Monitor, 
  Cloud,
  Cpu,
  Code,
  Zap,
  Users,
  Globe,
  ArrowRight,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

const ApplicationsPage: React.FC = () => {
  const [activeApplication, setActiveApplication] = useState(0);

  const applications = [
    {
      id: 'local-deployment',
      title: '本地部署',
      icon: Monitor,
      color: 'from-blue-400 to-blue-600',
      description: '在个人电脑或工作站上运行大型语言模型',
      advantages: [
        '数据隐私保护',
        '无网络依赖',
        '低延迟响应',
        '成本可控'
      ],
      useCases: [
        '个人助手应用',
        '文档处理工具',
        '代码辅助开发',
        '本地知识库'
      ],
      specs: {
        memory: '4-16 GB',
        storage: '3-10 GB',
        cpu: 'i5/AMD Ryzen 5+',
        performance: '高性能推理'
      }
    },
    {
      id: 'mobile-inference',
      title: '移动端推理',
      icon: Smartphone,
      color: 'from-green-400 to-green-600',
      description: '在智能手机和平板设备上运行轻量化模型',
      advantages: [
        '离线可用',
        '即时响应',
        '节省流量',
        '保护隐私'
      ],
      useCases: [
        '智能输入法',
        '语音助手',
        '实时翻译',
        '图像识别'
      ],
      specs: {
        memory: '2-6 GB',
        storage: '1-3 GB',
        cpu: 'ARM Cortex',
        performance: '优化推理'
      }
    },
    {
      id: 'edge-computing',
      title: '边缘计算',
      icon: Cpu,
      color: 'from-purple-400 to-purple-600',
      description: '在边缘设备上部署AI能力，减少云端依赖',
      advantages: [
        '低延迟处理',
        '带宽节省',
        '实时决策',
        '可靠性高'
      ],
      useCases: [
        'IoT智能设备',
        '自动驾驶',
        '工业检测',
        '安防监控'
      ],
      specs: {
        memory: '1-4 GB',
        storage: '0.5-2 GB',
        cpu: '嵌入式处理器',
        performance: '实时推理'
      }
    },
    {
      id: 'rapid-prototyping',
      title: '快速原型',
      icon: Code,
      color: 'from-orange-400 to-orange-600',
      description: '快速加载和测试不同的LLM模型进行开发',
      advantages: [
        '快速迭代',
        '简化部署',
        '模型对比',
        '开发效率'
      ],
      useCases: [
        'AI应用开发',
        '模型评估',
        '功能验证',
        '性能测试'
      ],
      specs: {
        memory: '8-32 GB',
        storage: '10-50 GB',
        cpu: '开发工作站',
        performance: '开发优化'
      }
    }
  ];

  const frameworks = [
    { name: 'llama.cpp', logo: '🦙', description: 'C++推理引擎' },
    { name: 'Ollama', logo: '🐋', description: '本地模型运行' },
    { name: 'LM Studio', logo: '🎨', description: '图形化界面' },
    { name: 'GPT4All', logo: '🤖', description: '跨平台客户端' },
    { name: 'Jan', logo: '🌟', description: '开源AI助手' },
    { name: 'Kobold.cpp', logo: '🐍', description: '创意写作工具' }
  ];

  const currentApp = applications[activeApplication];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            应用场景
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            探索 GGUF 在不同环境和场景下的实际应用案例
          </p>
        </motion.div>

        {/* Application Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {applications.map((app, index) => {
            const IconComponent = app.icon;
            return (
              <motion.button
                key={app.id}
                onClick={() => setActiveApplication(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeApplication === index
                    ? `bg-gradient-to-r ${app.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <IconComponent className="h-6 w-6" />
                <span>{app.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Application Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Main Content */}
          <motion.div
            key={`content-${activeApplication}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${currentApp.color} flex items-center justify-center`}>
              {React.createElement(currentApp.icon, { className: "h-10 w-10 text-white" })}
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{currentApp.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{currentApp.description}</p>
            </div>

            {/* Advantages */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">核心优势</h3>
              <div className="grid grid-cols-2 gap-3">
                {currentApp.advantages.map((advantage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-green-800 text-sm font-medium">{advantage}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">典型应用</h3>
              <div className="space-y-3">
                {currentApp.useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-md border border-gray-100"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${currentApp.color} flex items-center justify-center`}>
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{useCase}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Specifications */}
          <motion.div
            key={`specs-${activeApplication}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Server className="h-6 w-6 mr-2 text-indigo-600" />
              技术规格
            </h3>
            
            <div className="space-y-6">
              {Object.entries(currentApp.specs).map(([key, value], index) => {
                const icons = {
                  memory: '💾',
                  storage: '💿',
                  cpu: '⚡',
                  performance: '🚀'
                };
                const labels = {
                  memory: '内存需求',
                  storage: '存储空间',
                  cpu: 'CPU要求',
                  performance: '性能表现'
                };
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{icons[key as keyof typeof icons]}</span>
                      <span className="font-semibold text-gray-800">{labels[key as keyof typeof labels]}</span>
                    </div>
                    <span className="text-gray-600 font-medium">{value}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Performance Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className={`mt-6 p-4 rounded-xl bg-gradient-to-r ${currentApp.color} bg-opacity-10 border border-opacity-20`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <span className="font-semibold text-indigo-800">优化建议</span>
              </div>
              <p className="text-sm text-indigo-700">
                建议使用 Q4_K_M 量化格式以获得最佳的性能和质量平衡
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Supporting Frameworks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            支持的框架和工具
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((framework, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="text-3xl">{framework.logo}</div>
                <div>
                  <h3 className="font-bold text-gray-800">{framework.name}</h3>
                  <p className="text-sm text-gray-600">{framework.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Adoption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            行业采用情况
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                industry: '科技公司',
                adoption: '85%',
                icon: '💻',
                growth: '+32%'
              },
              {
                industry: '研究机构',
                adoption: '92%',
                icon: '🔬',
                growth: '+28%'
              },
              {
                industry: '教育领域',
                adoption: '76%',
                icon: '🎓',
                growth: '+45%'
              },
              {
                industry: '个人开发者',
                adoption: '68%',
                icon: '👨‍💻',
                growth: '+58%'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white rounded-xl shadow-md"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{stat.industry}</h4>
                <div className="text-3xl font-bold text-indigo-600 mb-1">{stat.adoption}</div>
                <div className="flex items-center justify-center text-green-600 text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{stat.growth}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
