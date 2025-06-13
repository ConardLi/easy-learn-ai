/**
 * 生活化类比说明组件
 * 通过生活中的例子帮助理解学习率概念
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Car, Utensils } from 'lucide-react';

const AnalogySections: React.FC = () => {
  const analogies = [
    {
      icon: BookOpen,
      title: '学习复习类比',
      description: '学习率就像你做题后调整学习方法的幅度',
      largeRate: {
        title: '大学习率 (0.1)',
        content: '每次做完题都大幅调整解题方法，可能完全改变思路。优点是进步快，缺点是可能"走偏"，忘记已掌握的方法。',
        color: 'from-red-400 to-orange-400'
      },
      smallRate: {
        title: '小学习率 (0.0001)',
        content: '每次只做细微调整，发现小错误就只改那一点。优点是稳定不会走偏，缺点是进步很慢。',
        color: 'from-blue-400 to-green-400'
      }
    },
    {
      icon: Car,
      title: '驾驶调整类比',
      description: '学习率像你开车时转动方向盘的幅度',
      largeRate: {
        title: '大幅转向',
        content: '遇到弯道时大幅转动方向盘，车辆快速调整方向，但可能导致车辆摇摆不定，甚至偏离车道。',
        color: 'from-red-400 to-orange-400'
      },
      smallRate: {
        title: '微调方向',
        content: '轻微转动方向盘，车辆平稳行驶，但在急弯时可能反应不够及时，需要更多时间调整。',
        color: 'from-blue-400 to-green-400'
      }
    },
    {
      icon: Utensils,
      title: '烹饪调味类比',
      description: '学习率像调味时加盐的分量',
      largeRate: {
        title: '大量加盐',
        content: '一次加很多盐，味道变化明显，但容易过咸难以挽回，可能毁掉整道菜。',
        color: 'from-red-400 to-orange-400'
      },
      smallRate: {
        title: '少量加盐',
        content: '每次只加一点点盐，味道稳定提升，不会出错，但需要多次尝试才能达到理想味道。',
        color: 'from-blue-400 to-green-400'
      }
    }
  ];

  return (
    <motion.section 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">生活化理解</h2>
        <p className="text-gray-600 text-lg">
          通过生活中的例子，更好地理解学习率的概念
        </p>
      </div>

      {analogies.map((analogy, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-3xl shadow-2xl p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <analogy.icon className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{analogy.title}</h3>
            <p className="text-gray-600">{analogy.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className={`bg-gradient-to-br ${analogy.largeRate.color} rounded-2xl p-6 text-white`}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-xl font-bold mb-3">{analogy.largeRate.title}</h4>
              <p className="text-white/90">{analogy.largeRate.content}</p>
              <div className="mt-4 flex items-center">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">快速但不稳定</span>
              </div>
            </motion.div>

            <motion.div
              className={`bg-gradient-to-br ${analogy.smallRate.color} rounded-2xl p-6 text-white`}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-xl font-bold mb-3">{analogy.smallRate.title}</h4>
              <p className="text-white/90">{analogy.smallRate.content}</p>
              <div className="mt-4 flex items-center">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">缓慢但稳定</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default AnalogySections;
