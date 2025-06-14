/**
 * 概念卡片组件
 * 展示三种AI技术的核心概念，使用卡片形式和动画效果
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { selectedConceptAtom } from '../../stores/navigationState';
import { BookOpen, Database, Settings, CheckCircle, XCircle, ChevronDown } from 'lucide-react';

interface ConceptData {
  id: 'longtext' | 'knowledge' | 'finetune';
  title: string;
  subtitle: string;
  analogy: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  pros: string[];
  cons: string[];
}

const ConceptCards: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useAtom(selectedConceptAtom);

  const concepts: ConceptData[] = [
    {
      id: 'longtext',
      title: '长文本处理',
      subtitle: '阅读理解考试',
      analogy: '就像参加超长阅读理解考试，需要读完几千字文章后回答问题',
      description: '模型处理很长的文本内容，理解其中的细节和逻辑，然后给出准确答案',
      icon: BookOpen,
      color: 'blue',
      gradient: 'from-blue-400 to-blue-600',
      pros: ['连贯性强', '适合复杂任务', '保持逻辑性'],
      cons: ['资源消耗大', '上下文限制', '计算成本高']
    },
    {
      id: 'knowledge',
      title: '知识库',
      subtitle: '开卷考试',
      analogy: '就像开卷考试，可以带资料书，随时查找需要的信息来回答问题',
      description: '建立巨大的资料库，模型可以在里面查找信息，然后结合这些信息来回答问题',
      icon: Database,
      color: 'green',
      gradient: 'from-green-400 to-green-600',
      pros: ['灵活性高', '可随时更新', '扩展性强'],
      cons: ['依赖检索质量', '实时性要求高', '需要维护成本']
    },
    {
      id: 'finetune',
      title: '微调',
      subtitle: '考前辅导班',
      analogy: '就像考前参加辅导班，专门学习考试相关知识和技巧',
      description: '让模型提前学习特定领域的知识，在实际任务中表现更好',
      icon: Settings,
      color: 'purple',
      gradient: 'from-purple-400 to-purple-600',
      pros: ['性能提升显著', '定制化强', '专业领域优化'],
      cons: ['需要标注数据', '硬件要求高', '训练成本大']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            三大核心概念
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            通过生动的比喻来理解AI模型优化的三种不同方法
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {concepts.map((concept) => {
            const Icon = concept.icon;
            const isSelected = selectedConcept === concept.id;
            
            return (
              <motion.div
                key={concept.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedConcept(isSelected ? null : concept.id)}
                className={`bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isSelected ? 'ring-4 ring-blue-300' : ''
                }`}
              >
                <div className={`bg-gradient-to-r ${concept.gradient} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-12 h-12" />
                    <motion.div
                      animate={{ rotate: isSelected ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{concept.title}</h3>
                  <p className="text-lg opacity-90">{concept.subtitle}</p>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {concept.analogy}
                    </p>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isSelected ? 'auto' : 0,
                      opacity: isSelected ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t pt-4 mt-4">
                      <p className="text-gray-700 mb-4">{concept.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            优点
                          </h4>
                          <ul className="space-y-1">
                            {concept.pros.map((pro, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                • {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2 flex items-center">
                            <XCircle className="w-4 h-4 mr-1" />
                            缺点
                          </h4>
                          <ul className="space-y-1">
                            {concept.cons.map((con, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                • {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ConceptCards;