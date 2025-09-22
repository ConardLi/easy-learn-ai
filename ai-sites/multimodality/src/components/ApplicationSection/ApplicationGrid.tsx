/**
 * 应用网格组件
 * 展示多模态AI的具体应用场景
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, GraduationCap, Camera, Music, ShoppingBag, Stethoscope } from 'lucide-react';

interface ApplicationGridProps {
  inView: boolean;
}

const ApplicationGrid: React.FC<ApplicationGridProps> = ({ inView }) => {
  const applications = [
    {
      icon: Palette,
      title: '创意设计',
      description: '文生图、图像编辑、风格转换',
      examples: ['AI绘画创作', '图片背景替换', '艺术风格迁移'],
      color: 'bg-purple-500',
      bgGradient: 'from-purple-50 to-purple-100',
      image: 'https://picsum.photos/300/200?random=7'
    },
    {
      icon: Camera,
      title: '内容创作',
      description: '视频生成、短片制作、特效合成',
      examples: ['AI视频生成', '实时滤镜', '虚拟主播'],
      color: 'bg-blue-500',
      bgGradient: 'from-blue-50 to-blue-100',
      image: 'https://picsum.photos/300/200?random=8'
    },
    {
      icon: GraduationCap,
      title: '教育学习',
      description: '智能辅导、个性化教学、知识问答',
      examples: ['多模态课件', '智能题库', '学习伙伴'],
      color: 'bg-green-500',
      bgGradient: 'from-green-50 to-green-100',
      image: 'https://picsum.photos/300/200?random=9'
    },
    {
      icon: Music,
      title: '娱乐互动',
      description: '音乐生成、游戏AI、虚拟偶像',
      examples: ['AI作曲', '游戏NPC', '虚拟演唱会'],
      color: 'bg-red-500',
      bgGradient: 'from-red-50 to-red-100',
      image: 'https://picsum.photos/300/200?random=10'
    },
    {
      icon: ShoppingBag,
      title: '电商零售',
      description: '商品推荐、虚拟试穿、客服助手',
      examples: ['AR试衣', '商品搜索', '智能客服'],
      color: 'bg-yellow-500',
      bgGradient: 'from-yellow-50 to-yellow-100',
      image: 'https://picsum.photos/300/200?random=11'
    },
    {
      icon: Stethoscope,
      title: '医疗健康',
      description: '影像诊断、健康监测、康复辅助',
      examples: ['医学影像分析', '症状诊断', '康复指导'],
      color: 'bg-indigo-500',
      bgGradient: 'from-indigo-50 to-indigo-100',
      image: 'https://picsum.photos/300/200?random=12'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {applications.map((app, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className={`bg-gradient-to-br ${app.bgGradient} rounded-2xl p-6 card-hover border border-gray-200`}
        >
          {/* 头部 */}
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-3 rounded-xl ${app.color} text-white`}>
              <app.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{app.title}</h3>
          </div>

          {/* 描述 */}
          <p className="text-gray-600 mb-4 leading-relaxed">{app.description}</p>

          {/* 示例图片 */}
          <motion.div
            className="mb-4 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={app.image}
              alt={app.title}
              className="w-full h-32 object-cover"
            />
          </motion.div>

          {/* 应用示例 */}
          <div className="space-y-2">
            {app.examples.map((example, exampleIndex) => (
              <motion.div
                key={exampleIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + exampleIndex * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className={`w-2 h-2 rounded-full ${app.color}`} />
                <span className="text-sm text-gray-700">{example}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ApplicationGrid;
