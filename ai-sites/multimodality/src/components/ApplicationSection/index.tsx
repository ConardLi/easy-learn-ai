/**
 * 应用场景展示组件
 * 展示多模态AI的实际应用案例
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ApplicationGrid from './ApplicationGrid';
import InteractiveDemo from './InteractiveDemo';

const ApplicationSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section id="applications" className="py-20 px-4 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">应用场景</span> 无处不在
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            从创意设计到教育学习，从娱乐互动到商业应用，多模态AI正在改变各行各业
          </p>
        </motion.div>

        <ApplicationGrid inView={inView} />
        <InteractiveDemo inView={inView} />
      </div>
    </section>
  );
};

export default ApplicationSection;
