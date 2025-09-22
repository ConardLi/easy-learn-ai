/**
 * 技术原理组件
 * 可视化展示多模态AI的核心技术原理
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ClipArchitecture from './ClipArchitecture';
import DiffusionProcess from './DiffusionProcess';
import MultimodalFlow from './MultimodalFlow';

const TechPrincipleSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section id="tech" className="py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">技术原理</span> 深度解析
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            通过可视化图解，深入理解CLIP、扩散模型等核心技术的工作原理
          </p>
        </motion.div>

        <div className="space-y-20">
          <ClipArchitecture inView={inView} />
          <DiffusionProcess inView={inView} />
          <MultimodalFlow inView={inView} />
        </div>
      </div>
    </section>
  );
};

export default TechPrincipleSection;
