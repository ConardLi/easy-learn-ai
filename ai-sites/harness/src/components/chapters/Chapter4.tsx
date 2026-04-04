import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquareText, 
  Database, 
  Settings,
  Cpu,
  ArrowRight
} from 'lucide-react';

const STAGES = [
  { 
    id: 'prompt', 
    title: 'Prompt Engineering', 
    question: '模型有没有听懂你在说什么？', 
    color: 'text-[#8B5CF6]', 
    bg: 'bg-[#8B5CF6]/10', 
    border: 'border-[#8B5CF6]/20', 
    cardBorder: 'border-[#8B5CF6]',
    icon: MessageSquareText 
  },
  { 
    id: 'context', 
    title: 'Context Engineering', 
    question: '模型有没有拿到足够且正确的信息？', 
    color: 'text-[#F59E0B]', 
    bg: 'bg-[#F59E0B]/10', 
    border: 'border-[#F59E0B]/20', 
    cardBorder: 'border-[#F59E0B]',
    icon: Database 
  },
  { 
    id: 'harness', 
    title: 'Harness Engineering', 
    question: '模型在真实执行里，能不能持续做对？', 
    color: 'text-[#14B8A6]', 
    bg: 'bg-[#14B8A6]/10', 
    border: 'border-[#14B8A6]/20', 
    cardBorder: 'border-[#14B8A6]',
    icon: Settings 
  },
];

export default function Chapter4({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      
      {/* Main Title for Steps 0-8 */}
      <AnimatePresence>
        {step <= 8 && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ 
              opacity: (step === 4 || step === 5) ? 0 : 1, 
              y: -350, 
              scale: 1 
            }}
            exit={{ opacity: 0, y: -400 }}
            transition={{ duration: 0.6 }}
            className="absolute text-center z-10"
          >
            <h2 className="text-5xl font-bold text-[#43302B] tracking-wide">
              过去两年，AI 工程经历了三次明显的<span className="text-[#14B8A6] mx-2">重心迁移</span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Cards (Steps 1-8) */}
      <AnimatePresence>
        {step >= 1 && step <= 8 && (
          <motion.div 
            className="absolute flex items-start justify-center gap-4 w-full max-w-7xl z-0 mt-20"
            animate={{ 
              filter: (step === 4 || step === 5) ? 'blur(12px)' : 'blur(0px)',
              opacity: (step === 4 || step === 5) ? 0.3 : 1,
              scale: (step === 4 || step === 5) ? 0.95 : 1,
            }}
            transition={{ duration: 0.6 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          >
            {STAGES.map((stage, index) => {
              const isVisible = step >= index + 1;
              const showQuestion = step >= index + 6;
              const Icon = stage.icon;
              
              if (!isVisible) return null;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                  className="flex items-center gap-4"
                >
                  {/* Arrow from previous stage */}
                  {index > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, width: 0 }} 
                      animate={{ opacity: 1, width: 'auto' }}
                      className="text-gray-300 flex-shrink-0"
                    >
                      <ArrowRight className="w-10 h-10" />
                    </motion.div>
                  )}

                  {/* The Card */}
                  <div className={`bg-white p-8 rounded-[2rem] shadow-xl border-t-8 ${stage.cardBorder} flex flex-col items-center text-center w-[340px] relative overflow-hidden`}>
                    <div className={`p-5 rounded-full ${stage.bg} mb-6`}>
                      <Icon className={`w-12 h-12 ${stage.color}`} />
                    </div>
                    <h3 className="text-3xl font-bold text-[#43302B] mb-4">
                      {stage.title}
                    </h3>
                    
                    <AnimatePresence>
                      {showQuestion && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                          className={`w-full p-5 rounded-2xl ${stage.bg} border ${stage.border}`}
                        >
                          <p className={`text-xl font-bold ${stage.color} leading-relaxed`}>
                            {stage.question}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay 1: Buzzword History? */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="absolute z-20 text-center bg-white/90 backdrop-blur-xl p-16 rounded-[3rem] shadow-2xl border border-gray-100"
          >
            <p className="text-4xl text-gray-500 font-medium mb-6">表面上看，好像只是换了几个新名词</p>
            <h2 className="text-7xl font-black text-[#43302B] tracking-tight">
              难道只是<span className="text-gray-400 line-through decoration-8 decoration-[#EF4444]/60 mx-4">术语流行史</span>？
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay 2: Three Problems */}
      <AnimatePresence>
        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="absolute z-20 text-center bg-white/90 backdrop-blur-xl p-16 rounded-[3rem] shadow-2xl border border-gray-100"
          >
            <p className="text-4xl text-[#EF4444] font-bold mb-6">如果你这么想，就低估它了。</p>
            <p className="text-3xl text-gray-500 font-medium mb-8">这三个词，其实分别对应了 AI 系统发展的</p>
            <h2 className="text-7xl font-black text-[#14B8A6] tracking-tight">
              三个阶段性问题
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 9: Concentric Circles (Expanding outward) */}
      <AnimatePresence>
        {step === 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <motion.h2 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: -350 }}
              transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
              className="absolute text-6xl font-bold text-[#43302B] bg-white/90 px-16 py-6 rounded-full shadow-xl backdrop-blur-md z-50 border border-gray-100"
            >
              你会发现，问题是<span className="text-[#14B8A6] mx-2">一层层往外扩</span>的
            </motion.h2>

            <div className="relative w-[800px] h-[800px] flex items-center justify-center mt-20">
              
              {/* Ring 3: Harness */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2, type: 'spring', bounce: 0.4 }}
                className="absolute w-[800px] h-[800px] rounded-full border-4 border-dashed border-[#14B8A6] bg-[#14B8A6]/5 flex flex-col items-center justify-start pt-10"
              >
                <div className="bg-white px-8 py-3 rounded-full text-[#14B8A6] font-bold text-2xl shadow-lg border border-[#14B8A6]/20 flex items-center gap-3">
                  <Settings className="w-6 h-6" />
                  Harness: 能持续做对吗？
                </div>
              </motion.div>

              {/* Ring 2: Context */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8, type: 'spring', bounce: 0.4 }}
                className="absolute w-[560px] h-[560px] rounded-full border-4 border-dashed border-[#F59E0B] bg-[#F59E0B]/5 flex flex-col items-center justify-start pt-8"
              >
                <div className="bg-white px-6 py-2 rounded-full text-[#F59E0B] font-bold text-xl shadow-lg border border-[#F59E0B]/20 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Context: 信息足够且正确吗？
                </div>
              </motion.div>

              {/* Ring 1: Prompt */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4, type: 'spring', bounce: 0.4 }}
                className="absolute w-[320px] h-[320px] rounded-full border-4 border-dashed border-[#8B5CF6] bg-[#8B5CF6]/5 flex flex-col items-center justify-start pt-6"
              >
                <div className="bg-white px-5 py-2 rounded-full text-[#8B5CF6] font-bold text-lg shadow-lg border border-[#8B5CF6]/20 flex items-center gap-2">
                  <MessageSquareText className="w-4 h-4" />
                  Prompt: 听懂了吗？
                </div>
              </motion.div>

              {/* Center: Model */}
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
                className="absolute w-36 h-36 bg-[#43302B] rounded-full shadow-2xl flex flex-col items-center justify-center text-white z-10 border-4 border-white"
              >
                <Cpu className="w-12 h-12 mb-2 text-[#FDFBF7]" />
                <span className="font-bold text-2xl tracking-wider">模型</span>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
