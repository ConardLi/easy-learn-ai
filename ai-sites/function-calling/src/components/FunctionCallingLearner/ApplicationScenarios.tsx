/**
 * Function Calling 应用场景展示组件
 * 展示实际的应用案例和使用场景
 */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CloudSun, 
  Calculator, 
  BarChart3, 
  Mail, 
  Calendar, 
  ShoppingCart,
  MapPin,
  Camera
} from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  example: string;
  icon: React.ReactNode;
  color: string;
  category: string;
}

const ApplicationScenarios: React.FC = () => {
  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "天气查询",
      description: "实时获取天气信息",
      example: "今天北京天气如何？",
      icon: <CloudSun className="w-6 h-6" />,
      color: "blue",
      category: "信息获取"
    },
    {
      id: 2,
      title: "数据计算",
      description: "执行复杂数学运算",
      example: "计算投资回报率",
      icon: <Calculator className="w-6 h-6" />,
      color: "green",
      category: "数据处理"
    },
    {
      id: 3,
      title: "图表生成",
      description: "创建数据可视化图表",
      example: "生成销售数据图表",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "purple",
      category: "数据可视化"
    },
    {
      id: 4,
      title: "邮件发送",
      description: "自动发送邮件通知",
      example: "发送会议提醒邮件",
      icon: <Mail className="w-6 h-6" />,
      color: "red",
      category: "通信工具"
    },
    {
      id: 5,
      title: "日程管理",
      description: "添加和管理日程安排",
      example: "明天下午安排会议",
      icon: <Calendar className="w-6 h-6" />,
      color: "orange",
      category: "效率工具"
    },
    {
      id: 6,
      title: "购物助手",
      description: "查询商品信息和价格",
      example: "查找最优惠的手机",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "pink",
      category: "电商服务"
    },
    {
      id: 7,
      title: "地图导航",
      description: "获取路线和位置信息",
      example: "从家到公司的最佳路线",
      icon: <MapPin className="w-6 h-6" />,
      color: "teal",
      category: "位置服务"
    },
    {
      id: 8,
      title: "图像处理",
      description: "分析和处理图像",
      example: "识别图片中的物体",
      icon: <Camera className="w-6 h-6" />,
      color: "indigo",
      category: "AI服务"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: "bg-blue-600", border: "border-blue-200", text: "text-blue-600" },
      green: { bg: "bg-green-600", border: "border-green-200", text: "text-green-600" },
      purple: { bg: "bg-purple-600", border: "border-purple-200", text: "text-purple-600" },
      red: { bg: "bg-red-600", border: "border-red-200", text: "text-red-600" },
      orange: { bg: "bg-orange-600", border: "border-orange-200", text: "text-orange-600" },
      pink: { bg: "bg-pink-600", border: "border-pink-200", text: "text-pink-600" },
      teal: { bg: "bg-teal-600", border: "border-teal-200", text: "text-teal-600" },
      indigo: { bg: "bg-indigo-600", border: "border-indigo-200", text: "text-indigo-600" }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-16">
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-900 mb-12"
      >
        实际应用场景
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto"
      >
        Function Calling 让 AI 具备了与各种外部系统交互的能力，
        从简单的信息查询到复杂的业务操作，几乎无所不能
      </motion.p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scenarios.map((scenario, index) => {
          const colors = getColorClasses(scenario.color);
          
          return (
            <motion.div
              key={scenario.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className={`bg-white rounded-xl shadow-lg border-2 ${colors.border} p-6 cursor-pointer group`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className={`${colors.bg} p-3 rounded-lg mb-4 w-fit`}
              >
                {React.cloneElement(scenario.icon as React.ReactElement, {
                  className: "w-6 h-6 text-white"
                })}
              </motion.div>

              <div className="mb-2">
                <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wide`}>
                  {scenario.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {scenario.title}
              </h3>

              <p className="text-gray-600 mb-4 text-sm">
                {scenario.description}
              </p>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">示例对话：</p>
                <p className="text-sm font-medium text-gray-700">
                  "{scenario.example}"
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center"
      >
        <h3 className="text-2xl font-bold mb-4">
          无限可能的创新空间
        </h3>
        <p className="text-lg opacity-90 max-w-3xl mx-auto">
          Function Calling 打开了 AI 与现实世界交互的大门。
          从传统的搜索引擎、电商平台到企业级应用，
          都可以通过这项技术实现智能化升级和重构。
        </p>
      </motion.div>
    </section>
  );
};

export default ApplicationScenarios;
