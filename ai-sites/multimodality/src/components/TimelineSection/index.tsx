/**
 * 时间线组件
 * 展示多模态AI的发展历程和关键里程碑
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TimelineItem from './TimelineItem';

const TimelineSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const timelineData = [
    {
      year: '2020',
      title: 'Vision Transformer (ViT) 诞生',
      description: 'Google提出ViT，证明Transformer架构同样适用于图像处理，为后续多模态模型铺平道路',
      highlights: ['图像块序列化', 'Transformer适配视觉', '统一架构可能性'],
      color: 'bg-blue-500',
      image: 'https://picsum.photos/400/300?random=1'
    },
    {
      year: '2021',
      title: 'CLIP 模型革命',
      description: 'OpenAI发布CLIP，首次实现大规模图文对比学习，开创了多模态预训练的新纪元',
      highlights: ['4亿图文对训练', '对比学习范式', '零样本图像分类'],
      color: 'bg-green-500',
      image: 'https://picsum.photos/400/300?random=2'
    },
    {
      year: '2022',
      title: '文生图三巨头',
      description: 'DALL-E 2、Midjourney、Stable Diffusion相继发布，引爆AIGC浪潮',
      highlights: ['扩散模型突破', '文生图商业化', 'AIGC元年'],
      color: 'bg-purple-500',
      image: 'https://picsum.photos/400/300?random=3'
    },
    {
      year: '2023',
      title: '大模型多模态化',
      description: 'GPT-4V和Gemini发布，多模态能力正式整合到大型语言模型中',
      highlights: ['原生多模态设计', '视觉理解能力', '多模态对话'],
      color: 'bg-red-500',
      image: 'https://picsum.photos/400/300?random=4'
    },
    {
      year: '2024',
      title: 'Sora 视频生成',
      description: 'OpenAI发布Sora，AI视频生成达到新高度，国内厂商快速跟进',
      highlights: ['60秒长视频', '物理规律模拟', '全民AI创作'],
      color: 'bg-orange-500',
      image: 'https://picsum.photos/400/300?random=5'
    },
    {
      year: '2025',
      title: '多模态新纪元',
      description: 'GPT-4o图像生成、Gemini 2.5 Flash等模型持续突破边界',
      highlights: ['实时多模态交互', '高保真生成', '个性化定制'],
      color: 'bg-indigo-500',
      image: 'https://picsum.photos/400/300?random=6'
    }
  ];

  return (
    <section id="timeline" className="py-20 px-4 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            多模态 AI <span className="gradient-text">发展历程</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            从2020年到2025年，见证AI如何从单一感官走向多模态融合的完整历程
          </p>
        </motion.div>

        <div className="relative">
          {/* 时间线主轴 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 h-full"></div>

          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.year}
                {...item}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
